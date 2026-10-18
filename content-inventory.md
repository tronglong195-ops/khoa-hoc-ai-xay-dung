# Content Inventory: Khóa học AI Xây Dựng (CES Global)

> [!NOTE]
> **Trạng thái:** BƯỚC 0 — KHẢO SÁT REPO HOÀN TẤT. Kiểm kê 100% tài nguyên gồm: 68 file Markdown (.md), 13 Slide HTML (.html), 56 hình ảnh (.png, .jpg), 18 file nhị phân (.dwg, .dxf, .blend, .xlsx, .docx, .pdf), và 18 file code/dữ liệu (.py, .json, .claude/...).

---

## 1. Tổng quan tài nguyên & Giải pháp hiển thị

| Nhóm tài nguyên | Số lượng | Giải pháp hiển thị & Kỹ thuật |
|---|:---:|---|
| **Tài liệu Markdown (.md)** | **68** | Render nguyên văn 100% bằng react-markdown + GFM + Shiki highlight code + Mermaid trực tiếp. Bảng cuộn ngang, nút Copy mọi code/prompt. |
| **Slide trình chiếu (.html)** | **13** | Tải lazy qua `iframe` (chỉ nạp khi người học bấm tab Slide), hỗ trợ xem Toàn màn hình (Fullscreen) và Mở tab riêng. |
| **Hình ảnh (.png, .jpg)** | **56** | Nén WebP ≤300KB hiển thị gallery có lightbox tương tác, kèm nút tải ảnh gốc. |
| **File nhị phân (.dwg, .dxf, .blend, .xlsx, .docx, .pdf)** | **18** | Không đóng gói vào bundle JS. Hiển thị thông tin file kèm nút tải trỏ trực tiếp GitHub raw URL. |
| **File Code/Dữ liệu (.py, .json, .claude/...)** | **18** | Hiển thị dạng cây thư mục (File Tree) kèm bộ đọc Code Viewer tích hợp (Shiki highlight). |

---

## 2. Phương án giải quyết các điểm lệch trong Repository

1. **Lệch cấu trúc lộ trình giữa README.md và cấu trúc thư mục thực tế:**
   - `README.md` cũ đề cập Buổi 05 là *QA/QC HSE* và Buổi 06 là *Hệ thống 6 Agent*. Hai thư mục này **không tồn tại** trên repo.
   - **Xử lý:** Lấy lộ trình chuẩn từ file `00_Tong_Quan_Chuong_Trinh/01_De_Cuong_Chi_Tiet_Khoa_Hoc.md` (Buổi 05: *Render AI & Bóc khối lượng*; Buổi 06: *Quy trình trọn gói hồ sơ nhà phố*).
   - Vẫn render nguyên văn `README.md` tại trang `/gioi-thieu`, gắn Callout cảnh báo rõ: *"Lưu ý: README mô tả phiên bản cũ, vui lòng xem Đề cương chi tiết để xem lộ trình thực tế"*.
2. **Trùng 2 thư mục Buổi 04:**
   - `04_Buoi_04_Agent_ClaudeMD_Blender_3D` $\rightarrow$ Đặt làm **Buổi 04 chính thức** (`/buoi/04`).
   - `04_Buoi_04_Boc_Tach_Khoi_Luong_BOQ_Du_Toan` $\rightarrow$ Đặt vào **Chuyên đề mở rộng: BOQ & Dự toán** (`/chuyen-de/boq-du-toan`). Tuyệt đối không bỏ file nào.
3. **Liên kết cục bộ (`file:///f:/...`):**
   - Đã phát hiện 8 vị trí chứa link dạng này. Script sync sẽ tự động chuyển đổi thành route nội bộ trên web hoặc link GitHub repository tương ứng.

---

## 3. Bảng Content Inventory chi tiết (Toàn bộ 68 file .md)

