import { createEffect, createStore, createEvent, sample } from "effector";

import { StudentsApi } from "../../../shared/api/students";

interface Student {
  student_id: number;
  email: string;
  first_name: string;
  last_name: string;
  age: number;
  grade: string;
  last_test_date: string;
  upcoming_test_date: string;
}
interface StudentsResponse {
  data: Student[];
}

export const triggerGetStudents = createEvent<void>();

export const getStudentsFx = createEffect<void, StudentsResponse>({
  handler: async () => {
    console.log("fx called");
    const response = await StudentsApi.getStudents();
    return response;
  },
});

sample({
  clock: triggerGetStudents,
  target: getStudentsFx,
});

export const $students = createStore<StudentsResponse>({
  data: [],
});

sample({
  source: getStudentsFx.doneData,
  target: $students,
});
export default {
  triggerGetStudents,
  getStudentsFx,
  $students,
};
