"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { GiRing } from "react-icons/gi";
import {
  MdMovie,
  MdPeople,
  MdFormatQuote,
  MdMenuBook,
  MdMenu,
  MdClose,
} from "react-icons/md";
import { useState } from "react";

const navItems = [
  { href: "/", label: "Home", icon: GiRing },
  { href: "/movies", label: "Movies", icon: MdMovie },
  { href: "/characters", label: "Characters", icon: MdPeople },
  { href: "/quotes", label: "Quotes", icon: MdFormatQuote },
  { href: "/books", label: "Books", icon: MdMenuBook },
];

export default function Navigation() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 group">
            <GiRing className="w-8 h-8 text-primary-400 group-hover:rotate-180 transition-transform duration-500" />
            <span className="font-display text-xl font-bold">Middle-earth</span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="relative px-4 py-2 group"
                >
                  <div className="flex items-center gap-2">
                    <Icon
                      className={`w-5 h-5 ${
                        isActive
                          ? "text-primary-400"
                          : "text-gray-400 group-hover:text-white"
                      }`}
                    />
                    <span
                      className={`text-sm font-medium ${
                        isActive
                          ? "text-primary-400"
                          : "text-gray-400 group-hover:text-white"
                      }`}
                    >
                      {item.label}
                    </span>
                  </div>
                  {isActive && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-400"
                      initial={false}
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 30,
                      }}
                    />
                  )}
                </Link>
              );
            })}
          </div>
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? (
                <MdClose className="w-6 h-6" />
              ) : (
                <MdMenu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden glass">
          <div className="container mx-auto px-4 pb-4">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="relative px-4 py-2 group block"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <div className="flex items-center gap-2">
                    <Icon
                      className={`w-5 h-5 ${
                        isActive
                          ? "text-primary-400"
                          : "text-gray-400 group-hover:text-white"
                      }`}
                    />
                    <span
                      className={`text-sm font-medium ${
                        isActive
                          ? "text-primary-400"
                          : "text-gray-400 group-hover:text-white"
                      }`}
                    >
                      {item.label}
                    </span>
                  </div>
                  {isActive && (
                    <motion.div
                      layoutId="navbar-indicator-mobile"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-400"
                      initial={false}
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 30,
                      }}
                    />
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
}
