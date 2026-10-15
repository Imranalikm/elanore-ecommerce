import React from 'react';
import { CATEGORIES } from '../data/products';

interface CategoryCirclesProps {
  onSelectCategory: (category: string) => void;
  activeCategory?: string;
}

export const CategoryCircles: React.FC<CategoryCirclesProps> = ({
  onSelectCategory,
  activeCategory
}) => {
  return (
    <section className="py-10 sm:py-14 bg-[#FAF8F5] border-b border-[#EAE3D9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Category Row with horizontal scroll on small devices */}
        <div className="flex items-center justify-between gap-4 sm:gap-6 md:gap-8 overflow-x-auto pb-4 pt-2 no-scrollbar scroll-smooth">
          {CATEGORIES.map((cat) => {
            const isSelected = activeCategory === cat.name;
            return (
              <button
                key={cat.name}
                onClick={() => onSelectCategory(cat.name)}
                className="group flex flex-col items-center gap-3 shrink-0 focus:outline-none transition-transform active:scale-95 cursor-pointer"
              >
                {/* Circular Portrait Card */}
                <div
                  className={`w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full overflow-hidden p-1 transition-all duration-300 ${
                    isSelected
                      ? 'ring-2 ring-stone-900 ring-offset-2 ring-offset-[#FAF8F5] shadow-md scale-105'
                      : 'border border-stone-300/80 group-hover:border-stone-500 group-hover:shadow-md'
                  }`}
                >
                  <div className="w-full h-full rounded-full overflow-hidden bg-[#ECE6DD]">
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>

                {/* Category Label */}
                <span
                  className={`text-xs sm:text-sm font-medium tracking-wide transition-colors ${
                    isSelected ? 'text-stone-950 font-semibold underline underline-offset-4' : 'text-stone-700 group-hover:text-stone-950'
                  }`}
                >
                  {cat.name}
                </span>
              </button>
            );
          })}
        </div>

      </div>
    </section>
  );
};
