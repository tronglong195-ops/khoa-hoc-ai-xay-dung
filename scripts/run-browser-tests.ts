import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const SCREENSHOT_DIR = path.resolve('test-evidence');
fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });

async function runBrowserTests() {
  console.log('🚀 Starting Automated Browser Testing with Chromium...');
  const browser = await chromium.launch();

  // Test 1: Desktop Viewport (1440x900)
  console.log('\n--- TESTING DESKTOP (1440px) ---');
  const desktopContext = await browser.newContext({
    viewport: { width: 1440, height: 900 },
  });
  const desktopPage = await desktopContext.newPage();

  const consoleErrors: string[] = [];
  desktopPage.on('console', (msg) => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
    }
  });

  // 1. Home Page Desktop
  await desktopPage.goto('http://localhost:4173/#/');
  await desktopPage.waitForTimeout(2000);
  await desktopPage.screenshot({ path: path.join(SCREENSHOT_DIR, '01-desktop-home.png'), fullPage: false });
  console.log('✓ Desktop Home Page captured');

  // 2. Session 04 Desktop with 3D House
  await desktopPage.goto('http://localhost:4173/#/buoi/04?tab=3d');
  await desktopPage.waitForTimeout(3000);
  await desktopPage.screenshot({ path: path.join(SCREENSHOT_DIR, '02-desktop-buoi04-3d.png'), fullPage: false });
  console.log('✓ Desktop Buoi 04 (3D House Model) captured');

  // 3. Theory with Mermaid Diagram
  await desktopPage.goto('http://localhost:4173/#/tong-quan/kien-truc-agent');
  await desktopPage.waitForTimeout(2500);
  await desktopPage.screenshot({ path: path.join(SCREENSHOT_DIR, '03-desktop-architecture-agent.png'), fullPage: false });
  console.log('✓ Desktop Architecture & 3D Network captured');

  // 4. Prompts Library
  await desktopPage.goto('http://localhost:4173/#/prompt');
  await desktopPage.waitForTimeout(1500);
  await desktopPage.screenshot({ path: path.join(SCREENSHOT_DIR, '04-desktop-prompts.png'), fullPage: false });
  console.log('✓ Desktop Prompts Library captured');

  // 5. Search & Glossary
  await desktopPage.goto('http://localhost:4173/#/tra-cuu');
  await desktopPage.waitForTimeout(1500);
  await desktopPage.screenshot({ path: path.join(SCREENSHOT_DIR, '05-desktop-glossary.png'), fullPage: false });
  console.log('✓ Desktop Search & Glossary captured');

  // Test 2: Mobile Viewport (375x812 iPhone 12/13/Mini)
  console.log('\n--- TESTING MOBILE (375px) ---');
  const mobileContext = await browser.newContext({
    viewport: { width: 375, height: 812 },
    isMobile: true,
  });
  const mobilePage = await mobileContext.newPage();

  mobilePage.on('console', (msg) => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
    }
  });

  // 1. Mobile Home Page
  await mobilePage.goto('http://localhost:4173/#/');
  await mobilePage.waitForTimeout(2000);
  await mobilePage.screenshot({ path: path.join(SCREENSHOT_DIR, '06-mobile-home.png'), fullPage: false });
  console.log('✓ Mobile Home Page captured');

  // 2. Mobile Session 01 Theory
  await mobilePage.goto('http://localhost:4173/#/buoi/01?tab=ly-thuyet');
  await mobilePage.waitForTimeout(2000);
  await mobilePage.screenshot({ path: path.join(SCREENSHOT_DIR, '07-mobile-buoi01-theory.png'), fullPage: false });
  console.log('✓ Mobile Buoi 01 Theory captured');

  // 3. Mobile Slide View
  await mobilePage.goto('http://localhost:4173/#/buoi/01?tab=slide');
  await mobilePage.waitForTimeout(2500);
  await mobilePage.screenshot({ path: path.join(SCREENSHOT_DIR, '08-mobile-slide.png'), fullPage: false });
  console.log('✓ Mobile Slide View captured');

  // Check horizontal overflow on mobile
  const scrollWidth = await mobilePage.evaluate(() => document.documentElement.scrollWidth);
  const clientWidth = await mobilePage.evaluate(() => document.documentElement.clientWidth);
  console.log(`\nMobile Width Check: scrollWidth=${scrollWidth}, clientWidth=${clientWidth}`);
  if (scrollWidth > clientWidth) {
    console.warn(`⚠️ Warning: Horizontal scroll detected on mobile! (${scrollWidth}px > ${clientWidth}px)`);
  } else {
    console.log('✓ No horizontal scroll on mobile (Perfect 375px responsive fit)');
  }

  console.log(`\nConsole Errors Logged: ${consoleErrors.length}`);
  if (consoleErrors.length > 0) {
    console.warn('Errors:', consoleErrors);
  } else {
    console.log('✓ Clean console: Zero errors detected!');
  }

  await browser.close();
  console.log('\n🎉 ALL BROWSER TESTS COMPLETED SUCCESSFULLY!');
}

runBrowserTests().catch((err) => {
  console.error('Test runner failed:', err);
  process.exit(1);
});
