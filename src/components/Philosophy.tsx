import { Compass, Hammer, Sparkles } from 'lucide-react';

export default function Philosophy() {
  const pillars = [
    {
      no: '01',
      title: 'Slow Craft Philosophy',
      icon: <Hammer className="w-5 h-5 text-brand-bronze stroke-[1.25]" />,
      summary: 'Time is our primary medium.',
      body: 'We reject industrial haste. Every joint is carved by master artisans who listen to the timber. A single chair represents eighteen hours of hand-guided stitch-crafting, designed to breathe and deepen in complexity over generations.',
    },
    {
      no: '02',
      title: 'Noble Mineral & Fibres',
      icon: <Sparkles className="w-5 h-5 text-brand-bronze stroke-[1.25]" />,
      summary: 'Sourced from legendary ground.',
      body: 'Our travertine is cut from historic Rapolano thermal pits in Tuscany. Our bouclé utilizes carefully carded Alpine sheep wool spun in an ancient family-held mill in biella. No artificial coatings; only bare natural beauty.',
    },
    {
      no: '03',
      title: 'Silent Geometry',
      icon: <Compass className="w-5 h-5 text-brand-bronze stroke-[1.25]" />,
      summary: 'Form that follows peaceful posture.',
      body: 'We craft silhouettes that ground a room. Every slope and density is calculated around human rest. Comfort is treated as a silent, physical dialogue between natural materials and your quietest states.',
    },
  ];

  return (
    <section id="philosophy" className="py-24 md:py-32 bg-[#F3ECE5] border-t border-b border-brand-clay/40">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Intimate Section Header */}
        <div className="max-w-3xl mb-16 md:mb-24">
          <span className="font-mono text-[9px] tracking-[0.4em] uppercase text-brand-bronze block mb-4">
            Our Manifesto
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-brand-charcoal font-normal leading-[1.15] mb-6">
            We build monuments of stillness, designed to outlive trends.
          </h2>
          <p className="font-sans text-brand-charcoal/70 text-sm md:text-base leading-relaxed max-w-xl font-light">
            In an era of mass-reproduction, Global Design Arena stands as an embassy of the slow. We believe objects in your home should hold their own weight, absorbing memories and stories.
          </p>
        </div>

        {/* 3 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {pillars.map((pillar, idx) => (
            <div 
              key={pillar.no}
              className="bg-brand-cream border border-brand-clay/35 p-8 flex flex-col justify-between min-h-[340px] shadow-sm hover:shadow-md transition-shadow relative group"
            >
              {/* Top: Header / Icon */}
              <div>
                <div className="flex items-center justify-between pb-6 border-b border-brand-clay/20">
                  <span className="font-serif italic text-3xl text-brand-bronze/40 group-hover:text-brand-bronze/85 transition-colors font-light">
                    {pillar.no}
                  </span>
                  <div className="p-2 bg-[#FBF9F6] border border-brand-clay/20 rounded-xs">
                    {pillar.icon}
                  </div>
                </div>

                <div className="mt-6">
                  <h3 className="font-serif text-lg text-brand-charcoal font-normal">
                    {pillar.title}
                  </h3>
                  <span className="block font-mono text-[10px] tracking-wider text-brand-bronze/80 font-medium mt-1">
                    {pillar.summary}
                  </span>
                  <p className="font-sans text-brand-charcoal/70 text-xs md:text-sm leading-relaxed font-light mt-4">
                    {pillar.body}
                  </p>
                </div>
              </div>

              {/* Bottom detail decoration */}
              <div className="mt-8 pt-4 border-t border-brand-clay/10 flex items-center justify-between text-[8px] font-mono tracking-widest text-brand-charcoal/30">
                <span>GLOBAL DESIGN ARENA DEPT. {pillar.no}</span>
                <span>AUTHENTIC</span>
              </div>
            </div>
          ))}
        </div>
        
        {/* Luxury Banner Callout */}
        <div className="mt-20 border border-brand-clay/45 bg-brand-cream/60 p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <span className="font-mono text-[9px] tracking-widest text-[#B97A60] block mb-2 font-semibold">ECO INTEGRITY</span>
            <p className="text-xs text-brand-charcoal/80 leading-relaxed font-sans font-light">
              We pledge to plant 5 mature trees in collaboration with the Northern Timber Trust for every major piece commissioned. Our materials are completely circular, organic-certified, and locally sourced.
            </p>
          </div>
          <div className="text-[10px] font-mono tracking-widest text-brand-bronze font-medium shrink-0 uppercase border border-brand-bronze/35 py-2 px-4 rounded-xs select-none">
            Carbon Neutral Commission
          </div>
        </div>

      </div>
    </section>
  );
}
