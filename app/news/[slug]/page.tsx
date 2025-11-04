"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, User, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { newsArticles } from "@/lib/data";

export default function NewsArticlePage() {
  const params = useParams();
  const slug = params.slug as string;

  const article = newsArticles.find((a) => a.slug === slug);

  if (!article) {
    return (
      <div className="min-h-screen bg-base flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Article Not Found</h1>
          <Link href="/news">
            <Button className="bg-primary hover:bg-primary/90">
              <ArrowLeft className="mr-2" size={16} />
              Back to News
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const relatedArticles = newsArticles
    .filter((a) => a.id !== article.id && a.category === article.category)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-base">
      {/* Hero Image */}
      <div className="relative h-[500px] overflow-hidden">
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-base via-base/60 to-transparent" />
        
        <div className="absolute bottom-0 left-0 right-0 pb-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <Link href="/news">
              <Button
                variant="ghost"
                className="mb-6 text-white hover:text-secondary hover:bg-white/10"
              >
                <ArrowLeft className="mr-2" size={16} />
                Back to News
              </Button>
            </Link>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge className="bg-secondary text-base mb-4">{article.category}</Badge>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 max-w-4xl">
                {article.title}
              </h1>
              <div className="flex flex-wrap items-center gap-6 text-white/80">
                <div className="flex items-center space-x-2">
                  <User size={18} />
                  <span>{article.author}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar size={18} />
                  <span>
                    {new Date(article.date).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="bg-base/50 border-primary/20">
              <CardContent className="p-8">
                {/* Excerpt */}
                <p className="text-xl text-gray-300 leading-relaxed mb-8 font-medium">
                  {article.excerpt}
                </p>

                {/* Content */}
                <div className="prose prose-invert prose-lg max-w-none">
                  <p className="text-gray-400 leading-relaxed mb-6">{article.content}</p>
                  
                  <p className="text-gray-400 leading-relaxed mb-6">
                    The match showcased the competitive spirit that defines the Suriname Major League,
                    with both teams displaying exceptional skill and determination throughout the 90
                    minutes. Fans were treated to an exciting display of football that kept them on
                    the edge of their seats.
                  </p>

                  <p className="text-gray-400 leading-relaxed mb-6">
                    This result has significant implications for the league standings, as the race
                    for the championship continues to heat up. With several matches remaining in the
                    season, every point counts as teams battle for supremacy in Surinamese football.
                  </p>

                  <p className="text-gray-400 leading-relaxed">
                    The SML continues to grow in popularity, attracting more fans and showcasing the
                    incredible talent that Suriname has to offer. As the season progresses, expect
                    more thrilling matches and memorable moments from the league.
                  </p>
                </div>

                {/* Share Section */}
                <div className="mt-12 pt-8 border-t border-primary/20">
                  <div className="flex items-center justify-between">
                    <p className="text-gray-400">Share this article</p>
                    <Button variant="outline" className="border-secondary text-secondary hover:bg-secondary hover:text-base">
                      <Share2 size={16} className="mr-2" />
                      Share
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            {/* Related Articles */}
            {relatedArticles.length > 0 && (
              <Card className="bg-base/50 border-primary/20">
                <CardHeader>
                  <CardTitle className="text-white">Related Articles</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {relatedArticles.map((related) => (
                    <Link key={related.id} href={`/news/${related.slug}`}>
                      <div className="group cursor-pointer">
                        <div className="relative h-32 rounded-lg overflow-hidden mb-3">
                          <img
                            src={related.image}
                            alt={related.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                        </div>
                        <h3 className="text-white font-semibold text-sm group-hover:text-secondary transition-colors line-clamp-2 mb-2">
                          {related.title}
                        </h3>
                        <p className="text-gray-500 text-xs">
                          {new Date(related.date).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </p>
                      </div>
                    </Link>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* Newsletter Signup */}
            <Card className="bg-gradient-to-br from-primary to-secondary border-0">
              <CardContent className="p-6 text-center">
                <h3 className="text-white font-bold text-xl mb-3">Stay Updated</h3>
                <p className="text-white/90 text-sm mb-4">
                  Get the latest SML news delivered to your inbox
                </p>
                <Button className="w-full bg-white text-primary hover:bg-white/90">
                  Subscribe Now
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
