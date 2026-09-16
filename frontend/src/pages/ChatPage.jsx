import React from 'react';
import { useLocation, useOutletContext } from 'react-router-dom';
import { ChatWindow } from '../components/chatbot/ChatWindow';

export function ChatPage() {
  const location = useLocation();
  const { farmInfo } = useOutletContext();
  const initialQuery = location.state?.initialQuery || null;

  return (
    <div className="space-y-4 animate-in fade-in duration-300">
      <div>
        <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
          AGRINEX AI Assistant
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Ask questions in plain language regarding crop health, soil nutrients, irrigation timing, or agricultural practices.
        </p>
      </div>

      <ChatWindow initialQuery={initialQuery} farmInfo={farmInfo} />
    </div>
  );
}
