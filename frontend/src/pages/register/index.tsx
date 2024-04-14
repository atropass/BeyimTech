import { useState } from "react";
import { Button } from "../../shared/ui/button/button";
import { Input } from "../../shared/ui/input/input";
import { useUnit } from "effector-react";
import { useNavigate } from "react-router-dom";
import { Select } from "../../shared/ui/select/select";
import { triggerRegister } from "../../features/register/model";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState<"teacher" | "parent" | "student">("teacher");
  const [studentAge, setStudentAge] = useState<number>(0);
  const [studentGrade, setStudentGrade] = useState<number>(0);
  const [studentLastTestDate, setStudentLastTestDate] = useState<string>("");
  const [studentUpcomingTestDate, setStudentUpcomingTestDate] =
    useState<string>("");

  const register = useUnit(triggerRegister);
  const navigate = useNavigate();
  const handleRegister = () => {
    register({
      email: email,
      password: password,
      role: role,
      first_name: firstName,
      last_name: lastName,
      phone_number: phone,
      student_age: studentAge,
      student_grade: studentGrade,
      student_last_test_date: "2023-11-02",
      student_upcoming_test_date: "2024-11-02",
    });
    navigate("/login");
  };
  const goToLogin = () => {
    navigate("/");
  };

  return (
    <div className="w-screen h-screen bg-blue-100 flex justify-center items-center">
      <div className="bg-white shadow-md flex flex-col p-12 rounded-xl gap-2 items-center justify-center">
        <p className="text-center font-bold text-xl">Создать аккаунт</p>
        <div className="flex justify-center gap-4">
          <div>
            <Input
              size="sm"
              label="First Name"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <Input
              size="sm"
              label="Last Name"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <Input
              size="sm"
              label="E-mail"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              size="sm"
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <Input
              size="sm"
              label="Phone"
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <Select
              options={[
                { value: "teacher", label: "Учитель" },
                { value: "parent", label: "Родитель" },
                { value: "student", label: "Ученик" },
              ]}
              value={role}
              onChange={setRole}
              label="Роль"
            />
            {role === "student" && (
              <div className="w-full">
                <Input
                  size="sm"
                  label="Возраст"
                  type="number"
                  onChange={(e) => setStudentAge(Number(e.target.value))}
                  value={studentAge}
                />
                <Input
                  size="sm"
                  label="Класс"
                  type="number"
                  onChange={(e) => setStudentGrade(Number(e.target.value))}
                  value={studentGrade}
                />
                <Input
                  size="sm"
                  label="Дата последнего теста"
                  type="date"
                  onChange={(e) => setStudentLastTestDate(e.target.value)}
                  value={studentLastTestDate}
                />
                <Input
                  size="sm"
                  label="Дата следующего теста"
                  type="date"
                  onChange={(e) => setStudentUpcomingTestDate(e.target.value)}
                  value={studentUpcomingTestDate}
                />
              </div>
            )}
          </div>
        </div>

        <div className="mt-4 flex flex-col gap-2">
          <Button
            className="w-56v bg-blue text-white text-sm hover:bg-blue-600"
            onClick={handleRegister}
          >
            Создать
          </Button>
          <Button className="w-56 text-sm" onClick={goToLogin}>
            Уже есть аккаунт
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Register;
