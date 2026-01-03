/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useMemo } from 'react';
import { Paper } from '../types';

interface HeroProps {
  onArticleClick?: (paper: Paper) => void;
  papers?: Paper[];
  onCategoryClick?: (category: string) => void;
}

const Hero: React.FC<HeroProps> = ({ onArticleClick, papers = [], onCategoryClick }) => {
  const [subscribeStatus, setSubscribeStatus] = useState<'idle' | 'success'>('idle');

  // Get top articles for Daily Briefing from different categories
  const briefingArticles = useMemo(() => {
    const markets = papers.find(p => p.category === 'Markets');
    const cyber = papers.find(p => p.category === 'Cyber');
    const gadgets = papers.find(p => p.category === 'Gadgets');
    return { markets, cyber, gadgets };
  }, [papers]);

  // Get the main featured article (highest upvoted from Front Page)
  const featuredArticle = useMemo(() => {
    return papers.find(p => p.category === 'Front Page' || p.category === 'AI News');
  }, [papers]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSubscribe = () => {
    // Store subscription indication
    const subscriptions = JSON.parse(localStorage.getItem('newsletterSubscriptions') || '[]');
    if (!subscriptions.includes('hero-subscriber')) {
      subscriptions.push('hero-subscriber');
      localStorage.setItem('newsletterSubscriptions', JSON.stringify(subscriptions));
    }
    setSubscribeStatus('success');
  };

  return (
    <section className="bg-[#fcfbf9] text-black pt-8 md:pt-12 pb-12 px-4 md:px-6 border-b-4 border-black">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">

        {/* Main Lead Story */}
        <div className="lg:col-span-8 lg:border-r border-gray-300 lg:pr-12">
            <div className="flex justify-between items-center border-t-2 border-black pt-1 mb-2">
                <span className="font-sans-accent text-[10px] font-bold uppercase tracking-widest text-red-700">Breaking News</span>
                <span className="font-serif text-xs italic text-gray-500">Washington D.C. Bureau</span>
            </div>

            <h1
              className={`font-headline text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.05] mb-6 text-black tracking-tight ${featuredArticle ? 'cursor-pointer hover:opacity-80 transition-opacity' : ''}`}
              onClick={() => featuredArticle && onArticleClick?.(featuredArticle)}
            >
                Artificial Intelligence <br className="hidden sm:block"/> Declared 'Strategic Asset'
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-6">
                <div>
                    <p className="font-serif text-base md:text-lg leading-relaxed first-letter:text-4xl md:first-letter:text-5xl first-letter:font-bold first-letter:float-left first-letter:mr-3 first-letter:mt-[-6px] md:first-letter:mt-[-10px] first-letter:font-headline">
                        The White House issued an executive order today classifying large language models as critical infrastructure, akin to the power grid or nuclear arsenal. The move signals a seismic shift in regulatory policy.
                    </p>
                </div>
                <div>
                     <p className="font-serif text-sm leading-relaxed text-gray-700">
                        "We are entering a new era of cognitive sovereignty," stated the Press Secretary. Tech giants reacted with a mixture of relief and trepidation as stock prices for major semiconductor firms surged in pre-market trading.
                     </p>
                     <a
                       href="#products"
                       onClick={(e) => handleNavClick(e, 'products')}
                       className="inline-flex items-center mt-4 font-sans-accent text-xs font-bold uppercase tracking-widest border-b border-black pb-1 hover:text-gray-600 min-h-[44px]"
                     >
                        Continue Reading &rarr;
                     </a>
                </div>
            </div>

            <div className="w-full h-[250px] md:h-[400px] overflow-hidden relative border border-black bg-gray-100">
                 <img
                    src="https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1200"
                    alt="A futuristic data center representing the AI infrastructure powering the new digital age"
                    className="w-full h-full object-cover grayscale contrast-125"
                    loading="lazy"
                 />
                 <div className="absolute bottom-0 left-0 bg-white border-t border-r border-black px-3 md:px-4 py-2 text-[9px] md:text-[10px] font-sans-accent uppercase tracking-widest">
                    Fig 1. The data centers powering the new age.
                 </div>
            </div>
        </div>

        {/* Side Column / Briefs */}
        <div className="lg:col-span-4 flex flex-col gap-6 md:gap-8">
            <div className="border-t-2 border-black pt-1">
                 <h3 className="font-headline text-xl md:text-2xl font-bold mb-4">Daily Briefing</h3>
                 <ul className="space-y-4 md:space-y-6">
                    {briefingArticles.markets && (
                      <li
                        className="pb-4 md:pb-6 border-b border-gray-200 cursor-pointer group"
                        onClick={() => onArticleClick?.(briefingArticles.markets!)}
                      >
                          <span className="block font-sans-accent text-[10px] font-bold text-gray-400 mb-1">MARKETS</span>
                          <h4 className="font-serif text-base md:text-lg font-bold leading-tight mb-2 group-hover:underline">
                            {briefingArticles.markets.title}
                          </h4>
                          <p className="font-serif text-xs text-gray-600 line-clamp-2">
                            {briefingArticles.markets.abstractPreview.substring(0, 100)}...
                          </p>
                      </li>
                    )}
                    {!briefingArticles.markets && (
                      <li
                        className="pb-4 md:pb-6 border-b border-gray-200 cursor-pointer group"
                        onClick={() => onCategoryClick?.('Markets')}
                      >
                          <span className="block font-sans-accent text-[10px] font-bold text-gray-400 mb-1">MARKETS</span>
                          <h4 className="font-serif text-base md:text-lg font-bold leading-tight mb-2 group-hover:underline">
                            NVIDIA surpasses Apple in market cap for the third time this week.
                          </h4>
                          <p className="font-serif text-xs text-gray-600">
                            The volatility suggests investor uncertainty regarding long-term AI hardware demand.
                          </p>
                      </li>
                    )}

                    {briefingArticles.cyber && (
                      <li
                        className="pb-4 md:pb-6 border-b border-gray-200 cursor-pointer group"
                        onClick={() => onArticleClick?.(briefingArticles.cyber!)}
                      >
                          <span className="block font-sans-accent text-[10px] font-bold text-gray-400 mb-1">PRIVACY</span>
                          <h4 className="font-serif text-base md:text-lg font-bold leading-tight mb-2 group-hover:underline">
                            {briefingArticles.cyber.title}
                          </h4>
                          <p className="font-serif text-xs text-gray-600 line-clamp-2">
                            {briefingArticles.cyber.abstractPreview.substring(0, 100)}...
                          </p>
                      </li>
                    )}
                    {!briefingArticles.cyber && (
                      <li
                        className="pb-4 md:pb-6 border-b border-gray-200 cursor-pointer group"
                        onClick={() => onCategoryClick?.('Cyber')}
                      >
                          <span className="block font-sans-accent text-[10px] font-bold text-gray-400 mb-1">PRIVACY</span>
                          <h4 className="font-serif text-base md:text-lg font-bold leading-tight mb-2 group-hover:underline">
                            EU passes restrictive data laws targeting 'Worldcoin'.
                          </h4>
                          <p className="font-serif text-xs text-gray-600">
                            Biometric data collection faces its stiffest legal challenge yet.
                          </p>
                      </li>
                    )}

                    <li
                      className="cursor-pointer group"
                      onClick={() => onCategoryClick?.('Gadgets')}
                    >
                        <span className="block font-sans-accent text-[10px] font-bold text-gray-400 mb-1">CULTURE</span>
                        <h4 className="font-serif text-base md:text-lg font-bold leading-tight mb-2 group-hover:underline">
                          Why Silicon Valley is obsessing over 'Medieval Modernism'.
                        </h4>
                    </li>
                 </ul>
            </div>

            <div className="bg-gray-100 p-4 md:p-6 border border-black text-center">
                <span className="font-masthead text-xl md:text-2xl block mb-2">The Tech Times</span>
                <p className="font-serif text-xs italic mb-4">Subscribe for daily delivery.</p>
                {subscribeStatus === 'success' ? (
                  <div className="py-2 text-green-700 text-sm font-bold">
                    <span>Subscribed!</span>
                  </div>
                ) : (
                  <button
                    onClick={handleSubscribe}
                    className="w-full bg-black text-white font-sans-accent text-xs font-bold uppercase py-3 hover:bg-gray-800 min-h-[44px] transition-colors"
                  >
                      Subscribe Now
                  </button>
                )}
            </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;
