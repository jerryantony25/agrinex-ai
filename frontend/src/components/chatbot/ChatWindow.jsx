import React, { useState, useEffect, useRef } from 'react';
import { Send, Bot, Sparkles, Image as ImageIcon, Mic, RefreshCw, AlertCircle, PlusCircle, Sprout, CornerDownLeft } from 'lucide-react';
import { MessageItem } from './MessageItem';
import { TypingIndicator } from './TypingIndicator';
import { SuggestionPills } from './SuggestionPills';
import { chatService } from '../../services/chatService';
import { INITIAL_SUGGESTION_PILLS } from '../../data/demoData';
import { Button } from '../ui/Button';

export function ChatWindow({ initialQuery = null, farmInfo = null }) {
  const [messages, setMessages] = useState([
    {
      id: 'welcome-1',
      sender: 'ai',
      content: `Good morning! 👋\n\nI am **AGRINEX AI**, your intelligent farming co-pilot. I have loaded your current farm profile (${farmInfo?.primary_crop || 'Tomato'} in ${farmInfo?.location || 'Coimbatore, Tamil Nadu'}).\n\nHow can I help optimize your farm operations today?`,
      created_at: new Date().toISOString(),
      structured_data: {
        title: "Active Farm Monitoring Connected",
        summary: `Monitoring ${farmInfo?.name || 'Green Valley Agro Farm'} — Soil and weather intelligence pipelines active.`,
        category: "general",
        points: [
          `Primary Crop: ${farmInfo?.primary_crop || 'Tomato'} (Vegetative Stage)`,
          `Soil Type: ${farmInfo?.soil_type || 'Loamy Soil'}`,
          `Irrigation System: ${farmInfo?.irrigation_type || 'Drip'}`
        ],
        action_items: [
          "Ask for daily irrigation or fertigation recommendations",
          "Conduct a quick soil pH & NPK assessment",
          "Check micro-climate weather impact"
        ]
      }
    }
  ]);

  const [inputValue, setInputValue] = useState(initialQuery || '');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [conversationId, setConversationId] = useState(null);
  const [isListening, setIsListening] = useState(false);
  const [attachedImageName, setAttachedImageName] = useState(null);

  const fileInputRef = useRef(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  useEffect(() => {
    if (initialQuery && initialQuery.trim()) {
      handleSendMessage(initialQuery);
    }
  }, [initialQuery]);

  const handleSendMessage = async (textToSend) => {
    const query = (textToSend || inputValue).trim();
    if (!query || isLoading) return;

    setError(null);
    const userMsg = {
      id: String(Date.now()),
      sender: 'user',
      content: attachedImageName ? `[Attached: ${attachedImageName}]\n${query}` : query,
      created_at: new Date().toISOString()
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');
    const tempImageName = attachedImageName;
    setAttachedImageName(null);
    setIsLoading(true);

    try {
      const farmContext = farmInfo ? {
        name: farmInfo.name,
        location: farmInfo.location,
        primary_crop: farmInfo.primary_crop,
        soil_type: farmInfo.soil_type,
        irrigation_type: farmInfo.irrigation_type,
        size_hectares: farmInfo.size_hectares
      } : null;

      const response = await chatService.sendMessage(
        query,
        'default-farmer',
        conversationId,
        farmContext
      );

      if (response.conversation_id) {
        setConversationId(response.conversation_id);
      }

      const aiMsg = {
        id: String(Date.now() + 1),
        sender: 'ai',
        content: response.response,
        structured_data: response.structured_card,
        created_at: response.timestamp || new Date().toISOString()
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      console.error("Chat error:", err);
      setError("Unable to reach AGRINEX AI server. Please check connection.");
      // Add helpful fallback message
      const fallbackAiMsg = {
        id: String(Date.now() + 1),
        sender: 'ai',
        content: `I am currently operating in offline mode. For your **${farmInfo?.primary_crop || 'Tomato'}** field in **${farmInfo?.soil_type || 'Loamy Soil'}**, maintain standard root-zone moisture checks and avoid heavy watering if topsoil remains damp.`,
        created_at: new Date().toISOString()
      };
      setMessages((prev) => [...prev, fallbackAiMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStartNewChat = () => {
    setConversationId(null);
    setMessages([
      {
        id: String(Date.now()),
        sender: 'ai',
        content: `Started a fresh conversation thread. Ask me anything about crop health, soil, irrigation, weather, or agricultural prices!`,
        created_at: new Date().toISOString()
      }
    ]);
  };

  const handleVoiceToggle = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert("Voice input is not supported in this browser. Please use Google Chrome or Edge.");
      return;
    }

    try {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      if (!isListening) {
        setIsListening(true);
        recognition.start();

        recognition.onresult = (event) => {
          const transcript = event.results[0][0].transcript;
          setInputValue((prev) => (prev ? `${prev} ${transcript}` : transcript));
          setIsListening(false);
        };

        recognition.onerror = () => {
          setIsListening(false);
        };

        recognition.onend = () => {
          setIsListening(false);
        };
      } else {
        setIsListening(false);
      }
    } catch (err) {
      setIsListening(false);
    }
  };

  const handleImageSelect = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setAttachedImageName(file.name);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8.5rem)] bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
      
      {/* Chat Top Banner */}
      <div className="px-6 py-3.5 border-b border-slate-100 bg-slate-50/70 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl bg-emerald-800 text-white flex items-center justify-center shadow-xs">
            <Sprout className="h-5 w-5 text-emerald-300" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold text-slate-900">AGRINEX AI Co-Pilot</h2>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                Active Farm Grounding
              </span>
            </div>
            <p className="text-[11px] text-slate-500">
              Grounded on {farmInfo?.name || 'Your Farm'} • Verified Agronomy Rules
            </p>
          </div>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={handleStartNewChat}
          icon={PlusCircle}
          className="text-xs text-slate-700 bg-white"
        >
          New Chat
        </Button>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
        {messages.map((msg) => (
          <MessageItem key={msg.id} message={msg} onRetry={() => handleSendMessage(msg.content)} />
        ))}

        {isLoading && <TypingIndicator />}

        {error && (
          <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggestion Chips */}
      <div className="px-4 py-2 border-t border-slate-100 bg-slate-50/50">
        <SuggestionPills onSelectPill={(pillQuery) => handleSendMessage(pillQuery)} />
      </div>

      {/* Input Form */}
      <div className="p-4 border-t border-slate-200 bg-white">
        {attachedImageName && (
          <div className="mb-2 flex items-center justify-between bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-xl text-xs text-emerald-900">
            <div className="flex items-center gap-1.5">
              <ImageIcon className="h-3.5 w-3.5 text-emerald-700" />
              <span>Attached: <strong>{attachedImageName}</strong></span>
            </div>
            <button onClick={() => setAttachedImageName(null)} className="text-emerald-700 font-bold hover:text-emerald-900">
              ×
            </button>
          </div>
        )}

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center gap-2"
        >
          {/* Hidden File Input */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageSelect}
            accept="image/*"
            className="hidden"
          />

          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="p-2.5 rounded-xl text-slate-500 hover:text-emerald-700 hover:bg-slate-100 transition-colors"
            title="Attach Crop Image for Analysis"
          >
            <ImageIcon className="h-5 w-5" />
          </button>

          <button
            type="button"
            onClick={handleVoiceToggle}
            className={`p-2.5 rounded-xl transition-colors ${
              isListening ? 'bg-rose-100 text-rose-600 animate-pulse' : 'text-slate-500 hover:text-emerald-700 hover:bg-slate-100'
            }`}
            title="Voice input (Speech to text)"
          >
            <Mic className="h-5 w-5" />
          </button>

          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ask AGRINEX anything (e.g. 'Should I irrigate today?', 'Why are tomato leaves yellow?')..."
            className="flex-1 py-3 px-4 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:bg-white focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20 transition-all text-slate-900"
            disabled={isLoading}
          />

          <Button
            type="submit"
            variant="primary"
            size="md"
            disabled={!inputValue.trim() || isLoading}
            isLoading={isLoading}
            className="bg-emerald-800 hover:bg-emerald-900 rounded-xl px-4"
          >
            <Send className="h-4 w-4" />
          </Button>
        </form>
        <p className="text-[10px] text-slate-400 mt-2 text-center">
          AGRINEX AI provides decision support. Verify high-risk chemical treatments with local agricultural authorities.
        </p>
      </div>

    </div>
  );
}
