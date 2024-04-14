import { useEffect } from "react";
import AvgScoreBarChart from "../../entities/charts/bar-chart/ui/bar-chart";
import { ScoresGraph } from "../../entities/charts/sections-graph/ui/sections-graph";
import Calendar from "../../entities/student-profile/calendar/ui/calendar";
import { EstimatedScore } from "../../entities/student-profile/estimated-score/ui/estimated-score";
import { StudentProfileCard } from "../../entities/student-profile/student-card/ui/student-card";
import { Button } from "../../shared/ui/button/button";
import { Plus, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { $students } from "../../features/students/model";
import { useUnit } from "effector-react";
import {
  $graphData,
  triggerOverallScore,
} from "../../features/analytics/model";
import { $gptAnalysis, triggerGptAnalysis } from "../../features/ai";
import ListeningChart from "../../entities/charts/best-worst-graph/listening";
import SpeakingChart from "../../entities/charts/best-worst-graph/speaking";
import ReadingChart from "../../entities/charts/best-worst-graph/reading";
import WritingChart from "../../entities/charts/best-worst-graph/writing";
import { Input } from "../../shared/ui/input/input";
import { useState } from "react";
const StudentProfile = (): JSX.Element => {
  const [question, setQuestion] = useState("");
  const gptAnalysis = useUnit($gptAnalysis);
  // const fetchListening = useUnit(triggerGetListening);
  // const fetchReading = useUnit(triggerGetReading);
  // const fetchSpeaking = useUnit(triggerGetSpeaking);
  // const fetchWriting = useUnit(triggerGetWriting);
  // useEffect(() => {
  //   fetchListening();
  //   fetchReading();
  //   fetchSpeaking();
  //   fetchWriting();
  // }, []);
  const fetchGraph = useUnit(triggerOverallScore);
  useEffect(() => {
    fetchGraph({
      user_id: Number(localStorage.getItem("studentId")),
      date_from: "2022-01-01",
      date_to: "2024-12-31",
    });
  }, []);
  const fetchAnalysis = useUnit(triggerGptAnalysis);
  const handleGenerate = () => {
    fetchAnalysis({
      userId: Number(localStorage.getItem("studentId")),
      dateFrom: "2022-01-01",
      dateTo: "2024-12-31",
    });
  };
  const graphData = useUnit($graphData);
  useEffect(() => {
    console.log(graphData);
  }, [graphData]);
  const students = useUnit($students);
  const studentId = localStorage.getItem("studentId");
  const student =
    students?.data?.find(
      (student) => student.student_id === Number(studentId)
    ) || {};

  const navigate = useNavigate();
  const handleAdd = () => {
    navigate("create-entry");
  };
  return (
    <div className="p-8 bg-gray-200 h-full w-full flex justify-center">
      <div className="w-fit flex flex-col">
        <div className="flex justify-between">
          <p className="font-bold text-2xl">Student info</p>
          <Button
            onClick={handleAdd}
            startIcon={<Plus color="white" size={20} />}
          >
            Добавить результаты
          </Button>
        </div>
        <div className="flex gap-4 mt-4">
          <div className="w-1/3">
            {student && <StudentProfileCard student={student} />}
          </div>
          <div className="w-full ">
            <Calendar />
          </div>
        </div>
        <div className="w-full flex items-center justify-center mt-4 shadow-sm rounded-lg p-4 bg-white">
          <div className="w-full">
            <ScoresGraph />
          </div>
        </div>
        <div className="w-full flex gap-4 mt-4">
          <div className="w-1/2 h-full bg-white rounded-lg shadow-sm">
            <AvgScoreBarChart />
          </div>
          <div className="w-1/2 bg-white">
            <EstimatedScore />
          </div>
        </div>
        <div className="w-full flex justify-between">
          <div className="w-1/2 bg-white shadow-sm rounded-lg mt-4">
            <ListeningChart />
          </div>
          <div className="w-1/2 bg-white shadow-sm rounded-lg mt-4">
            <SpeakingChart />
          </div>
        </div>
        <div className="w-full flex justify-between">
          <div className="w-1/2 bg-white shadow-sm rounded-lg mt-4">
            <ReadingChart />
          </div>
          <div className="w-1/2 bg-white shadow-sm rounded-lg mt-4">
            <WritingChart />
          </div>
        </div>
        <div className="w-full pb-4 bg-white flex flex-col items-center pt-16 justify-center rounded-xl shadow-sm">
          <Button
            onClick={handleGenerate}
            startIcon={<Sparkles color="white" />}
            className="bg-[#DB5375] font-bold hover:bg-pink-600 text-white w-fit"
          >
            Генерировать Анализ
          </Button>
          <div className="w-[50rem] h-[20rem] text-md border border-pink-600 mt-4 rounded-lg bg-gray-300  p-2 tracking-wide drop-shadow-lg flex justify-center items-center text-justify">
            {gptAnalysis && <p>{gptAnalysis.message}</p>}
          </div>
        </div>
        <div className="w-full pb-4 bg-white mt-8 flex flex-col items-center pt-16 justify-center rounded-xl shadow-sm">
          <div className="flex items-end justify-center gap-16">
            <Button
              onClick={handleGenerate}
              startIcon={<Sparkles color="white" />}
              className="bg-[#094074] font-bold hover:bg-blue-600 text-white w-fit"
            >
              Спросить вопрос
            </Button>
            <Input
              label="Спросите вопрос касательно теста..."
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            />
          </div>
          <div className="w-[50rem] mt-4 h-[20rem] text-md p-2 tracking-wide border border-blue-600 rounded-lg drop-shadow-lg bg-gray-300 flex justify-center items-center text-justify">
            {gptAnalysis && <p>{gptAnalysis.message}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
