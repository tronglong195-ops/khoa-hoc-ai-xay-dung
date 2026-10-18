export interface ManifestItem {
  id: string;
  sourcePath: string;
  category: string;
  route: string;
  title: string;
  headings: { level: number; text: string; slug: string }[];
  wordCount: number;
  promptsCount: number;
}

export interface ExtractedPrompt {
  id: string;
  sourceFile: string;
  title: string;
  role: string;
  content: string;
  category: string;
}

export interface SessionInfo {
  id: string;
  sessionNumber: string;
  title: string;
  deliverable: string;
  duration: string;
  shortDesc: string;
  tabs: { id: string; label: string; fileRoute?: string }[];
}

export const SESSIONS: SessionInfo[] = [
  {
    id: '01',
    sessionNumber: 'B01',
    title: 'Hiểu Đúng AI Xây Dựng & Thiết Lập Bộ Não Dự Án',
    deliverable: 'D1: AI Workspace & Project Profile Chuẩn',
    duration: '150 phút',
    shortDesc: 'Xây dựng AI Workspace dự án, làm chủ Claude Code & GitHub nền tảng.',
    tabs: [
      { id: 'tong-quan', label: 'Tổng Quan' },
      { id: 'ly-thuyet', label: 'Lý Thuyết (Giáo Trình)' },
      { id: 'giao-an', label: 'Giáo Án' },
      { id: 'prompt', label: 'Thư Viện Prompt' },
      { id: 'lab', label: 'Thực Hành Lab' },
      { id: 'nghiem-thu', label: 'Nghiệm Thu (D1)' },
      { id: 'slide', label: 'Slide Trình Chiếu' },
      { id: 'demo', label: 'Tài Liệu Mẫu & Demo' },
      { id: '3d', label: 'Minh Họa 3D' },
    ]
  },
  {
    id: '02',
    sessionNumber: 'B02',
    title: 'Khai Thác Hồ Sơ Kỹ Thuật, Đối Soát & Tạo Skill',
    deliverable: 'D2: Bộ Skill Rà Soát & Báo Cáo Xung Đột Hồ Sơ',
    duration: '150 phút',
    shortDesc: 'Khai thác hồ sơ kỹ thuật, phát hiện mâu thuẫn PCCC/kết cấu và đóng gói Skill.',
    tabs: [
      { id: 'tong-quan', label: 'Tổng Quan' },
      { id: 'ly-thuyet', label: 'Lý Thuyết (Giáo Trình)' },
      { id: 'prompt', label: 'Thư Viện Prompt' },
      { id: 'lab', label: 'Thực Hành Lab' },
      { id: 'nghiem-thu', label: 'Nghiệm Thu (D2)' },
      { id: 'slide', label: 'Slide Trình Chiếu' },
      { id: 'demo', label: 'Tài Liệu Mẫu & Demo' },
      { id: '3d', label: 'Minh Họa 3D' },
    ]
  },
  {
    id: '03',
    sessionNumber: 'B03',
    title: 'Thiết Kế & Điều Khiển AutoCAD Bằng AI',
    deliverable: 'D3: Script AutoLISP & Bản Vẽ Tự Động Hóa',
    duration: '150 phút',
    shortDesc: 'Điều khiển AutoCAD bằng AutoLISP/Script sinh bởi AI, vẽ mặt bằng tự động.',
    tabs: [
      { id: 'tong-quan', label: 'Tổng Quan' },
      { id: 'ly-thuyet', label: 'Lý Thuyết (Giáo Trình)' },
      { id: 'prompt', label: 'Thư Viện Prompt' },
      { id: 'lab', label: 'Thực Hành Lab' },
      { id: 'nghiem-thu', label: 'Nghiệm Thu (D3)' },
      { id: 'slide', label: 'Slide Trình Chiếu' },
      { id: 'demo', label: 'Tài Liệu Mẫu & Demo' },
      { id: '3d', label: 'Minh Họa 3D' },
    ]
  },
  {
    id: '04',
    sessionNumber: 'B04',
    title: 'Agent CLAUDE.md & Dựng Mô Hình 3D Blender',
    deliverable: 'D4: Mô Hình 3D Nhà Phố & Hệ Thống Rule CLAUDE.md',
    duration: '150 phút',
    shortDesc: 'Xây dựng Agent kiến trúc với CLAUDE.md, chuyển bản vẽ 2D thành 3D tham số.',
    tabs: [
      { id: 'tong-quan', label: 'Tổng Quan' },
      { id: 'ly-thuyet', label: 'Lý Thuyết (Giáo Trình)' },
      { id: 'prompt', label: 'Thư Viện Prompt' },
      { id: 'lab', label: 'Thực Hành Lab' },
      { id: 'nghiem-thu', label: 'Nghiệm Thu (D4)' },
      { id: 'slide', label: 'Slide Trình Chiếu' },
      { id: 'demo', label: 'Tài Liệu Mẫu & Demo' },
      { id: '3d', label: 'Minh Họa 3D (Nhà 7x20m)' },
    ]
  },
  {
    id: '05',
    sessionNumber: 'B05',
    title: 'Agent Chuyên Trách, Render AI & Bóc Khối Lượng',
    deliverable: 'D5: Ảnh Phối Cảnh Render AI & Bảng BOQ Dự Toán',
    duration: '150 phút',
    shortDesc: 'Quy trình AI Render giữ khối kiến trúc và Agent bóc tách khối lượng tự động.',
    tabs: [
      { id: 'tong-quan', label: 'Tổng Quan' },
      { id: 'ly-thuyet', label: 'Lý Thuyết (Giáo Trình)' },
      { id: 'slide', label: 'Slide Trình Chiếu' },
      { id: 'demo', label: 'Tài Liệu Mẫu & Demo' },
      { id: '3d', label: 'Minh Họa 3D' },
    ]
  },
  {
    id: '06',
    sessionNumber: 'B06',
    title: 'Quy Trình Trọn Gói Hồ Sơ Nhà Phố (Dây Chuyền 7 Chặng)',
    deliverable: 'D6: Bộ Hồ Sơ Thiết Kế Hoàn Chỉnh & Handoff 6 Agent',
    duration: '150 phút',
    shortDesc: 'Vận hành tổ hợp 6 AI Agent sản xuất hồ sơ thiết kế nhà phố hoàn chỉnh với 3 cổng HITL.',
    tabs: [
      { id: 'tong-quan', label: 'Tổng Quan' },
      { id: 'ly-thuyet', label: 'Lý Thuyết (Giáo Trình)' },
      { id: 'huong-dan', label: 'Hướng Dẫn Cài Đặt Agent Team' },
      { id: 'slide', label: 'Slide Trình Chiếu' },
      { id: 'demo', label: 'Tài Liệu Mẫu & Demo' },
      { id: '3d', label: 'Minh Họa 3D (Dây Chuyền 7 Chặng)' },
    ]
  }
];