| STT | Đường dẫn file gốc | Tiêu đề (H1) | Danh mục | Route dự kiến | Kiểu hiển thị |
|---|---|---|---|---|---|
| 1 | 00_Tong_Quan_Chuong_Trinh/01_De_Cuong_Chi_Tiet_Khoa_Hoc.md | ĐỀ CƯƠNG CHI TIẾT CHƯƠNG TRÌNH ĐÀO TẠO | Tổng quan | /tong-quan/de-cuong | Tài liệu Markdown nguyên văn |
| 2 | 00_Tong_Quan_Chuong_Trinh/02_Kien_Truc_He_Thong_6_AI_Agent.md | BẢN MÔ TẢ KIẾN TRÚC HỆ THỐNG 6 AI AGENT DỰ ÁN XÂY DỰNG | Tổng quan | /tong-quan/kien-truc-agent | Tài liệu Markdown nguyên văn |
| 3 | 01_Buoi_01_Hieu_Dung_AI_Xay_Dung_Bo_Nao_Du_An/01_Giao_Trinh_Chi_Tiet_Buoi_01.md | GIÁO TRÌNH CHI TIẾT — BUỔI 01 | Buổi 01 | /buoi/01/ly-thuyet | Tài liệu Markdown nguyên văn |
| 4 | 01_Buoi_01_Hieu_Dung_AI_Xay_Dung_Bo_Nao_Du_An/02_Thu_Vien_Prompt_Thuc_Chien_Buoi_01.md | THƯ VIỆN PROMPT THỰC CHIẾN — BUỔI 01 | Buổi 01 | /buoi/01/prompt | Tài liệu Markdown nguyên văn |
| 5 | 01_Buoi_01_Hieu_Dung_AI_Xay_Dung_Bo_Nao_Du_An/03_Huong_Dan_Thuc_Hanh_Lab_01.md | TÀI LIỆU HƯỚNG DẪN BÀI THỰC HÀNH LAB 01 | Buổi 01 | /buoi/01/lab | Tài liệu Markdown nguyên văn |
| 6 | 01_Buoi_01_Hieu_Dung_AI_Xay_Dung_Bo_Nao_Du_An/04_Tieu_Chi_Nghiem_Thu_San_Pham_D1.md | TIÊU CHÍ NGHIỆM THU SẢN PHẨM ĐẦU RA — DELIVERABLE D1 | Buổi 01 | /buoi/01/nghiem-thu | Tài liệu Markdown nguyên văn |
| 7 | 01_Buoi_01_Hieu_Dung_AI_Xay_Dung_Bo_Nao_Du_An/demo/CLAUDE.md | HỆ THỐNG QUY TẮC LÀM VIỆC & QUẢN TRỊ AI WORKSPACE (CLAUDE.md) | Buổi 01 | /buoi/01/demo/claude | Tài liệu Markdown nguyên văn |
| 8 | 01_Buoi_01_Hieu_Dung_AI_Xay_Dung_Bo_Nao_Du_An/demo/du-an-mau-greentech-tower.md | THÔNG TIN DỰ ÁN GREENTECH TOWER (DỮ LIỆU THÔ CHỦ ĐẦU TƯ CUNG CẤP) | Buổi 01 | /buoi/01/demo/du-an-mau-greentech-tower | Tài liệu Markdown nguyên văn |
| 9 | 01_Buoi_01_Hieu_Dung_AI_Xay_Dung_Bo_Nao_Du_An/giao-an-buoi-01.md | Giáo án Buổi 01: Xây Dựng AI Workspace Dự Án, Làm Chủ Claude Code & GitHub Nền Tảng | Buổi 01 | /buoi/01/giao-an-buoi-01 | Tài liệu Markdown nguyên văn |
| 10 | 01_Buoi_01_Hieu_Dung_AI_Xay_Dung_Bo_Nao_Du_An/slide-buoi-01.md | BỘ SLIDE BÀI GIẢNG BUỔI 01: XÂY DỰNG AI WORKSPACE DỰ ÁN, LÀM CHỦ CLAUDE CODE & GITHUB NỀN TẢNG | Buổi 01 | /buoi/01/slide-buoi-01 | Tài liệu Markdown nguyên văn |
| 11 | 02_Buoi_02_Khai_Thac_Ho_So_Ky_Thuat/01_Giao_Trinh_Chi_Tiet_Buoi_02.md | GIÁO TRÌNH CHI TIẾT — BUỔI 02 | Buổi 02 | /buoi/02/ly-thuyet | Tài liệu Markdown nguyên văn |
| 12 | 02_Buoi_02_Khai_Thac_Ho_So_Ky_Thuat/02_Thu_Vien_Prompt_Thuc_Chien_Buoi_02.md | THƯ VIỆN PROMPT THỰC CHIẾN — BUỔI 02 | Buổi 02 | /buoi/02/prompt | Tài liệu Markdown nguyên văn |
| 13 | 02_Buoi_02_Khai_Thac_Ho_So_Ky_Thuat/03_Huong_Dan_Thuc_Hanh_Lab_02.md | TÀI LIỆU HƯỚNG DẪN BÀI THỰC HÀNH LAB 02 | Buổi 02 | /buoi/02/lab | Tài liệu Markdown nguyên văn |
| 14 | 02_Buoi_02_Khai_Thac_Ho_So_Ky_Thuat/04_Tieu_Chi_Nghiem_Thu_San_Pham_D2.md | TIÊU CHÍ NGHIỆM THU SẢN PHẨM ĐẦU RA — DELIVERABLE D2 | Buổi 02 | /buoi/02/nghiem-thu | Tài liệu Markdown nguyên văn |
| 15 | 02_Buoi_02_Khai_Thac_Ho_So_Ky_Thuat/demo/01-chi-dan-ky-thuat-pccc-greentech-tower.md | 01-chi-dan-ky-thuat-pccc-greentech-tower | Buổi 02 | /buoi/02/demo/01-chi-dan-ky-thuat-pccc-greentech-tower | Tài liệu Markdown nguyên văn |
| 16 | 02_Buoi_02_Khai_Thac_Ho_So_Ky_Thuat/demo/02-thuyet-minh-ban-ve-kt102.md | 02-thuyet-minh-ban-ve-kt102 | Buổi 02 | /buoi/02/demo/02-thuyet-minh-ban-ve-kt102 | Tài liệu Markdown nguyên văn |
| 17 | 02_Buoi_02_Khai_Thac_Ho_So_Ky_Thuat/demo/03-chi-dan-thi-cong-be-tong-vach-ham.md | 03-chi-dan-thi-cong-be-tong-vach-ham | Buổi 02 | /buoi/02/demo/03-chi-dan-thi-cong-be-tong-vach-ham | Tài liệu Markdown nguyên văn |
| 18 | 02_Buoi_02_Khai_Thac_Ho_So_Ky_Thuat/demo/04-thuyet-minh-ban-ve-vach-ham-kc02.md | 04-thuyet-minh-ban-ve-vach-ham-kc02 | Buổi 02 | /buoi/02/demo/04-thuyet-minh-ban-ve-vach-ham-kc02 | Tài liệu Markdown nguyên văn |
| 19 | 02_Buoi_02_Khai_Thac_Ho_So_Ky_Thuat/demo/05-chi-dan-ky-thuat-son-chong-chay-ket-cau-thep.md | 05-chi-dan-ky-thuat-son-chong-chay-ket-cau-thep | Buổi 02 | /buoi/02/demo/05-chi-dan-ky-thuat-son-chong-chay-ket-cau-thep | Tài liệu Markdown nguyên văn |
| 20 | 02_Buoi_02_Khai_Thac_Ho_So_Ky_Thuat/demo/06-thuyet-minh-ban-ve-ket-cau-thep-kc105.md | 06-thuyet-minh-ban-ve-ket-cau-thep-kc105 | Buổi 02 | /buoi/02/demo/06-thuyet-minh-ban-ve-ket-cau-thep-kc105 | Tài liệu Markdown nguyên văn |
| 21 | 02_Buoi_02_Khai_Thac_Ho_So_Ky_Thuat/demo/chi-dan-ky-thuat-pccc.md | CHỈ DẪN KỸ THUẬT PHÒNG CHÁY CHỮA CHÁY & VẬT LIỆU NGĂN CHÁY | Buổi 02 | /buoi/02/demo/chi-dan-ky-thuat-pccc | Tài liệu Markdown nguyên văn |
| 22 | 02_Buoi_02_Khai_Thac_Ho_So_Ky_Thuat/demo/skill-mau/SKILL.md | Quy trình Rà soát Hồ sơ Kỹ thuật & Đối soát Mâu thuẫn Xây dựng | Buổi 02 | /buoi/02/demo/skill-mau/skill | Tài liệu Markdown nguyên văn |
| 23 | 02_Buoi_02_Khai_Thac_Ho_So_Ky_Thuat/demo/thuyet-minh-ban-ve-kt102.md | BẢN VẼ MẶT BẰNG & BẢNG THỐNG KÊ CỬA ĐI TẦNG 1 ĐẾN TẦNG 5 | Buổi 02 | /buoi/02/demo/thuyet-minh-ban-ve-kt102 | Tài liệu Markdown nguyên văn |
| 24 | 03_Buoi_03_Thiet_Ke_Va_Dieu_Khien_AutoCAD/01_Giao_Trinh_Chi_Tiet_Buoi_03.md | GIÁO TRÌNH CHI TIẾT — BUỔI 03 | Buổi 03 | /buoi/03/ly-thuyet | Tài liệu Markdown nguyên văn |
| 25 | 03_Buoi_03_Thiet_Ke_Va_Dieu_Khien_AutoCAD/02_Thu_Vien_Prompt_Thuc_Chien_Buoi_03.md | THƯ VIỆN PROMPT THỰC CHIẾN — BUỔI 03 | Buổi 03 | /buoi/03/prompt | Tài liệu Markdown nguyên văn |
| 26 | 03_Buoi_03_Thiet_Ke_Va_Dieu_Khien_AutoCAD/03_Huong_Dan_Thuc_Hanh_Lab_03_AutoCAD.md | TÀI LIỆU HƯỚNG DẪN BÀI THỰC HÀNH LAB 03 | Buổi 03 | /buoi/03/lab | Tài liệu Markdown nguyên văn |
| 27 | 03_Buoi_03_Thiet_Ke_Va_Dieu_Khien_AutoCAD/04_Tieu_Chi_Nghiem_Thu_San_Pham_D3.md | TIÊU CHÍ NGHIỆM THU SẢN PHẨM ĐẦU RA — DELIVERABLE D3 | Buổi 03 | /buoi/03/nghiem-thu | Tài liệu Markdown nguyên văn |
| 28 | 04_Buoi_04_Agent_ClaudeMD_Blender_3D/01_Giao_Trinh_Chi_Tiet_Buoi_04.md | GIÁO TRÌNH CHI TIẾT: BUỔI 04 | Buổi 04 (Chính thức) | /buoi/04/ly-thuyet | Tài liệu Markdown nguyên văn |
| 29 | 04_Buoi_04_Agent_ClaudeMD_Blender_3D/02_Thu_Vien_Prompt_Thuc_Chien_Buoi_04.md | THƯ VIỆN PROMPT THỰC CHIẾN: BUỔI 04 | Buổi 04 (Chính thức) | /buoi/04/prompt | Tài liệu Markdown nguyên văn |
| 30 | 04_Buoi_04_Agent_ClaudeMD_Blender_3D/03_Huong_Dan_Thuc_Hanh_Lab_04_Blender.md | HƯỚNG DẪN THỰC HÀNH LAB 04 | Buổi 04 (Chính thức) | /buoi/04/lab | Tài liệu Markdown nguyên văn |
| 31 | 04_Buoi_04_Agent_ClaudeMD_Blender_3D/04_Tieu_Chi_Nghiem_Thu_San_Pham_D4.md | TIÊU CHÍ NGHIỆM THU SẢN PHẨM: DELIVERABLE D4 | Buổi 04 (Chính thức) | /buoi/04/nghiem-thu | Tài liệu Markdown nguyên văn |
| 32 | 04_Buoi_04_Agent_ClaudeMD_Blender_3D/05_Mau_CLAUDE_md_Global_Cho_Ky_Su.md | MẪU CLAUDE.MD GLOBAL CHO KỸ SƯ XÂY DỰNG | Buổi 04 (Chính thức) | /buoi/04/05-mau-claude-md-global-cho-ky-su | Tài liệu Markdown nguyên văn |
| 33 | 04_Buoi_04_Agent_ClaudeMD_Blender_3D/06_Checklist_Cai_Dat_Truoc_Buoi_Hoc.md | CHECKLIST CÀI ĐẶT TRƯỚC BUỔI 04 | Buổi 04 (Chính thức) | /buoi/04/06-checklist-cai-dat-truoc-buoi-hoc | Tài liệu Markdown nguyên văn |
| 34 | 04_Buoi_04_Agent_ClaudeMD_Blender_3D/07_Huong_Dan_Cai_Dat_Blender_MCP.md | HƯỚNG DẪN CÀI ĐẶT BLENDER MCP (vn-mcp-blender) | Buổi 04 (Chính thức) | /buoi/04/07-huong-dan-cai-dat-blender-mcp | Tài liệu Markdown nguyên văn |
| 35 | 04_Buoi_04_Agent_ClaudeMD_Blender_3D/08_Noi_Dung_Slide_Buoi_04.md | BỘ SLIDE BÀI GIẢNG BUỔI 04: AGENT, CLAUDE.MD AN TOÀN, TỪ BẢN VẼ AUTOCAD ĐẾN MÔ HÌNH 3D BLENDER | Buổi 04 (Chính thức) | /buoi/04/08-noi-dung-slide-buoi-04 | Tài liệu Markdown nguyên văn |
| 36 | 04_Buoi_04_Boc_Tach_Khoi_Luong_BOQ_Du_Toan/01_Giao_Trinh_Chi_Tiet_Buoi_04.md | GIÁO TRÌNH CHI TIẾT — BUỔI 04 | Chuyên đề: BOQ & Dự toán | /chuyen-de/boq-du-toan/ly-thuyet | Tài liệu Markdown nguyên văn |
| 37 | 04_Buoi_04_Boc_Tach_Khoi_Luong_BOQ_Du_Toan/02_Thu_Vien_Prompt_Thuc_Chien_Buoi_04.md | THƯ VIỆN PROMPT THỰC CHIẾN — BUỔI 04 | Chuyên đề: BOQ & Dự toán | /chuyen-de/boq-du-toan/prompt | Tài liệu Markdown nguyên văn |
| 38 | 04_Buoi_04_Boc_Tach_Khoi_Luong_BOQ_Du_Toan/03_Huong_Dan_Thuc_Hanh_Lab_04_BOQ.md | TÀI LIỆU HƯỚNG DẪN BÀI THỰC HÀNH LAB 04 | Chuyên đề: BOQ & Dự toán | /chuyen-de/boq-du-toan/lab | Tài liệu Markdown nguyên văn |
| 39 | 04_Buoi_04_Boc_Tach_Khoi_Luong_BOQ_Du_Toan/04_Tieu_Chi_Nghiem_Thu_San_Pham_D4.md | TIÊU CHÍ NGHIỆM THU SẢN PHẨM ĐẦU RA — DELIVERABLE D4 | Chuyên đề: BOQ & Dự toán | /chuyen-de/boq-du-toan/nghiem-thu | Tài liệu Markdown nguyên văn |
| 40 | 05_Buoi_05_Agent_Chuyen_Trach_Render_AI_Boc_Khoi_Luong/01_Giao_Trinh_Chi_Tiet_Buoi_05.md | GIÁO TRÌNH CHI TIẾT: BUỔI 05 | Buổi 05 | /buoi/05/ly-thuyet | Tài liệu Markdown nguyên văn |
| 41 | 06_Buoi_06_Quy_Trinh_Tron_Goi_Ho_So_Nha_Pho/01_Giao_Trinh_Chi_Tiet_Buoi_06.md | GIÁO TRÌNH CHI TIẾT: BUỔI 06 | Buổi 06 | /buoi/06/ly-thuyet | Tài liệu Markdown nguyên văn |
| 42 | 06_Buoi_06_Quy_Trinh_Tron_Goi_Ho_So_Nha_Pho/02_Noi_Dung_Slide_Buoi_06.md | NỘI DUNG SLIDE BUỔI 06: RÁP TRỌN QUY TRÌNH HỒ SƠ NHÀ PHỐ (ĐỒ ÁN CUỐI KHÓA) | Buổi 06 | /buoi/06/02-noi-dung-slide-buoi-06 | Tài liệu Markdown nguyên văn |
| 43 | 06_Buoi_06_Quy_Trinh_Tron_Goi_Ho_So_Nha_Pho/04_Huong_Dan_Bo_Sung_Buoi_06_Agent_Team_Va_Cai_Dat.md | HƯỚNG DẪN BỔ SUNG BUỔI 06: ĐỘI AI AGENT VÀ BỘ ĐỒ NGHỀ CÀI BẰNG PROMPT | Buổi 06 | /buoi/06/04-huong-dan-bo-sung-buoi-06-agent-team-va-cai-dat | Tài liệu Markdown nguyên văn |
| 44 | 06_Buoi_06_Quy_Trinh_Tron_Goi_Ho_So_Nha_Pho/demo/01-thu-nghiem-pascal/14_bao-cao-dung-pascal.md | Báo cáo dựng mô hình Pascal: Nhà phố lô 7x20m, Buổi 04 CES | Buổi 06 | /buoi/06/demo/01-thu-nghiem-pascal/14-bao-cao-dung-pascal | Tài liệu Markdown nguyên văn |
| 45 | 06_Buoi_06_Quy_Trinh_Tron_Goi_Ho_So_Nha_Pho/demo/02-doi-agent-ho-so-nha-pho/.claude/agents/kien-truc-su.md | kien-truc-su | Buổi 06 | /buoi/06/demo/02-doi-agent-ho-so-nha-pho/.claude/agents/kien-truc-su | Tài liệu Markdown nguyên văn |
| 46 | 06_Buoi_06_Quy_Trinh_Tron_Goi_Ho_So_Nha_Pho/demo/02-doi-agent-ho-so-nha-pho/.claude/agents/ky-su-boc-khoi-luong.md | ky-su-boc-khoi-luong | Buổi 06 | /buoi/06/demo/02-doi-agent-ho-so-nha-pho/.claude/agents/ky-su-boc-khoi-luong | Tài liệu Markdown nguyên văn |
| 47 | 06_Buoi_06_Quy_Trinh_Tron_Goi_Ho_So_Nha_Pho/demo/02-doi-agent-ho-so-nha-pho/.claude/agents/ky-su-kiem-tra.md | ky-su-kiem-tra | Buổi 06 | /buoi/06/demo/02-doi-agent-ho-so-nha-pho/.claude/agents/ky-su-kiem-tra | Tài liệu Markdown nguyên văn |
| 48 | 06_Buoi_06_Quy_Trinh_Tron_Goi_Ho_So_Nha_Pho/demo/02-doi-agent-ho-so-nha-pho/.claude/agents/tiep-nhan-yeu-cau.md | tiep-nhan-yeu-cau | Buổi 06 | /buoi/06/demo/02-doi-agent-ho-so-nha-pho/.claude/agents/tiep-nhan-yeu-cau | Tài liệu Markdown nguyên văn |
| 49 | 06_Buoi_06_Quy_Trinh_Tron_Goi_Ho_So_Nha_Pho/demo/02-doi-agent-ho-so-nha-pho/.claude/rules/ban-giao.md | Mẫu file bàn giao (chỉ nạp khi làm việc với thư mục handoff) | Buổi 06 | /buoi/06/demo/02-doi-agent-ho-so-nha-pho/.claude/rules/ban-giao | Tài liệu Markdown nguyên văn |
| 50 | 06_Buoi_06_Quy_Trinh_Tron_Goi_Ho_So_Nha_Pho/demo/02-doi-agent-ho-so-nha-pho/.claude/rules/so-lieu.md | Quy tắc số liệu (luôn áp dụng) | Buổi 06 | /buoi/06/demo/02-doi-agent-ho-so-nha-pho/.claude/rules/so-lieu | Tài liệu Markdown nguyên văn |
| 51 | 06_Buoi_06_Quy_Trinh_Tron_Goi_Ho_So_Nha_Pho/demo/02-doi-agent-ho-so-nha-pho/00_yeu-cau-khach-hang.md | Yêu cầu của khách hàng (tình huống mẫu để thực hành) | Buổi 06 | /buoi/06/demo/02-doi-agent-ho-so-nha-pho/00-yeu-cau-khach-hang | Tài liệu Markdown nguyên văn |
| 52 | 06_Buoi_06_Quy_Trinh_Tron_Goi_Ho_So_Nha_Pho/demo/02-doi-agent-ho-so-nha-pho/01_prompt-chay-doi.md | Prompt chạy đội agent (demo trong lớp, khoảng 10 phút) | Buổi 06 | /buoi/06/prompt | Tài liệu Markdown nguyên văn |
| 53 | 06_Buoi_06_Quy_Trinh_Tron_Goi_Ho_So_Nha_Pho/demo/02-doi-agent-ho-so-nha-pho/CLAUDE.md | CLAUDE.md: Demo đội agent hồ sơ nhà phố | Buổi 06 | /buoi/06/demo/02-doi-agent-ho-so-nha-pho/claude | Tài liệu Markdown nguyên văn |
| 54 | 06_Buoi_06_Quy_Trinh_Tron_Goi_Ho_So_Nha_Pho/demo/02-doi-agent-ho-so-nha-pho/dau-vao/02_ban-ve-a3-kt01-kt04.md | 02_ban-ve-a3-kt01-kt04 | Buổi 06 | /buoi/06/demo/02-doi-agent-ho-so-nha-pho/dau-vao/02-ban-ve-a3-kt01-kt04 | Tài liệu Markdown nguyên văn |
| 55 | 06_Buoi_06_Quy_Trinh_Tron_Goi_Ho_So_Nha_Pho/demo/02-doi-agent-ho-so-nha-pho/dau-vao/03_bang-thong-ke-cua.md | 03_bang-thong-ke-cua | Buổi 06 | /buoi/06/demo/02-doi-agent-ho-so-nha-pho/dau-vao/03-bang-thong-ke-cua | Tài liệu Markdown nguyên văn |
| 56 | 06_Buoi_06_Quy_Trinh_Tron_Goi_Ho_So_Nha_Pho/demo/02-doi-agent-ho-so-nha-pho/dau-vao/04_tom-tat-boq-phan-tho.md | Tóm tắt BOQ phần thô: nhà phố mẫu lô 7x20m | Buổi 06 | /buoi/06/demo/02-doi-agent-ho-so-nha-pho/dau-vao/04-tom-tat-boq-phan-tho | Tài liệu Markdown nguyên văn |
| 57 | 06_Buoi_06_Quy_Trinh_Tron_Goi_Ho_So_Nha_Pho/demo/02-doi-agent-ho-so-nha-pho/ket-qua-mau/00_phieu-giao-viec.md | Phiếu giao việc: hồ sơ trình phương án nhà phố lô 7x20m | Buổi 06 | /buoi/06/demo/02-doi-agent-ho-so-nha-pho/ket-qua-mau/00-phieu-giao-viec | Tài liệu Markdown nguyên văn |
| 58 | 06_Buoi_06_Quy_Trinh_Tron_Goi_Ho_So_Nha_Pho/demo/02-doi-agent-ho-so-nha-pho/ket-qua-mau/99_bao-cao-tong-hop.md | Báo cáo tổng hợp: hồ sơ trình phương án nhà phố lô 7x20m | Buổi 06 | /buoi/06/demo/02-doi-agent-ho-so-nha-pho/ket-qua-mau/99-bao-cao-tong-hop | Tài liệu Markdown nguyên văn |
| 59 | 06_Buoi_06_Quy_Trinh_Tron_Goi_Ho_So_Nha_Pho/demo/02-doi-agent-ho-so-nha-pho/ket-qua-mau/handoff/02_kien-truc.md | 02. Bàn giao phần kiến trúc: nhà phố lô 7x20m | Buổi 06 | /buoi/06/demo/02-doi-agent-ho-so-nha-pho/ket-qua-mau/handoff/02-kien-truc | Tài liệu Markdown nguyên văn |
| 60 | 06_Buoi_06_Quy_Trinh_Tron_Goi_Ho_So_Nha_Pho/demo/02-doi-agent-ho-so-nha-pho/ket-qua-mau/handoff/03_boc-khoi-luong.md | Bàn giao 03: Bảng khối lượng phần thô sơ bộ | Buổi 06 | /buoi/06/demo/02-doi-agent-ho-so-nha-pho/ket-qua-mau/handoff/03-boc-khoi-luong | Tài liệu Markdown nguyên văn |
| 61 | 06_Buoi_06_Quy_Trinh_Tron_Goi_Ho_So_Nha_Pho/demo/02-doi-agent-ho-so-nha-pho/ket-qua-mau/handoff/04_kiem-tra.md | Bàn giao: kiem-tra (agent ky-su-kiem-tra, chỉ đọc) | Buổi 06 | /buoi/06/demo/02-doi-agent-ho-so-nha-pho/ket-qua-mau/handoff/04-kiem-tra | Tài liệu Markdown nguyên văn |
| 62 | README.md | KHÓA ĐÀO TẠO THỰC CHIẾN: AI AGENT TRONG KỸ THUẬT & XÂY DỰNG | Giới thiệu | /gioi-thieu | Tài liệu Markdown nguyên văn |
| 63 | templates/Mau_Bang_BOQ_Chuan_Hoa.md | BẢNG TIÊN LƯỢNG KHỐI LƯỢNG CHUẨN HÓA (STANDARDIZED BOQ TEMPLATE) | Biểu mẫu | /bieu-mau/mau-bang-boq-chuan-hoa | Template / Biểu mẫu quy chuẩn |
| 64 | templates/Mau_Bang_Quan_Tri_Rui_Ro_Risk_Register.md | BẢNG QUẢN TRỊ RỦI RO DỰ ÁN XÂY DỰNG (PROJECT RISK REGISTER TEMPLATE) | Biểu mẫu | /bieu-mau/mau-bang-quan-tri-rui-ro-risk-register | Template / Biểu mẫu quy chuẩn |
| 65 | templates/Mau_Context_Profile_Du_An.md | MẪU HỒ SƠ BỐI CẢNH DỰ ÁN (PROJECT CONTEXT PROFILE TEMPLATE) | Biểu mẫu | /bieu-mau/mau-context-profile-du-an | Template / Biểu mẫu quy chuẩn |
| 66 | templates/Mau_Design_Brief_Thiet_Ke.md | BẢN NHIỆM VỤ THIẾT KẾ KIẾN TRÚC & KỸ THUẬT (DESIGN BRIEF TEMPLATE) | Biểu mẫu | /bieu-mau/mau-design-brief-thiet-ke | Template / Biểu mẫu quy chuẩn |
| 67 | templates/Mau_Nhat_Ky_Thi_Cong_Ngay.md | MẪU NHẬT KÝ THI CÔNG XÂY DỰNG CÔNG TRÌNH HÀNG NGÀY | Biểu mẫu | /bieu-mau/mau-nhat-ky-thi-cong-ngay | Template / Biểu mẫu quy chuẩn |
| 68 | templates/Mau_Phieu_Yeu_Cau_RFI.md | PHIẾU YÊU CẦU LÀM RÕ THÔNG TIN THIẾT KẾ (RFI TEMPLATE) | Biểu mẫu | /bieu-mau/mau-phieu-yeu-cau-rfi | Template / Biểu mẫu quy chuẩn |


