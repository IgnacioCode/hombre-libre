import React, { useState, useRef, useEffect } from 'react';
import { Send, Loader2, Sparkles } from 'lucide-react';
import { askOracle } from '../services/geminiService';
import { ChatMessage } from '../types';

export const Oracle: React.FC = () => {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Soy el guardián del Manifiesto. Pregunta sobre tus ataduras y recibirás juicio.' }
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim() || isLoading) return;

    const userText = query;
    setQuery('');
    setMessages(prev => [...prev, { role: 'user', text: userText }]);
    setIsLoading(true);

    const answer = await askOracle(userText);
    
    setMessages(prev => [...prev, { role: 'model', text: answer }]);
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col h-[600px] w-full max-w-2xl mx-auto border border-stone-800 bg-stone-900/50 rounded-sm overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-stone-800 bg-stone-950 flex items-center gap-2">
        <Sparkles className="w-4 h-4 text-stone-400" />
        <span className="text-xs font-display tracking-widest text-stone-400 uppercase">Consultar al Oráculo</span>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.map((msg, idx) => (
          <div 
            key={idx} 
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div 
              className={`max-w-[85%] p-4 rounded-sm text-sm md:text-base leading-relaxed ${
                msg.role === 'user' 
                  ? 'bg-stone-800 text-stone-200 border border-stone-700' 
                  : 'bg-transparent text-stone-300 font-serif border-l-2 border-stone-600 pl-4'
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-transparent pl-4 border-l-2 border-stone-600 py-2">
              <Loader2 className="w-5 h-5 text-stone-500 animate-spin" />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="p-4 bg-stone-950 border-t border-stone-800">
        <div className="relative flex items-center">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Escribe tu duda sobre una posesión o hábito..."
            className="w-full bg-stone-900 border border-stone-800 text-stone-200 p-4 pr-12 text-sm focus:outline-none focus:border-stone-600 placeholder-stone-600 transition-colors font-sans"
          />
          <button 
            type="submit" 
            disabled={isLoading || !query.trim()}
            className="absolute right-2 p-2 text-stone-500 hover:text-stone-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  );
};
