import React, { useState, useRef } from 'react';

interface ChatInputProps {
  onSend: (msg: string) => void;
  onVoiceInput: (msg: string) => void;
  loading: boolean;
  history: string[];
}

const ChatInput: React.FC<ChatInputProps> = ({ onSend, onVoiceInput, loading, history }) => {
  const [input, setInput] = useState('');
  const [historyIdx, setHistoryIdx] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<any>(null);

  // Input history navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowUp') {
      if (history.length === 0) return;
      setHistoryIdx(idx => {
        const newIdx = idx === null ? history.length - 1 : Math.max(0, idx - 1);
        setInput(history[newIdx]);
        return newIdx;
      });
      e.preventDefault();
    } else if (e.key === 'ArrowDown') {
      if (history.length === 0) return;
      setHistoryIdx(idx => {
        if (idx === null) return null;
        const newIdx = idx + 1;
        if (newIdx >= history.length) {
          setInput('');
          return null;
        }
        setInput(history[newIdx]);
        return newIdx;
      });
      e.preventDefault();
    } else if (e.key === 'Enter' && input.trim() && !loading) {
      onSend(input.trim());
      setInput('');
      setHistoryIdx(null);
    }
  };

  // Voice input (Web Speech API)
  const handleVoice = () => {
    if (!('webkitSpeechRecognition' in window)) {
      alert('Voice input not supported in this browser');
      return;
    }
    // @ts-ignore
    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
      onVoiceInput(transcript);
    };
    recognition.onerror = () => {
      alert('Voice input failed');
    };
    recognition.start();
    recognitionRef.current = recognition;
  };

  return (
    <div className="flex gap-2 p-4 bg-base-100 border-t dark:border-gray-700">
      <input
        ref={inputRef}
        className="flex-1 rounded-xl px-4 py-3 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 mr-2 shadow"
        type="text"
        placeholder="Type a message..."
        value={input}
        onChange={e => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={loading}
      />
      <button
        className="rounded-xl bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 font-semibold shadow transition flex items-center gap-2 disabled:opacity-50"
        onClick={() => {
          if (input.trim()) {
            onSend(input.trim());
            setInput('');
            setHistoryIdx(null);
          }
        }}
        type="button"
        disabled={loading}
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" /></svg>
        Send
      </button>
    </div>
  );
};

export default ChatInput;
