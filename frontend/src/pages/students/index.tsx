import { useEffect } from "react";
import { StudentCard } from "../../entities/students/student-card/ui/student-card";
import { useUnit } from "effector-react";
import { $students, triggerGetStudents } from "../../features/students/model";
import { Button } from "../../shared/ui/button/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import { AddStudentModal } from "../../entities/students/add-student";
const Students = (): JSX.Element => {
  const [modalOpen, setModalOpen] = useState(false);
  const addStudent = () => {
    setModalOpen(true);
  };
  const students = useUnit($students);
  const getStudents = useUnit(triggerGetStudents);
  useEffect(() => {
    getStudents();
  }, []);
  useEffect(() => {
    console.log(students);
  }, [students]);
  return (
    <div className="bg-gray-200">
      <div className="w-full flex justify-center gap-4 h-screen p-8">
        <div className="w-[50rem]">
          <div className="w-full flex justify-end mb-8">
            <Button onClick={addStudent} startIcon={<Plus color="white" />}>
              Добавить студента
            </Button>
          </div>
          <div className=" flex flex-col gap-4 justify-center items-center">
            {students?.data &&
              students.data.map((student) => (
                <StudentCard key={student.student_id} student={student} />
              ))}
          </div>
        </div>
      </div>
      <AddStudentModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
};

export default Students;
