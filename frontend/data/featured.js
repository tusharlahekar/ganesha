import { localMurtiImages } from './localImages';

export const featuredMurtis = [
  {
    id: 'featured-1',
    name: 'Rajwada Marble Ganpati',
    price: 28500,
    height: 18,
    weight: 12,
    material: 'Marble',
    category: 'Marble',
    color: 'Ivory',
    description: 'Premium marble idol with hand-carved crown and gold highlights.',
    image_urls: [localMurtiImages[0]]
  },
  {
    id: 'featured-2',
    name: 'Eco Shadu Serenity',
    price: 12500,
    height: 14,
    weight: 9,
    material: 'Shadu',
    category: 'Eco-friendly',
    color: 'Saffron',
    description: 'Eco-friendly shadu clay with pastel shading and lotus pedestal.',
    image_urls: [localMurtiImages[1]]
  },
  {
    id: 'featured-3',
    name: 'Temple Brass Deity',
    price: 46000,
    height: 21,
    weight: 18,
    material: 'Brass',
    category: 'Brass',
    color: 'Gold',
    description: 'Heavy brass murti with intricate filigree and velvet drape.',
    image_urls: [localMurtiImages[2]]
  }
];
