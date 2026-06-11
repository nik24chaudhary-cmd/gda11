import { FurnitureItem } from './types';

export const FURNITURE_ITEMS: FurnitureItem[] = [
  {
    id: 'lounge-chair-08',
    name: 'Arena Lounge Chair No. 08',
    category: 'seating',
    price: 3800,
    image: '/src/assets/images/atelier_lounge_chair_hero_1781154274610.png',
    description: 'Uncompromising comfort sculpted into smooth geometric volumes. The No. 08 is an architectural signature piece, blending the gentle warmth of premium boucle with solid, structural support legs.',
    story: 'Designed in Copenhagen, Denmark. The Lounge Chair No. 08 was born from a challenge to synthesize the rigid lines of modern brutalism with the welcoming hug of soft luxury bouclé. Each chair undergoes an eighteen-hour hand-tufting process performed by master upholsterers.',
    customizable: true,
    specs: {
      dimensions: 'W 92cm x D 96cm x H 78cm (Seat H 42cm)',
      material: 'Belgian Bouclé Wool, Solid Fumed Oak Base structure',
      origin: 'Denmark',
      leadTime: '8 - 10 weeks'
    }
  },
  {
    id: 'travertine-coffee-table',
    name: 'Slab Travertine Plinth Table',
    category: 'tables',
    price: 2900,
    image: '/src/assets/images/atelier_travertine_table_1781154295171.png',
    description: 'A monument of nature refined by hand. The Slab table celebrates the organic beauty of Travertine Classico with exquisite, raw chamfered edges and heavy monolithic block supports.',
    story: 'Sourced from the historic Rapolano Terme quarries in Tuscany, Italy. Honed by third-generation stonemasons using ancient water-polishing techniques that leave the stone’s breathtaking open-pore structure beautifully intact, while satin-smooth to the touch.',
    customizable: false,
    specs: {
      dimensions: 'W 140cm x D 80cm x H 32cm',
      material: 'Classico Honed Travertine Stone',
      origin: 'Italy',
      leadTime: '6 - 8 weeks'
    }
  },
  {
    id: 'modular-sofa-sisu',
    name: 'Sisu Modular Lounge Sofa',
    category: 'seating',
    price: 8400,
    image: '/src/assets/images/atelier_modular_sofa_1781154311033.png',
    description: 'An expansive landscape of leisure. The Sisu Modular Sofa features simple low-slung pillow forms designed to arrange dynamically, creating a tailored space for relaxed living and refined entertaining.',
    story: 'Conceptualized by Studio Sisu in Helsinki. Built around an internal pocket-spring core wrapped with eco-certified natural latex, the Sisu Sofa is meant to endure for generations without losing its architectural posture or plush comfort.',
    customizable: true,
    specs: {
      dimensions: 'W 280cm x D 190cm x H 66cm (Seat H 38cm)',
      material: 'Organic Oatmeal Linen, Solid Birch internal frame',
      origin: 'Finland',
      leadTime: '10 - 12 weeks'
    }
  },
  {
    id: 'travertine-dome-pendant',
    name: 'Sol Dome Travertine Pendant',
    category: 'lighting',
    price: 1350,
    image: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=800&q=80',
    description: 'A glowing celestial body suspended in air. The Sol Dome utilizes a hand-carved travertine canopy and handblown milk glass housing downcast brass dimmers, casting a soft, warm wash over dining settings.',
    story: 'Each travertine canopy is unique, showing ancient fossils and warm golden inclusions. Designed to harmonize perfectly with the heavy warm mineral tones of modern architectural concrete and limestone structures.',
    customizable: false,
    specs: {
      dimensions: 'Ø 45cm x H 30cm (Cord L 250cm)',
      material: 'Hand-carved Travertine, Brass, Handblown Milk Glass',
      origin: 'Greece',
      leadTime: '4 - 6 weeks'
    }
  }
];
