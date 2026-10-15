import React from 'react';
import { MessageSquare, ShieldCheck, Sparkles, Truck, HeartHandshake, CheckCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const WhatsAppOrderingBenefits: React.FC = () => {
  const { setIsSettingsOpen, whatsAppNumber } = useCart();

  const benefits = [
    {
      step: '01',
      title: 'Select & Bag Your Favorites',
      description: 'Explore the collection, select preferred colors and sizes, and build your bespoke shopping bag.',
      icon: Sparkles
    },
    {
      step: '02',
      title: 'One-Tap WhatsApp Transmission',
      description: 'Click "Place Order on WhatsApp" to create a cleanly formatted, itemized order inquiry with reference ID.',
      icon: MessageSquare
    },
    {
      step: '03',
      title: 'Personal Stylist Confirmation',
      description: 'Our boutique concierge verifies exact piece availability, answers sizing questions, and confirms delivery.',
      icon: HeartHandshake
    },
    {
      step: '04',
      title: 'Flexible Payment & Fast Dispatch',
      description: 'Settle safely via Cash on Delivery, instant UPI, or direct bank transfer. Real-time updates delivered to chat.',
      icon: ShieldCheck
    }
  ];

  return (
    <section className="py-14 sm:py-20 bg-[#F5EFE9] border-b border-[#EAE3D9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-medium tracking-wide">
            <span className="w-1.5 h-1.5 rounded-full bg-[#25D366]"></span>
            <span>Effortless Conversational Commerce</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#181615] font-medium tracking-tight">
            How WhatsApp Ordering Works
          </h2>
          <p className="text-sm sm:text-base text-stone-600 font-light">
            No endless checkout fields or payment gateway dropouts. We believe luxury shopping is personal, conversational, and transparent.
          </p>
        </div>

        {/* 4 Step Process Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-[#FAF8F5] p-6 sm:p-7 rounded-2xl border border-stone-200/80 shadow-xs flex flex-col justify-between space-y-4 hover:shadow-md transition-shadow"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-serif text-2xl text-stone-400 font-normal">{item.step}</span>
                    <div className="w-10 h-10 rounded-xl bg-stone-100 flex items-center justify-center text-stone-800">
                      <Icon size={18} />
                    </div>
                  </div>
                  <h4 className="font-serif text-lg font-medium text-stone-900">{item.title}</h4>
                  <p className="text-xs text-stone-600 leading-relaxed font-light">{item.description}</p>
                </div>

                <div className="pt-2 flex items-center gap-1.5 text-[11px] text-emerald-700 font-medium">
                  <CheckCircle size={13} className="text-[#25D366]" />
                  <span>Verified Human Service</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Reassurance Banner */}
        <div className="mt-10 p-5 rounded-2xl bg-[#181615] text-[#FAF8F5] flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#25D366]/20 flex items-center justify-center text-[#25D366]">
              <MessageSquare size={20} />
            </div>
            <div>
              <div className="text-sm font-medium">Have questions before browsing?</div>
              <div className="text-xs text-stone-400">Our concierge is active now to assist with bespoke inquiries or recommendations.</div>
            </div>
          </div>
          <button
            onClick={() => setIsSettingsOpen(true)}
            className="px-5 py-2.5 bg-[#25D366] hover:bg-[#1ebd5b] text-white text-xs uppercase tracking-wider font-semibold rounded-xl transition-colors shrink-0"
          >
            Chat with Concierge
          </button>
        </div>

      </div>
    </section>
  );
};
