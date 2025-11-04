'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { products } from '@/lib/products';
import { ShoppingBag, Check, Truck, Shield } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

export default function ShopPage() {
  return (
    <div className="min-h-screen bg-base py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center">
              <ShoppingBag className="w-8 h-8 text-secondary" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Official Merch Store</h1>
          <p className="text-gray-400 text-lg">
            Support your team with authentic Surinamese football merchandise
          </p>
        </motion.div>

        {/* Products Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {products.map((product) => (
            <motion.div key={product.id} variants={itemVariants}>
              <Link href={`/shop/${product.id}`}>
                <Card className="bg-base/50 border-primary/20 hover:border-primary/40 transition-all hover:shadow-lg hover:shadow-primary/10 overflow-hidden group h-full flex flex-col">
                  <div className="relative aspect-square bg-base overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    {product.featured && (
                      <div className="absolute top-4 right-4">
                        <Badge className="bg-secondary text-base">Featured</Badge>
                      </div>
                    )}
                    {!product.inStock && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <Badge className="bg-white text-gray-900">Out of Stock</Badge>
                      </div>
                    )}
                  </div>

                  <CardHeader className="flex-1">
                    <Badge className="bg-primary/20 text-primary-foreground w-fit mb-2">
                      {product.category}
                    </Badge>
                    <CardTitle className="text-white group-hover:text-secondary transition-colors">
                      {product.name}
                    </CardTitle>
                  </CardHeader>

                  <CardContent>
                    <p className="text-gray-400 text-sm mb-4 line-clamp-2">{product.description}</p>
                    
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-3xl font-bold text-white">${product.price}</span>
                      {product.inStock && (
                        <Badge className="bg-primary/20 text-secondary">In Stock</Badge>
                      )}
                    </div>

                    <div className="text-sm text-gray-400">
                      Sizes: {product.sizes.join(', ')}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Empty State */}
        {products.length === 0 && (
          <div className="text-center py-16">
            <ShoppingBag className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-2xl font-bold text-white mb-2">No products available</h3>
            <p className="text-gray-400">Check back soon for new merchandise!</p>
          </div>
        )}

        {/* Info Section */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <Card className="bg-primary/10 border-primary/20 hover:border-primary/40 transition-all">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="text-white" size={24} />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Authentic Products</h3>
              <p className="text-gray-400">100% official merchandise from Surinamese Voetbalbond</p>
            </CardContent>
          </Card>

          <Card className="bg-secondary/10 border-secondary/20 hover:border-secondary/40 transition-all">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="text-base" size={24} />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Secure Payment</h3>
              <p className="text-gray-400">Safe and secure checkout process</p>
            </CardContent>
          </Card>

          <Card className="bg-primary/10 border-primary/20 hover:border-primary/40 transition-all">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="text-white" size={24} />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Fast Shipping</h3>
              <p className="text-gray-400">Quick delivery to your doorstep</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
