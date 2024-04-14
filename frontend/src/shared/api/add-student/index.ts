import axios from "axios";

export const AddStudentApi = {
  addStudent: async (email: string) => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      console.error("Access token not found");
      throw new Error(
        "Access token is required but was not found in local storage."
      );
    }
    try {
      const response = await axios.post(
        `http://localhost:8000/teacher/students?email=${encodeURIComponent(
          email
        )}`,
        null,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log("Student addition successful:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error adding student:", error);
      throw error;
    }
  },
};
