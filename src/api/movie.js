import axios from "axios";
import { BASE_URL } from "../config";

export class MovieAPI {
  static async getMovieSuggestions(input) {
    try {
      const res = await axios.get(
        `${BASE_URL}search/movie?api_key=${process.env.REACT_APP_API_KEY_PARAM}&query=${input}`
      );

      if (res.data.results.length === 0) {
        return;
      } else {
        return res.data.results.slice(0, 10);
      }
    } catch (error) {
      alert("Error searching Movie");
    }
  }

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

  static async getMovieById(id) {
    try {
      const res = await axios.get(
        `${BASE_URL}movie/${id}?api_key=${process.env.REACT_APP_API_KEY_PARAM}`
      );
      return res.data;
    } catch (error) {
      alert("Error searching Movie");
    }
  }

  static async fetchCastById(id) {
    try {
      const res = await axios.get(
        `${BASE_URL}movie/${id}/credits?api_key=${process.env.REACT_APP_API_KEY_PARAM}`
      );

      const top20Cast = res.data.cast.slice(0, 30);
      return top20Cast;
    } catch (error) {
      alert("Error getting Credit");
    }
  }

  static async getDirector(id) {
    try {
      const res = await axios.get(
        `${BASE_URL}movie/${id}/credits?api_key=${process.env.REACT_APP_API_KEY_PARAM}`
      );

      const director = res.data.crew.find(
        (member) => member.job === "Director"
      );
      return director;
    } catch (error) {
      alert("Error getting Credit");
    }
  }
}
