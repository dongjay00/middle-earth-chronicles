"use client";

import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api/client";
import { motion } from "framer-motion";
import Link from "next/link";
import { MdMovie, MdStar, MdAttachMoney } from "react-icons/md";
import { GiTwoCoins, GiLaurelsTrophy } from "react-icons/gi";

export default function MoviesPage() {
  const { data: movies, isLoading } = useQuery({
    queryKey: ["movies"],
    queryFn: () => api.getMovies().then((res) => res.data),
  });

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
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-5xl font-bold mb-4 flex items-center gap-4">
            <MdMovie className="text-primary-400" />
            Movies
          </h1>
          <p className="text-xl text-gray-400">
            The cinematic journey through Middle-earth
          </p>
        </motion.div>

        {isLoading ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="glass rounded-3xl h-96 animate-pulse" />
            ))}
          </div>
        ) : (
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          >
            {movies?.docs.map((movie) => (
              <motion.div key={movie._id} variants={item}>
                <Link
                  href={`/movies/${movie._id}`}
                  className="block glass rounded-3xl p-8 hover:bg-white/10 transition-all hover:scale-[1.02] group"
                >
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h2 className="text-3xl font-bold mb-2 group-hover:text-primary-400 transition-colors">
                        {movie.name}
                      </h2>
                      <div className="flex items-center gap-2 text-gray-400">
                        <span>{movie.runtimeInMinutes} minutes</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 bg-primary-500/20 px-4 py-2 rounded-full">
                      <MdStar className="text-primary-400" />
                      <span className="font-bold text-primary-400">
                        {movie.rottenTomatoesScore}%
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="glass rounded-xl p-4">
                      <div className="flex items-center gap-2 text-gray-400 mb-2">
                        <MdAttachMoney className="w-5 h-5" />
                        <span className="text-sm">Budget</span>
                      </div>
                      <div className="text-2xl font-bold">
                        ${movie.budgetInMillions}M
                      </div>
                    </div>

                    <div className="glass rounded-xl p-4">
                      <div className="flex items-center gap-2 text-gray-400 mb-2">
                        <GiTwoCoins className="w-5 h-5" />
                        <span className="text-sm">Box Office</span>
                      </div>
                      <div className="text-2xl font-bold text-green-400">
                        ${movie.boxOfficeRevenueInMillions}M
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-6 border-t border-white/10">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <GiLaurelsTrophy className="text-yellow-400" />
                        <span className="text-sm text-gray-400">
                          {movie.academyAwardWins}/
                          {movie.academyAwardNominations} Oscars
                        </span>
                      </div>
                    </div>
                    <span className="text-primary-400 group-hover:translate-x-2 transition-transform">
                      View Details →
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
