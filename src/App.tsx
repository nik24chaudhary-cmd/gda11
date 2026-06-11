import { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Philosophy from './components/Philosophy';
import Catalog from './components/Catalog';
import Configurator from './components/Configurator';
import CartDrawer from './components/CartDrawer';
import ConsultationSuccessOverlay from './components/ConsultationSuccessOverlay';

import { FurnitureItem, CartItem, CustomizationOptions, FABRICS, WOODS } from './types';

export default function App() {
  // Navigation active section control
  const [activeSection, setActiveSection] = useState('hero');

  // Cart/Portfolio States
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Configurator handoff control
  const [selectedConfigItem, setSelectedConfigItem] = useState<FurnitureItem | null>(null);

  // checkout submission success triggers
  const [submittedDetails, setSubmittedDetails] = useState<{
    name: string;
    email: string;
    address: string;
    consultType: string;
    notes: string;
  } | null>(null);
  const [completedItems, setCompletedItems] = useState<CartItem[]>([]);

  // Smooth scroll handler helper
  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Triggers handoff from Catalog to Customization Studio
  const handleConfigureHandoff = (item: FurnitureItem) => {
    setSelectedConfigItem(item);
    scrollToSection('configurator');
  };

  // Standard addition to cart portfolio inquiry
  const handleAddDirectItem = (item: FurnitureItem) => {
    // Generate simple ID
    const cartItemId = `${item.id}-standard`;

    setCartItems((prevItems) => {
      const existing = prevItems.find((it) => it.id === cartItemId);
      if (existing) {
        return prevItems.map((it) =>
          it.id === cartItemId
            ? {
                ...it,
                quantity: it.quantity + 1,
                totalPrice: (it.quantity + 1) * item.price,
              }
            : it
        );
      } else {
        return [
          ...prevItems,
          {
            id: cartItemId,
            furniture: item,
            quantity: 1,
            totalPrice: item.price,
          },
        ];
      }
    });

    setIsCartOpen(true);
  };

  // Custom customized configuration addition to cart portfolio inquiry
  const handleAddCustomConfigItem = (item: FurnitureItem, options: CustomizationOptions) => {
    // Calculate custom item price modifiers
    const fabricModifier = FABRICS.find((f) => f.id === options.fabricId)?.priceModifier || 0;
    const woodModifier = WOODS.find((w) => w.id === options.woodId)?.priceModifier || 0;
    const pillowModifier = options.pillow ? 450 : 0;
    const singlePrice = item.price + fabricModifier + woodModifier + pillowModifier;

    // Create complex unique identifier preserving custom combinations
    const configHash = `${options.fabricId}-${options.woodId}-${options.pillow ? 'yes' : 'no'}-${options.monogram || 'none'}`;
    const cartItemId = `${item.id}-${configHash}`;

    setCartItems((prevItems) => {
      const existing = prevItems.find((it) => it.id === cartItemId);
      if (existing) {
        return prevItems.map((it) =>
          it.id === cartItemId
            ? {
                ...it,
                quantity: it.quantity + 1,
                totalPrice: (it.quantity + 1) * singlePrice,
              }
            : it
        );
      } else {
        return [
          ...prevItems,
          {
            id: cartItemId,
            furniture: item,
            customOptions: options,
            quantity: 1,
            totalPrice: singlePrice,
          },
        ];
      }
    });

    setIsCartOpen(true);
  };

  const handleRemoveCartItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  // On check out request submitted
  const handleConsultationSubmission = (details: {
    name: string;
    email: string;
    address: string;
    consultType: string;
    notes: string;
  }) => {
    setCompletedItems([...cartItems]);
    setSubmittedDetails(details);
    setCartItems([]); // Clear cart
    setIsCartOpen(false); // Close cart drawer
  };

  const handleCloseSuccessModal = () => {
    setSubmittedDetails(null);
    setCompletedItems([]);
    scrollToSection('hero');
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="bg-brand-cream text-brand-charcoal min-h-screen relative overflow-x-hidden selection:bg-brand-bronze selection:text-brand-cream">
      
      {/* Top sticky brand header */}
      <Header
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        onOpenConfigurator={() => scrollToSection('configurator')}
      />

      {/* Hero Showcase Layer */}
      <Hero
        onExploreClick={() => scrollToSection('catalog')}
        onCustomiseClick={() => scrollToSection('configurator')}
      />

      {/* Sustainable Craft Pillars Manifesto */}
      <Philosophy />

      {/* Catalog Grid Section with details modals */}
      <Catalog
        onConfigureItem={handleConfigureHandoff}
        onAddToCart={handleAddDirectItem}
      />

      {/* Interactive Bespoke configurator canvas space */}
      <Configurator
        initialItem={selectedConfigItem}
        onAddToCart={handleAddCustomConfigItem}
      />

      {/* Footer Branding Area */}
      <footer className="bg-brand-charcoal text-brand-cream py-16 border-t border-brand-clay/30">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 font-sans">
          
          {/* Logo & Manifesto */}
          <div className="space-y-4">
            <span className="font-serif text-xl tracking-[0.2em] uppercase font-semibold text-white block">
              Global Design Arena
            </span>
            <p className="text-xs text-brand-clay/70 leading-relaxed font-light">
              Designing silence and architectural weight for bespoke residencies and quiet sanctuaries worldwide.
            </p>
            <div className="pt-2 text-[10px] text-brand-bronze font-mono tracking-widest uppercase">
              • COPENHAGEN DESIGN STUDIO
            </div>
          </div>

          {/* Quick links catalog items */}
          <div className="space-y-4">
            <span className="text-[10px] font-mono tracking-widest uppercase text-brand-bronze block">Collection Category</span>
            <ul className="text-xs space-y-2 text-brand-clay/80 font-light">
              <li><button onClick={() => scrollToSection('catalog')} className="hover:text-brand-bronze transition-colors cursor-pointer">Lounge Seating Series</button></li>
              <li><button onClick={() => scrollToSection('catalog')} className="hover:text-brand-bronze transition-colors cursor-pointer">Monolithic Solide Stone Tables</button></li>
              <li><button onClick={() => scrollToSection('catalog')} className="hover:text-brand-bronze transition-colors cursor-pointer">Organic Mineral Dome Lighting</button></li>
              <li><button onClick={() => scrollToSection('catalog')} className="hover:text-brand-bronze transition-colors cursor-pointer">Custom Modular Loungers</button></li>
            </ul>
          </div>

          {/* Core Contacts */}
          <div className="space-y-4">
            <span className="text-[10px] font-mono tracking-widest uppercase text-brand-bronze block">Arena Showrooms</span>
            <ul className="text-xs space-y-2 text-brand-clay/80 font-light font-sans">
              <li>Kompagnistræde 14B, Copenhagen K, Denmark</li>
              <li>Sienna Hills, Rapolano Terme, Tuscany, Italy</li>
              <li>Korkeavuorenkatu 8, Helsinki, Finland</li>
              <li className="font-mono text-[9px] text-[#B97A60] font-semibold">T: +45 3312 8585 (By appointment only)</li>
            </ul>
          </div>

          {/* Copyright, index indicators */}
          <div className="space-y-4">
            <span className="text-[10px] font-mono tracking-widest uppercase text-brand-bronze block">Copyright Index</span>
            <p className="text-[11px] text-brand-clay/60 leading-relaxed font-light">
              All visual geometry representations are copy-protected under the Global Design Arena Slow-Draft Patent code 2026.
            </p>
            <span className="block font-mono text-[9px] text-brand-clay/40">
              © 2026 GLOBAL DESIGN ARENA CO.
            </span>
          </div>

        </div>
      </footer>

      {/* Slide out Inquiries Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onRemoveItem={handleRemoveCartItem}
        onSubmitConsultation={handleConsultationSubmission}
      />

      {/* Interactive Consultation Receipt Success Overlay */}
      <ConsultationSuccessOverlay
        onClose={handleCloseSuccessModal}
        inquirerDetails={submittedDetails}
        itemsOrdered={completedItems}
      />

    </div>
  );
}
