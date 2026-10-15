import React, { useState } from 'react';
import { Search, ShoppingBag, Heart, MessageSquare, PhoneCall, Menu, X, ArrowRight, HelpCircle, Sparkles, Ruler } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { CustomerCareTab } from './CustomerCareModal';
import { formatPhoneNumberDisplay } from '../utils/whatsapp';

export interface NavigationOptions {
  category?: string;
  search?: string;
  filter?: 'all' | 'sale' | 'new' | 'wishlist';
}

interface HeaderProps {
  onNavigate: (view: 'home' | 'shop', options?: NavigationOptions) => void;
  activeView: 'home' | 'shop';
  activeCategory?: string;
  activeFilter?: 'all' | 'sale' | 'new' | 'wishlist';
  onOpenCustomerCare?: (tab?: CustomerCareTab) => void;
}

export const Header: React.FC<HeaderProps> = ({
  onNavigate,
  activeView,
  activeCategory,
  activeFilter,
  onOpenCustomerCare
}) => {
  const { cartItems, setIsCartOpen, wishlist, setIsSettingsOpen, whatsAppNumber } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchInput, setSearchInput] = useState('');

  const totalItemsCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const navCategories = [
    { label: 'New In', filter: 'new' as const },
    { label: 'Shop All', filter: 'all' as const },
    { label: 'Dresses', cat: 'Dresses' },
    { label: 'Tops', cat: 'Tops' },
    { label: 'Bottoms', cat: 'Bottoms' },
    { label: 'Blazers', cat: 'Blazers' },
    { label: 'Bags & Accessories', cat: 'Bags' },
    { label: 'Sale Edit', filter: 'sale' as const },
  ];

  const handleNavClick = (item: { label: string; cat?: string; filter?: 'all' | 'sale' | 'new' | 'wishlist' }) => {
    if (item.filter) {
      onNavigate('shop', { filter: item.filter });
    } else if (item.cat) {
      onNavigate('shop', { category: item.cat, filter: 'all' });
    } else {
      onNavigate('shop', { filter: 'all' });
    }
    setMobileMenuOpen(false);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      onNavigate('shop', { search: searchInput.trim(), filter: 'all' });
      setSearchOpen(false);
    }
  };

  const handlePopularSearch = (term: string) => {
    setSearchInput(term);
    onNavigate('shop', { search: term, filter: 'all' });
    setSearchOpen(false);
  };

  return (
    <>
      {/* Top Announcement Bar */}
      <div className="bg-[#181615] text-[#FAF8F5] text-[11px] sm:text-xs tracking-wider py-2 px-3 sm:px-8 border-b border-stone-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          {/* Mobile concise banner */}
          <div className="flex sm:hidden items-center justify-between w-full text-[10px] tracking-normal">
            <button
              onClick={() => onOpenCustomerCare?.('shipping')}
              className="font-medium hover:underline text-left truncate"
            >
              Free Shipping Over $99
            </button>
            <span className="text-stone-500 mx-1.5">•</span>
            <button
              onClick={() => setIsSettingsOpen(true)}
              className="text-stone-300 hover:text-white flex items-center gap-1 shrink-0"
            >
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#25D366]"></span>
              <span>WhatsApp Active</span>
            </button>
          </div>

          {/* Desktop full bar */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={() => onOpenCustomerCare?.('shipping')}
              className="font-medium hover:underline cursor-pointer"
            >
              Free Shipping on Orders Over $99
            </button>
            <span className="text-stone-500">|</span>
            <button
              onClick={() => onOpenCustomerCare?.('returns')}
              className="text-stone-300 hover:text-white hover:underline cursor-pointer"
            >
              Easy Returns within 30 Days
            </button>
          </div>
          <div className="hidden sm:flex items-center gap-4 text-stone-300">
            <button 
              onClick={() => setIsSettingsOpen(true)}
              className="hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer"
              title="Configure WhatsApp phone number for testing"
            >
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#25D366]"></span>
              <span>WhatsApp Concierge: {formatPhoneNumberDisplay(whatsAppNumber)}</span>
            </button>
            <span className="text-stone-500">|</span>
            <button 
              onClick={() => onOpenCustomerCare?.('faq')} 
              className="hover:text-white transition-colors cursor-pointer"
            >
              Help & Concierge
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Header */}
      <header className="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#EAE3D9] transition-all duration-200">
        <div className="max-w-7xl mx-auto px-3 sm:px-8 h-16 sm:h-20 flex items-center justify-between gap-2 sm:gap-4">
          
          {/* Mobile Menu Button */}
          <div className="flex items-center gap-1 sm:gap-2 lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 sm:p-2 -ml-1 text-stone-800 hover:text-stone-950 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
            <button
              onClick={() => setSearchOpen(true)}
              className="p-1.5 sm:p-2 text-stone-700 hover:text-stone-950"
              aria-label="Search"
            >
              <Search size={19} />
            </button>
          </div>

          {/* Brand Wordmark (Reference style) */}
          <div className="flex items-center">
            <button
              onClick={() => onNavigate('home')}
              className="text-left group cursor-pointer"
            >
              <span className="font-serif text-xl sm:text-2xl md:text-3xl tracking-[0.16em] sm:tracking-[0.2em] uppercase font-semibold text-[#181615] group-hover:opacity-90 transition-opacity">
                ÉLANORA
              </span>
            </button>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7 text-[13px] tracking-wider uppercase font-medium text-stone-700">
            <button
              onClick={() => onNavigate('shop', { filter: 'new' })}
              className={`hover:text-stone-950 transition-colors py-1 relative ${
                activeView === 'shop' && activeFilter === 'new' ? 'text-stone-950 font-semibold' : ''
              }`}
            >
              New In
            </button>
            <button
              onClick={() => onNavigate('shop', { filter: 'all' })}
              className={`hover:text-stone-950 transition-colors py-1 ${
                activeView === 'shop' && (!activeCategory || activeCategory === 'All') && activeFilter === 'all' ? 'text-stone-950 font-semibold' : ''
              }`}
            >
              Shop All
            </button>
            <button
              onClick={() => onNavigate('shop', { category: 'Dresses', filter: 'all' })}
              className={`hover:text-stone-950 transition-colors py-1 ${
                activeCategory === 'Dresses' ? 'text-stone-950 font-semibold' : ''
              }`}
            >
              Dresses
            </button>
            <button
              onClick={() => onNavigate('shop', { category: 'Tops', filter: 'all' })}
              className={`hover:text-stone-950 transition-colors py-1 ${
                activeCategory === 'Tops' ? 'text-stone-950 font-semibold' : ''
              }`}
            >
              Tops
            </button>
            <button
              onClick={() => onNavigate('shop', { category: 'Bottoms', filter: 'all' })}
              className={`hover:text-stone-950 transition-colors py-1 ${
                activeCategory === 'Bottoms' ? 'text-stone-950 font-semibold' : ''
              }`}
            >
              Bottoms
            </button>
            <button
              onClick={() => onNavigate('shop', { category: 'Blazers', filter: 'all' })}
              className={`hover:text-stone-950 transition-colors py-1 ${
                activeCategory === 'Blazers' ? 'text-stone-950 font-semibold' : ''
              }`}
            >
              Blazers
            </button>
            <button
              onClick={() => onNavigate('shop', { filter: 'sale' })}
              className={`hover:text-stone-950 transition-colors py-1 ${
                activeFilter === 'sale' ? 'text-rose-700 font-semibold' : 'text-stone-500 hover:text-stone-900'
              }`}
            >
              Sale
            </button>
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center gap-1.5 sm:gap-3">
            {/* Desktop Search Button */}
            <button
              onClick={() => setSearchOpen(true)}
              className="hidden lg:flex p-2 text-stone-700 hover:text-stone-950 hover:bg-stone-200/50 rounded-full transition-colors cursor-pointer"
              aria-label="Search collection"
              title="Search catalog"
            >
              <Search size={20} strokeWidth={1.75} />
            </button>

            {/* WhatsApp Direct Order / Concierge Button */}
            <button
              onClick={() => setIsSettingsOpen(true)}
              className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 text-[11px] sm:text-xs font-medium text-emerald-800 bg-emerald-50 hover:bg-emerald-100 rounded-full border border-emerald-200/70 transition-colors cursor-pointer"
              title="Click to configure or test WhatsApp recipient"
            >
              <MessageSquare size={13} className="text-[#25D366] fill-[#25D366] shrink-0" />
              <span className="hidden md:inline font-sans font-medium">WhatsApp Orders Active</span>
              <span className="md:hidden font-sans font-medium">WhatsApp</span>
            </button>

            {/* Wishlist Icon */}
            <button
              onClick={() => onNavigate('shop', { filter: 'wishlist' })}
              className={`p-1.5 sm:p-2 hover:text-stone-950 relative hover:bg-stone-200/50 rounded-full transition-colors cursor-pointer ${
                activeFilter === 'wishlist' ? 'text-rose-600 bg-rose-50' : 'text-stone-700'
              }`}
              aria-label="Wishlist"
              title={wishlist.length > 0 ? `View ${wishlist.length} saved wishlist items` : 'Wishlist is empty'}
            >
              <Heart size={19} strokeWidth={1.75} className={wishlist.length > 0 ? 'fill-rose-500 text-rose-500' : ''} />
              {wishlist.length > 0 && (
                <span className="absolute top-0.5 right-0.5 sm:top-1 sm:right-1 w-4 h-4 bg-stone-900 text-white text-[10px] font-medium rounded-full flex items-center justify-center tabular-nums">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Shopping Bag Drawer Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="p-1.5 sm:p-2 text-stone-900 hover:bg-stone-200/60 rounded-full relative transition-colors cursor-pointer"
              aria-label="Shopping bag"
              title="View shopping bag"
            >
              <ShoppingBag size={20} strokeWidth={1.75} />
              <span className="absolute -top-1 -right-1 min-w-[18px] sm:min-w-[20px] h-4 sm:h-5 bg-[#181615] text-[#FAF8F5] text-[10px] sm:text-[11px] font-semibold rounded-full flex items-center justify-center px-1 tabular-nums shadow-sm">
                {totalItemsCount}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Slide-down Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#FAF8F5] border-b border-[#EAE3D9] px-4 sm:px-6 py-5 space-y-4 animate-in slide-in-from-top duration-200 max-h-[calc(100dvh-5rem)] overflow-y-auto">
            <div className="flex flex-col space-y-1 text-sm tracking-wider uppercase font-medium text-stone-800">
              {navCategories.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => handleNavClick(item)}
                  className="text-left py-2.5 px-2 hover:bg-stone-100/70 rounded-lg border-b border-stone-200/40 flex items-center justify-between"
                >
                  <span>{item.label}</span>
                  <ArrowRight size={14} className="text-stone-400" />
                </button>
              ))}
            </div>

            {/* Customer Care Quick Links on Mobile */}
            <div className="pt-2 border-t border-stone-200/80 space-y-2">
              <span className="text-[10px] uppercase tracking-widest text-stone-400 font-semibold px-2">Customer Care & Sizing</span>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <button
                  onClick={() => {
                    onOpenCustomerCare?.('sizing');
                    setMobileMenuOpen(false);
                  }}
                  className="p-2.5 bg-stone-100 hover:bg-stone-200/80 text-stone-800 rounded-lg text-left flex items-center gap-1.5"
                >
                  <Ruler size={13} className="text-stone-600 shrink-0" />
                  <span className="truncate">Size Guide</span>
                </button>
                <button
                  onClick={() => {
                    onOpenCustomerCare?.('faq');
                    setMobileMenuOpen(false);
                  }}
                  className="p-2.5 bg-stone-100 hover:bg-stone-200/80 text-stone-800 rounded-lg text-left flex items-center gap-1.5"
                >
                  <HelpCircle size={13} className="text-stone-600 shrink-0" />
                  <span className="truncate">FAQs & Help</span>
                </button>
              </div>
            </div>

            <div className="pt-2 flex flex-col gap-2">
              <button
                onClick={() => {
                  onNavigate('shop', { filter: 'wishlist' });
                  setMobileMenuOpen(false);
                }}
                className="w-full py-2.5 px-4 bg-rose-50 text-rose-900 rounded-lg text-xs font-medium flex items-center justify-center gap-2 border border-rose-200"
              >
                <Heart size={15} className="fill-rose-500 text-rose-500" />
                <span>Saved Wishlist ({wishlist.length})</span>
              </button>

              <button
                onClick={() => {
                  setIsSettingsOpen(true);
                  setMobileMenuOpen(false);
                }}
                className="w-full py-2.5 px-4 bg-emerald-50 text-emerald-800 rounded-lg text-xs font-medium flex items-center justify-center gap-2 border border-emerald-200"
              >
                <MessageSquare size={16} className="text-[#25D366] fill-[#25D366]" />
                <span>WhatsApp: {formatPhoneNumberDisplay(whatsAppNumber)}</span>
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Search Overlay Modal */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-start justify-center pt-20 px-4">
          <div className="bg-[#FAF8F5] rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-stone-200 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-4 border-b border-stone-200">
              <h3 className="font-serif text-xl font-semibold text-stone-900">Search ÉLANORA</h3>
              <button 
                onClick={() => setSearchOpen(false)}
                className="p-1 text-stone-400 hover:text-stone-800 cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSearchSubmit} className="mt-4">
              <div className="relative">
                <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" />
                <input
                  type="text"
                  autoFocus
                  placeholder="Search blazers, knitwear, silk dresses, bags..."
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-white border border-stone-300 rounded-xl text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-900 text-sm"
                />
              </div>
              <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-stone-600">
                <span className="font-medium text-stone-400 uppercase tracking-wider">Popular:</span>
                {['Oversized Blazer', 'Ribbed Knit', 'Wide Leg Pants', 'Silk Dress', 'Leather Bag'].map((term) => (
                  <button
                    key={term}
                    type="button"
                    onClick={() => handlePopularSearch(term)}
                    className="px-2.5 py-1 bg-stone-200/70 hover:bg-stone-300/80 rounded-md transition-colors cursor-pointer"
                  >
                    {term}
                  </button>
                ))}
              </div>
              <div className="mt-6 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setSearchOpen(false)}
                  className="px-4 py-2.5 text-xs text-stone-600 hover:text-stone-900 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#181615] text-white text-xs font-medium uppercase tracking-wider rounded-lg hover:bg-stone-800 transition-colors cursor-pointer"
                >
                  Explore Results
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
