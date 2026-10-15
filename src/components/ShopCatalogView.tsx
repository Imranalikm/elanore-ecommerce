import React, { useState, useMemo, useEffect } from 'react';
import { Filter, SlidersHorizontal, Search, X, Check, ArrowUpDown, ChevronDown, Heart, Sparkles, Tag, ShoppingBag } from 'lucide-react';
import { PRODUCTS, CATEGORIES } from '../data/products';
import { Product, SortOption } from '../types';
import { ProductCard } from './ProductCard';
import { useCart } from '../context/CartContext';

export type SpecialFilterType = 'all' | 'sale' | 'new' | 'wishlist';

interface ShopCatalogViewProps {
  initialCategory?: string;
  initialSearchQuery?: string;
  initialFilter?: SpecialFilterType;
  onSelectCategory?: (category: string) => void;
}

export const ShopCatalogView: React.FC<ShopCatalogViewProps> = ({
  initialCategory,
  initialSearchQuery = '',
  initialFilter = 'all',
  onSelectCategory
}) => {
  const { wishlist } = useCart();
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory || 'All');
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const [specialFilter, setSpecialFilter] = useState<SpecialFilterType>(initialFilter);
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [inStockOnly, setInStockOnly] = useState(false);
  const [priceMax, setPriceMax] = useState<number>(200);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Sync when initialCategory prop changes
  useEffect(() => {
    setSelectedCategory(initialCategory || 'All');
  }, [initialCategory]);

  // Sync when initialSearchQuery prop changes
  useEffect(() => {
    setSearchQuery(initialSearchQuery);
  }, [initialSearchQuery]);

  // Sync when initialFilter prop changes
  useEffect(() => {
    setSpecialFilter(initialFilter);
  }, [initialFilter]);

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((item) => {
      // Special Filter
      if (specialFilter === 'sale' && (!item.originalPrice || item.originalPrice <= item.price)) {
        return false;
      }
      if (specialFilter === 'new' && !item.isNew) {
        return false;
      }
      if (specialFilter === 'wishlist' && !wishlist.includes(item.id)) {
        return false;
      }

      // Category filter
      if (selectedCategory !== 'All' && item.category !== selectedCategory) {
        return false;
      }
      // Price filter
      if (item.price > priceMax) {
        return false;
      }
      // In stock
      if (inStockOnly && !item.inStock) {
        return false;
      }
      // Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(q);
        const matchesCat = item.category.toLowerCase().includes(q);
        const matchesDesc = item.description.toLowerCase().includes(q);
        if (!matchesName && !matchesCat && !matchesDesc) return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'newest') return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0; // featured default
    });
  }, [selectedCategory, specialFilter, wishlist, priceMax, inStockOnly, searchQuery, sortBy]);

  const handleCategoryChange = (cat: string) => {
    setSelectedCategory(cat);
    if (onSelectCategory && cat !== 'All') {
      onSelectCategory(cat);
    }
  };

  const handleResetFilters = () => {
    setSelectedCategory('All');
    setSearchQuery('');
    setSpecialFilter('all');
    setPriceMax(200);
    setInStockOnly(false);
    setSortBy('featured');
  };

  const saleCount = PRODUCTS.filter((p) => p.originalPrice && p.originalPrice > p.price).length;
  const newCount = PRODUCTS.filter((p) => p.isNew).length;

  return (
    <div className="py-8 sm:py-12 bg-[#FAF8F5] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Breadcrumb & Header */}
        <div className="mb-6">
          <div className="text-xs text-stone-500 uppercase tracking-widest flex items-center gap-2 mb-2 flex-wrap">
            <span>ÉLANORA</span>
            <span>/</span>
            <span>Catalog</span>
            {selectedCategory !== 'All' && (
              <>
                <span>/</span>
                <span className="text-stone-900 font-medium">{selectedCategory}</span>
              </>
            )}
            {specialFilter !== 'all' && (
              <>
                <span>/</span>
                <span className="text-stone-900 font-medium capitalize">{specialFilter}</span>
              </>
            )}
            {searchQuery && (
              <>
                <span>/</span>
                <span className="text-stone-900 font-medium">Search: "{searchQuery}"</span>
              </>
            )}
          </div>

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h1 className="font-serif text-3xl sm:text-4xl text-[#181615] font-medium tracking-tight">
                {specialFilter === 'wishlist'
                  ? 'Your Saved Wishlist'
                  : specialFilter === 'sale'
                  ? 'The Seasonal Sale Edit'
                  : specialFilter === 'new'
                  ? 'New In Arrivals'
                  : selectedCategory === 'All'
                  ? 'The Complete Wardrobe'
                  : selectedCategory}
              </h1>
              <p className="text-xs sm:text-sm text-stone-600 mt-1">
                {filteredProducts.length} pieces available for instant WhatsApp reservation & delivery.
              </p>
            </div>

            {/* Quick Mode Filters */}
            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={() => setSpecialFilter('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  specialFilter === 'all'
                    ? 'bg-stone-900 text-white'
                    : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
                }`}
              >
                All Pieces
              </button>
              <button
                onClick={() => setSpecialFilter('new')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 ${
                  specialFilter === 'new'
                    ? 'bg-stone-900 text-white'
                    : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
                }`}
              >
                <Sparkles size={13} className="text-amber-500" />
                <span>New In ({newCount})</span>
              </button>
              <button
                onClick={() => setSpecialFilter('sale')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 ${
                  specialFilter === 'sale'
                    ? 'bg-stone-900 text-white'
                    : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
                }`}
              >
                <Tag size={13} className="text-rose-500" />
                <span>Sale ({saleCount})</span>
              </button>
              <button
                onClick={() => setSpecialFilter('wishlist')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 ${
                  specialFilter === 'wishlist'
                    ? 'bg-stone-900 text-white'
                    : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
                }`}
              >
                <Heart size={13} className={wishlist.length > 0 ? 'fill-rose-500 text-rose-500' : ''} />
                <span>Saved Wishlist ({wishlist.length})</span>
              </button>
            </div>
          </div>
        </div>

        {/* Toolbar: Category Chips, Mobile Filter Button, Sort Dropdown */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 pb-6 border-b border-stone-200">
          
          {/* Desktop Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs font-medium">
            <button
              onClick={() => handleCategoryChange('All')}
              className={`px-3.5 py-1.5 rounded-lg transition-colors shrink-0 ${
                selectedCategory === 'All'
                  ? 'bg-stone-900 text-white shadow-xs'
                  : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
              }`}
            >
              All Categories
            </button>
            {CATEGORIES.map((c) => (
              <button
                key={c.name}
                onClick={() => handleCategoryChange(c.name)}
                className={`px-3.5 py-1.5 rounded-lg transition-colors shrink-0 ${
                  selectedCategory === c.name
                    ? 'bg-stone-900 text-white shadow-xs'
                    : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                }`}
              >
                {c.name}
              </button>
            ))}
          </div>

          {/* Right Toolbar Controls */}
          <div className="flex items-center gap-3 justify-between md:justify-end">
            
            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setMobileFilterOpen(true)}
              className="md:hidden flex items-center gap-1.5 px-3 py-1.5 bg-white border border-stone-300 rounded-lg text-xs font-medium text-stone-800"
            >
              <SlidersHorizontal size={14} />
              <span>Filters</span>
            </button>

            {/* In-Stock Toggle (Desktop) */}
            <label className="hidden md:flex items-center gap-2 text-xs text-stone-700 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
                className="rounded border-stone-300 text-stone-900 focus:ring-stone-900"
              />
              <span>In Stock Only</span>
            </label>

            {/* Sort Selector */}
            <div className="relative flex items-center">
              <ArrowUpDown size={13} className="absolute left-2.5 text-stone-500 pointer-events-none" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="pl-7 pr-8 py-1.5 bg-white border border-stone-300 rounded-lg text-xs text-stone-800 focus:outline-none focus:ring-1 focus:ring-stone-900 appearance-none cursor-pointer"
              >
                <option value="featured">Featured Curations</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="newest">Newest Arrivals</option>
                <option value="rating">Patron Rating</option>
              </select>
              <ChevronDown size={12} className="absolute right-2.5 text-stone-500 pointer-events-none" />
            </div>

          </div>
        </div>

        {/* Catalog Body: Left Filter Sidebar (Desktop) + Right Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-8">
          
          {/* Left Desktop Sidebar (3 cols) */}
          <aside className="hidden md:block md:col-span-3 space-y-6 pr-4">
            
            {/* Search Input */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-stone-800">
                Search Catalog
              </label>
              <div className="relative">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                <input
                  type="text"
                  placeholder="Blazer, silk, trousers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-8 pr-3 py-2 bg-white text-xs border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-stone-900"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700"
                  >
                    <X size={13} />
                  </button>
                )}
              </div>
            </div>

            {/* Special Curations Filter */}
            <div className="space-y-2 pt-2 border-t border-stone-200">
              <span className="text-xs font-semibold uppercase tracking-wider text-stone-800 block">
                Curations
              </span>
              <div className="space-y-1 text-xs">
                <button
                  onClick={() => setSpecialFilter('all')}
                  className={`w-full text-left px-3 py-1.5 rounded-lg transition-colors flex items-center justify-between ${
                    specialFilter === 'all' ? 'bg-stone-900 text-white font-medium' : 'text-stone-700 hover:bg-stone-100'
                  }`}
                >
                  <span>All Curations</span>
                  <span className="text-[11px] opacity-70">{PRODUCTS.length}</span>
                </button>
                <button
                  onClick={() => setSpecialFilter('new')}
                  className={`w-full text-left px-3 py-1.5 rounded-lg transition-colors flex items-center justify-between ${
                    specialFilter === 'new' ? 'bg-stone-900 text-white font-medium' : 'text-stone-700 hover:bg-stone-100'
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    <Sparkles size={12} className={specialFilter === 'new' ? 'text-amber-300' : 'text-amber-600'} />
                    <span>New Arrivals</span>
                  </span>
                  <span className="text-[11px] opacity-70">{newCount}</span>
                </button>
                <button
                  onClick={() => setSpecialFilter('sale')}
                  className={`w-full text-left px-3 py-1.5 rounded-lg transition-colors flex items-center justify-between ${
                    specialFilter === 'sale' ? 'bg-stone-900 text-white font-medium' : 'text-stone-700 hover:bg-stone-100'
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    <Tag size={12} className={specialFilter === 'sale' ? 'text-rose-300' : 'text-rose-600'} />
                    <span>Sale Pieces</span>
                  </span>
                  <span className="text-[11px] opacity-70">{saleCount}</span>
                </button>
                <button
                  onClick={() => setSpecialFilter('wishlist')}
                  className={`w-full text-left px-3 py-1.5 rounded-lg transition-colors flex items-center justify-between ${
                    specialFilter === 'wishlist' ? 'bg-stone-900 text-white font-medium' : 'text-stone-700 hover:bg-stone-100'
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    <Heart size={12} className={specialFilter === 'wishlist' ? 'fill-white text-white' : 'fill-rose-500 text-rose-500'} />
                    <span>Saved to Wishlist</span>
                  </span>
                  <span className="text-[11px] opacity-70">{wishlist.length}</span>
                </button>
              </div>
            </div>

            {/* Price Range Slider */}
            <div className="space-y-2 pt-2 border-t border-stone-200">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold uppercase tracking-wider text-stone-800">Max Price</span>
                <span className="font-medium text-stone-900 tabular-nums">${priceMax}</span>
              </div>
              <input
                type="range"
                min="30"
                max="200"
                step="5"
                value={priceMax}
                onChange={(e) => setPriceMax(Number(e.target.value))}
                className="w-full accent-stone-900 cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-stone-400">
                <span>$30</span>
                <span>$200</span>
              </div>
            </div>

            {/* Direct WhatsApp Ordering Perks Box */}
            <div className="p-4 bg-emerald-50/70 rounded-2xl border border-emerald-200/80 space-y-2 text-xs">
              <div className="font-semibold text-emerald-950 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#25D366]"></span>
                <span>WhatsApp Ordering Guide</span>
              </div>
              <p className="text-emerald-900/80 leading-relaxed font-light text-[11px]">
                Click any garment to review fabric and fit, or click the green WhatsApp icon to immediately dispatch a personalized order inquiry to our boutique concierge.
              </p>
            </div>

            {/* Reset Filter Button */}
            {(selectedCategory !== 'All' || searchQuery || priceMax < 200 || inStockOnly || specialFilter !== 'all') && (
              <button
                onClick={handleResetFilters}
                className="w-full py-2 bg-stone-200 hover:bg-stone-300 text-stone-800 rounded-lg text-xs font-medium uppercase tracking-wider transition-colors"
              >
                Reset All Filters
              </button>
            )}

          </aside>

          {/* Right Product Grid (9 cols) */}
          <main className="md:col-span-9">
            {filteredProducts.length === 0 ? (
              <div className="py-20 text-center space-y-4 bg-white rounded-2xl border border-stone-200 p-8">
                <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center text-stone-400 mx-auto">
                  {specialFilter === 'wishlist' ? <Heart size={24} className="text-rose-400" /> : <Search size={24} />}
                </div>
                <div className="space-y-1">
                  <h3 className="font-serif text-2xl font-medium text-stone-900">
                    {specialFilter === 'wishlist' ? 'Your Wishlist is Empty' : 'No matching garments found'}
                  </h3>
                  <p className="text-xs text-stone-500 max-w-sm mx-auto">
                    {specialFilter === 'wishlist'
                      ? 'Browse our collections and tap the heart icon on any piece to save it here for later.'
                      : 'Try adjusting your search query, raising your price limit, or resetting filters.'}
                  </p>
                </div>
                <button
                  onClick={handleResetFilters}
                  className="px-6 py-2.5 bg-stone-900 text-white rounded-lg text-xs uppercase tracking-wider font-semibold hover:bg-stone-800 transition-colors"
                >
                  {specialFilter === 'wishlist' ? 'Explore Full Collection' : 'Clear All Filters'}
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                {filteredProducts.map((prod) => (
                  <ProductCard key={prod.id} product={prod} />
                ))}
              </div>
            )}
          </main>

        </div>

      </div>

      {/* Mobile Filters Modal */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex justify-end">
          <div className="w-full max-w-xs bg-[#FAF8F5] h-full p-6 shadow-2xl overflow-y-auto space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-stone-200">
              <h3 className="font-serif text-lg font-semibold text-stone-900">Filters</h3>
              <button onClick={() => setMobileFilterOpen(false)} className="p-1 text-stone-500">
                <X size={20} />
              </button>
            </div>

            {/* Special Filter */}
            <div className="space-y-2">
              <div className="text-xs font-semibold uppercase tracking-wider text-stone-800">Curations</div>
              <div className="flex flex-col space-y-1 text-xs">
                <button
                  onClick={() => setSpecialFilter('all')}
                  className={`text-left py-1.5 px-2 rounded ${specialFilter === 'all' ? 'bg-stone-900 text-white font-medium' : 'text-stone-700'}`}
                >
                  All Curations
                </button>
                <button
                  onClick={() => setSpecialFilter('new')}
                  className={`text-left py-1.5 px-2 rounded ${specialFilter === 'new' ? 'bg-stone-900 text-white font-medium' : 'text-stone-700'}`}
                >
                  New Arrivals ({newCount})
                </button>
                <button
                  onClick={() => setSpecialFilter('sale')}
                  className={`text-left py-1.5 px-2 rounded ${specialFilter === 'sale' ? 'bg-stone-900 text-white font-medium' : 'text-stone-700'}`}
                >
                  Sale Pieces ({saleCount})
                </button>
                <button
                  onClick={() => setSpecialFilter('wishlist')}
                  className={`text-left py-1.5 px-2 rounded ${specialFilter === 'wishlist' ? 'bg-stone-900 text-white font-medium' : 'text-stone-700'}`}
                >
                  Saved Wishlist ({wishlist.length})
                </button>
              </div>
            </div>

            {/* Category */}
            <div className="space-y-2">
              <div className="text-xs font-semibold uppercase tracking-wider text-stone-800">Categories</div>
              <div className="flex flex-col space-y-1 text-xs">
                <button
                  onClick={() => {
                    handleCategoryChange('All');
                  }}
                  className={`text-left py-1.5 px-2 rounded ${selectedCategory === 'All' ? 'bg-stone-900 text-white font-medium' : 'text-stone-700'}`}
                >
                  All Items
                </button>
                {CATEGORIES.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => {
                      handleCategoryChange(c.name);
                    }}
                    className={`text-left py-1.5 px-2 rounded ${selectedCategory === c.name ? 'bg-stone-900 text-white font-medium' : 'text-stone-700'}`}
                  >
                    {c.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Price */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="font-semibold uppercase tracking-wider text-stone-800">Max Price</span>
                <span className="font-medium tabular-nums">${priceMax}</span>
              </div>
              <input
                type="range"
                min="30"
                max="200"
                step="5"
                value={priceMax}
                onChange={(e) => setPriceMax(Number(e.target.value))}
                className="w-full accent-stone-900"
              />
            </div>

            {/* Stock */}
            <label className="flex items-center gap-2 text-xs text-stone-700">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
                className="rounded border-stone-300 text-stone-900"
              />
              <span>In Stock Only</span>
            </label>

            <button
              onClick={() => setMobileFilterOpen(false)}
              className="w-full py-3 bg-stone-900 text-white rounded-xl text-xs uppercase tracking-wider font-semibold"
            >
              Apply Filters ({filteredProducts.length} items)
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
