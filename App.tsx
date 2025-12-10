
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect, useMemo } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductGrid from './components/ProductGrid';
import ProductDetail from './components/ProductDetail';
import CartDrawer from './components/CartDrawer';
import Checkout from './components/Checkout';
import Footer from './components/Footer';
import { PAPERS } from './constants';
import { Paper, ViewState } from './types';

const App: React.FC = () => {
  // --- State ---
  const [viewState, setViewState] = useState<ViewState>({ type: 'home' });
  const [papers, setPapers] = useState<Paper[]>([]);
  const [userUpvotes, setUserUpvotes] = useState<string[]>([]);
  const [readingList, setReadingList] = useState<Paper[]>([]);
  const [isReadingListOpen, setIsReadingListOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  // Navigation State
  const [activeCategory, setActiveCategory] = useState('Front Page');

  // --- Initialization & Persistence ---
  useEffect(() => {
    // 1. Load Upvotes
    const storedUpvotesString = localStorage.getItem('userUpvotes');
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
    const storedLibrary = localStorage.getItem('libraryItems');
    if (storedLibrary) {
      try {
        setReadingList(JSON.parse(storedLibrary));
      } catch (e) {
        setReadingList([]);
      }
    }

    // 3. Load Papers (Reports) and sync with upvotes
    // Key updated to thetechtimes_v2 to ensure new dataset loads
    const storedPapers = localStorage.getItem('thetechtimes_v2'); 
    let basePapers = PAPERS;
    
    if (storedPapers) {
      try {
        const parsed = JSON.parse(storedPapers);
        // Basic check to see if local storage has stale data compared to constants (simple length check for now)
        // In a real app we'd version check properly. 
        // For this demo, we prefer the constants if they are significantly larger (meaning we just updated the code).
        if (parsed.length > 0 && parsed.length >= PAPERS.length) {
             basePapers = parsed;
        } else {
             // Local storage is stale or smaller, use new constants
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
    localStorage.setItem('libraryItems', JSON.stringify(readingList));
  }, [readingList]);

  // Persist papers
  useEffect(() => {
    if (papers.length > 0 && !isLoading) {
        try {
            localStorage.setItem('thetechtimes_v2', JSON.stringify(papers));
        } catch (e) {
            // Likely quota exceeded
        }
    }
  }, [papers, isLoading]);

  // Persist upvotes
  useEffect(() => {
    localStorage.setItem('userUpvotes', JSON.stringify(userUpvotes));
  }, [userUpvotes]);


  // --- Actions ---

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    if (targetId === 'submit') {
      setViewState({ type: 'submit' });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (targetId === '') {
        setViewState({ type: 'home' });
        setActiveCategory('Front Page');
        window.scrollTo({ top: 0, behavior: 'smooth' });
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
  };

  const handleCategoryClick = (category: string) => {
      setViewState({ type: 'home' });
      setActiveCategory(category);
      
      // Scroll to grid
      setTimeout(() => {
        const element = document.getElementById('products');
        if (element) {
             const headerOffset = 180; // Approximate header height
             const elementPosition = element.getBoundingClientRect().top;
             const offsetPosition = elementPosition + window.scrollY - headerOffset;
             window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        }
      }, 50);
  };

  const handlePaperClick = (paper: Paper) => {
    setViewState({ type: 'paper', paper });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePublisherClick = (publisherName: string) => {
    setViewState({ type: 'publisher', publisherName });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  const handleBackToHome = () => {
    setViewState({ type: 'home' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Toggle Save (Add/Remove)
  const handleToggleSave = (paper: Paper) => {
    const isSaved = readingList.some(item => item.id === paper.id);
    if (isSaved) {
      setReadingList(prev => prev.filter(item => item.id !== paper.id));
    } else {
      setReadingList(prev => [paper, ...prev]);
      setIsReadingListOpen(true); // Open drawer on add
    }
  };

  const handleUpvote = (paperId: string) => {
    const isAlreadyUpvoted = userUpvotes.includes(paperId);
    
    // Update local set of IDs user upvoted
    const newUpvoteIds = isAlreadyUpvoted 
        ? userUpvotes.filter(id => id !== paperId)
        : [...userUpvotes, paperId];
    
    setUserUpvotes(newUpvoteIds);

    // Update derived UI count instantly
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
  };

  const handlePaperSubmit = (newPaper: Paper) => {
      setPapers(prev => [newPaper, ...prev]);
      setViewState({ type: 'home' });
      setActiveCategory('Front Page');
      
      setTimeout(() => {
          const element = document.getElementById('products');
          if (element) {
             element.scrollIntoView({ behavior: 'smooth' });
          }
      }, 100);
  };

  // --- Derived State ---
  const sortedPapers = useMemo(() => {
      // Basic ranking algorithm: Upvotes weighted heavily
      return [...papers].sort((a, b) => {
          if (b.upvotes !== a.upvotes) {
              return b.upvotes - a.upvotes;
          }
          return parseInt(b.publicationDate) - parseInt(a.publicationDate); 
      });
  }, [papers]);

  const savedPaperIds = useMemo(() => readingList.map(p => p.id), [readingList]);

  // Filter for publisher view
  const publisherPapers = useMemo(() => {
    if (viewState.type === 'publisher') {
        return sortedPapers.filter(p => p.publisher === viewState.publisherName);
    }
    return [];
  }, [sortedPapers, viewState]);

  if (isLoading) {
      return <div className="min-h-screen flex items-center justify-center bg-[#fcfbf9] text-black font-serif">Loading The Tech Times...</div>;
  }

  return (
    <div className="bg-[#fcfbf9] min-h-screen text-black selection:bg-black selection:text-white flex flex-col">
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

      <main className="flex-grow">
        {viewState.type === 'home' && (
          <>
            <Hero />
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
                         <button onClick={handleBackToHome} className="p-2 border border-black rounded-full hover:bg-black hover:text-white transition-colors">
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
                        onPublisherClick={() => {}} // No op
                        onToggleSave={handleToggleSave}
                        savedPaperIds={savedPaperIds}
                        activeCategory={'Front Page'} // Hide filters in publisher view usually
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
      </main>

      <Footer onLinkClick={handleNavClick} />
    </div>
  );
};

export default App;
