import React from 'react';
import { ArrowRight, MessageSquare, ShieldCheck, Sparkles, CheckCircle2 } from 'lucide-react';
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
    <section className="relative overflow-hidden bg-gradient-to-b from-[#FAF8F5] via-[#F4EFE9] to-[#FAF8F5] py-8 sm:py-12 md:py-16 border-b border-[#EAE3D9]">
      {/* Architectural Arch Motif matching reference image */}
      <div className="absolute top-1/2 right-[18%] -translate-y-1/2 w-[720px] h-[720px] rounded-full border border-stone-300/60 bg-white/40 pointer-events-none hidden lg:block z-0"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Headlines & Call to Actions */}
          <div className="lg:col-span-6 space-y-6 lg:space-y-8 z-10">
            
            {/* Editorial Kicker */}
            <div className="flex items-center gap-2 text-xs font-medium tracking-[0.2em] uppercase text-stone-500">
              <span className="w-8 h-[1px] bg-stone-400"></span>
              <span>New Season Collection 2026</span>
            </div>

            {/* Main Editorial Headline (Matching Reference Image) */}
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl xl:text-[68px] leading-[1.08] text-[#181615] tracking-tight font-medium text-balance">
              Timeless Style.<br />
              <span className="italic font-normal">Modern Elegance.</span>
            </h1>

            {/* Subtitle (Matching Reference Image) */}
            <p className="text-base sm:text-lg text-stone-600 max-w-lg leading-relaxed font-normal">
              Elevated everyday pieces, designed to make you feel confident. Crafted with premium textiles and effortless silhouettes.
            </p>

            {/* Action Buttons (Matching Reference Image) */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onShopNow}
                className="px-7 py-3.5 bg-[#181615] text-[#FAF8F5] text-xs sm:text-sm font-medium uppercase tracking-[0.15em] hover:bg-stone-800 transition-all duration-200 shadow-sm hover:shadow active:scale-[0.98] cursor-pointer"
              >
                Shop New Arrivals
              </button>

              <button
                onClick={onExploreCollections}
                className="group flex items-center gap-2 px-4 py-3.5 text-xs sm:text-sm font-medium uppercase tracking-[0.15em] text-stone-800 hover:text-stone-950 transition-colors cursor-pointer"
              >
                <span>Explore Collections</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* WhatsApp Direct Ordering Notice Banner */}
            <div className="pt-4 border-t border-stone-300/60 max-w-lg">
              <div className="bg-[#FAF8F5]/80 p-3.5 rounded-xl border border-stone-300/80 flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-[#25D366]/15 flex items-center justify-center shrink-0 mt-0.5">
                  <MessageSquare size={16} className="text-[#128C7E]" />
                </div>
                <div className="text-xs space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-stone-900">Direct WhatsApp Ordering</span>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded font-medium">No Online Gateway</span>
                  </div>
                  <p className="text-stone-600 leading-normal">
                    Curate your bag here, then send to WhatsApp. Our personal concierge verifies availability, custom sizing, and organizes your delivery.
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Editorial Artwork with Architectural Circle Arch */}
          <div className="lg:col-span-6 relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[500px] aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border border-stone-300/60 bg-[#E8DDD0]">
              <img
                src={fashionImages.heroBlazerModel}
                alt="ÉLANORA Modern Tailored Collection"
                className="w-full h-full object-cover object-center"
                referrerPolicy="no-referrer"
              />

              {/* Float Tag: Oversized Blazer */}
              <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-md px-4 py-3 rounded-2xl shadow-lg border border-stone-200/80 flex items-center gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-[#25D366] animate-pulse"></div>
                <div>
                  <div className="text-[11px] uppercase tracking-wider text-stone-500 font-medium">Spotlight Piece</div>
                  <div className="text-sm font-serif font-semibold text-stone-900">The Oversized Blazer · $89.00</div>
                </div>
                <button
                  onClick={onWhatsAppInquiry}
                  className="ml-2 px-2.5 py-1 bg-[#25D366] hover:bg-[#1ebd5b] text-white text-[11px] font-medium rounded-lg transition-colors flex items-center gap-1"
                  title="Inquire on WhatsApp"
                >
                  <MessageSquare size={12} />
                  <span>Inquire</span>
                </button>
              </div>

              {/* Floating Architectural Subtle Badge */}
              <div className="absolute top-6 right-6 bg-[#181615]/80 text-[#FAF8F5] backdrop-blur-md px-3 py-1.5 rounded-full text-[10px] tracking-widest uppercase font-medium">
                Atelier Édition 2026
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
