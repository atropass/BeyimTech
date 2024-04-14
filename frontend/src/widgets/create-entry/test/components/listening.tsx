import { useState } from "react";
import { Input } from "../../../../shared/ui/input/input";
import { Button } from "../../../../shared/ui/button/button";
import { useNavigate } from "react-router-dom";
import { useUnit } from "effector-react";
import { triggerCreateListeningTest } from "../../../../features/create-test/model";

export const ListeningScoresForm = (): JSX.Element => {
  const navigate = useNavigate();
  const createListening = useUnit(triggerCreateListeningTest);
  const [scores, setScores] = useState({
    test_date: "",
    multipleChoiceScore: "",
    matchingQuestionsScore: "",
    diagramLabellingScore: "",
    summaryCompletionScore: "",
    sentenceCompletionScore: "",
    shortAnswerScore: "",
    overallListeningScore: "",
  });
  const handleScoreChange =
    (scoreType: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      if (scoreType === "test_date") {
        setScores((prevScores) => ({
          ...prevScores,
          [scoreType]: e.target.value,
        }));
      } else {
        const value = parseFloat(e.target.value) || "";
        setScores((prevScores) => ({
          ...prevScores,
          [scoreType]: value,
        }));
      }
    };
  const handleSubmit = () => {
    createListening({
      user_id: Number(localStorage.getItem("studentId")),
      test_date: scores.test_date,
      multiple_choice_score: Number(scores.multipleChoiceScore),
      matching_questions_score: Number(scores.matchingQuestionsScore),
      diagram_labelling_score: Number(scores.diagramLabellingScore),
      summary_completion_score: Number(scores.summaryCompletionScore),
      sentence_completion_score: Number(scores.sentenceCompletionScore),
      short_answer_score: Number(scores.shortAnswerScore),
      overall_listening_score: Number(scores.overallListeningScore),
    });
    navigate("/students/student");
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="grid grid-cols-2 p-4 gap-4 bg-white">
        {Object.entries(scores).map(([key, value]) => {
          const text = key.replace(/([A-Z])/g, " $1").trim();
          return key === "test_date" ? (
            <Input
              key={key}
              label={text.at(0)?.toUpperCase() + text.slice(1)} // must be Capitalized
              inputClassNames="w-full"
              type="string"
              size="sm"
              value={value}
              onChange={handleScoreChange(key)}
            />
          ) : (
            <Input
              key={key}
              label={text.at(0)?.toUpperCase() + text.slice(1)} // must be Capitalized
              inputClassNames="w-full"
              type="number"
              size="sm"
              value={value}
              onChange={handleScoreChange(key)}
            />
          );
        })}
      </div>
      <div className="flex w-full justify-center mt-4">
        <Button size="sm" onClick={handleSubmit}>
          Save Scores
        </Button>
      </div>
    </div>
  );
};
