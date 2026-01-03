
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductGrid from './components/ProductGrid';
import ProductDetail from './components/ProductDetail';
import CartDrawer from './components/CartDrawer';
import Checkout from './components/Checkout';
import Footer from './components/Footer';
import AboutPage from './components/AboutPage';
import PrivacyPage from './components/PrivacyPage';
import TermsPage from './components/TermsPage';
import ContactPage from './components/ContactPage';
import FAQPage from './components/FAQPage';
import Assistant from './components/Assistant';
import { PAPERS } from './constants';
import { Paper, ViewState } from './types';

// Error Boundary Component
class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error: Error | null }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#fcfbf9] text-black font-serif p-8">
          <h1 className="font-headline text-4xl font-bold mb-4">Something went wrong</h1>
          <p className="text-gray-600 mb-8 text-center max-w-md">
            We apologize for the inconvenience. Please try refreshing the page.
          </p>
          <button
            onClick={() => {
              this.setState({ hasError: false, error: null });
              window.location.reload();
            }}
            className="px-6 py-3 bg-black text-white font-sans-accent text-xs uppercase tracking-widest hover:bg-gray-800 transition-colors"
          >
            Refresh Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

// Safe localStorage helper with quota handling
const safeLocalStorage = {
  getItem: (key: string): string | null => {
    try {
      return localStorage.getItem(key);
    } catch (e) {
      console.warn('localStorage read error:', e);
      return null;
    }
  },
  setItem: (key: string, value: string): boolean => {
    try {
      localStorage.setItem(key, value);
      return true;
    } catch (e) {
      if (e instanceof DOMException && e.name === 'QuotaExceededError') {
        console.warn('localStorage quota exceeded');
        // Try to clear old data and retry
        try {
          localStorage.removeItem('thetechtimes_v2');
          localStorage.setItem(key, value);
          return true;
        } catch {
          return false;
        }
      }
      return false;
    }
  }
};

