import React, { useState } from 'react';
import { X, Heart, MessageSquare, ShoppingBag, Truck, RotateCcw, ShieldCheck, Ruler, Check, ChevronRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Product } from '../types';
import { PRODUCTS } from '../data/products';
import { buildWhatsAppLink, generateSingleProductInquiryMessage } from '../utils/whatsapp';

export const ProductDetailModal: React.FC = () => {
  const {
    activePdpProduct,
    setActivePdpProduct,
    addToCart,
    isInWishlist,
    toggleWishlist,
    setIsCartOpen,
    whatsAppNumber
  } = useCart();

  if (!activePdpProduct) return null;

  const product = activePdpProduct;
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || 'Standard');
  const [selectedColor, setSelectedColor] = useState<string>(product.colors[0]?.name || 'Natural');
  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [showSizeGuide, setShowSizeGuide] = useState(false);

  React.useEffect(() => {
    if (activePdpProduct) {
      setSelectedSize(activePdpProduct.sizes[0] || 'Standard');
      setSelectedColor(activePdpProduct.colors[0]?.name || 'Natural');
      setQuantity(1);
      setActiveImageIndex(0);
    }
  }, [activePdpProduct?.id]);

  const images = product.gallery && product.gallery.length > 0 ? product.gallery : [product.image];
  const wishlisted = isInWishlist(product.id);

  // Related products from same or adjacent categories
  const related = PRODUCTS.filter((p) => p.id !== product.id && (p.category === product.category || p.isBestseller)).slice(0, 3);

  const handleAddToCart = () => {
    addToCart(product, selectedSize, selectedColor, quantity);
    setIsCartOpen(true);
  };

  const handleDirectWhatsAppOrder = () => {
    const msg = generateSingleProductInquiryMessage(product, selectedSize, selectedColor, quantity);
    const url = buildWhatsAppLink(msg, whatsAppNumber);
    window.open(url, '_blank');
  };

  React.useEffect(() => {
    document.body.style.overflow = 'hidden';
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActivePdpProduct(null);
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
      onClick={() => setActivePdpProduct(null)}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-xs"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-[#FAF8F5] rounded-3xl max-w-4xl w-full p-6 sm:p-8 shadow-2xl border border-stone-200 relative animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto overscroll-contain"
      >
        
        {/* Close Button */}
        <button
          onClick={() => setActivePdpProduct(null)}
          className="absolute top-5 right-5 p-2 rounded-full bg-white/80 hover:bg-stone-200/80 text-stone-600 hover:text-stone-900 transition-colors z-20"
          aria-label="Close details"
        >
          <X size={20} />
        </button>

        {/* Product Grid: Left Gallery / Right Purchase Module */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Left: Gallery (5 cols) */}
          <div className="md:col-span-6 space-y-4">
            {/* Primary Main Image Stage */}
            <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden bg-[#F4EFEA] border border-stone-200/80 shadow-xs">
              <img
                src={images[activeImageIndex] || product.image}
                alt={product.name}
                className="w-full h-full object-cover object-center"
                referrerPolicy="no-referrer"
              />

              {/* Wishlist Button */}
              <button
                onClick={() => toggleWishlist(product.id)}
                className="absolute top-4 right-4 p-2.5 rounded-full bg-white/90 backdrop-blur-md shadow-md text-stone-700 hover:text-stone-900 transition-transform active:scale-90"
              >
                <Heart size={18} className={wishlisted ? 'fill-rose-500 text-rose-500' : ''} />
              </button>

              {product.isNew && (
                <div className="absolute top-4 left-4 bg-stone-900 text-white text-[10px] tracking-widest uppercase font-semibold px-2.5 py-1 rounded">
                  New Arrival
                </div>
              )}
            </div>

            {/* Thumbnails Row */}
            {images.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-1 no-scrollbar">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`w-16 h-20 rounded-lg overflow-hidden border-2 transition-all shrink-0 bg-stone-100 ${
                      activeImageIndex === idx ? 'border-stone-900 scale-102 shadow-xs' : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="Thumbnail" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Purchase & Details Module (7 cols) */}
          <div className="md:col-span-6 space-y-6">
            
            {/* Title & Category */}
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs text-stone-500 uppercase tracking-widest">
                <span>{product.category}</span>
                <span className="font-mono text-stone-400">SKU: #{product.id.slice(0, 6).toUpperCase()}</span>
              </div>
              <h1 className="font-serif text-2xl sm:text-3xl font-medium text-stone-900">
                {product.name}
              </h1>
            </div>

            {/* Price & Stock */}
            <div className="flex items-center justify-between pb-4 border-b border-stone-200">
              <div className="flex items-center gap-3">
                <span className="font-serif text-2xl font-semibold text-stone-950 tabular-nums">
                  ${product.price.toFixed(2)}
                </span>
                {product.originalPrice && product.originalPrice > product.price && (
                  <span className="text-base text-stone-400 line-through tabular-nums">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2 text-xs">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="text-stone-700 font-medium">
                  {product.inStock ? `In Stock (${product.stockCount} left)` : 'Made to Order'}
                </span>
              </div>
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-light">
              {product.description}
            </p>

            {/* Color Swatch Selector */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-medium">
                <span className="text-stone-700 uppercase tracking-wider">Shade: <strong className="text-stone-900">{selectedColor}</strong></span>
              </div>
              <div className="flex items-center gap-3">
                {product.colors.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => setSelectedColor(c.name)}
                    className={`group flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs transition-all ${
                      selectedColor === c.name
                        ? 'border-stone-900 bg-white font-medium shadow-2xs'
                        : 'border-stone-200/80 bg-stone-50/70 text-stone-600 hover:border-stone-400'
                    }`}
                  >
                    <span
                      className="w-3.5 h-3.5 rounded-full border border-stone-300 shrink-0"
                      style={{ backgroundColor: c.hex }}
                    />
                    <span>{c.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selector with Size Guide Button */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-medium">
                <span className="text-stone-700 uppercase tracking-wider">Select Size</span>
                <button
                  onClick={() => setShowSizeGuide(true)}
                  className="flex items-center gap-1 text-stone-500 hover:text-stone-900 underline text-[11px]"
                >
                  <Ruler size={12} />
                  <span>Size & Fit Guide</span>
                </button>
              </div>

              <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
                {product.sizes.map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setSelectedSize(sz)}
                    className={`py-2 text-xs font-medium rounded-lg border transition-all ${
                      selectedSize === sz
                        ? 'border-stone-900 bg-stone-900 text-white shadow-xs'
                        : 'border-stone-200 bg-white text-stone-800 hover:border-stone-400'
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Stepper & Dual CTAs */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3">
                <div className="flex items-center border border-stone-300 rounded-xl bg-white px-2 py-1">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="p-1.5 text-stone-500 hover:text-stone-900"
                  >
                    -
                  </button>
                  <span className="w-10 text-center font-medium text-xs tabular-nums text-stone-900">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => Math.min(product.stockCount, q + 1))}
                    className="p-1.5 text-stone-500 hover:text-stone-900"
                  >
                    +
                  </button>
                </div>

                {/* Primary WhatsApp Order Button */}
                <button
                  onClick={handleDirectWhatsAppOrder}
                  className="flex-1 py-3.5 px-4 bg-[#25D366] hover:bg-[#1ebd5b] text-white text-xs sm:text-sm font-semibold uppercase tracking-wider rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                  title="Inquire directly on WhatsApp"
                >
                  <MessageSquare size={16} className="fill-white" />
                  <span>Order Now via WhatsApp</span>
                </button>
              </div>

              {/* Secondary Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                className="w-full py-3.5 px-4 bg-[#181615] hover:bg-stone-800 text-white text-xs sm:text-sm font-medium uppercase tracking-wider rounded-xl shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
              >
                <ShoppingBag size={16} />
                <span>Add to Shopping Bag</span>
              </button>
            </div>

            {/* Stylist Concierge Prompt */}
            <div className="p-3 bg-emerald-50/70 rounded-xl border border-emerald-200/60 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 text-emerald-900">
                <MessageSquare size={14} className="text-[#25D366]" />
                <span>Uncertain on sizing? Chat with our stylist on WhatsApp.</span>
              </div>
              <button
                onClick={handleDirectWhatsAppOrder}
                className="text-emerald-800 font-semibold underline text-[11px] shrink-0"
              >
                Chat Now
              </button>
            </div>

            {/* Specifications Accordion / Highlights */}
            <div className="pt-2 border-t border-stone-200 text-xs space-y-2.5 text-stone-600">
              <div className="font-semibold uppercase tracking-wider text-stone-800">Garment Attributes:</div>
              <ul className="list-disc pl-4 space-y-1 text-stone-600">
                {product.details.map((d, i) => (
                  <li key={i}>{d}</li>
                ))}
              </ul>
              <div className="pt-1 text-[11px]">
                <strong>Fabric:</strong> {product.fabric}
              </div>
              <div className="text-[11px]">
                <strong>Care Instructions:</strong> {product.care}
              </div>
            </div>

            {/* Reassurance Icons */}
            <div className="grid grid-cols-2 gap-3 pt-3 text-[11px] text-stone-600">
              <div className="flex items-center gap-2">
                <Truck size={14} className="text-stone-700" />
                <span>Complimentary Delivery over $99</span>
              </div>
              <div className="flex items-center gap-2">
                <RotateCcw size={14} className="text-stone-700" />
                <span>30-Day Easy Returns</span>
              </div>
            </div>

          </div>
        </div>

        {/* Related Products Strip */}
        {related.length > 0 && (
          <div className="mt-12 pt-8 border-t border-stone-200">
            <h3 className="font-serif text-xl font-medium text-stone-900 mb-6">
              Complete the Look
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {related.map((item) => (
                <div
                  key={item.id}
                  onClick={() => {
                    setActivePdpProduct(item);
                    setActiveImageIndex(0);
                  }}
                  className="flex items-center gap-3 p-3 bg-white rounded-xl border border-stone-200 hover:border-stone-400 cursor-pointer transition-all"
                >
                  <img src={item.image} alt={item.name} className="w-14 h-16 object-cover rounded-lg bg-stone-100" />
                  <div className="text-xs">
                    <h5 className="font-serif font-medium text-stone-900 line-clamp-1">{item.name}</h5>
                    <div className="text-stone-600 font-semibold tabular-nums">${item.price.toFixed(2)}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Size Guide Drawer Modal */}
        {showSizeGuide && (
          <div className="fixed inset-0 z-60 bg-black/50 flex items-center justify-center p-4">
            <div className="bg-[#FAF8F5] p-6 rounded-2xl max-w-md w-full border border-stone-200 shadow-2xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-stone-200">
                <h4 className="font-serif text-lg font-semibold text-stone-900">ÉLANORA Sizing Matrix</h4>
                <button onClick={() => setShowSizeGuide(false)} className="p-1 text-stone-500 hover:text-stone-900">
                  <X size={18} />
                </button>
              </div>

              <div className="text-xs text-stone-600 space-y-3">
                <p>All garments are tailored to European luxury standards with generous draping.</p>
                <table className="w-full text-left border-collapse border border-stone-300">
                  <thead className="bg-stone-200/80 font-semibold">
                    <tr>
                      <th className="p-2 border border-stone-300">Size</th>
                      <th className="p-2 border border-stone-300">Bust (in)</th>
                      <th className="p-2 border border-stone-300">Waist (in)</th>
                      <th className="p-2 border border-stone-300">Hips (in)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr><td className="p-2 border border-stone-300 font-semibold">XS</td><td className="p-2 border border-stone-300">32 - 33</td><td className="p-2 border border-stone-300">24 - 25</td><td className="p-2 border border-stone-300">34 - 35</td></tr>
                    <tr><td className="p-2 border border-stone-300 font-semibold">S</td><td className="p-2 border border-stone-300">34 - 35</td><td className="p-2 border border-stone-300">26 - 27</td><td className="p-2 border border-stone-300">36 - 37</td></tr>
                    <tr><td className="p-2 border border-stone-300 font-semibold">M</td><td className="p-2 border border-stone-300">36 - 37</td><td className="p-2 border border-stone-300">28 - 29</td><td className="p-2 border border-stone-300">38 - 39</td></tr>
                    <tr><td className="p-2 border border-stone-300 font-semibold">L</td><td className="p-2 border border-stone-300">38 - 40</td><td className="p-2 border border-stone-300">30 - 32</td><td className="p-2 border border-stone-300">40 - 42</td></tr>
                  </tbody>
                </table>
              </div>

              <button
                onClick={() => setShowSizeGuide(false)}
                className="w-full py-2.5 bg-stone-900 text-white rounded-lg text-xs uppercase tracking-wider font-medium"
              >
                Close Guide
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
