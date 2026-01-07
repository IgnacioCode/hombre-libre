import React from 'react';
import { Article } from '../types';

interface ArticleCardProps {
  article: Article;
  index: number;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({ article, index }) => {
  return (
    <div className="group relative border-l-2 border-stone-800 pl-6 py-4 hover:border-stone-500 transition-colors duration-500 ease-in-out">
      <div className="absolute -left-[9px] top-6 w-4 h-4 rounded-full bg-stone-950 border-2 border-stone-800 group-hover:border-stone-500 transition-colors duration-500" />
      
      <span className="block text-xs font-display tracking-[0.2em] text-stone-500 mb-2 uppercase group-hover:text-stone-400 transition-colors">
        Artículo {article.number}
      </span>
      
      <h3 className="text-xl md:text-2xl font-serif text-stone-200 mb-3 group-hover:text-white transition-colors">
        {article.title}
      </h3>
      
      <p className="text-stone-400 font-sans text-sm md:text-base leading-relaxed max-w-prose group-hover:text-stone-300 transition-colors">
        {article.content}
      </p>
    </div>
  );
};
