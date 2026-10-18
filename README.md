# CỔNG HỌC TẬP THỰC CHIẾN AI TRONG DỰ ÁN XÂY DỰNG
> **Website học tập tĩnh tương tác 3D — Trình bày 100% nguyên văn toàn bộ nội dung khóa học**

🌐 **Địa chỉ truy cập Website trực tuyến:**  
👉 **[https://tronglong195-ops.github.io/khoa-hoc-ai-xay-dung/](https://tronglong195-ops.github.io/khoa-hoc-ai-xay-dung/)**

---

## 🏗️ 1. Giới thiệu Dự án
Website là nền tảng học tập trực tuyến tĩnh (Single Page Application — không backend) số hóa toàn bộ tài nguyên từ kho bài giảng thực chiến [Tai-lieu-khoa-hoc-ai-xay-dung](https://github.com/cesglobal-vn/Tai-lieu-khoa-hoc-ai-xay-dung) của CES Global.

Hệ thống được thiết kế theo phong cách **Bản vẽ kỹ thuật (Architectural Blueprint)** kết hợp công nghệ **Three.js / React Three Fiber** để trực quan hóa sinh động các bài toán thiết kế, quản lý hồ sơ và tự động hóa xây dựng bằng AI.

---

## ✨ 2. Các tính năng nổi bật

### 📖 Nội dung nguyên văn 100% (Verbatim 68/68 tài liệu)
- **Kiểm định độ phủ**: Tích hợp script `check-coverage` tự động, kiểm tra 100% file `.md` đều có route chuyên biệt.
- **Hiển thị trung thực**: Bảng biểu kỹ thuật (GFM) cuộn ngang mượt mà trên mobile, khối code/prompt có nút **Sao chép 1-click**, sơ đồ luồng **Mermaid** render trực tiếp.
- **Điều hướng thông minh**: Khung tên kỹ thuật (Title Block B01–B06), Mục lục dính (Sticky TOC) bám theo tiến độ cuộn trang.
- **Lớp bổ trợ học tập**: Hộp Tóm tắt nhanh 5–7 ý cốt lõi, 5 Flashcards tương tác lật mặt xem giải thích và Bộ Quiz 5 câu trắc nghiệm tự chấm điểm (lưu trạng thái vào `localStorage`).

### 🧊 8 Không gian Minh họa 3D Tương tác (Three.js + R3F)
1. **Hero & Buổi 04 — "Từ bản vẽ đến mô hình"**: Dựng nhà phố 7x20m chính xác theo tham số từ file `03_mo-ta-tu-ban-ve.json` với hệ cao độ thực tế (T1: 3600mm, T2: 3400mm, T3: 3400mm, Tum: 3000mm). Thanh trượt 4 chặng:
   - Chặng 1: Mặt bằng 2D nét wireframe.
   - Chặng 2: Trích xuất đoạn mã JSON tương ứng.
   - Chặng 3: Đùn khối 3D nguyên vẹn (Extrude).
   - Chặng 4: Bung tầng (Exploded view) với thanh kéo dãn theo trục Y.
2. **Buổi 01 — "Ba cấp độ AI & Bộ não dự án"**: 3 bệ nổi tương tác (Chatbot $\rightarrow$ AI Workspace $\rightarrow$ AI Agent) và mô phỏng khối cầu Context Profile.
3. **Buổi 02 — "Bản chất của Skill"**: Mô phỏng đóng gói 5 lượt chat rời rạc hội tụ vào một Hộp Skill chuẩn (`SKILL.md`).
4. **Buổi 03 — "AI điều khiển AutoCAD"**: Luồng Prompt $\rightarrow$ AI sinh AutoLISP $\rightarrow$ Nét vẽ CAD tự động hiện dần trên bàn vẽ blueprint.
5. **Buổi 04 (Bổ sung) — "3 Tầng CLAUDE.md"**: 3 lớp vỏ lồng nhau mô phỏng "Nội quy khác với Khóa cửa".
6. **Buổi 05 — "AI chỉ sơn lại, không xây lại"**: Giữ nguyên khối 3D, đổi chất liệu theo phong cách kiến trúc (Hiện đại, Gỗ nâu, Brutalist) và đối chiếu với ảnh render AI thật.
7. **Buổi 06 — "Dây chuyền 7 chặng & 3 cổng HITL"**: Băng chuyền sản xuất hồ sơ với 3 cổng kiểm duyệt con người (Human-in-the-Loop) và kịch bản mô phỏng *"Chủ nhà đổi ý"*.
8. **Tổng quan — "Mạng lưới 6 AI Agent"**: Đồ thị không gian 3D kết nối 6 tác tử chuyên trách với Kỹ sư trưởng HITL ở trung tâm.

### 📚 Kho Tài liệu & Công cụ Hỗ trợ
- **13 Slide trình chiếu HTML**: Tải lười (lazy-load) trong iframe với chế độ Toàn màn hình & Mở tab mới.
- **Thư viện Prompt (`/prompt`)**: Gom 48+ mẫu prompt thực chiến có bộ lọc theo buổi/vai trò và công cụ tìm kiếm nhanh.
- **Tra cứu & Bảng thuật ngữ (`/tra-cuu`)**: Tìm kiếm toàn văn mờ bằng Fuse.js và từ điển 10 thuật ngữ nền tảng (Agent, Subagent, Skill, CLAUDE.md, MCP, HITL, RFI, BOQ, Context Profile, Zero-hallucination).
- **Chuyên đề mở rộng BOQ & Dự toán (`/chuyen-de/boq-du-toan`)**: Giữ trọn vẹn tài liệu Buổi 04 phiên bản cũ.
- **Biểu mẫu quy chuẩn (`/bieu-mau`)**: 6 mẫu template chuẩn văn phòng xây dựng.

---

## 🛠️ 3. Công nghệ sử dụng (Stack)
- **Framework**: React 18/19, Vite, TypeScript
- **Định tuyến**: React Router (`HashRouter` — đảm bảo hoạt động hoàn hảo trên GitHub Pages không lỗi 404)
- **Giao diện**: Tailwind CSS v4, Lucide React, Framer Motion
- **3D Engine**: Three.js, `@react-three/fiber`, `@react-three/drei`
- **Xử lý tài liệu**: `react-markdown`, `remark-gfm`, `rehype-slug`, `rehype-autolink-headings`, `mermaid`, `shiki`
- **Tìm kiếm**: `fuse.js`
- **Build & Deploy Tool**: `sharp` (nén WebP ≤300KB), GitHub Pages

---

## 💻 4. Hướng dẫn Chạy Thử trên Máy Cục bộ (Local)

### Yêu cầu môi trường
- Đã cài đặt **Node.js** (khuyến nghị phiên bản v18 trở lên) và **npm**.

### Các bước thực hiện
```bash
# 1. Clone repository về máy
git clone https://github.com/tronglong195-ops/khoa-hoc-ai-xay-dung.git
cd khoa-hoc-ai-xay-dung

# 2. Cài đặt các gói phụ thuộc
npm install

# 3. Đồng bộ dữ liệu & Kiểm tra độ phủ tài liệu
npm run sync
npm run check-coverage

# 4. Chạy môi trường phát triển (Development Server)
npm run dev

# 5. Hoặc build và xem trước bản production
npm run build
npm run preview
```
Sau khi chạy, truy cập vào `http://localhost:5173` hoặc `http://localhost:4173` trên trình duyệt.

---

## 🚀 5. Hướng dẫn Tự Động Triển Khai (Deploy) Lên GitHub Pages

Dự án đã được tích hợp sẵn công cụ deploy `gh-pages`:

```bash
# Lệnh tự động build và đẩy lên nhánh gh-pages của GitHub
npm run build
npx gh-pages -d dist -b gh-pages
```

Sau khi chạy lệnh trên, trang web sẽ tự động cập nhật tại:  
👉 **[https://tronglong195-ops.github.io/khoa-hoc-ai-xay-dung/](https://tronglong195-ops.github.io/khoa-hoc-ai-xay-dung/)**

---

## 📄 6. Bản quyền & Ghi công
- Nội dung gốc khóa học thuộc bản quyền của **CES Global**.
- Website được xây dựng với mục đích nghiên cứu, học tập cá nhân và chuyển đổi số quy trình thiết kế — thi công trong ngành xây dựng.
