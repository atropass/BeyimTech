import { createEvent, createEffect, sample } from "effector";

import { RegisterApi } from "../../../shared/api/register";

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

export const triggerRegister = createEvent<RegisterParams>();

export const registerFx = createEffect<RegisterParams, void>({
  handler: async (params) => {
    console.log("fx called");
    await RegisterApi.register(params);
  },
});

sample({
  clock: triggerRegister,
  target: registerFx,
});

export default {
  triggerRegister,
  registerFx,
};
