import React from 'react';

interface MessageProps {
  sender: 'user' | 'bot';
  text: string;
}

const Message: React.FC<MessageProps> = ({ sender, text }) => (
  <div className={`flex items-end gap-2 ${sender === 'user' ? 'justify-end' : 'justify-start'} w-full`}>
    {sender === 'bot' && (
      <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-700 text-white">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 12v.01M8 12v.01M16 12v.01" /></svg>
      </div>
    )}
    <div className={`px-4 py-3 rounded-3xl max-w-[70%] break-words text-base shadow-sm ${
      sender === 'user'
        ? 'bg-blue-600 text-white'
        : 'bg-gray-800 text-gray-100'
    }`}>
      {text}
    </div>
    {sender === 'user' && (
      <div className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-600 text-white">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A13.937 13.937 0 0 1 12 15c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /></svg>
      </div>
    )}
  </div>
);

export default Message;
