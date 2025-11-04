'use client';

import { ShoppingCart } from 'lucide-react';
import { useState } from 'react';

export function CartButton() {
  const [itemCount] = useState(0);

  return (
    <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
      <ShoppingCart className="w-6 h-6" />
      {itemCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
          {itemCount}
        </span>
      )}
    </button>
  );
}
