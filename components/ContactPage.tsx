/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState } from 'react';

interface ContactPageProps {
  onBack: () => void;
}

const ContactPage: React.FC<ContactPageProps> = ({ onBack }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'general',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      return;
    }

    setStatus('sending');

    // Store message in localStorage for local-first functionality
    const existingMessages = JSON.parse(localStorage.getItem('contactMessages') || '[]');
    const newMessage = {
      ...formData,
      id: Date.now(),
      timestamp: new Date().toISOString()
    };
    localStorage.setItem('contactMessages', JSON.stringify([...existingMessages, newMessage]));

    // Simulate sending (in a real app, this would be an API call)
    setTimeout(() => {
      setStatus('success');
      setFormData({ name: '', email: '', subject: 'general', message: '' });
    }, 1000);
  };

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
        </div>

        {/* Header */}
        <header className="text-center mb-12">
          <span className="font-sans-accent text-xs font-bold uppercase tracking-widest text-gray-400 mb-4 block">Get in Touch</span>
          <h1 className="font-headline text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
          <p className="font-serif text-lg text-gray-600 max-w-xl mx-auto">
            Have a question, feedback, or a story tip? We'd love to hear from you.
          </p>
        </header>

        <div className="w-full h-px bg-black opacity-20 mb-12"></div>

        <div className="grid md:grid-cols-3 gap-12">
          {/* Contact Info */}
          <div className="md:col-span-1 space-y-8">
            <div>
              <h3 className="font-headline text-lg font-bold mb-2">Editorial</h3>
              <p className="font-serif text-sm text-gray-600">
                For story tips and editorial inquiries:
              </p>
              <a href="mailto:editorial@thetechtimes.com" className="font-serif text-sm text-black underline">
                editorial@thetechtimes.com
              </a>
            </div>

            <div>
              <h3 className="font-headline text-lg font-bold mb-2">General</h3>
              <p className="font-serif text-sm text-gray-600">
                For general questions:
              </p>
              <a href="mailto:hello@thetechtimes.com" className="font-serif text-sm text-black underline">
                hello@thetechtimes.com
              </a>
            </div>

            <div>
              <h3 className="font-headline text-lg font-bold mb-2">Technical</h3>
              <p className="font-serif text-sm text-gray-600">
                For technical issues or bug reports:
              </p>
              <a href="mailto:support@thetechtimes.com" className="font-serif text-sm text-black underline">
                support@thetechtimes.com
              </a>
            </div>

            <div className="pt-4 border-t border-gray-200">
              <h3 className="font-headline text-lg font-bold mb-2">Location</h3>
              <p className="font-serif text-sm text-gray-600">
                New York City, NY<br />
                United States
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="md:col-span-2">
            {status === 'success' ? (
              <div className="bg-green-50 border border-green-200 p-8 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-green-600">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </div>
                <h3 className="font-headline text-xl font-bold mb-2 text-green-800">Message Sent!</h3>
                <p className="font-serif text-green-700 mb-6">
                  Thank you for reaching out. Your message has been saved and we'll get back to you soon.
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  className="font-sans-accent text-xs font-bold uppercase tracking-widest text-green-700 underline"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block font-sans-accent text-xs font-bold uppercase tracking-widest mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full border border-gray-300 py-3 px-4 font-serif text-sm focus:border-black outline-none transition-colors bg-white"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block font-sans-accent text-xs font-bold uppercase tracking-widest mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full border border-gray-300 py-3 px-4 font-serif text-sm focus:border-black outline-none transition-colors bg-white"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-sans-accent text-xs font-bold uppercase tracking-widest mb-2">
                    Subject
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full border border-gray-300 py-3 px-4 font-serif text-sm focus:border-black outline-none transition-colors bg-white cursor-pointer"
                  >
                    <option value="general">General Inquiry</option>
                    <option value="story">Story Tip</option>
                    <option value="feedback">Feedback</option>
                    <option value="technical">Technical Issue</option>
                    <option value="partnership">Partnership Opportunity</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block font-sans-accent text-xs font-bold uppercase tracking-widest mb-2">
                    Message *
                  </label>
                  <textarea
                    required
                    rows={6}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full border border-gray-300 py-3 px-4 font-serif text-sm focus:border-black outline-none transition-colors bg-white resize-none"
                    placeholder="How can we help you?"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="w-full py-4 bg-black text-white font-sans-accent text-xs font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === 'sending' ? 'Sending...' : 'Send Message'}
                </button>

                <p className="text-center font-serif text-xs text-gray-400">
                  Your message is stored locally. No data is sent to external servers.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
