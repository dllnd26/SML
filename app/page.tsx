"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Trophy, Calendar, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { standings, matches, newsArticles } from "@/lib/data";

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

export default function Home() {
  const upcomingMatches = matches.filter((m) => m.status === "upcoming").slice(0, 3);
  const recentMatches = matches.filter((m) => m.status === "completed").slice(0, 3);
  const topStandings = standings.slice(0, 5);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <Image
            src="/hero.JPG"
            alt="SML Hero"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-base/95 via-base/80 to-base/60" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="relative w-32 h-32 mx-auto mb-6"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
            >
              <Image
                src="/SML_logo.png"
                alt="SML Logo"
                width={128}
                height={128}
                className="object-contain drop-shadow-2xl"
                priority
              />
            </motion.div>
            <Badge className="mb-4 text-base px-4 py-2 bg-secondary text-base">
              2025 Season
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Suriname Major League
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Experience the passion, skill, and excitement of Surinamese football at its finest
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/matches">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-white">
                  View Fixtures
                  <ArrowRight className="ml-2" size={20} />
                </Button>
              </Link>
              <Link href="/table">
                <Button size="lg" variant="outline" className="border-secondary text-secondary hover:bg-secondary hover:text-base">
                  League Table
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Animated Gradient Orbs */}
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-primary/30 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </section>

      {/* Quick Stats */}
      <section className="py-12 bg-gradient-to-b from-base to-base/95">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div variants={itemVariants}>
              <Card className="bg-primary/10 border-primary/20 hover:border-primary/40 transition-all">
                <CardContent className="p-6 flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                    <Trophy className="text-white" size={24} />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">League Leader</p>
                    <p className="text-white text-xl font-bold">{standings[0].team.name}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card className="bg-secondary/10 border-secondary/20 hover:border-secondary/40 transition-all">
                <CardContent className="p-6 flex items-center space-x-4">
                  <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center">
                    <Calendar className="text-base" size={24} />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Next Match</p>
                    <p className="text-white text-xl font-bold">
                      {new Date(upcomingMatches[0].date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card className="bg-primary/10 border-primary/20 hover:border-primary/40 transition-all">
                <CardContent className="p-6 flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                    <Users className="text-white" size={24} />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Teams</p>
                    <p className="text-white text-xl font-bold">{standings.length}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Upcoming Fixtures */}
      <section className="py-16 bg-base">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-white">Upcoming Fixtures</h2>
            <Link href="/matches">
              <Button variant="ghost" className="text-secondary hover:text-secondary/80">
                View All
                <ArrowRight className="ml-2" size={16} />
              </Button>
            </Link>
          </div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {upcomingMatches.map((match) => (
              <motion.div key={match.id} variants={itemVariants}>
                <Card className="bg-base/50 border-primary/20 hover:border-primary/40 transition-all hover:shadow-lg hover:shadow-primary/10">
                  <CardContent className="p-6">
                    <div className="text-center mb-4">
                      <p className="text-secondary text-sm font-semibold">
                        {new Date(match.date).toLocaleDateString("en-US", {
                          weekday: "long",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                      <p className="text-gray-400 text-sm">{match.time}</p>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="text-center flex-1">
                        <div className="text-4xl mb-2">{match.homeTeam.logo}</div>
                        <p className="text-white font-semibold text-sm">{match.homeTeam.name}</p>
                      </div>

                      <div className="text-2xl text-gray-500 font-bold px-4">VS</div>

                      <div className="text-center flex-1">
                        <div className="text-4xl mb-2">{match.awayTeam.logo}</div>
                        <p className="text-white font-semibold text-sm">{match.awayTeam.name}</p>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-primary/20">
                      <p className="text-gray-400 text-xs text-center">{match.venue}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* League Table Preview */}
      <section className="py-16 bg-gradient-to-b from-base to-base/95">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-white">League Table</h2>
            <Link href="/table">
              <Button variant="ghost" className="text-secondary hover:text-secondary/80">
                Full Table
                <ArrowRight className="ml-2" size={16} />
              </Button>
            </Link>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Card className="bg-base/50 border-primary/20">
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-primary/20">
                      <tr>
                        <th className="text-left p-4 text-gray-300 text-sm font-semibold">Pos</th>
                        <th className="text-left p-4 text-gray-300 text-sm font-semibold">Team</th>
                        <th className="text-center p-4 text-gray-300 text-sm font-semibold">P</th>
                        <th className="text-center p-4 text-gray-300 text-sm font-semibold">W</th>
                        <th className="text-center p-4 text-gray-300 text-sm font-semibold">D</th>
                        <th className="text-center p-4 text-gray-300 text-sm font-semibold">L</th>
                        <th className="text-center p-4 text-gray-300 text-sm font-semibold">GD</th>
                        <th className="text-center p-4 text-gray-300 text-sm font-semibold">Pts</th>
                      </tr>
                    </thead>
                    <tbody>
                      {topStandings.map((standing, index) => (
                        <motion.tr
                          key={standing.team.id}
                          className="border-b border-primary/10 hover:bg-primary/5 transition-colors"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.05 }}
                        >
                          <td className="p-4">
                            <span className="text-white font-bold">{standing.position}</span>
                          </td>
                          <td className="p-4">
                            <div className="flex items-center space-x-3">
                              <span className="text-2xl">{standing.team.logo}</span>
                              <span className="text-white font-medium">{standing.team.name}</span>
                            </div>
                          </td>
                          <td className="text-center p-4 text-gray-300">{standing.played}</td>
                          <td className="text-center p-4 text-gray-300">{standing.won}</td>
                          <td className="text-center p-4 text-gray-300">{standing.drawn}</td>
                          <td className="text-center p-4 text-gray-300">{standing.lost}</td>
                          <td className="text-center p-4 text-gray-300">
                            {standing.goalDifference > 0 ? "+" : ""}
                            {standing.goalDifference}
                          </td>
                          <td className="text-center p-4">
                            <span className="text-secondary font-bold text-lg">{standing.points}</span>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Latest News */}
      <section className="py-16 bg-base">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-white">Latest News</h2>
            <Link href="/news">
              <Button variant="ghost" className="text-secondary hover:text-secondary/80">
                All News
                <ArrowRight className="ml-2" size={16} />
              </Button>
            </Link>
          </div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {newsArticles.map((article) => (
              <motion.div key={article.id} variants={itemVariants}>
                <Link href={`/news/${article.slug}`}>
                  <Card className="bg-base/50 border-primary/20 hover:border-primary/40 transition-all hover:shadow-lg hover:shadow-primary/10 overflow-hidden group">
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-secondary text-base">{article.category}</Badge>
                      </div>
                    </div>
                    <CardHeader>
                      <CardTitle className="text-white group-hover:text-secondary transition-colors line-clamp-2">
                        {article.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-400 text-sm line-clamp-3 mb-4">{article.excerpt}</p>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>{article.author}</span>
                        <span>
                          {new Date(article.date).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
