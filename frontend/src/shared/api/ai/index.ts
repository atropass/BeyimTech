import axios from "axios";

export const AiApi = {
  fetchGptAnalysis: async (
    userId: number,
    dateFrom: string,
    dateTo: string
  ) => {
    try {
      const response = await axios.get(
        "http://localhost:8000/ask-gpt-analysis",
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
      return response.data; // Returns the fetched data
    } catch (error) {
      console.error("Error fetching GPT analysis:", error);
      throw error; // Rethrows the error for further handling
    }
  },
};
