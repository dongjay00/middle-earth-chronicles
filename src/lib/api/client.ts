import axios from "axios";
import type {
  ApiResponse,
  Movie,
  Character,
  Quote,
  Book,
  Chapter,
} from "../types";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
  },
});

export const api = {
  // Movies
  getMovies: () => apiClient.get<ApiResponse<Movie>>("/movie"),
  getMovie: (id: string) => apiClient.get<ApiResponse<Movie>>(`/movie/${id}`),
  getMovieQuotes: (id: string) =>
    apiClient.get<ApiResponse<Quote>>(`/movie/${id}/quote`),

  // Characters
  getCharacters: (params?: Record<string, unknown>) =>
    apiClient.get<ApiResponse<Character>>("/character", { params }),
  getCharacter: (id: string) =>
    apiClient.get<ApiResponse<Character>>(`/character/${id}`),
  getCharacterQuotes: (id: string) =>
    apiClient.get<ApiResponse<Quote>>(`/character/${id}/quote`),

  // Quotes
  getQuotes: (params?: Record<string, unknown>) =>
    apiClient.get<ApiResponse<Quote>>("/quote", { params }),
  getQuote: (id: string) => apiClient.get<ApiResponse<Quote>>(`/quote/${id}`),

  // Books
  getBooks: () => apiClient.get<ApiResponse<Book>>("/book"),
  getBook: (id: string) => apiClient.get<ApiResponse<Book>>(`/book/${id}`),
  getBookChapters: (id: string) =>
    apiClient.get<ApiResponse<Chapter>>(`/book/${id}/chapter`),

  // Chapters
  getChapters: () => apiClient.get<ApiResponse<Chapter>>("/chapter"),
  getChapter: (id: string) =>
    apiClient.get<ApiResponse<Chapter>>(`/chapter/${id}`),
};

export default apiClient;
