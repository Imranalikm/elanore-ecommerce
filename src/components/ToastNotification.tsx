import React from 'react';
import { CheckCircle, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const ToastNotification: React.FC = () => {
  const { toastMessage } = useCart();

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 pointer-events-none animate-in fade-in slide-in-from-bottom-3 duration-200">
      <div className="bg-[#181615] text-[#FAF8F5] px-4 py-2.5 rounded-full shadow-2xl border border-stone-700/80 flex items-center gap-2.5 text-xs font-medium tracking-wide">
        <CheckCircle size={15} className="text-[#25D366]" />
        <span>{toastMessage}</span>
      </div>
    </div>
  );
};
