import { useState } from "react";
import { Input } from "../../../../shared/ui/input/input";
import { Button } from "../../../../shared/ui/button/button";
import { useNavigate } from "react-router-dom";

import { useUnit } from "effector-react";
import { triggerCreateSpeakingTest } from "../../../../features/create-test/model";

export const SpeakingScoresForm = (): JSX.Element => {
  const navigate = useNavigate();
  const submit = useUnit(triggerCreateSpeakingTest);
  const [scores, setScores] = useState({
    fluencyScore: 0.0,
    coherenceScore: 0.0,
    lexicalResourceScore: 0.0,
    grammaticalRangeScore: 0.0,
    accuracyScore: 0.0,
    pronunciationScore: 0.0,
    overallSpeakingScore: 0.0,
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
    submit({
      user_id: Number(localStorage.getItem("studentId")),
      test_date: new Date().toISOString(),
      fluency_score: Number(scores.fluencyScore),
      coherence_score: Number(scores.coherenceScore),
      lexical_resource_score: Number(scores.lexicalResourceScore),
      grammatical_range_score: Number(scores.grammaticalRangeScore),
      accuracy_score: Number(scores.accuracyScore),
      pronunciation_score: Number(scores.pronunciationScore),
      overall_speaking_score: Number(scores.overallSpeakingScore),
    });
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
              type="text"
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
