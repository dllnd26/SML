"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, User, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { newsArticles } from "@/lib/data";

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

export default function NewsPage() {
  // Group articles by category
  const categories = Array.from(new Set(newsArticles.map((article) => article.category)));

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
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Latest News</h1>
          <p className="text-gray-400 text-lg">Stay updated with the latest from SML</p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          className="flex flex-wrap gap-3 justify-center mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Badge className="bg-primary text-white cursor-pointer hover:bg-primary/80 transition-colors px-4 py-2">
            All News
          </Badge>
          {categories.map((category) => (
            <Badge
              key={category}
              className="bg-primary/20 text-white cursor-pointer hover:bg-primary/40 transition-colors px-4 py-2"
            >
              {category}
            </Badge>
          ))}
        </motion.div>

        {/* Featured Article */}
        {newsArticles.length > 0 && (
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Link href={`/news/${newsArticles[0].slug}`}>
              <Card className="bg-base/50 border-primary/20 hover:border-primary/40 transition-all hover:shadow-lg hover:shadow-primary/10 overflow-hidden group">
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  <div className="relative h-64 lg:h-auto overflow-hidden">
                    <img
                      src={newsArticles[0].image}
                      alt={newsArticles[0].title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-secondary text-base">Featured</Badge>
                    </div>
                  </div>
                  <div className="p-8 flex flex-col justify-center">
                    <Badge className="bg-primary/20 text-primary-foreground w-fit mb-4">
                      {newsArticles[0].category}
                    </Badge>
                    <h2 className="text-3xl font-bold text-white mb-4 group-hover:text-secondary transition-colors">
                      {newsArticles[0].title}
                    </h2>
                    <p className="text-gray-400 mb-6 line-clamp-3">{newsArticles[0].excerpt}</p>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                          <User size={16} />
                          <span>{newsArticles[0].author}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Calendar size={16} />
                          <span>
                            {new Date(newsArticles[0].date).toLocaleDateString("en-US", {
                              month: "long",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </span>
                        </div>
                      </div>
                      <ArrowRight className="text-secondary group-hover:translate-x-2 transition-transform" />
                    </div>
                  </div>
                </div>
              </Card>
            </Link>
          </motion.div>
        )}

        {/* News Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {newsArticles.slice(1).map((article) => (
            <motion.div key={article.id} variants={itemVariants}>
              <Link href={`/news/${article.slug}`}>
                <Card className="bg-base/50 border-primary/20 hover:border-primary/40 transition-all hover:shadow-lg hover:shadow-primary/10 overflow-hidden group h-full flex flex-col">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-secondary text-base">{article.category}</Badge>
                    </div>
                  </div>
                  <CardHeader className="flex-1">
                    <CardTitle className="text-white group-hover:text-secondary transition-colors line-clamp-2">
                      {article.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-400 text-sm line-clamp-3 mb-4">{article.excerpt}</p>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <div className="flex items-center space-x-2">
                        <User size={14} />
                        <span>{article.author}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar size={14} />
                        <span>
                          {new Date(article.date).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                          })}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
