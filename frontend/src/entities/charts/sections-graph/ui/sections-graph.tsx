import { useState } from "react";

import { Graph } from "./components/graph";
import { Badge } from "./components/badge";
import { getSectionColor } from "../../../../utils/getSectionColor";
import { $graphData } from "../../../../features/analytics/model";
import { useUnit } from "effector-react";
export const ScoresGraph = (): JSX.Element => {
  const data = useUnit($graphData);
  const transformData = (data) => {
    if (data)
      return data.map((item, index: number) => ({
        name: `Test ${index + 1}`,
        Listening: item.listening_score,
        Reading: item.reading_score,
        Speaking: item.speaking_score,
        Writing: item.writing_score,
        Overall: item.overall_score,
        date: item.test_date,
      }));
    else return [];
  };

  const formattedData = data ? transformData(data) : [];
  const sections = ["Listening", "Reading", "Speaking", "Writing", "Overall"];
  const [selectedSections, setSelectedSections] = useState<string[]>([
    "Overall",
  ]);

  const toggleAggregator = (section: string) => {
    setSelectedSections((prevSelected) => {
      if (prevSelected.includes(section)) {
        return prevSelected.filter((item) => item !== section);
      } else {
        return [...prevSelected, section];
      }
    });
  };

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-4">
      <div className="flex w-full justify-between items-center">
        <p className="text-xl font-bold w-full">Результаты пробных</p>
        <div className="flex w-full items-center justify-end">
          <div className="flex gap-4">
            {sections.map((section) => (
              <Badge
                label={section}
                key={section}
                color={getSectionColor(section)}
                onClick={() => toggleAggregator(section)}
                selected={selectedSections.includes(section)}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="flex h-[25rem] w-full items-center justify-center">
        {data && formattedData && (
          <Graph data={formattedData} sections={selectedSections} />
        )}
      </div>
    </div>
  );
};
