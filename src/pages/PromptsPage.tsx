import React, { useState, useMemo } from 'react';
import extractedPrompts from '../content/prompts.json';
import { Copy, Check, Filter, Search, Terminal, Sparkles } from 'lucide-react';
import { TitleBlock } from '../components/TitleBlock';

export const PromptsPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Tất cả');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const categories = useMemo(() => {
    const set = new Set(extractedPrompts.map((p) => p.category));
    return ['Tất cả', ...Array.from(set)];
  }, []);

  const filteredPrompts = useMemo(() => {
    return extractedPrompts.filter((p) => {
      const matchCat = selectedCategory === 'Tất cả' || p.category === selectedCategory;
      const matchSearch = searchTerm === '' || 
        p.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        p.content.toLowerCase().includes(searchTerm.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [selectedCategory, searchTerm]);

  const handleCopy = (id: string, content: string) => {
    navigator.clipboard.writeText(content);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6 py-4">
      <TitleBlock
        sheetNumber="PRM"
        projectTitle="HỒ SƠ KHÓA HỌC AI XÂY DỰNG"
        topicTitle="THƯ VIỆN PROMPT THỰC CHIẾN TỔNG HỢP"
        deliverable="Kho Prompt Tiêu Chuẩn Cho Kỹ Sư & Kiến Trúc Sư"
        duration="Tra cứu & Ứng dụng tức thì"
      />

      {/* Filter and Search Bar */}
      <div className="bg-white dark:bg-[#0B1E33] border border-[#D8D4C8] dark:border-[#1C3B5E] rounded-lg p-5 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Tìm kiếm prompt theo từ khóa (vd: PCCC, cửa D08, AutoLISP, mặt bằng, BOQ)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-[#D8D4C8] dark:border-[#1C3B5E] rounded bg-[#FAF8F5] dark:bg-[#06121E] text-sm focus:outline-none focus:border-[#F26B1D]"
            />
          </div>
          <div className="text-xs font-mono text-gray-500">
            Hiển thị: <span className="font-bold text-[#F26B1D]">{filteredPrompts.length}</span> / {extractedPrompts.length} prompt
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-gray-100 dark:border-gray-800">
          <span className="text-xs font-mono font-bold text-gray-400 mr-1 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" /> LỌC THEO:
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded text-xs font-mono font-semibold transition-colors ${
                selectedCategory === cat
                  ? 'bg-[#F26B1D] text-white shadow-sm'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Prompts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredPrompts.map((p) => {
          const isCopied = copiedId === p.id;
          return (
            <div
              key={p.id}
              className="bg-white dark:bg-[#0B1E33] border border-[#D8D4C8] dark:border-[#1C3B5E] rounded-lg p-5 shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between pb-2 mb-3 border-b border-gray-100 dark:border-gray-800 text-xs font-mono">
                  <span className="font-bold text-[#F26B1D] bg-orange-100 dark:bg-orange-950 px-2 py-0.5 rounded">
                    {p.category}
                  </span>
                  <span className="text-gray-400 truncate max-w-[200px]">{p.sourceFile}</span>
                </div>
                <h4 className="font-bold text-sm text-[#0B1E33] dark:text-white leading-snug mb-3">
                  {p.title}
                </h4>
                <div className="bg-[#1E293B] text-gray-200 font-mono text-xs p-4 rounded border border-gray-700 max-h-60 overflow-y-auto whitespace-pre-wrap leading-relaxed">
                  {p.content}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-800 flex justify-end">
                <button
                  onClick={() => handleCopy(p.id, p.content)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-mono font-bold transition-all ${
                    isCopied
                      ? 'bg-green-600 text-white shadow'
                      : 'bg-[#F26B1D]/10 hover:bg-[#F26B1D] text-[#F26B1D] hover:text-white'
                  }`}
                >
                  {isCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{isCopied ? 'Đã sao chép!' : 'Sao chép Prompt'}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
