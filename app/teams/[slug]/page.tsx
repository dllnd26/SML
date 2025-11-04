"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, MapPin, Calendar, Users, Trophy, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { teams, matches, standings, getTeamPlayers } from "@/lib/data";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
    },
  },
};

export default function TeamDetailPage() {
  const params = useParams();
  const slug = params.slug as string;

  const team = teams.find((t) => t.slug === slug);

  if (!team) {
    return (
      <div className="min-h-screen bg-base flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Team Not Found</h1>
          <Link href="/teams">
            <Button className="bg-primary hover:bg-primary/90">
              <ArrowLeft className="mr-2" size={16} />
              Back to Teams
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const teamStanding = standings.find((s) => s.team.id === team.id);
  const teamMatches = matches.filter(
    (m) => m.homeTeam.id === team.id || m.awayTeam.id === team.id
  );
  const recentMatches = teamMatches.filter((m) => m.status === "completed").slice(0, 5);
  const upcomingMatches = teamMatches.filter((m) => m.status === "upcoming").slice(0, 3);
  const players = getTeamPlayers(team.id);

  return (
    <div className="min-h-screen bg-base">
      {/* Hero Section */}
      <section
        className="relative h-[400px] flex items-center justify-center overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${team.colors[0]} 0%, ${team.colors[1] || team.colors[0]} 100%)`,
        }}
      >
        <div className="absolute inset-0 bg-base/60" />
        
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/teams">
            <Button
              variant="ghost"
              className="mb-6 text-white hover:text-secondary hover:bg-white/10"
            >
              <ArrowLeft className="mr-2" size={16} />
              Back to Teams
            </Button>
          </Link>

          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className="text-9xl mb-6"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
            >
              {team.logo}
            </motion.div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">{team.name}</h1>
            <div className="flex flex-wrap justify-center gap-4 text-white/90">
              <div className="flex items-center space-x-2">
                <Calendar size={20} />
                <span>Founded {team.founded}</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin size={20} />
                <span>{team.stadium}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users size={20} />
                <span>Capacity: {team.capacity.toLocaleString()}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Stats Overview */}
        {teamStanding && (
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants}>
              <Card className="bg-primary/10 border-primary/20">
                <CardContent className="p-6 text-center">
                  <Trophy className="mx-auto mb-2 text-secondary" size={32} />
                  <p className="text-3xl font-bold text-white mb-1">{teamStanding.position}</p>
                  <p className="text-gray-400 text-sm">Position</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card className="bg-secondary/10 border-secondary/20">
                <CardContent className="p-6 text-center">
                  <Target className="mx-auto mb-2 text-secondary" size={32} />
                  <p className="text-3xl font-bold text-white mb-1">{teamStanding.points}</p>
                  <p className="text-gray-400 text-sm">Points</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card className="bg-primary/10 border-primary/20">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl mb-2">⚽</div>
                  <p className="text-3xl font-bold text-white mb-1">{teamStanding.goalsFor}</p>
                  <p className="text-gray-400 text-sm">Goals Scored</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card className="bg-secondary/10 border-secondary/20">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl mb-2">🛡️</div>
                  <p className="text-3xl font-bold text-white mb-1">{teamStanding.goalsAgainst}</p>
                  <p className="text-gray-400 text-sm">Goals Conceded</p>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Recent Matches */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h2 className="text-2xl font-bold text-white mb-4">Recent Matches</h2>
              <div className="space-y-3">
                {recentMatches.map((match) => {
                  const isHome = match.homeTeam.id === team.id;
                  const opponent = isHome ? match.awayTeam : match.homeTeam;
                  const teamScore = isHome ? match.homeScore : match.awayScore;
                  const opponentScore = isHome ? match.awayScore : match.homeScore;
                  const result =
                    teamScore! > opponentScore!
                      ? "W"
                      : teamScore! < opponentScore!
                      ? "L"
                      : "D";

                  return (
                    <Card
                      key={match.id}
                      className="bg-base/50 border-primary/20 hover:border-primary/40 transition-all"
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4 flex-1">
                            <Badge
                              className={
                                result === "W"
                                  ? "bg-primary"
                                  : result === "L"
                                  ? "bg-red-600"
                                  : "bg-gray-500"
                              }
                            >
                              {result}
                            </Badge>
                            <div className="flex items-center space-x-3">
                              <span className="text-2xl">{isHome ? team.logo : opponent.logo}</span>
                              <div>
                                <p className="text-white font-semibold">
                                  {isHome ? "vs" : "@"} {opponent.name}
                                </p>
                                <p className="text-gray-400 text-xs">
                                  {new Date(match.date).toLocaleDateString("en-US", {
                                    month: "short",
                                    day: "numeric",
                                  })}
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="text-2xl font-bold text-white">
                            {teamScore} - {opponentScore}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </motion.div>

            {/* Squad */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h2 className="text-2xl font-bold text-white mb-4">Squad</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {players.map((player, index) => (
                  <motion.div
                    key={player.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + index * 0.05 }}
                  >
                    <Card className="bg-base/50 border-primary/20 hover:border-primary/40 transition-all">
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold text-xl">
                            {player.number}
                          </div>
                          <div className="flex-1">
                            <p className="text-white font-semibold">{player.name}</p>
                            <p className="text-gray-400 text-sm">{player.position}</p>
                          </div>
                          {player.goals !== undefined && player.goals > 0 && (
                            <div className="text-right">
                              <p className="text-secondary font-bold">{player.goals}</p>
                              <p className="text-gray-400 text-xs">goals</p>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Upcoming Matches */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Card className="bg-base/50 border-primary/20">
                <CardHeader>
                  <CardTitle className="text-white">Upcoming Matches</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {upcomingMatches.map((match) => {
                    const isHome = match.homeTeam.id === team.id;
                    const opponent = isHome ? match.awayTeam : match.homeTeam;

                    return (
                      <div
                        key={match.id}
                        className="p-3 bg-primary/5 rounded-lg border border-primary/10"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-2xl">{opponent.logo}</span>
                          <Badge className="bg-secondary text-base text-xs">
                            {isHome ? "HOME" : "AWAY"}
                          </Badge>
                        </div>
                        <p className="text-white font-semibold text-sm mb-1">{opponent.name}</p>
                        <p className="text-gray-400 text-xs">
                          {new Date(match.date).toLocaleDateString("en-US", {
                            weekday: "short",
                            month: "short",
                            day: "numeric",
                          })}{" "}
                          • {match.time}
                        </p>
                      </div>
                    );
                  })}
                </CardContent>
              </Card>
            </motion.div>

            {/* Team Info */}
            {teamStanding && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
              >
                <Card className="bg-base/50 border-primary/20">
                  <CardHeader>
                    <CardTitle className="text-white">Season Stats</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Matches Played</span>
                      <span className="text-white font-semibold">{teamStanding.played}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Wins</span>
                      <span className="text-primary font-semibold">{teamStanding.won}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Draws</span>
                      <span className="text-gray-300 font-semibold">{teamStanding.drawn}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Losses</span>
                      <span className="text-red-500 font-semibold">{teamStanding.lost}</span>
                    </div>
                    <div className="pt-3 border-t border-primary/20">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">Goal Difference</span>
                        <span
                          className={`font-semibold ${
                            teamStanding.goalDifference > 0
                              ? "text-primary"
                              : teamStanding.goalDifference < 0
                              ? "text-red-500"
                              : "text-gray-400"
                          }`}
                        >
                          {teamStanding.goalDifference > 0 ? "+" : ""}
                          {teamStanding.goalDifference}
                        </span>
                      </div>
                    </div>
                    <div className="pt-3 border-t border-primary/20">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400 font-semibold">Total Points</span>
                        <span className="text-secondary font-bold text-xl">
                          {teamStanding.points}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
