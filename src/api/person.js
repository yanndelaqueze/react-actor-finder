import axios from "axios";
import { BASE_URL } from "../config";

export class PersonAPI {
  static async fetchTrendingPeople() {
    try {
      const res = await axios.get(
        `${BASE_URL}trending/person/week?api_key=${process.env.REACT_APP_API_KEY_PARAM}`
      );
      const id = res.data.results[0].id;

      const response = await axios.get(
        `${BASE_URL}person/${id}?api_key=${process.env.REACT_APP_API_KEY_PARAM}`
      );
      return response.data;
    } catch (error) {
      alert("Error fetching Popular People");
    }
  }

  static async getPersonSuggestions(input) {
    try {
      const res = await axios.get(
        `${BASE_URL}search/person?api_key=${process.env.REACT_APP_API_KEY_PARAM}&query=${input}`
      );
      console.log("input:", input);
      console.log("res:", res.data.results);
      return res.data.results.slice(0, 10);
    } catch (error) {
      alert("Error searching Person");
    }
  }

  static async searchPersonByName(name) {
    try {
      const res = await axios.get(
        `${BASE_URL}search/person?api_key=${process.env.REACT_APP_API_KEY_PARAM}&query=${name}`
      );
      const id = res.data.results[0].id;

      const response = await axios.get(
        `${BASE_URL}person/${id}?api_key=${process.env.REACT_APP_API_KEY_PARAM}`
      );
      return response.data;
    } catch (error) {
      alert("Error searching Person");
    }
  }

  static async getPersonById(id) {
    try {
      const res = await axios.get(
        `${BASE_URL}person/${id}?api_key=${process.env.REACT_APP_API_KEY_PARAM}`
      );
      return res.data;
    } catch (error) {
      alert("Error getting Person");
    }
  }

  static async fetchCreditsById(id) {
    try {
      const res = await axios.get(
        `${BASE_URL}person/${id}/combined_credits?api_key=${process.env.REACT_APP_API_KEY_PARAM}`
      );

      const top30Credits = res.data.cast.slice(0, 30);
      return top30Credits;
    } catch (error) {
      alert("Error getting Credit");
    }
  }
}
