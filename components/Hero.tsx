/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';

const Hero: React.FC = () => {
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="bg-[#fcfbf9] text-black pt-12 pb-12 px-6 border-b-4 border-black">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Main Lead Story */}
        <div className="lg:col-span-8 border-r border-gray-300 pr-0 lg:pr-12">
            <div className="flex justify-between items-center border-t-2 border-black pt-1 mb-2">
                <span className="font-sans-accent text-[10px] font-bold uppercase tracking-widest text-red-700">Breaking News</span>
                <span className="font-serif text-xs italic text-gray-500">Washington D.C. Bureau</span>
            </div>
            
            <h1 className="font-headline text-5xl md:text-6xl lg:text-7xl font-bold leading-none mb-6 text-black tracking-tight">
                Artificial Intelligence <br/> Declared 'Strategic Asset'
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
                <div>
                    <p className="font-serif text-lg leading-relaxed first-letter:text-5xl first-letter:font-bold first-letter:float-left first-letter:mr-3 first-letter:mt-[-10px]">
                        The White House issued an executive order today classifying large language models as critical infrastructure, akin to the power grid or nuclear arsenal. The move signals a seismic shift in regulatory policy.
                    </p>
                </div>
                <div>
                     <p className="font-serif text-sm leading-relaxed text-gray-700">
                        "We are entering a new era of cognitive sovereignty," stated the Press Secretary. Tech giants reacted with a mixture of relief and trepidation as stock prices for major semiconductor firms surged in pre-market trading.
                     </p>
                     <a href="#products" onClick={(e) => handleNavClick(e, 'products')} className="inline-block mt-4 font-sans-accent text-xs font-bold uppercase tracking-widest border-b border-black pb-1 hover:text-gray-600">
                        Continue Reading →
                     </a>
                </div>
            </div>

            <div className="w-full h-[400px] overflow-hidden relative border border-black bg-gray-100">
                 <img 
                    src="https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1200" 
                    alt="AI Server Farm" 
                    className="w-full h-full object-cover grayscale contrast-125"
                 />
                 <div className="absolute bottom-0 left-0 bg-white border-t border-r border-black px-4 py-2 text-[10px] font-sans-accent uppercase tracking-widest">
                    Fig 1. The data centers powering the new age.
                 </div>
            </div>
        </div>

        {/* Side Column / Briefs */}
        <div className="lg:col-span-4 flex flex-col gap-8">
            <div className="border-t-2 border-black pt-1">
                 <h3 className="font-headline text-2xl font-bold mb-4">Daily Briefing</h3>
                 <ul className="space-y-6">
                    <li className="pb-6 border-b border-gray-200">
                        <span className="block font-sans-accent text-[10px] font-bold text-gray-400 mb-1">MARKETS</span>
                        <h4 className="font-serif text-lg font-bold leading-tight mb-2 hover:underline cursor-pointer">NVIDIA surpasses Apple in market cap for the third time this week.</h4>
                        <p className="font-serif text-xs text-gray-600">The volatility suggests investor uncertainty regarding long-term AI hardware demand.</p>
                    </li>
                    <li className="pb-6 border-b border-gray-200">
                        <span className="block font-sans-accent text-[10px] font-bold text-gray-400 mb-1">PRIVACY</span>
                        <h4 className="font-serif text-lg font-bold leading-tight mb-2 hover:underline cursor-pointer">EU passes restrictive data laws targeting 'Worldcoin'.</h4>
                        <p className="font-serif text-xs text-gray-600">Biometric data collection faces its stiffest legal challenge yet in the Eurozone.</p>
                    </li>
                    <li className="pb-6">
                        <span className="block font-sans-accent text-[10px] font-bold text-gray-400 mb-1">CULTURE</span>
                        <h4 className="font-serif text-lg font-bold leading-tight mb-2 hover:underline cursor-pointer">Why Silicon Valley is obsessing over 'Medieval Modernism'.</h4>
                    </li>
                 </ul>
            </div>

            <div className="bg-gray-100 p-6 border border-black text-center">
                <span className="font-masthead text-2xl block mb-2">The Tech Times</span>
                <p className="font-serif text-xs italic mb-4">Subscribe for daily delivery.</p>
                <button className="w-full bg-black text-white font-sans-accent text-xs font-bold uppercase py-3 hover:bg-gray-800">
                    Subscribe Now
                </button>
            </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;