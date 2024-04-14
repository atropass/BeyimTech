import axios from "axios";

export const LoginApi = {
  login: async (email: string, password: string) => {
    console.log("LoginApi.login called");
    const loginUrl = `http://localhost:8000/token`;
    console.log(loginUrl);
    console.log(email, password);
    console.log();
    try {
      console.log(`Attempting to login at: ${loginUrl}`);
      const response = await axios.post(
        loginUrl,
        {
          username: email,
          password: password,
          grant_type: "", // Assuming grant_type, scope, client_id, client_secret might be needed
          scope: "",
          client_id: "",
          client_secret: "",
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      console.log("Login successful:", response.data);
      return response;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  },
};
