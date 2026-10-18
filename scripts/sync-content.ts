import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const CONTENT_SRC = path.resolve('content-src');
const OUTPUT_CONTENT_DIR = path.resolve('src/content');
const OUTPUT_DOCS_DIR = path.join(OUTPUT_CONTENT_DIR, 'docs');
const OUTPUT_IMAGES_DIR = path.resolve('public/images');
const OUTPUT_SLIDES_DIR = path.resolve('public/slides');

fs.mkdirSync(OUTPUT_DOCS_DIR, { recursive: true });
fs.mkdirSync(OUTPUT_IMAGES_DIR, { recursive: true });
fs.mkdirSync(OUTPUT_SLIDES_DIR, { recursive: true });

function walk(dir: string): string[] {
  let results: string[] = [];
  const list = fs.readdirSync(dir);
  for (const file of list) {
    if (file === '.git') continue;
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(fullPath));
    } else {
      results.push(path.relative(CONTENT_SRC, fullPath).replace(/\\/g, '/'));
    }
  }
  return results;
}

const allFiles = walk(CONTENT_SRC);

// 1. Process images -> convert to WebP <= 300KB
const imageFiles = allFiles.filter(f => /\.(png|jpe?g)$/i.test(f));
console.log(`Processing ${imageFiles.length} images...`);

async function processImages() {
  for (const imgRel of imageFiles) {
    const srcPath = path.join(CONTENT_SRC, imgRel);
    const baseName = path.basename(imgRel).replace(/\.(png|jpe?g)$/i, '.webp');
    // Sanitize path for public web
    const sanitizedRelDir = path.dirname(imgRel).toLowerCase().replace(/[^a-z0-9_-]/g, '-');
    const targetDir = path.join(OUTPUT_IMAGES_DIR, sanitizedRelDir);
    fs.mkdirSync(targetDir, { recursive: true });
    const targetPath = path.join(targetDir, baseName);

    try {
      await sharp(srcPath)
        .resize({ width: 1400, withoutEnlargement: true })
        .webp({ quality: 80 })
        .toFile(targetPath);
    } catch (err) {
      console.warn(`Error converting image ${imgRel}:`, err);
    }
  }
  console.log(`✓ Processed all images into WebP.`);
}

