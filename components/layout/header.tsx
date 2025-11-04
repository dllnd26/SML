"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X, Home, Trophy, Calendar, Users, Newspaper, Info, Mail, Facebook, Twitter, Instagram, Youtube } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const navigation = [
  { name: "Home", href: "/", icon: Home },
  { name: "League Table", href: "/table", icon: Trophy },
  { name: "Fixtures & Results", href: "/matches", icon: Calendar },
  { name: "Teams", href: "/teams", icon: Users },
  { name: "News", href: "/news", icon: Newspaper },
  { name: "About", href: "/about", icon: Info },
  { name: "Contact", href: "/contact", icon: Mail },
];

const socialLinks = [
  { name: "Facebook", icon: Facebook, href: "#" },
  { name: "Twitter", icon: Twitter, href: "#" },
  { name: "Instagram", icon: Instagram, href: "#" },
  { name: "Youtube", icon: Youtube, href: "#" },
];

const sponsors = [
  { name: "Telesur", logo: "/partners/telesur_logo.png" },
  { name: "GOW2", logo: "/partners/gow2_logo.png" },
];

export function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      className="sticky top-0 z-50 w-full"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Top Bar - Sponsors & Social */}
      <div className="bg-base/95 border-b border-primary/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-12">
            {/* Sponsors */}
            <div className="flex items-center space-x-6">
              <span className="text-gray-400 text-xs uppercase tracking-wider hidden md:block">
                Official Partners
              </span>
              <div className="flex items-center space-x-6">
                {sponsors.map((sponsor, index) => (
                  <motion.div
                    key={index}
                    className="relative h-8 w-auto opacity-70 hover:opacity-100 transition-opacity cursor-pointer"
                    whileHover={{ scale: 1.05 }}
                  >
                    <Image
                      src={sponsor.logo}
                      alt={sponsor.name}
                      width={80}
                      height={32}
                      className="object-contain h-8 w-auto"
                    />
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex items-center space-x-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    whileHover={{ scale: 1.1, y: -2 }}
                    className="text-gray-400 hover:text-secondary transition-colors"
                    aria-label={social.name}
                  >
                    <Icon size={16} />
                  </motion.a>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav
        className={cn(
          "transition-all duration-300",
          isScrolled
            ? "bg-base/95 backdrop-blur-md shadow-lg border-b border-primary/20"
            : "bg-base/80 backdrop-blur-sm"
        )}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3 group">
              <motion.div
                className="relative w-12 h-12"
                whileHover={{ scale: 1.05, rotate: 5 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <Image
                  src="/SML_logo.png"
                  alt="SML Logo"
                  width={48}
                  height={48}
                  className="object-contain"
                  priority
                />
              </motion.div>
              <div className="hidden sm:block">
                <div className="text-white font-bold text-xl">Suriname Major League</div>
                <div className="text-secondary text-xs">Football Excellence</div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {navigation.map((item) => {
                const isActive = pathname === item.href;
                const Icon = item.icon;
                return (
                  <Link key={item.name} href={item.href}>
                    <Button
                      variant="ghost"
                      className={cn(
                        "relative text-white hover:text-secondary transition-colors gap-2",
                        isActive && "text-secondary"
                      )}
                    >
                      <Icon size={18} />
                      {item.name}
                      {isActive && (
                        <motion.div
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-secondary"
                          layoutId="navbar-indicator"
                          transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        />
                      )}
                    </Button>
                  </Link>
                );
              })}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden text-white p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Navigation */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="lg:hidden overflow-hidden"
              >
                <div className="py-4 space-y-2">
                  {navigation.map((item) => {
                    const isActive = pathname === item.href;
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <div
                          className={cn(
                            "flex items-center space-x-3 px-4 py-3 rounded-lg text-white hover:bg-primary/20 transition-colors",
                            isActive && "bg-primary/30 text-secondary font-semibold"
                          )}
                        >
                          <Icon size={20} />
                          <span>{item.name}</span>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>
    </motion.header>
  );
}
