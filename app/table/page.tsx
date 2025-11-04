"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUp, ArrowDown, TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { standings } from "@/lib/data";

type SortField = "position" | "points" | "goalDifference" | "goalsFor";

export default function TablePage() {
  const [sortField, setSortField] = useState<SortField>("position");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const sortedStandings = [...standings].sort((a, b) => {
    const multiplier = sortDirection === "asc" ? 1 : -1;
    return (a[sortField] - b[sortField]) * multiplier;
  });

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection(field === "position" ? "asc" : "desc");
    }
  };

  const getFormColor = (result: "W" | "D" | "L") => {
    switch (result) {
      case "W":
        return "bg-primary text-white";
      case "D":
        return "bg-gray-500 text-white";
      case "L":
        return "bg-red-600 text-white";
    }
  };

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
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">League Table</h1>
          <p className="text-gray-400 text-lg">2024 Season Standings</p>
        </motion.div>

        {/* Legend */}
        <motion.div
          className="mb-8 flex flex-wrap gap-4 justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-primary rounded"></div>
            <span className="text-gray-400 text-sm">Champions League</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-secondary rounded"></div>
            <span className="text-gray-400 text-sm">Promotion</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-red-600 rounded"></div>
            <span className="text-gray-400 text-sm">Relegation</span>
          </div>
        </motion.div>

        {/* Desktop Table */}
        <motion.div
          className="hidden md:block"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="bg-base/50 border-primary/20 overflow-hidden">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-primary/20">
                    <tr>
                      <th className="text-left p-4 text-gray-300 text-sm font-semibold">
                        <button
                          onClick={() => handleSort("position")}
                          className="flex items-center space-x-1 hover:text-secondary transition-colors"
                        >
                          <span>Pos</span>
                          {sortField === "position" && (
                            sortDirection === "asc" ? <ArrowUp size={14} /> : <ArrowDown size={14} />
                          )}
                        </button>
                      </th>
                      <th className="text-left p-4 text-gray-300 text-sm font-semibold">Team</th>
                      <th className="text-center p-4 text-gray-300 text-sm font-semibold">P</th>
                      <th className="text-center p-4 text-gray-300 text-sm font-semibold">W</th>
                      <th className="text-center p-4 text-gray-300 text-sm font-semibold">D</th>
                      <th className="text-center p-4 text-gray-300 text-sm font-semibold">L</th>
                      <th className="text-center p-4 text-gray-300 text-sm font-semibold">
                        <button
                          onClick={() => handleSort("goalsFor")}
                          className="flex items-center space-x-1 hover:text-secondary transition-colors mx-auto"
                        >
                          <span>GF</span>
                          {sortField === "goalsFor" && (
                            sortDirection === "asc" ? <ArrowUp size={14} /> : <ArrowDown size={14} />
                          )}
                        </button>
                      </th>
                      <th className="text-center p-4 text-gray-300 text-sm font-semibold">GA</th>
                      <th className="text-center p-4 text-gray-300 text-sm font-semibold">
                        <button
                          onClick={() => handleSort("goalDifference")}
                          className="flex items-center space-x-1 hover:text-secondary transition-colors mx-auto"
                        >
                          <span>GD</span>
                          {sortField === "goalDifference" && (
                            sortDirection === "asc" ? <ArrowUp size={14} /> : <ArrowDown size={14} />
                          )}
                        </button>
                      </th>
                      <th className="text-center p-4 text-gray-300 text-sm font-semibold">
                        <button
                          onClick={() => handleSort("points")}
                          className="flex items-center space-x-1 hover:text-secondary transition-colors mx-auto"
                        >
                          <span>Pts</span>
                          {sortField === "points" && (
                            sortDirection === "asc" ? <ArrowUp size={14} /> : <ArrowDown size={14} />
                          )}
                        </button>
                      </th>
                      <th className="text-center p-4 text-gray-300 text-sm font-semibold">Form</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sortedStandings.map((standing, index) => {
                      let positionColor = "";
                      if (standing.position === 1) positionColor = "border-l-4 border-l-primary";
                      else if (standing.position <= 3) positionColor = "border-l-4 border-l-secondary";
                      else if (standing.position >= standings.length - 1)
                        positionColor = "border-l-4 border-l-red-600";

                      return (
                        <motion.tr
                          key={standing.team.id}
                          className={`border-b border-primary/10 hover:bg-primary/5 transition-colors ${positionColor}`}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.03 }}
                        >
                          <td className="p-4">
                            <span className="text-white font-bold">{standing.position}</span>
                          </td>
                          <td className="p-4">
                            <div className="flex items-center space-x-3">
                              <span className="text-3xl">{standing.team.logo}</span>
                              <div>
                                <p className="text-white font-medium">{standing.team.name}</p>
                                <p className="text-gray-500 text-xs">{standing.team.stadium}</p>
                              </div>
                            </div>
                          </td>
                          <td className="text-center p-4 text-gray-300">{standing.played}</td>
                          <td className="text-center p-4 text-gray-300">{standing.won}</td>
                          <td className="text-center p-4 text-gray-300">{standing.drawn}</td>
                          <td className="text-center p-4 text-gray-300">{standing.lost}</td>
                          <td className="text-center p-4 text-gray-300">{standing.goalsFor}</td>
                          <td className="text-center p-4 text-gray-300">{standing.goalsAgainst}</td>
                          <td className="text-center p-4">
                            <span
                              className={`font-semibold ${
                                standing.goalDifference > 0
                                  ? "text-primary"
                                  : standing.goalDifference < 0
                                  ? "text-red-500"
                                  : "text-gray-400"
                              }`}
                            >
                              {standing.goalDifference > 0 ? "+" : ""}
                              {standing.goalDifference}
                            </span>
                          </td>
                          <td className="text-center p-4">
                            <span className="text-secondary font-bold text-lg">{standing.points}</span>
                          </td>
                          <td className="p-4">
                            <div className="flex space-x-1 justify-center">
                              {standing.form.map((result, i) => (
                                <div
                                  key={i}
                                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${getFormColor(
                                    result
                                  )}`}
                                >
                                  {result}
                                </div>
                              ))}
                            </div>
                          </td>
                        </motion.tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Mobile Cards */}
        <motion.div
          className="md:hidden space-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {sortedStandings.map((standing, index) => {
            let positionBadge = "";
            if (standing.position === 1) positionBadge = "bg-primary";
            else if (standing.position <= 3) positionBadge = "bg-secondary text-base";
            else if (standing.position >= standings.length - 1) positionBadge = "bg-red-600";

            return (
              <motion.div
                key={standing.team.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="bg-base/50 border-primary/20">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <Badge className={positionBadge}>{standing.position}</Badge>
                        <span className="text-3xl">{standing.team.logo}</span>
                        <div>
                          <p className="text-white font-semibold">{standing.team.name}</p>
                          <p className="text-gray-500 text-xs">{standing.team.stadium}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-secondary font-bold text-2xl">{standing.points}</p>
                        <p className="text-gray-400 text-xs">points</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-4 gap-2 mb-3">
                      <div className="text-center">
                        <p className="text-gray-400 text-xs">P</p>
                        <p className="text-white font-semibold">{standing.played}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-gray-400 text-xs">W</p>
                        <p className="text-white font-semibold">{standing.won}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-gray-400 text-xs">D</p>
                        <p className="text-white font-semibold">{standing.drawn}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-gray-400 text-xs">L</p>
                        <p className="text-white font-semibold">{standing.lost}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-primary/20">
                      <div className="text-sm">
                        <span className="text-gray-400">GD: </span>
                        <span
                          className={`font-semibold ${
                            standing.goalDifference > 0
                              ? "text-primary"
                              : standing.goalDifference < 0
                              ? "text-red-500"
                              : "text-gray-400"
                          }`}
                        >
                          {standing.goalDifference > 0 ? "+" : ""}
                          {standing.goalDifference}
                        </span>
                      </div>
                      <div className="flex space-x-1">
                        {standing.form.map((result, i) => (
                          <div
                            key={i}
                            className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${getFormColor(
                              result
                            )}`}
                          >
                            {result}
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Stats Summary */}
        <motion.div
          className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <Card className="bg-primary/10 border-primary/20">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                  <TrendingUp className="text-white" size={24} />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Top Scorer</p>
                  <p className="text-white text-xl font-bold">{standings[0].team.name}</p>
                  <p className="text-secondary text-sm">{standings[0].goalsFor} goals</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-secondary/10 border-secondary/20">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center">
                  <TrendingUp className="text-base" size={24} />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Best Defense</p>
                  <p className="text-white text-xl font-bold">
                    {standings.reduce((prev, curr) =>
                      prev.goalsAgainst < curr.goalsAgainst ? prev : curr
                    ).team.name}
                  </p>
                  <p className="text-secondary text-sm">
                    {standings.reduce((prev, curr) =>
                      prev.goalsAgainst < curr.goalsAgainst ? prev : curr
                    ).goalsAgainst}{" "}
                    conceded
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-primary/10 border-primary/20">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                  <TrendingUp className="text-white" size={24} />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Most Wins</p>
                  <p className="text-white text-xl font-bold">
                    {standings.reduce((prev, curr) => (prev.won > curr.won ? prev : curr)).team.name}
                  </p>
                  <p className="text-secondary text-sm">
                    {standings.reduce((prev, curr) => (prev.won > curr.won ? prev : curr)).won} wins
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
