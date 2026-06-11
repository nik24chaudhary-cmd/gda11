import { useState } from 'react';
import { FURNITURE_ITEMS } from '../furnitureData';
import { FurnitureItem } from '../types';
import { Eye, Sliders, ShoppingBag, X, Calendar, MapPin, Minimize, FileText } from 'lucide-react';

interface CatalogProps {
  onConfigureItem: (item: FurnitureItem) => void;
  onAddToCart: (item: FurnitureItem) => void;
}

export default function Catalog({ onConfigureItem, onAddToCart }: CatalogProps) {
  const [activeCategory, setActiveCategory] = useState<'all' | 'seating' | 'tables' | 'lighting'>('all');
  const [selectedItem, setSelectedItem] = useState<FurnitureItem | null>(null);

  const categories = [
    { id: 'all', name: 'All Pieces' },
    { id: 'seating', name: 'Seating' },
    { id: 'tables', name: 'Tables' },
    { id: 'lighting', name: 'Lighting' },
  ];

  const filteredItems = activeCategory === 'all'
    ? FURNITURE_ITEMS
    : FURNITURE_ITEMS.filter(item => item.category === activeCategory);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <section id="catalog" className="py-24 bg-brand-cream border-b border-brand-clay/35">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="font-mono text-[9px] tracking-[0.4em] uppercase text-brand-bronze block mb-4">
            Curated Catalogue
          </span>
          <h2 className="font-serif text-3xl md:text-4xl text-brand-charcoal font-normal">
            The Autumn Gathering
          </h2>
          <div className="w-12 h-[1px] bg-brand-clay/60 mx-auto mt-4 mb-4" />
          <p className="font-sans text-brand-charcoal/70 text-xs md:text-sm leading-relaxed font-light">
            Each commission is tailored to order. Browse our core signature series, featuring honest geometries and tactile materials.
          </p>
        </div>

        {/* Filter Navigation */}
        <div className="flex justify-center space-x-1 sm:space-x-4 mb-16 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id as any)}
              className={`px-4 sm:px-6 py-2.5 text-[10px] tracking-[0.25em] uppercase font-medium transition-all duration-300 border cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-brand-charcoal text-brand-cream border-brand-charcoal shadow-sm'
                  : 'bg-white text-brand-charcoal/70 border-brand-clay/30 hover:border-brand-bronze'
              }`}
              id={`cat-filter-${cat.id}`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="group bg-white border border-brand-clay/30 overflow-hidden shadow-xs hover:shadow-md transition-all duration-500 flex flex-col justify-between"
              id={`furniture-card-${item.id}`}
            >
              {/* Image Container with Reveal effects */}
              <div className="relative overflow-hidden aspect-[4/3] bg-brand-sand/40">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover select-none transition-transform duration-1000 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                
                {/* Specs Layer Trigger */}
                <div className="absolute inset-0 bg-brand-charcoal/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-4">
                  <button
                    onClick={() => setSelectedItem(item)}
                    className="p-3 bg-brand-cream hover:bg-brand-sand text-brand-charcoal hover:text-brand-bronze shadow-lg rounded-full transition-all duration-200 cursor-pointer"
                    title="View Details"
                    id={`btn-view-${item.id}`}
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  {item.customizable ? (
                    <button
                      onClick={() => onConfigureItem(item)}
                      className="p-3 bg-brand-cream hover:bg-brand-sand text-brand-charcoal hover:text-brand-bronze shadow-lg rounded-full transition-all duration-200 cursor-pointer"
                      title="Analyse Customisation Options"
                      id={`btn-configure-${item.id}`}
                    >
                      <Sliders className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      onClick={() => onAddToCart(item)}
                      className="p-3 bg-brand-cream hover:bg-brand-sand text-brand-charcoal hover:text-brand-bronze shadow-lg rounded-full transition-all duration-200 cursor-pointer"
                      title="Inquire Piece"
                      id={`btn-add-non-cust-${item.id}`}
                    >
                      <ShoppingBag className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {item.customizable && (
                  <span className="absolute top-3 right-3 bg-brand-cream/90 backdrop-blur-xs py-1 px-2.5 border border-brand-clay/35 text-[8px] font-mono tracking-widest text-[#B97A60] font-semibold uppercase">
                    Configurable
                  </span>
                )}
              </div>

              {/* Informational Footer */}
              <div className="p-6 flex flex-col justify-between flex-grow">
                <div>
                  <span className="text-[9px] font-mono tracking-widest uppercase text-brand-bronze/80 block mb-1">
                    {item.category}
                  </span>
                  <h3 className="font-serif text-[15px] sm:text-base text-brand-charcoal group-hover:text-brand-bronze transition-colors font-normal leading-snug">
                    {item.name}
                  </h3>
                </div>

                <div className="mt-4 pt-4 border-t border-brand-clay/10 flex items-center justify-between">
                  <span className="font-serif font-medium text-brand-charcoal">
                    {formatPrice(item.price)}
                  </span>
                  <button
                    onClick={() => setSelectedItem(item)}
                    className="text-[9px] tracking-widest uppercase font-mono text-brand-charcoal/60 hover:text-brand-bronze transition-colors cursor-pointer"
                    id={`btn-spec-view-${item.id}`}
                  >
                    View Specs →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Minimalist Details Overlay Modal */}
        {selectedItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-charcoal/60 backdrop-blur-xs animate-fade-in">
            <div 
              className="bg-brand-cream border border-brand-clay/50 w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl relative grid grid-cols-1 md:grid-cols-12 animate-fade-in-up"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 z-50 p-2 bg-brand-cream hover:bg-brand-sand border border-brand-clay text-brand-charcoal hover:text-brand-bronze cursor-pointer"
                id="btn-close-modal"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Left Column: Image & Origin Details */}
              <div className="col-span-12 md:col-span-6 bg-brand-sand relative min-h-[300px]">
                <img
                  src={selectedItem.image}
                  alt={selectedItem.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                
                {/* Geo Tag Label */}
                <div className="absolute bottom-4 left-4 bg-brand-cream/95 backdrop-blur-xs p-3 border border-brand-clay/40 text-[9px] font-mono text-brand-charcoal flex flex-col space-y-1">
                  <span className="flex items-center gap-1 font-semibold text-brand-bronze">
                    <MapPin className="w-3 h-3" />
                    ORIGIN: {selectedItem.specs.origin.toUpperCase()}
                  </span>
                  <span>ESTIMATED LEAD TIME: {selectedItem.specs.leadTime}</span>
                </div>
              </div>

              {/* Right Column: Narrative Story & Technical Specs */}
              <div className="col-span-12 md:col-span-6 p-8 md:p-10 flex flex-col justify-between">
                <div className="space-y-6">
                  {/* Category Name & Action Title */}
                  <div>
                    <span className="text-[9px] font-mono tracking-widest uppercase text-brand-bronze block mb-1">
                      {selectedItem.category} • Global Design Arena Heritage
                    </span>
                    <h3 className="font-serif text-2xl lg:text-3xl text-brand-charcoal font-normal">
                      {selectedItem.name}
                    </h3>
                    <span className="block font-serif text-lg text-brand-bronze font-medium mt-1">
                      {formatPrice(selectedItem.price)}
                    </span>
                  </div>

                  {/* Prose Description */}
                  <p className="text-xs lg:text-sm text-brand-charcoal/85 leading-relaxed font-sans font-light">
                    {selectedItem.description}
                  </p>

                  {/* Curated Background Story */}
                  <div className="bg-brand-sand/50 border-l-2 border-brand-bronze p-4">
                    <span className="font-mono text-[8px] uppercase tracking-widest text-brand-bronze font-semibold flex items-center gap-1.5 mb-1">
                      <FileText className="w-3 h-3" />
                      THE MATERIALL STORY
                    </span>
                    <p className="text-[11px] text-brand-charcoal/70 leading-relaxed font-light italic">
                      "{selectedItem.story}"
                    </p>
                  </div>

                  {/* Technical Specifications */}
                  <div>
                    <span className="font-mono text-[9px] uppercase tracking-wider text-brand-charcoal/50 block mb-3">
                      TECHNICAL SCHEMA
                    </span>
                    <div className="grid grid-cols-2 gap-y-3 font-mono text-[10px] text-brand-charcoal/80 border-t border-brand-clay/20 pt-3">
                      <div>
                        <span className="block text-brand-bronze uppercase text-[8px]">Dimensions</span>
                        <span className="font-sans text-[11px] font-medium mt-0.5 block">{selectedItem.specs.dimensions}</span>
                      </div>
                      <div>
                        <span className="block text-brand-bronze uppercase text-[8px]">Materials</span>
                        <span className="font-sans text-[11px] font-medium mt-0.5 block">{selectedItem.specs.material}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom interactive action button */}
                <div className="mt-8 pt-6 border-t border-brand-clay/30">
                  {selectedItem.customizable ? (
                    <button
                      onClick={() => {
                        onConfigureItem(selectedItem);
                        setSelectedItem(null);
                      }}
                      className="w-full bg-brand-charcoal text-brand-cream hover:bg-brand-bronze transition-colors py-3.5 px-6 text-xs tracking-[0.2em] font-medium uppercase text-center flex items-center justify-center gap-2 cursor-pointer"
                      id="modal-btn-to-config"
                    >
                      <Sliders className="w-4 h-4 stroke-[1.5]" />
                      Configure & Personalize
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        onAddToCart(selectedItem);
                        setSelectedItem(null);
                      }}
                      className="w-full bg-brand-charcoal text-brand-cream hover:bg-brand-bronze transition-colors py-3.5 px-6 text-xs tracking-[0.2em] font-medium uppercase text-center flex items-center justify-center gap-2 cursor-pointer"
                      id="modal-btn-to-cart"
                    >
                      <ShoppingBag className="w-4 h-4 stroke-[1.5]" />
                      Add to Portfolio inquiry
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
