import React, { useState } from 'react';
import { X, Heart, MessageSquare, ShoppingBag, Eye } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Product } from '../types';
import { buildWhatsAppLink, generateSingleProductInquiryMessage } from '../utils/whatsapp';

export const ProductQuickViewModal: React.FC = () => {
  const {
    quickViewProduct,
    setQuickViewProduct,
    addToCart,
    isInWishlist,
    toggleWishlist,
    setIsCartOpen,
    setActivePdpProduct,
    whatsAppNumber
  } = useCart();

  if (!quickViewProduct) return null;

  const product = quickViewProduct;
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || 'Standard');
  const [selectedColor, setSelectedColor] = useState<string>(product.colors[0]?.name || 'Natural');
  const [quantity, setQuantity] = useState(1);
  const wishlisted = isInWishlist(product.id);

  React.useEffect(() => {
    if (quickViewProduct) {
      setSelectedSize(quickViewProduct.sizes[0] || 'Standard');
      setSelectedColor(quickViewProduct.colors[0]?.name || 'Natural');
      setQuantity(1);
    }
  }, [quickViewProduct?.id]);

  const handleAddToCart = () => {
    addToCart(product, selectedSize, selectedColor, quantity);
    setQuickViewProduct(null);
    setIsCartOpen(true);
  };

  const handleDirectWhatsAppOrder = () => {
    const msg = generateSingleProductInquiryMessage(product, selectedSize, selectedColor, quantity);
    const url = buildWhatsAppLink(msg, whatsAppNumber);
    window.open(url, '_blank');
  };

  const handleFullDetails = () => {
    setQuickViewProduct(null);
    setActivePdpProduct(product);
  };

  React.useEffect(() => {
    document.body.style.overflow = 'hidden';
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setQuickViewProduct(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div
      onClick={() => setQuickViewProduct(null)}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-[#FAF8F5] rounded-3xl max-w-2xl w-full p-6 sm:p-7 shadow-2xl border border-stone-200 relative animate-in zoom-in-95 duration-150 max-h-[90vh] overflow-y-auto overscroll-contain"
      >
        
        {/* Close */}
        <button
          onClick={() => setQuickViewProduct(null)}
          className="absolute top-4 right-4 p-2 rounded-full bg-white text-stone-500 hover:text-stone-900 border border-stone-200 shadow-xs z-10"
        >
          <X size={18} />
        </button>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
          {/* Image */}
          <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden bg-stone-100 border border-stone-200">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            <button
              onClick={() => toggleWishlist(product.id)}
              className="absolute top-3 right-3 p-2 rounded-full bg-white/90 shadow-sm text-stone-700"
            >
              <Heart size={16} className={wishlisted ? 'fill-rose-500 text-rose-500' : ''} />
            </button>
          </div>

          {/* Info */}
          <div className="space-y-4">
            <div>
              <div className="text-[11px] uppercase tracking-wider text-stone-500">{product.category}</div>
              <h3 className="font-serif text-2xl font-semibold text-stone-900">{product.name}</h3>
              <div className="flex items-center gap-2 mt-1">
                <span className="font-serif text-xl font-bold text-stone-950 tabular-nums">${product.price.toFixed(2)}</span>
                {product.originalPrice && (
                  <span className="text-xs text-stone-400 line-through tabular-nums">${product.originalPrice.toFixed(2)}</span>
                )}
              </div>
            </div>

            <p className="text-xs text-stone-600 line-clamp-3 leading-relaxed">
              {product.description}
            </p>

            {/* Color */}
            <div className="space-y-1 text-xs">
              <span className="text-stone-700 font-medium">Shade: <strong>{selectedColor}</strong></span>
              <div className="flex items-center gap-2">
                {product.colors.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => setSelectedColor(c.name)}
                    className={`w-6 h-6 rounded-full border-2 transition-transform ${
                      selectedColor === c.name ? 'border-stone-900 scale-110' : 'border-transparent'
                    }`}
                    style={{ backgroundColor: c.hex }}
                    title={c.name}
                  />
                ))}
              </div>
            </div>

            {/* Size */}
            <div className="space-y-1 text-xs">
              <span className="text-stone-700 font-medium">Size:</span>
              <div className="flex flex-wrap gap-1.5">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSelectedSize(s)}
                    className={`px-3 py-1 rounded-md text-xs font-medium border transition-colors ${
                      selectedSize === s ? 'bg-stone-900 text-white border-stone-900' : 'bg-white text-stone-800 border-stone-200'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-2 pt-2">
              <button
                onClick={handleDirectWhatsAppOrder}
                className="w-full py-2.5 px-3 bg-[#25D366] hover:bg-[#1ebd5b] text-white text-xs uppercase tracking-wider font-semibold rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <MessageSquare size={15} className="fill-white" />
                <span>Inquire on WhatsApp</span>
              </button>

              <button
                onClick={handleAddToCart}
                className="w-full py-2.5 px-3 bg-stone-900 hover:bg-stone-800 text-white text-xs uppercase tracking-wider font-medium rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <ShoppingBag size={15} />
                <span>Add to Shopping Bag</span>
              </button>

              <button
                onClick={handleFullDetails}
                className="w-full text-center text-[11px] text-stone-500 hover:text-stone-900 underline pt-1"
              >
                View Full Details & Sizing Guide →
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
