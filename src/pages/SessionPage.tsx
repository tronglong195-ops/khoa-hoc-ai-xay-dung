import React, { useMemo, Suspense, lazy } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import { SESSIONS } from '../types';
import type { SessionInfo } from '../types';
import manifest from '../content/manifest.json';
import { getDocContent } from '../content/docsRegistry';
import { MarkdownViewer } from '../components/MarkdownViewer';
import { TitleBlock } from '../components/TitleBlock';
import { TableOfContents } from '../components/TableOfContents';
import { SlideViewer } from '../components/SlideViewer';
import { QuickReview } from '../components/QuickReview';

// Lazy load 3D scenes
const HeroHouseScene = lazy(() => import('../scenes/HeroHouseScene').then(m => ({ default: m.HeroHouseScene })));
const Session1Scene = lazy(() => import('../scenes/Session1Scene').then(m => ({ default: m.Session1Scene })));
const Session2Scene = lazy(() => import('../scenes/Session2Scene').then(m => ({ default: m.Session2Scene })));
const Session3Scene = lazy(() => import('../scenes/Session3Scene').then(m => ({ default: m.Session3Scene })));
const Session4RulesScene = lazy(() => import('../scenes/Session4RulesScene').then(m => ({ default: m.Session4RulesScene })));
const Session5Scene = lazy(() => import('../scenes/Session5Scene').then(m => ({ default: m.Session5Scene })));
const Session6PipelineScene = lazy(() => import('../scenes/Session6PipelineScene').then(m => ({ default: m.Session6PipelineScene })));
import { 
  FileText, 
  Presentation, 
  FolderGit2, 
  Box, 
  Terminal, 
  CheckSquare, 
  AlertTriangle,
  Download,
  ExternalLink,
  ChevronRight
} from 'lucide-react';

