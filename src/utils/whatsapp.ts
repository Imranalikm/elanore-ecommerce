import { CartItem, CustomerOrderInfo, Product } from '../types';

// Default business phone number: +91 70129 25591 (India)
export const DEFAULT_WHATSAPP_NUMBER = '917012925591';
export const WHATSAPP_STORAGE_KEY = 'elanora_whatsapp_number_v2';

export function formatPhoneNumberDisplay(num: string): string {
  const clean = num.replace(/\D/g, '');
  if (clean.startsWith('91') && clean.length === 12) {
    return `+91 ${clean.slice(2, 7)} ${clean.slice(7)}`;
  }
  if (clean.length === 10) {
    return `+91 ${clean.slice(0, 5)} ${clean.slice(5)}`;
  }
  return `+${clean}`;
}

export function getStoredWhatsAppNumber(): string {
  try {
    const saved = localStorage.getItem(WHATSAPP_STORAGE_KEY) || localStorage.getItem('elanora_whatsapp_number');
    if (!saved || saved === '15553526672') {
      return DEFAULT_WHATSAPP_NUMBER;
    }
    return saved;
  } catch {
    return DEFAULT_WHATSAPP_NUMBER;
  }
}

export function setStoredWhatsAppNumber(num: string): void {
  try {
    let clean = num.replace(/\D/g, '');
    if (clean.length === 10) {
      clean = `91${clean}`;
    }
    localStorage.setItem(WHATSAPP_STORAGE_KEY, clean || DEFAULT_WHATSAPP_NUMBER);
  } catch {
    // fallback
  }
}

export function generateOrderReference(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let ref = '';
  for (let i = 0; i < 4; i++) {
    ref += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `ELA-${ref}`;
}

export interface FormattedOrderData {
  orderRef: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  promoCode?: string;
  shipping: number;
  total: number;
  customer?: CustomerOrderInfo;
}

export function formatOrderMessage(data: FormattedOrderData): string {
  const { orderRef, items, subtotal, discount, promoCode, shipping, total, customer } = data;

  const lines: string[] = [];
  lines.push(`✨ *NEW ORDER INQUIRY — ÉLANORA* ✨`);
  lines.push(`*Order Reference:* #${orderRef}`);
  lines.push(`*Date:* ${new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`);
  lines.push(``);
  lines.push(`🛍️ *Selected Items (${items.reduce((s, i) => s + i.quantity, 0)}):*`);

  items.forEach((item, index) => {
    lines.push(
      `${index + 1}. *${item.product.name}*` +
      `\n   • Size: ${item.selectedSize} | Color: ${item.selectedColor}` +
      `\n   • Qty: ${item.quantity} × $${item.product.price.toFixed(2)} = $${(item.quantity * item.product.price).toFixed(2)}`
    );
  });

  lines.push(``);
  lines.push(`─────────────────────────`);
  lines.push(`*Subtotal:* $${subtotal.toFixed(2)}`);
  if (discount > 0) {
    lines.push(`*Privilege Discount (${promoCode || 'PROMO'}):* -$${discount.toFixed(2)}`);
  }
  lines.push(`*Estimated Delivery:* ${shipping === 0 ? 'FREE (Orders over $99)' : `$${shipping.toFixed(2)}`}`);
  lines.push(`*Estimated Total:* $${total.toFixed(2)}`);
  lines.push(`─────────────────────────`);

  if (customer && customer.name.trim()) {
    lines.push(``);
    lines.push(`👤 *Customer Details:*`);
    lines.push(`• *Name:* ${customer.name.trim()}`);
    if (customer.city.trim()) {
      lines.push(`• *Delivery City/Area:* ${customer.city.trim()}`);
    }
    if (customer.phone.trim()) {
      lines.push(`• *Phone:* ${customer.phone.trim()}`);
    }
    if (customer.address?.trim()) {
      lines.push(`• *Address:* ${customer.address.trim()}`);
    }
    const paymentLabel = 
      customer.paymentPreference === 'cash_on_delivery' ? 'Cash on Delivery (COD)' :
      customer.paymentPreference === 'bank_transfer' ? 'Direct Bank Transfer / Wire' : 'Instant Payment Link / UPI';
    lines.push(`• *Preferred Settlement:* ${paymentLabel}`);
    if (customer.notes?.trim()) {
      lines.push(`• *Special Notes:* "${customer.notes.trim()}"`);
    }
  }

  lines.push(``);
  lines.push(`💬 *Customer Request:* "Hello ÉLANORA Concierge! I would like to place this order. Please verify size availability, delivery timeline, and provide final order confirmation."`);

  return lines.join('\n');
}

export function buildWhatsAppLink(message: string, customPhone?: string): string {
  const phone = (customPhone || getStoredWhatsAppNumber()).replace(/\D/g, '');
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${phone}?text=${encoded}`;
}

export function generateSingleProductInquiryMessage(
  product: Product,
  selectedSize: string,
  selectedColor: string,
  quantity: number = 1
): string {
  const lines: string[] = [
    `✨ *PRODUCT INQUIRY — ÉLANORA* ✨`,
    `Hello! I'm interested in purchasing the following piece:`,
    ``,
    `*Item:* ${product.name}`,
    `*Category:* ${product.category}`,
    `*Size:* ${selectedSize}`,
    `*Color:* ${selectedColor}`,
    `*Quantity:* ${quantity}`,
    `*Price:* $${(product.price * quantity).toFixed(2)} ($${product.price.toFixed(2)} each)`,
    ``,
    `Could you please check availability in stock and advise on the next steps for delivery? Thank you!`
  ];
  return lines.join('\n');
}

export function generateConciergeHelpMessage(topic: string = 'General Inquiry'): string {
  return [
    `✨ *ÉLANORA STYLIST CONCIERGE* ✨`,
    `Hello! I am browsing your online boutique and would love assistance with *${topic}*.`,
    `Could you please connect me with a personal stylist?`
  ].join('\n');
}
