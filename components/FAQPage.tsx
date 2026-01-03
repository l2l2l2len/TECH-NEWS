/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState } from 'react';

interface FAQPageProps {
  onBack: () => void;
  onNavigate: (page: string) => void;
}

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: { category: string; items: FAQItem[] }[] = [
  {
    category: 'Getting Started',
    items: [
      {
        question: 'What is The Tech Times?',
        answer: 'The Tech Times is a free, open-access technology news platform that curates the most important stories from across the tech industry. We cover AI, cybersecurity, markets, gadgets, global tech policy, and opinion pieces from thought leaders.'
      },
      {
        question: 'Do I need to create an account?',
        answer: 'No! The Tech Times is designed to be completely free and open. No registration, login, or account creation is required. All features are available immediately upon visiting the site.'
      },
      {
        question: 'How is my data stored?',
        answer: 'All your data (saved articles, upvotes, newsletter subscription) is stored locally in your browser using localStorage. This means your data never leaves your device unless you explicitly export it. We prioritize your privacy.'
      }
    ]
  },
  {
    category: 'Using the Platform',
    items: [
      {
        question: 'How do I save articles to my library?',
        answer: 'Click the bookmark icon on any article card or use the "Save for Later" button on the article detail page. Saved articles appear in your Library, accessible from the "Saved" button in the navigation.'
      },
      {
        question: 'What does upvoting do?',
        answer: 'Upvoting helps surface the most valuable stories. Articles with more upvotes appear higher in the listings, helping the community discover the best content. Your upvotes are stored locally.'
      },
      {
        question: 'How do I search for articles?',
        answer: 'Use the search bar on the main page to search across article titles, publishers, categories, and content. You can also filter by category using the navigation bar or filter by publication year using the timeframe selector.'
      },
      {
        question: 'Can I export my saved articles?',
        answer: 'Yes! Open your Library and click "Export BibTeX" to download your saved articles in BibTeX format (great for academic citations). You can also export as JSON for a complete backup of your data.'
      }
    ]
  },
  {
    category: 'AI Assistant',
    items: [
      {
        question: 'What is the News Desk Assistant?',
        answer: 'The News Desk Assistant is an AI-powered chat feature that helps you explore tech news. You can ask questions about current articles, request summaries, or discuss technology topics. It is powered by Google Gemini.'
      },
      {
        question: 'Is the AI assistant free to use?',
        answer: 'Yes, the AI assistant is completely free. It uses our API integration with Google Gemini. If the API key is not configured or unavailable, you will see a friendly message indicating the service is temporarily unavailable.'
      },
      {
        question: 'Is my chat history private?',
        answer: 'Your chat messages are sent to Google Gemini for processing, subject to Google\'s privacy policy. We do not store your chat history on any servers. The conversation history is maintained only in your browser session and is cleared when you close the chat or refresh the page.'
      }
    ]
  },
  {
    category: 'Submitting Content',
    items: [
      {
        question: 'Can I submit articles to The Tech Times?',
        answer: 'Absolutely! Click "Submit Tip" in the navigation to contribute articles. We welcome links to interesting tech news, reports, or analysis from around the web. Submitted articles are added to the platform for the community to discover.'
      },
      {
        question: 'What kind of content can I submit?',
        answer: 'We accept links to technology news articles, research reports, analysis pieces, and opinion articles from reputable sources. Please include a title, publisher, link, and a brief description of why the article is valuable.'
      },
      {
        question: 'Are submissions moderated?',
        answer: 'Submitted content appears immediately in the platform as community contributions. We reserve the right to remove inappropriate or irrelevant submissions.'
      }
    ]
  },
  {
    category: 'Technical',
    items: [
      {
        question: 'What browsers are supported?',
        answer: 'The Tech Times works on all modern browsers including Chrome, Firefox, Safari, and Edge. We use modern web technologies (ES2022+, CSS Grid, Flexbox) so older browsers may not be fully supported.'
      },
      {
        question: 'Why did my saved articles disappear?',
        answer: 'Since data is stored in your browser\'s localStorage, clearing your browser data or using private/incognito mode will reset your saved articles. We recommend using the export feature to backup important data.'
      },
      {
        question: 'Does The Tech Times work offline?',
        answer: 'The platform requires an internet connection to load articles and use the AI assistant. However, articles you\'ve already loaded will remain visible in your current session even if you lose connection temporarily.'
      },
      {
        question: 'How do I clear all my data?',
        answer: 'You can clear your data by opening your browser\'s developer tools (F12), going to Application > Local Storage, and clearing the data for this site. Alternatively, clear your browser cache for this website.'
      }
    ]
  },
  {
    category: 'Keyboard Shortcuts',
    items: [
      {
        question: 'What keyboard shortcuts are available?',
        answer: 'Press "/" to focus the search box, "Escape" to close modals/drawers, "?" to show the shortcuts help. Use "s" to toggle save on the current article, and "h" to return to the home page.'
      }
    ]
  }
];

