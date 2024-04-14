import { Student } from "../../../../shared/interfaces";
import { Field } from "./components/field";

interface StudentProfileCardProps {
  student: Student;
}

export const StudentProfileCard = ({
  student,
}: StudentProfileCardProps): JSX.Element => {
  return (
    <div className="rounded-lg bg-white w-full h-full px-4 shadow-sm p-4 flex justify-center">
      <div className="flex flex-col">
        <div className="flex justify-center mb-4">
          <img
            src="/placeholder2.jpeg"
            width={128}
            height={128}
            className="rounded-full border-2 border-blue "
          />
        </div>
        <div className="flex flex-col text-lg gap-3">
          <Field
            label="Имя"
            value={`${student?.first_name} ${student?.last_name}`}
          />
          <Field label="Возраст" value={`${student?.age} лет`} />
          <Field label="Класс" value={`${student?.grade} класс`} />
          <Field
            label="Дата последнего теста"
            value={`${student?.last_test_date}`}
          />

          <div className="mt-1">
            <p>Ближайший тест: </p>
            <span className="text-blue-500 text-md font-bold">
              {student?.upcoming_test_date?.toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
