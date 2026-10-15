import React from 'react';
import { ArrowRight } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { ProductCard } from './ProductCard';

interface NewArrivalsSectionProps {
  onShopAll: () => void;
}

export const NewArrivalsSection: React.FC<NewArrivalsSectionProps> = ({ onShopAll }) => {
  // Grab the 4 spotlight new arrivals from the reference image
  const newArrivals = PRODUCTS.filter((p) => p.isNew).slice(0, 4);

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-[#FAF8F5] border-b border-[#EAE3D9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header Matching Reference Image */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 sm:mb-12">
          <div className="space-y-2">
            <h2 className="font-serif text-3xl sm:text-4xl text-[#181615] font-medium tracking-tight">
              New Arrivals
            </h2>
            <p className="text-sm sm:text-base text-stone-600 max-w-md">
              Fresh styles just in. Be the first to shop our latest drops.
            </p>
          </div>

          <button
            onClick={onShopAll}
            className="self-start sm:self-auto px-6 py-2.5 bg-[#181615] hover:bg-stone-800 text-[#FAF8F5] text-xs font-medium uppercase tracking-[0.15em] transition-colors cursor-pointer"
          >
            Shop All
          </button>
        </div>

        {/* 4-Column Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {newArrivals.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

      </div>
    </section>
  );
};
