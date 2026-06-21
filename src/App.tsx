import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { Header } from './components/Header';
import { UserHome } from './pages/UserHome';
import { PostDetail } from './pages/PostDetail';
import { Community } from './pages/Community';
import { Notifications } from './pages/Notifications';

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <BrowserRouter>
          <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans transition-colors duration-200 selection:bg-emerald-200 dark:selection:bg-emerald-900">
            <Header />
            <main className="container mx-auto px-4 md:px-8 pb-16">
              <Routes>
                <Route path="/" element={<UserHome />} />
                <Route path="/post/:id" element={<PostDetail />} />
                <Route path="/community" element={<Community />} />
                <Route path="/notifications" element={<Notifications />} />
              </Routes>
            </main>
          </div>
        </BrowserRouter>
      </LanguageProvider>
    </ThemeProvider>
  );
}