export const SessionPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const currentTab = searchParams.get('tab') || 'tong-quan';

  const session = useMemo<SessionInfo | undefined>(() => {
    return SESSIONS.find((s) => s.id === id);
  }, [id]);

  if (!session) {
    return (
      <div className="py-12 text-center">
        <h2 className="text-2xl font-bold text-red-600">Không tìm thấy buổi học</h2>
        <Link to="/" className="text-[#F26B1D] underline mt-4 inline-block">Trở về trang chủ</Link>
      </div>
    );
  }

  // Filter manifest documents belonging to this session
  const sessionDocs = useMemo(() => {
    const prefix = `${session.id}_Buoi_${session.id}_`;
    return manifest.filter((m) => m.sourcePath.startsWith(prefix));
  }, [session.id]);

  // Find document corresponding to current tab
  const activeDoc = useMemo(() => {
    if (currentTab === 'ly-thuyet') {
      return sessionDocs.find((d) => d.sourcePath.includes('Giao_Trinh') || d.sourcePath.includes('ly-thuyet'));
    }
    if (currentTab === 'giao-an') {
      return sessionDocs.find((d) => d.sourcePath.includes('giao-an'));
    }
    if (currentTab === 'prompt') {
      return sessionDocs.find((d) => d.sourcePath.includes('Prompt') || d.sourcePath.includes('prompt'));
    }
    if (currentTab === 'lab') {
      return sessionDocs.find((d) => d.sourcePath.includes('Lab') || d.sourcePath.includes('lab'));
    }
    if (currentTab === 'nghiem-thu') {
      return sessionDocs.find((d) => d.sourcePath.includes('Nghiem_Thu') || d.sourcePath.includes('San_Pham'));
    }
    if (currentTab === 'huong-dan') {
      return sessionDocs.find((d) => d.sourcePath.includes('Huong_Dan') || d.sourcePath.includes('huong-dan'));
    }
    return null;
  }, [currentTab, sessionDocs]);

  const activeDocContent = useMemo(() => {
    if (!activeDoc) return '';
    return getDocContent(activeDoc.id);
  }, [activeDoc]);

  // Slides for this session
  const sessionSlides = useMemo(() => {
    const mapping: { [key: string]: { path: string; title: string }[] } = {
      '01': [
        { path: '01_Buoi_01_Hieu_Dung_AI_Xay_Dung_Bo_Nao_Du_An___slide-buoi-01-swiss.html', title: 'Slide Bài Giảng Buổi 01 (Swiss Style)' },
        { path: '01_Buoi_01_Hieu_Dung_AI_Xay_Dung_Bo_Nao_Du_An___slide-buoi-01.html', title: 'Slide Bài Giảng Buổi 01 (Tiêu Chuẩn)' },
      ],
      '02': [
        { path: '02_Buoi_02_Khai_Thac_Ho_So_Ky_Thuat___slide-buoi-02-swiss.html', title: 'Slide Bài Giảng Buổi 02 (Swiss Style)' },
      ],
      '03': [
        { path: '03_Buoi_03_Thiet_Ke_Va_Dieu_Khien_AutoCAD___07_slide-buoi-03-swiss.html', title: 'Slide Buổi 03: Điều Khiển AutoCAD (Swiss Style)' },
        { path: '03_Buoi_03_Thiet_Ke_Va_Dieu_Khien_AutoCAD___08_slide-buoi-03-long-table.html', title: 'Slide Buổi 03: Bàn Vẽ Dài (Long Table Style)' },
      ],
      '04': [
        { path: '04_Buoi_04_Agent_ClaudeMD_Blender_3D___09_slide-buoi-04-swiss.html', title: 'Slide Buổi 04: CLAUDE.md & Blender 3D (Swiss Style)' },
      ],
      '05': [
        { path: '05_Buoi_05_Agent_Chuyen_Trach_Render_AI_Boc_Khoi_Luong___03_slide-buoi-05-swiss.html', title: 'Slide Buổi 05: Render AI & Bóc Khối Lượng (Swiss Style)' },
        { path: '05_Buoi_05_Agent_Chuyen_Trach_Render_AI_Boc_Khoi_Luong___04_slide-buoi-05-blueprint.html', title: 'Slide Buổi 05: Phong Cách Blueprint' },
        { path: '05_Buoi_05_Agent_Chuyen_Trach_Render_AI_Boc_Khoi_Luong___src-slide-blueprint___deck.html', title: 'Slide Buổi 05: Bản Gốc Nguồn' },
      ],
      '06': [
        { path: '06_Buoi_06_Quy_Trinh_Tron_Goi_Ho_So_Nha_Pho___03_slide-buoi-06-swiss.html', title: 'Slide Buổi 06: Quy Trình Trọn Gói 6 Agent (Swiss Style)' },
        { path: '06_Buoi_06_Quy_Trinh_Tron_Goi_Ho_So_Nha_Pho___05_slide-buoi-06-bo-sung-swiss.html', title: 'Slide Buổi 06: Bổ Sung Handoff (Swiss Style)' },
        { path: '06_Buoi_06_Quy_Trinh_Tron_Goi_Ho_So_Nha_Pho___src-slide___deck.html', title: 'Slide Buổi 06: Bản Gốc Deck' },
        { path: '06_Buoi_06_Quy_Trinh_Tron_Goi_Ho_So_Nha_Pho___src-slide-bo-sung___deck.html', title: 'Slide Buổi 06: Bản Gốc Bổ Sung' },
      ],
    };
    return mapping[session.id] || [];
  }, [session.id]);

  // Demo files for this session
  const sessionDemos = useMemo(() => {
    return sessionDocs.filter((d) => d.sourcePath.includes('/demo/'));
  }, [sessionDocs]);

  // Quick Review Data for Theory tab
  const quickReviewData = useMemo(() => {
    return {
      summaryPoints: [
        'AI trong xây dựng cần chuyển dịch từ Chatbot rời rạc sang AI Workspace có ngữ cảnh dự án hoàn chỉnh.',
        'Hệ thống Context Profile và CLAUDE.md đóng vai trò như bộ não lưu trữ quy chuẩn, tiêu chuẩn và dữ liệu mặt bằng.',
        'Quy tắc ứng xử kỹ thuật đòi hỏi tính zero-hallucination: Không tự bịa thông số kích thước khi bản vẽ chưa có.',
        'Phân tách rõ ràng giữa phân vai AI Agent chuyên trách và Kỹ sư trưởng kiểm duyệt (HITL - Human-in-the-Loop).',
        'Sản phẩm nghiệm thu từng buổi là cơ sở bàn giao (handoff) tin cậy cho mắt xích công việc tiếp theo trong chuỗi sản xuất.',
      ],
      flashcards: [
        { question: 'Context Profile là gì trong AI Workspace?', answer: 'Tài liệu lõi tóm tắt toàn bộ thông số dự án: vị trí, diện tích, quy mô, tiêu chuẩn áp dụng để nạp cho AI trong mọi tác vụ.' },
        { question: 'Nguyên tắc HITL (Human-in-the-Loop) là gì?', answer: 'Cơ chế bắt buộc phải có kỹ sư con người thẩm định và ký duyệt tại các cổng kiểm soát trước khi đưa bản vẽ hay số liệu ra thi công.' },
        { question: 'Sự khác biệt giữa Skill và Prompt rời rạc?', answer: 'Prompt rời chỉ dùng 1 lần; Skill là quy trình hoàn chỉnh được đóng gói có cấu trúc đầu vào, bước xử lý và khuôn mẫu đầu ra chuẩn.' },
        { question: 'Tại sao cần mã hóa bản vẽ 2D thành JSON trước khi lên 3D?', answer: 'Vì JSON cung cấp tọa độ tường, cửa, cao độ số học chính xác tuyệt đối giúp script Blender hoặc Three.js dựng hình chuẩn 100% không sai lệch.' },
        { question: 'Mục đích của hệ thống 3 tầng CLAUDE.md?', answer: 'Phân cấp quy tắc từ mức độ toàn công ty (Root), đến mức độ dự án cụ thể, và đến từng thư mục tác vụ chuyên trách.' },
      ],
      quiz: [
        {
          question: 'Ba cấp độ ứng dụng AI trong xây dựng theo giáo trình bao gồm những gì?',
          options: [
            'A. Chatbot độc lập → AI Workspace dự án → Hệ thống AI Agent tự chủ',
            'B. Soạn thảo văn bản → Vẽ phối cảnh → Bóc dự toán',
            'C. Lập trình Python → Vẽ AutoCAD → Dựng Revit',
            'D. Nhận dạng ảnh → Dịch thuật → Tạo slide'
          ],
          correctAnswer: 0,
          explanation: 'Giáo trình phân định rõ 3 cấp độ: Cấp 1 (Chatbot độc lập), Cấp 2 (AI Workspace gắn với ngữ cảnh dự án), và Cấp 3 (Tổ hợp AI Agent tự chủ phối hợp).'
        },
        {
          question: 'Khi phát hiện bản vẽ thiếu cao độ dầm hoặc kích thước cửa, AI Agent cần làm gì?',
          options: [
            'A. Tự ước lượng theo kinh nghiệm nhà dân dụng thông thường',
            'B. Dừng lại, đánh dấu [cần kiểm tra] và lập phiếu RFI gửi kỹ sư phê duyệt',
            'C. Bỏ qua cấu kiện đó không bóc tách',
            'D. Tự tăng kích thước lên 20% cho an toàn'
          ],
          correctAnswer: 1,
          explanation: 'Nguyên tắc zero-hallucination quy định tuyệt đối không bịa số liệu kỹ thuật, mọi thông số chưa rõ phải đánh dấu và xuất phiếu yêu cầu thông tin (RFI).'
        },
        {
          question: 'File nào đóng vai trò "Bộ não dự án" lưu trữ quy định và nội quy vận hành AI?',
          options: [
            'A. index.html',
            'B. CLAUDE.md',
            'C. package.json',
            'D. styles.css'
          ],
          correctAnswer: 1,
          explanation: 'CLAUDE.md là tệp cấu hình cốt lõi quy định ngữ cảnh, quy tắc kỹ thuật và hướng dẫn hành vi cho Claude Code/AI Agent trong suốt dự án.'
        },
        {
          question: 'Trong quy trình sản xuất hồ sơ nhà phố, có bao nhiêu cổng kiểm duyệt con người (HITL)?',
          options: [
            'A. Không có cổng nào, AI làm tự động 100%',
            'B. 1 cổng ở cuối cùng khi in ấn',
            'C. 3 cổng duyệt then chốt: Mặt bằng công năng, Mô hình 3D & BOQ, và Đóng gói hồ sơ',
            'D. 10 cổng duyệt'
          ],
          correctAnswer: 2,
          explanation: 'Quy trình chuẩn Buổi 06 thiết lập 3 cổng duyệt HITL nhằm kiểm soát tuyệt đối chất lượng tại các mốc bàn giao then chốt.'
        },
        {
          question: 'Phương pháp nào giúp AI render ảnh phối cảnh mà không làm biến dạng hình khối kiến trúc?',
          options: [
            'A. Dựng mộc khối 3D chính xác từ mặt bằng rồi dùng ControlNet/Inpainting để giữ khối và chỉ thay đổi bề mặt vật liệu',
            'B. Gõ prompt mô tả chung chung để AI tự do sáng tạo khối',
            'C. Tải ảnh trên mạng về ghép vào',
            'D. Chỉ vẽ tay phác thảo'
          ],
          correctAnswer: 0,
          explanation: 'Nguyên tắc "AI chỉ sơn lại, không xây lại": Giữ nguyên hình khối hình học 3D chuẩn xác, AI chỉ hỗ trợ phủ chất liệu và ánh sáng.'
        }
      ]
    };
  }, []);

  return (
    <div className="space-y-6 py-4">
      {/* Architectural Title Block */}
      <TitleBlock
        sheetNumber={session.sessionNumber}
        projectTitle="KHÓA HỌC THỰC CHIẾN AI XÂY DỰNG"
        topicTitle={session.title}
        deliverable={session.deliverable}
        duration={session.duration}
      />

      {/* Navigation Tabs Bar */}
      <div className="flex items-center gap-1 overflow-x-auto border-b-2 border-[#1B242A] dark:border-[#1C3B5E] pb-1 font-mono text-xs">
        {session.tabs.map((tab) => {
          const isActive = currentTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setSearchParams({ tab: tab.id })}
              className={`px-3.5 py-2 rounded-t font-bold transition-all shrink-0 flex items-center gap-1.5 ${
                isActive
                  ? 'bg-[#0B1E33] text-white dark:bg-white dark:text-[#0B1E33] border-t-2 border-x-2 border-[#1B242A] dark:border-white -mb-[6px] pb-2.5 z-10'
                  : 'bg-[#EAE6DD] dark:bg-[#142D4B] text-gray-700 dark:text-gray-300 hover:bg-[#F26B1D]/20 hover:text-[#F26B1D]'
              }`}
            >
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab 1: Tổng Quan (Overview Timeline 150min & Roadmap) */}
      {currentTab === 'tong-quan' && (
        <div className="space-y-8 bg-white dark:bg-[#0B1E33] border border-[#D8D4C8] dark:border-[#1C3B5E] rounded-lg p-6 shadow-sm">
          <div>
            <h3 className="text-xl font-bold text-[#0B1E33] dark:text-white flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#F26B1D]"></span>
              MỤC TIÊU & SẢN PHẨM BÀN GIAO BUỔI HỌC
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-2 font-sans leading-relaxed">
              {session.shortDesc}
            </p>
          </div>

          {/* Timeline 150 phút */}
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-5 bg-[#FAF8F5] dark:bg-[#06121E]">
            <h4 className="text-sm font-bold font-mono text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-4 flex items-center gap-2">
              <span className="px-2 py-0.5 bg-[#F26B1D] text-white text-[11px] rounded">TIMELINE</span>
              LỘ TRÌNH 150 PHÚT CHUẨN XÂY DỰNG
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-3 font-mono text-xs">
              <div className="p-3 bg-white dark:bg-[#0E2744] border-l-4 border-blue-500 rounded shadow-sm">
                <span className="text-gray-400 block">0 - 25 PHÚT</span>
                <span className="font-bold text-gray-900 dark:text-white block mt-1">Khởi Động & Đặt Vấn Đề</span>
                <span className="text-[11px] text-gray-500 block mt-1">Hiện trạng mâu thuẫn hồ sơ</span>
              </div>
              <div className="p-3 bg-white dark:bg-[#0E2744] border-l-4 border-[#F26B1D] rounded shadow-sm">
                <span className="text-gray-400 block">25 - 65 PHÚT</span>
                <span className="font-bold text-gray-900 dark:text-white block mt-1">Lý Thuyết Chuyên Sâu</span>
                <span className="text-[11px] text-gray-500 block mt-1">Phương pháp & nguyên lý AI</span>
              </div>
              <div className="p-3 bg-white dark:bg-[#0E2744] border-l-4 border-yellow-500 rounded shadow-sm">
                <span className="text-gray-400 block">65 - 85 PHÚT</span>
                <span className="font-bold text-gray-900 dark:text-white block mt-1">Giảng Viên Live Demo</span>
                <span className="text-[11px] text-gray-500 block mt-1">Thực chiến trên case mẫu</span>
              </div>
              <div className="p-3 bg-white dark:bg-[#0E2744] border-l-4 border-green-500 rounded shadow-sm">
                <span className="text-gray-400 block">85 - 130 PHÚT</span>
                <span className="font-bold text-gray-900 dark:text-white block mt-1">Thực Hành Lab Độc Lập</span>
                <span className="text-[11px] text-gray-500 block mt-1">Học viên tự tay hoàn thiện</span>
              </div>
              <div className="p-3 bg-white dark:bg-[#0E2744] border-l-4 border-purple-500 rounded shadow-sm">
                <span className="text-gray-400 block">130 - 150 PHÚT</span>
                <span className="font-bold text-gray-900 dark:text-white block mt-1">Nghiệm Thu Rubric D</span>
                <span className="text-[11px] text-gray-500 block mt-1">Đối soát tiêu chí sản phẩm</span>
              </div>
            </div>
          </div>

          {/* Quick links to files */}
          <div>
            <h4 className="text-xs font-bold font-mono text-gray-400 uppercase tracking-wider mb-3">
              DANH MỤC HỒ SƠ BUỔI HỌC (RENDER NGUYÊN VĂN 100%)
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {sessionDocs.map((doc) => (
                <div
                  key={doc.id}
                  onClick={() => {
                    if (doc.sourcePath.includes('Giao_Trinh')) setSearchParams({ tab: 'ly-thuyet' });
                    else if (doc.sourcePath.includes('Prompt')) setSearchParams({ tab: 'prompt' });
                    else if (doc.sourcePath.includes('Lab')) setSearchParams({ tab: 'lab' });
                    else if (doc.sourcePath.includes('Nghiem_Thu')) setSearchParams({ tab: 'nghiem-thu' });
                    else setSearchParams({ tab: 'demo' });
                  }}
                  className="cursor-pointer p-3 rounded border border-gray-200 dark:border-gray-700 hover:border-[#F26B1D] dark:hover:border-[#F26B1D] bg-[#FAF8F5] dark:bg-[#0E2744] transition-all flex items-center justify-between"
                >
                  <div className="flex items-center gap-2.5 truncate pr-2">
                    <FileText className="w-4 h-4 text-[#F26B1D] shrink-0" />
                    <span className="text-xs font-semibold text-gray-900 dark:text-gray-100 truncate">
                      {doc.title}
                    </span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400 shrink-0" />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab: Render Markdown Nguyên Văn (Lý Thuyết / Giáo Án / Prompt / Lab / Nghiệm Thu) */}
      {activeDoc && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-9 bg-white dark:bg-[#0B1E33] border border-[#D8D4C8] dark:border-[#1C3B5E] rounded-lg p-6 md:p-8 shadow-sm">
            <div className="mb-6 pb-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between text-xs font-mono text-gray-500">
              <span>Nguồn file: <code className="text-[#F26B1D] font-bold">{activeDoc.sourcePath}</code></span>
              <span>{activeDoc.wordCount.toLocaleString()} từ | Render nguyên văn 100%</span>
            </div>

            {/* Verbatim Content */}
            <MarkdownViewer content={activeDocContent} />

            {/* Quick Review at end of Theory tab */}
            {currentTab === 'ly-thuyet' && (
              <QuickReview
                summaryPoints={quickReviewData.summaryPoints}
                flashcards={quickReviewData.flashcards}
                quiz={quickReviewData.quiz}
                sessionId={session.id}
              />
            )}
          </div>

          {/* Sticky Table of Contents */}
          <div className="hidden lg:block lg:col-span-3">
            <TableOfContents headings={activeDoc.headings} />
          </div>
        </div>
      )}

      {/* Tab: Slide Trình Chiếu */}
      {currentTab === 'slide' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-[#0B1E33] border border-[#D8D4C8] dark:border-[#1C3B5E] rounded-lg p-5">
            <h3 className="text-lg font-bold text-[#0B1E33] dark:text-white flex items-center gap-2">
              <Presentation className="w-5 h-5 text-[#F26B1D]" />
              BỘ SLIDE TRÌNH CHIẾU BUỔI {session.sessionNumber} ({sessionSlides.length} BẢN)
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Slide chuẩn định dạng HTML khép kín (self-contained base64), chỉ tải khi bạn mở tab để tối ưu hiệu năng.
            </p>
          </div>

          {sessionSlides.map((slide, sIdx) => (
            <SlideViewer key={sIdx} slidePath={slide.path} title={slide.title} />
          ))}
        </div>
      )}

      {/* Tab: Demo & Tài Liệu Mẫu */}
      {currentTab === 'demo' && (
        <div className="space-y-8">
          <div className="bg-white dark:bg-[#0B1E33] border border-[#D8D4C8] dark:border-[#1C3B5E] rounded-lg p-5">
            <h3 className="text-lg font-bold text-[#0B1E33] dark:text-white flex items-center gap-2">
              <FolderGit2 className="w-5 h-5 text-[#F26B1D]" />
              TÀI LIỆU DEMO, BẢN VẼ & DỮ LIỆU ĐẦU VÀO BUỔI {session.sessionNumber}
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Bao gồm các file Markdown mẫu, cây thư mục Agent, và liên kết tải trực tiếp các tệp nhị phân (.dwg, .dxf, .blend, .xlsx, .pdf).
            </p>
          </div>

          {/* Binary files download links */}
          <div className="bg-[#FAF8F5] dark:bg-[#06121E] border border-[#D8D4C8] dark:border-[#1C3B5E] rounded-lg p-5">
            <h4 className="text-xs font-bold font-mono text-[#F26B1D] uppercase tracking-wider mb-3 flex items-center gap-2">
              <Download className="w-4 h-4" /> TẢI FILE GỐC (GITHUB RAW)
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {session.id === '04' && (
                <>
                  <a
                    href="https://github.com/cesglobal-vn/Tai-lieu-khoa-hoc-ai-xay-dung/raw/main/04_Buoi_04_Agent_ClaudeMD_Blender_3D/demo/07-nha-pho-lo-7x20m/01_ban-ve-nha-pho-lo-7x20m.dwg"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-white dark:bg-[#0E2744] border border-gray-200 dark:border-gray-700 rounded hover:border-[#F26B1D] text-xs flex items-center justify-between"
                  >
                    <span className="font-mono font-bold truncate">01_ban-ve-nha-pho-7x20m.dwg</span>
                    <Download className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                  </a>
                  <a
                    href="https://github.com/cesglobal-vn/Tai-lieu-khoa-hoc-ai-xay-dung/raw/main/04_Buoi_04_Agent_ClaudeMD_Blender_3D/demo/07-nha-pho-lo-7x20m/02_ban-ve-nha-pho-lo-7x20m.dxf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-white dark:bg-[#0E2744] border border-gray-200 dark:border-gray-700 rounded hover:border-[#F26B1D] text-xs flex items-center justify-between"
                  >
                    <span className="font-mono font-bold truncate">02_ban-ve-nha-pho-7x20m.dxf</span>
                    <Download className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                  </a>
                  <a
                    href="https://github.com/cesglobal-vn/Tai-lieu-khoa-hoc-ai-xay-dung/raw/main/04_Buoi_04_Agent_ClaudeMD_Blender_3D/demo/07-nha-pho-lo-7x20m/04_nha-pho-lo-7x20m.blend"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-white dark:bg-[#0E2744] border border-gray-200 dark:border-gray-700 rounded hover:border-[#F26B1D] text-xs flex items-center justify-between"
                  >
                    <span className="font-mono font-bold truncate">04_nha-pho-7x20m.blend</span>
                    <Download className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                  </a>
                </>
              )}
              {session.id === '02' && (
                <>
                  <a
                    href="https://github.com/cesglobal-vn/Tai-lieu-khoa-hoc-ai-xay-dung/raw/main/02_Buoi_02_Khai_Thac_Ho_So_Ky_Thuat/demo/01_Chi_Dan_Ky_Thuat_PCCC_GreenTech_Tower.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-white dark:bg-[#0E2744] border border-gray-200 dark:border-gray-700 rounded hover:border-[#F26B1D] text-xs flex items-center justify-between"
                  >
                    <span className="font-mono font-bold truncate">01_PCCC_GreenTech_Tower.pdf</span>
                    <Download className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                  </a>
                  <a
                    href="https://github.com/cesglobal-vn/Tai-lieu-khoa-hoc-ai-xay-dung/raw/main/02_Buoi_02_Khai_Thac_Ho_So_Ky_Thuat/demo/04_rfi-arc-001-cua-d08-ei90.docx"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-white dark:bg-[#0E2744] border border-gray-200 dark:border-gray-700 rounded hover:border-[#F26B1D] text-xs flex items-center justify-between"
                  >
                    <span className="font-mono font-bold truncate">04_RFI_Cua_D08_EI90.docx</span>
                    <Download className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                  </a>
                </>
              )}
            </div>
          </div>

          {/* Markdown Demo Files in Tab */}
          <div className="space-y-6">
            {sessionDemos.map((demo) => (
              <div key={demo.id} className="bg-white dark:bg-[#0B1E33] border border-[#D8D4C8] dark:border-[#1C3B5E] rounded-lg p-6 shadow-sm">
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-gray-200 dark:border-gray-700 text-xs font-mono">
                  <span className="font-bold text-[#F26B1D]">{demo.sourcePath}</span>
                  <span className="text-gray-400">{demo.wordCount} từ</span>
                </div>
                <MarkdownViewer content={getDocContent(demo.id)} />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab: Mô Hình 3D Chuyên Biệt */}
      {currentTab === '3d' && (
        <div className="bg-white dark:bg-[#0B1E33] border border-[#D8D4C8] dark:border-[#1C3B5E] rounded-lg p-6 shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-gray-200 dark:border-gray-700">
            <div>
              <h3 className="text-xl font-bold text-[#0B1E33] dark:text-white flex items-center gap-2">
                <Box className="w-5 h-5 text-[#F26B1D]" />
                MINH HỌA 3D TƯƠNG TÁC — BUỔI {session.sessionNumber}
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Mô hình trực quan hóa Three.js / React Three Fiber gắn đúng khái niệm cốt lõi trong giáo trình.
              </p>
            </div>
            <span className="text-xs font-mono px-2.5 py-1 bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-300 rounded font-bold">
              Three.js + R3F (Demand Loop)
            </span>
          </div>

          <Suspense
            fallback={
              <div className="aspect-16/9 bg-[#0B1E33] rounded-lg flex flex-col items-center justify-center p-8 text-center text-white">
                <div className="w-10 h-10 border-4 border-[#F26B1D] border-t-transparent rounded-full animate-spin mb-4" />
                <p className="text-xs font-mono text-gray-300">Đang khởi tạo không gian 3D tương tác...</p>
              </div>
            }
          >
            {session.id === '01' && <Session1Scene />}
            {session.id === '02' && <Session2Scene />}
            {session.id === '03' && <Session3Scene />}
            {session.id === '04' && (
              <div className="space-y-6">
                <HeroHouseScene initialStage={3} />
                <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <h4 className="text-sm font-bold font-mono text-[#F26B1D] mb-3">
                    MINH HỌA BỔ SUNG: HỆ THỐNG 3 TẦNG CLAUDE.MD
                  </h4>
                  <Session4RulesScene />
                </div>
              </div>
            )}
            {session.id === '05' && <Session5Scene />}
            {session.id === '06' && <Session6PipelineScene />}
          </Suspense>
        </div>
      )}
    </div>
  );
};
