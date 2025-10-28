"use client";

import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api/client";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  MdMovie,
  MdPeople,
  MdFormatQuote,
  MdMenuBook,
  MdTrendingUp,
} from "react-icons/md";
import { GiRing } from "react-icons/gi";

export default function HomePage() {
  const { data: movies, isLoading: moviesLoading } = useQuery({
    queryKey: ["movies"],
    queryFn: () => api.getMovies().then((res) => res.data),
  });

  const { data: characters, isLoading: charactersLoading } = useQuery({
    queryKey: ["characters"],
    queryFn: () => api.getCharacters({ limit: 10 }).then((res) => res.data),
  });

  const { data: quotes, isLoading: quotesLoading } = useQuery({
    queryKey: ["quotes"],
    queryFn: () => api.getQuotes({ limit: 1 }).then((res) => res.data),
  });

  const stats = [
    {
      label: "Movies",
      value: movies?.total || 0,
      icon: MdMovie,
      color: "text-blue-400",
    },
    {
      label: "Characters",
      value: characters?.total || 0,
      icon: MdPeople,
      color: "text-green-400",
    },
    {
      label: "Quotes",
      value: quotes?.total || 0,
      icon: MdFormatQuote,
      color: "text-purple-400",
    },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div className="pt-16 min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary-900/20 via-black to-black" />
        <div className="container mx-auto px-4 py-24 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <GiRing className="w-20 h-20 mx-auto mb-6 text-primary-400 animate-pulse" />
            <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary-300 via-primary-400 to-primary-500 bg-clip-text text-transparent">
              Middle-earth Chronicles
            </h1>
            <p className="text-xl text-gray-400 mb-8">
              Explore the legendary world of The Lord of the Rings
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4 py-16">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={idx}
                variants={item}
                className="glass rounded-2xl p-8 hover:bg-white/10 transition-colors"
              >
                <Icon className={`w-12 h-12 ${stat.color} mb-4`} />
                <div className="text-4xl font-bold mb-2">
                  {stat.value.toLocaleString()}
                </div>
                <div className="text-gray-400">{stat.label}</div>
              </motion.div>
            );
          })}
        </motion.div>
      </section>

      {/* Featured Movies */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
          <MdTrendingUp className="text-primary-400" />
          Featured Movies
        </h2>

        {moviesLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(9)].map((_, i) => (
              <div key={i} className="glass rounded-2xl h-64 animate-pulse" />
            ))}
          </div>
        ) : (
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {movies?.docs.map((movie) => (
              <motion.div key={movie._id} variants={item}>
                <Link
                  href={`/movies/${movie._id}`}
                  className="block glass rounded-2xl p-6 hover:bg-white/10 transition-all hover:scale-105 group"
                >
                  <h3 className="text-xl font-bold mb-4 group-hover:text-primary-400 transition-colors">
                    {movie.name}
                  </h3>
                  <div className="space-y-2 text-sm text-gray-400">
                    <div className="flex justify-between">
                      <span>Runtime</span>
                      <span className="text-white">
                        {movie.runtimeInMinutes} min
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Budget</span>
                      <span className="text-white">
                        ${movie.budgetInMillions}M
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Box Office</span>
                      <span className="text-white">
                        ${movie.boxOfficeRevenueInMillions}M
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>RT Score</span>
                      <span className="text-primary-400 font-bold">
                        {movie.rottenTomatoesScore}%
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </section>

      {/* Quick Links */}
      <section className="container mx-auto px-4 py-16 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link
            href="/characters"
            className="glass rounded-2xl p-8 hover:bg-white/10 transition-all hover:scale-105 group"
          >
            <MdPeople className="w-12 h-12 text-green-400 mb-4" />
            <h3 className="text-2xl font-bold mb-2 group-hover:text-green-400 transition-colors">
              Explore Characters
            </h3>
            <p className="text-gray-400">
              Discover heroes, villains, and everyone in between
            </p>
          </Link>

          <Link
            href="/quotes"
            className="glass rounded-2xl p-8 hover:bg-white/10 transition-all hover:scale-105 group"
          >
            <MdFormatQuote className="w-12 h-12 text-purple-400 mb-4" />
            <h3 className="text-2xl font-bold mb-2 group-hover:text-purple-400 transition-colors">
              Famous Quotes
            </h3>
            <p className="text-gray-400">
              Read the most memorable lines from the trilogy
            </p>
          </Link>
        </div>
      </section>
    </div>
  );
}
