"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { matches } from "@/lib/data";

export default function MatchesPage() {
  const [selectedTab, setSelectedTab] = useState("all");

  const upcomingMatches = matches.filter((m) => m.status === "upcoming");
  const completedMatches = matches.filter((m) => m.status === "completed");
  const liveMatches = matches.filter((m) => m.status === "live");

  const getMatchesByTab = () => {
    switch (selectedTab) {
      case "upcoming":
        return upcomingMatches;
      case "completed":
        return completedMatches;
      case "live":
        return liveMatches;
      default:
        return matches;
    }
  };

  const displayMatches = getMatchesByTab();

  // Group matches by week
  const matchesByWeek = displayMatches.reduce((acc, match) => {
    const week = match.week;
    if (!acc[week]) {
      acc[week] = [];
    }
    acc[week].push(match);
    return acc;
  }, {} as Record<number, typeof matches>);

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
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Fixtures & Results</h1>
          <p className="text-gray-400 text-lg">2024 Season Schedule</p>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Tabs defaultValue="all" className="w-full" onValueChange={setSelectedTab}>
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-4 mb-8 bg-primary/20">
              <TabsTrigger value="all" className="data-[state=active]:bg-primary">
                All
              </TabsTrigger>
              <TabsTrigger value="upcoming" className="data-[state=active]:bg-primary">
                Upcoming
              </TabsTrigger>
              <TabsTrigger value="completed" className="data-[state=active]:bg-primary">
                Completed
              </TabsTrigger>
              <TabsTrigger value="live" className="data-[state=active]:bg-primary">
                Live
              </TabsTrigger>
            </TabsList>

            <TabsContent value={selectedTab} className="mt-0">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedTab}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-8"
                >
                  {Object.keys(matchesByWeek)
                    .sort((a, b) => Number(b) - Number(a))
                    .map((week) => (
                      <div key={week}>
                        <div className="flex items-center space-x-3 mb-4">
                          <Calendar className="text-secondary" size={20} />
                          <h2 className="text-2xl font-bold text-white">Week {week}</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {matchesByWeek[Number(week)].map((match, index) => (
                            <motion.div
                              key={match.id}
                              initial={{ opacity: 0, scale: 0.95 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: index * 0.05 }}
                            >
                              <Card className="bg-base/50 border-primary/20 hover:border-primary/40 transition-all hover:shadow-lg hover:shadow-primary/10">
                                <CardContent className="p-6">
                                  {/* Match Status Badge */}
                                  <div className="flex justify-between items-center mb-4">
                                    <div className="text-gray-400 text-sm">
                                      {new Date(match.date).toLocaleDateString("en-US", {
                                        weekday: "short",
                                        month: "short",
                                        day: "numeric",
                                      })}{" "}
                                      • {match.time}
                                    </div>
                                    {match.status === "live" && (
                                      <motion.div
                                        animate={{
                                          scale: [1, 1.1, 1],
                                          opacity: [1, 0.8, 1],
                                        }}
                                        transition={{
                                          duration: 1.5,
                                          repeat: Infinity,
                                          ease: "easeInOut",
                                        }}
                                      >
                                        <Badge className="bg-red-600 text-white">
                                          <span className="mr-1">●</span> LIVE
                                        </Badge>
                                      </motion.div>
                                    )}
                                    {match.status === "upcoming" && (
                                      <Badge className="bg-secondary text-base">Upcoming</Badge>
                                    )}
                                    {match.status === "completed" && (
                                      <Badge className="bg-primary/20 text-primary-foreground">
                                        Full Time
                                      </Badge>
                                    )}
                                  </div>

                                  {/* Teams and Score */}
                                  <div className="flex items-center justify-between">
                                    {/* Home Team */}
                                    <div className="flex-1 text-center">
                                      <motion.div
                                        className="text-5xl mb-3"
                                        whileHover={{ scale: 1.1, rotate: 5 }}
                                        transition={{ type: "spring", stiffness: 300 }}
                                      >
                                        {match.homeTeam.logo}
                                      </motion.div>
                                      <p className="text-white font-semibold text-sm md:text-base">
                                        {match.homeTeam.name}
                                      </p>
                                    </div>

                                    {/* Score or VS */}
                                    <div className="px-6">
                                      {match.status === "completed" ? (
                                        <div className="flex items-center space-x-4">
                                          <motion.div
                                            className="text-4xl font-bold text-white"
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{
                                              type: "spring",
                                              stiffness: 200,
                                              delay: 0.2,
                                            }}
                                          >
                                            {match.homeScore}
                                          </motion.div>
                                          <div className="text-2xl text-gray-500">-</div>
                                          <motion.div
                                            className="text-4xl font-bold text-white"
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{
                                              type: "spring",
                                              stiffness: 200,
                                              delay: 0.3,
                                            }}
                                          >
                                            {match.awayScore}
                                          </motion.div>
                                        </div>
                                      ) : (
                                        <div className="text-2xl text-gray-500 font-bold">VS</div>
                                      )}
                                    </div>

                                    {/* Away Team */}
                                    <div className="flex-1 text-center">
                                      <motion.div
                                        className="text-5xl mb-3"
                                        whileHover={{ scale: 1.1, rotate: -5 }}
                                        transition={{ type: "spring", stiffness: 300 }}
                                      >
                                        {match.awayTeam.logo}
                                      </motion.div>
                                      <p className="text-white font-semibold text-sm md:text-base">
                                        {match.awayTeam.name}
                                      </p>
                                    </div>
                                  </div>

                                  {/* Venue */}
                                  <div className="mt-6 pt-4 border-t border-primary/20 flex items-center justify-center space-x-2 text-gray-400 text-sm">
                                    <MapPin size={14} className="text-secondary" />
                                    <span>{match.venue}</span>
                                  </div>
                                </CardContent>
                              </Card>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    ))}
                </motion.div>
              </AnimatePresence>

              {displayMatches.length === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-12"
                >
                  <p className="text-gray-400 text-lg">No matches found in this category.</p>
                </motion.div>
              )}
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
}
