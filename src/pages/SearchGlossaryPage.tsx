import React, { useState, useMemo } from 'react';
import Fuse from 'fuse.js';
import manifest from '../content/manifest.json';
import { TitleBlock } from '../components/TitleBlock';
import { Search, BookOpen, ExternalLink, ArrowRight, Tag, Bookmark } from 'lucide-react';
import { Link } from 'react-router-dom';

const GLOSSARY_TERMS = [
  {
    term: 'Agent',
    vi: 'Tác tử AI',
    definition: 'Mô hình AI được trao thẩm quyền, mục tiêu rõ ràng, khả năng sử dụng công cụ (tools) và tự ra quyết định để thực hiện chuỗi nhiệm vụ phức tạp thay vì chỉ trả lời câu hỏi đơn lẻ.',
    sourceFile: '00_Tong_Quan_Chuong_Trinh/02_Kien_Truc_He_Thong_6_AI_Agent.md',
    link: '/tong-quan/kien-truc-agent',
  },
  {
    term: 'Subagent',
    vi: 'Tác tử phụ / chuyên môn sâu',
    definition: 'Agent con được Agent chính gọi lên để thực thi một tác vụ hẹp với bộ công cụ chuyên biệt, sau khi hoàn thành sẽ trả kết quả lại cho Agent điều phối.',
    sourceFile: '00_Tong_Quan_Chuong_Trinh/02_Kien_Truc_He_Thong_6_AI_Agent.md',
    link: '/tong-quan/kien-truc-agent',
  },
  {
    term: 'Skill',
    vi: 'Kỹ năng đóng gói',
    definition: 'Một tập hợp hướng dẫn, quy chuẩn và kịch bản thực thi được đóng gói dạng tệp SKILL.md, giúp AI thực hiện một nghiệp vụ chuyên môn (ví dụ: rà soát PCCC, kiểm tra mác bê tông) chuẩn xác 100% không lệch chuẩn.',
    sourceFile: '02_Buoi_02_Khai_Thac_Ho_So_Ky_Thuat/01_Giao_Trinh_Chi_Tiet_Buoi_02.md',
    link: '/buoi/02?tab=ly-thuyet',
  },
  {
    term: 'CLAUDE.md',
    vi: 'Quy tắc quản trị AI Workspace',
    definition: 'Tệp quy tắc đặt ở gốc thư mục dự án, đóng vai trò "Bộ não dự án", nạp sẵn cho Claude Code mọi quy chuẩn kỹ thuật, phong cách vẽ, cấu trúc thư mục và ràng buộc bảo mật.',
    sourceFile: '01_Buoi_01_Hieu_Dung_AI_Xay_Dung_Bo_Nao_Du_An/01_Giao_Trinh_Chi_Tiet_Buoi_01.md',
    link: '/buoi/01?tab=ly-thuyet',
  },
  {
    term: 'MCP (Model Context Protocol)',
    vi: 'Giao thức ngữ cảnh mô hình',
    definition: 'Giao thức mở cho phép LLM kết nối an toàn với các công cụ bên ngoài như hệ cơ sở dữ liệu, phần mềm CAD (AutoCAD, Blender, Revit) và hệ thống tệp nội bộ.',
    sourceFile: '03_Buoi_03_Thiet_Ke_Va_Dieu_Khien_AutoCAD/01_Giao_Trinh_Chi_Tiet_Buoi_03.md',
    link: '/buoi/03?tab=ly-thuyet',
  },
  {
    term: 'HITL (Human-in-the-Loop)',
    vi: 'Con người trong vòng lặp kiểm soát',
    definition: 'Cơ chế bắt buộc phải có sự thẩm định, phê duyệt của kỹ sư / kiến trúc sư con người tại các mốc then chốt trước khi bản vẽ hoặc khối lượng được chuyển giao sang công đoạn tiếp theo.',
    sourceFile: '00_Tong_Quan_Chuong_Trinh/02_Kien_Truc_He_Thong_6_AI_Agent.md',
    link: '/tong-quan/kien-truc-agent',
  },
  {
    term: 'RFI (Request for Information)',
    vi: 'Phiếu yêu cầu làm rõ thông tin',
    definition: 'Văn bản kỹ thuật chính thức gửi Chủ đầu tư hoặc Tư vấn thiết kế khi phát hiện mâu thuẫn giữa các bản vẽ, chỉ dẫn kỹ thuật hoặc thiếu hụt kích thước trong hồ sơ.',
    sourceFile: '02_Buoi_02_Khai_Thac_Ho_So_Ky_Thuat/01_Giao_Trinh_Chi_Tiet_Buoi_02.md',
    link: '/buoi/02?tab=ly-thuyet',
  },
  {
    term: 'BOQ (Bill of Quantities)',
    vi: 'Bảng tiên lượng dự toán khối lượng',
    definition: 'Bảng chi tiết khối lượng công tác xây dựng (bê tông, ván khuôn, cốt thép, xây tô, cửa...) bóc tách từ bản vẽ thiết kế để phục vụ đấu thầu và lập dự toán ngân sách.',
    sourceFile: '04_Buoi_04_Boc_Tach_Khoi_Luong_BOQ_Du_Toan/01_Giao_Trinh_Chi_Tiet_Buoi_04.md',
    link: '/chuyen-de/boq-du-toan/ly-thuyet',
  },
  {
    term: 'Context Profile',
    vi: 'Hồ sơ ngữ cảnh dự án',
    definition: 'Bản tóm lược chuẩn mực toàn bộ dữ liệu dự án: quy mô, diện tích, công năng, tiêu chuẩn PCCC, mác vật liệu, giúp AI luôn nắm chắc bối cảnh và không bị nhầm lẫn giữa các công trình.',
    sourceFile: '01_Buoi_01_Hieu_Dung_AI_Xay_Dung_Bo_Nao_Du_An/01_Giao_Trinh_Chi_Tiet_Buoi_01.md',
    link: '/buoi/01?tab=ly-thuyet',
  },
  {
    term: 'Zero-hallucination',
    vi: 'Không suy diễn ảo giác',
    definition: 'Nguyên tắc bất di bất dịch trong kỹ thuật xây dựng: AI chỉ được trích xuất và tính toán dựa trên số liệu có thật trong bản vẽ; nếu thiếu thì đánh dấu [cần kiểm tra] chứ tuyệt đối không được tự bịa ra con số.',
    sourceFile: '01_Buoi_01_Hieu_Dung_AI_Xay_Dung_Bo_Nao_Du_An/01_Giao_Trinh_Chi_Tiet_Buoi_01.md',
    link: '/buoi/01?tab=ly-thuyet',
  },
];

