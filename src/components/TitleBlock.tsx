import React from 'react';

interface TitleBlockProps {
  sheetNumber: string; // e.g. "B01"
  projectTitle: string;
  topicTitle: string;
  deliverable: string;
  duration: string;
  scale?: string;
}

export const TitleBlock: React.FC<TitleBlockProps> = ({
  sheetNumber,
  projectTitle,
  topicTitle,
  deliverable,
  duration,
  scale = '1:100',
}) => {
  return (
    <div className="border-2 border-[#1B242A] dark:border-[#38BDF8] bg-white dark:bg-[#0B1E33] shadow-sm my-6 overflow-hidden text-xs md:text-sm font-mono">
      {/* Top Banner */}
      <div className="grid grid-cols-1 md:grid-cols-4 border-b border-[#1B242A] dark:border-[#38BDF8]">
        <div className="p-3 border-b md:border-b-0 md:border-r border-[#1B242A] dark:border-[#38BDF8] bg-[#EAE6DD] dark:bg-[#0E2744]">
          <span className="text-[10px] text-gray-500 dark:text-gray-400 block">DỰ ÁN / PROJECT</span>
          <span className="font-bold text-[#0B1E33] dark:text-white uppercase tracking-wider">{projectTitle}</span>
        </div>
        <div className="p-3 col-span-2 border-b md:border-b-0 md:border-r border-[#1B242A] dark:border-[#38BDF8]">
          <span className="text-[10px] text-gray-500 dark:text-gray-400 block">CHUYÊN ĐỀ ĐÀO TẠO / TOPIC</span>
          <span className="font-bold text-[#F26B1D] text-sm md:text-base">{topicTitle}</span>
        </div>
        <div className="p-3 bg-[#EAE6DD] dark:bg-[#0E2744] flex items-center justify-between">
          <div>
            <span className="text-[10px] text-gray-500 dark:text-gray-400 block">SỐ TỜ / SHEET NO.</span>
            <span className="text-xl font-black text-[#0B1E33] dark:text-white">{sheetNumber}</span>
          </div>
          <div className="text-right">
            <span className="text-[10px] text-gray-500 dark:text-gray-400 block">TỶ LỆ / SCALE</span>
            <span className="font-semibold text-gray-800 dark:text-gray-200">{scale}</span>
          </div>
        </div>
      </div>

      {/* Bottom Metadata */}
      <div className="grid grid-cols-1 sm:grid-cols-3 p-3 bg-white dark:bg-[#091A2E] text-gray-700 dark:text-gray-300 gap-2">
        <div>
          <span className="text-[10px] text-gray-400 block">SẢN PHẨM NGHIỆM THU / DELIVERABLE</span>
          <span className="font-semibold text-green-700 dark:text-green-400">{deliverable}</span>
        </div>
        <div>
          <span className="text-[10px] text-gray-400 block">THỜI LƯỢNG / DURATION</span>
          <span className="font-semibold">{duration} (Live Workshop + Lab)</span>
        </div>
        <div className="text-left sm:text-right">
          <span className="text-[10px] text-gray-400 block">ĐƠN VỊ ĐÀO TẠO / ACADEMY</span>
          <span className="font-semibold text-[#0B1E33] dark:text-white">CES Global Academy</span>
        </div>
      </div>
    </div>
  );
};
