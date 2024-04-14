import { Input } from "../../../../shared/ui/input/input";
import { useState } from "react";
import { getSectionColor } from "../../../../utils/getSectionColor";
import { ListeningScoresForm } from "../components/listening";
import { ReadingTestScoresForm } from "../components/reading";
import { SpeakingScoresForm } from "../components/speaking";
import { WritingScoresForm } from "../components/writing";
import { Overall } from "../components/overall";
const sections = [
  {
    title: "Listening",
  },
  {
    title: "Reading",
  },
  {
    title: "Writing",
  },
  {
    title: "Speaking",
  },
  {
    title: "Overall",
  },
];

export const Test = () => {
  const [type, setType] = useState<
    "Listening" | "Reading" | "Writing" | "Speaking" | "Overall"
  >("Listening");
  return (
    <div>
      <div className="w-full flex mt-4 justify-between">
        {sections.map((section) => (
          <div
            className="bg-zinc-400 hover:bg-blue-400
           text-center rounded-md py-1 w-1/6 border shadow-md cursor-pointer duration-75 border-zinc-200"
            onClick={() => setType(section.title as any)}
            style={
              type === section.title
                ? {
                    backgroundColor: getSectionColor(section.title),
                    color: "white",
                  }
                : {
                    backgroundColor: "white",
                  }
            }
          >
            {section.title}
          </div>
        ))}
      </div>
      <div>
        {type === "Listening" && <ListeningScoresForm />}
        {type === "Reading" && <ReadingTestScoresForm />}
        {type === "Speaking" && <SpeakingScoresForm />}
        {type === "Writing" && <WritingScoresForm />}
        {type === "Overall" && <Overall />}
      </div>
    </div>
  );
};
