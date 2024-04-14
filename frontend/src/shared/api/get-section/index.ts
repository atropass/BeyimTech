import axios from "axios";
export const GetSectionApi = {
  getListeningByDates: async (userId, dateFrom, dateTo) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/get-listening-by-dates`,
        {
          params: { user_id: userId, date_from: dateFrom, date_to: dateTo },
          headers: { Accept: "application/json" },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Failed to fetch listening scores:", error);
      throw error;
    }
  },

  getSpeakingByDates: async (userId, dateFrom, dateTo) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/get-speaking-by-dates`,
        {
          params: { user_id: userId, date_from: dateFrom, date_to: dateTo },
          headers: { Accept: "application/json" },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Failed to fetch speaking scores:", error);
      throw error;
    }
  },

  getWritingByDates: async (userId, dateFrom, dateTo) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/get-writing-by-dates`,
        {
          params: { user_id: userId, date_from: dateFrom, date_to: dateTo },
          headers: { Accept: "application/json" },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Failed to fetch writing scores:", error);
      throw error;
    }
  },

  getReadingByDates: async (userId, dateFrom, dateTo) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/get-reading-by-dates`,
        {
          params: { user_id: userId, date_from: dateFrom, date_to: dateTo },
          headers: { Accept: "application/json" },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Failed to fetch reading scores:", error);
      throw error;
    }
  },
};
