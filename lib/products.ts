export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  sizes: string[];
  colors?: string[];
  inStock: boolean;
  featured?: boolean;
}

export const products: Product[] = [
  {
    id: 'shirt-2023-2024',
    name: 'SML Home Jersey 2023-2024',
    description: 'Official Surinamese Voetbalbond home jersey for the 2023-2024 season. Features the iconic red and green stripes with the national emblem and gold star. Made with premium moisture-wicking fabric for optimal comfort and performance.',
    price: 79.99,
    image: '/shirt_2023-2024.jpg',
    category: 'Jerseys',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: ['White/Red/Green'],
    inStock: true,
    featured: true,
  },
  {
    id: 'shirt-2024-2025',
    name: 'SML Home Jersey 2024-2025',
    description: 'The latest official Surinamese Voetbalbond home jersey for the 2024-2025 season. Showcasing a modern design with dynamic red and green accents, featuring the national emblem and gold star. Engineered with advanced breathable fabric technology.',
    price: 89.99,
    image: '/shirt_2024-2025.png',
    category: 'Jerseys',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: ['White/Red/Green'],
    inStock: true,
    featured: true,
  },
];

export function getProductById(id: string): Product | undefined {
  return products.find((product) => product.id === id);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((product) => product.featured);
}
