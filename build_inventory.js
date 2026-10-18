const fs = require('fs');
const path = require('path');

const table = fs.readFileSync(path.join(__dirname, 'inventory_table.md'), 'utf8');

const header = `# Content Inventory: Khóa học AI Xây Dựng (CES Global)

> [!NOTE]
> **Trạng thái:** BƯỚC 0 — KHẢO SÁT REPO HOÀN TẤT. Kiểm kê 100% tài nguyên gồm: 68 file Markdown (.md), 13 Slide HTML (.html), 56 hình ảnh (.png, .jpg), 18 file nhị phân (.dwg, .dxf, .blend, .xlsx, .docx, .pdf), và 18 file code/dữ liệu (.py, .json, .claude/...).

---

## 1. Tổng quan tài nguyên & Giải pháp hiển thị

| Nhóm tài nguyên | Số lượng | Giải pháp hiển thị & Kỹ thuật |
|---|:---:|---|
| **Tài liệu Markdown (.md)** | **68** | Render nguyên văn 100% bằng react-markdown + GFM + Shiki highlight code + Mermaid trực tiếp. Bảng cuộn ngang, nút Copy mọi code/prompt. |
| **Slide trình chiếu (.html)** | **13** | Tải lazy qua \`iframe\` (chỉ nạp khi người học bấm tab Slide), hỗ trợ xem Toàn màn hình (Fullscreen) và Mở tab riêng. |
| **Hình ảnh (.png, .jpg)** | **56** | Nén WebP ≤300KB hiển thị gallery có lightbox tương tác, kèm nút tải ảnh gốc. |
| **File nhị phân (.dwg, .dxf, .blend, .xlsx, .docx, .pdf)** | **18** | Không đóng gói vào bundle JS. Hiển thị thông tin file kèm nút tải trỏ trực tiếp GitHub raw URL. |
| **File Code/Dữ liệu (.py, .json, .claude/...)** | **18** | Hiển thị dạng cây thư mục (File Tree) kèm bộ đọc Code Viewer tích hợp (Shiki highlight). |

---

## 2. Phương án giải quyết các điểm lệch trong Repository

1. **Lệch cấu trúc lộ trình giữa README.md và cấu trúc thư mục thực tế:**
   - \`README.md\` cũ đề cập Buổi 05 là *QA/QC HSE* và Buổi 06 là *Hệ thống 6 Agent*. Hai thư mục này **không tồn tại** trên repo.
   - **Xử lý:** Lấy lộ trình chuẩn từ file \`00_Tong_Quan_Chuong_Trinh/01_De_Cuong_Chi_Tiet_Khoa_Hoc.md\` (Buổi 05: *Render AI & Bóc khối lượng*; Buổi 06: *Quy trình trọn gói hồ sơ nhà phố*).
   - Vẫn render nguyên văn \`README.md\` tại trang \`/gioi-thieu\`, gắn Callout cảnh báo rõ: *"Lưu ý: README mô tả phiên bản cũ, vui lòng xem Đề cương chi tiết để xem lộ trình thực tế"*.
2. **Trùng 2 thư mục Buổi 04:**
   - \`04_Buoi_04_Agent_ClaudeMD_Blender_3D\` $\\rightarrow$ Đặt làm **Buổi 04 chính thức** (\`/buoi/04\`).
   - \`04_Buoi_04_Boc_Tach_Khoi_Luong_BOQ_Du_Toan\` $\\rightarrow$ Đặt vào **Chuyên đề mở rộng: BOQ & Dự toán** (\`/chuyen-de/boq-du-toan\`). Tuyệt đối không bỏ file nào.
3. **Liên kết cục bộ (\`file:///f:/...\`):**
   - Đã phát hiện 8 vị trí chứa link dạng này. Script sync sẽ tự động chuyển đổi thành route nội bộ trên web hoặc link GitHub repository tương ứng.

---

## 3. Bảng Content Inventory chi tiết (Toàn bộ 68 file .md)

` + table + `

---

## 4. Danh sách 13 Slide HTML & Route hiển thị

| STT | File slide gốc | Dung lượng | Vị trí hiển thị trên Site |
|---|---|---|---|
| 1 | \`01_Buoi_01_Hieu_Dung_AI_Xay_Dung_Bo_Nao_Du_An/slide-buoi-01-swiss.html\` | ~1.5MB | Tab Slide tại \`/buoi/01\` (Phiên bản Swiss Style) |
| 2 | \`01_Buoi_01_Hieu_Dung_AI_Xay_Dung_Bo_Nao_Du_An/slide-buoi-01.html\` | ~1.2MB | Tab Slide tại \`/buoi/01\` (Phiên bản Tiêu chuẩn) |
| 3 | \`02_Buoi_02_Khai_Thac_Ho_So_Ky_Thuat/slide-buoi-02-swiss.html\` | ~2.1MB | Tab Slide tại \`/buoi/02\` |
| 4 | \`03_Buoi_03_Thiet_Ke_Va_Dieu_Khien_AutoCAD/07_slide-buoi-03-swiss.html\` | ~2.4MB | Tab Slide tại \`/buoi/03\` (Swiss Style) |
| 5 | \`03_Buoi_03_Thiet_Ke_Va_Dieu_Khien_AutoCAD/08_slide-buoi-03-long-table.html\` | ~1.8MB | Tab Slide tại \`/buoi/03\` (Long Table) |
| 6 | \`04_Buoi_04_Agent_ClaudeMD_Blender_3D/09_slide-buoi-04-swiss.html\` | ~2.8MB | Tab Slide tại \`/buoi/04\` |
| 7 | \`05_Buoi_05_Agent_Chuyen_Trach_Render_AI_Boc_Khoi_Luong/03_slide-buoi-05-swiss.html\` | ~2.0MB | Tab Slide tại \`/buoi/05\` (Swiss Style) |
| 8 | \`05_Buoi_05_Agent_Chuyen_Trach_Render_AI_Boc_Khoi_Luong/04_slide-buoi-05-blueprint.html\` | ~2.2MB | Tab Slide tại \`/buoi/05\` (Blueprint Style) |
| 9 | \`05_Buoi_05_Agent_Chuyen_Trach_Render_AI_Boc_Khoi_Luong/src-slide-blueprint/deck.html\` | ~0.8MB | Tab Slide tại \`/buoi/05\` (Deck Source) |
| 10 | \`06_Buoi_06_Quy_Trinh_Tron_Goi_Ho_So_Nha_Pho/03_slide-buoi-06-swiss.html\` | ~2.5MB | Tab Slide tại \`/buoi/06\` (Swiss Style) |
| 11 | \`06_Buoi_06_Quy_Trinh_Tron_Goi_Ho_So_Nha_Pho/05_slide-buoi-06-bo-sung-swiss.html\` | ~2.1MB | Tab Slide tại \`/buoi/06\` (Bổ sung Swiss Style) |
| 12 | \`06_Buoi_06_Quy_Trinh_Tron_Goi_Ho_So_Nha_Pho/src-slide/deck.html\` | ~0.9MB | Tab Slide tại \`/buoi/06\` (Deck Source) |
| 13 | \`06_Buoi_06_Quy_Trinh_Tron_Goi_Ho_So_Nha_Pho/src-slide-bo-sung/deck.html\` | ~0.9MB | Tab Slide tại \`/buoi/06\` (Deck Bổ sung) |

---

## 5. Danh sách File Nhị phân (.dwg, .dxf, .blend, .xlsx, .docx, .pdf)

Các file này không bundle vào ứng dụng web để tối ưu tải trang, người học có thể tải trực tiếp file nguyên bản:
- **Tài liệu PDF kỹ thuật:** PCCC GreenTech Tower, thuyết minh KT102, chỉ dẫn bê tông vách hầm, KC02, sơn chống cháy thép, KC105, bản vẽ KT01-KT04.
- **Tài liệu DOCX mẫu:** RFI-ARC-001 (cửa D08 EI90), RFI-STR-001 (sơn chống cháy), Phiếu yêu cầu khách hàng nhà phố.
- **Mô hình & Bản vẽ kỹ thuật:** DWG, DXF, BLEND của công trình nhà phố lô 7x20m (Buổi 04).
- **Bảng tính định lượng Excel:** Bảng thống kê cửa nhà 7x20m, Đáp án BOQ phần thô nhà 7x20m.
`;

fs.writeFileSync(path.join(__dirname, 'content-inventory.md'), header, 'utf8');
console.log('Finished writing content-inventory.md');
