
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState } from 'react';
import { Paper } from '../types';

interface CheckoutProps {
  onBack: () => void;
  onSubmit: (paper: Paper) => void;
}

const Checkout: React.FC<CheckoutProps> = ({ onBack, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: '',
    publisher: '',
    link: '',
    description: '',
    category: '',
    year: new Date().getFullYear().toString()
  });
  
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.publisher || !formData.link || !formData.description) {
        setErrorMessage("Please fill out all required fields.");
        return;
    }

    // Character limit validation
    if (formData.description.length < 50) {
        setErrorMessage("Description is too short.");
        return;
    }

    const finalReport: Paper = {
        id: `sub-${Date.now()}`,
        title: formData.title,
        publisher: formData.publisher,
        authors: [formData.publisher], // Default author to publisher for simplicity
        abstract: formData.description,
        abstractPreview: formData.description.substring(0, 150) + "...",
        publicationDate: formData.year,
        category: formData.category || "General",
        doi: formData.link,
        whyMatters: "Community submission pending analysis.",
        upvotes: 1,
        timestamp: Date.now(),
        aiInsights: ["Analysis pending..."], // Placeholder for AI
        publisherLogo: ""
    };

    onSubmit(finalReport);
  };

  return (
    <div className="min-h-screen pt-24 pb-24 px-6 bg-white animate-fade-in-up">
      <div className="max-w-2xl mx-auto">
        <button 
          onClick={onBack}
          className="group flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-black transition-colors mb-12"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 group-hover:-translate-x-1 transition-transform">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
          Back to Reports
        </button>

        <div className="bg-white">
            <span className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2 block">Contribute</span>
            <h1 className="text-4xl font-serif text-black mb-4">Submit a Report</h1>
            <p className="text-sm text-gray-500 mb-12">
                Found a great public report from a VC firm, think tank, or analyst? Add it to the archive.
            </p>
            
            <form className="space-y-12" onSubmit={handleSubmit}>
              
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-black mb-2">Report Title *</label>
                        <input 
                            type="text" 
                            className="w-full bg-gray-50 border-b border-gray-200 py-3 px-3 text-sm focus:border-black outline-none transition-colors"
                            value={formData.title}
                            onChange={(e) => setFormData({...formData, title: e.target.value})}
                            placeholder="e.g. State of AI 2024"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-black mb-2">Publisher/Firm *</label>
                        <input 
                            type="text" 
                            className="w-full bg-gray-50 border-b border-gray-200 py-3 px-3 text-sm focus:border-black outline-none transition-colors"
                            value={formData.publisher}
                            onChange={(e) => setFormData({...formData, publisher: e.target.value})}
                            placeholder="e.g. Andreessen Horowitz"
                        />
                    </div>
                  </div>

                  <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-black mb-2">Direct Link to PDF/Page *</label>
                        <input 
                            type="url" 
                            className="w-full bg-gray-50 border-b border-gray-200 py-3 px-3 text-sm focus:border-black outline-none transition-colors"
                            value={formData.link}
                            onChange={(e) => setFormData({...formData, link: e.target.value})}
                            placeholder="https://..."
                        />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-black mb-2">Year</label>
                        <input type="text" className="w-full bg-gray-50 border-b border-gray-200 py-3 px-3 text-sm focus:border-black outline-none transition-colors" value={formData.year} onChange={(e) => setFormData({...formData, year: e.target.value})}/>
                    </div>
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-black mb-2">Category (Tag)</label>
                        <input type="text" className="w-full bg-gray-50 border-b border-gray-200 py-3 px-3 text-sm focus:border-black outline-none transition-colors" value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} placeholder="e.g. SaaS, Crypto, Climate"/>
                    </div>
                  </div>
              
                  <div>
                      <div className="flex justify-between mb-2">
                        <label className="block text-xs font-bold uppercase tracking-widest text-black">Short Description / Key Takeaway *</label>
                        <span className={`text-xs ${formData.description.length < 50 ? 'text-gray-400' : 'text-black'}`}>
                           {formData.description.length} chars
                        </span>
                      </div>
                      <textarea 
                          className="w-full bg-gray-50 border-b border-gray-200 py-3 px-3 text-sm resize-none focus:border-black outline-none transition-colors"
                          rows={6}
                          value={formData.description}
                          onChange={(e) => setFormData({...formData, description: e.target.value})}
                          placeholder="What is this report about? What is the main finding?"
                      />
                  </div>
              </div>

              {errorMessage && (
                <div className="p-4 bg-red-50 border-l-2 border-red-500 text-xs text-red-600">
                    {errorMessage}
                </div>
              )}

              <button 
                type="submit"
                className="w-full py-5 bg-black text-white text-sm font-bold uppercase tracking-widest rounded-full hover:bg-gray-800 transition-colors shadow-xl"
              >
                Submit to ReportHunt
              </button>
            </form>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
