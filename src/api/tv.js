import axios from "axios";
import { BASE_URL } from "../config";

export class TVAPI {
  static async searchTVShowByTitle(title) {
    try {
      const res = await axios.get(
        `${BASE_URL}search/tv?api_key=${process.env.REACT_APP_API_KEY_PARAM}&query=${title}`
      );
      const id = res.data.results[0].id;

      const response = await axios.get(
        `${BASE_URL}tv/${id}?api_key=${process.env.REACT_APP_API_KEY_PARAM}`
      );
      return response.data;
    } catch (error) {
      alert("Error searching TV Show");
    }
  }

  static async fetchCastById(id) {
    try {
      const res = await axios.get(
        `${BASE_URL}tv/${id}/credits?api_key=${process.env.REACT_APP_API_KEY_PARAM}`
      );

      const top20Cast = res.data.cast.slice(0, 30);
      return top20Cast;
    } catch (error) {
      alert("Error getting Credit");
    }
  }
}