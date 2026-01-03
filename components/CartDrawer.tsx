
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useEffect, useRef, useState } from 'react';
import { Paper } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: Paper[];
  onRemoveItem: (paper: Paper) => void;
  onItemClick: (paper: Paper) => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose, items, onRemoveItem, onItemClick }) => {
  const drawerRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const [importStatus, setImportStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Focus trap and keyboard handling
  useEffect(() => {
    if (isOpen) {
      // Focus the close button when drawer opens
      setTimeout(() => {
        closeButtonRef.current?.focus();
      }, 100);

      // Handle escape key
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose();
        }
      };

      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';

      return () => {
        document.removeEventListener('keydown', handleKeyDown);
        document.body.style.overflow = '';
      };
    }
  }, [isOpen, onClose]);

  const handleExportBibTeX = () => {
    if (items.length === 0) return;

    const bibtex = items.map(paper => {
      const surname = paper.authors[0].split(' ').pop()?.replace(/[^a-zA-Z]/g, '').toLowerCase() || 'author';
      const citeKey = `${surname}${paper.publicationDate}`;
      const isArxiv = /^\d{4}\.\d{4,5}/.test(paper.doi) || paper.doi.toLowerCase().includes('arxiv');

      let entry = `@article{${citeKey},\n`;
      entry += `  title={${paper.title}},\n`;
      entry += `  author={${paper.authors.join(' and ')}},\n`;
      entry += `  year={${paper.publicationDate}},\n`;
      entry += `  journal={${isArxiv ? 'arXiv Preprint' : 'The Tech Times'}},\n`;

      if (isArxiv) {
        entry += `  eprint={${paper.doi.replace(/arXiv:/i, '')}},\n`;
        entry += `  archivePrefix={arXiv},\n`;
        entry += `  url={https://arxiv.org/abs/${paper.doi.replace(/arXiv:/i, '')}}\n`;
      } else {
        entry += `  url={${paper.doi === '#' ? 'https://thetechtimes.com/article/' + paper.id : paper.doi}}\n`;
      }

      entry += `}`;
      return entry;
    }).join('\n\n');

    downloadFile(bibtex, 'thetechtimes-citations.bib', 'text/plain');
  };

  const handleExportJSON = () => {
    if (items.length === 0) return;

    const exportData = {
      exportedAt: new Date().toISOString(),
      source: 'The Tech Times',
      version: '1.0',
      articles: items
    };

    downloadFile(JSON.stringify(exportData, null, 2), 'thetechtimes-library.json', 'application/json');
  };

  const downloadFile = (content: string, filename: string, mimeType: string) => {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const content = event.target?.result as string;
        const data = JSON.parse(content);

        // Validate the imported data
        if (data.articles && Array.isArray(data.articles)) {
          // Store imported articles
          const existingItems = JSON.parse(localStorage.getItem('libraryItems') || '[]');
          const newItems = data.articles.filter((article: Paper) =>
            !existingItems.some((existing: Paper) => existing.id === article.id)
          );
          const mergedItems = [...newItems, ...existingItems];
          localStorage.setItem('libraryItems', JSON.stringify(mergedItems));
          setImportStatus('success');
          setTimeout(() => {
            setImportStatus('idle');
            window.location.reload(); // Refresh to show imported articles
          }, 1500);
        } else {
          setImportStatus('error');
          setTimeout(() => setImportStatus('idle'), 3000);
        }
      } catch (err) {
        console.error('Import error:', err);
        setImportStatus('error');
        setTimeout(() => setImportStatus('idle'), 3000);
      }
    };
    reader.readAsText(file);
    e.target.value = ''; // Reset input
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/30 backdrop-blur-sm z-[10000] transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="drawer-title"
        className={`fixed inset-y-0 right-0 w-full md:w-[450px] bg-white z-[10001] shadow-2xl transform transition-transform duration-300 ease-out border-l border-gray-100 flex flex-col ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 md:p-6 border-b border-gray-100">
          <div className="flex items-center gap-3">
             <button
                ref={closeButtonRef}
                onClick={onClose}
                className="p-2 hover:bg-gray-50 rounded-full transition-colors group min-w-[44px] min-h-[44px] flex items-center justify-center"
                aria-label="Close library and go back"
             >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 group-hover:-translate-x-1 transition-transform">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
             </button>
             <h2 id="drawer-title" className="text-lg md:text-xl font-serif text-black">Library ({items.length})</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-black transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center hidden sm:flex"
            aria-label="Close library"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 md:space-y-6">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4 p-4">
              <div className="p-6 md:p-8 bg-gray-50 rounded-full mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-10 md:w-12 h-10 md:h-12 text-gray-300">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                </svg>
              </div>
              <p className="font-light text-gray-500">Your reading library is empty.</p>
              <p className="text-xs text-gray-400">Save articles to read later.</p>
              <button
                onClick={onClose}
                className="text-xs font-bold uppercase tracking-widest text-black underline underline-offset-8 decoration-1 min-h-[44px]"
              >
                Browse Articles
              </button>
            </div>
          ) : (
            items.map((item, idx) => (
              <div
                key={`${item.id}-${idx}`}
                onClick={() => { onItemClick(item); onClose(); }}
                className="flex flex-col gap-2 p-4 md:p-6 border border-gray-100 rounded-xl hover:border-black cursor-pointer transition-all animate-fade-in-up group bg-white hover:shadow-lg"
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onItemClick(item);
                    onClose();
                  }
                }}
              >
                <div className="flex justify-between items-start">
                    <h3 className="font-serif text-black leading-tight text-sm md:text-base mb-1 font-bold group-hover:underline transition-all pr-2">{item.title}</h3>
                    <button
                        onClick={(e) => { e.stopPropagation(); onRemoveItem(item); }}
                        className="text-gray-400 hover:text-red-600 transition-colors p-2 rounded-full hover:bg-red-50 min-w-[40px] min-h-[40px] flex items-center justify-center flex-shrink-0"
                        aria-label={`Remove ${item.title} from library`}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                            <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                        </svg>
                    </button>
                </div>
                <p className="text-xs md:text-sm text-gray-500 italic">{item.authors[0]} ({item.publicationDate})</p>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-4 md:p-6 border-t border-gray-100 bg-gray-50 flex flex-col gap-3">
          {/* Import Status */}
          {importStatus === 'success' && (
            <div className="text-center py-2 text-green-600 text-sm font-bold">
              Imported successfully! Refreshing...
            </div>
          )}
          {importStatus === 'error' && (
            <div className="text-center py-2 text-red-600 text-sm">
              Invalid file format. Please use a JSON file exported from The Tech Times.
            </div>
          )}

          {/* Export Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <button
               onClick={handleExportBibTeX}
               disabled={items.length === 0}
               className="py-3 md:py-4 bg-black text-white uppercase tracking-widest text-[10px] md:text-xs font-bold rounded-full hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed min-h-[44px]"
            >
               Export BibTeX
            </button>
            <button
               onClick={handleExportJSON}
               disabled={items.length === 0}
               className="py-3 md:py-4 bg-gray-700 text-white uppercase tracking-widest text-[10px] md:text-xs font-bold rounded-full hover:bg-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed min-h-[44px]"
            >
               Export JSON
            </button>
          </div>

          {/* Import Button */}
          <button
             onClick={handleImportClick}
             className="w-full py-3 md:py-4 border border-gray-300 text-gray-600 uppercase tracking-widest text-[10px] md:text-xs font-bold rounded-full hover:border-black hover:text-black transition-colors min-h-[44px]"
          >
             Import from JSON
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".json"
            onChange={handleImportFile}
            className="hidden"
            aria-hidden="true"
          />

          {/* Close Button */}
          <button
             onClick={onClose}
             className="w-full py-3 md:py-4 border border-black text-black uppercase tracking-widest text-[10px] md:text-xs font-bold rounded-full hover:bg-black hover:text-white transition-colors min-h-[44px]"
          >
             Close Library
          </button>
        </div>
      </div>
    </>
  );
};

export default CartDrawer;
