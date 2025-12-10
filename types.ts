/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';

export interface Article {
  id: string;
  title: string;
  publisher: string; // "Section" or "Column" name e.g. "Market Watch"
  publisherLogo?: string; 
  authors: string[];
  abstractPreview: string; // The "Lead"
  abstract: string; // Full body
  publicationDate: string;
  category: string; // "News", "Opinion", "Review"
  doi: string; // Link
  whyMatters: string;
  upvotes: number;
  timestamp: number;
  readTime?: string;

  // AI & Extended Metadata
  aiInsights?: string[];
  industry?: string[];
  fileUrl?: string; 
  
  // Backward compatibility 
  institution?: string;
  journal?: string;
  introduction?: string;
  methods?: string;
  results?: string;
  discussion?: string;
  references?: string[];
  tablesAndFigures?: string[];
  appendix?: string;
}

// Alias for refactoring ease
export type Paper = Article;

export interface JournalArticle {
  id: number;
  title: string;
  date: string;
  excerpt: string;
  content: React.ReactNode;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}

export type ViewState = 
  | { type: 'home' }
  | { type: 'paper', paper: Article }
  | { type: 'publisher', publisherName: string }
  | { type: 'journal', article: JournalArticle }
  | { type: 'submit' };