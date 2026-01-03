/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';

interface PrivacyPageProps {
  onBack: () => void;
}

const PrivacyPage: React.FC<PrivacyPageProps> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-[#fcfbf9] pt-12 pb-24 animate-fade-in-up">
      <div className="max-w-[800px] mx-auto px-6">

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
          <span className="font-serif text-xs italic text-gray-400">Legal</span>
        </div>

        {/* Header */}
        <header className="text-center mb-12">
          <span className="font-sans-accent text-xs font-bold uppercase tracking-widest text-gray-400 mb-4 block">Legal</span>
          <h1 className="font-headline text-4xl md:text-5xl font-bold mb-4">Privacy Policy</h1>
          <p className="font-serif text-sm text-gray-500">Last updated: January 2025</p>
        </header>

        <div className="w-full h-px bg-black opacity-20 mb-12"></div>

        {/* Content */}
        <article className="prose prose-lg max-w-none font-serif text-gray-800 leading-relaxed space-y-8">

          <section>
            <h2 className="font-headline text-2xl font-bold mb-4">Our Commitment to Privacy</h2>
            <p>
              The Tech Times is built with privacy as a core principle. We believe that reading the news should not require
              surrendering your personal data. This policy explains how we handle information when you use our platform.
            </p>
          </section>

          <section>
            <h2 className="font-headline text-2xl font-bold mb-4">Information We Collect</h2>
            <h3 className="font-headline text-xl font-bold mb-2 mt-6">Local Storage Only</h3>
            <p>
              The Tech Times operates primarily using your browser's local storage. We do not collect, transmit, or store
              any personal information on external servers. The following data is stored locally on your device:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li><strong>Reading List:</strong> Articles you save to your library</li>
              <li><strong>Upvotes:</strong> Your voting history on articles</li>
              <li><strong>Newsletter Subscription:</strong> Your email if you subscribe to our newsletter</li>
              <li><strong>Submitted Articles:</strong> Any articles you contribute to the platform</li>
            </ul>
            <p className="mt-4">
              This data never leaves your browser unless you explicitly export it using our export features.
            </p>
          </section>

          <section>
            <h2 className="font-headline text-2xl font-bold mb-4">AI Assistant</h2>
            <p>
              Our News Desk Assistant is powered by Google Gemini. When you use the chat feature:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>Your messages are sent to Google's API for processing</li>
              <li>Google's privacy policy applies to this data processing</li>
              <li>We do not store your chat history on our servers</li>
              <li>Chat history is maintained only in your browser session</li>
            </ul>
            <p className="mt-4">
              You can use The Tech Times fully without using the AI assistant if you prefer not to send data to third parties.
            </p>
          </section>

          <section>
            <h2 className="font-headline text-2xl font-bold mb-4">Cookies and Tracking</h2>
            <p>
              We do not use cookies for tracking purposes. We do not use analytics services that track individual users.
              We do not serve advertisements or use advertising trackers.
            </p>
          </section>

          <section>
            <h2 className="font-headline text-2xl font-bold mb-4">Third-Party Services</h2>
            <p>
              Our platform uses the following third-party services:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li><strong>Google Fonts:</strong> For typography (no personal data collected)</li>
              <li><strong>Unsplash:</strong> For images (no personal data collected)</li>
              <li><strong>Google Gemini:</strong> For AI chat functionality (see AI Assistant section)</li>
            </ul>
          </section>

          <section>
            <h2 className="font-headline text-2xl font-bold mb-4">Data Export and Deletion</h2>
            <p>
              You have full control over your data:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li><strong>Export:</strong> Use the export features to download your saved articles as BibTeX or JSON</li>
              <li><strong>Delete:</strong> Clear your browser's local storage to remove all data, or remove individual items from your library</li>
            </ul>
            <p className="mt-4">
              Since all data is stored locally, deleting it is as simple as clearing your browser data for this site.
            </p>
          </section>

          <section>
            <h2 className="font-headline text-2xl font-bold mb-4">Children's Privacy</h2>
            <p>
              The Tech Times is designed for a general audience interested in technology news. We do not knowingly collect
              any personal information from children under 13 years of age.
            </p>
          </section>

          <section>
            <h2 className="font-headline text-2xl font-bold mb-4">Changes to This Policy</h2>
            <p>
              We may update this privacy policy from time to time. Any changes will be reflected on this page with an
              updated revision date. Continued use of the platform after changes constitutes acceptance of the updated policy.
            </p>
          </section>

          <section>
            <h2 className="font-headline text-2xl font-bold mb-4">Contact Us</h2>
            <p>
              If you have questions about this privacy policy, please contact us through our Contact page or email us at
              privacy@thetechtimes.com.
            </p>
          </section>

        </article>

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t border-black text-center">
          <p className="font-serif text-sm text-gray-500">
            &copy; 2025 The Tech Times Media Group. All rights reserved.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default PrivacyPage;
