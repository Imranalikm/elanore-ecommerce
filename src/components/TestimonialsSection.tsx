import React, { useState } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { TESTIMONIALS } from '../data/products';
import { fashionImages } from '../data/productImages';

export const TestimonialsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const authorAvatars = [
    fashionImages.avatarSophia,
    fashionImages.avatarJessica,
    fashionImages.avatarAva
  ];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1));
  };

  // 3 visible testimonials on desktop, rotating based on currentIndex
  const visibleDesktop = [0, 1, 2].map((offset) => {
    const idx = (currentIndex + offset) % TESTIMONIALS.length;
    return { ...TESTIMONIALS[idx], originalIdx: idx };
  });

  return (
    <section className="py-14 sm:py-20 bg-[#FAF8F5] border-b border-[#EAE3D9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Header matching reference */}
        <div className="text-center mb-10 sm:mb-14">
          <h2 className="font-serif text-3xl sm:text-4xl text-[#181615] font-medium tracking-tight">
            What Our Customers Say
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 mt-2">
            Real feedback from patrons ordering through our bespoke WhatsApp concierge
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative flex items-center">
          
          {/* Left Arrow Button */}
          <button
            onClick={handlePrev}
            className="absolute -left-3 sm:-left-5 top-1/2 -translate-y-1/2 z-10 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white border border-stone-300 text-stone-700 hover:text-stone-950 hover:border-stone-400 shadow-sm flex items-center justify-center transition-all cursor-pointer hover:scale-105 active:scale-95"
            aria-label="Previous review"
          >
            <ChevronLeft size={18} />
          </button>

          {/* Desktop 3-Card Grid */}
          <div className="hidden md:grid md:grid-cols-3 gap-6 sm:gap-8 px-6 sm:px-8 w-full transition-all duration-300">
            {visibleDesktop.map((t) => (
              <div
                key={t.id}
                className="flex flex-col justify-between space-y-4 p-6 sm:p-7 rounded-2xl bg-white/80 border border-stone-200/80 shadow-xs hover:shadow-md transition-all duration-300"
              >
                <div className="space-y-3">
                  {/* 5 Stars */}
                  <div className="flex items-center gap-1 text-[#181615]">
                    {[...Array(t.rating || 5)].map((_, i) => (
                      <Star key={i} size={14} className="fill-[#181615] text-[#181615]" />
                    ))}
                  </div>

                  {/* Quote */}
                  <p className="text-sm text-stone-700 leading-relaxed font-light italic">
                    "{t.quote}"
                  </p>
                </div>

                {/* Author Avatar & Name */}
                <div className="flex items-center gap-3 pt-2 border-t border-stone-100">
                  <div className="w-8 h-8 rounded-full overflow-hidden bg-stone-200 border border-stone-300 shrink-0">
                    <img
                      src={authorAvatars[t.originalIdx % authorAvatars.length]}
                      alt={t.author}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-stone-900">— {t.author}</div>
                    <div className="text-[10px] text-stone-500">{t.city} · Verified Patron</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile Single Card View */}
          <div className="md:hidden w-full px-6">
            {(() => {
              const current = TESTIMONIALS[currentIndex];
              return (
                <div
                  key={current.id}
                  className="flex flex-col justify-between space-y-4 p-6 rounded-2xl bg-white/90 border border-stone-200 shadow-xs animate-in fade-in duration-200"
                >
                  <div className="space-y-3">
                    <div className="flex items-center gap-1 text-[#181615]">
                      {[...Array(current.rating || 5)].map((_, i) => (
                        <Star key={i} size={14} className="fill-[#181615] text-[#181615]" />
                      ))}
                    </div>
                    <p className="text-sm text-stone-700 leading-relaxed font-light italic">
                      "{current.quote}"
                    </p>
                  </div>
                  <div className="flex items-center gap-3 pt-2 border-t border-stone-100">
                    <div className="w-8 h-8 rounded-full overflow-hidden bg-stone-200 border border-stone-300 shrink-0">
                      <img
                        src={authorAvatars[currentIndex % authorAvatars.length]}
                        alt={current.author}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-stone-900">— {current.author}</div>
                      <div className="text-[10px] text-stone-500">{current.city} · Verified Patron</div>
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>

          {/* Right Arrow Button */}
          <button
            onClick={handleNext}
            className="absolute -right-3 sm:-right-5 top-1/2 -translate-y-1/2 z-10 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white border border-stone-300 text-stone-700 hover:text-stone-950 hover:border-stone-400 shadow-sm flex items-center justify-center transition-all cursor-pointer hover:scale-105 active:scale-95"
            aria-label="Next review"
          >
            <ChevronRight size={18} />
          </button>
        </div>

        {/* Carousel Dots Indicators */}
        <div className="flex items-center justify-center gap-2 mt-8">
          {TESTIMONIALS.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-2 rounded-full transition-all duration-300 ${
                currentIndex === idx ? 'w-6 bg-stone-900' : 'w-2 bg-stone-300 hover:bg-stone-500'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
};
