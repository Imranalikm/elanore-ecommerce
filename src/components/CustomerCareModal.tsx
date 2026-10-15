import React, { useState, useEffect } from 'react';
import { X, Ruler, Truck, RotateCcw, MessageSquare, HelpCircle, Sparkles, ShieldCheck, HeartHandshake, CheckCircle2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { buildWhatsAppLink, generateConciergeHelpMessage } from '../utils/whatsapp';

export type CustomerCareTab = 'sizing' | 'shipping' | 'returns' | 'status' | 'faq' | 'about';

interface CustomerCareModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: CustomerCareTab;
}

export const CustomerCareModal: React.FC<CustomerCareModalProps> = ({
  isOpen,
  onClose,
  initialTab = 'sizing'
}) => {
  const [activeTab, setActiveTab] = useState<CustomerCareTab>(initialTab);
  const { whatsAppNumber } = useCart();

  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab, isOpen]);

  if (!isOpen) return null;

  const handleLaunchWhatsAppTopic = (topic: string) => {
    const msg = generateConciergeHelpMessage(topic);
    const url = buildWhatsAppLink(msg, whatsAppNumber);
    window.open(url, '_blank');
  };

  const navItems: { id: CustomerCareTab; label: string; icon: React.ElementType }[] = [
    { id: 'sizing', label: 'Size & Fit Guide', icon: Ruler },
    { id: 'shipping', label: 'Shipping & Delivery', icon: Truck },
    { id: 'returns', label: 'Returns & Exchanges', icon: RotateCcw },
    { id: 'status', label: 'Order Tracking', icon: MessageSquare },
    { id: 'faq', label: 'Boutique FAQs', icon: HelpCircle },
    { id: 'about', label: 'Story & Ethics', icon: Sparkles },
  ];

  React.useEffect(() => {
    document.body.style.overflow = 'hidden';
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-[#FAF8F5] rounded-3xl max-w-3xl w-full p-4 sm:p-8 shadow-2xl border border-stone-200 relative animate-in zoom-in-95 duration-200 max-h-[92vh] sm:max-h-[90vh] flex flex-col overscroll-contain"
      >
        
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between pb-3 sm:pb-4 border-b border-stone-200 shrink-0">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#25D366] animate-pulse shrink-0"></span>
            <div>
              <h3 className="font-serif text-lg sm:text-2xl font-semibold text-stone-900 leading-snug">
                ÉLANORA Customer Concierge
              </h3>
              <p className="text-[11px] sm:text-xs text-stone-500">Luxury assistance, styling inquiries & boutique policies</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-900 rounded-full hover:bg-stone-200/50 transition-colors"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* Tab Navigation Pill Strip */}
        <div className="flex items-center gap-1.5 overflow-x-auto py-2.5 sm:py-3 border-b border-stone-200/70 shrink-0 no-scrollbar touch-pan-x text-xs">
          {navItems.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl font-medium shrink-0 transition-all ${
                  isActive
                    ? 'bg-stone-900 text-white shadow-xs'
                    : 'bg-white hover:bg-stone-200/70 text-stone-700 border border-stone-200/80'
                }`}
              >
                <Icon size={14} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Body Content (Scrollable) */}
        <div className="flex-1 overflow-y-auto py-5 space-y-6 text-stone-700 text-xs sm:text-sm">
          
          {/* TAB 1: SIZING */}
          {activeTab === 'sizing' && (
            <div className="space-y-5 animate-in fade-in duration-150">
              <div className="space-y-1">
                <h4 className="font-serif text-lg font-semibold text-stone-900">Luxury Garment Sizing Matrix</h4>
                <p className="text-xs text-stone-600">
                  All ÉLANORA garments are tailored according to standard European atelier sizing with fluid, flattering drape. If between sizes, our stylists recommend ordering your standard size for an intentional relaxed fit.
                </p>
              </div>

              {/* Garment Sizing Table */}
              <div className="overflow-x-auto rounded-xl border border-stone-300 bg-white no-scrollbar">
                <table className="w-full text-left text-xs border-collapse">
                  <thead className="bg-[#F3EFEA] text-stone-900 font-semibold uppercase tracking-wider text-[11px]">
                    <tr>
                      <th className="p-3 border-b border-stone-300">Size</th>
                      <th className="p-3 border-b border-stone-300">US</th>
                      <th className="p-3 border-b border-stone-300">UK/AU</th>
                      <th className="p-3 border-b border-stone-300">EU</th>
                      <th className="p-3 border-b border-stone-300">Bust (in)</th>
                      <th className="p-3 border-b border-stone-300">Waist (in)</th>
                      <th className="p-3 border-b border-stone-300">Hips (in)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-200">
                    <tr><td className="p-3 font-semibold text-stone-900">XS</td><td className="p-3">0 - 2</td><td className="p-3">6</td><td className="p-3">34</td><td className="p-3">32 - 33</td><td className="p-3">24 - 25</td><td className="p-3">34 - 35</td></tr>
                    <tr className="bg-stone-50/50"><td className="p-3 font-semibold text-stone-900">S</td><td className="p-3">4 - 6</td><td className="p-3">8 - 10</td><td className="p-3">36 - 38</td><td className="p-3">34 - 35</td><td className="p-3">26 - 27</td><td className="p-3">36 - 37</td></tr>
                    <tr><td className="p-3 font-semibold text-stone-900">M</td><td className="p-3">8 - 10</td><td className="p-3">12</td><td className="p-3">40</td><td className="p-3">36 - 37</td><td className="p-3">28 - 29</td><td className="p-3">38 - 39</td></tr>
                    <tr className="bg-stone-50/50"><td className="p-3 font-semibold text-stone-900">L</td><td className="p-3">12 - 14</td><td className="p-3">14</td><td className="p-3">42</td><td className="p-3">38 - 40</td><td className="p-3">30 - 32</td><td className="p-3">40 - 42</td></tr>
                    <tr><td className="p-3 font-semibold text-stone-900">XL</td><td className="p-3">16</td><td className="p-3">16</td><td className="p-3">44</td><td className="p-3">41 - 43</td><td className="p-3">33 - 35</td><td className="p-3">43 - 45</td></tr>
                  </tbody>
                </table>
              </div>

              {/* Shoes Matrix */}
              <div className="p-4 bg-white rounded-xl border border-stone-200 space-y-2">
                <h5 className="font-semibold text-xs text-stone-900 uppercase tracking-wider">Footwear Conversions</h5>
                <p className="text-xs text-stone-600">
                  Sneakers fit true to European size. Size 36 (US 6), 37 (US 6.5), 38 (US 7.5), 39 (US 8.5), 40 (US 9), 41 (US 10).
                </p>
              </div>

              <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2.5 text-emerald-950 text-xs">
                  <MessageSquare size={16} className="text-[#25D366] shrink-0" />
                  <span>Unsure about shoulder breadth or trouser length? Send measurements to our WhatsApp stylist.</span>
                </div>
                <button
                  onClick={() => handleLaunchWhatsAppTopic('Sizing & Fit Consultation')}
                  className="px-4 py-2 bg-[#25D366] hover:bg-[#1ebd5b] text-white rounded-lg text-xs font-semibold uppercase tracking-wider shrink-0 transition-colors"
                >
                  Consult Stylist
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: SHIPPING */}
          {activeTab === 'shipping' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <h4 className="font-serif text-lg font-semibold text-stone-900">Complimentary White-Glove Delivery</h4>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-white rounded-2xl border border-stone-200 space-y-2">
                  <div className="font-semibold text-xs text-stone-900 uppercase tracking-wider flex items-center gap-1.5">
                    <Truck size={14} className="text-emerald-700" />
                    <span>Complimentary Shipping</span>
                  </div>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    Orders over <strong>$99.00</strong> qualify for complimentary priority delivery with premium tracked dispatch. Orders under $99 have a flat $12.00 fee.
                  </p>
                </div>

                <div className="p-4 bg-white rounded-2xl border border-stone-200 space-y-2">
                  <div className="font-semibold text-xs text-stone-900 uppercase tracking-wider flex items-center gap-1.5">
                    <ShieldCheck size={14} className="text-emerald-700" />
                    <span>Dispatched in 24 - 48 Hours</span>
                  </div>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    Once our boutique concierge confirms your order over WhatsApp, pieces are carefully inspected, steam-pressed, and packaged in breathable dust bags.
                  </p>
                </div>
              </div>

              <div className="p-4 bg-stone-100 rounded-2xl space-y-2 text-xs text-stone-700">
                <h5 className="font-semibold text-stone-900 uppercase tracking-wider">Estimated Delivery Times</h5>
                <ul className="list-disc pl-5 space-y-1 text-stone-600">
                  <li><strong>North America & Western Europe:</strong> 2–4 business days via DHL Express</li>
                  <li><strong>United Kingdom & Ireland:</strong> 2–3 business days</li>
                  <li><strong>Australia, New Zealand & Asia:</strong> 3–5 business days</li>
                  <li><strong>Local Same-Day Courier:</strong> Available in select metro hubs upon WhatsApp request</li>
                </ul>
              </div>

              <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="text-xs text-emerald-950">
                  Need priority weekend courier or urgent delivery? Inquire directly with your concierge.
                </div>
                <button
                  onClick={() => handleLaunchWhatsAppTopic('Urgent Shipping Request')}
                  className="px-4 py-2 bg-[#25D366] hover:bg-[#1ebd5b] text-white rounded-lg text-xs font-semibold uppercase tracking-wider shrink-0 transition-colors"
                >
                  Inquire Delivery
                </button>
              </div>
            </div>
          )}

          {/* TAB 3: RETURNS */}
          {activeTab === 'returns' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <h4 className="font-serif text-lg font-semibold text-stone-900">30-Day Effortless Returns & Exchanges</h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                We want you to feel complete poise and elegance in every ÉLANORA piece. If a garment does not fit perfectly, our WhatsApp concierge arranges quick exchanges or hassle-free returns.
              </p>

              <div className="space-y-3">
                <div className="p-3.5 bg-white rounded-xl border border-stone-200 flex items-start gap-3">
                  <CheckCircle2 size={16} className="text-emerald-600 shrink-0 mt-0.5" />
                  <div className="text-xs">
                    <strong className="text-stone-900">Complimentary Size Exchanges:</strong> If your blazer or trousers need a different size, we dispatch the replacement with zero additional shipping fees.
                  </div>
                </div>

                <div className="p-3.5 bg-white rounded-xl border border-stone-200 flex items-start gap-3">
                  <CheckCircle2 size={16} className="text-emerald-600 shrink-0 mt-0.5" />
                  <div className="text-xs">
                    <strong className="text-stone-900">Simple WhatsApp Returns:</strong> Simply message our concierge with your order reference (e.g. #ELA-XXXX) and a photo of the item tags. We send a prepaid return label directly to your chat.
                  </div>
                </div>

                <div className="p-3.5 bg-white rounded-xl border border-stone-200 flex items-start gap-3">
                  <CheckCircle2 size={16} className="text-emerald-600 shrink-0 mt-0.5" />
                  <div className="text-xs">
                    <strong className="text-stone-900">Return Conditions:</strong> Garments must be unworn, unwashed, and in original packaging with all security ribbons and fabric care tags attached.
                  </div>
                </div>
              </div>

              <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="text-xs text-emerald-950">
                  Ready to process an exchange or return? Open WhatsApp to chat with our returns concierge.
                </div>
                <button
                  onClick={() => handleLaunchWhatsAppTopic('Returns & Exchange Request')}
                  className="px-4 py-2 bg-[#25D366] hover:bg-[#1ebd5b] text-white rounded-lg text-xs font-semibold uppercase tracking-wider shrink-0 transition-colors"
                >
                  Start Return
                </button>
              </div>
            </div>
          )}

          {/* TAB 4: ORDER TRACKING */}
          {activeTab === 'status' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <h4 className="font-serif text-lg font-semibold text-stone-900">WhatsApp Order Tracking & Updates</h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                Because every order is coordinated in your WhatsApp conversation thread, your status is always active in real-time. No looking for lost tracking emails or dead links.
              </p>

              <div className="p-4 bg-white rounded-2xl border border-stone-200 space-y-3">
                <h5 className="font-semibold text-xs text-stone-900 uppercase tracking-wider">How to check your order status:</h5>
                <ol className="list-decimal pl-5 space-y-2 text-xs text-stone-600">
                  <li>Open your ongoing WhatsApp chat with the ÉLANORA concierge.</li>
                  <li>Type your Order Reference (e.g. <strong>#ELA-XXXX</strong>).</li>
                  <li>Our stylist will immediately provide live courier dispatch telemetry, delivery ETA, and driver tracking links.</li>
                </ol>
              </div>

              <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="text-xs text-emerald-950">
                  Check order status now with your concierge on WhatsApp.
                </div>
                <button
                  onClick={() => handleLaunchWhatsAppTopic('Order Status Tracking Inquiry')}
                  className="px-4 py-2 bg-[#25D366] hover:bg-[#1ebd5b] text-white rounded-lg text-xs font-semibold uppercase tracking-wider shrink-0 transition-colors"
                >
                  Track Order
                </button>
              </div>
            </div>
          )}

          {/* TAB 5: FAQ */}
          {activeTab === 'faq' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <h4 className="font-serif text-lg font-semibold text-stone-900">Frequently Asked Questions</h4>

              <div className="space-y-3">
                <details className="group bg-white p-4 rounded-xl border border-stone-200 cursor-pointer">
                  <summary className="font-medium text-xs text-stone-900 flex justify-between items-center">
                    <span>How does purchasing on WhatsApp work without a payment gateway?</span>
                    <span className="text-stone-400 group-open:rotate-180 transition-transform">▼</span>
                  </summary>
                  <p className="mt-2 text-xs text-stone-600 font-light leading-relaxed">
                    You curate your bag here and click "Place Order on WhatsApp". A pre-formatted, itemized order summary is sent to our verified boutique stylist. We verify real stock in the atelier and organize settlement via Cash on Delivery, instant UPI, or bank wire without requiring you to store credit card data online.
                  </p>
                </details>

                <details className="group bg-white p-4 rounded-xl border border-stone-200 cursor-pointer">
                  <summary className="font-medium text-xs text-stone-900 flex justify-between items-center">
                    <span>What payment options are supported?</span>
                    <span className="text-stone-400 group-open:rotate-180 transition-transform">▼</span>
                  </summary>
                  <p className="mt-2 text-xs text-stone-600 font-light leading-relaxed">
                    We offer full flexibility: Cash on Delivery (COD) upon courier arrival, direct Bank Transfer / Wire, and instant Payment Links / UPI / Apple Pay requests sent directly in your WhatsApp conversation.
                  </p>
                </details>

                <details className="group bg-white p-4 rounded-xl border border-stone-200 cursor-pointer">
                  <summary className="font-medium text-xs text-stone-900 flex justify-between items-center">
                    <span>Are the fabrics 100% authentic and sustainable?</span>
                    <span className="text-stone-400 group-open:rotate-180 transition-transform">▼</span>
                  </summary>
                  <p className="mt-2 text-xs text-stone-600 font-light leading-relaxed">
                    Yes. We work exclusively with certified ethical mills: Grade 6A 19-momme Mulberry silk, GOTS-certified organic cotton, certified Belgian linen, and recycled polyester-viscose blends with OEKO-TEX Standard 100 certification.
                  </p>
                </details>
              </div>

              <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="text-xs text-emerald-950">
                  Have a question not listed here? Our stylists are online to chat.
                </div>
                <button
                  onClick={() => handleLaunchWhatsAppTopic('General FAQ Inquiry')}
                  className="px-4 py-2 bg-[#25D366] hover:bg-[#1ebd5b] text-white rounded-lg text-xs font-semibold uppercase tracking-wider shrink-0 transition-colors"
                >
                  Ask on WhatsApp
                </button>
              </div>
            </div>
          )}

          {/* TAB 6: ABOUT & SUSTAINABILITY */}
          {activeTab === 'about' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <h4 className="font-serif text-lg font-semibold text-stone-900">The ÉLANORA Atelier & Philosophy</h4>
              <p className="text-xs text-stone-600 leading-relaxed font-light">
                Founded with a singular vision: to liberate modern luxury from cold, impersonal digital shopping carts. At ÉLANORA, every garment is designed to outlive ephemeral trends, crafted with sartorial discipline, and delivered through an intimate personal concierge relationship.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 bg-white rounded-2xl border border-stone-200 space-y-2">
                  <h5 className="font-semibold text-xs text-stone-900 uppercase tracking-wider">Sustainable Textiles</h5>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    Zero fast-fashion mass overproduction. We craft in small, monitored ateliers using renewable organic cotton, cruelty-free peace silk, and recycled tailoring linings.
                  </p>
                </div>

                <div className="p-4 bg-white rounded-2xl border border-stone-200 space-y-2">
                  <h5 className="font-semibold text-xs text-stone-900 uppercase tracking-wider">Conversational Commerce</h5>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    By removing automated checkouts and connecting you directly with human stylists on WhatsApp, we achieve a 98.7% fit satisfaction rate and near-zero return waste.
                  </p>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="pt-4 border-t border-stone-200 flex items-center justify-between shrink-0">
          <span className="text-[11px] text-stone-500">
            WhatsApp Concierge Active: <strong>+{whatsAppNumber}</strong>
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-stone-900 text-white rounded-xl text-xs uppercase tracking-wider font-semibold hover:bg-stone-800 transition-colors"
          >
            Close Guide
          </button>
        </div>

      </div>
    </div>
  );
};
