import React, { useState } from 'react';
import { MessageSquare, X, Send, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { buildWhatsAppLink, generateConciergeHelpMessage } from '../utils/whatsapp';

export const FloatingWhatsAppConcierge: React.FC = () => {
  const { whatsAppNumber, setIsSettingsOpen } = useCart();
  const [isOpen, setIsOpen] = useState(false);

  const quickTopics = [
    'Sizing & fit consultation',
    'Custom order inquiry',
    'Delivery to my location',
    'Fabric & styling advice'
  ];

  const handleLaunchTopic = (topic: string) => {
    const msg = generateConciergeHelpMessage(topic);
    const url = buildWhatsAppLink(msg, whatsAppNumber);
    window.open(url, '_blank');
    setIsOpen(false);
  };

  return (
    <aside aria-label="Customer Support Concierge" className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40">
      {/* Expanded Quick Inquiries Popover */}
      {isOpen && (
        <div className="mb-3 w-[calc(100vw-2rem)] max-w-xs sm:w-80 bg-[#FAF8F5] rounded-2xl shadow-2xl border border-stone-200/90 p-4 animate-in slide-in-from-bottom-4 duration-200 max-h-[75vh] overflow-y-auto no-scrollbar">
          <div className="flex items-center justify-between pb-3 border-b border-stone-200">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse"></div>
              <h4 className="font-serif text-sm font-semibold text-stone-900">ÉLANORA Stylist Concierge</h4>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 text-stone-400 hover:text-stone-900"
              aria-label="Close"
            >
              <X size={16} />
            </button>
          </div>

          <div className="py-3 text-xs text-stone-600 space-y-2">
            <p className="font-light">
              Hello! Need advice on sizing, delivery, or custom styling? Chat with us directly on WhatsApp.
            </p>

            <div className="space-y-1.5 pt-1">
              <span className="text-[10px] uppercase tracking-wider text-stone-400 font-medium">Quick Inquiries:</span>
              {quickTopics.map((topic, i) => (
                <button
                  key={i}
                  onClick={() => handleLaunchTopic(topic)}
                  className="w-full text-left p-2 rounded-lg bg-white hover:bg-emerald-50 hover:border-emerald-200 border border-stone-200/80 text-[11px] font-medium text-stone-800 transition-colors flex items-center justify-between group"
                >
                  <span>{topic}</span>
                  <Send size={11} className="text-stone-400 group-hover:text-emerald-700 transition-colors" />
                </button>
              ))}
            </div>
          </div>

          <div className="pt-2 border-t border-stone-200 flex items-center justify-between text-[10px] text-stone-500">
            <span>Replies usually in &lt; 5 mins</span>
            <button
              onClick={() => {
                setIsOpen(false);
                setIsSettingsOpen(true);
              }}
              className="underline hover:text-stone-900"
            >
              Edit number
            </button>
          </div>
        </div>
      )}

      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex items-center gap-2.5 px-4 py-3 bg-[#25D366] hover:bg-[#1ebd5b] text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 active:scale-95 cursor-pointer"
        aria-label="Chat with Stylist on WhatsApp"
      >
        <MessageSquare size={20} className="fill-white" />
        <span className="text-xs font-semibold tracking-wider uppercase hidden sm:inline">
          {isOpen ? 'Close' : 'Chat with Stylist'}
        </span>
        <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5 pointer-events-none">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-400 border-2 border-white"></span>
        </span>
      </button>
    </aside>
  );
};
