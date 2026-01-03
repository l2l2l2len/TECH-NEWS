/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';

interface AboutPageProps {
  onBack: () => void;
  onNavigate: (page: string) => void;
}

const AboutPage: React.FC<AboutPageProps> = ({ onBack, onNavigate }) => {
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
        <header className="text-center mb-16">
          <span className="font-sans-accent text-xs font-bold uppercase tracking-widest text-gray-400 mb-4 block">About Us</span>
          <h1 className="font-masthead text-5xl md:text-7xl mb-6">The Tech Times</h1>
          <p className="font-serif text-xl italic text-gray-600 max-w-2xl mx-auto">
            Your trusted source for technology news, curated with the elegance of traditional journalism.
          </p>
        </header>

        <div className="w-full h-px bg-black opacity-20 mb-12"></div>

        {/* Mission Section */}
        <section className="mb-16">
          <h2 className="font-headline text-3xl font-bold mb-6 text-center">Our Mission</h2>
          <div className="prose prose-lg max-w-none font-serif text-gray-800 leading-relaxed">
            <p className="first-letter:text-5xl first-letter:font-bold first-letter:float-left first-letter:mr-3 first-letter:mt-[-10px] first-letter:font-headline">
              The Tech Times was founded with a singular vision: to bring the depth and credibility of traditional journalism
              to the fast-paced world of technology news. In an era of information overload, we believe in quality over quantity,
              signal over noise.
            </p>
            <p>
              We curate and present the most significant developments in artificial intelligence, cybersecurity, global tech policy,
              markets, gadgets, and opinion pieces from thought leaders across the industry. Our platform is designed to help
              professionals, enthusiasts, and curious minds stay informed without the clutter.
            </p>
          </div>
        </section>

        {/* Features Section */}
        <section className="mb-16 grid md:grid-cols-2 gap-8">
          <div className="border border-black p-8 bg-white">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                </svg>
              </div>
              <h3 className="font-headline text-xl font-bold">Curated Reading List</h3>
            </div>
            <p className="font-serif text-gray-600">
              Save articles to your personal library. All data is stored locally in your browser - no account required.
              Export your collection as BibTeX for academic citations or JSON for backup.
            </p>
          </div>

          <div className="border border-black p-8 bg-white">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
                </svg>
              </div>
              <h3 className="font-headline text-xl font-bold">AI News Assistant</h3>
            </div>
            <p className="font-serif text-gray-600">
              Chat with our AI-powered News Desk Assistant. Ask questions about current tech news, get summaries of articles,
              or explore topics in depth. Powered by Google Gemini.
            </p>
          </div>

          <div className="border border-black p-8 bg-white">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z" />
                </svg>
              </div>
              <h3 className="font-headline text-xl font-bold">Smart Filtering</h3>
            </div>
            <p className="font-serif text-gray-600">
              Navigate by category, search across all content, filter by publication year, or upvote stories that matter to you.
              The most engaging stories rise to the top.
            </p>
          </div>

          <div className="border border-black p-8 bg-white">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z" />
                </svg>
              </div>
              <h3 className="font-headline text-xl font-bold">Community Contributions</h3>
            </div>
            <p className="font-serif text-gray-600">
              Found a great tech story? Submit it to our platform. Community-submitted articles are reviewed and added to the
              archive, building a collaborative knowledge base.
            </p>
          </div>
        </section>

        {/* Philosophy Section */}
        <section className="mb-16 bg-gray-100 border-y-2 border-black p-8 md:p-12">
          <h2 className="font-headline text-2xl font-bold mb-6 text-center">Our Philosophy</h2>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <h3 className="font-headline text-lg font-bold mb-2">Signal Over Noise</h3>
              <p className="font-serif text-sm text-gray-600">
                We filter through thousands of tech stories daily to surface only what truly matters.
              </p>
            </div>
            <div>
              <h3 className="font-headline text-lg font-bold mb-2">Privacy First</h3>
              <p className="font-serif text-sm text-gray-600">
                No accounts required. Your data stays in your browser. We respect your digital sovereignty.
              </p>
            </div>
            <div>
              <h3 className="font-headline text-lg font-bold mb-2">Open Access</h3>
              <p className="font-serif text-sm text-gray-600">
                Technology news should be accessible to everyone. No paywalls, no registration barriers.
              </p>
            </div>
          </div>
        </section>

        {/* Team/Credits */}
        <section className="text-center mb-16">
          <h2 className="font-headline text-2xl font-bold mb-4">Crafted With Care</h2>
          <p className="font-serif text-gray-600 mb-8">
            Designed and developed by <span className="font-bold">Gregorious Creative Studios</span> in New York City.
          </p>
          <p className="font-serif text-sm text-gray-400">
            Est. MMXXV
          </p>
        </section>

        {/* Legal Links */}
        <footer className="border-t border-black pt-8 flex flex-wrap justify-center gap-6 font-sans-accent text-xs uppercase tracking-widest">
          <button onClick={() => onNavigate('privacy')} className="hover:underline">Privacy Policy</button>
          <span className="text-gray-300">|</span>
          <button onClick={() => onNavigate('terms')} className="hover:underline">Terms of Service</button>
          <span className="text-gray-300">|</span>
          <button onClick={() => onNavigate('contact')} className="hover:underline">Contact Us</button>
          <span className="text-gray-300">|</span>
          <button onClick={() => onNavigate('faq')} className="hover:underline">FAQ</button>
        </footer>
      </div>
    </div>
  );
};

export default AboutPage;
