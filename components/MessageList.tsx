import React, { useRef, useEffect } from 'react';
import Message from './Message';

export interface ChatMessage {
  sender: 'user' | 'bot';
  text: string;
}

interface MessageListProps {
  messages: ChatMessage[];
  loading: boolean;
}

const MessageList: React.FC<MessageListProps> = ({ messages, loading }) => {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  return (
    <div className="flex-1 overflow-y-auto scroll-smooth px-4 py-6 space-y-2 bg-transparent">
      {messages.map((msg, i) => (
        <Message key={i} sender={msg.sender} text={msg.text} />
      ))}
      {loading && (
        <div className="flex items-end gap-2 mb-2">
          <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-700 text-white">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 12v.01M8 12v.01M16 12v.01" /></svg>
          </div>
          <div className="px-4 py-2 rounded-2xl bg-gray-700 text-gray-200 animate-pulse max-w-[70%]">
            ...
          </div>
        </div>
      )}
      <div ref={bottomRef} />
    </div>
  );
};

export default MessageList;
