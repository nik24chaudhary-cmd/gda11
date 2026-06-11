import { useState } from 'react';
import { ShoppingBag, Menu, X, Landmark, SlidersHorizontal, Info } from 'lucide-react';

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
  activeSection: string;
  setActiveSection: (section: string) => void;
  onOpenConfigurator: () => void;
}

export default function Header({
  cartCount,
  onOpenCart,
  activeSection,
  setActiveSection,
  onOpenConfigurator,
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'hero', name: 'Arena Story' },
    { id: 'philosophy', name: 'Philosophy' },
    { id: 'catalog', name: 'Collection' },
    { id: 'configurator', name: 'Bespoke Studio' },
  ];

  const handleNavClick = (id: string) => {
    setActiveSection(id);
    setMobileMenuOpen(false);
    if (id === 'configurator') {
      onOpenConfigurator();
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-brand-cream/80 backdrop-blur-md border-b border-brand-clay/30 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <button
          onClick={() => handleNavClick('hero')}
          className="text-left group select-none"
          id="btn-header-logo"
        >
          <span className="font-serif text-lg sm:text-xl md:text-2xl tracking-[0.15em] sm:tracking-[0.25em] font-medium uppercase text-brand-charcoal transition-all group-hover:text-brand-bronze">
            Global Design Arena
          </span>
          <span className="block text-[8px] tracking-[0.45em] uppercase text-brand-bronze font-sans mt-0.5">
            Minimalist furniture
          </span>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-10 text-[11px] tracking-[0.25em] uppercase font-medium text-brand-charcoal/70">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`hover:text-brand-bronze transition-colors flex items-center gap-1.5 relative py-1 cursor-pointer ${
                activeSection === item.id ? 'text-brand-bronze' : ''
              }`}
              id={`nav-item-${item.id}`}
            >
              {item.id === 'configurator' && <SlidersHorizontal className="w-3 h-3 text-brand-bronze/70" />}
              {item.name}
              {activeSection === item.id && (
                <span className="absolute bottom-0 left-0 w-full h-[1px] bg-brand-bronze" />
              )}
            </button>
          ))}
        </nav>

        {/* Utility / Cart */}
        <div className="flex items-center space-x-6">
          <button
            onClick={onOpenCart}
            className="group relative flex items-center gap-2 text-brand-charcoal hover:text-brand-bronze transition-colors py-2 px-1 cursor-pointer"
            id="btn-header-cart"
          >
            <ShoppingBag className="w-4 h-4 stroke-[1.5]" />
            <span className="hidden sm:inline text-[9px] tracking-[0.2em] uppercase font-sans font-medium">Bespoke Inquiry</span>
            {cartCount > 0 ? (
              <span className="absolute -top-1 -right-2 bg-brand-bronze text-brand-cream text-[9px] font-sans h-4 w-4 rounded-full flex items-center justify-center font-bold">
                {cartCount}
              </span>
            ) : (
              <span className="text-[10px] text-brand-charcoal/40 font-mono font-normal">(0)</span>
            )}
          </button>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-brand-charcoal hover:text-brand-bronze transition-colors py-1 cursor-pointer"
            id="btn-mobile-menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 stroke-[1.5]" /> : <Menu className="w-5 h-5 stroke-[1.5]" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-brand-cream border-b border-brand-clay/30 px-8 py-6 flex flex-col space-y-4 animate-fade-in-up">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`text-left text-xs tracking-[0.2em] uppercase font-medium py-3 border-b border-brand-clay/10 transition-colors pointer-events-auto cursor-pointer ${
                activeSection === item.id ? 'text-brand-bronze ps-2 border-l-2 border-brand-bronze border-b-0' : 'text-brand-charcoal/70'
              }`}
              id={`mobile-nav-item-${item.id}`}
            >
              <span className="flex items-center gap-2">
                {item.id === 'configurator' && <SlidersHorizontal className="w-3.5 h-3.5" />}
                {item.id === 'philosophy' && <Info className="w-3.5 h-3.5" />}
                {item.id === 'hero' && <Landmark className="w-3.5 h-3.5" />}
                {item.name}
              </span>
            </button>
          ))}
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenCart();
            }}
            className="flex items-center gap-2 text-xs tracking-[0.2em] uppercase font-medium py-3 text-brand-bronze cursor-pointer"
            id="btn-mobile-cart-inquiry"
          >
            <ShoppingBag className="w-4 h-4 stroke-[1.5]" />
            Inquire Portfolio ({cartCount})
          </button>
        </div>
      )}
    </header>
  );
}
