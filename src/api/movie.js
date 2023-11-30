import axios from "axios";
import { BASE_URL } from "../config";

export class MovieAPI {
  static async searchMovieByTitle(title) {
    try {
      const res = await axios.get(
        `${BASE_URL}search/movie?api_key=${process.env.REACT_APP_API_KEY_PARAM}&query=${title}`
      );
      const id = res.data.results[0].id;

      const response = await axios.get(
        `${BASE_URL}movie/${id}?api_key=${process.env.REACT_APP_API_KEY_PARAM}`
      );
      return response.data;
    } catch (error) {
      alert("Error searching Movie");
    }
  }
}
