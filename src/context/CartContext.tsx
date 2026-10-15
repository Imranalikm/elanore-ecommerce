import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, Product } from '../types';
import { getStoredWhatsAppNumber, setStoredWhatsAppNumber } from '../utils/whatsapp';

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product, size: string, color: string, quantity?: number) => void;
  updateQuantity: (key: string, delta: number) => void;
  removeFromCart: (key: string) => void;
  clearCart: () => void;
  subtotal: number;
  discount: number;
  promoCode: string;
  promoApplied: boolean;
  promoError: string | null;
  applyPromo: (code: string) => boolean;
  removePromo: () => void;
  shipping: number;
  total: number;
  freeShippingThreshold: number;
  freeShippingProgress: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isReviewModalOpen: boolean;
  setIsReviewModalOpen: (open: boolean) => void;
  quickViewProduct: Product | null;
  setQuickViewProduct: (product: Product | null) => void;
  activePdpProduct: Product | null;
  setActivePdpProduct: (product: Product | null) => void;
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  toastMessage: string | null;
  showToast: (msg: string) => void;
  whatsAppNumber: string;
  updateWhatsAppNumber: (num: string) => void;
  isSettingsOpen: boolean;
  setIsSettingsOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'elanora_cart_items_v1';
const WISHLIST_STORAGE_KEY = 'elanora_wishlist_v1';

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(WISHLIST_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [activePdpProduct, setActivePdpProduct] = useState<Product | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [whatsAppNumber, setWhatsAppNumberState] = useState<string>(getStoredWhatsAppNumber());

  // Promo code state
  const [promoCode, setPromoCode] = useState<string>('');
  const [promoApplied, setPromoApplied] = useState<boolean>(false);
  const [promoError, setPromoError] = useState<string | null>(null);

  // Sync cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    } catch (e) {
      console.error('Error saving cart', e);
    }
  }, [cartItems]);

  // Sync wishlist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist));
    } catch (e) {
      console.error('Error saving wishlist', e);
    }
  }, [wishlist]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 3500);
  };

  const updateWhatsAppNumber = (num: string) => {
    setStoredWhatsAppNumber(num);
    setWhatsAppNumberState(getStoredWhatsAppNumber());
    showToast('WhatsApp concierge number updated');
  };

  const addToCart = (product: Product, size: string, color: string, quantity = 1) => {
    const key = `${product.id}__${size}__${color}`;
    setCartItems(prev => {
      const existingIndex = prev.findIndex(item => item.key === key);
      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + quantity
        };
        return next;
      }
      return [...prev, { key, product, selectedSize: size, selectedColor: color, quantity }];
    });
    showToast(`Added ${product.name} (${size}) to your bag`);
  };

  const updateQuantity = (key: string, delta: number) => {
    setCartItems(prev => {
      return prev
        .map(item => {
          if (item.key === key) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null);
    });
  };

  const removeFromCart = (key: string) => {
    setCartItems(prev => prev.filter(item => item.key !== key));
    showToast('Item removed from your bag');
  };

  const clearCart = () => {
    setCartItems([]);
    showToast('Shopping bag cleared');
  };

  const toggleWishlist = (productId: string) => {
    setWishlist(prev => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast('Removed from wishlist');
        return prev.filter(id => id !== productId);
      } else {
        showToast('Saved to your wishlist');
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  const applyPromo = (code: string): boolean => {
    const clean = code.trim().toUpperCase();
    if (clean === 'WELCOME10' || clean === 'ELANORA10') {
      setPromoCode(clean);
      setPromoApplied(true);
      setPromoError(null);
      showToast('10% VIP Privilege Discount Applied!');
      return true;
    } else if (clean === 'FREESHIP') {
      setPromoCode(clean);
      setPromoApplied(true);
      setPromoError(null);
      showToast('Complimentary Shipping Privilege Applied!');
      return true;
    } else {
      setPromoError('Invalid promotional code. Try WELCOME10');
      return false;
    }
  };

  const removePromo = () => {
    setPromoCode('');
    setPromoApplied(false);
    setPromoError(null);
  };

  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const freeShippingThreshold = 99;
  
  let discount = 0;
  if (promoApplied && promoCode.includes('10')) {
    discount = Math.round(subtotal * 0.1 * 100) / 100;
  }

  let shipping = 0;
  if (subtotal === 0) {
    shipping = 0;
  } else if (promoApplied && promoCode === 'FREESHIP') {
    shipping = 0;
  } else if (subtotal >= freeShippingThreshold) {
    shipping = 0;
  } else {
    shipping = 12.00;
  }

  const total = Math.max(0, subtotal - discount + shipping);
  const freeShippingProgress = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        subtotal,
        discount,
        promoCode,
        promoApplied,
        promoError,
        applyPromo,
        removePromo,
        shipping,
        total,
        freeShippingThreshold,
        freeShippingProgress,
        isCartOpen,
        setIsCartOpen,
        isReviewModalOpen,
        setIsReviewModalOpen,
        quickViewProduct,
        setQuickViewProduct,
        activePdpProduct,
        setActivePdpProduct,
        wishlist,
        toggleWishlist,
        isInWishlist,
        toastMessage,
        showToast,
        whatsAppNumber,
        updateWhatsAppNumber,
        isSettingsOpen,
        setIsSettingsOpen
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
