"use client";

import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api/client";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { MdPeople, MdSearch } from "react-icons/md";

export default function CharactersPage() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const limit = 20;

  const { data: characters, isLoading } = useQuery({
    queryKey: ["characters", page, search],
    queryFn: () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const params: any = { limit, page };
      if (search) params["name"] = `/${search}/i`;
      return api.getCharacters(params).then((res) => res.data);
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
    hidden: { opacity: 0, scale: 0.9 },
    show: { opacity: 1, scale: 1 },
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
            <MdPeople className="text-primary-400" />
            Characters
          </h1>
          <p className="text-xl text-gray-400 mb-8">
            {characters?.total.toLocaleString()} heroes and villains of
            Middle-earth
          </p>

          {/* Search */}
          <div className="relative max-w-2xl">
            <MdSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-6 h-6" />
            <input
              type="text"
              placeholder="Search characters..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="w-full glass rounded-full pl-14 pr-6 py-4 text-lg focus:outline-none focus:ring-2 focus:ring-primary-400"
            />
          </div>
        </motion.div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="glass rounded-2xl h-64 animate-pulse" />
            ))}
          </div>
        ) : (
          <>
            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {characters?.docs.map((character) => (
                <motion.div key={character._id} variants={item}>
                  <Link
                    href={`/characters/${character._id}`}
                    className="block glass rounded-2xl p-6 hover:bg-white/10 transition-all hover:scale-105 group h-full"
                  >
                    <div className="mb-4">
                      <h3 className="text-xl font-bold mb-2 group-hover:text-primary-400 transition-colors">
                        {character.name}
                      </h3>
                      {character.race && (
                        <span className="inline-block px-3 py-1 bg-primary-500/20 text-primary-400 text-sm rounded-full">
                          {character.race}
                        </span>
                      )}
                    </div>

                    <div className="space-y-2 text-sm">
                      {character.gender && (
                        <div className="flex justify-between text-gray-400">
                          <span>Gender</span>
                          <span className="text-white">{character.gender}</span>
                        </div>
                      )}
                      {character.birth && (
                        <div className="flex justify-between text-gray-400">
                          <span>Birth</span>
                          <span className="text-white">{character.birth}</span>
                        </div>
                      )}
                      {character.realm && (
                        <div className="flex justify-between text-gray-400">
                          <span>Realm</span>
                          <span className="text-white">{character.realm}</span>
                        </div>
                      )}
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>

            {/* Pagination */}
            {characters && characters.pages > 1 && (
              <div className="flex justify-center items-center gap-4 mt-12">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="glass px-6 py-3 rounded-full disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/10 transition-colors"
                >
                  Previous
                </button>
                <span className="text-gray-400">
                  Page {page} of {characters.pages}
                </span>
                <button
                  onClick={() =>
                    setPage((p) => Math.min(characters.pages, p + 1))
                  }
                  disabled={page === characters.pages}
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
