/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { CartProvider, useCart } from './context/CartContext';
import { Header, NavigationOptions } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { CategoryCircles } from './components/CategoryCircles';
import { NewArrivalsSection } from './components/NewArrivalsSection';
import { EditorialPromos } from './components/EditorialPromos';
import { WhatsAppOrderingBenefits } from './components/WhatsAppOrderingBenefits';
import { TestimonialsSection } from './components/TestimonialsSection';
import { InstagramFeedSection } from './components/InstagramFeedSection';
import { NewsletterSection } from './components/NewsletterSection';
import { Footer } from './components/Footer';
import { ShopCatalogView, SpecialFilterType } from './components/ShopCatalogView';
import { CartDrawer } from './components/CartDrawer';
import { WhatsAppOrderReviewModal } from './components/WhatsAppOrderReviewModal';
import { ProductDetailModal } from './components/ProductDetailModal';
import { ProductQuickViewModal } from './components/ProductQuickViewModal';
import { WhatsAppSettingsModal } from './components/WhatsAppSettingsModal';
import { CustomerCareModal, CustomerCareTab } from './components/CustomerCareModal';
import { FloatingWhatsAppConcierge } from './components/FloatingWhatsAppConcierge';
import { ToastNotification } from './components/ToastNotification';
import { PRODUCTS } from './data/products';
import { buildWhatsAppLink, generateSingleProductInquiryMessage } from './utils/whatsapp';

function MainStorefront() {
  const [currentView, setCurrentView] = useState<'home' | 'shop'>('home');
  const [activeCategory, setActiveCategory] = useState<string | undefined>(undefined);
  const [activeSearch, setActiveSearch] = useState<string>('');
  const [activeFilter, setActiveFilter] = useState<SpecialFilterType>('all');
  const [customerCareOpen, setCustomerCareOpen] = useState(false);
  const [customerCareTab, setCustomerCareTab] = useState<CustomerCareTab>('sizing');
  const { whatsAppNumber } = useCart();

  const handleNavigate = (view: 'home' | 'shop', options?: NavigationOptions) => {
    setCurrentView(view);
    setActiveCategory(options?.category);
    setActiveSearch(options?.search || '');
    setActiveFilter(options?.filter || 'all');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCategorySelect = (category: string) => {
    setCurrentView('shop');
    setActiveCategory(category);
    setActiveFilter('all');
    setActiveSearch('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenCustomerCare = (tab: CustomerCareTab = 'sizing') => {
    setCustomerCareTab(tab);
    setCustomerCareOpen(true);
  };

  const handleHeroWhatsAppInquiry = () => {
    const heroProduct = PRODUCTS.find((p) => p.id === 'oversized-blazer') || PRODUCTS[0];
    const msg = generateSingleProductInquiryMessage(heroProduct, 'M', 'Camel Taupe', 1);
    const url = buildWhatsAppLink(msg, whatsAppNumber);
    window.open(url, '_blank');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-stone-900 selection:bg-stone-900 selection:text-white">
      {/* Global Header */}
      <Header
        onNavigate={handleNavigate}
        activeView={currentView}
        activeCategory={activeCategory}
        activeFilter={activeFilter}
        onOpenCustomerCare={handleOpenCustomerCare}
      />

      {/* Main View Area */}
      <main className="flex-1">
        {currentView === 'home' ? (
          <>
            {/* Hero Section matching reference image */}
            <HeroSection
              onShopNow={() => handleNavigate('shop', { filter: 'new' })}
              onExploreCollections={() => handleNavigate('shop', { filter: 'all' })}
              onWhatsAppInquiry={handleHeroWhatsAppInquiry}
            />

            {/* Circular Category Avatars Row matching reference image */}
            <CategoryCircles
              onSelectCategory={handleCategorySelect}
              activeCategory={activeCategory}
            />

            {/* New Arrivals 4-Column Grid matching reference image */}
            <NewArrivalsSection
              onShopAll={() => handleNavigate('shop', { filter: 'new' })}
            />

            {/* Editorial Promos (Summer Essentials + Accessory Edit) matching reference */}
            <EditorialPromos
              onShopDresses={() => handleCategorySelect('Dresses')}
              onShopAccessories={() => handleCategorySelect('Accessories')}
            />

            {/* WhatsApp Ordering Explainer & Benefits */}
            <WhatsAppOrderingBenefits />

            {/* What Our Customers Say matching reference */}
            <TestimonialsSection />

            {/* Follow Us @elanora.style Instagram Feed matching reference */}
            <InstagramFeedSection />

            {/* Join ÉLANORA Newsletter section matching reference */}
            <NewsletterSection />
          </>
        ) : (
          <>
            {/* Shop Catalog View with Category Circles on top for quick switching */}
            <CategoryCircles
              onSelectCategory={handleCategorySelect}
              activeCategory={activeCategory}
            />

            <ShopCatalogView
              initialCategory={activeCategory || 'All'}
              initialSearchQuery={activeSearch}
              initialFilter={activeFilter}
              onSelectCategory={handleCategorySelect}
            />

            <NewsletterSection />
          </>
        )}
      </main>

      {/* Global Footer matching reference image */}
      <Footer
        onNavigate={handleNavigate}
        onOpenCustomerCare={handleOpenCustomerCare}
      />

      {/* Floating Concierge & Interactive Modals */}
      <FloatingWhatsAppConcierge />
      <CartDrawer />
      <WhatsAppOrderReviewModal />
      <ProductDetailModal />
      <ProductQuickViewModal />
      <WhatsAppSettingsModal />
      <CustomerCareModal
        isOpen={customerCareOpen}
        onClose={() => setCustomerCareOpen(false)}
        initialTab={customerCareTab}
      />
      <ToastNotification />
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <MainStorefront />
    </CartProvider>
  );
}
