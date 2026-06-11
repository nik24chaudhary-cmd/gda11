import { CheckCircle, Calendar, MessageSquare, Landmark, X, Mail } from 'lucide-react';
import { CartItem, FABRICS, WOODS } from '../types';

interface ConsultationSuccessOverlayProps {
  onClose: () => void;
  inquirerDetails: {
    name: string;
    email: string;
    address: string;
    consultType: string;
    notes: string;
  } | null;
  itemsOrdered: CartItem[];
}

export default function ConsultationSuccessOverlay({
  onClose,
  inquirerDetails,
  itemsOrdered,
}: ConsultationSuccessOverlayProps) {
  if (!inquirerDetails) return null;

  // Generate unique luxury order reference code
  const dateStr = new Date().toISOString().substring(2, 10).replace(/-/g, '');
  const refCode = `GDA-2026-${dateStr}-${Math.floor(100 + Math.random() * 900)}`;

  // Determine allocated Senior Design Advisor (Easter Eggs highlighting Indian training instructors from user's map history!)
  const advisors = [
    { name: 'Avatar Singh', title: 'Senior Architectural Joiner & Design Lead' },
    { name: 'Abhishek Bakshi', title: 'Principal Interior & Space Planning Consultant' },
  ];
  // Stable pick based on inquirer name length
  const advisor = advisors[inquirerDetails.name.length % advisors.length];

  const getFabricName = (id?: string) => {
    if (!id) return '';
    return FABRICS.find((f) => f.id === id)?.name || id;
  };

  const getWoodName = (id?: string) => {
    if (!id) return '';
    return WOODS.find((w) => w.id === id)?.name || id;
  };

  const calculateTotal = () => {
    return itemsOrdered.reduce((acc, item) => acc + item.totalPrice, 0);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-charcoal/70 backdrop-blur-md overflow-y-auto">
      <div 
        className="bg-brand-cream border border-brand-clay/55 w-full max-w-2xl p-8 md:p-12 shadow-2xl relative animate-fade-in-up my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-brand-cream hover:bg-brand-sand border border-brand-clay/20 text-brand-charcoal cursor-pointer"
          id="btn-close-success"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Breathtaking Confirmation Heading */}
        <div className="text-center space-y-4 mb-8">
          <div className="w-12 h-12 bg-[#8E7A5F]/15 border border-brand-bronze rounded-full flex items-center justify-center mx-auto text-brand-bronze">
            <CheckCircle className="w-5 h-5 stroke-[1.5]" />
          </div>
          <div>
            <span className="font-mono text-[9px] tracking-[0.4em] uppercase text-brand-bronze">
              COMMISSION INITIATED
            </span>
            <h2 className="font-serif text-2xl md:text-3xl text-brand-charcoal font-normal mt-2">
              Global Design Arena Welcomes You
            </h2>
            <span className="block font-mono text-[10px] text-brand-charcoal/50 mt-1">
              PROPOSAL REFERENCE: <span className="font-semibold text-brand-charcoal font-sans">{refCode}</span>
            </span>
          </div>
        </div>

        {/* Allocated Personal Advisor Card (Easter egg) */}
        <div className="bg-white border border-brand-clay/25 p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <span className="block font-mono text-[8px] uppercase tracking-widest text-brand-bronze/80">
              ALLOCATED DESIGN ADVISOR
            </span>
            <span className="block font-serif text-base text-brand-charcoal font-medium mt-1">
              Mr. {advisor.name}
            </span>
            <span className="block text-[10px] text-brand-charcoal/50 font-light font-sans mt-0.5">
              {advisor.title}
            </span>
          </div>
          
          <div className="bg-brand-sand px-3 py-2 border border-brand-clay/20 text-[10px] font-mono tracking-wider flex items-center gap-1 text-brand-charcoal/80">
            <Calendar className="w-3.5 h-3.5 text-brand-bronze" />
            <span>24-Hour Review Window</span>
          </div>
        </div>

        {/* Specifications Review */}
        <div className="space-y-4 mb-8">
          <span className="font-mono text-[9px] uppercase tracking-widest text-brand-charcoal/50 block">
            PORTFOLIO SUMMARY ({itemsOrdered.length} pieces)
          </span>

          <div className="divide-y divide-brand-clay/20 border-t border-b border-brand-clay/20">
            {itemsOrdered.map((item) => (
              <div key={item.id} className="py-3 flex justify-between items-start gap-4">
                <div className="text-xs">
                  <span className="font-serif block font-medium text-brand-charcoal">
                    {item.furniture.name}
                  </span>
                  {item.customOptions && (
                    <span className="block text-[9px] text-brand-charcoal/60 font-mono mt-0.5">
                      {getFabricName(item.customOptions.fabricId)} / {getWoodName(item.customOptions.woodId)}
                      {item.customOptions.monogram ? ` / Monogram: ${item.customOptions.monogram}` : ''}
                    </span>
                  )}
                </div>
                <span className="text-xs font-serif font-medium text-brand-bronze shrink-0 mt-0.5">
                  {formatPrice(item.totalPrice)}
                </span>
              </div>
            ))}
          </div>

          <div className="flex justify-between items-baseline pt-2">
            <span className="text-[10px] font-mono uppercase tracking-widest text-brand-charcoal/50">Total Est. Commission Value</span>
            <span className="text-xl font-serif font-medium text-brand-charcoal">
              {formatPrice(calculateTotal())}
            </span>
          </div>
        </div>

        {/* Advisory format description */}
        <div className="space-y-3 bg-[#FAF7F2] p-5 border border-brand-clay/35 text-xs text-brand-charcoal/85 leading-relaxed font-light">
          <span className="font-mono text-[9px] uppercase tracking-widest text-[#B97A60] block font-semibold">
            WHAT TO EXPECT NEXT
          </span>
          <div className="flex items-start gap-3 mt-2">
            <Mail className="w-4 h-4 text-brand-bronze shrink-0 mt-0.5 stroke-[1.5]" />
            <p>
              An invitation dossier has been drafted to <span className="font-semibold">{inquirerDetails.email}</span>. Mr. {advisor.name} will reach out coordinates within 24 hours via your chosen <span className="font-semibold">{inquirerDetails.consultType === 'phone-call' ? 'private telephone line' : 'secure virtual showroom room link'}</span>.
            </p>
          </div>
          <div className="flex items-start gap-3">
            <MessageSquare className="w-4 h-4 text-brand-bronze shrink-0 mt-0.5 stroke-[1.5]" />
            <p>
              Your architectural notes regarding <span className="font-semibold">"{inquirerDetails.address}"</span> and custom space requests: 
              <span className="italic block mt-1 text-[11px] text-brand-charcoal/60">
                "{inquirerDetails.notes || 'None submitted.'}"
              </span>
            </p>
          </div>
        </div>

        {/* Master CTA Close */}
        <button
          onClick={onClose}
          className="w-full bg-brand-charcoal hover:bg-brand-bronze text-brand-cream border-0 py-4 px-6 text-xs tracking-[0.25em] font-medium uppercase text-center flex items-center justify-center gap-2 mt-8 transition-colors duration-300 shadow-md cursor-pointer"
          id="btn-success-modal-done"
        >
          Return to the Design Arena
        </button>

      </div>
    </div>
  );
}
