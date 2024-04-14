import { useState } from "react";
import { Input } from "../../../../shared/ui/input/input";
import { Button } from "../../../../shared/ui/button/button";
import { useNavigate } from "react-router-dom";
import { useUnit } from "effector-react";
import { triggerCreateOverallTest } from "../../../../features/create-test/model";

export const Overall = (): JSX.Element => {
  const submit = useUnit(triggerCreateOverallTest);
  const navigate = useNavigate();
  const [scores, setScores] = useState({
    test_date: "",
    listening_score: "",
    reading_score: "",
    speaking_score: "",
    writing_score: "",
    overall_score: "",
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
    submit({
      user_id: Number(localStorage.getItem("studentId")),
      test_date: scores.test_date,
      test_type: "IELTS",
      listening_score: Number(scores.listening_score),
      reading_score: Number(scores.reading_score),
      speaking_score: Number(scores.speaking_score),
      writing_score: Number(scores.writing_score),
      overall_score: Number(scores.overall_score),
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
              label={text.at(0)?.toUpperCase() + text.slice(1)}
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
              size="sm"
              type="number" // Changed to "number" to allow numeric input
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
