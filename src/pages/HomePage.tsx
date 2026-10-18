import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Building2, 
  Terminal, 
  Sparkles, 
  ArrowRight, 
  Cpu, 
  CheckCircle2, 
  ShieldAlert,
  Boxes,
  Compass,
  FileSpreadsheet,
  Layers
} from 'lucide-react';
import { SESSIONS } from '../types';

const HeroHouseScene = React.lazy(() => import('../scenes/HeroHouseScene').then(m => ({ default: m.HeroHouseScene })));
export const HomePage: React.FC = () => {
  return (
    <div className="space-y-16 py-6">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b-2 border-[#1B242A] dark:border-[#1C3B5E] pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#F26B1D]/10 border border-[#F26B1D]/30 text-[#F26B1D] text-xs font-mono font-bold tracking-wide">
              <span className="w-2 h-2 rounded-full bg-[#F26B1D] animate-ping" />
              CHƯƠNG TRÌNH ĐÀO TẠO THỰC CHIẾN 2026
            </div>
            
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-[#0B1E33] dark:text-white leading-[1.15]">
              LÀM CHỦ AI TRONG <br />
              <span className="text-[#F26B1D] underline decoration-[#1B242A] decoration-wavy decoration-2">
                DỰ ÁN XÂY DỰNG
              </span>
            </h1>

            <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed font-sans max-w-2xl">
              Từ khai thác hồ sơ kỹ thuật, rà soát xung đột tiêu chuẩn PCCC, điều khiển AutoCAD bằng AutoLISP đến thiết lập hệ thống 6 Agent tự động dựng 3D tham số và bóc tách BOQ dự toán.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                to="/buoi/01"
                className="px-6 py-3 rounded bg-[#F26B1D] hover:bg-orange-600 text-white font-bold text-sm tracking-wide shadow-md hover:shadow-lg transition-all flex items-center gap-2 font-mono"
              >
                <span>BẮT ĐẦU BUỔI 01</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/tong-quan/de-cuong"
                className="px-6 py-3 rounded border-2 border-[#1B242A] dark:border-gray-400 bg-white dark:bg-[#0B1E33] hover:bg-gray-100 dark:hover:bg-gray-800 text-[#0B1E33] dark:text-white font-bold text-sm tracking-wide transition-all font-mono"
              >
                XEM ĐỀ CƯƠNG CHI TIẾT
              </Link>
            </div>

            {/* Micro stats banner */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-[#D8D4C8] dark:border-[#1C3B5E] text-xs font-mono">
              <div>
                <span className="text-gray-400 block">THỜI LƯỢNG</span>
                <span className="font-bold text-base text-[#0B1E33] dark:text-white">6 Buổi (15H)</span>
              </div>
              <div>
                <span className="text-gray-400 block">SẢN PHẨM RA</span>
                <span className="font-bold text-base text-[#10B981]">D1 → D6 Chuẩn</span>
              </div>
              <div>
                <span className="text-gray-400 block">TỔ CHỨC AGENT</span>
                <span className="font-bold text-base text-[#F26B1D]">6 Chuyên Trách</span>
              </div>
            </div>
          </div>

          {/* Interactive 3D Teaser Preview */}
          <div className="lg:col-span-5 bg-white dark:bg-[#0B1E33] border-2 border-[#1B242A] dark:border-[#38BDF8] rounded-xl p-4 shadow-xl relative">
            <div className="flex items-center justify-between pb-3 border-b border-gray-200 dark:border-gray-700 text-xs font-mono">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-green-500"></span>
                <span className="ml-2 font-bold text-gray-700 dark:text-gray-200">MÔ HÌNH NHÀ PHỐ 7x20m</span>
              </div>
              <span className="text-[10px] bg-orange-100 dark:bg-orange-950 text-[#F26B1D] px-2 py-0.5 rounded font-bold">
                THỰC THI THẬT
              </span>
            </div>

            <div className="my-3 aspect-4/3 rounded-lg overflow-hidden border border-[#D8D4C8] dark:border-[#1C3B5E]">
              <React.Suspense
                fallback={
                  <div className="w-full h-full flex items-center justify-center bg-[#071321] text-white">
                    <Building2 className="w-10 h-10 text-[#F26B1D] animate-spin mb-2" />
                  </div>
                }
              >
                <HeroHouseScene initialStage={3} />
              </React.Suspense>
            </div>

            <div className="text-[11px] text-gray-500 dark:text-gray-400 flex items-center justify-between font-mono">
              <span>Đơn vị: mm | T1: 3600 | T2: 3400 | T3: 3400</span>
              <span className="text-green-600 dark:text-green-400 font-bold">✓ Đã kiểm định</span>
            </div>
          </div>
        </div>
      </section>

      {/* Dây chuyền 6 buổi học (Process Pipeline Flow) */}
      <section className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#F26B1D] font-bold">
              <Layers className="w-4 h-4" /> BẢN ĐỒ LỘ TRÌNH DÂY CHUYỀN
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0B1E33] dark:text-white mt-1">
              6 BUỔI ĐÀO TẠO NỀN TẢNG ĐẾN CHUYÊN SÂU
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-gray-500 max-w-md">
            Mỗi buổi là một mắt xích công việc chuẩn mực trong văn phòng tư vấn thiết kế và quản lý dự án xây dựng hiện đại.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SESSIONS.map((session, idx) => (
            <Link
              key={session.id}
              to={`/buoi/${session.id}`}
              className="group bg-white dark:bg-[#0B1E33] border-2 border-[#1B242A] dark:border-[#1C3B5E] rounded-lg p-5 shadow-sm hover:shadow-xl hover:border-[#F26B1D] dark:hover:border-[#F26B1D] transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-gray-100 dark:border-gray-800">
                  <span className="font-mono text-sm font-black text-[#F26B1D] bg-orange-100 dark:bg-orange-950/60 px-2.5 py-0.5 rounded">
                    BUỔI {session.sessionNumber}
                  </span>
                  <span className="font-mono text-xs text-gray-500 font-semibold">
                    {session.duration}
                  </span>
                </div>

                <h3 className="font-bold text-base text-[#0B1E33] dark:text-white group-hover:text-[#F26B1D] transition-colors leading-snug">
                  {session.title}
                </h3>

                <p className="text-xs text-gray-600 dark:text-gray-400 mt-2 font-sans line-clamp-2">
                  {session.shortDesc}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-dashed border-gray-200 dark:border-gray-700">
                <span className="text-[10px] text-gray-400 block uppercase font-mono">Sản phẩm đầu ra:</span>
                <span className="text-xs font-semibold text-green-700 dark:text-green-400 block truncate">
                  {session.deliverable}
                </span>
                <div className="mt-3 flex items-center justify-between text-xs font-mono font-bold text-[#F26B1D]">
                  <span>VÀO HỌC NGAY</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Chuyên đề mở rộng & Biểu mẫu */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
        <div className="bg-[#FAF8F5] dark:bg-[#0E2744] border-2 border-[#1B242A] dark:border-[#1C3B5E] rounded-xl p-6">
          <div className="flex items-center gap-2 text-xs font-mono text-[#F26B1D] font-bold mb-2">
            <FileSpreadsheet className="w-4 h-4" /> CHUYÊN ĐỀ MỞ RỘNG
          </div>
          <h3 className="text-xl font-bold text-[#0B1E33] dark:text-white">
            Bóc Tách Khối Lượng BOQ & Lập Dự Toán
          </h3>
          <p className="text-xs text-gray-600 dark:text-gray-300 mt-2 font-sans leading-relaxed">
            Nội dung đầy đủ của Buổi 04 phiên bản BOQ nguyên gốc, bao gồm giáo trình, bài thực hành và rubric đánh giá không bỏ sót bất kỳ tài liệu nào.
          </p>
          <Link
            to="/chuyen-de/boq-du-toan"
            className="inline-flex items-center gap-2 mt-4 text-xs font-mono font-bold text-[#F26B1D] hover:underline"
          >
            <span>XEM CHUYÊN ĐỀ BOQ</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="bg-[#FAF8F5] dark:bg-[#0E2744] border-2 border-[#1B242A] dark:border-[#1C3B5E] rounded-xl p-6">
          <div className="flex items-center gap-2 text-xs font-mono text-[#10B981] font-bold mb-2">
            <CheckCircle2 className="w-4 h-4" /> BIỂU MẪU QUY CHUẨN
          </div>
          <h3 className="text-xl font-bold text-[#0B1E33] dark:text-white">
            Kho 6 Templates Biểu Mẫu Chuẩn
          </h3>
          <p className="text-xs text-gray-600 dark:text-gray-300 mt-2 font-sans leading-relaxed">
            Mẫu yêu cầu dự án, bảng tổng hợp mâu thuẫn, mẫu RFI giải trình kỹ thuật, template CLAUDE.md và kịch bản phân loại yêu cầu.
          </p>
          <Link
            to="/bieu-mau"
            className="inline-flex items-center gap-2 mt-4 text-xs font-mono font-bold text-[#10B981] hover:underline"
          >
            <span>KHÁM PHÁ BIỂU MẪU</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>
    </div>
  );
};
