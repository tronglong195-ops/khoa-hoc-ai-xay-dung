import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { SessionPage } from './pages/SessionPage';
import { StaticDocPage } from './pages/StaticDocPage';
import { PromptsPage } from './pages/PromptsPage';
import { SearchGlossaryPage } from './pages/SearchGlossaryPage';
import manifest from './content/manifest.json';

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Home Page */}
      <Route path="/" element={<HomePage />} />

      {/* Gioi Thieu (README.md) */}
      <Route
        path="/gioi-thieu"
        element={<StaticDocPage forcedPath="README.md" categoryTitle="GIỚI THIỆU KHÓA HỌC" />}
      />

      {/* Tong Quan Routes */}
      <Route
        path="/tong-quan/de-cuong"
        element={
          <StaticDocPage
            forcedPath="00_Tong_Quan_Chuong_Trinh/01_De_Cuong_Chi_Tiet_Khoa_Hoc.md"
            categoryTitle="TỔNG QUAN CHƯƠNG TRÌNH"
          />
        }
      />
      <Route
        path="/tong-quan/kien-truc-agent"
        element={
          <StaticDocPage
            forcedPath="00_Tong_Quan_Chuong_Trinh/02_Kien_Truc_He_Thong_6_AI_Agent.md"
            categoryTitle="KIẾN TRÚC HỆ THỐNG 6 AGENT"
          />
        }
      />
      <Route
        path="/tong-quan/:slug"
        element={<StaticDocPage categoryTitle="TỔNG QUAN" />}
      />

      {/* 6 Official Sessions with Sub-routes */}
      <Route path="/buoi/:id" element={<SessionPage />} />
      <Route path="/buoi/:id/*" element={<SessionPage />} />

      {/* Chuyen De Mo Rong: BOQ & Du Toan */}
      <Route
        path="/chuyen-de/boq-du-toan"
        element={
          <StaticDocPage
            forcedPath="04_Buoi_04_Boc_Tach_Khoi_Luong_BOQ_Du_Toan/01_Giao_Trinh_Chi_Tiet_Buoi_04.md"
            categoryTitle="CHUYÊN ĐỀ MỞ RỘNG: BOQ & DỰ TOÁN"
          />
        }
      />
      <Route
        path="/chuyen-de/boq-du-toan/:slug"
        element={<StaticDocPage categoryTitle="CHUYÊN ĐỀ MỞ RỘNG: BOQ" />}
      />

      {/* Templates / Bieu Mau Routes */}
      <Route
        path="/bieu-mau"
        element={
          <StaticDocPage
            forcedPath="templates/01_mau_yeu_cau_du_an.md"
            categoryTitle="HỆ THỐNG BIỂU MẪU QUY CHUẨN"
          />
        }
      />
      <Route
        path="/bieu-mau/:slug"
        element={<StaticDocPage categoryTitle="BIỂU MẪU QUY CHUẨN" />}
      />

      {/* Library of Prompts */}
      <Route path="/prompt" element={<PromptsPage />} />

      {/* Tra Cuu & Glossary */}
      <Route path="/tra-cuu" element={<SearchGlossaryPage />} />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

// Registered routes list for coverage verification
export const ALL_DEFINED_ROUTES = manifest.map((m) => m.route);
