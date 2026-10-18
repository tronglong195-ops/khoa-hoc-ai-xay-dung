import React, { useState } from 'react';
import { ExternalLink, Maximize2, Minimize2, RefreshCw } from 'lucide-react';

interface SlideViewerProps {
  slidePath: string; // e.g. "01_Buoi_01_Hieu_Dung_AI_Xay_Dung_Bo_Nao_Du_An___slide-buoi-01-swiss.html"
  title: string;
}

export const SlideViewer: React.FC<SlideViewerProps> = ({ slidePath, title }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [loading, setLoading] = useState(true);

  // Map to public slides directory
  const url = `./slides/${slidePath}`;

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <div className={`transition-all duration-300 ${isFullscreen ? 'fixed inset-0 z-50 bg-black flex flex-col' : 'my-6 rounded-lg border border-[#D8D4C8] dark:border-[#1C3B5E] overflow-hidden bg-white dark:bg-[#0B1E33] shadow-md'}`}>
      {/* Control Bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#EAE6DD] dark:bg-[#0E2744] border-b border-[#D8D4C8] dark:border-[#1C3B5E] text-xs">
        <div className="flex items-center gap-2 truncate pr-2">
          <span className="w-2 h-2 rounded-full bg-[#F26B1D]"></span>
          <span className="font-semibold text-[#0B1E33] dark:text-gray-200 truncate">{title}</span>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setLoading(true)}
            className="p-1.5 rounded hover:bg-black/5 dark:hover:bg-white/10 text-gray-600 dark:text-gray-300 transition-colors"
            title="Tải lại slide"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 px-2.5 py-1 rounded bg-[#F26B1D]/10 hover:bg-[#F26B1D]/20 text-[#F26B1D] font-medium transition-colors"
          >
            <ExternalLink className="w-3 h-3" />
            <span>Mở tab mới</span>
          </a>
          <button
            onClick={toggleFullscreen}
            className="flex items-center gap-1 px-2.5 py-1 rounded bg-black/5 dark:bg-white/10 hover:bg-black/10 text-gray-700 dark:text-gray-200 transition-colors"
          >
            {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            <span>{isFullscreen ? 'Thu nhỏ' : 'Toàn màn hình'}</span>
          </button>
        </div>
      </div>

      {/* Slide iframe */}
      <div className={`relative w-full ${isFullscreen ? 'flex-1' : 'h-[600px] md:h-[720px]'}`}>
        {loading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-50 dark:bg-[#0B1E33] text-gray-500 z-10">
            <div className="w-8 h-8 border-3 border-[#F26B1D] border-t-transparent rounded-full animate-spin mb-3"></div>
            <p className="text-xs">Đang tải slide trình chiếu...</p>
          </div>
        )}
        <iframe
          src={url}
          title={title}
          className="w-full h-full border-0 bg-white"
          onLoad={() => setLoading(false)}
          sandbox="allow-scripts allow-same-origin allow-popups"
        />
      </div>
    </div>
  );
};
