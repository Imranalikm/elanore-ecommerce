import React, { useState } from 'react';
import { Mail, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const { showToast } = useCart();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() && email.includes('@')) {
      setSubscribed(true);
      showToast('Welcome to the ÉLANORA Circle. 10% code sent!');
      setEmail('');
    }
  };

  return (
    <section className="py-12 sm:py-16 bg-[#EFE8DE] border-b border-[#E0D5C7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 max-w-5xl mx-auto">
          
          {/* Left: Envelope icon + Copy */}
          <div className="flex items-center gap-5 text-center lg:text-left">
            <div className="w-14 h-14 rounded-full bg-[#FAF8F5] border border-stone-300/80 flex items-center justify-center shrink-0 shadow-xs hidden sm:flex">
              <Mail size={24} className="text-stone-700 stroke-[1.5]" />
            </div>

            <div className="space-y-1">
              <h3 className="font-serif text-2xl sm:text-3xl font-medium text-[#181615] tracking-tight">
                Join ÉLANORA
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 max-w-md font-light">
                Subscribe for early access to new arrivals, exclusive offers, and style inspiration.
              </p>
            </div>
          </div>

          {/* Right: Email Input + Subscribe Button */}
          <div className="w-full lg:w-auto flex-1 max-w-md">
            {subscribed ? (
              <div className="flex items-center justify-center gap-2 p-3 bg-white/90 rounded-xl text-xs font-medium text-emerald-800 border border-emerald-200">
                <Check size={16} />
                <span>Thank you. Your privilege code WELCOME10 is ready to use!</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 sm:gap-0">
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full sm:w-72 px-4 py-3 bg-white text-stone-900 placeholder:text-stone-400 text-xs sm:text-sm border border-stone-300 sm:rounded-l-lg sm:rounded-r-none rounded-lg focus:outline-none focus:ring-1 focus:ring-stone-900"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-[#181615] hover:bg-stone-800 text-white text-xs font-medium uppercase tracking-[0.15em] sm:rounded-r-lg sm:rounded-l-none rounded-lg transition-colors shrink-0 cursor-pointer"
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
