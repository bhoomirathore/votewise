import React, { useState, useEffect, useRef } from 'react';
import { Bot, X, Send, Trash2 } from 'lucide-react';

const SYSTEM_PROMPT = "You are VoteWise, a civic education assistant specializing in Indian elections. Answer only questions about election processes, voting rights, electoral systems, and democratic institutions. Be factual, neutral, and concise — maximum 150 words per answer. Never endorse any political party or candidate. If asked about unrelated topics, politely redirect. After your main answer always add: SUGGESTIONS: followed by exactly 2 short follow-up questions separated by a pipe character. Example: SUGGESTIONS: What is Form 6? | How do I check my voter ID status?";

const STARTER_CHIPS = [
  "What is ECI?",
  "How does an EVM work?",
  "What is NOTA?",
  "What is VVPAT?",
  "How are election results declared?"
];

const WELCOME_MESSAGE = "Namaste! I am VoteWise, your civic education assistant. Ask me anything about the Indian election process — how voting works, what EVM and VVPAT are, how results are declared, and more. I am non-partisan and here only to educate.";

export default function GeminiChat({ isOpen, onClose }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Load from local storage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('votewise-chat-history');
      if (saved) {
        setMessages(JSON.parse(saved));
      } else {
        setMessages([{ role: 'model', content: WELCOME_MESSAGE, timestamp: new Date().toISOString() }]);
      }
    } catch {
      setMessages([{ role: 'model', content: WELCOME_MESSAGE, timestamp: new Date().toISOString() }]);
    }
  }, []);

  // Save to local storage
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('votewise-chat-history', JSON.stringify(messages));
    }
  }, [messages]);

  // Auto scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const clearChat = () => {
    setMessages([{ role: 'model', content: WELCOME_MESSAGE, timestamp: new Date().toISOString() }]);
  };

  const handleSend = async (text) => {
    if (!text.trim() || isLoading) return;

    const userMessage = { role: 'user', content: text, timestamp: new Date().toISOString() };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    try {
      const conversationHistory = [
        { role: 'system', content: SYSTEM_PROMPT },
        ...newMessages.map(msg => ({
          role: msg.role === 'user' ? 'user' : 'assistant',
          content: msg.content
        }))
      ];

      const apiKey = import.meta.env.VITE_GROQ_API_KEY;

      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: 'llama-3.1-8b-instant',
          messages: conversationHistory,
          max_tokens: 500,
          temperature: 0.7
        })
      });

      if (!response.ok) throw new Error("API Error");

      const data = await response.json();
      const aiMessage = data.choices[0].message.content;

      setMessages([...newMessages, { role: 'model', content: aiMessage, timestamp: new Date().toISOString() }]);
    } catch (err) {
      console.error(err);
      setMessages([...newMessages, { role: 'model', content: "Sorry, I could not connect right now. Please try again.", timestamp: new Date().toISOString() }]);
    } finally {
      setIsLoading(false);
    }
  };

  const parseMessage = (text) => {
    const parts = text.split('SUGGESTIONS:');
    const mainText = parts[0].trim();
    const suggestions = parts[1] ? parts[1].split('|').map(s => s.trim()).filter(Boolean) : [];
    return { mainText, suggestions };
  };

  if (!isOpen) return null;

  return (
    <>
      <style>{`
        @keyframes chatSlideUp {
          from { transform: translateY(20px) scale(0.95); opacity: 0; }
          to { transform: translateY(0) scale(1); opacity: 1; }
        }
        .animate-chat-slide {
          animation: chatSlideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
      <div 
        className="fixed inset-0 sm:inset-auto sm:bottom-24 sm:right-6 z-50 flex flex-col w-full sm:w-[380px] h-full sm:h-[520px] bg-white dark:bg-card-dark sm:rounded-2xl shadow-2xl sm:border border-border-light dark:border-border-dark overflow-hidden animate-chat-slide"
        role="dialog"
        aria-label="VoteWise AI Chat"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 flex-shrink-0" style={{ background: '#FF9933' }}>
           <div className="flex items-center gap-3">
              <div className="p-1.5 bg-white/20 rounded-lg">
                 <Bot className="w-5 h-5" />
              </div>
              <div>
                 <h3 className="font-bold text-sm tracking-wide">VoteWise AI</h3>
                 <p className="text-[11px] opacity-90 leading-tight">Your non-partisan election guide</p>
              </div>
           </div>
           <div className="flex items-center gap-1">
              <button onClick={clearChat} aria-label="Clear chat" title="Clear chat" className="p-2 hover:bg-white/20 rounded-lg transition-colors">
                 <Trash2 className="w-4 h-4" />
              </button>
              <button onClick={onClose} aria-label="Close chat panel" title="Close" className="p-2 hover:bg-white/20 rounded-lg transition-colors">
                 <X className="w-5 h-5" />
              </button>
           </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-5 bg-gray-50/50 dark:bg-gray-900/50">
          {messages.map((msg, idx) => {
             const isUser = msg.role === 'user';
             const { mainText, suggestions } = parseMessage(msg.content);
             const isStarter = !isUser && idx === 0 && messages.length === 1;

             return (
               <div key={idx} className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
                  <div className={`max-w-[85%] px-4 py-3 rounded-2xl ${isUser ? 'text-white rounded-br-sm shadow-md' : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 shadow-sm border border-gray-100 dark:border-gray-700 rounded-bl-sm'}`}
                       style={isUser ? { background: '#FF9933' } : {}}>
                     <p className="text-[13px] md:text-sm whitespace-pre-wrap leading-relaxed">{mainText}</p>
                  </div>
                  <span className="text-[10px] text-gray-400 mt-1.5 px-1 font-medium">
                     {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                  
                  {/* Starter chips */}
                  {isStarter && (
                     <div className="flex flex-wrap gap-2 mt-4">
                        {STARTER_CHIPS.map(chip => (
                           <button key={chip} onClick={() => handleSend(chip)} className="text-[11px] md:text-xs px-3 py-1.5 bg-white dark:bg-gray-800 border border-eci-blue/30 text-eci-blue dark:text-eci-blue-light rounded-full hover:bg-eci-blue hover:text-white transition-colors text-left shadow-sm">
                              {chip}
                           </button>
                        ))}
                     </div>
                  )}

                  {/* Follow up suggestions */}
                  {suggestions.length > 0 && !isUser && idx === messages.length - 1 && (
                     <div className="flex flex-wrap gap-2 mt-3">
                        {suggestions.map((chip, i) => (
                           <button key={i} onClick={() => handleSend(chip)} className="text-[11px] md:text-xs px-3 py-1.5 bg-eci-blue/10 dark:bg-eci-blue/20 text-eci-blue dark:text-eci-blue-light rounded-full hover:bg-eci-blue/20 transition-colors text-left font-semibold border border-eci-blue/20">
                              {chip}
                           </button>
                        ))}
                     </div>
                  )}
               </div>
             );
          })}
          {isLoading && (
             <div className="flex items-start">
               <div className="bg-white dark:bg-gray-800 px-4 py-3.5 rounded-2xl rounded-bl-sm shadow-sm border border-gray-100 dark:border-gray-700">
                  <div className="flex gap-1.5">
                     <span className="w-1.5 h-1.5 bg-eci-blue/60 rounded-full animate-bounce"></span>
                     <span className="w-1.5 h-1.5 bg-eci-blue/60 rounded-full animate-bounce" style={{ animationDelay: '0.15s' }}></span>
                     <span className="w-1.5 h-1.5 bg-eci-blue/60 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }}></span>
                  </div>
               </div>
             </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-3 bg-white dark:bg-card-dark border-t border-border-light dark:border-border-dark flex-shrink-0">
           <form onSubmit={(e) => { e.preventDefault(); handleSend(input); }} className="relative flex items-center">
              <input
                 type="text"
                 value={input}
                 onChange={(e) => setInput(e.target.value)}
                 disabled={isLoading}
                 placeholder="Ask about elections..."
                 aria-label="Chat input"
                 className="w-full pl-4 pr-12 py-3 bg-gray-100 dark:bg-gray-900 border border-transparent focus:border-eci-blue/30 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-eci-blue/20 dark:text-white transition-all placeholder:text-gray-400"
              />
              <button
                 type="submit"
                 disabled={!input.trim() || isLoading}
                 aria-label="Send message"
                 className="absolute right-1.5 p-2 bg-eci-blue text-white rounded-full disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-600 transition-colors shadow-sm"
              >
                 <Send className="w-4 h-4 ml-0.5" strokeWidth={2.5} />
              </button>
           </form>
        </div>
      </div>
    </>
  );
}
