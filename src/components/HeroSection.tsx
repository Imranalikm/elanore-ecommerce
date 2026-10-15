import React from 'react';
import { ArrowRight, MessageSquare, ShieldCheck, Sparkles, CheckCircle2, Truck, RefreshCw } from 'lucide-react';
import { fashionImages } from '../data/productImages';

interface HeroSectionProps {
  onShopNow: () => void;
  onExploreCollections: () => void;
  onWhatsAppInquiry: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onShopNow,
  onExploreCollections,
  onWhatsAppInquiry
}) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#FAF8F5] via-[#F4EFE9] to-[#FAF8F5] py-6 sm:py-12 md:py-16 border-b border-[#EAE3D9]">
      {/* Architectural Arch Motif matching reference image on desktop */}
      <div className="absolute top-1/2 right-[18%] -translate-y-1/2 w-[720px] h-[720px] rounded-full border border-stone-300/60 bg-white/40 pointer-events-none hidden lg:block z-0"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center">
          
          {/* Left Column: Headlines & Call to Actions */}
          <div className="lg:col-span-6 space-y-4 sm:space-y-6 lg:space-y-8 z-10">
            
            {/* Editorial Kicker Badge */}
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-200/70 border border-stone-300/60 text-[10px] sm:text-xs font-medium tracking-[0.16em] uppercase text-stone-700">
                <Sparkles size={11} className="text-amber-600" />
                <span>Atelier Édition 2026 · New Season</span>
              </span>
            </div>

            {/* Main Editorial Headline */}
            <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl xl:text-[68px] leading-[1.08] text-[#181615] tracking-tight font-medium text-balance">
              Timeless Style.<br />
              <span className="italic font-normal text-stone-800">Modern Elegance.</span>
            </h1>

            {/* Subtitle */}
            <p className="text-xs sm:text-base md:text-lg text-stone-600 max-w-lg leading-relaxed font-normal">
              Elevated everyday silhouettes crafted with premium textiles. Effortless luxury designed for your capsule wardrobe.
            </p>

            {/* Action Buttons: Side-by-Side on mobile for thumb friendliness */}
            <div className="grid grid-cols-2 gap-2.5 sm:flex sm:items-center sm:gap-4 pt-1 sm:pt-2">
              <button
                onClick={onShopNow}
                className="px-4 sm:px-7 py-3 sm:py-3.5 bg-[#181615] text-[#FAF8F5] text-xs sm:text-sm font-medium uppercase tracking-[0.14em] hover:bg-stone-800 transition-all duration-200 rounded-xl shadow-sm hover:shadow active:scale-[0.98] cursor-pointer text-center flex items-center justify-center gap-1.5"
              >
                <span>Shop New In</span>
                <ArrowRight size={14} className="hidden xs:inline sm:inline" />
              </button>

              <button
                onClick={onWhatsAppInquiry}
                className="px-3 sm:px-6 py-3 sm:py-3.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-950 border border-emerald-200/80 text-xs sm:text-sm font-medium uppercase tracking-[0.12em] rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-[0.98]"
                title="Inquire directly on WhatsApp"
              >
                <MessageSquare size={14} className="text-[#25D366] fill-[#25D366] shrink-0" />
                <span className="truncate">WhatsApp Chat</span>
              </button>
            </div>

            {/* WhatsApp Direct Ordering Notice Banner */}
            <div className="pt-2 sm:pt-4 border-t border-stone-300/60 max-w-lg">
              <div className="bg-white/90 backdrop-blur-xs p-3 sm:p-3.5 rounded-2xl border border-stone-300/80 shadow-2xs flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-8 h-8 rounded-full bg-[#25D366]/15 flex items-center justify-center shrink-0">
                    <MessageSquare size={15} className="text-[#128C7E]" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-stone-900 truncate">
                      <span>Direct WhatsApp Ordering</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-[#25D366] animate-pulse"></span>
                    </div>
                    <p className="text-[11px] text-stone-500 truncate">
                      No online payment gateway · Personal stylist confirmation
                    </p>
                  </div>
                </div>
                <button
                  onClick={onWhatsAppInquiry}
                  className="text-[11px] font-semibold text-emerald-800 hover:text-emerald-950 underline shrink-0 cursor-pointer hidden xs:inline"
                >
                  Inquire
                </button>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Editorial Artwork with Architectural Circle Arch */}
          <div className="lg:col-span-6 relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[500px] aspect-[4/5] max-h-[420px] sm:max-h-none rounded-3xl overflow-hidden shadow-2xl border border-stone-300/70 bg-[#E8DDD0]">
              <img
                src={fashionImages.heroBlazerModel}
                alt="ÉLANORA Modern Tailored Collection"
                className="w-full h-full object-cover object-center"
                referrerPolicy="no-referrer"
              />

              {/* Gradient Vignette at bottom for tag legibility */}
              <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/50 via-black/20 to-transparent pointer-events-none"></div>

              {/* Float Tag: Oversized Blazer - Mobile Responsive positioning */}
              <div className="absolute bottom-3 left-3 right-3 sm:bottom-6 sm:left-6 sm:right-auto sm:max-w-xs bg-white/95 backdrop-blur-md px-3 sm:px-4 py-2.5 sm:py-3 rounded-2xl shadow-xl border border-white/60 flex items-center justify-between gap-2.5 z-10">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#25D366] animate-pulse shrink-0"></div>
                  <div className="min-w-0">
                    <div className="text-[9px] sm:text-[10px] uppercase tracking-wider text-stone-500 font-semibold truncate">Spotlight Piece</div>
                    <div className="text-xs sm:text-sm font-serif font-semibold text-stone-900 truncate">The Oversized Blazer · $89</div>
                  </div>
                </div>
                <button
                  onClick={onWhatsAppInquiry}
                  className="px-2.5 py-1.5 bg-[#25D366] hover:bg-[#1ebd5b] text-white text-[11px] font-semibold rounded-lg transition-colors flex items-center gap-1 shrink-0 cursor-pointer active:scale-95 shadow-xs"
                  title="Inquire on WhatsApp"
                >
                  <MessageSquare size={12} className="fill-white" />
                  <span>Inquire</span>
                </button>
              </div>

              {/* Floating Architectural Subtle Badge */}
              <div className="absolute top-3 right-3 sm:top-5 sm:right-5 bg-[#181615]/85 text-[#FAF8F5] backdrop-blur-md px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full text-[9px] sm:text-[10px] tracking-widest uppercase font-medium shadow-sm">
                Atelier Édition 2026
              </div>

              {/* Top-Left Seasonal Capsule Tag */}
              <div className="absolute top-3 left-3 sm:top-5 sm:left-5 bg-white/85 text-stone-800 backdrop-blur-md px-2.5 py-1 rounded-full text-[9px] sm:text-[10px] tracking-wider uppercase font-medium shadow-xs">
                SS / Capsule
              </div>
            </div>
          </div>

        </div>

        {/* Mobile Luxury Assurance 3-Pillar Bar */}
        <div className="mt-6 sm:mt-10 pt-4 sm:pt-6 border-t border-stone-200/80 grid grid-cols-3 gap-2 text-center">
          <div className="space-y-0.5">
            <div className="text-[10px] uppercase tracking-wider text-stone-400 font-semibold flex items-center justify-center gap-1">
              <Truck size={12} className="text-stone-600 hidden xs:inline" />
              <span>Delivery</span>
            </div>
            <div className="text-xs font-serif font-medium text-stone-900">Complimentary &gt; $99</div>
          </div>
          <div className="space-y-0.5 border-x border-stone-200/80">
            <div className="text-[10px] uppercase tracking-wider text-emerald-700 font-semibold flex items-center justify-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#25D366]"></span>
              <span>Checkout</span>
            </div>
            <div className="text-xs font-serif font-medium text-stone-900">Direct WhatsApp</div>
          </div>
          <div className="space-y-0.5">
            <div className="text-[10px] uppercase tracking-wider text-stone-400 font-semibold flex items-center justify-center gap-1">
              <Sparkles size={12} className="text-amber-600 hidden xs:inline" />
              <span>Service</span>
            </div>
            <div className="text-xs font-serif font-medium text-stone-900">Personal Stylist</div>
          </div>
        </div>

      </div>
    </section>
  );
};

