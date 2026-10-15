import React from 'react';
import { Instagram, Facebook, MessageSquare, ShieldCheck, Heart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { NavigationOptions } from './Header';
import { CustomerCareTab } from './CustomerCareModal';
import { formatPhoneNumberDisplay } from '../utils/whatsapp';

interface FooterProps {
  onNavigate: (view: 'home' | 'shop', options?: NavigationOptions) => void;
  onOpenCustomerCare?: (tab?: CustomerCareTab) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenCustomerCare }) => {
  const { setIsSettingsOpen, whatsAppNumber } = useCart();

  return (
    <footer className="bg-[#FAF8F5] text-stone-700 pt-16 pb-12 border-t border-[#EAE3D9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Main 5-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-14 border-b border-stone-200">
          
          {/* Brand Bio Column */}
          <div className="lg:col-span-4 space-y-4">
            <button
              onClick={() => onNavigate('home')}
              className="text-left group cursor-pointer"
            >
              <span className="font-serif text-2xl tracking-[0.2em] uppercase font-semibold text-[#181615]">
                ÉLANORA
              </span>
            </button>
            <p className="text-xs sm:text-sm text-stone-600 max-w-xs font-light leading-relaxed">
              Timeless fashion for the modern woman. Effortless style, every day. Hand-tailored with premium, sustainable fabrics.
            </p>

            {/* Social Icons matching reference */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="#instagram"
                onClick={(e) => {
                  e.preventDefault();
                  onOpenCustomerCare?.('about');
                }}
                className="w-8 h-8 rounded-full bg-stone-200/70 hover:bg-stone-300 flex items-center justify-center text-stone-800 transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={15} />
              </a>
              <a
                href="#facebook"
                onClick={(e) => {
                  e.preventDefault();
                  onOpenCustomerCare?.('about');
                }}
                className="w-8 h-8 rounded-full bg-stone-200/70 hover:bg-stone-300 flex items-center justify-center text-stone-800 transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={15} />
              </a>
              <button 
                onClick={() => setIsSettingsOpen(true)}
                className="w-8 h-8 rounded-full bg-emerald-100 hover:bg-emerald-200 flex items-center justify-center text-emerald-800 transition-colors cursor-pointer"
                title="Configure WhatsApp Phone Settings"
              >
                <MessageSquare size={15} className="text-[#25D366] fill-[#25D366]" />
              </button>
            </div>

            {/* WhatsApp Business Verified Notice */}
            <div className="pt-2">
              <button
                onClick={() => setIsSettingsOpen(true)}
                className="inline-flex items-center gap-2 text-[11px] text-emerald-800 font-medium hover:underline cursor-pointer"
              >
                <span className="w-2 h-2 rounded-full bg-[#25D366]"></span>
                <span>Active WhatsApp Concierge ({formatPhoneNumberDisplay(whatsAppNumber)})</span>
              </button>
            </div>
          </div>

          {/* Shop Column */}
          <div className="lg:col-span-2 space-y-3 text-xs">
            <h4 className="font-serif text-sm font-semibold uppercase tracking-wider text-[#181615]">
              Shop
            </h4>
            <ul className="space-y-2 text-stone-600">
              <li>
                <button
                  onClick={() => onNavigate('shop', { filter: 'new' })}
                  className="hover:text-stone-950 transition-colors cursor-pointer"
                >
                  New In
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('shop', { category: 'Dresses', filter: 'all' })}
                  className="hover:text-stone-950 transition-colors cursor-pointer"
                >
                  Dresses
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('shop', { category: 'Tops', filter: 'all' })}
                  className="hover:text-stone-950 transition-colors cursor-pointer"
                >
                  Tops
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('shop', { category: 'Bottoms', filter: 'all' })}
                  className="hover:text-stone-950 transition-colors cursor-pointer"
                >
                  Bottoms
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('shop', { category: 'Accessories', filter: 'all' })}
                  className="hover:text-stone-950 transition-colors cursor-pointer"
                >
                  Accessories
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('shop', { filter: 'sale' })}
                  className="hover:text-rose-700 transition-colors font-medium cursor-pointer"
                >
                  Sale Edit
                </button>
              </li>
            </ul>
          </div>

          {/* Customer Care Column */}
          <div className="lg:col-span-2 space-y-3 text-xs">
            <h4 className="font-serif text-sm font-semibold uppercase tracking-wider text-[#181615]">
              Customer Care
            </h4>
            <ul className="space-y-2 text-stone-600">
              <li>
                <button
                  onClick={() => onOpenCustomerCare?.('status')}
                  className="hover:text-stone-950 transition-colors cursor-pointer"
                >
                  WhatsApp Order Status
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenCustomerCare?.('returns')}
                  className="hover:text-stone-950 transition-colors cursor-pointer"
                >
                  Returns & Exchanges
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenCustomerCare?.('shipping')}
                  className="hover:text-stone-950 transition-colors cursor-pointer"
                >
                  Shipping Info
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenCustomerCare?.('sizing')}
                  className="hover:text-stone-950 transition-colors cursor-pointer"
                >
                  Size & Fit Guide
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenCustomerCare?.('faq')}
                  className="hover:text-stone-950 transition-colors cursor-pointer"
                >
                  Boutique FAQ
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenCustomerCare?.('faq')}
                  className="hover:text-stone-950 transition-colors cursor-pointer"
                >
                  Contact Concierge
                </button>
              </li>
            </ul>
          </div>

          {/* About Column */}
          <div className="lg:col-span-2 space-y-3 text-xs">
            <h4 className="font-serif text-sm font-semibold uppercase tracking-wider text-[#181615]">
              About
            </h4>
            <ul className="space-y-2 text-stone-600">
              <li>
                <button
                  onClick={() => onOpenCustomerCare?.('about')}
                  className="hover:text-stone-950 transition-colors cursor-pointer"
                >
                  Our Story
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenCustomerCare?.('about')}
                  className="hover:text-stone-950 transition-colors cursor-pointer"
                >
                  Sustainability
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenCustomerCare?.('about')}
                  className="hover:text-stone-950 transition-colors cursor-pointer"
                >
                  Ethical Ateliers
                </button>
              </li>
            </ul>
          </div>

          {/* Legal Column */}
          <div className="lg:col-span-2 space-y-3 text-xs">
            <h4 className="font-serif text-sm font-semibold uppercase tracking-wider text-[#181615]">
              Legal
            </h4>
            <ul className="space-y-2 text-stone-600">
              <li>
                <button
                  onClick={() => onOpenCustomerCare?.('faq')}
                  className="hover:text-stone-950 transition-colors cursor-pointer"
                >
                  Terms & Conditions
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenCustomerCare?.('faq')}
                  className="hover:text-stone-950 transition-colors cursor-pointer"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenCustomerCare?.('faq')}
                  className="hover:text-stone-950 transition-colors cursor-pointer"
                >
                  Security & WhatsApp
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Copyright & Payment Trust row matching reference */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <div>
            © 2026 ÉLANORA. All Rights Reserved. WhatsApp Orders & Inquiries Powered.
          </div>

          {/* Supported Settlement icons & WhatsApp Verified */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[10px] uppercase tracking-wider text-stone-400 mr-1">Accepted Upon Confirmation:</span>
            <span className="px-2 py-0.5 bg-stone-200/80 rounded text-[10px] font-semibold text-stone-800">CASH ON DELIVERY</span>
            <span className="px-2 py-0.5 bg-stone-200/80 rounded text-[10px] font-semibold text-stone-800">BANK WIRE</span>
            <span className="px-2 py-0.5 bg-stone-200/80 rounded text-[10px] font-semibold text-stone-800">UPI / QR</span>
            <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded text-[10px] font-semibold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#25D366]"></span>
              WHATSAPP VERIFIED
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
};
