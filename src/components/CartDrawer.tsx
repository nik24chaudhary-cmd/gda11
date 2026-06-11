import React, { useState } from 'react';
import { CartItem, FABRICS, WOODS } from '../types';
import { X, Calendar, Phone, Landmark, MapPin, SlidersHorizontal, ChevronRight, Info, Trash2 } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onRemoveItem: (id: string) => void;
  onSubmitConsultation: (details: {
    name: string;
    email: string;
    address: string;
    consultType: string;
    notes: string;
  }) => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onRemoveItem,
  onSubmitConsultation,
}: CartDrawerProps) {
  // Consultation form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [consultType, setConsultType] = useState('phone-call');
  const [notes, setNotes] = useState('');

  if (!isOpen) return null;

  const getFabricName = (id?: string) => {
    if (!id) return '';
    return FABRICS.find((f) => f.id === id)?.name || id;
  };

  const getWoodName = (id?: string) => {
    if (!id) return '';
    return WOODS.find((w) => w.id === id)?.name || id;
  };

  const calculateTotal = () => {
    return cartItems.reduce((acc, item) => acc + item.totalPrice, 0);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !address) return;
    onSubmitConsultation({ name, email, address, consultType, notes });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden font-sans">
      {/* Dark Overlay */}
      <div
        className="absolute inset-0 bg-brand-charcoal/40 backdrop-blur-xs transition-opacity duration-500"
        onClick={onClose}
      />

      {/* Slide-out Drawer Panel */}
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-brand-cream border-l border-brand-clay/35 shadow-2xl flex flex-col justify-between animate-fade-in-up md:animate-none">
          
          {/* Header */}
          <div className="px-6 py-6 border-b border-brand-clay/20 flex items-center justify-between bg-white">
            <div>
              <h3 className="font-serif text-lg text-brand-charcoal font-normal flex items-center gap-2">
                Bespoke Portfolio Inquiry
              </h3>
              <span className="block text-[9px] font-mono tracking-widest text-brand-bronze uppercase mt-0.5">
                {cartItems.length} curated commissions selected
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-brand-sand/50 text-brand-charcoal hover:text-brand-bronze border border-brand-clay/20 cursor-pointer"
              id="btn-close-cart"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Cart Item Stack or Empty State */}
          <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
            {cartItems.length === 0 ? (
              <div className="h-4/5 flex flex-col items-center justify-center text-center space-y-6 px-4">
                <div className="w-12 h-12 rounded-full border border-brand-clay/50 flex items-center justify-center bg-white">
                  <SlidersHorizontal className="w-4 h-4 text-brand-bronze/40" />
                </div>
                <div>
                  <h4 className="font-serif text-base text-brand-charcoal">Your portfolio is uncommissioned</h4>
                  <p className="text-xs text-brand-charcoal/60 mt-2 leading-relaxed">
                    Explore the collection or visit the Bespoke Studio to customize and design your premium signature furniture piece.
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="bg-brand-charcoal text-brand-cream hover:bg-brand-bronze transition-colors py-3 px-6 text-[10px] tracking-widest font-mono font-medium uppercase cursor-pointer"
                  id="btn-empty-cart-explore"
                >
                  Return to Studio
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                
                {/* Chosen Pieces List */}
                <div className="space-y-4">
                  <span className="font-mono text-[9px] uppercase tracking-widest text-brand-charcoal/50 block">PROPOSED ITEMS</span>
                  
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="bg-white border border-brand-clay/25 p-4 flex gap-4 pr-10 relative group"
                      id={`cart-item-${item.id}`}
                    >
                      {/* Thumbnail */}
                      <div className="w-16 h-16 bg-brand-sand shrink-0 overflow-hidden self-center border border-brand-clay/25">
                        <img
                          src={item.furniture.image}
                          alt={item.furniture.name}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>

                      {/* Detail Column */}
                      <div className="space-y-1.5 flex-1">
                        <h5 className="font-serif text-sm text-brand-charcoal leading-tight">
                          {item.furniture.name}
                        </h5>
                        <span className="block font-serif text-[13px] text-brand-bronze font-medium leading-none">
                          {formatPrice(item.totalPrice)}
                        </span>

                        {/* Custom configuration breakdown if present */}
                        {item.customOptions && (
                          <div className="font-mono text-[8.5px] leading-relaxed text-brand-charcoal/60 space-y-0.5 border-t border-brand-clay/10 pt-1.5 mt-1.5">
                            <span className="block">Fabric: <span className="font-sans font-medium text-brand-charcoal">{getFabricName(item.customOptions.fabricId)}</span></span>
                            <span className="block">Base Frame: <span className="font-sans font-medium text-brand-charcoal">{getWoodName(item.customOptions.woodId)}</span></span>
                            {item.customOptions.pillow && <span className="block text-emerald-800 font-semibold">• Included Accent Throw Pillow</span>}
                            {item.customOptions.monogram && (
                              <span className="block text-[#B97A60] font-semibold">
                                • Brass Monogram Plaque: "{item.customOptions.monogram}"
                              </span>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Delete item */}
                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="absolute right-3 top-3 text-brand-charcoal/30 hover:text-brand-terracotta cursor-pointer p-1"
                        title="Remove piece"
                        id={`btn-remove-${item.id}`}
                      >
                        <Trash2 className="w-3.5 h-3.5 stroke-[1.5]" />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Pricing Summary */}
                <div className="bg-[#FAF7F2] p-4 border border-brand-clay/25 space-y-2">
                  <div className="flex justify-between items-baseline">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-brand-charcoal/60">Estimated Cost</span>
                    <span className="font-serif text-lg text-brand-charcoal font-medium">
                      {formatPrice(calculateTotal())}
                    </span>
                  </div>
                  <div className="text-[9px] font-mono leading-relaxed text-brand-charcoal/40 border-t border-brand-clay/10 pt-2 flex items-center gap-1.5">
                    <Info className="w-3.5 h-3.5 text-brand-bronze shrink-0" />
                    <span>Includes white-glove custom spacing consultation.</span>
                  </div>
                </div>

                {/* Direct Consultation Request Form */}
                <form onSubmit={handleSubmit} className="space-y-4 border-t border-brand-clay/20 pt-6">
                  <span className="font-mono text-[9px] uppercase tracking-widest text-brand-charcoal/50 block">BESPOKE SCHEDULING DETAILS</span>
                  
                  {/* Name field */}
                  <div className="flex flex-col space-y-1">
                    <label className="text-[9px] font-mono text-brand-charcoal/65 uppercase">Inquirer Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="Your full name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="border border-brand-clay bg-white p-2.5 text-xs focus:outline-hidden focus:border-brand-bronze font-sans rounded-2xs"
                      id="input-cart-name"
                    />
                  </div>

                  {/* Email field */}
                  <div className="flex flex-col space-y-1">
                    <label className="text-[9px] font-mono text-brand-charcoal/65 uppercase">Direct Contact Email *</label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. name@residence.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="border border-brand-clay bg-white p-2.5 text-xs focus:outline-hidden focus:border-brand-bronze font-sans rounded-2xs"
                      id="input-cart-email"
                    />
                  </div>

                  {/* Residence Delivery Address field */}
                  <div className="flex flex-col space-y-1">
                    <label className="text-[9px] font-mono text-brand-charcoal/65 uppercase">Residence Physical Address *</label>
                    <textarea
                      required
                      placeholder="Destination street, city, postal index"
                      rows={2}
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="border border-brand-clay bg-white p-2.5 text-xs focus:outline-hidden focus:border-brand-bronze font-sans resize-none rounded-2xs"
                      id="input-cart-address"
                    />
                  </div>

                  {/* Consultation Format Type */}
                  <div className="flex flex-col space-y-1.5">
                    <label className="text-[9px] font-mono text-brand-charcoal/65 uppercase block">Preferred Advisory Format</label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setConsultType('phone-call')}
                        className={`p-2.5 border text-[10px] uppercase font-mono tracking-wider flex items-center justify-center gap-1.5 transition-all rounded-xs cursor-pointer ${
                          consultType === 'phone-call' 
                            ? 'bg-brand-charcoal text-brand-cream border-brand-charcoal font-semibold' 
                            : 'bg-white text-brand-charcoal/70 border-brand-clay/20 hover:border-brand-bronze'
                        }`}
                        id="btn-cart-consult-phone"
                      >
                        <Phone className="w-3 h-3" />
                        Private Call
                      </button>
                      <button
                        type="button"
                        onClick={() => setConsultType('virtual-showroom')}
                        className={`p-2.5 border text-[10px] uppercase font-mono tracking-wider flex items-center justify-center gap-1.5 transition-all rounded-xs cursor-pointer ${
                          consultType === 'virtual-showroom' 
                            ? 'bg-brand-charcoal text-brand-cream border-brand-charcoal font-semibold' 
                            : 'bg-white text-brand-charcoal/70 border-brand-clay/20 hover:border-brand-bronze'
                        }`}
                        id="btn-cart-consult-showroom"
                      >
                        <Landmark className="w-3 h-3" />
                        Video Room
                      </button>
                    </div>
                  </div>

                  {/* Optional Notes */}
                  <div className="flex flex-col space-y-1">
                    <label className="text-[9px] font-mono text-brand-charcoal/65 uppercase">Special Architectural / Dimension Requests</label>
                    <textarea
                      placeholder="E.g., custom wood grain query, specific room lighting constraints"
                      rows={2}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="border border-brand-clay bg-white p-2.5 text-xs focus:outline-hidden focus:border-brand-bronze font-sans resize-none rounded-2xs"
                      id="input-cart-notes"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full bg-[#1C1A19] hover:bg-[#8E7A5F] text-brand-cream py-4 px-6 text-xs tracking-[0.25em] font-medium uppercase text-center flex items-center justify-center gap-2 mt-4 transition-colors duration-300 shadow-md cursor-pointer"
                    id="btn-submit-cart-consult"
                  >
                    Request Design Arena consultation
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>

                </form>

              </div>
            )}
          </div>

          {/* Luxury Signature Footer */}
          <div className="p-6 bg-white border-t border-brand-clay/25 text-[8.5px] font-mono text-brand-charcoal/40 text-center select-none">
            <span>GLOBAL DESIGN ARENA COMMISSIONS SECURED BY RSA-256 ENCRYPTION</span>
          </div>

        </div>
      </div>
    </div>
  );
}
