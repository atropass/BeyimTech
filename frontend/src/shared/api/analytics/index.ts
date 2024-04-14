import axios from "axios";

export const AnalyticsApi = {
  getOverallScore: async (userId: number, dateFrom: string, dateTo: string) => {
    try {
      console.log("fetching...");
      const response = await axios.get(
        "http://localhost:8000/get-testdetails-by-dates",
        {
          params: {
            user_id: userId,
            date_from: dateFrom,
            date_to: dateTo,
          },
          headers: {
            Accept: "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Failed to retrieve test details:", error);
      throw error;
    }
  },
};
