import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

import { getSectionColor } from "../../../../utils/getSectionColor";

interface CircleProps {
  text: string;
}

const Circle = ({ text }: CircleProps) => {
  const data = [
    { section: "Listening", sum: 25 },
    { section: "Reading", sum: 25 },
    { section: "Speaking", sum: 25 },
    { section: "Writing", sum: 25 },
  ];
  return (
    <ResponsiveContainer width="100%" height={400}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius="70%"
          fill="#8884d8"
          dataKey="sum"
          nameKey="aggregator"
          paddingAngle={5}
          innerRadius="55%"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={getSectionColor(entry.section)} />
          ))}
        </Pie>
        <text
          x="50%"
          y="46.5%"
          textAnchor="middle"
          dominantBaseline="central"
          className="text-lg"
        >
          Overall
        </text>
        <text
          x="50%"
          y="53.5%"
          textAnchor="middle"
          dominantBaseline="central"
          className="text-3xl font-bold"
        >
          {text}
        </text>
      </PieChart>
    </ResponsiveContainer>
  );
};

export default Circle;
