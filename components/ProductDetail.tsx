/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
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
  return (
    <div className="min-h-screen bg-[#fcfbf9] animate-fade-in-up pt-12 pb-24">
      <div className="max-w-[800px] mx-auto px-6">
        
        {/* Navigation */}
        <div className="mb-8 flex justify-between items-center border-b border-black pb-4">
           <button 
              onClick={onBack}
              className="group flex items-center gap-2 font-sans-accent text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-black transition-colors"
           >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 group-hover:-translate-x-1 transition-transform">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
              Return to Front Page
           </button>
           <span className="font-serif text-xs italic text-gray-400">{product.category} Section</span>
        </div>

        {/* Article Header */}
        <div className="text-center mb-12">
            <h1 className="font-headline text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-6 leading-[1.1]">
                {product.title}
            </h1>
            
            <div className="flex justify-center items-center gap-4 text-xs font-sans-accent uppercase tracking-widest text-gray-600 mb-8">
                <span className="font-bold text-black border-b border-black">{product.authors[0]}</span>
                <span>•</span>
                <span>{product.publicationDate}</span>
                <span>•</span>
                <span>{product.readTime || '5 min read'}</span>
            </div>

            <div className="w-full h-px bg-black opacity-20 mb-1"></div>
            <div className="w-full h-px bg-black opacity-80 mb-12"></div>
        </div>

        {/* Article Content */}
        <article className="prose prose-lg prose-serif max-w-none text-gray-900 leading-loose">
            
            {/* Lead / Abstract with Drop Cap */}
            <p className="font-serif text-xl md:text-2xl leading-relaxed text-gray-800 mb-8 first-letter:text-6xl first-letter:font-bold first-letter:float-left first-letter:mr-3 first-letter:mt-[-12px] first-letter:font-headline">
                {product.abstract}
            </p>

            {product.aiInsights && product.aiInsights.length > 0 && (
                <div className="bg-gray-100 border-y-2 border-black p-8 my-12">
                    <h3 className="font-sans-accent text-xs font-bold uppercase tracking-widest text-black mb-4">Executive Summary</h3>
                    <ul className="list-disc pl-5 space-y-2 font-serif text-base text-gray-700">
                        {product.aiInsights.map((insight, idx) => (
                            <li key={idx}>{insight}</li>
                        ))}
                    </ul>
                </div>
            )}

            {product.whyMatters && (
                <div className="mb-12">
                    <h4 className="font-headline text-xl font-bold mb-4">Why This Matters</h4>
                    <p>{product.whyMatters}</p>
                </div>
            )}

            {/* Mock Article Body */}
            <p>
                The rapid evolution of this technology has caught regulators off guard. While Silicon Valley pushes for accelerated deployment, ethicists warn of the irreversible consequences on the social fabric. The question is no longer can we build it, but should we?
            </p>
            <p>
                In recent interviews, industry leaders have expressed a mixture of optimism and caution. "We are at the precipice," noted one CEO, who wished to remain anonymous. "The next six months will define the next six decades."
            </p>
        </article>

        {/* Footer Actions */}
        <div className="mt-16 pt-8 border-t border-black flex justify-between items-center">
             <button 
               onClick={() => onToggleSave(product)}
               className={`px-6 py-3 font-sans-accent text-xs font-bold uppercase tracking-widest border transition-colors ${isSaved ? 'bg-black text-white border-black' : 'bg-transparent border-black text-black hover:bg-gray-100'}`}
             >
                {isSaved ? 'Article Saved' : 'Save for Later'}
             </button>

             <div className="flex gap-4">
                 <button className="text-gray-500 hover:text-black">
                    <span className="sr-only">Share</span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
                    </svg>
                 </button>
             </div>
        </div>

      </div>
    </div>
  );
};

export default ProductDetail;