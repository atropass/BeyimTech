import { getSectionColor } from "../../../../utils/getSectionColor";
import Circle from "../components/circle";
import "../style.css";
export const EstimatedScore = (): JSX.Element => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm h-full bg">
      <p className="font-bold text-lg">Прогнозируемый балл</p>
      <div className="flex items-center h-full justify-center">
        <div className="w-96 h-96">
          <Circle text="6.5" />
        </div>
        <div className="flex flex-col font-bold">
          <p
            style={{
              color: getSectionColor("Listening"),
            }}
          >
            L 6.5
          </p>
          <p
            style={{
              color: getSectionColor("Reading"),
            }}
          >
            R 6
          </p>
          <p
            style={{
              color: getSectionColor("Writing"),
            }}
          >
            W 7
          </p>
          <p
            style={{
              color: getSectionColor("Speaking"),
            }}
          >
            S 6.5
          </p>
        </div>
      </div>
    </div>
  );
};
