/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';

interface TermsPageProps {
  onBack: () => void;
}

const TermsPage: React.FC<TermsPageProps> = ({ onBack }) => {
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
          <h1 className="font-headline text-4xl md:text-5xl font-bold mb-4">Terms of Service</h1>
          <p className="font-serif text-sm text-gray-500">Last updated: January 2025</p>
        </header>

        <div className="w-full h-px bg-black opacity-20 mb-12"></div>

        {/* Content */}
        <article className="prose prose-lg max-w-none font-serif text-gray-800 leading-relaxed space-y-8">

          <section>
            <h2 className="font-headline text-2xl font-bold mb-4">1. Acceptance of Terms</h2>
            <p>
              By accessing and using The Tech Times ("the Platform"), you accept and agree to be bound by these Terms of Service.
              If you do not agree to these terms, please do not use the Platform.
            </p>
          </section>

          <section>
            <h2 className="font-headline text-2xl font-bold mb-4">2. Description of Service</h2>
            <p>
              The Tech Times is a free, open-access technology news platform that provides:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>Curated technology news articles and analysis</li>
              <li>A personal reading list feature (stored locally in your browser)</li>
              <li>Article upvoting and community engagement features</li>
              <li>An AI-powered news assistant for inquiries</li>
              <li>The ability to submit articles for consideration</li>
            </ul>
          </section>

          <section>
            <h2 className="font-headline text-2xl font-bold mb-4">3. User Responsibilities</h2>
            <p>When using The Tech Times, you agree to:</p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>Use the Platform for lawful purposes only</li>
              <li>Not attempt to disrupt or compromise the Platform's functionality</li>
              <li>Not submit false, misleading, or defamatory content</li>
              <li>Not use the AI assistant for harmful, illegal, or unethical purposes</li>
              <li>Respect intellectual property rights when submitting content</li>
            </ul>
          </section>

          <section>
            <h2 className="font-headline text-2xl font-bold mb-4">4. Content Submission</h2>
            <p>
              When you submit articles or content to The Tech Times:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>You represent that you have the right to share the linked content</li>
              <li>You grant us a non-exclusive license to display your submission on the Platform</li>
              <li>You understand that submissions may be moderated or removed at our discretion</li>
              <li>You remain responsible for the accuracy of information you provide</li>
            </ul>
          </section>

          <section>
            <h2 className="font-headline text-2xl font-bold mb-4">5. Intellectual Property</h2>
            <p>
              The Tech Times name, logo, and original design elements are proprietary. Articles and content linked on
              the Platform remain the property of their respective publishers and authors. We provide links and summaries
              for informational purposes under fair use principles.
            </p>
          </section>

          <section>
            <h2 className="font-headline text-2xl font-bold mb-4">6. AI Assistant Disclaimer</h2>
            <p>
              The News Desk Assistant provides AI-generated responses for informational purposes only:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>Responses may contain inaccuracies or outdated information</li>
              <li>The AI is not a substitute for professional advice</li>
              <li>We are not liable for decisions made based on AI responses</li>
              <li>The AI service may be unavailable at times due to third-party limitations</li>
            </ul>
          </section>

          <section>
            <h2 className="font-headline text-2xl font-bold mb-4">7. Local Data Storage</h2>
            <p>
              The Platform stores data locally in your browser:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>You are responsible for managing your local storage</li>
              <li>We are not responsible for data loss due to browser clearing or device changes</li>
              <li>We recommend using the export feature to backup important data</li>
            </ul>
          </section>

          <section>
            <h2 className="font-headline text-2xl font-bold mb-4">8. Disclaimer of Warranties</h2>
            <p>
              The Platform is provided "as is" without warranties of any kind. We do not guarantee:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>Uninterrupted or error-free service</li>
              <li>The accuracy or completeness of any content</li>
              <li>That the Platform will meet your specific requirements</li>
              <li>The security of data transmitted through the Platform</li>
            </ul>
          </section>

          <section>
            <h2 className="font-headline text-2xl font-bold mb-4">9. Limitation of Liability</h2>
            <p>
              To the fullest extent permitted by law, The Tech Times and its creators shall not be liable for any
              indirect, incidental, special, consequential, or punitive damages arising from your use of the Platform.
            </p>
          </section>

          <section>
            <h2 className="font-headline text-2xl font-bold mb-4">10. Modifications</h2>
            <p>
              We reserve the right to modify these Terms of Service at any time. Changes will be posted on this page
              with an updated revision date. Your continued use of the Platform after changes constitutes acceptance
              of the modified terms.
            </p>
          </section>

          <section>
            <h2 className="font-headline text-2xl font-bold mb-4">11. Governing Law</h2>
            <p>
              These Terms shall be governed by and construed in accordance with the laws of the State of New York,
              United States, without regard to its conflict of law provisions.
            </p>
          </section>

          <section>
            <h2 className="font-headline text-2xl font-bold mb-4">12. Contact</h2>
            <p>
              For questions about these Terms of Service, please contact us at legal@thetechtimes.com or through
              our Contact page.
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

export default TermsPage;