// 2. Process slides -> copy to public/slides/
const slideFiles = allFiles.filter(f => f.endsWith('.html'));
console.log(`Copying ${slideFiles.length} slides...`);
for (const s of slideFiles) {
  const srcPath = path.join(CONTENT_SRC, s);
  const safeName = s.replace(/\//g, '___');
  fs.copyFileSync(srcPath, path.join(OUTPUT_SLIDES_DIR, safeName));
}
console.log(`✓ Copied ${slideFiles.length} slides.`);

// 3. Process Markdown files
const mdFiles = allFiles.filter(f => f.endsWith('.md')).sort();
console.log(`Syncing ${mdFiles.length} Markdown files...`);

interface ManifestItem {
  id: string;
  sourcePath: string;
  category: string;
  route: string;
  title: string;
  headings: { level: number; text: string; slug: string }[];
  wordCount: number;
  promptsCount: number;
}

const manifest: ManifestItem[] = [];
const docsMap: Record<string, string> = {};
const allExtractedPrompts: {
  id: string;
  sourceFile: string;
  title: string;
  role: string;
  content: string;
  category: string;
}[] = [];

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

function mapSubPath(fp: string): string {
  const bn = path.basename(fp, '.md').toLowerCase();
  if (bn.includes('giao_trinh') || bn.includes('ly_thuyet')) return 'ly-thuyet';
  if (bn.includes('giao_an')) return 'giao-an';
  if (bn.includes('thu_vien_prompt') || bn.includes('prompt')) return 'prompt';
  if (bn.includes('lab') || bn.includes('bai_tap')) return 'lab';
  if (bn.includes('nghiem_thu') || bn.includes('rubric')) return 'nghiem-thu';
  if (fp.includes('/demo/')) {
    const parts = fp.split('/');
    const demoIdx = parts.indexOf('demo');
    return 'demo/' + parts.slice(demoIdx + 1).join('/').replace(/\.md$/, '').toLowerCase().replace(/_/g, '-');
  }
  return bn.replace(/_/g, '-');
}

for (const fp of mdFiles) {
  let content = fs.readFileSync(path.join(CONTENT_SRC, fp), 'utf8');

  // Fix file:/// links to route or github raw link
  content = content.replace(/file:\/\/\/[^\s\)\"'\>]+/g, (match) => {
    return `https://github.com/cesglobal-vn/Tai-lieu-khoa-hoc-ai-xay-dung/blob/main/${fp}`;
  });

  const lines = content.split('\n');
  const h1Line = lines.find(l => l.startsWith('# '));
  const title = h1Line ? h1Line.replace(/^#\s+/, '').trim() : path.basename(fp, '.md');

  // Extract Headings
  const headings: { level: number; text: string; slug: string }[] = [];
  for (const line of lines) {
    const match = line.match(/^(#{2,4})\s+(.+)$/);
    if (match) {
      const level = match[1].length;
      const text = match[2].trim();
      headings.push({ level, text, slug: slugify(text) });
    }
  }

  // Determine Category and Route
  let category = 'Khác';
  let route = '';

  if (fp === 'README.md') {
    category = 'Giới thiệu';
    route = '/gioi-thieu';
  } else if (fp.startsWith('00_Tong_Quan_Chuong_Trinh/')) {
    category = 'Tổng quan';
    if (fp.includes('01_De_Cuong')) route = '/tong-quan/de-cuong';
    else if (fp.includes('02_Kien_Truc')) route = '/tong-quan/kien-truc-agent';
    else route = '/tong-quan/' + path.basename(fp, '.md').toLowerCase();
  } else if (fp.startsWith('01_Buoi_01_')) {
    category = 'Buổi 01';
    route = '/buoi/01/' + mapSubPath(fp);
  } else if (fp.startsWith('02_Buoi_02_')) {
    category = 'Buổi 02';
    route = '/buoi/02/' + mapSubPath(fp);
  } else if (fp.startsWith('03_Buoi_03_')) {
    category = 'Buổi 03';
    route = '/buoi/03/' + mapSubPath(fp);
  } else if (fp.startsWith('04_Buoi_04_Agent_ClaudeMD_Blender_3D/')) {
    category = 'Buổi 04 (Chính thức)';
    route = '/buoi/04/' + mapSubPath(fp);
  } else if (fp.startsWith('04_Buoi_04_Boc_Tach_Khoi_Luong_BOQ_Du_Toan/')) {
    category = 'Chuyên đề: BOQ & Dự toán';
    route = '/chuyen-de/boq-du-toan/' + mapSubPath(fp);
  } else if (fp.startsWith('05_Buoi_05_')) {
    category = 'Buổi 05';
    route = '/buoi/05/' + mapSubPath(fp);
  } else if (fp.startsWith('06_Buoi_06_')) {
    category = 'Buổi 06';
    route = '/buoi/06/' + mapSubPath(fp);
  } else if (fp.startsWith('templates/')) {
    category = 'Biểu mẫu';
    route = '/bieu-mau/' + path.basename(fp, '.md').toLowerCase().replace(/_/g, '-');
  }

  // Extract prompts if any
  const promptRegex = /```(?:markdown|prompt|text)?\s*([\s\S]*?)```/g;
  let pMatch;
  let promptCount = 0;
  if (fp.includes('Prompt') || fp.includes('prompt')) {
    while ((pMatch = promptRegex.exec(content)) !== null) {
      promptCount++;
      allExtractedPrompts.push({
        id: `p-${manifest.length}-${promptCount}`,
        sourceFile: fp,
        title: `Prompt ${promptCount} — ${title}`,
        role: category,
        content: pMatch[1].trim(),
        category,
      });
    }
  }

  const safeDocName = fp.replace(/[\/\\]/g, '___');
  docsMap[safeDocName] = content;

  manifest.push({
    id: safeDocName,
    sourcePath: fp,
    category,
    route,
    title,
    headings,
    wordCount: content.split(/\s+/).length,
    promptsCount: promptCount,
  });
}


async function main() {
  await processImages();
  fs.writeFileSync(path.join(OUTPUT_CONTENT_DIR, 'manifest.json'), JSON.stringify(manifest, null, 2), 'utf8');
  fs.writeFileSync(path.join(OUTPUT_CONTENT_DIR, 'prompts.json'), JSON.stringify(allExtractedPrompts, null, 2), 'utf8');
  fs.writeFileSync(path.join(OUTPUT_CONTENT_DIR, 'docsMap.json'), JSON.stringify(docsMap), 'utf8');
  console.log(`✓ Saved manifest.json (${manifest.length} documents).`);
  console.log(`✓ Saved prompts.json (${allExtractedPrompts.length} extracted prompts).`);
  console.log(`✓ Saved docsMap.json (${Object.keys(docsMap).length} documents packed).`);
}

main();