export const SearchGlossaryPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'glossary' | 'search'>('glossary');
  const [searchQuery, setSearchQuery] = useState('');

  // Setup Fuse.js for full-text search across all 68 documents
  const fuse = useMemo(() => {
    return new Fuse(manifest, {
      keys: ['title', 'category', 'sourcePath'],
      threshold: 0.35,
    });
  }, []);

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    return fuse.search(searchQuery).map((res) => res.item);
  }, [searchQuery, fuse]);

  return (
    <div className="space-y-6 py-4">
      <TitleBlock
        sheetNumber="SRH"
        projectTitle="HỒ SƠ KHÓA HỌC AI XÂY DỰNG"
        topicTitle="TRA CỨU TOÀN VĂN & TỪ ĐIỂN THUẬT NGỮ"
        deliverable="Hệ Thống Index & Chuẩn Hóa Thuật Ngữ AI Xây Dựng"
        duration="Tra cứu tức thì"
      />

      {/* Tabs Switcher */}
      <div className="flex items-center gap-2 border-b-2 border-[#1B242A] dark:border-[#1C3B5E] pb-1 font-mono text-xs">
        <button
          onClick={() => setActiveTab('glossary')}
          className={`px-4 py-2 rounded-t font-bold transition-all ${
            activeTab === 'glossary'
              ? 'bg-[#0B1E33] text-white dark:bg-white dark:text-[#0B1E33]'
              : 'bg-[#EAE6DD] dark:bg-[#142D4B] text-gray-700 dark:text-gray-300'
          }`}
        >
          BẢNG THUẬT NGỮ CHUYÊN NGÀNH ({GLOSSARY_TERMS.length})
        </button>
        <button
          onClick={() => setActiveTab('search')}
          className={`px-4 py-2 rounded-t font-bold transition-all ${
            activeTab === 'search'
              ? 'bg-[#0B1E33] text-white dark:bg-white dark:text-[#0B1E33]'
              : 'bg-[#EAE6DD] dark:bg-[#142D4B] text-gray-700 dark:text-gray-300'
          }`}
        >
          TÌM KIẾM TOÀN VĂN 68 FILE
        </button>
      </div>

      {/* 1. Bảng Thuật Ngữ */}
      {activeTab === 'glossary' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {GLOSSARY_TERMS.map((item, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-[#0B1E33] border border-[#D8D4C8] dark:border-[#1C3B5E] rounded-lg p-5 shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between pb-2 mb-3 border-b border-gray-100 dark:border-gray-800">
                  <h4 className="font-mono font-bold text-base text-[#F26B1D]">
                    {item.term}
                  </h4>
                  <span className="text-xs text-gray-500 italic">{item.vi}</span>
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed font-sans">
                  {item.definition}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-dashed border-gray-200 dark:border-gray-700 flex items-center justify-between text-xs font-mono">
                <span className="text-gray-400 truncate max-w-[200px]">Nguồn: {item.sourceFile.split('/')[1] || item.sourceFile}</span>
                <Link
                  to={item.link}
                  className="text-[#F26B1D] font-bold hover:underline flex items-center gap-1"
                >
                  <span>Xem tài liệu gốc</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 2. Tìm Kiếm Toàn Văn */}
      {activeTab === 'search' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-[#0B1E33] border border-[#D8D4C8] dark:border-[#1C3B5E] rounded-lg p-5">
            <div className="relative">
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Nhập tên tài liệu, bài giảng, buổi học, mã hồ sơ hoặc tiêu chuẩn..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-[#D8D4C8] dark:border-[#1C3B5E] rounded-lg bg-[#FAF8F5] dark:bg-[#06121E] text-sm focus:outline-none focus:border-[#F26B1D]"
              />
            </div>
          </div>

          {searchQuery && (
            <div className="space-y-3">
              <span className="text-xs font-mono text-gray-500 block">
                Tìm thấy {searchResults.length} kết quả phù hợp:
              </span>

              <div className="grid grid-cols-1 gap-3">
                {searchResults.map((item) => (
                  <Link
                    key={item.id}
                    to={item.route}
                    className="p-4 bg-white dark:bg-[#0B1E33] border border-gray-200 dark:border-gray-700 hover:border-[#F26B1D] rounded-lg shadow-sm transition-all flex items-center justify-between"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 font-bold">
                          {item.category}
                        </span>
                        <span className="text-xs font-mono text-gray-400">{item.sourcePath}</span>
                      </div>
                      <h4 className="font-bold text-sm text-[#0B1E33] dark:text-white">
                        {item.title}
                      </h4>
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-400 shrink-0" />
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
