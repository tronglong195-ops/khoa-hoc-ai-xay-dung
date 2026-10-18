import React from 'react';
import { useParams, Link } from 'react-router-dom';
import manifest from '../content/manifest.json';
import { getDocContent } from '../content/docsRegistry';
import { MarkdownViewer } from '../components/MarkdownViewer';
import { TableOfContents } from '../components/TableOfContents';
import { TitleBlock } from '../components/TitleBlock';
import { ArrowLeft, FileText, CheckCircle2 } from 'lucide-react';

const OverviewAgentsNetworkScene = React.lazy(() => import('../scenes/OverviewAgentsNetworkScene').then(m => ({ default: m.OverviewAgentsNetworkScene })));
export const StaticDocPage: React.FC<{ forcedPath?: string; categoryTitle?: string }> = ({
  forcedPath,
  categoryTitle,
}) => {
  const { slug } = useParams<{ slug: string }>();

  // Find doc by forcedPath or by slug matching
  const doc = manifest.find((m) => {
    if (forcedPath) return m.sourcePath === forcedPath;
    if (slug) return m.route.endsWith(slug) || m.id.includes(slug);
    return false;
  });

  if (!doc) {
    return (
      <div className="py-12 text-center">
        <h2 className="text-2xl font-bold text-red-600">Không tìm thấy tài liệu</h2>
        <Link to="/" className="text-[#F26B1D] underline mt-4 inline-block">Trở về trang chủ</Link>
      </div>
    );
  }

  const content = getDocContent(doc.id);

  return (
    <div className="space-y-6 py-4">
      {/* Back button */}
      <div>
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-gray-500 hover:text-[#F26B1D] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>TRANG CHỦ / {categoryTitle || doc.category.toUpperCase()}</span>
        </Link>
      </div>

      {/* Title Block */}
      <TitleBlock
        sheetNumber="GEN"
        projectTitle="HỒ SƠ KHÓA HỌC AI XÂY DỰNG"
        topicTitle={doc.title}
        deliverable="Tài Liệu Toàn Văn Chuẩn"
        duration="Nghiên cứu & Đối soát"
      />

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-9 bg-white dark:bg-[#0B1E33] border border-[#D8D4C8] dark:border-[#1C3B5E] rounded-lg p-6 md:p-8 shadow-sm">
          <div className="mb-6 pb-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between text-xs font-mono text-gray-500">
            <span>Nguồn file: <code className="text-[#F26B1D] font-bold">{doc.sourcePath}</code></span>
            <span>{doc.wordCount.toLocaleString()} từ | Render nguyên văn 100%</span>
          </div>

          {/* Conditional 3D Network Scene for Architecture Document */}
          {doc.sourcePath.includes('Kien_Truc_He_Thong_6_AI_Agent') && (
            <div className="mb-8">
              <React.Suspense
                fallback={
                  <div className="aspect-16/9 bg-[#0B1E33] rounded-lg flex items-center justify-center text-white text-xs font-mono">
                    Đang tải mạng lưới 3D 6 Agent...
                  </div>
                }
              >
                <OverviewAgentsNetworkScene />
              </React.Suspense>
            </div>
          )}

          <MarkdownViewer content={content} />
        </div>

        {/* Sticky Table of Contents */}
        <div className="hidden lg:block lg:col-span-3">
          <TableOfContents headings={doc.headings} />
        </div>
      </div>
    </div>
  );
};
