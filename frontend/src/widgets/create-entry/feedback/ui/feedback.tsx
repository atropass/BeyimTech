import { useState } from "react";
import { Input } from "../../../../shared/ui/input/input";
import { Select } from "../../../../shared/ui/select/select";
import { Textarea } from "../../../../shared/ui/textarea/textarea";
import { Button } from "../../../../shared/ui/button/button";
import { useNavigate } from "react-router-dom";
export const Feedback = () => {
  const [onTime, setOnTime] = useState<boolean>(true);
  const [homeworkComplete, setHomeworkComplete] = useState<boolean>(true);
  const navigate = useNavigate();
  const handleSubmit = () => {
    console.log("Submitted");
    navigate("/students/student");
  };
  return (
    <>
      <div className="w-full bg-white p-4 justify-between gap-8 flex">
        <div className="flex flex-col gap-2">
          <Input
            inputClassNames="w-64"
            label="Дата"
            size="sm"
            className="w-full"
          />
          <Select
            classNames="w-64"
            label="Ученик пришел вовремя"
            options={[
              { value: true, label: "Да" },
              { value: false, label: "Нет" },
            ]}
            value={onTime}
            onChange={(value) => setOnTime(value)}
          />
          <Select
            classNames="w-64"
            label="Ученик выполнил домашнее задание"
            options={[
              { value: true, label: "Да" },
              { value: false, label: "Нет" },
            ]}
            value={homeworkComplete}
            onChange={(value) => setHomeworkComplete(value)}
          />
        </div>
        <div>
          <Textarea
            label="Комментарий учителя"
            size="md"
            textareaClassNames="w-64"
          />
          <Input
            inputClassNames="w-64"
            label="Оцените активность студента (1-5)"
            size="sm"
            type="number"
            className="w-full"
          />
        </div>
      </div>
      <div className="w-full flex justify-center mt-4">
        <Button size="sm" onClick={handleSubmit}>
          Сохранить
        </Button>
      </div>
    </>
  );
};
