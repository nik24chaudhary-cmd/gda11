import { ArrowDown, CornerDownRight, Sliders, ArrowRight } from 'lucide-react';

interface HeroProps {
  onExploreClick: () => void;
  onCustomiseClick: () => void;
}

export default function Hero({ onExploreClick, onCustomiseClick }: HeroProps) {
  return (
    <section id="hero" className="relative min-h-[calc(100vh-80px)] flex flex-col justify-between overflow-hidden bg-brand-cream py-12 md:py-20">
      {/* Absolute Decorative elements (Very sparse, elegant) */}
      <div className="absolute top-1/4 left-1/10 w-96 h-96 rounded-full bg-brand-sand/40 blur-3xl -z-10" />
      <div className="absolute bottom-1/4 right-1/10 w-80 h-80 rounded-full bg-brand-clay/25 blur-3xl -z-10" />

      {/* Main Grid Content */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center my-auto w-full">
        {/* Left Side: Aesthetic brand prose & big title */}
        <div className="lg:col-span-6 flex flex-col justify-center space-y-8 animate-fade-in-up">
          {/* Tagline */}
          <div className="flex items-center space-x-3 text-brand-bronze text-[10px] tracking-[0.3em] uppercase font-mono font-medium">
            <span>Volume 01</span>
            <span className="w-8 h-[1px] bg-brand-clay" />
            <span>Harmonious Spaces</span>
          </div>

          {/* Majestic Hero Headline */}
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-5xl xl:text-6xl text-brand-charcoal leading-[1.1] font-normal tracking-tight">
            Sculpted Comfort <br />
            <span className="italic text-brand-bronze font-light font-serif">for the Quiet</span> <br />
            Sanctum.
          </h1>

          {/* Subtext */}
          <p className="font-sans text-brand-charcoal/70 text-sm md:text-base leading-relaxed max-w-lg font-light">
            Global Design Arena pieces occupy space with soft strength. We hand-weave organic geometries to celebrate natural silence, fusing master Scandinavian woodcraft with fine Italian bouclé wool.
          </p>

          {/* Bullet specifications in mono */}
          <div className="grid grid-cols-2 gap-4 border-t border-brand-clay/30 pt-6 max-w-md">
            <div>
              <span className="block font-mono text-[9px] uppercase tracking-wider text-brand-bronze">Primary Spec</span>
              <span className="block font-sans text-xs text-brand-charcoal font-medium mt-1">Bouclé Wool upholstery</span>
            </div>
            <div>
              <span className="block font-mono text-[9px] uppercase tracking-wider text-brand-bronze">Joinery</span>
              <span className="block font-sans text-xs text-brand-charcoal font-medium mt-1">Mortise & Tenon Walnut</span>
            </div>
          </div>

          {/* Interactive CTAs */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-4 sm:space-y-0 sm:space-x-6 pt-4">
            <button
              onClick={onExploreClick}
              className="group bg-brand-charcoal text-brand-cream hover:bg-brand-bronze transition-colors duration-300 py-4 px-8 text-xs tracking-[0.25em] uppercase font-medium flex items-center justify-center gap-3 cursor-pointer"
              id="hero-cta-explore"
            >
              The Curated Collection
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </button>

            <button
              onClick={onCustomiseClick}
              className="group bg-white hover:bg-brand-sand border border-brand-clay text-brand-charcoal transition-all duration-300 py-4 px-8 text-xs tracking-[0.25em] uppercase font-medium flex items-center justify-center gap-2.5 cursor-pointer"
              id="hero-cta-customise"
            >
              <Sliders className="w-3.5 h-3.5 stroke-[1.5] text-brand-bronze animate-pulse" />
              Bespoke Configurator
            </button>
          </div>
        </div>

        {/* Right Side: Showcase of Custom-Generated Lounge Chair hero */}
        <div className="lg:col-span-6 relative flex justify-center lg:justify-end">
          {/* Subtle frame behind image simulating premium print design layout */}
          <div className="absolute -inset-4 md:-inset-6 bg-brand-sand/50 rounded-xs -z-10 border border-brand-clay/20" />
          
          <div className="relative overflow-hidden w-full max-w-lg aspect-[16/11] shadow-2xl border border-brand-clay/50 bg-brand-sand">
            {/* The Custom Generated Hero Image */}
            <img
              src="/src/assets/images/atelier_lounge_chair_hero_1781154274610.png"
              alt="Global Design Arena Lounge Chair No. 08 Hero Showcase"
              className="w-full h-full object-cover select-none hover:scale-105 transition-transform duration-1000 ease-out"
              referrerPolicy="no-referrer"
            />
            {/* Tiny architect coordinate labels mimicking ultra high-end gallery layouts */}
            <div className="absolute bottom-4 left-4 bg-brand-cream/90 backdrop-blur-xs py-2 px-3 border border-brand-clay/30 text-[9px] font-mono text-brand-charcoal flex flex-col">
              <span className="font-semibold tracking-wider">GLOBAL DESIGN ARENA CORE SERIES</span>
              <span className="text-brand-bronze/80 font-normal">No. 08 Lounge Configurable</span>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Footnotes / Scroll indicator */}
      <div className="max-w-7xl mx-auto px-6 w-full mt-12 md:mt-16 flex flex-col sm:flex-row items-start sm:items-center justify-between border-t border-brand-clay/25 pt-6 text-[10px] tracking-widest text-brand-charcoal/50 font-mono">
        <div className="flex items-center gap-2 mb-3 sm:mb-0">
          <CornerDownRight className="w-3 h-3 text-brand-bronze" />
          <span>ESTABLISHED 2026</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="hidden md:inline">SLOW CRAFT INDEX</span>
          <span className="w-3 h-[1px] bg-brand-clay/50 hidden md:inline" />
          <span>SHOWROOMS: COPENHAGEN / TUSCANY / HELSINKI</span>
        </div>
        <button
          onClick={onExploreClick}
          className="flex items-center gap-2 hover:text-brand-bronze transition-colors cursor-pointer group"
          id="hero-scroll-btn"
        >
          <span>BEGIN JOURNEY</span>
          <ArrowDown className="w-3 h-3 animate-bounce text-brand-bronze group-hover:scale-125 transition-transform" />
        </button>
      </div>
    </section>
  );
}
