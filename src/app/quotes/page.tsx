"use client";

import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api/client";
import { motion } from "framer-motion";
import { useState } from "react";
import { MdFormatQuote, MdRefresh } from "react-icons/md";

export default function QuotesPage() {
  const [page, setPage] = useState(1);
  const limit = 20;

  const { data: quotes, isLoading } = useQuery({
    queryKey: ["quotes", page],
    queryFn: () => api.getQuotes({ limit, page }).then((res) => res.data),
  });

  const { data: randomQuote, refetch: refetchRandom, isFetching: isFetchingRandom } = useQuery({
    queryKey: ["random-quote"],
    queryFn: async () => {
      const total = 2384;
      const randomPage =
        Math.floor(Math.random() * Math.ceil(total / 1000)) + 1;
      const result = await api.getQuotes({ limit: 1000, page: randomPage });
      const randomIndex = Math.floor(Math.random() * result.data.docs.length);
      return result.data.docs[randomIndex];
    },
  });

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.05 },
    },
  };

  const item = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0 },
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
            <MdFormatQuote className="text-primary-400" />
            Memorable Quotes
          </h1>
          <p className="text-xl text-gray-400">
            {quotes?.total.toLocaleString()} unforgettable lines from
            Middle-earth
          </p>
        </motion.div>

        {/* Random Quote of the Day */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass rounded-3xl p-12 mb-12 relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary-500/10 to-transparent" />
          <div className="relative">
            <div className="flex items-start justify-between mb-6">
              <h2 className="text-2xl font-bold">Random Quote</h2>
              <button
                onClick={() => refetchRandom()}
                disabled={isFetchingRandom}
                className="flex items-center gap-2 glass px-4 py-2 rounded-full hover:bg-white/10 transition-all hover:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <MdRefresh className={isFetchingRandom ? "animate-spin" : ""} />
                <span>{isFetchingRandom ? "Refreshing..." : "Refresh"}</span>
              </button>
            </div>
            {isFetchingRandom ? (
              <div className="w-full h-16 rounded-lg animate-pulse bg-white/5"></div>
            ) : (
              randomQuote && (
                <p className="text-3xl font-display italic text-gray-300 leading-relaxed">
                  &ldquo;{randomQuote.dialog}&rdquo;
                </p>
              )
            )}
          </div>
        </motion.div>

        {/* All Quotes */}
        {isLoading ? (
          <div className="grid grid-cols-1 gap-4">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="glass rounded-xl h-24 animate-pulse" />
            ))}
          </div>
        ) : (
          <>
            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 gap-4"
            >
              {quotes?.docs.map((quote) => (
                <motion.div
                  key={quote._id}
                  variants={item}
                  className="glass rounded-xl p-6 hover:bg-white/10 transition-colors group"
                >
                  <p className="text-lg text-gray-300 italic group-hover:text-white transition-colors">
                    &ldquo;{quote.dialog}&rdquo;
                  </p>
                </motion.div>
              ))}
            </motion.div>

            {/* Pagination */}
            {quotes && quotes.pages > 1 && (
              <div className="flex justify-center items-center gap-4 mt-12">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="glass px-6 py-3 rounded-full disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/10 transition-colors"
                >
                  Previous
                </button>
                <span className="text-gray-400">
                  Page {page} of {quotes.pages}
                </span>
                <button
                  onClick={() => setPage((p) => Math.min(quotes.pages, p + 1))}
                  disabled={page === quotes.pages}
                  className="glass px-6 py-3 rounded-full disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/10 transition-colors"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
