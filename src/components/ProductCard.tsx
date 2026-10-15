import React from 'react';
import { Heart, MessageSquare, Eye, ShoppingBag } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { buildWhatsAppLink, generateSingleProductInquiryMessage } from '../utils/whatsapp';

interface ProductCardProps {
  product: Product;
  onOpenQuickView?: (product: Product) => void;
  onSelectProduct?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onOpenQuickView,
  onSelectProduct,
}) => {
  const { addToCart, isInWishlist, toggleWishlist, setQuickViewProduct, setActivePdpProduct, whatsAppNumber } = useCart();
  const wishlisted = isInWishlist(product.id);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    const defaultSize = product.sizes[0] || 'Standard';
    const defaultColor = product.colors[0]?.name || 'Natural';
    addToCart(product, defaultSize, defaultColor, 1);
  };

  const handleWhatsAppSingleOrder = (e: React.MouseEvent) => {
    e.stopPropagation();
    const defaultSize = product.sizes[0] || 'Standard';
    const defaultColor = product.colors[0]?.name || 'Natural';
    const msg = generateSingleProductInquiryMessage(product, defaultSize, defaultColor, 1);
    const url = buildWhatsAppLink(msg, whatsAppNumber);
    window.open(url, '_blank');
  };

  const handleCardClick = () => {
    if (onSelectProduct) {
      onSelectProduct(product);
    } else {
      setActivePdpProduct(product);
    }
  };

  return (
    <div
      onClick={handleCardClick}
      className="group relative flex flex-col bg-transparent cursor-pointer transition-all duration-300"
    >
      {/* Product Image Stage */}
      <div className="relative aspect-[3/4] w-full overflow-hidden rounded-xl bg-[#F4EFEA] border border-stone-200/70 group-hover:border-stone-400/80 transition-colors">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
          referrerPolicy="no-referrer"
        />

        {/* Wishlist Heart Icon (Top Right) */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 p-1.5 sm:p-2 rounded-full bg-white/85 backdrop-blur-md text-stone-700 hover:text-stone-950 transition-colors shadow-xs z-10"
          aria-label="Save to wishlist"
        >
          <Heart
            size={15}
            className={wishlisted ? 'fill-rose-500 text-rose-500' : 'text-stone-700'}
          />
        </button>

        {/* Sale / New Tag (Minimal text label) */}
        {product.originalPrice && product.originalPrice > product.price ? (
          <div className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 bg-[#181615] text-[#FAF8F5] text-[9px] sm:text-[10px] tracking-wider uppercase px-2 py-0.5 rounded font-medium shadow-xs">
            Sale
          </div>
        ) : product.isNew ? (
          <div className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 bg-stone-200/90 text-stone-900 text-[9px] sm:text-[10px] tracking-wider uppercase px-2 py-0.5 rounded font-medium shadow-xs">
            New In
          </div>
        ) : null}

        {/* Quick Actions Bar - Accessible on touch/mobile and desktop hover */}
        <div className="absolute inset-x-2 bottom-2 sm:inset-x-3 sm:bottom-3 flex items-center gap-1.5 sm:gap-2 opacity-95 sm:opacity-0 translate-y-0 sm:translate-y-2 sm:group-hover:opacity-100 sm:group-hover:translate-y-0 transition-all duration-200 z-10">
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (onOpenQuickView) onOpenQuickView(product);
              else setQuickViewProduct(product);
            }}
            className="flex-1 py-1.5 sm:py-2 px-1.5 sm:px-2 bg-white/95 hover:bg-white text-stone-900 text-[10px] sm:text-[11px] font-medium uppercase tracking-wider rounded-lg shadow-sm flex items-center justify-center gap-1 transition-colors"
            title="Quick view product details"
          >
            <Eye size={12} />
            <span className="hidden xs:inline sm:inline">View</span>
          </button>

          <button
            onClick={handleQuickAdd}
            className="p-1.5 sm:p-2 bg-[#181615] hover:bg-stone-800 text-white rounded-lg shadow-sm transition-colors shrink-0"
            title="Add to bag"
            aria-label="Add to bag"
          >
            <ShoppingBag size={13} />
          </button>

          <button
            onClick={handleWhatsAppSingleOrder}
            className="p-1.5 sm:p-2 bg-[#25D366] hover:bg-[#1ebd5b] text-white rounded-lg shadow-sm transition-colors shrink-0"
            title="Order directly on WhatsApp"
            aria-label="Order directly on WhatsApp"
          >
            <MessageSquare size={13} className="fill-white" />
          </button>
        </div>
      </div>

      {/* Metadata & Typography */}
      <div className="pt-2.5 pb-1 flex flex-col space-y-0.5 sm:space-y-1">
        {/* Category & Stock hint */}
        <div className="flex items-center justify-between text-[10px] sm:text-[11px] text-stone-500">
          <span className="tracking-wider uppercase">{product.category}</span>
          {product.stockCount <= 5 && (
            <span className="text-amber-800 font-medium">Only {product.stockCount} left</span>
          )}
        </div>

        {/* Product Name */}
        <h3 className="font-serif text-sm sm:text-base md:text-lg font-medium text-stone-900 group-hover:text-stone-700 transition-colors line-clamp-1">
          {product.name}
        </h3>

        {/* Price Display */}
        <div className="flex items-center gap-2 pt-0.5">
          <span className="font-medium text-xs sm:text-sm md:text-base text-stone-950 tabular-nums">
            ${product.price.toFixed(2)}
          </span>
          {product.originalPrice && product.originalPrice > product.price && (
            <span className="text-[11px] sm:text-xs text-stone-400 line-through tabular-nums">
              ${product.originalPrice.toFixed(2)}
            </span>
          )}
        </div>

        {/* Colors dots */}
        {product.colors && product.colors.length > 1 && (
          <div className="flex items-center gap-1.5 pt-1">
            {product.colors.map((c, i) => (
              <span
                key={i}
                className="w-2.5 h-2.5 rounded-full border border-stone-300"
                style={{ backgroundColor: c.hex }}
                title={c.name}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
