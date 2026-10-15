
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { fashionImages } from '../data/productImages';

interface EditorialPromosProps {
  onShopDresses: () => void;
  onShopAccessories: () => void;
}

export const EditorialPromos: React.FC<EditorialPromosProps> = ({
  onShopDresses,
  onShopAccessories
}) => {
  return (
    <section className="py-12 sm:py-16 md:py-20 bg-[#FAF8F5] border-b border-[#EAE3D9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          
          {/* Promo 1: Summer Essentials (Matching Reference) */}
          <div
            onClick={onShopDresses}
            className="group relative rounded-2xl overflow-hidden bg-[#2D231D] text-[#FAF8F5] min-h-[340px] sm:min-h-[400px] flex items-center cursor-pointer border border-stone-800 shadow-sm hover:shadow-lg transition-all duration-300"
          >
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
              <img
                src={fashionImages.promoSummerEssentials}
                alt="Summer Essentials"
                className="w-full h-full object-cover object-right group-hover:scale-105 transition-transform duration-700 opacity-90"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-transparent"></div>
            </div>

            {/* Content Left */}
            <div className="relative z-10 p-6 sm:p-12 space-y-3 sm:space-y-4 max-w-sm">
              <span className="text-[10px] sm:text-[11px] font-medium tracking-[0.2em] uppercase text-stone-300">
                Seasonal Capsule
              </span>

              <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl text-white font-medium leading-tight">
                Summer<br />Essentials
              </h3>

              <p className="text-xs sm:text-sm text-stone-300 font-light leading-relaxed">
                Light. Effortless. Essential.
              </p>

              <div className="pt-2">
                <span className="inline-block text-xs uppercase tracking-widest font-semibold text-amber-200/90 pb-2">
                  Up to 30% Off
                </span>
                <div className="flex items-center gap-2 text-xs uppercase tracking-widest font-medium text-white group-hover:text-amber-200 transition-colors">
                  <span>Shop Now</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1.5 transition-transform" />
                </div>
              </div>
            </div>
          </div>

          {/* Promo 2: Accessory Edit (Matching Reference) */}
          <div
            onClick={onShopAccessories}
            className="group relative rounded-2xl overflow-hidden bg-[#EFE8DE] text-stone-900 min-h-[320px] sm:min-h-[400px] flex items-center cursor-pointer border border-[#DACDC0] shadow-sm hover:shadow-lg transition-all duration-300"
          >
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
              <img
                src={fashionImages.promoAccessoryEdit}
                alt="Accessory Edit"
                className="w-full h-full object-cover object-right group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#FAF8F5]/90 via-[#FAF8F5]/60 to-transparent"></div>
            </div>

            {/* Content Left */}
            <div className="relative z-10 p-6 sm:p-12 space-y-3 sm:space-y-4 max-w-sm">
              <span className="text-[10px] sm:text-[11px] font-medium tracking-[0.2em] uppercase text-stone-500">
                Curated Details
              </span>

              <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl text-[#181615] font-medium leading-tight">
                Accessory<br />Edit
              </h3>

              <p className="text-xs sm:text-sm text-stone-600 font-light leading-relaxed">
                The finishing touch you deserve. Handcrafted Italian leather & 18k gold vermeil.
              </p>

              <div className="pt-3 sm:pt-4 flex items-center gap-2 text-xs uppercase tracking-widest font-medium text-stone-900 group-hover:text-stone-700 transition-colors">
                <span>Shop Accessories</span>
                <ArrowRight size={14} className="group-hover:translate-x-1.5 transition-transform" />
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
