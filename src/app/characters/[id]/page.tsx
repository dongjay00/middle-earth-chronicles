"use client";

import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api/client";
import { motion } from "framer-motion";
import Link from "next/link";
import { MdArrowBack, MdOpenInNew } from "react-icons/md";
import { useParams } from "next/navigation";

export default function CharacterDetailPage() {
  const params = useParams<{ id: string }>();
  const { data: character, isLoading: characterLoading } = useQuery({
    queryKey: ["character", params.id],
    queryFn: () => api.getCharacter(params.id).then((res) => res.data.docs[0]),
  });

  const { data: quotes, isLoading: quotesLoading } = useQuery({
    queryKey: ["character-quotes", params.id],
    queryFn: () => api.getCharacterQuotes(params.id).then((res) => res.data),
    enabled: !!params.id,
  });

  if (characterLoading) {
    return (
      <div className="pt-16 min-h-screen">
        <div className="container mx-auto px-4 py-12">
          <div className="glass rounded-3xl h-96 animate-pulse" />
        </div>
      </div>
    );
  }

  if (!character) return null;

  const details = [
    { label: "Race", value: character.race },
    { label: "Gender", value: character.gender },
    { label: "Birth", value: character.birth },
    { label: "Death", value: character.death },
    { label: "Realm", value: character.realm },
    { label: "Spouse", value: character.spouse },
    { label: "Hair", value: character.hair },
    { label: "Height", value: character.height },
  ].filter((d) => d.value);

  return (
    <div className="pt-16 min-h-screen">
      <div className="container mx-auto px-4 py-12">
        <Link
          href="/characters"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors"
        >
          <MdArrowBack />
          Back to Characters
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-3xl p-12 mb-8"
        >
          <div className="flex items-start justify-between mb-8">
            <div>
              <h1 className="text-5xl font-bold mb-4">{character.name}</h1>
              {character.race && (
                <span className="inline-block px-4 py-2 bg-primary-500/20 text-primary-400 rounded-full">
                  {character.race}
                </span>
              )}
            </div>
            {character.wikiUrl && (
              <a
                href={character.wikiUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 glass px-4 py-2 rounded-full hover:bg-white/10 transition-colors"
              >
                <span>Wiki</span>
                <MdOpenInNew />
              </a>
            )}
          </div>

          {details.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              {details.map((detail, idx) => (
                <div key={idx} className="glass rounded-xl p-4">
                  <div className="text-sm text-gray-400 mb-1">
                    {detail.label}
                  </div>
                  <div className="text-lg font-semibold">{detail.value}</div>
                </div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Quotes Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-3xl font-bold mb-6">
            Quotes {quotes && `(${quotes.total})`}
          </h2>
          {quotesLoading ? (
            <div className="grid grid-cols-1 gap-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="glass rounded-xl h-24 animate-pulse" />
              ))}
            </div>
          ) : quotes && quotes.docs.length > 0 ? (
            <div className="grid grid-cols-1 gap-4">
              {quotes.docs.slice(0, 20).map((quote) => (
                <div
                  key={quote._id}
                  className="glass rounded-xl p-6 hover:bg-white/10 transition-colors"
                >
                  <p className="text-lg text-gray-300 italic">
                    &ldquo;{quote.dialog}&rdquo;
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="glass rounded-xl p-12 text-center">
              <p className="text-gray-400">
                No quotes available for this character
              </p>
            </div>
          )}
          {quotes && quotes.total > 20 && (
            <div className="text-center mt-6">
              <p className="text-gray-400">
                Showing 20 of {quotes.total} quotes
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
