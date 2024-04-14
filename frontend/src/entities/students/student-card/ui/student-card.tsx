import { Button } from "react-daisyui";
import { useNavigate } from "react-router-dom";
import { Student } from "../../../../shared/interfaces";

interface StudentCardProps {
  student: Student;
}

export const StudentCard = ({ student }: StudentCardProps) => {
  const navigate = useNavigate(); // Hook to get the navigate function

  const handleNavigate = () => {
    localStorage.setItem("studentId", student.student_id.toString());
    navigate("student");
  };

  return (
    <div className="bg-white rounded-xl flex items-center w-full gap-16 shadow-sm py-4 px-4">
      <img
        src={`placeholder2.jpeg`}
        alt="placeholder"
        className="w-12 h-12 rounded-full"
        loading="lazy"
      />
      <p className="font-bold w-12 text-sm">
        {student.first_name} {student.last_name}
      </p>
      <p className="w-1/6 text-sm">{student.email}</p>
      <p className="w-1/6 text-sm">{student.age} лет</p>
      <p className="w-1/6 text-sm">{student.grade} класс</p>
      <div className="w-1/6">
        <Button
          onClick={handleNavigate}
          className="rounded-md bg-blue text-white hover:bg-blue-400"
        >
          Перейти
        </Button>
      </div>
    </div>
  );
};
