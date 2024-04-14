import { createEvent, createEffect, sample } from "effector";

import { AddStudentApi } from "../../../shared/api/add-student";
import { triggerGetStudents } from "../../students/model";

interface AddStudentParams {
  email: string;
}

const triggerAddStudent = createEvent<AddStudentParams>();

const addStudentFx = createEffect<AddStudentParams, void>({
  handler: async (params) => {
    console.log("fx called");
    await AddStudentApi.addStudent(params.email);
  },
});

sample({
  clock: triggerAddStudent,
  target: addStudentFx,
});

addStudentFx.doneData.watch(() => triggerGetStudents());

export default {
  triggerAddStudent,
  addStudentFx,
};
