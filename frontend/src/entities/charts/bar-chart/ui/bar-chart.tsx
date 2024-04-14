import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { getSectionColor } from "../../../../utils/getSectionColor";
import { $graphData } from "../../../../features/analytics/model";
import { useUnit } from "effector-react";
const AvgScoreBarChart = () => {
  const rawData = useUnit($graphData);
  const avgListening =
    rawData?.reduce((acc, item) => acc + item.listening_score, 0) /
      rawData?.length || 0;
  const avgReading =
    rawData?.reduce((acc, item) => acc + item.reading_score, 0) /
      rawData?.length || 0;
  const avgSpeaking =
    rawData?.reduce((acc, item) => acc + item.speaking_score, 0) /
      rawData?.length || 0;
  const avgWriting =
    rawData?.reduce((acc, item) => acc + item.writing_score, 0) /
      rawData?.length || 0;
  const data = [
    { section: "Listening", avgScore: avgListening },
    { section: "Reading", avgScore: avgReading },
    { section: "Speaking", avgScore: avgSpeaking },
    { section: "Writing", avgScore: avgWriting },
  ];

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="section" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="avgScore" fill="#8884d8" radius={[10, 10, 0, 0]}>
          {data &&
            data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={getSectionColor(entry.section)}
              />
            ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};
export default AvgScoreBarChart;
