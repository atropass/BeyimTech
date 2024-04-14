import axios from "axios";

export const StudentsApi = {
  getStudents: async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");

      if (!accessToken) {
        console.error("Access token not found");
        throw new Error(
          "Access token is required but was not found in local storage."
        );
      }

      const response = await axios.get("http://localhost:8000/students", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log("getStudents successful:", response.data);
      return response;
    } catch (error) {
      console.error("getStudents error:", error);
      throw error;
    }
  },
};
