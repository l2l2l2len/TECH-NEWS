
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useMemo, useEffect } from 'react';
import { Paper } from '../types';
import ProductCard from './ProductCard';

interface ProductGridProps {
  papers: Paper[];
  onProductClick: (paper: Paper) => void;
  onUpvote: (id: string) => void;
  userUpvotes: string[];
  onPublisherClick: (publisher: string) => void;
  onToggleSave: (paper: Paper) => void;
  savedPaperIds: string[];
  activeCategory: string;
  setActiveCategory: (category: string) => void;
  hideFilters?: boolean;
}

const ProductGrid: React.FC<ProductGridProps> = ({ 
  papers, 
  onProductClick, 
  onUpvote, 
  userUpvotes, 
  onPublisherClick,
  onToggleSave,
  savedPaperIds,
  activeCategory,
  setActiveCategory,
  hideFilters = false
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [displayCount, setDisplayCount] = useState(20);

  // Year Filter State
  const [startYear, setStartYear] = useState<string>('All');
  const [endYear, setEndYear] = useState<string>('All');

  // Dynamically derive categories from the dataset (plus fixed ones from Navbar logic)
  const categories = useMemo(() => {
    // We want the specific order from Navbar usually, but also 'All'
    // Actually, Navbar controls the main categories now. 
    // We can show sub-categories or just rely on the main filters.
    // For simplicity, let's keep the Navbar categories as the primary source of truth for the 'activeCategory' prop.
    return ['Front Page', 'Global Tech', 'Markets', 'Opinion', 'Gadgets', 'Cyber'];
  }, []);

  // Extract available years from papers
  const availableYears = useMemo(() => {
    const years = papers
        .map(p => parseInt(p.publicationDate))
        .filter(y => !isNaN(y));
    const uniqueYears = Array.from(new Set(years)).sort((a: number, b: number) => b - a);
    return uniqueYears;
  }, [papers]);

  const filteredPapers = useMemo(() => {
    let result = papers;
    
    // Filter by Category
    if (activeCategory !== 'Front Page' && activeCategory !== 'All') {
      result = result.filter(p => p.category === activeCategory);
    }
    
    // Filter by Search Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(p => 
        p.title.toLowerCase().includes(q) || 
        p.publisher.toLowerCase().includes(q) ||
        p.abstract.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
      );
    }

    // Filter by Year Range
    if (startYear !== 'All' || endYear !== 'All') {
        result = result.filter(p => {
            const pYear = parseInt(p.publicationDate);
            if (isNaN(pYear)) return false;

            let validStart = true;
            let validEnd = true;

            if (startYear !== 'All') {
                validStart = pYear >= parseInt(startYear);
            }
            if (endYear !== 'All') {
                validEnd = pYear <= parseInt(endYear);
            }

            return validStart && validEnd;
        });
    }

    return result;
  }, [activeCategory, searchQuery, papers, startYear, endYear]);

  // Reset display count when category, search, or year changes
  useEffect(() => {
      setDisplayCount(20);
  }, [activeCategory, searchQuery, startYear, endYear]);

  const handleLoadMore = () => {
      setDisplayCount(prev => prev + 20);
  };

  const visiblePapers = filteredPapers.slice(0, displayCount);

  return (
    <section id="products" className="py-12 px-6 md:px-12 bg-[#fcfbf9]">
      <div className="max-w-[1800px] mx-auto">
        
        {/* Header Area */}
        <div className="flex flex-col items-center text-center mb-12 space-y-8">
          
          {/* Section Title (Large) */}
          {!hideFilters && (
              <h2 className="font-headline text-4xl md:text-5xl font-bold uppercase tracking-tight text-black border-b-2 border-black pb-4 px-12">
                  {activeCategory === 'Front Page' ? 'Latest Headlines' : activeCategory}
              </h2>
          )}

          {/* Search & Year Filter */}
          {!hideFilters && (
            <div className="w-full max-w-2xl flex flex-col gap-4">
                
                {/* Search Input */}
                <div className="relative w-full">
                    <input 
                    type="text" 
                    placeholder={`Search ${activeCategory === 'Front Page' ? 'all reports' : activeCategory}...`}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-white border border-gray-300 rounded-none px-4 py-3 text-black outline-none focus:border-black transition-all shadow-sm placeholder:text-gray-400 font-serif"
                    />
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                        </svg>
                    </div>
                </div>

                {/* Year Range Filters */}
                <div className="flex flex-wrap justify-center items-center gap-4 text-sm font-sans-accent">
                    <span className="text-xs font-bold uppercase tracking-widest text-gray-400">Timeframe:</span>
                    <div className="flex items-center gap-2">
                        <select 
                            value={startYear}
                            onChange={(e) => setStartYear(e.target.value)}
                            className="bg-transparent border-b border-gray-300 py-1 text-xs font-bold text-black focus:border-black outline-none cursor-pointer"
                        >
                            <option value="All">Start: Any</option>
                            {availableYears.map(year => (
                                <option key={`start-${year}`} value={year}>{year}</option>
                            ))}
                        </select>
                        <span className="text-gray-300">–</span>
                        <select 
                            value={endYear}
                            onChange={(e) => setEndYear(e.target.value)}
                            className="bg-transparent border-b border-gray-300 py-1 text-xs font-bold text-black focus:border-black outline-none cursor-pointer"
                        >
                            <option value="All">End: Any</option>
                            {availableYears.map(year => (
                                <option key={`end-${year}`} value={year}>{year}</option>
                            ))}
                        </select>
                    </div>
                    
                    {(startYear !== 'All' || endYear !== 'All') && (
                        <button 
                            onClick={() => { setStartYear('All'); setEndYear('All'); }}
                            className="text-[10px] font-bold uppercase tracking-widest text-red-600 hover:underline"
                        >
                            Reset
                        </button>
                    )}
                </div>
            </div>
          )}

          {!hideFilters && (
              <p className="text-gray-500 font-serif italic text-xs">
                Displaying {visiblePapers.length} articles
              </p>
          )}

        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-px bg-gray-300 border border-black">
          {visiblePapers.length > 0 ? (
            visiblePapers.map(paper => (
              <div key={paper.id} className="bg-[#fcfbf9] h-full">
                  <ProductCard 
                      product={paper} 
                      onClick={onProductClick}
                      onUpvote={onUpvote}
                      isUpvoted={userUpvotes.includes(paper.id)}
                      onPublisherClick={onPublisherClick}
                      onToggleSave={onToggleSave}
                      isSaved={savedPaperIds.includes(paper.id)}
                  />
              </div>
            ))
          ) : (
            <div className="col-span-full py-20 text-center bg-[#fcfbf9]">
              <p className="text-gray-400 font-serif text-lg">No stories found in this section.</p>
              <button 
                onClick={() => { setActiveCategory('Front Page'); setSearchQuery(''); setStartYear('All'); setEndYear('All'); }}
                className="mt-6 px-6 py-2 border border-black text-xs font-bold uppercase tracking-widest text-black hover:bg-black hover:text-white transition-colors"
              >
                Return to Front Page
              </button>
            </div>
          )}
        </div>

        {/* Load More Button */}
        {visiblePapers.length < filteredPapers.length && (
            <div className="flex justify-center mt-16">
                <button 
                    onClick={handleLoadMore}
                    className="px-8 py-3 border border-black text-black text-xs font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-colors"
                >
                    Load Older Stories
                </button>
            </div>
        )}
      </div>
    </section>
  );
};

export default ProductGrid;
