import { useState, useRef, useEffect } from 'react';
import { Moon, Sun, Globe, User, ChevronDown, Bell, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';

export function Header() {
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const [isLangOpen, setIsLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (langRef.current && !langRef.current.contains(event.target as Node)) {
        setIsLangOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const languages = [
    { code: 'fr', label: 'Français' },
    { code: 'en', label: 'English' },
    { code: 'ha', label: 'Hausa' },
  ] as const;

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 shadow-sm transition-colors">
      <div className="flex items-center gap-3">
        <Link to="/" className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white hover:opacity-80 transition-opacity">
          Asrar<span className="text-emerald-600 dark:text-emerald-500">Hub</span>
        </Link>
      </div>
      
      <div className="flex items-center gap-1.5 md:gap-2.5">
        <Link 
          to="/community" 
          className="p-1.5 md:p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors relative" 
          title={t('community')}
        >
          <Users className="w-4 h-4 md:w-5 md:h-5 text-slate-600 dark:text-slate-400" />
        </Link>

        <Link 
          to="/notifications" 
          className="p-1.5 md:p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors relative" 
          title={t('notifications')}
        >
          <Bell className="w-4 h-4 md:w-5 md:h-5 text-slate-600 dark:text-slate-400" />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 md:w-2 md:h-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-900"></span>
        </Link>

        <div className="relative" ref={langRef}>
          <button 
            onClick={() => setIsLangOpen(!isLangOpen)} 
            className="flex items-center gap-1.5 p-1.5 md:p-2 rounded-full md:rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors" 
            title={t('language')}
          >
            <Globe className="w-4 h-4 md:w-5 md:h-5 text-slate-600 dark:text-slate-400" />
            <span className="hidden md:inline text-xs md:text-sm font-medium text-slate-600 dark:text-slate-400">
              {languages.find(l => l.code === language)?.label || language.toUpperCase()}
            </span>
            <ChevronDown className={`w-3 h-3 md:w-4 md:h-4 text-slate-500 transition-transform ${isLangOpen ? 'rotate-180' : ''}`} />
          </button>
          
          {isLangOpen && (
            <div className="absolute right-0 mt-2 w-36 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-lg overflow-hidden py-1 z-50 animate-in fade-in slide-in-from-top-2">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    setLanguage(lang.code);
                    setIsLangOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                    language === lang.code 
                      ? 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 font-medium' 
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
                  }`}
                >
                  {lang.label}
                </button>
              ))}
            </div>
          )}
        </div>
        
        <button 
          onClick={toggleTheme} 
          className="p-1.5 md:p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors" 
          title={t('theme')}
        >
          {theme === 'light' ? (
            <Moon className="w-4 h-4 md:w-5 md:h-5 text-slate-600 dark:text-slate-400" />
          ) : (
            <Sun className="w-4 h-4 md:w-5 md:h-5 text-slate-600 dark:text-slate-400" />
          )}
        </button>
        
        <div className="ml-1 md:ml-2 w-8 h-8 md:w-9 md:h-9 rounded-full bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center overflow-hidden border-2 border-emerald-200 dark:border-emerald-800 cursor-pointer shadow-sm">
          <User className="w-4 h-4 md:w-5 md:h-5 text-emerald-600 dark:text-emerald-400" />
        </div>
      </div>
    </header>
  );
}
