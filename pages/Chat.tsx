import React, { useState, useCallback } from 'react';
import MessageList, { ChatMessage } from '../components/MessageList';
import ChatInput from '../components/ChatInput';
import Header from '../components/Header';

const BOT_RESPONSES = [
  "Hello! How can I assist you today?",
  "That's interesting! Tell me more.",
  "I'm a bot, but I can chat all day!",
  "Let me know if you need anything else.",
  "Here's a random fact: The Eiffel Tower can be 15 cm taller during hot days.",
];

function getBotReply(userMsg: string): string {
  // Simulate simple bot logic
  if (/hello|hi/i.test(userMsg)) return "Hi there! 👋";
  if (/help|support/i.test(userMsg)) return "How can I help you?";
  if (/bye|goodbye/i.test(userMsg)) return "Goodbye! Have a great day!";
  return BOT_RESPONSES[Math.floor(Math.random() * BOT_RESPONSES.length)];
}

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState<string[]>([]);
  const [darkMode, setDarkMode] = useState(() =>
    window.matchMedia('(prefers-color-scheme: dark)').matches,
  );

  // Theme toggle
  React.useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Send message
  const handleSend = useCallback(
    async (msg: string) => {
      setMessages(prev => [...prev, { sender: 'user', text: msg }]);
      setHistory(prev => [...prev, msg]);
      setLoading(true);
      try {
        const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY;
        const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: 'google/gemma-3n-e2b-it:free', // Corrected Gemma 3n 2B model slug
            messages: [
              { role: 'user', content: msg }
            ]
          })
        });
        if (!response.ok) {
          let errorText = '';
          try {
            errorText = await response.text();
          } catch {}
          throw new Error(`API error: ${response.status} - ${errorText}`);
        }
        const data = await response.json();
        const botReply = data.choices?.[0]?.message?.content || 'No reply from API.';
        setMessages(prev => [
          ...prev,
          { sender: 'bot', text: botReply },
        ]);
      } catch (error: any) {
        setMessages(prev => [
          ...prev,
          { sender: 'bot', text: `Error: ${error.message}` },
        ]);
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  // Voice input handler (same as handleSend)
  const handleVoiceInput = (msg: string) => {
    handleSend(msg);
  };

  // Export chat as txt
  const handleExport = () => {
    const text = messages
      .map(m => `${m.sender === 'user' ? 'You' : 'Bot'}: ${m.text}`)
      .join('\n');
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'chat.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <video autoPlay muted loop className="absolute inset-0 w-full h-full object-cover z-0 brightness-75">
        <source src="https://videos.pexels.com/video-files/3163534/3163534-uhd_2560_1440_30fps.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-white/10 dark:bg-gray-900/10 z-10" />
      <div className="relative w-full max-w-full sm:max-w-2xl md:max-w-3xl h-auto min-h-[70vh] md:h-[90vh] bg-white/90 dark:bg-gray-900/90 shadow-2xl rounded-none sm:rounded-2xl flex flex-col border border-gray-300 dark:border-gray-700 z-20 backdrop-blur-lg p-0 sm:p-4">
        <Header
          onExport={handleExport}
          onToggleTheme={() => setDarkMode(dm => !dm)}
          darkMode={darkMode}
        />
        <div className="flex-1 overflow-y-auto px-4 py-2">
          <MessageList messages={messages} loading={loading} />
        </div>
        <div className="px-4 pb-4">
          <ChatInput
            onSend={handleSend}
            onVoiceInput={handleVoiceInput}
            loading={loading}
            history={history}
          />
        </div>
        <footer className="w-full bg-[#183144] text-white text-center text-sm py-3 rounded-b-2xl font-sans mt-auto">
          Copyright © 2025 | Developed and Maintenance by <a href="https://github.com/devshubham14">Shubham Pandey</a> | All Rights Reserved
        </footer>
      </div>
    </div>
  );
};

export default Chat;
