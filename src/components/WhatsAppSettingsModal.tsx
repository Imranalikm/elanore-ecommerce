import React, { useState } from 'react';
import { X, MessageSquare, Phone, Check, RefreshCw, ShieldCheck } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { DEFAULT_WHATSAPP_NUMBER } from '../utils/whatsapp';

export const WhatsAppSettingsModal: React.FC = () => {
  const { isSettingsOpen, setIsSettingsOpen, whatsAppNumber, updateWhatsAppNumber } = useCart();
  const [inputNumber, setInputNumber] = useState(whatsAppNumber);

  React.useEffect(() => {
    if (isSettingsOpen) {
      setInputNumber(whatsAppNumber);
    }
  }, [isSettingsOpen, whatsAppNumber]);

  if (!isSettingsOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateWhatsAppNumber(inputNumber);
    setIsSettingsOpen(false);
  };

  const handleReset = () => {
    setInputNumber(DEFAULT_WHATSAPP_NUMBER);
    updateWhatsAppNumber(DEFAULT_WHATSAPP_NUMBER);
  };

  React.useEffect(() => {
    document.body.style.overflow = 'hidden';
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsSettingsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [setIsSettingsOpen]);

  return (
    <div
      onClick={() => setIsSettingsOpen(false)}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-[#FAF8F5] rounded-3xl max-w-md w-full p-6 sm:p-7 shadow-2xl border border-stone-200 relative animate-in zoom-in-95 duration-150 max-h-[90vh] overflow-y-auto overscroll-contain"
      >
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-stone-200">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#25D366]/20 flex items-center justify-center text-[#25D366]">
              <MessageSquare size={17} className="fill-[#25D366]" />
            </div>
            <h3 className="font-serif text-lg font-semibold text-stone-900">
              WhatsApp Concierge Settings
            </h3>
          </div>
          <button
            onClick={() => setIsSettingsOpen(false)}
            className="p-1.5 text-stone-400 hover:text-stone-900 rounded-full"
          >
            <X size={18} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSave} className="py-5 space-y-4">
          <p className="text-xs text-stone-600 leading-relaxed font-light">
            Specify the destination WhatsApp number for all order click-to-chat links. You can enter your own phone number with country code to test receiving live formatted orders!
          </p>

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold uppercase tracking-wider text-stone-800">
              Business WhatsApp Number (with Country Code)
            </label>
            <div className="relative">
              <Phone size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
              <input
                type="text"
                required
                placeholder="e.g. 15553526672 or 447911123456"
                value={inputNumber}
                onChange={(e) => setInputNumber(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 bg-white text-sm font-mono border border-stone-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-stone-900"
              />
            </div>
            <p className="text-[11px] text-stone-500">
              Digits only. Example: US (1...), UK (44...), India (91...), etc.
            </p>
          </div>

          <div className="p-3 bg-stone-100 rounded-xl text-xs space-y-1 text-stone-600">
            <div className="font-semibold text-stone-800 flex items-center gap-1.5">
              <ShieldCheck size={13} className="text-emerald-700" />
              <span>Current Configured Recipient</span>
            </div>
            <div className="font-mono text-stone-900 text-xs">+{whatsAppNumber}</div>
          </div>

          <div className="pt-2 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={handleReset}
              className="text-xs text-stone-500 hover:text-stone-900 flex items-center gap-1 underline"
            >
              <RefreshCw size={12} />
              <span>Reset Default</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsSettingsOpen(false)}
                className="px-4 py-2 text-xs text-stone-600 hover:text-stone-900"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 bg-[#181615] hover:bg-stone-800 text-white rounded-xl text-xs uppercase tracking-wider font-semibold transition-colors"
              >
                Save Phone Number
              </button>
            </div>
          </div>
        </form>

      </div>
    </div>
  );
};
