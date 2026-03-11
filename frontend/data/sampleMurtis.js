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
  image_urls: ['https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80']
}));
