import axios from "axios";
import { BASE_URL } from "../config";

export class PersonAPI {
  static async fetchPopulars() {
    try {
      const response = await axios.get(
        `${BASE_URL}people/popular?api_key=${process.env.REACT_APP_API_KEY_PARAM}`
      );
      return response.data.results;
    } catch (error) {
      alert("Error fetching Popular People");
    }
  }
}
