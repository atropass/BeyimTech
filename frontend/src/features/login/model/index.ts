import { createEffect, createEvent, sample } from "effector";
import { LoginApi } from "../../../shared/api/login";

interface LoginParams {
  username: string;
  password: string;
}

export const triggerLogin = createEvent<LoginParams>();

interface AuthResponse {
  access_token: string;
  token_type: string;
  user_id: number;
}

const loginFx = createEffect<LoginParams, AuthResponse>({
  handler: async (params) => {
    console.log("fx called");
    const response = await LoginApi.login(params.username, params.password);
    return response.data;
  },
});

const storeTokenToLocalStorage = createEffect<string, void>({
  handler: (token) => localStorage.setItem("accessToken", token),
});

const storeUserIdToLocalStorage = createEffect<number, void>({
  handler: (userId) => localStorage.setItem("userId", userId.toString()),
});

sample({
  clock: triggerLogin,
  target: loginFx,
});

sample({
  source: loginFx.doneData,
  fn: (authResponse) => authResponse.access_token,
  target: storeTokenToLocalStorage,
});

sample({
  source: loginFx.doneData,
  fn: (authResponse) => authResponse.user_id,
  target: storeUserIdToLocalStorage,
});
