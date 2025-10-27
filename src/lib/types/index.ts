export interface ApiResponse<T> {
  docs: T[];
  total: number;
  limit: number;
  offset: number;
  page: number;
  pages: number;
}

export interface Movie {
  _id: string;
  name: string;
  runtimeInMinutes: number;
  budgetInMillions: number;
  boxOfficeRevenueInMillions: number;
  academyAwardNominations: number;
  academyAwardWins: number;
  rottenTomatoesScore: number;
}

export interface Character {
  _id: string;
  name: string;
  wikiUrl?: string;
  race?: string;
  birth?: string;
  gender?: string;
  death?: string;
  hair?: string;
  height?: string;
  realm?: string;
  spouse?: string;
}

export interface Quote {
  _id: string;
  dialog: string;
  movie: string;
  character: string;
  id: string;
}

export interface Book {
  _id: string;
  name: string;
}

export interface Chapter {
  _id: string;
  chapterName: string;
  book: string;
}
