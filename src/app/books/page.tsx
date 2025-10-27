"use client";

import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api/client";
import { motion } from "framer-motion";
import { useState } from "react";
import { MdMenuBook, MdExpandMore, MdExpandLess } from "react-icons/md";

export default function BooksPage() {
  const [expandedBook, setExpandedBook] = useState<string | null>(null);

  const { data: books, isLoading } = useQuery({
    queryKey: ["books"],
    queryFn: () => api.getBooks().then((res) => res.data),
  });

  const { data: chapters } = useQuery({
    queryKey: ["book-chapters", expandedBook],
    queryFn: () => api.getBookChapters(expandedBook!).then((res) => res.data),
    enabled: !!expandedBook,
  });

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
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
            <MdMenuBook className="text-primary-400" />
            The Books
          </h1>
          <p className="text-xl text-gray-400">
            The original trilogy that started it all
          </p>
        </motion.div>

        {isLoading ? (
          <div className="grid grid-cols-1 gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="glass rounded-3xl h-64 animate-pulse" />
            ))}
          </div>
        ) : (
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 gap-6"
          >
            {books?.docs.map((book, idx) => (
              <motion.div key={book._id} variants={item}>
                <div className="glass rounded-3xl overflow-hidden">
                  <button
                    onClick={() =>
                      setExpandedBook(
                        expandedBook === book._id ? null : book._id
                      )
                    }
                    className="w-full p-8 flex items-center justify-between hover:bg-white/5 transition-colors"
                  >
                    <div className="flex items-center gap-6">
                      <div className="text-6xl font-bold text-primary-400/30">
                        {idx + 1}
                      </div>
                      <div className="text-left">
                        <h2 className="text-3xl font-bold mb-2">{book.name}</h2>
                        <p className="text-gray-400">Click to view chapters</p>
                      </div>
                    </div>
                    {expandedBook === book._id ? (
                      <MdExpandLess className="w-8 h-8 text-primary-400" />
                    ) : (
                      <MdExpandMore className="w-8 h-8 text-gray-400" />
                    )}
                  </button>

                  {expandedBook === book._id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="border-t border-white/10"
                    >
                      <div className="p-8">
                        <h3 className="text-xl font-bold mb-4">
                          Chapters ({chapters?.total || 0})
                        </h3>
                        {chapters ? (
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                            {chapters.docs.map((chapter, chapterIdx) => (
                              <div
                                key={chapter._id}
                                className="glass rounded-xl p-4 hover:bg-white/10 transition-colors"
                              >
                                <div className="flex items-start gap-3">
                                  <span className="text-sm font-bold text-primary-400 mt-1">
                                    {chapterIdx + 1}
                                  </span>
                                  <span className="text-sm text-gray-300">
                                    {chapter.chapterName}
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-center py-8">
                            <div className="inline-block w-8 h-8 border-4 border-primary-400 border-t-transparent rounded-full animate-spin" />
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
