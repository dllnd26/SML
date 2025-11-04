"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Users, MapPin, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { teams } from "@/lib/data";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
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

export default function TeamsPage() {
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
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Teams</h1>
          <p className="text-gray-400 text-lg">Meet the clubs competing in the 2024 season</p>
        </motion.div>

        {/* Teams Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {teams.map((team) => (
            <motion.div key={team.id} variants={itemVariants}>
              <Link href={`/teams/${team.slug}`}>
                <Card className="bg-base/50 border-primary/20 hover:border-primary/40 transition-all hover:shadow-lg hover:shadow-primary/10 group h-full">
                  <CardHeader className="text-center pb-4">
                    <motion.div
                      className="text-7xl mb-4"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      {team.logo}
                    </motion.div>
                    <CardTitle className="text-white group-hover:text-secondary transition-colors">
                      {team.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center space-x-2 text-gray-400 text-sm">
                      <Calendar size={16} className="text-secondary flex-shrink-0" />
                      <span>Founded {team.founded}</span>
                    </div>
                    <div className="flex items-start space-x-2 text-gray-400 text-sm">
                      <MapPin size={16} className="text-secondary flex-shrink-0 mt-0.5" />
                      <span className="line-clamp-2">{team.stadium}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-400 text-sm">
                      <Users size={16} className="text-secondary flex-shrink-0" />
                      <span>Capacity: {team.capacity.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center space-x-2 pt-2">
                      <span className="text-gray-400 text-sm">Colors:</span>
                      <div className="flex space-x-1">
                        {team.colors.map((color, index) => (
                          <div
                            key={index}
                            className="w-6 h-6 rounded-full border-2 border-white/20"
                            style={{ backgroundColor: color }}
                          />
                        ))}
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
