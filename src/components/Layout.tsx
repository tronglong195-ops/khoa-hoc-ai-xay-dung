import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { 
  Compass, 
  BookOpen, 
  Cpu, 
  Terminal, 
  Search, 
  Menu, 
  X, 
  ExternalLink,
  ChevronDown,
  Layers,
  FileCode,
  CheckSquare
} from 'lucide-react';
import { SESSIONS } from '../types';

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [sessionDropdownOpen, setSessionDropdownOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#F7F5F0]/95 dark:bg-[#0B1E33]/95 backdrop-blur-md border-b-2 border-[#1B242A] dark:border-[#1C3B5E]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo & Name */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-[#0B1E33] dark:bg-white text-[#F26B1D] dark:text-[#0B1E33] flex items-center justify-center font-black font-mono text-xl rounded shadow border border-[#F26B1D]">
              AI
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold tracking-tight text-[#0B1E33] dark:text-white font-mono text-base md:text-lg">
                  AI.XAYDUNG
                </span>
                <span className="text-[10px] font-mono uppercase px-1.5 py-0.2 bg-[#F26B1D] text-white rounded">
                  PORTAL
                </span>
              </div>
              <span className="text-[11px] text-gray-500 dark:text-gray-400 block -mt-1 font-sans">
                Khóa đào tạo chuyên sâu CES Global
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 text-sm font-medium">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `px-3 py-1.5 rounded transition-colors ${
                  isActive
                    ? 'bg-[#0B1E33] text-white dark:bg-white dark:text-[#0B1E33] font-semibold'
                    : 'text-gray-700 dark:text-gray-300 hover:text-[#F26B1D]'
                }`
              }
            >
              Trang Chủ
            </NavLink>

            <NavLink
              to="/gioi-thieu"
              className={({ isActive }) =>
                `px-3 py-1.5 rounded transition-colors ${
                  isActive
                    ? 'bg-[#0B1E33] text-white dark:bg-white dark:text-[#0B1E33] font-semibold'
                    : 'text-gray-700 dark:text-gray-300 hover:text-[#F26B1D]'
                }`
              }
            >
              Giới Thiệu
            </NavLink>

            <NavLink
              to="/tong-quan/de-cuong"
              className={({ isActive }) =>
                `px-3 py-1.5 rounded transition-colors ${
                  isActive
                    ? 'bg-[#0B1E33] text-white dark:bg-white dark:text-[#0B1E33] font-semibold'
                    : 'text-gray-700 dark:text-gray-300 hover:text-[#F26B1D]'
                }`
              }
            >
              Tổng Quan
            </NavLink>

            {/* Sessions Dropdown */}
            <div className="relative">
              <button
                onClick={() => setSessionDropdownOpen(!sessionDropdownOpen)}
                className="flex items-center gap-1 px-3 py-1.5 rounded text-gray-700 dark:text-gray-300 hover:text-[#F26B1D] transition-colors"
              >
                <span>6 Buổi Học</span>
                <ChevronDown className="w-4 h-4" />
              </button>

              {sessionDropdownOpen && (
                <div 
                  className="absolute left-0 mt-2 w-80 bg-white dark:bg-[#0B1E33] border border-[#D8D4C8] dark:border-[#1C3B5E] rounded-lg shadow-xl py-2 z-50 font-sans"
                  onMouseLeave={() => setSessionDropdownOpen(false)}
                >
                  {SESSIONS.map((s) => (
                    <Link
                      key={s.id}
                      to={`/buoi/${s.id}`}
                      onClick={() => setSessionDropdownOpen(false)}
                      className="block px-4 py-2 hover:bg-[#F7F5F0] dark:hover:bg-[#142D4B] transition-colors border-b last:border-b-0 border-gray-100 dark:border-gray-800"
                    >
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold px-1.5 py-0.5 bg-gray-200 dark:bg-gray-700 text-[#0B1E33] dark:text-white rounded">
                          {s.sessionNumber}
                        </span>
                        <span className="text-xs font-semibold text-gray-900 dark:text-gray-100 truncate">
                          {s.title}
                        </span>
                      </div>
                      <span className="text-[11px] text-gray-500 dark:text-gray-400 block mt-0.5 truncate">
                        {s.deliverable}
                      </span>
                    </Link>
                  ))}
                  <div className="pt-2 px-4 border-t border-gray-200 dark:border-gray-700 mt-1">
                    <Link
                      to="/chuyen-de/boq-du-toan"
                      onClick={() => setSessionDropdownOpen(false)}
                      className="text-xs font-medium text-[#F26B1D] hover:underline flex items-center justify-between"
                    >
                      <span>Chuyên đề: BOQ & Dự toán</span>
                      <span className="font-mono text-[10px] bg-orange-100 dark:bg-orange-950 px-1.5 py-0.5 rounded">Mở rộng</span>
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <NavLink
              to="/bieu-mau"
              className={({ isActive }) =>
                `px-3 py-1.5 rounded transition-colors ${
                  isActive
                    ? 'bg-[#0B1E33] text-white dark:bg-white dark:text-[#0B1E33] font-semibold'
                    : 'text-gray-700 dark:text-gray-300 hover:text-[#F26B1D]'
                }`
              }
            >
              Biểu Mẫu
            </NavLink>

            <NavLink
              to="/prompt"
              className={({ isActive }) =>
                `px-3 py-1.5 rounded transition-colors ${
                  isActive
                    ? 'bg-[#0B1E33] text-white dark:bg-white dark:text-[#0B1E33] font-semibold'
                    : 'text-gray-700 dark:text-gray-300 hover:text-[#F26B1D]'
                }`
              }
            >
              Thư Viện Prompt
            </NavLink>

            <NavLink
              to="/tra-cuu"
              className={({ isActive }) =>
                `flex items-center gap-1.5 px-3 py-1.5 rounded transition-colors ${
                  isActive
                    ? 'bg-[#0B1E33] text-white dark:bg-white dark:text-[#0B1E33] font-semibold'
                    : 'text-gray-700 dark:text-gray-300 hover:text-[#F26B1D]'
                }`
              }
            >
              <Search className="w-3.5 h-3.5" />
              <span>Tra Cứu</span>
            </NavLink>
          </nav>

          {/* GitHub Raw Repository Link */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href="https://github.com/cesglobal-vn/Tai-lieu-khoa-hoc-ai-xay-dung"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs font-mono px-3 py-1.5 rounded border border-[#1B242A] dark:border-gray-500 hover:bg-[#F26B1D] hover:text-white hover:border-[#F26B1D] transition-colors"
            >
              <span>GitHub Repo</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white dark:bg-[#0B1E33] border-b border-[#D8D4C8] dark:border-[#1C3B5E] px-4 pt-2 pb-6 space-y-3 font-sans">
          <div className="grid grid-cols-2 gap-2 text-sm">
            <Link to="/" onClick={() => setMobileMenuOpen(false)} className="p-2 rounded bg-gray-100 dark:bg-gray-800">Trang Chủ</Link>
            <Link to="/gioi-thieu" onClick={() => setMobileMenuOpen(false)} className="p-2 rounded bg-gray-100 dark:bg-gray-800">Giới Thiệu</Link>
            <Link to="/tong-quan/de-cuong" onClick={() => setMobileMenuOpen(false)} className="p-2 rounded bg-gray-100 dark:bg-gray-800">Đề Cương</Link>
            <Link to="/tong-quan/kien-truc-agent" onClick={() => setMobileMenuOpen(false)} className="p-2 rounded bg-gray-100 dark:bg-gray-800">Hệ Thống Agent</Link>
            <Link to="/prompt" onClick={() => setMobileMenuOpen(false)} className="p-2 rounded bg-gray-100 dark:bg-gray-800">Thư Viện Prompt</Link>
            <Link to="/tra-cuu" onClick={() => setMobileMenuOpen(false)} className="p-2 rounded bg-gray-100 dark:bg-gray-800">Tra Cứu & Thuật Ngữ</Link>
          </div>

          <div className="border-t border-gray-200 dark:border-gray-700 pt-3">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-2">6 Buổi đào tạo</span>
            <div className="space-y-1">
              {SESSIONS.map((s) => (
                <Link
                  key={s.id}
                  to={`/buoi/${s.id}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 text-xs"
                >
                  <span className="font-semibold">{s.sessionNumber}: {s.title}</span>
                  <span className="text-[10px] text-gray-500">{s.duration}</span>
                </Link>
              ))}
              <Link
                to="/chuyen-de/boq-du-toan"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between p-2 rounded hover:bg-orange-50 text-xs text-[#F26B1D]"
              >
                <span className="font-semibold">Chuyên đề mở rộng: BOQ & Dự toán</span>
                <span className="text-[10px]">Mở rộng</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export const Footer: React.FC = () => {
  return (
    <footer className="border-t-2 border-[#1B242A] dark:border-[#1C3B5E] bg-[#EAE6DD] dark:bg-[#081524] text-xs font-mono py-8 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <p className="text-gray-800 dark:text-gray-300 font-sans">
            Nội dung gốc © CES Global — trang học cá nhân phục vụ nghiên cứu & ứng dụng AI Xây dựng.
          </p>
          <p className="text-gray-500 text-[11px] mt-1">
            Thiết kế kiến trúc hệ thống tĩnh: Vite + React 18 + Three.js + Tailwind CSS.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/cesglobal-vn/Tai-lieu-khoa-hoc-ai-xay-dung"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#F26B1D] hover:underline flex items-center gap-1 font-semibold"
          >
            <span>GitHub Repository Gốc</span>
            <ExternalLink className="w-3 h-3" />
          </a>
          <span className="text-gray-400">|</span>
          <span className="text-gray-500">Mã hiệu: AI-XD-2026</span>
        </div>
      </div>
    </footer>
  );
};
