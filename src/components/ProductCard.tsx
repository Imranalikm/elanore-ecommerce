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
          className="absolute top-3 right-3 p-2 rounded-full bg-white/80 backdrop-blur-md text-stone-700 hover:text-stone-950 transition-colors shadow-sm z-10"
          aria-label="Save to wishlist"
        >
          <Heart
            size={16}
            className={wishlisted ? 'fill-rose-500 text-rose-500' : 'text-stone-700'}
          />
        </button>

        {/* Sale / New Tag (Minimal text label, no pill sandwich) */}
        {product.originalPrice && product.originalPrice > product.price ? (
          <div className="absolute top-3 left-3 bg-[#181615] text-[#FAF8F5] text-[10px] tracking-wider uppercase px-2 py-0.5 rounded font-medium">
            Sale
          </div>
        ) : product.isNew ? (
          <div className="absolute top-3 left-3 bg-stone-200/90 text-stone-900 text-[10px] tracking-wider uppercase px-2 py-0.5 rounded font-medium">
            New In
          </div>
        ) : null}

        {/* Hover Quick Actions Bar */}
        <div className="absolute inset-x-3 bottom-3 flex items-center gap-2 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 z-10">
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (onOpenQuickView) onOpenQuickView(product);
              else setQuickViewProduct(product);
            }}
            className="flex-1 py-2 px-2 bg-white/95 hover:bg-white text-stone-900 text-[11px] font-medium uppercase tracking-wider rounded-lg shadow-md flex items-center justify-center gap-1.5 transition-colors"
            title="Quick view product details"
          >
            <Eye size={13} />
            <span className="hidden sm:inline">Quick View</span>
          </button>

          <button
            onClick={handleQuickAdd}
            className="p-2 bg-[#181615] hover:bg-stone-800 text-white rounded-lg shadow-md transition-colors"
            title="Add to bag"
          >
            <ShoppingBag size={14} />
          </button>

          <button
            onClick={handleWhatsAppSingleOrder}
            className="p-2 bg-[#25D366] hover:bg-[#1ebd5b] text-white rounded-lg shadow-md transition-colors"
            title="Order directly on WhatsApp"
          >
            <MessageSquare size={14} className="fill-white" />
          </button>
        </div>
      </div>

      {/* Metadata & Typography */}
      <div className="pt-3 pb-1 flex flex-col space-y-1">
        {/* Category & Stock hint */}
        <div className="flex items-center justify-between text-[11px] text-stone-500">
          <span className="tracking-wider uppercase">{product.category}</span>
          {product.stockCount <= 5 && (
            <span className="text-amber-800 font-medium">Only {product.stockCount} left</span>
          )}
        </div>

        {/* Product Name */}
        <h3 className="font-serif text-base sm:text-lg font-medium text-stone-900 group-hover:text-stone-700 transition-colors line-clamp-1">
          {product.name}
        </h3>

        {/* Price Display */}
        <div className="flex items-center gap-2 pt-0.5">
          <span className="font-medium text-sm sm:text-base text-stone-950 tabular-nums">
            ${product.price.toFixed(2)}
          </span>
          {product.originalPrice && product.originalPrice > product.price && (
            <span className="text-xs text-stone-400 line-through tabular-nums">
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
