import { Movie } from "./movie";

export interface ApiResponse {
  Search: Movie[];
  Response: string;
  Error: string;
}
