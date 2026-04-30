import { localMurtiImages } from './localImages';

export const sampleMurtis = Array.from({ length: 12 }).map((_, index) => ({
  id: `sample-${index + 1}`,
  name: `Divine Ganesh Murti ${index + 1}`,
  price: 4800 + index * 250,
  height: 12 + (index % 4) * 3,
  weight: 8 + (index % 5) * 2,
  material: ['Eco Clay', 'Shadu', 'POP', 'Marble', 'Brass'][index % 5],
  category: ['Eco-friendly', 'Shadu', 'POP', 'Marble', 'Brass'][index % 5],
  color: ['Saffron', 'Maroon', 'Ivory', 'Gold', 'White'][index % 5],
  description: 'Handcrafted with temple-grade finishing and premium detail.',
  image_urls: [
    localMurtiImages[index % localMurtiImages.length],
    localMurtiImages[(index + 1) % localMurtiImages.length],
    localMurtiImages[(index + 2) % localMurtiImages.length]
  ]
}));
