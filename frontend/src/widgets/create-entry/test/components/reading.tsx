import { useState } from "react";
import { Input } from "../../../../shared/ui/input/input";
import { Button } from "../../../../shared/ui/button/button";
import { useNavigate } from "react-router-dom";
import { triggerCreateReadingTest } from "../../../../features/create-test/model";
import { useUnit } from "effector-react";
export const ReadingTestScoresForm = () => {
  const navigate = useNavigate();
  const createReading = useUnit(triggerCreateReadingTest);
  const [scores, setScores] = useState({
    test_date: "",
    matchingHeadingsScore: "",
    multipleChoiceScore: "",
    shortAnswerScore: "",
    nameMatchingScore: "",
    trueFalseNotGivenScore: "",
    yesNoNotGivenScore: "",
    summaryCompletionScore: "",
    matchingSentenceEndingsScore: "",
    sentenceCompletionScore: "",
    tableCompletionScore: "",
    matchingInformationScore: "",
    diagramLabellingScore: "",
    overallReadingScore: "",
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
    createReading({
      user_id: Number(localStorage.getItem("studentId")),
      test_date: scores.test_date,
      matching_headings_score: Number(scores.matchingHeadingsScore),
      multiple_choice_score: Number(scores.multipleChoiceScore),
      short_answer_score: Number(scores.shortAnswerScore),
      name_matching_score: Number(scores.nameMatchingScore),
      true_false_not_given_score: Number(scores.trueFalseNotGivenScore),
      yes_no_not_given_score: Number(scores.yesNoNotGivenScore),
      summary_completion_score: Number(scores.summaryCompletionScore),
      matching_sentence_endings_score: Number(
        scores.matchingSentenceEndingsScore
      ),
      sentence_completion_score: Number(scores.sentenceCompletionScore),
      table_completion_score: Number(scores.tableCompletionScore),
      matching_information_score: Number(scores.matchingInformationScore),
      diagram_labelling_score: Number(scores.diagramLabellingScore),
      overall_reading_score: Number(scores.overallReadingScore),
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
