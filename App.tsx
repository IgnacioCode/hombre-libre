import React from 'react';
import { MANIFESTO_ARTICLES, MANIFESTO_CLOSING } from './constants';
import { ArticleCard } from './components/ArticleCard';

const App: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-stone-700 selection:text-white">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-stone-950/90 backdrop-blur-sm border-b border-stone-900">
        <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
          <h1 className="text-sm md:text-base font-display tracking-widest text-stone-200">
            HOMBRE <span className="text-stone-600">LIBRE</span>
          </h1>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow pt-24 px-6 md:px-12 pb-20 max-w-4xl mx-auto w-full">
        <div className="animate-fade-in-up">
          <header className="mb-16 md:mb-24 mt-8 md:mt-16 text-center md:text-left">
            <span className="text-stone-600 text-xs font-display tracking-[0.3em] uppercase block mb-4">
              Principios Fundamentales
            </span>
            <h2 className="text-4xl md:text-6xl font-display text-white mb-6 leading-tight">
              Manifiesto del<br/>
              <span className="italic font-serif text-stone-400">Hombre Libre</span>
            </h2>
          </header>

          <div className="space-y-8 md:space-y-12 relative">
            {/* Vertical line connecting articles */}
            <div className="absolute left-[2px] top-4 bottom-4 w-[1px] bg-stone-800" />
            
            {MANIFESTO_ARTICLES.map((article, index) => (
              <ArticleCard key={article.id} article={article} index={index} />
            ))}
          </div>

          <footer className="mt-24 p-8 md:p-12 border border-stone-800 bg-stone-900/30 text-center">
            <p className="font-serif text-lg md:text-xl text-stone-300 italic mb-4 leading-relaxed">
              "{MANIFESTO_CLOSING}"
            </p>
          </footer>
        </div>
      </main>
      
      {/* Simple Footer */}
      <footer className="py-8 text-center text-stone-700 text-xs tracking-widest uppercase border-t border-stone-900 bg-stone-950">
        <p>Autonomía • Funcionalidad • Libertad</p>
      </footer>

      {/* Global styles for animation */}
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default App;