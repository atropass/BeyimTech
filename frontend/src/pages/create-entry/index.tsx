import { useState } from "react";
import { Test } from "../../widgets/create-entry/test/ui/test";
import { Feedback } from "../../widgets/create-entry/feedback/ui/feedback";
export const CreateEntry = (): JSX.Element => {
  const [type, setType] = useState<"Тест" | "Урок">("Тест");
  return (
    <div className="p-6 flex justify-center h-screen">
      <div className="w-[40rem] flex flex-col">
        <div className="font-bold text-lg">Создать запись</div>
        <div className="mt-8 flex w-full gap-2">
          <div
            className={`${
              type === "Тест"
                ? "bg-blue-500 text-white font-bold hover:bg-blue-400"
                : "text-blue-600 bg-white hover:bg-zinc-100"
            } ' text-center rounded-md py-2 w-1/2 border shadow-md cursor-pointer duration-75 border-zinc-200`}
            onClick={() => setType("Тест")}
          >
            Пробный Тест
          </div>
          <div
            className={`${
              type === "Урок"
                ? "bg-blue-500 text-white font-bold hover:bg-blue-400"
                : "text-blue-600 bg-white hover:bg-zinc-100"
            } ' text-center rounded-md py-2 w-1/2 border shadow-md cursor-pointer duration-75 border-zinc-200`}
            onClick={() => setType("Урок")}
          >
            Урок
          </div>
        </div>
        <div className="w-full">{type === "Урок" && <Feedback />}</div>
        <div className="w-full">{type === "Тест" && <Test />}</div>
      </div>
    </div>
  );
};