const App: React.FC = () => {
  // --- State ---
  const [viewState, setViewState] = useState<ViewState>({ type: 'home' });
  const [papers, setPapers] = useState<Paper[]>([]);
  const [userUpvotes, setUserUpvotes] = useState<string[]>([]);
  const [readingList, setReadingList] = useState<Paper[]>([]);
  const [isReadingListOpen, setIsReadingListOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showShortcuts, setShowShortcuts] = useState(false);

  // Navigation State
  const [activeCategory, setActiveCategory] = useState('Front Page');

  // --- Initialization & Persistence ---
  useEffect(() => {
    // 1. Load Upvotes
    const storedUpvotesString = safeLocalStorage.getItem('userUpvotes');
    let loadedUpvotes: string[] = [];
    if (storedUpvotesString) {
      try {
        loadedUpvotes = JSON.parse(storedUpvotesString);
        setUserUpvotes(loadedUpvotes);
      } catch (e) {
        setUserUpvotes([]);
      }
    }

    // 2. Load Library (Reading List)
    const storedLibrary = safeLocalStorage.getItem('libraryItems');
    if (storedLibrary) {
      try {
        setReadingList(JSON.parse(storedLibrary));
      } catch (e) {
        setReadingList([]);
      }
    }

    // 3. Load Papers (Reports) and sync with upvotes
    const storedPapers = safeLocalStorage.getItem('thetechtimes_v2');
    let basePapers = PAPERS;

    if (storedPapers) {
      try {
        const parsed = JSON.parse(storedPapers);
        if (parsed.length > 0 && parsed.length >= PAPERS.length) {
             basePapers = parsed;
        } else {
             basePapers = PAPERS;
        }
      } catch (e) {
        console.warn("Error parsing local storage papers, resetting to default.", e);
      }
    }

    // Sync upvotes
    const syncedPapers = basePapers.map(p => ({
        ...p,
        upvotes: (p.upvotes || 0) + (loadedUpvotes.includes(p.id) ? 1 : 0)
    }));

    setPapers(syncedPapers);
    setIsLoading(false);
  }, []);

  // Persist Library
  useEffect(() => {
    safeLocalStorage.setItem('libraryItems', JSON.stringify(readingList));
  }, [readingList]);

  // Persist papers
  useEffect(() => {
    if (papers.length > 0 && !isLoading) {
        safeLocalStorage.setItem('thetechtimes_v2', JSON.stringify(papers));
    }
  }, [papers, isLoading]);

  // Persist upvotes
  useEffect(() => {
    safeLocalStorage.setItem('userUpvotes', JSON.stringify(userUpvotes));
  }, [userUpvotes]);

  // --- Keyboard Shortcuts ---
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger shortcuts when typing in inputs
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      switch (e.key) {
        case '/':
          e.preventDefault();
          const searchInput = document.querySelector('input[type="text"]') as HTMLInputElement;
          if (searchInput) {
            searchInput.focus();
          }
          break;
        case 'Escape':
          setIsReadingListOpen(false);
          setShowShortcuts(false);
          break;
        case '?':
          e.preventDefault();
          setShowShortcuts(prev => !prev);
          break;
        case 'h':
          if (!e.metaKey && !e.ctrlKey) {
            setViewState({ type: 'home' });
            setActiveCategory('Front Page');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
          break;
        case 's':
          if (!e.metaKey && !e.ctrlKey) {
            e.preventDefault();
            if (viewState.type === 'paper') {
              handleToggleSave(viewState.paper);
            }
          }
          break;
        case 'l':
          if (!e.metaKey && !e.ctrlKey) {
            e.preventDefault();
            setIsReadingListOpen(prev => !prev);
          }
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [viewState]);


  // --- Actions ---
  const handlePageNavigate = useCallback((page: string) => {
    switch (page) {
      case 'about':
        setViewState({ type: 'about' });
        break;
      case 'privacy':
        setViewState({ type: 'privacy' });
        break;
      case 'terms':
        setViewState({ type: 'terms' });
        break;
      case 'contact':
        setViewState({ type: 'contact' });
        break;
      case 'faq':
        setViewState({ type: 'faq' });
        break;
      default:
        setViewState({ type: 'home' });
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleNavClick = useCallback((e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>, targetId: string) => {
    e.preventDefault();
    if (targetId === 'submit') {
      setViewState({ type: 'submit' });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (targetId === '') {
        setViewState({ type: 'home' });
        setActiveCategory('Front Page');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (['about', 'privacy', 'terms', 'contact', 'faq'].includes(targetId)) {
      handlePageNavigate(targetId);
    } else {
      setViewState({ type: 'home' });
      setTimeout(() => {
        const element = document.getElementById(targetId);
        if (element) {
          const headerOffset = 85;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.scrollY - headerOffset;
          window.scrollTo({ top: offsetPosition, behavior: "smooth" });
        }
      }, 100);
    }
  }, [handlePageNavigate]);

  const handleCategoryClick = useCallback((category: string) => {
      setViewState({ type: 'home' });
      setActiveCategory(category);

      setTimeout(() => {
        const element = document.getElementById('products');
        if (element) {
             const headerOffset = 180;
             const elementPosition = element.getBoundingClientRect().top;
             const offsetPosition = elementPosition + window.scrollY - headerOffset;
             window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        }
      }, 50);
  }, []);

  const handlePaperClick = useCallback((paper: Paper) => {
    setViewState({ type: 'paper', paper });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handlePublisherClick = useCallback((publisherName: string) => {
    setViewState({ type: 'publisher', publisherName });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleBackToHome = useCallback(() => {
    setViewState({ type: 'home' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Toggle Save (Add/Remove)
  const handleToggleSave = useCallback((paper: Paper) => {
    const isSaved = readingList.some(item => item.id === paper.id);
    if (isSaved) {
      setReadingList(prev => prev.filter(item => item.id !== paper.id));
    } else {
      setReadingList(prev => [paper, ...prev]);
      setIsReadingListOpen(true);
    }
  }, [readingList]);

  const handleUpvote = useCallback((paperId: string) => {
    const isAlreadyUpvoted = userUpvotes.includes(paperId);

    const newUpvoteIds = isAlreadyUpvoted
        ? userUpvotes.filter(id => id !== paperId)
        : [...userUpvotes, paperId];

    setUserUpvotes(newUpvoteIds);

    setPapers(prevPapers => {
        return prevPapers.map(p => {
            if (p.id === paperId) {
                return {
                    ...p,
                    upvotes: isAlreadyUpvoted ? Math.max(0, p.upvotes - 1) : p.upvotes + 1
                };
            }
            return p;
        });
    });
  }, [userUpvotes]);

  const handlePaperSubmit = useCallback((newPaper: Paper) => {
      setPapers(prev => [newPaper, ...prev]);
      setViewState({ type: 'home' });
      setActiveCategory('Front Page');

      setTimeout(() => {
          const element = document.getElementById('products');
          if (element) {
             element.scrollIntoView({ behavior: 'smooth' });
          }
      }, 100);
  }, []);

  // --- Derived State ---
  const sortedPapers = useMemo(() => {
      return [...papers].sort((a, b) => {
          if (b.upvotes !== a.upvotes) {
              return b.upvotes - a.upvotes;
          }
          return parseInt(b.publicationDate) - parseInt(a.publicationDate);
      });
  }, [papers]);

  const savedPaperIds = useMemo(() => readingList.map(p => p.id), [readingList]);

  const publisherPapers = useMemo(() => {
    if (viewState.type === 'publisher') {
        return sortedPapers.filter(p => p.publisher === viewState.publisherName);
    }
    return [];
  }, [sortedPapers, viewState]);

  if (isLoading) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#fcfbf9] text-black font-serif">
          <div className="animate-pulse">
            <div className="font-masthead text-4xl mb-4">The Tech Times</div>
            <div className="text-sm text-gray-500">Loading...</div>
          </div>
        </div>
      );
  }

  return (
    <ErrorBoundary>
      <div className="bg-[#fcfbf9] min-h-screen text-black selection:bg-black selection:text-white flex flex-col">
        {/* Skip to main content link for accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[9999] focus:bg-black focus:text-white focus:px-4 focus:py-2"
        >
          Skip to main content
        </a>

        <Navbar
          onNavClick={handleNavClick}
          onCategoryClick={handleCategoryClick}
          cartCount={readingList.length}
          onOpenCart={() => setIsReadingListOpen(true)}
          activeCategory={activeCategory}
        />

        <CartDrawer
          isOpen={isReadingListOpen}
          onClose={() => setIsReadingListOpen(false)}
          items={readingList}
          onRemoveItem={(paper) => handleToggleSave(paper)}
          onItemClick={handlePaperClick}
        />

        {/* Keyboard Shortcuts Modal */}
        {showShortcuts && (
          <div className="fixed inset-0 bg-black/50 z-[10000] flex items-center justify-center p-4" onClick={() => setShowShortcuts(false)}>
            <div className="bg-white max-w-md w-full p-8 border border-black" onClick={e => e.stopPropagation()}>
              <div className="flex justify-between items-center mb-6">
                <h2 className="font-headline text-xl font-bold">Keyboard Shortcuts</h2>
                <button onClick={() => setShowShortcuts(false)} className="text-gray-400 hover:text-black">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="space-y-3 font-serif text-sm">
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600">Focus search</span>
                  <kbd className="px-2 py-1 bg-gray-100 font-mono text-xs">/</kbd>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600">Go to home</span>
                  <kbd className="px-2 py-1 bg-gray-100 font-mono text-xs">H</kbd>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600">Toggle library</span>
                  <kbd className="px-2 py-1 bg-gray-100 font-mono text-xs">L</kbd>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600">Save article (when viewing)</span>
                  <kbd className="px-2 py-1 bg-gray-100 font-mono text-xs">S</kbd>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600">Close modal/drawer</span>
                  <kbd className="px-2 py-1 bg-gray-100 font-mono text-xs">Esc</kbd>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-gray-600">Show shortcuts</span>
                  <kbd className="px-2 py-1 bg-gray-100 font-mono text-xs">?</kbd>
                </div>
              </div>
            </div>
          </div>
        )}

        <main id="main-content" className="flex-grow">
          {viewState.type === 'home' && (
            <>
              <Hero onArticleClick={handlePaperClick} papers={papers} onCategoryClick={handleCategoryClick} />
              <ProductGrid
                  papers={sortedPapers}
                  onProductClick={handlePaperClick}
                  onUpvote={handleUpvote}
                  userUpvotes={userUpvotes}
                  onPublisherClick={handlePublisherClick}
                  onToggleSave={handleToggleSave}
                  savedPaperIds={savedPaperIds}
                  activeCategory={activeCategory}
                  setActiveCategory={setActiveCategory}
              />
            </>
          )}

          {viewState.type === 'publisher' && (
             <div className="pt-12 px-6 bg-[#fcfbf9]">
                  <div className="max-w-[1800px] mx-auto">
                      <div className="flex items-center gap-4 mb-12 border-b border-black pb-6">
                           <button
                             onClick={handleBackToHome}
                             className="p-2 border border-black rounded-full hover:bg-black hover:text-white transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
                             aria-label="Go back to home"
                           >
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                              </svg>
                           </button>
                           <h1 className="text-4xl font-headline font-bold text-black">{viewState.publisherName}</h1>
                           <span className="text-sm font-sans-accent uppercase tracking-widest bg-gray-200 px-3 py-1 rounded-full text-gray-800">{publisherPapers.length} articles</span>
                      </div>
                      <ProductGrid
                          papers={publisherPapers}
                          onProductClick={handlePaperClick}
                          onUpvote={handleUpvote}
                          userUpvotes={userUpvotes}
                          onPublisherClick={() => {}}
                          onToggleSave={handleToggleSave}
                          savedPaperIds={savedPaperIds}
                          activeCategory={'Front Page'}
                          setActiveCategory={() => {}}
                          hideFilters={true}
                      />
                  </div>
             </div>
          )}

          {viewState.type === 'paper' && (
            <ProductDetail
              product={viewState.paper}
              onBack={handleBackToHome}
              onToggleSave={handleToggleSave}
              isSaved={savedPaperIds.includes(viewState.paper.id)}
              onPublisherClick={handlePublisherClick}
            />
          )}

          {viewState.type === 'submit' && (
            <Checkout
              onBack={handleBackToHome}
              onSubmit={handlePaperSubmit}
            />
          )}

          {viewState.type === 'about' && (
            <AboutPage
              onBack={handleBackToHome}
              onNavigate={handlePageNavigate}
            />
          )}

          {viewState.type === 'privacy' && (
            <PrivacyPage onBack={handleBackToHome} />
          )}

          {viewState.type === 'terms' && (
            <TermsPage onBack={handleBackToHome} />
          )}

          {viewState.type === 'contact' && (
            <ContactPage onBack={handleBackToHome} />
          )}

          {viewState.type === 'faq' && (
            <FAQPage
              onBack={handleBackToHome}
              onNavigate={handlePageNavigate}
            />
          )}
        </main>

        <Footer onLinkClick={handleNavClick} />

        {/* AI Assistant Widget */}
        <Assistant />
      </div>
    </ErrorBoundary>
  );
};

export default App;
