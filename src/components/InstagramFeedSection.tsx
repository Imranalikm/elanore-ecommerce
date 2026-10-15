import React from 'react';
import { Instagram } from 'lucide-react';
import { fashionImages } from '../data/productImages';

export const InstagramFeedSection: React.FC = () => {
  const images = [
    fashionImages.insta1,
    fashionImages.insta2,
    fashionImages.insta3,
    fashionImages.insta4,
    fashionImages.insta5,
    fashionImages.insta6,
    fashionImages.insta7,
  ];

  return (
    <section className="py-12 sm:py-16 bg-[#FAF8F5] border-b border-[#EAE3D9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Title matching reference */}
        <div className="text-center mb-8">
          <a
            href="#instagram"
            onClick={(e) => e.preventDefault()}
            className="inline-flex items-center gap-2 font-serif text-xl sm:text-2xl text-[#181615] font-medium hover:opacity-80 transition-opacity"
          >
            <span>Follow Us</span>
            <span className="font-sans font-normal text-sm sm:text-base text-stone-600">@elanora.style</span>
          </a>
        </div>

        {/* Square Editorial Image Grid - 3 cols on mobile (6 items), 4 on tablet, 7 on desktop */}
        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-7 gap-2.5 sm:gap-4">
          {images.map((img, idx) => (
            <div
              key={idx}
              className={`group relative aspect-square rounded-xl overflow-hidden bg-stone-200 border border-stone-200/80 cursor-pointer shadow-2xs ${
                idx === 6 ? 'hidden sm:block' : ''
              }`}
            >
              <img
                src={img}
                alt={`Élanora Instagram post ${idx + 1}`}
                className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                <Instagram size={20} />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
