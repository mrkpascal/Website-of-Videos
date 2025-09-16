
import React, { useState, useRef, useEffect } from 'react';
import type { ChatMessage } from '../types';
import { getGeminiResponse } from '../services/geminiService';

const ChatPage: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      user: 'Gemini Bot',
      text: 'Welcome to the StreamVerse chat! Feel free to ask me anything.',
      timestamp: new Date().toLocaleTimeString(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() === '' || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      user: 'You',
      text: input,
      timestamp: new Date().toLocaleTimeString(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    const botResponseText = await getGeminiResponse(input);

    const botMessage: ChatMessage = {
      id: (Date.now() + 1).toString(),
      user: 'Gemini Bot',
      text: botResponseText,
      timestamp: new Date().toLocaleTimeString(),
    };

    setMessages((prev) => [...prev, botMessage]);
    setIsLoading(false);
  };

  return (
    <div className="container mx-auto p-4 flex flex-col h-[calc(100vh-80px)] max-h-[calc(100vh-80px)]">
        <h1 className="text-3xl font-bold mb-4 text-center">Community Chat</h1>
        <div className="flex-grow bg-surface rounded-lg shadow-inner overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => (
            <div key={msg.id} className={`flex items-end gap-3 ${msg.user === 'You' ? 'justify-end' : ''}`}>
                <div className={`flex flex-col ${msg.user === 'You' ? 'items-end' : 'items-start'}`}>
                <div className={`px-4 py-2 rounded-xl max-w-lg ${msg.user === 'You' ? 'bg-primary text-white' : 'bg-gray-700 text-text-secondary'}`}>
                    <p className="text-sm font-bold mb-1">{msg.user}</p>
                    <p>{msg.text}</p>
                </div>
                <span className="text-xs text-gray-500 mt-1">{msg.timestamp}</span>
                </div>
            </div>
            ))}
            {isLoading && (
                <div className="flex items-end gap-3">
                    <div className="flex flex-col items-start">
                        <div className="px-4 py-2 rounded-xl max-w-lg bg-gray-700 text-text-secondary">
                        <p className="text-sm font-bold mb-1">Gemini Bot</p>
                        <div className="flex items-center space-x-2">
                            <span className="h-2 w-2 bg-gray-300 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                            <span className="h-2 w-2 bg-gray-300 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                            <span className="h-2 w-2 bg-gray-300 rounded-full animate-bounce"></span>
                        </div>
                        </div>
                    </div>
                </div>
            )}
            <div ref={messagesEndRef} />
        </div>
        <form onSubmit={handleSendMessage} className="mt-4 flex gap-4">
            <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            className="flex-grow bg-gray-700 border border-gray-600 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary text-text-primary"
            disabled={isLoading}
            />
            <button type="submit" disabled={isLoading} className="bg-primary hover:bg-secondary text-white font-bold py-2 px-6 rounded-lg transition-colors disabled:opacity-50">
            Send
            </button>
        </form>
    </div>
  );
};

export default ChatPage;
