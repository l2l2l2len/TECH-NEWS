/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import { Paper } from '../types';

interface ProductCardProps {
  product: Paper;
  onClick: (paper: Paper) => void;
  onUpvote: (id: string) => void;
  isUpvoted: boolean;
  onPublisherClick?: (publisher: string) => void;
  onToggleSave?: (paper: Paper) => void;
  isSaved?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onClick,
  onUpvote,
  isUpvoted,
  onPublisherClick,
  onToggleSave,
  isSaved
}) => {

  const handleUpvoteClick = (e: React.MouseEvent) => {
      e.stopPropagation();
      onUpvote(product.id);
  };

  const handleSaveClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onToggleSave) {
        onToggleSave(product);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick(product);
    }
  };

  return (
    <article
        className="group flex flex-col justify-between cursor-pointer border-b border-r border-gray-300 bg-[#fcfbf9] p-4 md:p-6 h-full min-h-[320px] md:min-h-[380px] hover:bg-white transition-colors relative focus-within:ring-2 focus-within:ring-black"
        onClick={() => onClick(product)}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="article"
        aria-label={`${product.title} by ${product.authors[0]}`}
    >
      <div className="flex flex-col">
        {/* Header: Section */}
        <div className="flex justify-between items-start mb-3 md:mb-4 border-t-2 border-black pt-1">
             <span className="font-sans-accent text-[10px] font-bold uppercase tracking-widest text-gray-500">
                 {product.category}
             </span>
             <span className="font-serif text-xs italic text-gray-400">
                 {product.publicationDate}
             </span>
        </div>

        {/* Title */}
        <h3 className="font-headline text-xl md:text-2xl font-bold text-black mb-2 md:mb-3 leading-tight group-hover:underline decoration-1 underline-offset-4">
            {product.title}
        </h3>

        {/* Byline */}
        <div className="mb-3 md:mb-4 text-xs font-serif italic text-gray-600">
            By <span className="font-bold text-black">{product.authors[0]}</span> &nbsp;|&nbsp; {product.publisher}
        </div>

        {/* Abstract/Description - Justified like newspaper */}
        <p className="font-serif text-sm text-gray-800 leading-relaxed mb-4 md:mb-6 line-clamp-3 md:line-clamp-none md:text-justify">
            {product.abstractPreview}
        </p>

        {/* AI Insight Teaser - Styled as 'Key Point' */}
        {product.aiInsights && product.aiInsights.length > 0 && product.aiInsights[0] !== 'Analysis pending...' && (
             <div className="border-l-2 border-black pl-3 mb-4 hidden md:block">
                <p className="font-sans-accent text-[10px] font-bold uppercase tracking-widest text-black mb-1">Key Insight</p>
                <p className="font-serif text-xs italic text-gray-700 line-clamp-2">"{product.aiInsights[0]}"</p>
             </div>
        )}
      </div>

      {/* Footer Actions - Minimalist */}
      <div className="mt-auto pt-4 border-t border-dotted border-gray-400 flex justify-between items-center">
          <div className="font-sans-accent text-[10px] font-bold uppercase tracking-widest text-gray-500">
            {product.readTime || '5 min read'}
          </div>

          <div className="flex items-center gap-2">
              <button
                onClick={handleSaveClick}
                className={`min-w-[44px] min-h-[44px] flex items-center justify-center transition-colors rounded-full hover:bg-gray-100 ${isSaved ? 'text-black' : 'text-gray-400 hover:text-black'}`}
                aria-label={isSaved ? "Remove from saved articles" : "Save article"}
                aria-pressed={isSaved}
              >
                 <svg xmlns="http://www.w3.org/2000/svg" fill={isSaved ? "currentColor" : "none"} viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
                 </svg>
              </button>

              <button
                    onClick={handleUpvoteClick}
                    className="min-w-[44px] min-h-[44px] flex items-center justify-center gap-1 group/vote rounded-full hover:bg-gray-100"
                    aria-label={isUpvoted ? `Remove upvote. ${product.upvotes} upvotes` : `Upvote article. ${product.upvotes} upvotes`}
                    aria-pressed={isUpvoted}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill={isUpvoted ? "currentColor" : "none"} viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-4 h-4 ${isUpvoted ? 'text-black' : 'text-gray-400 group-hover/vote:text-black'}`}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5L12 3m0 0l7.5 7.5M12 3v18" />
                    </svg>
                    <span className={`font-sans-accent text-xs font-bold ${isUpvoted ? 'text-black' : 'text-gray-400 group-hover/vote:text-black'}`}>{product.upvotes}</span>
                </button>
          </div>
      </div>
    </article>
  );
}

export default ProductCard;
