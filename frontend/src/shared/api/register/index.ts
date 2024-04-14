import axios from "axios";

interface RegisterParams {
  email: string;
  password: string;
  role: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  student_age: number;
  student_grade: number;
  student_last_test_date: string;
  student_upcoming_test_date: string;
}

export const RegisterApi = {
  register: async ({
    email,
    password,
    role,
    first_name,
    last_name,
    phone_number,
    student_age = 17,
    student_grade = 11,
    student_last_test_date = "2023-09-01",
    student_upcoming_test_date = "2024-09-01",
  }: RegisterParams) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/register",
        {
          email: email,
          password: password,
          role: role,
          first_name: first_name,
          last_name: last_name,
          phone_number: phone_number,
          student_age: student_age,
          student_grade: student_grade,
          student_last_test_date: student_last_test_date,
          student_upcoming_test_date: student_upcoming_test_date,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Registration successful:", response.data);
      return response;
    } catch (error) {
      console.error("Registration error:", error);
      throw error;
    }
  },
};
