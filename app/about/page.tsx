"use client";

import { motion } from "framer-motion";
import { Trophy, Users, Target, Heart, TrendingUp, Globe } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const values = [
  {
    icon: Trophy,
    title: "Excellence",
    description: "Striving for the highest standards in Surinamese football",
  },
  {
    icon: Heart,
    title: "Passion",
    description: "Celebrating the love and dedication for the beautiful game",
  },
  {
    icon: Users,
    title: "Community",
    description: "Bringing people together through the power of sport",
  },
  {
    icon: Target,
    title: "Development",
    description: "Nurturing talent and growing the sport at all levels",
  },
];

const milestones = [
  { year: "1920s", event: "Formation of organized football in Suriname" },
  { year: "1962", event: "Establishment of the Suriname Major League" },
  { year: "1980s", event: "International recognition and growth" },
  { year: "2000s", event: "Modernization of league structure" },
  { year: "2024", event: "Record attendance and digital transformation" },
];

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

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-base">
      {/* Hero Section */}
      <section
        className="relative h-[400px] flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=1920&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-base/95 via-base/80 to-base/60" />
        
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">About SML</h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              The premier football league of Suriname, dedicated to excellence, passion, and the
              development of the beautiful game
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Mission Statement */}
        <motion.div
          className="max-w-4xl mx-auto mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Card className="bg-gradient-to-br from-primary to-secondary border-0">
            <CardContent className="p-8 md:p-12 text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Our Mission</h2>
              <p className="text-white/90 text-lg leading-relaxed">
                To promote and develop football in Suriname by providing a competitive, professional,
                and entertaining league that showcases local talent, inspires the next generation,
                and brings communities together through the universal language of sport.
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* History */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
            Our History
          </h2>
          <div className="max-w-4xl mx-auto">
            <Card className="bg-base/50 border-primary/20">
              <CardContent className="p-8">
                <p className="text-gray-400 leading-relaxed mb-6">
                  The Suriname Major League has been at the heart of Surinamese football for decades,
                  serving as the pinnacle of domestic competition. Founded in the early 1960s, the
                  league has grown from humble beginnings to become a cornerstone of sporting culture
                  in Suriname.
                </p>
                <p className="text-gray-400 leading-relaxed mb-6">
                  Throughout its history, the SML has produced numerous talented players who have gone
                  on to represent Suriname internationally and play professionally in leagues around
                  the world. The league has been instrumental in developing the technical skills,
                  tactical awareness, and competitive spirit that characterize Surinamese football.
                </p>
                <p className="text-gray-400 leading-relaxed">
                  Today, the SML continues to evolve, embracing modern technology and professional
                  standards while maintaining the passion and community spirit that have always been
                  at its core. With a commitment to youth development, infrastructure improvement,
                  and fan engagement, the league is building a bright future for Surinamese football.
                </p>
              </CardContent>
            </Card>
          </div>
        </motion.div>

        {/* Timeline */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
            Key Milestones
          </h2>
          <div className="max-w-4xl mx-auto relative">
            {/* Vertical Timeline Line */}
            <div className="absolute left-[39px] top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-secondary to-primary" />
            
            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={index}
                  className="relative"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex items-start">
                    {/* Timeline Node */}
                    <div className="flex-shrink-0 relative z-10">
                      <motion.div
                        className="w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center shadow-lg shadow-primary/30 border-4 border-base"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <span className="text-white font-bold text-sm text-center leading-tight">
                          {milestone.year}
                        </span>
                      </motion.div>
                    </div>

                    {/* Content Card */}
                    <div className="flex-1 ml-8">
                      <Card className="bg-base/50 border-primary/20 hover:border-primary/40 transition-all hover:shadow-lg hover:shadow-primary/10">
                        <CardContent className="p-6">
                          <p className="text-white text-lg leading-relaxed">{milestone.event}</p>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Values */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
            Our Values
          </h2>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div key={index} variants={itemVariants}>
                  <Card className="bg-base/50 border-primary/20 hover:border-primary/40 transition-all h-full">
                    <CardContent className="p-6 text-center">
                      <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                        <Icon className="text-white" size={32} />
                      </div>
                      <h3 className="text-white font-bold text-xl mb-3">{value.title}</h3>
                      <p className="text-gray-400 text-sm">{value.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
            By The Numbers
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <Card className="bg-primary/10 border-primary/20">
              <CardContent className="p-6 text-center">
                <TrendingUp className="mx-auto mb-3 text-secondary" size={40} />
                <p className="text-4xl font-bold text-white mb-2">60+</p>
                <p className="text-gray-400 text-sm">Years of History</p>
              </CardContent>
            </Card>

            <Card className="bg-secondary/10 border-secondary/20">
              <CardContent className="p-6 text-center">
                <Users className="mx-auto mb-3 text-secondary" size={40} />
                <p className="text-4xl font-bold text-white mb-2">8</p>
                <p className="text-gray-400 text-sm">Professional Teams</p>
              </CardContent>
            </Card>

            <Card className="bg-primary/10 border-primary/20">
              <CardContent className="p-6 text-center">
                <Trophy className="mx-auto mb-3 text-secondary" size={40} />
                <p className="text-4xl font-bold text-white mb-2">200+</p>
                <p className="text-gray-400 text-sm">Matches per Season</p>
              </CardContent>
            </Card>

            <Card className="bg-secondary/10 border-secondary/20">
              <CardContent className="p-6 text-center">
                <Globe className="mx-auto mb-3 text-secondary" size={40} />
                <p className="text-4xl font-bold text-white mb-2">50K+</p>
                <p className="text-gray-400 text-sm">Passionate Fans</p>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
