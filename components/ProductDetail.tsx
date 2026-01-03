/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState } from 'react';
import { Paper } from '../types';

interface ProductDetailProps {
  product: Paper;
  onBack: () => void;
  onToggleSave: (paper: Paper) => void;
  isSaved: boolean;
  onPublisherClick?: (name: string) => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({
  product,
  onBack,
  onToggleSave,
  isSaved,
  onPublisherClick
}) => {
  const [shareStatus, setShareStatus] = useState<'idle' | 'copied' | 'shared'>('idle');

  const handleShare = async () => {
    const shareData = {
      title: product.title,
      text: product.abstractPreview,
      url: window.location.href
    };

    // Try native Web Share API first (mobile/supported browsers)
    if (navigator.share && navigator.canShare?.(shareData)) {
      try {
        await navigator.share(shareData);
        setShareStatus('shared');
        setTimeout(() => setShareStatus('idle'), 2000);
        return;
      } catch (err) {
        // User cancelled or share failed, fall back to clipboard
      }
    }

    // Fallback: copy link to clipboard
    try {
      const shareText = `${product.title}\n\n${product.abstractPreview}\n\nRead more at The Tech Times`;
      await navigator.clipboard.writeText(shareText);
      setShareStatus('copied');
      setTimeout(() => setShareStatus('idle'), 2000);
    } catch (err) {
      // Clipboard API not available
      console.error('Unable to share:', err);
    }
  };

  const handleSourceClick = () => {
    if (product.doi && product.doi !== '#') {
      window.open(product.doi, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="min-h-screen bg-[#fcfbf9] animate-fade-in-up pt-8 md:pt-12 pb-24">
      <div className="max-w-[800px] mx-auto px-4 md:px-6">

        {/* Navigation */}
        <div className="mb-8 flex flex-wrap justify-between items-center border-b border-black pb-4 gap-4">
           <button
              onClick={onBack}
              className="group flex items-center gap-2 font-sans-accent text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-black transition-colors min-h-[44px]"
              aria-label="Return to front page"
           >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 group-hover:-translate-x-1 transition-transform">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
              Return to Front Page
           </button>
           <button
             onClick={() => onPublisherClick?.(product.publisher)}
             className="font-serif text-xs italic text-gray-400 hover:text-black hover:underline min-h-[44px] flex items-center"
           >
             {product.category} Section
           </button>
        </div>

        {/* Article Header */}
        <header className="text-center mb-8 md:mb-12">
            <h1 className="font-headline text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-black mb-6 leading-[1.1]">
                {product.title}
            </h1>

            <div className="flex flex-wrap justify-center items-center gap-2 md:gap-4 text-xs font-sans-accent uppercase tracking-widest text-gray-600 mb-8">
                <button
                  onClick={() => onPublisherClick?.(product.publisher)}
                  className="font-bold text-black border-b border-black hover:text-gray-600 min-h-[44px] flex items-center"
                >
                  {product.authors[0]}
                </button>
                <span className="hidden md:inline">-</span>
                <span>{product.publicationDate}</span>
                <span className="hidden md:inline">-</span>
                <span>{product.readTime || '5 min read'}</span>
            </div>

            <div className="w-full h-px bg-black opacity-20 mb-1"></div>
            <div className="w-full h-px bg-black opacity-80 mb-8 md:mb-12"></div>
        </header>

        {/* Article Content */}
        <article className="prose prose-lg prose-serif max-w-none text-gray-900 leading-loose">

            {/* Lead / Abstract with Drop Cap */}
            <p className="font-serif text-lg md:text-xl lg:text-2xl leading-relaxed text-gray-800 mb-8 first-letter:text-5xl md:first-letter:text-6xl first-letter:font-bold first-letter:float-left first-letter:mr-3 first-letter:mt-[-8px] md:first-letter:mt-[-12px] first-letter:font-headline">
                {product.abstract}
            </p>

            {product.aiInsights && product.aiInsights.length > 0 && product.aiInsights[0] !== 'Analysis pending...' && (
                <div className="bg-gray-100 border-y-2 border-black p-6 md:p-8 my-8 md:my-12">
                    <h3 className="font-sans-accent text-xs font-bold uppercase tracking-widest text-black mb-4">Key Takeaways</h3>
                    <ul className="list-disc pl-5 space-y-2 font-serif text-base text-gray-700">
                        {product.aiInsights.map((insight, idx) => (
                            <li key={idx}>{insight}</li>
                        ))}
                    </ul>
                </div>
            )}

            {product.whyMatters && (
                <div className="mb-8 md:mb-12">
                    <h4 className="font-headline text-lg md:text-xl font-bold mb-4">Why This Matters</h4>
                    <p className="font-serif text-gray-700">{product.whyMatters}</p>
                </div>
            )}

            {/* Publisher Info */}
            <div className="border-t border-gray-200 pt-8 mt-8">
                <div className="flex items-center justify-between flex-wrap gap-4">
                    <div>
                        <p className="font-sans-accent text-[10px] uppercase tracking-widest text-gray-400 mb-1">Published by</p>
                        <button
                          onClick={() => onPublisherClick?.(product.publisher)}
                          className="font-headline text-lg font-bold text-black hover:underline"
                        >
                          {product.publisher}
                        </button>
                    </div>
                    {product.doi && product.doi !== '#' && (
                      <button
                        onClick={handleSourceClick}
                        className="px-4 py-2 border border-black font-sans-accent text-xs uppercase tracking-widest hover:bg-black hover:text-white transition-colors min-h-[44px]"
                      >
                        View Source &rarr;
                      </button>
                    )}
                </div>
            </div>
        </article>

        {/* Footer Actions */}
        <div className="mt-12 md:mt-16 pt-8 border-t border-black flex flex-wrap justify-between items-center gap-4">
             <button
               onClick={() => onToggleSave(product)}
               className={`px-6 py-3 font-sans-accent text-xs font-bold uppercase tracking-widest border transition-colors min-h-[44px] ${isSaved ? 'bg-black text-white border-black' : 'bg-transparent border-black text-black hover:bg-gray-100'}`}
               aria-label={isSaved ? 'Remove from saved articles' : 'Save article for later'}
             >
                {isSaved ? 'Article Saved' : 'Save for Later'}
             </button>

             <div className="flex items-center gap-4">
                 {/* Share Button */}
                 <button
                   onClick={handleShare}
                   className="flex items-center gap-2 text-gray-500 hover:text-black transition-colors min-h-[44px] min-w-[44px] justify-center"
                   aria-label="Share this article"
                 >
                    {shareStatus === 'copied' ? (
                      <span className="text-xs font-sans-accent uppercase tracking-widest text-green-600">Copied!</span>
                    ) : shareStatus === 'shared' ? (
                      <span className="text-xs font-sans-accent uppercase tracking-widest text-green-600">Shared!</span>
                    ) : (
                      <>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
                        </svg>
                        <span className="text-xs font-sans-accent uppercase tracking-widest hidden sm:inline">Share</span>
                      </>
                    )}
                 </button>

                 {/* Upvote info */}
                 <div className="flex items-center gap-1 text-gray-400">
                   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                     <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5L12 3m0 0l7.5 7.5M12 3v18" />
                   </svg>
                   <span className="text-xs font-sans-accent">{product.upvotes}</span>
                 </div>
             </div>
        </div>

      </div>
    </div>
  );
};

export default ProductDetail;
