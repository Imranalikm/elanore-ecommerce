import React, { useState } from 'react';
import { X, MessageSquare, Copy, Check, Send, AlertCircle, ShieldCheck, MapPin, User, Phone, Edit3 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { CustomerOrderInfo } from '../types';
import {
  buildWhatsAppLink,
  formatOrderMessage,
  generateOrderReference,
  getStoredWhatsAppNumber
} from '../utils/whatsapp';

export const WhatsAppOrderReviewModal: React.FC = () => {
  const {
    cartItems,
    isReviewModalOpen,
    setIsReviewModalOpen,
    subtotal,
    discount,
    promoCode,
    shipping,
    total,
    clearCart,
    showToast,
    whatsAppNumber
  } = useCart();

  const [orderRef, setOrderRef] = useState<string>(() => generateOrderReference());
  const [customer, setCustomer] = useState<CustomerOrderInfo>({
    name: '',
    phone: '',
    city: '',
    address: '',
    notes: '',
    paymentPreference: 'cash_on_delivery'
  });

  const [copied, setCopied] = useState(false);
  const [orderDispatched, setOrderDispatched] = useState(false);

  React.useEffect(() => {
    if (isReviewModalOpen) {
      setOrderRef(generateOrderReference());
      setOrderDispatched(false);
    }
  }, [isReviewModalOpen]);

  if (!isReviewModalOpen || cartItems.length === 0) return null;

  const orderMessage = formatOrderMessage({
    orderRef,
    items: cartItems,
    subtotal,
    discount,
    promoCode: discount > 0 ? promoCode : undefined,
    shipping,
    total,
    customer
  });

  const handleCopyMessage = async () => {
    try {
      await navigator.clipboard.writeText(orderMessage);
      setCopied(true);
      showToast('Order summary copied to clipboard');
      setTimeout(() => setCopied(false), 3000);
    } catch {
      showToast('Could not copy automatically');
    }
  };

  const handleOpenWhatsApp = () => {
    const url = buildWhatsAppLink(orderMessage, whatsAppNumber);
    window.open(url, '_blank');
    setOrderDispatched(true);
    showToast('Connecting with ÉLANORA Concierge on WhatsApp...');
  };

  const handleFinishAndClear = () => {
    clearCart();
    setIsReviewModalOpen(false);
    setOrderDispatched(false);
  };

  React.useEffect(() => {
    document.body.style.overflow = 'hidden';
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsReviewModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [setIsReviewModalOpen]);

  return (
    <div
      onClick={() => setIsReviewModalOpen(false)}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-xs"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-[#FAF8F5] rounded-3xl max-w-2xl w-full p-4 sm:p-8 shadow-2xl border border-stone-200 relative animate-in zoom-in-95 duration-200 max-h-[92vh] sm:max-h-[90vh] flex flex-col overscroll-contain"
      >
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-stone-200 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#25D366]/20 flex items-center justify-center text-[#25D366]">
              <MessageSquare size={20} className="fill-[#25D366]" />
            </div>
            <div>
              <h3 className="font-serif text-xl sm:text-2xl font-semibold text-stone-900">
                Confirm WhatsApp Order
              </h3>
              <p className="text-xs text-stone-500">
                Reference ID: <span className="font-mono font-medium text-stone-800">#{orderRef}</span>
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsReviewModalOpen(false)}
            className="p-1.5 text-stone-400 hover:text-stone-900 rounded-full hover:bg-stone-200/50 transition-colors"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto py-5 space-y-6 pr-1">
          
          {orderDispatched ? (
            /* Post-Launch State */
            <div className="p-6 bg-white rounded-2xl border border-emerald-200 text-center space-y-4">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto">
                <Check size={28} />
              </div>
              <div className="space-y-1">
                <h4 className="font-serif text-2xl font-medium text-stone-900">WhatsApp Window Opened!</h4>
                <p className="text-xs sm:text-sm text-stone-600 max-w-md mx-auto">
                  Simply hit <strong>Send</strong> in WhatsApp to connect with our concierge. We will confirm item reservations, delivery timing, and your chosen payment method.
                </p>
              </div>

              <div className="p-3 bg-stone-50 rounded-xl text-xs text-stone-600 flex items-center justify-center gap-2">
                <span>Did WhatsApp not launch?</span>
                <button
                  onClick={handleOpenWhatsApp}
                  className="text-emerald-700 font-semibold underline hover:text-emerald-900"
                >
                  Retry Launching WhatsApp
                </button>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={handleCopyMessage}
                  className="px-5 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-medium rounded-xl flex items-center justify-center gap-2 transition-colors"
                >
                  {copied ? <Check size={14} /> : <Copy size={14} />}
                  <span>{copied ? 'Copied' : 'Copy Message Text'}</span>
                </button>
                <button
                  onClick={handleFinishAndClear}
                  className="px-6 py-2.5 bg-[#181615] hover:bg-stone-800 text-white text-xs uppercase tracking-wider font-semibold rounded-xl transition-colors"
                >
                  Clear Bag & Return Home
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Optional Customer Information Fields */}
              <div className="bg-white p-5 rounded-2xl border border-stone-200/80 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-900 flex items-center gap-2">
                    <User size={14} className="text-stone-500" />
                    <span>Your Details (Optional — Included in Message)</span>
                  </h4>
                  <span className="text-[11px] text-stone-400">Pre-fills in your chat</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block text-stone-600 font-medium mb-1">Your Full Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Sophia Lauren"
                      value={customer.name}
                      onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
                      className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-stone-900"
                    />
                  </div>

                  <div>
                    <label className="block text-stone-600 font-medium mb-1">Delivery City / Area</label>
                    <input
                      type="text"
                      placeholder="e.g. Brooklyn, New York"
                      value={customer.city}
                      onChange={(e) => setCustomer({ ...customer, city: e.target.value })}
                      className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-stone-900"
                    />
                  </div>

                  <div>
                    <label className="block text-stone-600 font-medium mb-1">Phone / WhatsApp Number</label>
                    <input
                      type="tel"
                      placeholder="e.g. +1 555 019 2834"
                      value={customer.phone}
                      onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                      className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-stone-900"
                    />
                  </div>

                  <div>
                    <label className="block text-stone-600 font-medium mb-1">Preferred Settlement</label>
                    <select
                      value={customer.paymentPreference}
                      onChange={(e) => setCustomer({ ...customer, paymentPreference: e.target.value as any })}
                      className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-stone-900 text-stone-800"
                    >
                      <option value="cash_on_delivery">Cash on Delivery (COD)</option>
                      <option value="bank_transfer">Direct Bank Transfer / Wire</option>
                      <option value="direct_upi">Instant Payment Link / UPI</option>
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-stone-600 font-medium mb-1">Sizing or Special Notes</label>
                    <input
                      type="text"
                      placeholder="e.g. Please verify blazer shoulder measurements or gift box wrapping"
                      value={customer.notes}
                      onChange={(e) => setCustomer({ ...customer, notes: e.target.value })}
                      className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-stone-900"
                    />
                  </div>
                </div>
              </div>

              {/* Order Summary & WhatsApp Bubble Preview */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold uppercase tracking-wider text-stone-800">
                    Live WhatsApp Message Preview:
                  </span>
                  <button
                    onClick={handleCopyMessage}
                    className="text-stone-600 hover:text-stone-900 flex items-center gap-1 font-medium"
                  >
                    {copied ? <Check size={12} className="text-emerald-600" /> : <Copy size={12} />}
                    <span>{copied ? 'Copied' : 'Copy Text'}</span>
                  </button>
                </div>

                {/* Simulated WhatsApp Chat Bubble */}
                <div className="bg-[#EFEAE2] p-4 rounded-2xl border border-stone-300/80 shadow-inner">
                  <div className="max-w-lg bg-[#DCF8C6] text-stone-900 p-4 rounded-2xl rounded-tr-xs shadow-xs text-xs font-mono whitespace-pre-line leading-relaxed">
                    {orderMessage}
                  </div>
                  <div className="text-[10px] text-stone-500 pt-2 text-right">
                    Transmitting to ÉLANORA Concierge: <strong>+{whatsAppNumber}</strong>
                  </div>
                </div>
              </div>

              {/* Informational Disclaimer as Required by Prompt */}
              <div className="p-3.5 bg-amber-50 rounded-xl border border-amber-200/80 flex items-start gap-3 text-xs text-amber-900">
                <AlertCircle size={16} className="text-amber-700 shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  <strong>Important:</strong> Clicking below opens WhatsApp with this pre-filled message. Your order is officially confirmed only after our concierge verifies product stock with you in the chat and agrees on delivery terms. No payment is taken online.
                </p>
              </div>
            </>
          )}

        </div>

        {/* Modal Action Buttons Footer */}
        {!orderDispatched && (
          <div className="pt-4 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-2.5 sm:gap-3 shrink-0">
            <button
              onClick={() => setIsReviewModalOpen(false)}
              className="w-full sm:w-auto px-4 py-2 text-xs uppercase tracking-wider font-medium text-stone-600 hover:text-stone-900 transition-colors order-2 sm:order-1 text-center"
            >
              Back to Bag
            </button>

            <div className="w-full sm:w-auto flex items-center gap-2 order-1 sm:order-2">
              <button
                onClick={handleCopyMessage}
                className="px-3.5 sm:px-4 py-3 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-medium uppercase tracking-wider rounded-xl transition-colors flex items-center justify-center gap-1.5 shrink-0"
                title="Copy order message text"
              >
                {copied ? <Check size={14} /> : <Copy size={14} />}
                <span className="hidden xs:inline">{copied ? 'Copied' : 'Copy'}</span>
              </button>

              <button
                onClick={handleOpenWhatsApp}
                className="flex-1 sm:flex-none px-5 sm:px-7 py-3 bg-[#25D366] hover:bg-[#1ebd5b] text-white text-xs sm:text-sm font-semibold uppercase tracking-wider rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
              >
                <Send size={16} />
                <span>Open in WhatsApp</span>
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