const FAQPage: React.FC<FAQPageProps> = ({ onBack, onNavigate }) => {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());

  const toggleItem = (id: string) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(id)) {
      newOpenItems.delete(id);
    } else {
      newOpenItems.add(id);
    }
    setOpenItems(newOpenItems);
  };

  return (
    <div className="min-h-screen bg-[#fcfbf9] pt-12 pb-24 animate-fade-in-up">
      <div className="max-w-[900px] mx-auto px-6">

        {/* Navigation */}
        <div className="mb-12 flex justify-between items-center border-b border-black pb-4">
          <button
            onClick={onBack}
            className="group flex items-center gap-2 font-sans-accent text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-black transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 group-hover:-translate-x-1 transition-transform">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            Return to Front Page
          </button>
        </div>

        {/* Header */}
        <header className="text-center mb-12">
          <span className="font-sans-accent text-xs font-bold uppercase tracking-widest text-gray-400 mb-4 block">Help Center</span>
          <h1 className="font-headline text-4xl md:text-5xl font-bold mb-4">Frequently Asked Questions</h1>
          <p className="font-serif text-lg text-gray-600 max-w-xl mx-auto">
            Find answers to common questions about using The Tech Times.
          </p>
        </header>

        <div className="w-full h-px bg-black opacity-20 mb-12"></div>

        {/* FAQ Sections */}
        <div className="space-y-12">
          {faqs.map((section, sectionIndex) => (
            <section key={sectionIndex}>
              <h2 className="font-headline text-2xl font-bold mb-6 pb-2 border-b border-gray-200">
                {section.category}
              </h2>
              <div className="space-y-4">
                {section.items.map((item, itemIndex) => {
                  const itemId = `${sectionIndex}-${itemIndex}`;
                  const isOpen = openItems.has(itemId);

                  return (
                    <div key={itemId} className="border border-gray-200 bg-white">
                      <button
                        onClick={() => toggleItem(itemId)}
                        className="w-full flex items-center justify-between p-4 md:p-6 text-left hover:bg-gray-50 transition-colors min-h-[56px]"
                        aria-expanded={isOpen}
                      >
                        <span className="font-serif text-base md:text-lg font-medium pr-4">
                          {item.question}
                        </span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className={`w-5 h-5 flex-shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                        </svg>
                      </button>
                      {isOpen && (
                        <div className="px-4 md:px-6 pb-4 md:pb-6 border-t border-gray-100">
                          <p className="font-serif text-gray-600 leading-relaxed pt-4">
                            {item.answer}
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>
          ))}
        </div>

        {/* Still Need Help */}
        <div className="mt-16 bg-gray-100 border border-black p-8 text-center">
          <h3 className="font-headline text-xl font-bold mb-2">Still Have Questions?</h3>
          <p className="font-serif text-gray-600 mb-6">
            Can't find what you're looking for? We're here to help.
          </p>
          <button
            onClick={() => onNavigate('contact')}
            className="px-8 py-3 bg-black text-white font-sans-accent text-xs font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors"
          >
            Contact Us
          </button>
        </div>
      </div>
    </div>
  );
};

export default FAQPage;
