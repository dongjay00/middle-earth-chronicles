"use client";

import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api/client";
import { motion } from "framer-motion";
import Link from "next/link";
import { MdArrowBack, MdStar } from "react-icons/md";
import { GiLaurelsTrophy } from "react-icons/gi";
import { useParams } from "next/navigation";
import { useState } from "react";

export default function MovieDetailPage() {
  const params = useParams<{ id: string }>();
  const [page, setPage] = useState(1);
  const { data: movie, isLoading: movieLoading } = useQuery({
    queryKey: ["movie", params.id],
    queryFn: () => api.getMovie(params.id).then((res) => res.data.docs[0]),
  });

  const { data: quotes, isLoading: quotesLoading } = useQuery({
    queryKey: ["movie-quotes", params.id, page],
    queryFn: () =>
      api
        .getMovieQuotes(params.id, { limit: 10, page: page })
        .then((res) => res.data),
    enabled: !!params.id,
  });

  if (movieLoading) {
    return (
      <div className="pt-16 min-h-screen">
        <div className="container mx-auto px-4 py-12">
          <div className="glass rounded-3xl h-96 animate-pulse" />
        </div>
      </div>
    );
  }

  if (!movie) return null;

  return (
    <div className="pt-16 min-h-screen">
      <div className="container mx-auto px-4 py-12">
        <Link
          href="/movies"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors"
        >
          <MdArrowBack />
          Back to Movies
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-3xl p-12 mb-8"
        >
          <div className="flex items-start justify-between mb-8">
            <div>
              <h1 className="text-5xl font-bold mb-4">{movie.name}</h1>
              <div className="flex items-center gap-4 text-gray-400">
                <span>{movie.runtimeInMinutes} minutes</span>
                <span>•</span>
                <div className="flex items-center gap-2">
                  <MdStar className="text-primary-400" />
                  <span className="text-primary-400 font-bold">
                    {movie.rottenTomatoesScore}%
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="glass rounded-xl p-6">
              <div className="text-sm text-gray-400 mb-2">Budget</div>
              <div className="text-3xl font-bold">
                ${movie.budgetInMillions}M
              </div>
            </div>
            <div className="glass rounded-xl p-6">
              <div className="text-sm text-gray-400 mb-2">Box Office</div>
              <div className="text-3xl font-bold text-green-400">
                ${movie.boxOfficeRevenueInMillions}M
              </div>
            </div>
            <div className="glass rounded-xl p-6">
              <div className="text-sm text-gray-400 mb-2">Nominations</div>
              <div className="text-3xl font-bold flex items-center gap-2">
                <GiLaurelsTrophy className="text-yellow-400" />
                {movie.academyAwardNominations}
              </div>
            </div>
            <div className="glass rounded-xl p-6">
              <div className="text-sm text-gray-400 mb-2">Oscar Wins</div>
              <div className="text-3xl font-bold flex items-center gap-2">
                <GiLaurelsTrophy className="text-yellow-400" />
                {movie.academyAwardWins}
              </div>
            </div>
          </div>

          <div className="glass rounded-xl p-6">
            <div className="text-sm text-gray-400 mb-2">ROI</div>
            <div className="text-2xl font-bold text-primary-400">
              {(
                (movie.boxOfficeRevenueInMillions / movie.budgetInMillions -
                  1) *
                100
              ).toFixed(0)}
              % Return
            </div>
          </div>
        </motion.div>

        {/* Quotes Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-3xl font-bold mb-6">Memorable Quotes</h2>
          {quotesLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[...Array(10)].map((_, i) => (
                <div key={i} className="glass rounded-xl h-32 animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {quotes?.docs.map((quote) => (
                <div
                  key={quote._id}
                  className="glass rounded-xl p-6 hover:bg-white/10 transition-colors"
                >
                  <p className="text-gray-300 italic">
                    &ldquo;{quote.dialog}&rdquo;
                  </p>
                </div>
              ))}
            </div>
          )}
          {quotes && quotes.total > 10 && (
            <div className="flex justify-center items-center gap-4 mt-6">
              <button
                onClick={() => setPage((old) => Math.max(old - 1, 1))}
                disabled={page === 1}
                className="px-4 py-2 bg-primary-500 text-white rounded-lg disabled:bg-gray-600 transition-colors"
              >
                Previous
              </button>
              <span className="text-gray-400">
                Page {quotes.page} of {quotes.pages}
              </span>
              <button
                onClick={() =>
                  setPage((old) => Math.min(old + 1, quotes.pages))
                }
                disabled={page === quotes.pages}
                className="px-4 py-2 bg-primary-500 text-white rounded-lg disabled:bg-gray-600 transition-colors"
              >
                Next
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
