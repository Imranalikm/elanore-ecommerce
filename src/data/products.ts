import { Product } from '../types';
import { fashionImages } from './productImages';

export const CATEGORIES = [
  { name: 'Dresses', image: fashionImages.catDresses, count: 8 },
  { name: 'Tops', image: fashionImages.catTops, count: 14 },
  { name: 'Bottoms', image: fashionImages.catBottoms, count: 11 },
  { name: 'Bags', image: fashionImages.catBags, count: 6 },
  { name: 'Accessories', image: fashionImages.catAccessories, count: 9 },
  { name: 'Blazers', image: fashionImages.catBlazers, count: 7 },
  { name: 'Shoes', image: fashionImages.catShoes, count: 5 },
] as const;

export const PRODUCTS: Product[] = [
  {
    id: 'ribbed-knit-top',
    name: 'Ribbed Knit Top',
    category: 'Tops',
    price: 49.00,
    originalPrice: 65.00,
    description: 'A timeless wardrobe foundation. Sculpted from ultra-soft stretch modal ribbed knit, this sleeveless high-neck top delivers effortless elegance whether tucked into tailored trousers or worn under an oversized blazer.',
    details: [
      'High mock neckline with subtle rolled trim',
      'Flattering form-skimming cut',
      'Ultra-fine vertical rib texture',
      'Seamless hem finishes for a sleek silhouette'
    ],
    fabric: '92% MicroModal, 8% Elastane (GOTS Certified Organic)',
    care: 'Hand wash cold or gentle machine wash inside out; lay flat to dry',
    inStock: true,
    stockCount: 8,
    rating: 4.9,
    reviewsCount: 38,
    isNew: true,
    isBestseller: true,
    colors: [
      { name: 'Ivory', hex: '#FAF8F5' },
      { name: 'Oatmeal', hex: '#E6DCCF' },
      { name: 'Noir Black', hex: '#1C1A18' }
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    image: fashionImages.ribbedKnitTop,
    gallery: [fashionImages.ribbedKnitTop, fashionImages.heroBlazerModel, fashionImages.insta3]
  },
  {
    id: 'oversized-blazer',
    name: 'Oversized Blazer',
    category: 'Blazers',
    price: 89.00,
    originalPrice: 120.00,
    description: 'Tailored with sharp precision and intentional drape. Inspired by masculine sartorial lines, this oversized blazer creates an instantly authoritative yet effortless statement silhouette.',
    details: [
      'Notched lapels with hand-finished pick stitching',
      'Lightweight internal shoulder pads for structured lift',
      'Functional front flap pockets & interior chest welt',
      'Tortoiseshell horn buttons at front and cuffs'
    ],
    fabric: '68% Recycled Polyester, 28% Viscose, 4% Spandex; Lining: 100% Cupro',
    care: 'Dry clean only',
    inStock: true,
    stockCount: 5,
    rating: 5.0,
    reviewsCount: 64,
    isNew: true,
    isBestseller: true,
    colors: [
      { name: 'Camel Taupe', hex: '#BCA48C' },
      { name: 'Warm Cream', hex: '#EFEAE1' },
      { name: 'Charcoal', hex: '#3B3A36' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    image: fashionImages.oversizedBlazer,
    gallery: [fashionImages.oversizedBlazer, fashionImages.heroBlazerModel, fashionImages.insta1]
  },
  {
    id: 'classic-white-shirt',
    name: 'Classic White Shirt',
    category: 'Tops',
    price: 59.00,
    description: 'Crisp organic cotton poplin tailored to modern perfection. Features relaxed dropped shoulders, an architectural pointed collar, and elongated French cuffs for a relaxed yet polished feel.',
    details: [
      'Relaxed boyfriend cut with curved shirttail hem',
      'Mother-of-pearl buttons along hidden placket',
      'Reinforced single patch pocket on chest',
      'Box pleat at back yoke for fluid drape'
    ],
    fabric: '100% Long-Staple Organic Cotton Poplin (120s two-ply)',
    care: 'Machine wash warm, tumble dry low, warm iron while slightly damp',
    inStock: true,
    stockCount: 12,
    rating: 4.8,
    reviewsCount: 42,
    isNew: true,
    colors: [
      { name: 'Crisp White', hex: '#FFFFFF' },
      { name: 'Sky Stripe', hex: '#D7E3EB' }
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    image: fashionImages.classicWhiteShirt,
    gallery: [fashionImages.classicWhiteShirt, fashionImages.ribbedKnitTop]
  },
  {
    id: 'tailored-wide-leg-pants',
    name: 'Tailored Wide Leg Pants',
    category: 'Bottoms',
    price: 79.00,
    originalPrice: 98.00,
    description: 'The pinnacle of relaxed tailoring. High-rise waist with fluid double front pleats that cascade into a sweeping wide-leg silhouette. Pairs effortlessly with fitted knitwear or coordinated blazers.',
    details: [
      'High-rise waist with extended tab closure and interior stay button',
      'Double front pleats creating volume and movement',
      'Full-length hem designed to pool slightly over shoes',
      'Slanted side pockets and rear welt pocket'
    ],
    fabric: '70% TENCEL™ Lyocell, 30% Linen',
    care: 'Dry clean recommended or machine wash cold on delicate cycle',
    inStock: true,
    stockCount: 6,
    rating: 4.9,
    reviewsCount: 51,
    isNew: true,
    isBestseller: true,
    colors: [
      { name: 'Sand Beige', hex: '#D9CCBF' },
      { name: 'Noir Black', hex: '#1C1A18' },
      { name: 'Olive Green', hex: '#666B59' }
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    image: fashionImages.tailoredWidePants,
    gallery: [fashionImages.tailoredWidePants, fashionImages.heroBlazerModel]
  },
  {
    id: 'silk-slip-maxi-dress',
    name: 'Silk Slip Maxi Dress',
    category: 'Dresses',
    price: 119.00,
    originalPrice: 149.00,
    description: 'Sensual and understated. Cut on the bias from liquid silk charmeuse, this floor-sweeping gown drapes along the contours of the body with effortless, fluid grace.',
    details: [
      'Delicate adjustable micro spaghetti straps',
      'Gentle cowl neckline with soft rolled edges',
      'Bias-cut construction for an effortless feminine drape',
      'Side walking slit for subtle movement'
    ],
    fabric: '100% Grade 6A Mulberry Silk Charmeuse (19 momme)',
    care: 'Dry clean or hand wash cold using pH-neutral silk wash',
    inStock: true,
    stockCount: 4,
    rating: 5.0,
    reviewsCount: 29,
    isNew: false,
    isBestseller: true,
    colors: [
      { name: 'Noir Black', hex: '#141210' },
      { name: 'Champagne Silk', hex: '#EDE4D8' },
      { name: 'Deep Espresso', hex: '#392C23' }
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    image: fashionImages.silkSlipDress,
    gallery: [fashionImages.silkSlipDress, fashionImages.promoSummerEssentials]
  },
  {
    id: 'structured-leather-handbag',
    name: 'Structured Leather Shoulder Bag',
    category: 'Bags',
    price: 135.00,
    originalPrice: 160.00,
    description: 'Handcrafted in Florence from supple grained calfskin. A sculptural trapezoid silhouette adorned with custom brushed gold hardware and an adaptable shoulder strap.',
    details: [
      'Magnetic turn-lock clasp in brushed 18k gold plate',
      'Dual compartments with zippered interior pouch',
      'Detachable and adjustable cross-body leather strap',
      'Microfiber suede lining with ÉLANORA embossed leather patch'
    ],
    fabric: '100% Full-Grain Italian Calf Leather',
    care: 'Wipe with soft damp cloth; treat with leather balm twice yearly',
    inStock: true,
    stockCount: 7,
    rating: 4.9,
    reviewsCount: 33,
    isNew: false,
    isBestseller: true,
    colors: [
      { name: 'Cream Latte', hex: '#FAF7F2' },
      { name: 'Caramel Tan', hex: '#B88B58' },
      { name: 'Noir Pebble', hex: '#21201E' }
    ],
    sizes: ['One Size'],
    image: fashionImages.leatherHandbag,
    gallery: [fashionImages.leatherHandbag, fashionImages.promoAccessoryEdit]
  },
  {
    id: 'twisted-gold-hoops',
    name: 'Twisted Gold Hoop Earrings',
    category: 'Accessories',
    price: 38.00,
    description: 'Substantial yet feather-light. Intertwined tubular hoops coated in a thick layer of 18-karat gold vermeil over sterling silver for radiant, tarnish-resistant daily wear.',
    details: [
      '22mm outer diameter with hollow lightweight core',
      'Hinged snap-bar back clasp for all-day comfort',
      'Hypoallergenic, nickel-free and lead-free',
      'Mirror high-polish finish with hand-twisted ridge details'
    ],
    fabric: '18k Gold Vermeil (2.5 micron) on 925 Sterling Silver',
    care: 'Store in ÉLANORA anti-tarnish pouch; avoid direct perfume or chlorine',
    inStock: true,
    stockCount: 15,
    rating: 4.9,
    reviewsCount: 78,
    isNew: false,
    colors: [
      { name: '18k Yellow Gold', hex: '#DFB469' },
      { name: 'Sterling Silver', hex: '#D6D6D6' }
    ],
    sizes: ['One Size'],
    image: fashionImages.twistedHoops,
    gallery: [fashionImages.twistedHoops]
  },
  {
    id: 'minimalist-leather-sneakers',
    name: 'Minimalist Leather Sneakers',
    category: 'Shoes',
    price: 115.00,
    description: 'The epitome of refined casual footwear. Seamless white nappa leather accented with a subtle camel suede heel tab and padded memory foam insoles for unmatched walking comfort.',
    details: [
      'Buttery soft Italian nappa calfskin upper',
      'Margom-style natural rubber cupsole for longevity',
      'Waxed cotton tonal laces with debossed metal aglets',
      'Ergonomic memory-foam arch support insole'
    ],
    fabric: '100% Calf Leather; 100% Natural Rubber Sole',
    care: 'Use sneaker cleaning foam; store with cedar shoe trees',
    inStock: true,
    stockCount: 4,
    rating: 4.8,
    reviewsCount: 22,
    isNew: true,
    colors: [
      { name: 'Optic White', hex: '#FFFFFF' },
      { name: 'Sand & White', hex: '#F0E9DF' }
    ],
    sizes: ['36 (US 6)', '37 (US 6.5)', '38 (US 7.5)', '39 (US 8.5)', '40 (US 9)', '41 (US 10)'],
    image: fashionImages.whiteSneakers,
    gallery: [fashionImages.whiteSneakers]
  },
  {
    id: 'minimalist-trench-coat',
    name: 'Minimalist Linen Trench Coat',
    category: 'Blazers',
    price: 165.00,
    originalPrice: 195.00,
    description: 'A relaxed reinterpretation of the iconic trench. Cut from heavyweight washed Belgian linen that softens with every wear, complete with raglan sleeves and a self-tie sash belt.',
    details: [
      'Unstructured relaxed fit with exaggerated storm flaps',
      'Wide welt pockets and adjustable buckled sleeve tabs',
      'Detachable sash belt with hand-tied closure',
      'Ventilated back storm shield with hidden horn button'
    ],
    fabric: '100% Belgian Washed Linen (340 gsm)',
    care: 'Dry clean or machine wash cold gentle; hang dry in shade',
    inStock: true,
    stockCount: 3,
    rating: 5.0,
    reviewsCount: 19,
    isNew: true,
    colors: [
      { name: 'Sand Oat', hex: '#CEBAA5' },
      { name: 'Deep Sage', hex: '#585D52' }
    ],
    sizes: ['XS/S', 'M/L'],
    image: fashionImages.minimalistTrench,
    gallery: [fashionImages.minimalistTrench, fashionImages.heroBlazerModel]
  }
];

export const TESTIMONIALS = [
  {
    id: 1,
    quote: 'The quality is incredible and the styles are so timeless. ÉLANORA is my go-to for everything! Ordering directly on WhatsApp was shockingly smooth—their stylist answered my sizing questions in 2 minutes.',
    author: 'Sophia L.',
    city: 'New York, NY',
    rating: 5
  },
  {
    id: 2,
    quote: 'Beautiful pieces, fast shipping, and amazing customer service. Highly recommend! Not having to fill out a 20-field checkout form and just having a personal concierge handle the order is luxury.',
    author: 'Jessica M.',
    city: 'London, UK',
    rating: 5
  },
  {
    id: 3,
    quote: 'I feel so confident in everything I’ve ordered. The blazer and wide-leg trousers have become my daily uniform. Worth every single penny.',
    author: 'Ava T.',
    city: 'Sydney, AU',
    rating: 5
  },
  {
    id: 4,
    quote: 'The liquid silk slip dress draped like it was tailor-made for me. Being able to confirm fabric care and ask the stylist for styling tips before dispatch made the entire experience unmatched.',
    author: 'Camille B.',
    city: 'Paris, FR',
    rating: 5
  },
  {
    id: 5,
    quote: 'Exceeded all expectations! The nappa leather bag is structured perfection, and the twisted gold hoops feel so substantial yet light. Instant WhatsApp checkout is the future of fashion shopping.',
    author: 'Elena R.',
    city: 'Milan, IT',
    rating: 5
  },
  {
    id: 6,
    quote: 'Delighted with my capsule wardrobe pieces! Free delivery arrived impeccably wrapped in branded garment dust bags. The attention to detail from the WhatsApp team was extraordinary.',
    author: 'Charlotte K.',
    city: 'Toronto, CA',
    rating: 5
  }
];
