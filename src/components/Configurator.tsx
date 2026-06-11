import { useState, useEffect } from 'react';
import { FurnitureItem, FABRICS, WOODS, CustomizationOptions, FabricOption, WoodOption } from '../types';
import { FURNITURE_ITEMS } from '../furnitureData';
import { Sparkles, SlidersHorizontal, Calendar, Info, ShieldCheck, Check, ShoppingBag, Fingerprint } from 'lucide-react';

interface ConfiguratorProps {
  initialItem?: FurnitureItem | null;
  onAddToCart: (item: FurnitureItem, options: CustomizationOptions) => void;
}

export default function Configurator({ initialItem, onAddToCart }: ConfiguratorProps) {
  // Filter for customizable products
  const customizablePieces = FURNITURE_ITEMS.filter(it => it.customizable);
  
  // Set default active piece
  const [activeItem, setActiveItem] = useState<FurnitureItem>(
    initialItem && initialItem.customizable ? initialItem : customizablePieces[0]
  );

  // Sync if initialItem changes via Catalog trigger
  useEffect(() => {
    if (initialItem && initialItem.customizable) {
      setActiveItem(initialItem);
    }
  }, [initialItem]);

  // Selections State
  const [selectedFabric, setSelectedFabric] = useState<FabricOption>(FABRICS[0]);
  const [selectedWood, setSelectedWood] = useState<WoodOption>(WOODS[0]);
  const [hasPillow, setHasPillow] = useState<boolean>(false);
  const [monogram, setMonogram] = useState<string>('');

  // Calculate dynamic live parameters
  const basePrice = activeItem.price;
  const fabricPrice = selectedFabric.priceModifier;
  const woodPrice = selectedWood.priceModifier;
  const pillowPrice = hasPillow ? 450 : 0;
  const totalPrice = basePrice + fabricPrice + woodPrice + pillowPrice;

  // Dynamic Lead Time
  const calculateLeadTime = () => {
    let baseWeeks = 8;
    if (activeItem.id === 'modular-sofa-sisu') baseWeeks = 10;
    if (selectedWood.id === 'honed-travertine') baseWeeks += 2;
    if (selectedFabric.id === 'cognac-leather') baseWeeks += 1;
    return `${baseWeeks} - ${baseWeeks + 2} weeks`;
  };

  const handleInquirySubmit = () => {
    const options: CustomizationOptions = {
      fabricId: selectedFabric.id,
      woodId: selectedWood.id,
      pillow: hasPillow,
      monogram: monogram.toUpperCase().trim()
    };
    onAddToCart(activeItem, options);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <section id="configurator" className="py-24 bg-[#FAF7F2] border-b border-brand-clay/35 relative">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <span className="font-mono text-[9px] tracking-[0.4em] uppercase text-brand-bronze block mb-4">
            Customization Studio
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-brand-charcoal font-normal leading-tight">
            The Bespoke Commission
          </h2>
          <p className="font-sans text-brand-charcoal/70 text-xs md:text-sm leading-relaxed max-w-xl font-light mt-4">
            Fusing architecture and materials tailored to your residence. Detail every parameter of our signature pieces to establish absolute spatial harmony.
          </p>
        </div>

        {/* Piece Selector */}
        <div className="flex space-x-4 mb-12 border-b border-brand-clay/20 pb-4">
          {customizablePieces.map((piece) => (
            <button
              key={piece.id}
              onClick={() => {
                setActiveItem(piece);
                // Reset optional additions
                setHasPillow(false);
              }}
              className={`pb-4 text-xs tracking-widest uppercase font-medium transition-all relative cursor-pointer ${
                activeItem.id === piece.id ? 'text-brand-charcoal font-semibold' : 'text-brand-charcoal/40 hover:text-brand-charcoal/80'
              }`}
              id={`config-select-${piece.id}`}
            >
              {piece.name}
              {activeItem.id === piece.id && (
                <span className="absolute bottom-[-1px] left-0 w-full h-[2px] bg-brand-bronze" />
              )}
            </button>
          ))}
        </div>

        {/* Main Interface Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Breathtaking Interactive Aesthetic Preview Canvas */}
          <div className="lg:col-span-6 space-y-6">
            <div className="bg-brand-cream border border-brand-clay/45 p-8 relative flex flex-col items-center justify-center min-h-[440px] md:min-h-[500px] shadow-sm overflow-hidden group">
              
              {/* Subtle ambient blur background of the fabric color */}
              <div 
                className="absolute inset-0 opacity-15 blur-3xl transition-colors duration-700 pointer-events-none"
                style={{ backgroundColor: selectedFabric.accentColor }}
              />

              {/* Technical Blueprint overlay details in margins */}
              <div className="absolute top-4 left-4 font-mono text-[8px] text-brand-charcoal/40 flex flex-col space-y-1">
                <span>PROJECT REVISION: v04.26</span>
                <span className="text-brand-bronze/70 font-semibold uppercase">ACTIVE PREVIEW STATE [LIVE]</span>
              </div>
              <div className="absolute top-4 right-4 font-mono text-[8px] text-brand-charcoal/40 text-right">
                <span>SCALE: 1:10</span>
                <br />
                <span>DEPT: BEPOKE CONCIERGE</span>
              </div>

              {/* The dynamic decorative Vector furniture rendering */}
              <div className="w-full max-w-[340px] h-[280px] flex items-center justify-center relative mt-4 select-none">
                {activeItem.id === 'lounge-chair-08' ? (
                  // DYNAMIC CHAIR SVG
                  <svg viewBox="0 0 400 300" className="w-full h-full max-h-[250px] drop-shadow-xl">
                    {/* Leg Base (Wood material accent) */}
                    <path 
                      d="M 120 220 L 140 270 L 160 270 L 145 220 Z" 
                      fill={selectedWood.id === 'fumed-smoked-oak' ? '#40362E' : selectedWood.id === 'honed-travertine' ? '#DED7CD' : '#DECBA6'} 
                      stroke="#8E7A5F" 
                      strokeWidth="1"
                      className="transition-colors duration-500"
                    />
                    <path 
                      d="M 280 220 L 260 270 L 240 270 L 255 220 Z" 
                      fill={selectedWood.id === 'fumed-smoked-oak' ? '#40362E' : selectedWood.id === 'honed-travertine' ? '#DED7CD' : '#DECBA6'} 
                      stroke="#8E7A5F" 
                      strokeWidth="1"
                      className="transition-colors duration-500"
                    />
                    {/* Connecting horizontal plinth bar */}
                    <rect 
                      x="110" y="210" width="180" height="15" rx="2"
                      fill={selectedWood.id === 'fumed-smoked-oak' ? '#40362E' : selectedWood.id === 'honed-travertine' ? '#DED7CD' : '#DECBA6'} 
                      className="transition-colors duration-500"
                    />

                    {/* Main Curved Backrest Cushion */}
                    <path 
                      d="M 90 200 C 60 200, 60 70, 100 80 C 130 90, 160 110, 200 110 C 240 110, 270 90, 300 80 C 340 70, 340 200, 310 200 Z" 
                      fill={selectedFabric.accentColor} 
                      stroke="#1C1A19" 
                      strokeWidth="1.5"
                      className="transition-colors duration-500"
                    />

                    {/* Luxurious Seat Cushion Block */}
                    <rect 
                      x="90" y="150" width="220" height="65" rx="30"
                      fill={selectedFabric.accentColor} 
                      stroke="#1C1A19" 
                      strokeWidth="1.5"
                      className="transition-colors duration-500"
                    />

                    {/* Fine stitch detail line on seat */}
                    <path 
                      d="M 120 185 Q 200 195 280 185" 
                      stroke="#1C1A19" 
                      strokeWidth="0.75" 
                      strokeDasharray="4,4" 
                      fill="none" 
                    />

                    {/* Optional Accent Pillow */}
                    {hasPillow && (
                      <path 
                        d="M 160 170 C 150 150, 150 120, 170 120 C 190 120, 210 130, 220 150 C 230 170, 200 180, 160 170 Z" 
                        fill={selectedFabric.accentColor} 
                        stroke="#8E7A5F" 
                        strokeWidth="1.25"
                        className="transition-all duration-300 transform scale-95"
                      />
                    )}

                    {/* Owner Monogram Signature Plaque on Plinth base */}
                    {monogram && (
                      <g className="transition-all">
                        <rect x="180" y="213" width="40" height="8" rx="1" fill="#D3A25D" stroke="#A97E3E" strokeWidth="0.5" />
                        <text x="200" y="219" fill="#2E2312" fontSize="5" fontFamily="var(--font-mono)" textAnchor="middle" letterSpacing="0.5">
                          {monogram.toUpperCase().slice(0, 3)}
                        </text>
                      </g>
                    )}
                  </svg>
                ) : (
                  // DYNAMIC MODULAR SOFA SVG
                  <svg viewBox="0 0 400 300" className="w-full h-full max-h-[250px] drop-shadow-xl">
                    {/* Low Platform Wood Frame */}
                    <rect 
                      x="40" y="195" width="320" height="15" rx="1"
                      fill={selectedWood.id === 'fumed-smoked-oak' ? '#40362E' : selectedWood.id === 'honed-travertine' ? '#DED7CD' : '#DECBA6'} 
                      stroke="#8E7A5F" 
                      strokeWidth="1"
                      className="transition-colors duration-500"
                    />
                    
                    {/* Low pedestal legs */}
                    <rect x="60" y="210" width="20" height="10" fill={selectedWood.id === 'fumed-smoked-oak' ? '#40362E' : selectedWood.id === 'honed-travertine' ? '#DED7CD' : '#DECBA6'} className="transition-colors duration-500" />
                    <rect x="190" y="210" width="20" height="10" fill={selectedWood.id === 'fumed-smoked-oak' ? '#40362E' : selectedWood.id === 'honed-travertine' ? '#DED7CD' : '#DECBA6'} className="transition-colors duration-500" />
                    <rect x="320" y="210" width="20" height="10" fill={selectedWood.id === 'fumed-smoked-oak' ? '#40362E' : selectedWood.id === 'honed-travertine' ? '#DED7CD' : '#DECBA6'} className="transition-colors duration-500" />

                    {/* Left modular block backrest */}
                    <path 
                      d="M 50 195 L 50 110 C 50 90, 80 85, 100 85 L 200 85 C 210 85, 215 100, 215 110 L 215 195 Z" 
                      fill={selectedFabric.accentColor} 
                      stroke="#1C1A19" 
                      strokeWidth="1.5"
                      className="transition-colors duration-500"
                    />

                    {/* Right modular block backrest (low-slung lounge section) */}
                    <path 
                      d="M 215 195 L 215 130 C 215 118, 230 115, 250 115 L 340 115 C 345 115, 350 120, 350 130 L 350 195 Z" 
                      fill={selectedFabric.accentColor} 
                      stroke="#1C1A19" 
                      strokeWidth="1.5"
                      className="transition-colors duration-500"
                    />

                    {/* Plump seat cushion modules */}
                    <rect 
                      x="45" y="145" width="160" height="50" rx="14"
                      fill={selectedFabric.accentColor} 
                      stroke="#1C1A19" 
                      strokeWidth="1.5"
                      className="transition-colors duration-500"
                    />
                    <rect 
                      x="195" y="145" width="160" height="50" rx="14"
                      fill={selectedFabric.accentColor} 
                      stroke="#1C1A19" 
                      strokeWidth="1.5"
                      className="transition-colors duration-500"
                    />

                    {/* Soft fold lines */}
                    <path d="M 125 152 Q 125 185 125 190" stroke="#1C1A19" strokeWidth="0.5" fill="none" opacity="0.4" />
                    <path d="M 275 152 Q 275 185 275 190" stroke="#1C1A19" strokeWidth="0.5" fill="none" opacity="0.4" />

                    {/* Optional Accent Pillow on sofa corner */}
                    {hasPillow && (
                      <rect 
                        x="170" y="125" width="35" height="35" rx="6"
                        transform="rotate(-15 187 142)"
                        fill={selectedFabric.accentColor} 
                        stroke="#8E7A5F" 
                        strokeWidth="1.25"
                        className="transition-all duration-300"
                      />
                    )}

                    {/* Owner Monogram Signature Plaque centered on base platform */}
                    {monogram && (
                      <g className="transition-all">
                        <rect x="180" y="198" width="40" height="8" rx="1" fill="#D3A25D" stroke="#A97E3E" strokeWidth="0.5" />
                        <text x="200" y="204" fill="#2E2312" fontSize="5" fontFamily="var(--font-mono)" textAnchor="middle" letterSpacing="0.5">
                          {monogram.toUpperCase().slice(0, 3)}
                        </text>
                      </g>
                    )}
                  </svg>
                )}
              </div>

              {/* Plaque info watermark */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-[10px] text-brand-charcoal/50 border-t border-brand-clay/20 pt-4 font-mono">
                <span className="flex items-center gap-1">
                  <Fingerprint className="w-3.5 h-3.5 text-brand-bronze" />
                  AUTHENTIC GLOBAL DESIGN ARENA LABELS
                </span>
                <span className="font-semibold">{selectedWood.name.toUpperCase()} / {selectedFabric.name.toUpperCase()}</span>
              </div>
            </div>

            {/* Configurator Spec summary boxes */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-[10px] text-brand-charcoal/80">
              <div className="bg-white border border-brand-clay/30 p-4 flex flex-col justify-between">
                <span className="text-brand-bronze block mb-1">Tailored Delivery</span>
                <span className="font-sans text-xs font-semibold flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 stroke-[1.5]" />
                  {calculateLeadTime()}
                </span>
              </div>
              <div className="bg-white border border-brand-clay/30 p-4 flex flex-col justify-between">
                <span className="text-brand-bronze block mb-1">Guarantee</span>
                <span className="font-sans text-xs font-semibold flex items-center gap-1 text-emerald-800">
                  <ShieldCheck className="w-3.5 h-3.5 stroke-[1.5]" />
                  25-Year Warranty
                </span>
              </div>
              <div className="bg-white border border-brand-clay/30 p-4 flex flex-col justify-between">
                <span className="text-brand-bronze block mb-1">White-Glove Delivery</span>
                <span className="font-sans text-xs font-semibold block">Included in Commission</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interaction Controls */}
          <div className="lg:col-span-6 bg-white border border-brand-clay/35 p-8 shadow-xs space-y-8">
            
            {/* Step 1: Material/Fabric Selection */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-[11px] font-mono tracking-widest text-brand-charcoal/60 uppercase">
                  Option 01 / Upholstery & Color
                </label>
                <span className="font-mono text-xs text-brand-bronze font-semibold">
                  {selectedFabric.priceModifier === 0 ? 'Included' : `+ ${formatPrice(selectedFabric.priceModifier)}`}
                </span>
              </div>
              <span className="block font-serif text-lg font-normal text-brand-charcoal">{selectedFabric.name}</span>
              <p className="text-xs text-brand-charcoal/70 leading-relaxed font-light">{selectedFabric.description}</p>
              
              {/* Fabric Bubbles Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                {FABRICS.map((fabric) => (
                  <button
                    key={fabric.id}
                    onClick={() => setSelectedFabric(fabric)}
                    className={`p-3 border text-left flex flex-col justify-between gap-4 transition-all duration-300 rounded-2xs cursor-pointer ${
                      selectedFabric.id === fabric.id
                        ? 'border-brand-charcoal bg-brand-cream ring-1 ring-brand-charcoal/20'
                        : 'border-brand-clay/30 hover:border-brand-bronze bg-white'
                    }`}
                    id={`fabric-btn-${fabric.id}`}
                  >
                    <div className={`w-6 h-6 rounded-full border border-brand-clay/40 shadow-inner ${fabric.bgClass}`} />
                    <div className="flex flex-col">
                      <span className="text-[10px] font-sans font-medium text-brand-charcoal leading-tight line-clamp-1">{fabric.name}</span>
                      <span className="text-[9px] font-mono text-brand-charcoal/50 mt-0.5">
                        {fabric.priceModifier === 0 ? 'Std.' : `+${fabric.priceModifier}`}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Wood leg Frame Selection */}
            <div className="space-y-4 border-t border-brand-clay/25 pt-6">
              <div className="flex items-center justify-between">
                <label className="text-[11px] font-mono tracking-widest text-brand-charcoal/60 uppercase">
                  Option 02 / Anchoring Frame & Legs
                </label>
                <span className="font-mono text-xs text-brand-bronze font-semibold">
                  {selectedWood.priceModifier === 0 ? 'Included' : `+ ${formatPrice(selectedWood.priceModifier)}`}
                </span>
              </div>
              <span className="block font-serif text-lg font-normal text-brand-charcoal">{selectedWood.name}</span>
              <p className="text-xs text-brand-charcoal/70 leading-relaxed font-light">{selectedWood.description}</p>

              {/* Wood Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                {WOODS.map((wood) => (
                  <button
                    key={wood.id}
                    onClick={() => setSelectedWood(wood)}
                    className={`p-3 border text-left flex flex-col justify-between gap-4 transition-all duration-300 rounded-3xs cursor-pointer ${
                      selectedWood.id === wood.id
                        ? 'border-brand-charcoal bg-brand-cream ring-1 ring-brand-charcoal/20'
                        : 'border-brand-clay/30 hover:border-brand-bronze bg-white'
                    }`}
                    id={`wood-btn-${wood.id}`}
                  >
                    <div className="flex items-center gap-2">
                      <div className={`w-4 h-4 rounded-xs border border-brand-clay/40 ${wood.bgClass}`} />
                      <span className="text-[10px] font-sans font-medium text-brand-charcoal leading-none">{wood.name.split(' ').slice(-1)[0]}</span>
                    </div>
                    <span className="text-[9px] font-mono text-brand-charcoal/50 mt-1">
                      {wood.priceModifier === 0 ? 'Standard' : `+ ${formatPrice(wood.priceModifier)}`}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Cushion density Accessories Checkbox */}
            <div className="space-y-4 border-t border-brand-clay/25 pt-6">
              <label className="text-[11px] font-mono tracking-widest text-brand-charcoal/60 uppercase block">
                Option 03 / Additions
              </label>

              <label 
                className={`p-4 border rounded-3xs flex items-center justify-between cursor-pointer transition-all ${
                  hasPillow ? 'border-brand-charcoal bg-brand-cream/40' : 'border-brand-clay/20 hover:border-brand-bronze bg-white'
                }`}
                id="checkbox-cushion"
              >
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={hasPillow}
                    onChange={(e) => setHasPillow(e.target.checked)}
                    className="h-4 w-4 rounded-xs border-brand-clay text-brand-bronze focus:ring-brand-bronze"
                  />
                  <div>
                    <span className="block text-xs font-sans font-medium text-brand-charcoal">Include matching organic accent throw pillow</span>
                    <span className="block text-[10px] text-brand-charcoal/55 font-light">Custom cut matching textile, extra down feather filling.</span>
                  </div>
                </div>
                <span className="font-mono text-xs text-brand-bronze font-semibold shrink-0 ml-4">+ $450</span>
              </label>
            </div>

            {/* Step 4: Complimentary Engraving */}
            <div className="space-y-4 border-t border-brand-clay/25 pt-6">
              <div className="flex items-center justify-between">
                <label className="text-[11px] font-mono tracking-widest text-brand-charcoal/60 uppercase">
                  Option 04 / Designer Brass Plate Engraving
                </label>
                <span className="font-mono text-[9px] text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full font-bold">Complimentary</span>
              </div>
              <p className="text-xs text-brand-charcoal/70 font-light">
                Secure your family heritage. We will engrave up to three initials on a solid brass identity plate, discreetly mounted on the inner timber frame.
              </p>
              
              <input
                type="text"
                maxLength={3}
                placeholder="E.g., M.H.L"
                value={monogram}
                onChange={(e) => setMonogram(e.target.value.slice(0, 3))}
                className="w-full bg-[#FAF7F2] border border-brand-clay/60 py-3 px-4 text-xs font-mono tracking-widest focus:outline-hidden focus:border-brand-bronze rounded-2xs"
                id="input-config-monogram"
              />
            </div>

            {/* Pricing Summary and Action Add to Portfolio */}
            <div className="border-t-2 border-brand-charcoal bg-[#FAF7F2] p-6 space-y-4">
              <div className="flex items-baseline justify-between">
                <span className="text-xs uppercase tracking-widest font-mono text-brand-charcoal/60">Bespoke Commission Cost</span>
                <span className="font-serif text-2xl lg:text-3xl text-brand-charcoal font-medium">
                  {formatPrice(totalPrice)}
                </span>
              </div>

              <div className="flex items-center gap-2 text-[10px] text-brand-charcoal/60 font-light">
                <Info className="w-3.5 h-3.5 text-brand-bronze" />
                <span>Pricing encapsulates full white-glove custom room build & assembly on placement.</span>
              </div>

              <button
                onClick={handleInquirySubmit}
                className="w-full bg-brand-charcoal hover:bg-brand-bronze text-brand-cream py-4 px-6 text-xs tracking-[0.25em] font-medium uppercase text-center flex items-center justify-center gap-3 transition-colors duration-300 shadow-md cursor-pointer"
                id="btn-config-add-portfolio"
              >
                <ShoppingBag className="w-4 h-4 stroke-[1.5]" />
                Inquire & Add to Portfolio
              </button>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
