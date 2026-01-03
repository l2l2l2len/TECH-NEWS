
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect, useRef } from 'react';
import { BRAND_NAME } from '../constants';

// FAQ preview items to show in the menu
const faqPreviewItems = [
  { question: 'What is The Tech Times?', answer: 'A free, open-access technology news platform covering AI, cybersecurity, markets, gadgets, and more.' },
  { question: 'Do I need an account?', answer: 'No! Everything is free and open. No registration required.' },
  { question: 'How do I save articles?', answer: 'Click the bookmark icon on any article card or use "Save for Later" button.' },
];

interface NavbarProps {
  onNavClick: (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>, targetId: string) => void;
  onCategoryClick: (category: string) => void;
  cartCount: number;
  onOpenCart: () => void;
  activeCategory?: string;
}

const Navbar: React.FC<NavbarProps> = ({ onNavClick, onCategoryClick, cartCount, onOpenCart, activeCategory }) => {
  const [currentDate, setCurrentDate] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isFaqExpanded, setIsFaqExpanded] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const date = new Date();
    const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    setCurrentDate(date.toLocaleDateString('en-US', options));
  }, []);

  // Handle escape key and focus trap for mobile menu
  useEffect(() => {
    if (isMobileMenuOpen) {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setIsMobileMenuOpen(false);
          setIsFaqExpanded(false);
          menuButtonRef.current?.focus();
        }
      };

      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';

      return () => {
        document.removeEventListener('keydown', handleKeyDown);
        document.body.style.overflow = '';
      };
    }
  }, [isMobileMenuOpen]);

  const navItems = ['Front Page', 'AI News', 'Global Tech', 'Markets', 'Opinion', 'Gadgets', 'Cyber'];

  return (
    <nav
      className="bg-[#fcfbf9] border-b-4 border-black pt-4 pb-0 px-4 md:px-8 flex flex-col items-center relative sticky top-0 z-[50]"
      role="navigation"
      aria-label="Main navigation"
    >

      {/* Top Bar: Date & Weather Ticker */}
      <div className="w-full flex justify-between items-center text-[10px] md:text-xs font-serif border-b border-black pb-2 mb-4 uppercase tracking-widest text-gray-600">
        <span>{currentDate}</span>
        <span className="hidden lg:inline">London 12°C &nbsp;|&nbsp; New York 22°C &nbsp;|&nbsp; Tokyo 18°C</span>
        <span className="hidden sm:inline">Vol. CCXXIV No. 18</span>
      </div>

      {/* Mobile Header Controls */}
      <div className="w-full flex md:hidden justify-between items-center mb-4">
        <button
          ref={menuButtonRef}
          onClick={() => {
            if (isMobileMenuOpen) setIsFaqExpanded(false);
            setIsMobileMenuOpen(!isMobileMenuOpen);
          }}
          className="min-w-[44px] min-h-[44px] flex items-center justify-center"
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-menu"
          aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
        >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                )}
            </svg>
        </button>
        <button
          onClick={(e) => { onNavClick(e, ''); setIsMobileMenuOpen(false); }}
          className="font-masthead text-2xl sm:text-3xl"
          aria-label="Go to home page"
        >
          The Tech Times
        </button>
        <button
          onClick={onOpenCart}
          className="relative min-w-[44px] min-h-[44px] flex items-center justify-center"
          aria-label={`Open saved articles. ${cartCount} items saved.`}
        >
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
             </svg>
             {cartCount > 0 && (
               <span className="absolute -top-1 -right-1 bg-black text-white text-[9px] w-5 h-5 flex items-center justify-center rounded-full font-bold">
                 {cartCount > 99 ? '99+' : cartCount}
               </span>
             )}
        </button>
      </div>

      {/* Masthead (Desktop) */}
      <div className="mb-4 text-center hidden md:block">
        <button
            onClick={(e) => {
                e.preventDefault();
                onNavClick(e, '');
            }}
            className="font-masthead text-5xl md:text-7xl lg:text-8xl text-black hover:opacity-80 transition-opacity block leading-none px-4"
            aria-label="Go to home page"
        >
            {BRAND_NAME}
        </button>
        <div className="mt-2 text-[10px] uppercase tracking-[0.3em] font-sans-accent font-bold text-gray-500">
            The World's Technology Newspaper
        </div>
      </div>

      {/* Navigation Links (Desktop) */}
      <div className="w-full max-w-5xl border-t border-black border-b-2 border-black py-2 mb-1 hidden md:flex justify-center gap-4 lg:gap-8">
          {navItems.map((item) => (
              <button
                key={item}
                className={`font-headline text-xs lg:text-sm font-bold uppercase tracking-widest hover:underline decoration-2 underline-offset-4 whitespace-nowrap transition-colors min-h-[44px] px-2 ${activeCategory === item ? 'text-black underline' : 'text-gray-600'}`}
                onClick={() => onCategoryClick(item)}
                aria-current={activeCategory === item ? 'page' : undefined}
              >
                  {item}
              </button>
          ))}
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-[49] md:hidden"
          onClick={() => { setIsMobileMenuOpen(false); setIsFaqExpanded(false); }}
          aria-hidden="true"
        />
      )}

      {/* Mobile Menu */}
      <div
        ref={mobileMenuRef}
        id="mobile-menu"
        className={`md:hidden w-full bg-[#fcfbf9] border-t border-black fixed left-0 shadow-xl py-4 px-4 flex flex-col gap-2 border-b-4 z-[50] transition-transform duration-300 ${
          isMobileMenuOpen ? 'translate-y-0' : '-translate-y-full pointer-events-none'
        }`}
        style={{ top: '100px' }}
        role="menu"
        aria-hidden={!isMobileMenuOpen}
      >
           {navItems.map((item, index) => (
              <button
                key={item}
                role="menuitem"
                tabIndex={isMobileMenuOpen ? 0 : -1}
                className={`text-left font-headline text-base font-bold uppercase tracking-widest min-h-[48px] px-4 flex items-center border-b border-gray-100 ${activeCategory === item ? 'text-black bg-gray-100' : 'text-gray-600'}`}
                onClick={() => {
                    onCategoryClick(item);
                    setIsMobileMenuOpen(false);
                }}
                aria-current={activeCategory === item ? 'page' : undefined}
              >
                  {item}
              </button>
          ))}
          <div className="border-t border-gray-300 pt-4 mt-2 space-y-2">
             <button
               role="menuitem"
               tabIndex={isMobileMenuOpen ? 0 : -1}
               onClick={(e) => { onNavClick(e, 'submit'); setIsMobileMenuOpen(false); }}
               className="w-full text-left font-serif italic text-base min-h-[48px] px-4 flex items-center hover:bg-gray-100"
             >
               Submit a Tip
             </button>
             <button
               role="menuitem"
               tabIndex={isMobileMenuOpen ? 0 : -1}
               onClick={() => { onOpenCart(); setIsMobileMenuOpen(false); }}
               className="w-full text-left font-serif italic text-base min-h-[48px] px-4 flex items-center hover:bg-gray-100"
             >
               Saved Articles ({cartCount})
             </button>
             <button
               role="menuitem"
               tabIndex={isMobileMenuOpen ? 0 : -1}
               onClick={(e) => { onNavClick(e, 'about'); setIsMobileMenuOpen(false); }}
               className="w-full text-left font-serif italic text-base min-h-[48px] px-4 flex items-center hover:bg-gray-100"
             >
               About Us
             </button>
             {/* Help & FAQ Expandable Section */}
             <div className="border-t border-gray-200 mt-2">
               <button
                 role="menuitem"
                 tabIndex={isMobileMenuOpen ? 0 : -1}
                 onClick={() => setIsFaqExpanded(!isFaqExpanded)}
                 className="w-full text-left font-serif italic text-base min-h-[48px] px-4 flex items-center justify-between hover:bg-gray-100"
                 aria-expanded={isFaqExpanded}
               >
                 <span>Help & FAQ</span>
                 <svg
                   xmlns="http://www.w3.org/2000/svg"
                   fill="none"
                   viewBox="0 0 24 24"
                   strokeWidth={1.5}
                   stroke="currentColor"
                   className={`w-4 h-4 transition-transform duration-200 ${isFaqExpanded ? 'rotate-180' : ''}`}
                 >
                   <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                 </svg>
               </button>

               {/* FAQ Preview/Expanded Content */}
               <div className={`overflow-hidden transition-all duration-300 ${isFaqExpanded ? 'max-h-[500px]' : 'max-h-0'}`}>
                 <div className="px-4 py-2 space-y-3 bg-gray-50">
                   {faqPreviewItems.map((item, index) => (
                     <div key={index} className="border-l-2 border-gray-300 pl-3 py-1">
                       <p className="font-serif text-sm font-medium text-gray-800">{item.question}</p>
                       <p className="font-serif text-xs text-gray-600 mt-1">{item.answer}</p>
                     </div>
                   ))}
                   <button
                     onClick={(e) => { onNavClick(e, 'faq'); setIsMobileMenuOpen(false); setIsFaqExpanded(false); }}
                     className="w-full text-center font-sans-accent text-xs font-bold uppercase tracking-wider text-black py-2 mt-2 border border-black hover:bg-black hover:text-white transition-colors"
                   >
                     View All FAQ →
                   </button>
                 </div>
               </div>
             </div>
          </div>
      </div>

      {/* Floating Actions (Desktop) */}
      <div className="absolute right-4 top-20 lg:top-8 gap-3 hidden md:flex">
          <button
            onClick={(e) => { e.preventDefault(); onOpenCart(); }}
            className="flex items-center gap-1 font-serif text-xs font-bold border border-black px-4 py-2 hover:bg-black hover:text-white transition-colors min-h-[44px]"
            aria-label={`Open saved articles. ${cartCount} items saved.`}
          >
             <span>Saved ({cartCount})</span>
          </button>
           <button
             onClick={(e) => onNavClick(e, 'submit')}
             className="flex items-center gap-1 font-serif text-xs font-bold bg-black text-white border border-black px-4 py-2 hover:bg-white hover:text-black transition-colors min-h-[44px]"
           >
              Submit Tip
           </button>
      </div>
    </nav>
  );
};

export default Navbar;
