
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState } from 'react';
import { PAPERS } from '../constants';

interface FooterProps {
  onLinkClick: (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>, targetId: string) => void;
}

const Footer: React.FC<FooterProps> = ({ onLinkClick }) => {
  const [subscribeStatus, setSubscribeStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const validateEmail = (email: string): boolean => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubscribe = () => {
    if (!email) {
      setErrorMessage('Please enter your email address');
      return;
    }

    if (!validateEmail(email)) {
      setErrorMessage('Please enter a valid email address');
      return;
    }

    setSubscribeStatus('loading');
    setErrorMessage('');

    // Store subscription in localStorage
    try {
      const existingSubscriptions = JSON.parse(localStorage.getItem('newsletterSubscriptions') || '[]');

      // Check if already subscribed
      if (existingSubscriptions.includes(email.toLowerCase())) {
        setSubscribeStatus('success');
        setEmail('');
        return;
      }

      existingSubscriptions.push(email.toLowerCase());
      localStorage.setItem('newsletterSubscriptions', JSON.stringify(existingSubscriptions));

      setTimeout(() => {
        setSubscribeStatus('success');
        setEmail('');
      }, 500);
    } catch (e) {
      setSubscribeStatus('error');
      setErrorMessage('Unable to save subscription. Please try again.');
    }
  };

  const generateRSSFeed = () => {
    // Generate real RSS XML from articles
    const articles = PAPERS.slice(0, 20); // Latest 20 articles

    const rssItems = articles.map(article => `
    <item>
      <title><![CDATA[${article.title}]]></title>
      <link>${article.doi === '#' ? 'https://thetechtimes.com/article/' + article.id : article.doi}</link>
      <description><![CDATA[${article.abstractPreview}]]></description>
      <pubDate>${new Date().toUTCString()}</pubDate>
      <guid>https://thetechtimes.com/article/${article.id}</guid>
      <category>${article.category}</category>
      <author>${article.authors[0]}</author>
    </item>`).join('\n');

    const rssFeed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>The Tech Times</title>
    <link>https://thetechtimes.com</link>
    <description>The authoritative source for breaking technology news and deep-dive features.</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="https://thetechtimes.com/feed.xml" rel="self" type="application/rss+xml"/>
    ${rssItems}
  </channel>
</rss>`;

    // Create and download RSS file
    const blob = new Blob([rssFeed], { type: 'application/rss+xml' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'thetechtimes-feed.xml';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <footer className="bg-[#fcfbf9] pt-16 pb-12 px-6 text-black font-serif border-t-4 border-double border-black mt-24">
      <div className="max-w-[1200px] mx-auto flex flex-col items-center text-center">

        {/* Ancient Ornament Top */}
        <div className="mb-8 opacity-60">
            <svg width="100" height="20" viewBox="0 0 100 20" fill="currentColor" aria-hidden="true">
                <path d="M50 0 C30 10 20 10 0 10 L0 12 C20 12 30 12 50 20 C70 12 80 12 100 12 L100 10 C80 10 70 10 50 0 Z" />
            </svg>
        </div>

        {/* Masthead in Footer */}
        <h4 className="text-5xl md:text-6xl font-masthead text-black mb-6">The Tech Times</h4>

        <p className="max-w-lg font-serif text-lg italic text-gray-700 mb-10 leading-relaxed">
            "Illuminating the digital age with the ink of tradition. Establishing truth in a world of artificial signals."
        </p>

        {/* Quick Links with Navigation */}
        <div className="flex flex-wrap justify-center gap-4 md:gap-6 mb-12 font-headline text-xs font-bold uppercase tracking-widest text-black">
            <button onClick={(e) => onLinkClick(e, '')} className="hover:underline min-h-[44px] min-w-[44px] flex items-center justify-center px-2">Front Page</button>
            <span className="text-gray-300 hidden md:inline">|</span>
            <button onClick={(e) => onLinkClick(e, 'about')} className="hover:underline min-h-[44px] min-w-[44px] flex items-center justify-center px-2">About</button>
            <span className="text-gray-300 hidden md:inline">|</span>
            <button onClick={(e) => onLinkClick(e, 'submit')} className="hover:underline min-h-[44px] min-w-[44px] flex items-center justify-center px-2">Submit Tip</button>
            <span className="text-gray-300 hidden md:inline">|</span>
            <button onClick={generateRSSFeed} className="hover:underline min-h-[44px] min-w-[44px] flex items-center justify-center px-2">RSS Feed</button>
            <span className="text-gray-300 hidden md:inline">|</span>
            <button onClick={(e) => onLinkClick(e, 'faq')} className="hover:underline min-h-[44px] min-w-[44px] flex items-center justify-center px-2">Help</button>
        </div>

        {/* Newsletter Box */}
        <div className="w-full max-w-md border-2 border-black p-1 mb-12 relative">
            <div className="border border-black p-6 bg-[#fcfbf9]">
                <h5 className="font-headline text-xl font-bold mb-2 uppercase tracking-tight">The Daily Dispatch</h5>
                <p className="text-sm italic text-gray-600 mb-6">Delivered via electronic mail at dawn.</p>

                {subscribeStatus === 'success' ? (
                  <div className="py-4 text-center">
                    <div className="flex items-center justify-center gap-2 text-green-700 mb-2">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                      <span className="font-bold">Successfully subscribed!</span>
                    </div>
                    <p className="text-xs text-gray-500">Your subscription has been saved locally.</p>
                    <button
                      onClick={() => setSubscribeStatus('idle')}
                      className="mt-4 text-xs underline text-gray-500 hover:text-black"
                    >
                      Subscribe another email
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="flex border-b border-black">
                        <input
                        type="email"
                        placeholder="Enter your email address..."
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          setErrorMessage('');
                        }}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            handleSubscribe();
                          }
                        }}
                        disabled={subscribeStatus === 'loading'}
                        className="flex-1 bg-transparent py-3 px-2 outline-none placeholder-gray-400 text-black font-serif min-h-[44px]"
                        aria-label="Email address for newsletter"
                        />
                        <button
                        onClick={handleSubscribe}
                        disabled={subscribeStatus === 'loading'}
                        className="px-4 py-2 font-headline text-xs font-bold uppercase hover:bg-black hover:text-white transition-colors min-h-[44px] min-w-[80px]"
                        >
                        {subscribeStatus === 'loading' ? '...' : 'Inscribe'}
                        </button>
                    </div>
                    {errorMessage && (
                      <p className="mt-2 text-xs text-red-600">{errorMessage}</p>
                    )}
                    <p className="mt-3 text-[10px] text-gray-400">
                      Your email is stored locally in your browser. We respect your privacy.
                    </p>
                  </>
                )}
            </div>
        </div>

        {/* Legal Links */}
        <div className="flex flex-wrap justify-center gap-4 md:gap-6 mb-12 font-sans-accent text-[10px] uppercase tracking-widest text-gray-500">
            <button onClick={(e) => onLinkClick(e, 'privacy')} className="hover:text-black hover:underline min-h-[44px] flex items-center">Privacy Policy</button>
            <span className="text-gray-300 hidden sm:inline">|</span>
            <button onClick={(e) => onLinkClick(e, 'terms')} className="hover:text-black hover:underline min-h-[44px] flex items-center">Terms of Service</button>
            <span className="text-gray-300 hidden sm:inline">|</span>
            <button onClick={(e) => onLinkClick(e, 'contact')} className="hover:text-black hover:underline min-h-[44px] flex items-center">Contact Us</button>
        </div>

        {/* Credits / Colophon */}
        <div className="w-full border-t border-black pt-8 flex flex-col items-center gap-4">
            <div className="text-[10px] uppercase tracking-[0.2em] font-sans-accent text-gray-500">
                Est. MMXXV - New York City
            </div>

            <div className="font-serif text-sm italic">
                Baked with Love from NYC
            </div>

            <div className="mt-4 flex flex-col items-center gap-1">
                <span className="text-[9px] uppercase tracking-widest text-gray-400">Designed and Developed by</span>
                <span className="font-headline text-lg font-bold text-black border-b-2 border-black pb-1">Gregorious Creative Studios</span>
            </div>

            <p className="mt-8 text-[9px] text-gray-400 uppercase tracking-widest">
                &copy; 2025 The Tech Times Media Group. All Rights Reserved.
            </p>

            {/* Keyboard shortcut hint */}
            <p className="mt-4 text-[10px] text-gray-400">
              Press <kbd className="px-1 py-0.5 bg-gray-100 rounded text-[9px] font-mono">?</kbd> for keyboard shortcuts
            </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
