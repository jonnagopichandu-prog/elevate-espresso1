export const PRODUCTS = [
  { id: 'house-blend', name: 'House Blend', sub: '250g · Ground', price: 599, rating: 4.8, reviews: 320, variant: 'house' },
  { id: 'colombian-reserve', name: 'Colombian Reserve', sub: '250g · Whole Bean', price: 749, rating: 4.9, reviews: 210, variant: 'colombian' },
  { id: 'ethiopian-single-origin', name: 'Ethiopian Single Origin', sub: '250g · Whole Bean', price: 799, rating: 4.8, reviews: 176, variant: 'ethiopian' },
  { id: 'espresso-forte', name: 'Espresso Forte', sub: '250g · Whole Bean', price: 699, rating: 4.9, reviews: 402, variant: 'forte' },
  { id: 'midnight-espresso', name: 'Midnight Espresso', sub: '250g · Whole Bean', price: 849, rating: 4.9, reviews: 289, variant: 'midnight' },
  { id: 'golden-hour', name: 'Golden Hour', sub: '250g · Whole Bean', price: 899, rating: 4.8, reviews: 194, variant: 'golden' },
  { id: 'velvet-bloom', name: 'Velvet Bloom', sub: '250g · Whole Bean', price: 949, rating: 4.7, reviews: 163, variant: 'velvet' },
];

export const BEAN_FACTS = [
  'House Blend — cocoa, caramel and a smooth finish',
  'Colombian Reserve — hand-picked in the Andes, citrus sweet',
  'Ethiopian Single Origin — Yirgacheffe florals, blueberry notes',
  'Espresso Forte — dark roasted, bittersweet molasses',
  'Every batch is roasted in micro-lots of 12kg or less',
  'Beans rest for 48 hours before bagging, for peak aroma',
];

export const inr = (n) => '₹' + n.toLocaleString('en-IN');
