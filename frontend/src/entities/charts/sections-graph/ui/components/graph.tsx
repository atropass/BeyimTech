import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { getSectionColor } from "../../../../../utils/getSectionColor";

interface GraphProps {
  data: any[];
  sections: string[];
}

export const Graph = ({ data, sections }: GraphProps) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip
          content={({ active, payload, label }) => {
            if (active && payload && payload.length) {
              const date = data.filter((g) => g.name === label)[0].date;
              return (
                <div className="rounded-md bg-white p-4 drop-shadow-md">
                  <p className="font-bold ">Баллы по секциям:</p>
                  <p className="text-sm">{date}</p>
                  {payload.map((p, index) => {
                    return (
                      <div className="flex items-center" key={index}>
                        <div
                          className="mr-4 h-4 w-4 rounded-full"
                          style={{ backgroundColor: p.color }}
                        />
                        <p className="text-md">
                          {sections[index]}: {p.value}
                        </p>
                      </div>
                    );
                  })}
                </div>
              );
            }
          }}
        />

        {sections.map((section, index) => (
          <Line
            type="monotone"
            dataKey={section}
            stroke={getSectionColor(section)}
            key={index}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
};
