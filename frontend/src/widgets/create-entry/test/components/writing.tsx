import { useState } from "react";
import { Input } from "../../../../shared/ui/input/input";
import { Button } from "../../../../shared/ui/button/button";
import { useNavigate } from "react-router-dom";

export const WritingScoresForm = (): JSX.Element => {
  const navigate = useNavigate();

  const [scores, setScores] = useState({
    task1AchievementScore: 0.0,
    task1CoherenceScore: 0.0,
    task1LexicalResourceScore: 0.0,
    task1GrammaticalRangeScore: 0.0,
    task2ResponseScore: 0.0,
    task2CoherenceScore: 0.0,
    task2LexicalResourceScore: 0.0,
    task2GrammaticalRangeScore: 0.0,
    overallWritingScore: 0.0,
  });
  const handleScoreChange =
    (scoreType: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const value =
        scoreType === "overallReadingScore"
          ? parseFloat(e.target.value)
          : parseInt(e.target.value, 10);
      setScores((prevScores) => ({
        ...prevScores,
        [scoreType]: value,
      }));
    };

  const handleSubmit = () => {
    console.log("Submitted Scores:", scores);
    navigate("/students/student");
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="grid grid-cols-2 p-4 gap-4 bg-white">
        {Object.entries(scores).map(([key, value]) => {
          const text = key.replace(/([A-Z])/g, " $1").trim();
          return (
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
