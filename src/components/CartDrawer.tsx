import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, MessageSquare, ArrowRight, ShieldCheck, Tag, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const CartDrawer: React.FC = () => {
  const {
    cartItems,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    clearCart,
    subtotal,
    discount,
    shipping,
    total,
    freeShippingThreshold,
    freeShippingProgress,
    promoCode,
    promoApplied,
    promoError,
    applyPromo,
    removePromo,
    setIsReviewModalOpen
  } = useCart();

  const [promoInput, setPromoInput] = useState('');

  React.useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setIsCartOpen(false);
        }
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isCartOpen, setIsCartOpen]);

  if (!isCartOpen) return null;

  const totalItemsCount = cartItems.reduce((s, i) => s + i.quantity, 0);
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  const handleCheckoutClick = () => {
    setIsCartOpen(false);
    setIsReviewModalOpen(true);
  };

  const handlePromoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoInput.trim()) {
      const success = applyPromo(promoInput);
      if (success) {
        setPromoInput('');
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity duration-300"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-6 sm:pl-10">
        <div className="w-full max-w-md bg-[#FAF8F5] shadow-2xl flex flex-col border-l border-stone-200 animate-in slide-in-from-right duration-300">
          
          {/* Drawer Header */}
          <div className="p-6 border-b border-stone-200/80 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag size={20} className="text-stone-900" />
              <h2 className="font-serif text-xl font-semibold text-stone-900">Shopping Bag</h2>
              <span className="text-xs text-stone-500 font-medium tabular-nums">({totalItemsCount})</span>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 text-stone-400 hover:text-stone-900 hover:bg-stone-200/50 rounded-full transition-colors"
              aria-label="Close cart"
            >
              <X size={20} />
            </button>
          </div>

          {/* Free Shipping Progress Bar */}
          <div className="bg-[#F3EFEA] px-6 py-3 border-b border-stone-200/70 text-xs">
            {remainingForFreeShipping > 0 ? (
              <div className="space-y-1.5">
                <div className="text-stone-700 font-medium flex justify-between">
                  <span>Add <strong className="text-stone-900 font-semibold tabular-nums">${remainingForFreeShipping.toFixed(2)}</strong> more for Complimentary Delivery</span>
                  <span className="text-stone-500">{Math.round(freeShippingProgress)}%</span>
                </div>
                <div className="w-full h-1.5 bg-stone-300/60 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-stone-900 rounded-full transition-all duration-300"
                    style={{ width: `${freeShippingProgress}%` }}
                  />
                </div>
              </div>
            ) : (
              <div className="text-emerald-800 font-medium flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#25D366]"></span>
                <span>You unlocked Complimentary Boutique Delivery!</span>
              </div>
            )}
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cartItems.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-12">
                <div className="w-16 h-16 rounded-full bg-stone-200/70 flex items-center justify-center text-stone-400">
                  <ShoppingBag size={28} />
                </div>
                <div className="space-y-1">
                  <h3 className="font-serif text-xl font-medium text-stone-900">Your bag is empty</h3>
                  <p className="text-xs text-stone-500 max-w-xs">
                    Explore our curated collection of timeless blazers, knitwear, and silk pieces.
                  </p>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="px-6 py-2.5 bg-[#181615] text-[#FAF8F5] text-xs font-medium uppercase tracking-wider rounded-lg hover:bg-stone-800 transition-colors"
                >
                  Start Browsing
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div
                    key={item.key}
                    className="flex gap-4 p-3 bg-white rounded-xl border border-stone-200/80 shadow-2xs"
                  >
                    {/* Thumbnail */}
                    <div className="w-20 h-24 rounded-lg overflow-hidden bg-stone-100 shrink-0 border border-stone-200/60">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 flex flex-col justify-between py-0.5">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h4 className="font-serif text-sm font-semibold text-stone-900 leading-tight">
                            {item.product.name}
                          </h4>
                          <div className="text-[11px] text-stone-500 pt-0.5">
                            Size: <span className="font-medium text-stone-700">{item.selectedSize}</span> · Color: <span className="font-medium text-stone-700">{item.selectedColor}</span>
                          </div>
                        </div>

                        <button
                          onClick={() => removeFromCart(item.key)}
                          className="text-stone-400 hover:text-rose-600 transition-colors p-1"
                          aria-label="Remove item"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>

                      {/* Stepper & Price */}
                      <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center border border-stone-300 rounded-lg overflow-hidden bg-stone-50">
                          <button
                            onClick={() => updateQuantity(item.key, -1)}
                            className="p-1.5 text-stone-600 hover:text-stone-900 hover:bg-stone-200/60 transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="w-8 text-center text-xs font-semibold tabular-nums text-stone-900">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.key, 1)}
                            className="p-1.5 text-stone-600 hover:text-stone-900 hover:bg-stone-200/60 transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus size={12} />
                          </button>
                        </div>

                        <div className="text-right">
                          <div className="text-sm font-semibold text-stone-900 tabular-nums">
                            ${(item.product.price * item.quantity).toFixed(2)}
                          </div>
                          {item.quantity > 1 && (
                            <div className="text-[10px] text-stone-400 tabular-nums">
                              ${item.product.price.toFixed(2)} each
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Clear Cart Button */}
                <div className="flex justify-end pt-2">
                  <button
                    onClick={clearCart}
                    className="text-[11px] text-stone-500 hover:text-rose-600 underline transition-colors"
                  >
                    Clear shopping bag
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Drawer Footer with Calculations & WhatsApp Primary CTA */}
          {cartItems.length > 0 && (
            <div className="p-6 bg-white border-t border-stone-200 space-y-4">
              
              {/* Promo Code Input */}
              <div>
                {promoApplied ? (
                  <div className="flex items-center justify-between p-2.5 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-800">
                    <div className="flex items-center gap-1.5">
                      <Tag size={13} className="text-[#25D366]" />
                      <span>Code <strong>{promoCode}</strong> applied (-${discount.toFixed(2)})</span>
                    </div>
                    <button
                      onClick={removePromo}
                      className="text-emerald-700 hover:text-emerald-950 font-medium underline text-[11px]"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handlePromoSubmit} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Promo code (try WELCOME10)"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                      className="flex-1 px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-lg uppercase placeholder:normal-case focus:outline-none focus:ring-1 focus:ring-stone-900"
                    />
                    <button
                      type="submit"
                      className="px-3.5 py-2 bg-stone-200 hover:bg-stone-300 text-stone-900 text-xs font-medium rounded-lg transition-colors uppercase tracking-wider"
                    >
                      Apply
                    </button>
                  </form>
                )}
                {promoError && (
                  <div className="text-[11px] text-rose-600 mt-1">{promoError}</div>
                )}
              </div>

              {/* Subtotals */}
              <div className="space-y-1.5 text-xs text-stone-600 pt-2 border-t border-stone-100">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-medium text-stone-900 tabular-nums">${subtotal.toFixed(2)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-700">
                    <span>Privilege Discount ({promoCode})</span>
                    <span className="font-medium tabular-nums">-${discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Estimated Delivery</span>
                  <span className="font-medium tabular-nums">
                    {shipping === 0 ? (
                      <span className="text-emerald-700 font-semibold">FREE</span>
                    ) : (
                      `$${shipping.toFixed(2)}`
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-semibold text-stone-950 pt-2 border-t border-stone-200">
                  <span>Estimated Total</span>
                  <span className="font-serif text-lg tabular-nums">${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Primary WhatsApp Order CTA Button */}
              <div className="space-y-2 pt-1">
                <button
                  onClick={handleCheckoutClick}
                  className="w-full py-3.5 px-4 bg-[#25D366] hover:bg-[#1ebd5b] text-white font-medium text-xs sm:text-sm uppercase tracking-wider rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2.5 active:scale-[0.99] cursor-pointer"
                >
                  <MessageSquare size={18} className="fill-white" />
                  <span>Place Order on WhatsApp</span>
                  <span className="text-white/80">·</span>
                  <span className="tabular-nums font-semibold">${total.toFixed(2)}</span>
                </button>

                <button
                  onClick={() => setIsCartOpen(false)}
                  className="w-full py-2.5 text-center text-xs text-stone-600 hover:text-stone-900 font-medium transition-colors cursor-pointer"
                >
                  Continue Browsing
                </button>
              </div>

              {/* WhatsApp Trust Reassurance */}
              <div className="flex items-center justify-center gap-2 text-[10px] text-stone-500 pt-1 text-center">
                <ShieldCheck size={13} className="text-emerald-700" />
                <span>Zero online card details required · Personal concierge confirmation</span>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};
