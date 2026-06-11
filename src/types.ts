export interface FurnitureItem {
  id: string;
  name: string;
  category: 'seating' | 'tables' | 'lighting';
  price: number;
  image: string;
  description: string;
  story: string;
  customizable: boolean;
  specs: {
    dimensions: string;
    material: string;
    origin: string;
    leadTime: string;
  };
}

export interface CustomizationOptions {
  fabricId: string;
  woodId: string;
  pillow: boolean;
  monogram: string;
}

export interface CartItem {
  id: string; // unique cart item id (incorporating custom selections)
  furniture: FurnitureItem;
  customOptions?: CustomizationOptions;
  quantity: number;
  totalPrice: number;
}

export interface FabricOption {
  id: string;
  name: string;
  bgClass: string; // Tailwind class
  priceModifier: number;
  description: string;
  accentColor: string; // for visual representation
}

export interface WoodOption {
  id: string;
  name: string;
  bgClass: string; // Tailwind class
  priceModifier: number;
  description: string;
}

export const FABRICS: FabricOption[] = [
  {
    id: 'alabaster-boucle',
    name: 'Alabaster Bouclé',
    bgClass: 'bg-[#EADECE]',
    priceModifier: 0,
    description: 'Warm textured natural Italian wool bouclé with a rich tactile feel.',
    accentColor: '#EADECE'
  },
  {
    id: 'cognac-leather',
    name: 'Cognac Aniline Leather',
    bgClass: 'bg-[#8F5B3E]',
    priceModifier: 850,
    description: 'Full-grain vegetable-tanned Italian leather that develops a magnificent patina.',
    accentColor: '#8F5B3E'
  },
  {
    id: 'sage-chenille',
    name: 'Sage Classic Chenille',
    bgClass: 'bg-[#6F7D6B]',
    priceModifier: 320,
    description: 'Durable, soft-pile woven organic textile in a muted moss forest hue.',
    accentColor: '#6F7D6B'
  },
  {
    id: 'obsidian-wool',
    name: 'Obsidian Refined Wool',
    bgClass: 'bg-[#313032]',
    priceModifier: 450,
    description: 'Ultra-refined charcoal wool flat-weave offering an architectural silhouette.',
    accentColor: '#313032'
  }
];

export const WOODS: WoodOption[] = [
  {
    id: 'natural-ash',
    name: 'Natural Mediterranean Ash',
    bgClass: 'bg-[#DECBA6]',
    priceModifier: 0,
    description: 'Sustainably harvested light organic clear-grain solid European ashwood.'
  },
  {
    id: 'smoked-oak',
    name: 'Fumed Smoked Oak',
    bgClass: 'bg-[#40362E]',
    priceModifier: 240,
    description: 'Fumed under strict humidity controls to achieve a deep, smoky walnut charcoal finish.'
  },
  {
    id: 'honed-travertine',
    name: 'Bespoke Honed Travertine',
    bgClass: 'bg-[#DED7CD]',
    priceModifier: 650,
    description: 'Solid blocks of Italian travertine, hand-honed to a smooth, elegant matte finish.'
  }
];