---

## 4. Danh sách 13 Slide HTML & Route hiển thị

| STT | File slide gốc | Dung lượng | Vị trí hiển thị trên Site |
|---|---|---|---|
| 1 | `01_Buoi_01_Hieu_Dung_AI_Xay_Dung_Bo_Nao_Du_An/slide-buoi-01-swiss.html` | ~1.5MB | Tab Slide tại `/buoi/01` (Phiên bản Swiss Style) |
| 2 | `01_Buoi_01_Hieu_Dung_AI_Xay_Dung_Bo_Nao_Du_An/slide-buoi-01.html` | ~1.2MB | Tab Slide tại `/buoi/01` (Phiên bản Tiêu chuẩn) |
| 3 | `02_Buoi_02_Khai_Thac_Ho_So_Ky_Thuat/slide-buoi-02-swiss.html` | ~2.1MB | Tab Slide tại `/buoi/02` |
| 4 | `03_Buoi_03_Thiet_Ke_Va_Dieu_Khien_AutoCAD/07_slide-buoi-03-swiss.html` | ~2.4MB | Tab Slide tại `/buoi/03` (Swiss Style) |
| 5 | `03_Buoi_03_Thiet_Ke_Va_Dieu_Khien_AutoCAD/08_slide-buoi-03-long-table.html` | ~1.8MB | Tab Slide tại `/buoi/03` (Long Table) |
| 6 | `04_Buoi_04_Agent_ClaudeMD_Blender_3D/09_slide-buoi-04-swiss.html` | ~2.8MB | Tab Slide tại `/buoi/04` |
| 7 | `05_Buoi_05_Agent_Chuyen_Trach_Render_AI_Boc_Khoi_Luong/03_slide-buoi-05-swiss.html` | ~2.0MB | Tab Slide tại `/buoi/05` (Swiss Style) |
| 8 | `05_Buoi_05_Agent_Chuyen_Trach_Render_AI_Boc_Khoi_Luong/04_slide-buoi-05-blueprint.html` | ~2.2MB | Tab Slide tại `/buoi/05` (Blueprint Style) |
| 9 | `05_Buoi_05_Agent_Chuyen_Trach_Render_AI_Boc_Khoi_Luong/src-slide-blueprint/deck.html` | ~0.8MB | Tab Slide tại `/buoi/05` (Deck Source) |
| 10 | `06_Buoi_06_Quy_Trinh_Tron_Goi_Ho_So_Nha_Pho/03_slide-buoi-06-swiss.html` | ~2.5MB | Tab Slide tại `/buoi/06` (Swiss Style) |
| 11 | `06_Buoi_06_Quy_Trinh_Tron_Goi_Ho_So_Nha_Pho/05_slide-buoi-06-bo-sung-swiss.html` | ~2.1MB | Tab Slide tại `/buoi/06` (Bổ sung Swiss Style) |
| 12 | `06_Buoi_06_Quy_Trinh_Tron_Goi_Ho_So_Nha_Pho/src-slide/deck.html` | ~0.9MB | Tab Slide tại `/buoi/06` (Deck Source) |
| 13 | `06_Buoi_06_Quy_Trinh_Tron_Goi_Ho_So_Nha_Pho/src-slide-bo-sung/deck.html` | ~0.9MB | Tab Slide tại `/buoi/06` (Deck Bổ sung) |

---

## 5. Danh sách File Nhị phân (.dwg, .dxf, .blend, .xlsx, .docx, .pdf)

Các file này không bundle vào ứng dụng web để tối ưu tải trang, người học có thể tải trực tiếp file nguyên bản:
- **Tài liệu PDF kỹ thuật:** PCCC GreenTech Tower, thuyết minh KT102, chỉ dẫn bê tông vách hầm, KC02, sơn chống cháy thép, KC105, bản vẽ KT01-KT04.
- **Tài liệu DOCX mẫu:** RFI-ARC-001 (cửa D08 EI90), RFI-STR-001 (sơn chống cháy), Phiếu yêu cầu khách hàng nhà phố.
- **Mô hình & Bản vẽ kỹ thuật:** DWG, DXF, BLEND của công trình nhà phố lô 7x20m (Buổi 04).
- **Bảng tính định lượng Excel:** Bảng thống kê cửa nhà 7x20m, Đáp án BOQ phần thô nhà 7x20m.
