import React from 'react';
import { HashRouter } from 'react-router-dom';
import { Header, Footer } from './components/Layout';
import { AppRoutes } from './routes';

export const App: React.FC = () => {
  return (
    <HashRouter>
      <div className="min-h-screen flex flex-col bg-[#F7F5F0] dark:bg-[#0B1E33] bg-grid-pattern text-[#1B242A] dark:text-[#E8F1F5]">
        <Header />
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <AppRoutes />
        </main>
        <Footer />
      </div>
    </HashRouter>
  );
};

export default App;
