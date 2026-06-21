import { useState, useMemo } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Search, Book, Sparkles, Feather, CheckCircle2, Bookmark } from 'lucide-react';
import { mockPosts, Category, Post } from '../data/mockPosts';
import { Link } from 'react-router-dom';
import { useReadPosts } from '../hooks/useReadPosts';
import { useBookmarks } from '../hooks/useBookmarks';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const categoryIcons = {
  wirds: <Book className="w-4 h-4" />,
  asrar: <Sparkles className="w-4 h-4" />,
  recipes: <Feather className="w-4 h-4" />
};

export function UserHome() {
  const { t, language } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category | 'all' | 'saved'>('all');
  const [selectedTag, setSelectedTag] = useState<string>('all');
  
  const { readPosts } = useReadPosts();
  const { bookmarks } = useBookmarks();

  // Get unique tags across all posts
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    mockPosts.forEach(post => {
      post.tags?.forEach(tag => tags.add(tag));
    });
    return Array.from(tags);
  }, []);

  const filteredPosts = mockPosts.filter((post) => {
    const matchesSearch = post.title[language].toLowerCase().includes(searchTerm.toLowerCase()) || 
                          post.excerpt[language].toLowerCase().includes(searchTerm.toLowerCase());
                          
    let matchesCategory = true;
    if (selectedCategory === 'saved') {
      matchesCategory = bookmarks.includes(post.id);
    } else if (selectedCategory !== 'all') {
      matchesCategory = post.category === selectedCategory;
    }

    const matchesTag = selectedTag === 'all' || (post.tags && post.tags.includes(selectedTag));

    return matchesSearch && matchesCategory && matchesTag;
  });

  const dailyPost = useMemo(() => {
    const today = new Date().getDate();
    return mockPosts[today % mockPosts.length];
  }, []);

  return (
    <div className="max-w-5xl mx-auto pt-8">
      {/* Daily Reflection Section */}
      <div className="mb-10 bg-gradient-to-r from-emerald-600 to-teal-700 rounded-2xl p-4 md:p-6 text-white shadow-lg relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6">
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
        
        <div className="relative z-10 flex items-center gap-4 flex-grow w-full md:w-auto">
          <div className="p-3 bg-white/20 rounded-xl backdrop-blur-md shrink-0">
            <Sparkles className="w-6 h-6 text-emerald-50" />
          </div>
          <div className="flex-grow min-w-0">
            <h2 className="text-xs font-bold tracking-widest text-emerald-100 uppercase mb-1">
              {t('dailyReflection') || 'Réflexion du jour'}
            </h2>
            <h3 className="text-lg md:text-xl font-bold truncate">
              {dailyPost.title[language]}
            </h3>
          </div>
        </div>
        
        <Link to={`/post/${dailyPost.id}`} className="relative z-10 shrink-0 inline-flex items-center justify-center w-full md:w-auto gap-2 bg-white text-emerald-800 px-5 py-2.5 md:py-2 rounded-xl text-sm font-bold hover:bg-emerald-50 transition-colors shadow-sm">
          {t('readMore')} &rarr;
        </Link>
      </div>

      {/* Search and Filter Section */}
      <div className="mb-10 space-y-6">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-slate-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-12 pr-4 py-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 shadow-sm transition-shadow text-lg"
            placeholder={t('search')}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-sm font-medium text-slate-500 dark:text-slate-400 mr-2">
              {t('categories')}:
            </span>
            <CategoryButton 
              active={selectedCategory === 'all'} 
              onClick={() => setSelectedCategory('all')}
              label={t('all')}
            />
            <CategoryButton 
              active={selectedCategory === 'wirds'} 
              onClick={() => setSelectedCategory('wirds')}
              icon={categoryIcons.wirds}
              label={t('wirds')}
            />
            <CategoryButton 
              active={selectedCategory === 'asrar'} 
              onClick={() => setSelectedCategory('asrar')}
              icon={categoryIcons.asrar}
              label={t('asrar')}
            />
            <CategoryButton 
              active={selectedCategory === 'recipes'} 
              onClick={() => setSelectedCategory('recipes')}
              icon={categoryIcons.recipes}
              label={t('recipes')}
            />
            <CategoryButton 
              active={selectedCategory === 'saved'} 
              onClick={() => setSelectedCategory('saved')}
              icon={<Bookmark className="w-4 h-4" />}
              label={t('saved')}
            />
          </div>

          <div className="w-full md:w-48">
            <Select value={selectedTag} onValueChange={setSelectedTag}>
              <SelectTrigger className="w-full bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 rounded-xl">
                <SelectValue placeholder={t('allTags')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t('allTags')}</SelectItem>
                {allTags.map(tag => (
                  <SelectItem key={tag} value={tag}>#{tag}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Posts Grid */}
      {filteredPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {filteredPosts.map((post) => (
            <div key={post.id}>
              <PostCard post={post} language={language} t={t} isRead={readPosts.includes(post.id)} />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
          <Book className="w-12 h-12 text-slate-300 dark:text-slate-700 mx-auto mb-4" />
          <p className="text-lg text-slate-500 dark:text-slate-400">{t('noResults')}</p>
        </div>
      )}
    </div>
  );
}

function CategoryButton({ active, onClick, icon, label }: { active: boolean, onClick: () => void, icon?: React.ReactNode, label: string }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
        active 
          ? 'bg-emerald-600 text-white shadow-md shadow-emerald-500/20' 
          : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
      }`}
    >
      {icon}
      {label}
    </button>
  );
}

function PostCard({ post, language, t, isRead }: { post: Post, language: 'en' | 'fr' | 'ha', t: any, isRead: boolean }) {
  const isDarkCategory = post.category === 'asrar';
  const isBlueCategory = post.category === 'wirds';
  
  const bgBadgeClass = isDarkCategory 
    ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300' 
    : isBlueCategory 
      ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'
      : 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300';

  return (
    <Link to={`/post/${post.id}`} className="block h-full group">
      <div className={`relative flex flex-col h-full bg-white dark:bg-slate-900 rounded-3xl p-6 md:p-8 border ${isRead ? 'border-emerald-200 dark:border-emerald-800/50 bg-emerald-50/30 dark:bg-emerald-900/10' : 'border-slate-200 dark:border-slate-800'} hover:border-emerald-300 dark:hover:border-emerald-700/50 hover:shadow-xl hover:shadow-emerald-900/5 transition-all duration-300 cursor-pointer overflow-hidden`}>
        
        {isRead && (
          <div className="absolute top-0 right-0 p-4">
            <div className="flex items-center gap-1 text-emerald-600 dark:text-emerald-500 bg-emerald-100 dark:bg-emerald-900/40 px-2 py-1 rounded-md text-xs font-bold shadow-sm">
              <CheckCircle2 className="w-3 h-3" />
              {t('readStatus')}
            </div>
          </div>
        )}

        <div className="flex items-center justify-between mb-4 mt-2">
          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase ${bgBadgeClass}`}>
            {categoryIcons[post.category]}
            {t(post.category)}
          </span>
        </div>
        
        <h3 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white mb-3 leading-tight group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
          {post.title[language]}
        </h3>
        
        <p className="text-slate-600 dark:text-slate-400 pb-6 flex-grow leading-relaxed">
          {post.excerpt[language]}
        </p>
        
        <div className="flex items-center justify-between pt-6 border-t border-slate-100 dark:border-slate-800/80 mt-auto">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-xs font-bold text-slate-600 dark:text-slate-300">
              {post.author.charAt(0)}
            </div>
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
              {post.author}
            </span>
          </div>
          <span className="text-sm font-bold text-emerald-600 dark:text-emerald-500 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
            {t('readMore')} &rarr;
          </span>
        </div>

        {/* Progress Bar indicator for read status */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-slate-100 dark:bg-slate-800">
          <div className={`h-full bg-emerald-500 transition-all duration-700 ${isRead ? 'w-full' : 'w-0'}`}></div>
        </div>
      </div>
    </Link>
  );
}
