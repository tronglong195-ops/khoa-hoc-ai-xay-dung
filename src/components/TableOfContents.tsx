import React, { useEffect, useState } from 'react';
import { AlignLeft, ChevronRight } from 'lucide-react';

interface TOCItem {
  level: number;
  text: string;
  slug: string;
}

interface TableOfContentsProps {
  headings: TOCItem[];
}

export const TableOfContents: React.FC<TableOfContentsProps> = ({ headings }) => {
  const [activeSlug, setActiveSlug] = useState<string>('');
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      // Calculate total page scroll progress
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress(Math.min(100, Math.max(0, (window.scrollY / totalScroll) * 100)));
      }

      // Find current heading in view
      const headingElements = headings
        .map(h => document.getElementById(h.slug))
        .filter((el): el is HTMLElement => el !== null);

      for (let i = headingElements.length - 1; i >= 0; i--) {
        const el = headingElements[i];
        const rect = el.getBoundingClientRect();
        if (rect.top <= 120) {
          setActiveSlug(el.id);
          return;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <aside className="sticky top-20 max-h-[calc(100vh-6rem)] overflow-y-auto p-4 bg-white/70 dark:bg-[#0B1E33]/70 backdrop-blur-sm border border-[#D8D4C8] dark:border-[#1C3B5E] rounded-lg text-xs font-mono shadow-sm">
      {/* Scroll Progress Bar */}
      <div className="mb-4 pb-3 border-b border-[#D8D4C8] dark:border-[#1C3B5E]">
        <div className="flex items-center justify-between text-gray-500 dark:text-gray-400 mb-1.5 font-sans">
          <span className="flex items-center gap-1.5 font-bold text-[#0B1E33] dark:text-white">
            <AlignLeft className="w-3.5 h-3.5 text-[#F26B1D]" /> MỤC LỤC BÀI HỌC
          </span>
          <span className="font-mono text-[#F26B1D] font-bold">{Math.round(scrollProgress)}%</span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 h-1 rounded-full overflow-hidden">
          <div
            className="bg-[#F26B1D] h-full transition-all duration-150"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>
      </div>

      {/* Headings List */}
      <nav className="space-y-1">
        {headings.map((h, idx) => {
          const isActive = activeSlug === h.slug;
          return (
            <a
              key={idx}
              href={`#${h.slug}`}
              className={`block py-1 px-1.5 rounded transition-colors leading-snug truncate ${
                h.level === 3 ? 'pl-4 text-[11px]' : 'font-medium'
              } ${
                isActive
                  ? 'bg-[#F26B1D]/10 text-[#F26B1D] font-bold border-l-2 border-[#F26B1D]'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
              }`}
            >
              {h.text}
            </a>
          );
        })}
      </nav>
    </aside>
  );
};
