'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { getProductById, products } from '@/lib/products';
import { ShoppingCart, ArrowLeft, Check, Star, Truck, Shield, RefreshCw } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export default function ProductDetailsPage() {
  const params = useParams();
  const product = getProductById(params.id as string);
  
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen bg-base flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Product Not Found</h1>
          <Link href="/shop" className="text-secondary hover:text-secondary/80 font-semibold">
            ← Back to Shop
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Please select a size');
      return;
    }
    // Here you would typically add to cart logic
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 3000);
  };

  // Get related products (other products)
  const relatedProducts = products.filter((p) => p.id !== product.id).slice(0, 3);

  return (
    <div className="min-h-screen bg-base py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <motion.div
          className="flex items-center gap-2 text-sm mb-8"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Link href="/" className="text-gray-400 hover:text-secondary transition-colors">Home</Link>
          <span className="text-gray-600">/</span>
          <Link href="/shop" className="text-gray-400 hover:text-secondary transition-colors">Shop</Link>
          <span className="text-gray-600">/</span>
          <span className="text-white font-semibold">{product.name}</span>
        </motion.div>

        {/* Product Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Product Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="bg-base/50 border-primary/20 overflow-hidden">
              <div className="relative aspect-square bg-base">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                  priority
                />
                {product.featured && (
                  <div className="absolute top-6 right-6">
                    <Badge className="bg-secondary text-base">⭐ Featured</Badge>
                  </div>
                )}
              </div>
            </Card>
          </motion.div>

          {/* Product Info */}
          <motion.div
            className="flex flex-col"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="mb-4">
              <Badge className="bg-primary/20 text-primary-foreground">
                {product.category}
              </Badge>
            </div>

            <h1 className="text-4xl font-bold text-white mb-4">{product.name}</h1>

            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-secondary text-secondary" />
                ))}
              </div>
              <span className="text-gray-400">(127 reviews)</span>
            </div>

            <div className="mb-6">
              <span className="text-5xl font-bold text-white">${product.price}</span>
              <span className="text-gray-400 ml-2">USD</span>
            </div>

            <p className="text-gray-400 text-lg leading-relaxed mb-8">{product.description}</p>

            {/* Size Selection */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-white mb-3">
                Select Size
              </label>
              <div className="grid grid-cols-6 gap-3">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-3 px-4 rounded-lg border-2 font-semibold transition-all ${
                      selectedSize === size
                        ? 'border-primary bg-primary text-white'
                        : 'border-primary/20 bg-base/50 text-white hover:border-primary/40'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mb-8">
              <label className="block text-sm font-semibold text-white mb-3">
                Quantity
              </label>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-12 h-12 rounded-lg border-2 border-primary/20 hover:border-primary text-white font-bold text-xl transition-colors"
                >
                  −
                </button>
                <span className="text-2xl font-bold w-12 text-center text-white">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-12 h-12 rounded-lg border-2 border-primary/20 hover:border-primary text-white font-bold text-xl transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <Button
              onClick={handleAddToCart}
              disabled={!product.inStock}
              size="lg"
              className={`w-full py-6 text-lg font-bold ${
                addedToCart
                  ? 'bg-secondary hover:bg-secondary/90 text-base'
                  : product.inStock
                  ? 'bg-primary hover:bg-primary/90 text-white'
                  : 'bg-gray-600 text-gray-400 cursor-not-allowed'
              }`}
            >
              {addedToCart ? (
                <>
                  <Check className="w-6 h-6 mr-2" />
                  Added to Cart!
                </>
              ) : (
                <>
                  <ShoppingCart className="w-6 h-6 mr-2" />
                  {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                </>
              )}
            </Button>

            {/* Product Features */}
            <div className="grid grid-cols-1 gap-4 mt-8 pt-8 border-t border-primary/20">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Truck className="w-5 h-5 text-secondary" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">Free Shipping</h3>
                  <p className="text-sm text-gray-400">On orders over $50</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-secondary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Shield className="w-5 h-5 text-secondary" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">Authentic Product</h3>
                  <p className="text-sm text-gray-400">100% official merchandise</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <RefreshCw className="w-5 h-5 text-secondary" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">Easy Returns</h3>
                  <p className="text-sm text-gray-400">30-day return policy</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Product Details Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Card className="bg-base/50 border-primary/20 p-8 mb-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-2xl font-bold text-white mb-4">Product Details</h2>
                <ul className="space-y-3 text-gray-400">
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                    <span>Premium moisture-wicking fabric</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                    <span>Breathable mesh panels for ventilation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                    <span>Official team crest and colors</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                    <span>Comfortable athletic fit</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                    <span>Machine washable</span>
                  </li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-white mb-4">Size Guide</h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-primary/20">
                      <tr>
                        <th className="px-4 py-2 text-left font-semibold text-gray-300">Size</th>
                        <th className="px-4 py-2 text-left font-semibold text-gray-300">Chest (in)</th>
                        <th className="px-4 py-2 text-left font-semibold text-gray-300">Length (in)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-primary/10">
                      <tr><td className="px-4 py-2 text-gray-400">XS</td><td className="px-4 py-2 text-gray-400">34-36</td><td className="px-4 py-2 text-gray-400">27</td></tr>
                      <tr><td className="px-4 py-2 text-gray-400">S</td><td className="px-4 py-2 text-gray-400">36-38</td><td className="px-4 py-2 text-gray-400">28</td></tr>
                      <tr><td className="px-4 py-2 text-gray-400">M</td><td className="px-4 py-2 text-gray-400">38-40</td><td className="px-4 py-2 text-gray-400">29</td></tr>
                      <tr><td className="px-4 py-2 text-gray-400">L</td><td className="px-4 py-2 text-gray-400">40-42</td><td className="px-4 py-2 text-gray-400">30</td></tr>
                      <tr><td className="px-4 py-2 text-gray-400">XL</td><td className="px-4 py-2 text-gray-400">42-44</td><td className="px-4 py-2 text-gray-400">31</td></tr>
                      <tr><td className="px-4 py-2 text-gray-400">XXL</td><td className="px-4 py-2 text-gray-400">44-46</td><td className="px-4 py-2 text-gray-400">32</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold text-white mb-8">You May Also Like</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <Link
                  key={relatedProduct.id}
                  href={`/shop/${relatedProduct.id}`}
                >
                  <Card className="bg-base/50 border-primary/20 hover:border-primary/40 transition-all hover:shadow-lg hover:shadow-primary/10 overflow-hidden group h-full">
                    <div className="relative aspect-square bg-base">
                      <Image
                        src={relatedProduct.image}
                        alt={relatedProduct.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <CardContent className="p-6">
                      <h3 className="text-lg font-bold text-white mb-2 group-hover:text-secondary transition-colors">
                        {relatedProduct.name}
                      </h3>
                      <span className="text-2xl font-bold text-white">${relatedProduct.price}</span>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
