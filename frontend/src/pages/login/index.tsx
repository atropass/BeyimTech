import { useState } from "react";
import { Button } from "../../shared/ui/button/button";
import { Input } from "../../shared/ui/input/input";
import { triggerLogin } from "../../features/login/model";
import { useUnit } from "effector-react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = useUnit(triggerLogin);

  const handleLogin = () => {
    login({ username: email, password: password });
    navigate("/students");
  };
  const handleRegister = () => {
    navigate("/register");
  };

  return (
    <div className="w-screen h-screen bg-blue-100 flex justify-center items-center">
      <div className="bg-white shadow-md flex flex-col p-12 rounded-xl gap-2 items-center justify-center">
        <p className="text-center font-bold text-xl mb-8">Войти в систему</p>
        <Input
          label="E-mail"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="mt-4 flex flex-col gap-2">
          <Button
            className="w-56v bg-blue text-white text-sm hover:bg-blue-600"
            onClick={handleLogin}
          >
            Войти
          </Button>
          <Button className="w-56 text-sm" onClick={handleRegister}>
            Регистрация
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
