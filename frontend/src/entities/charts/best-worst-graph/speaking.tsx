import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const mockData = [
  {
    fluency_score: 6,
    coherence_score: 7,
    lexical_resource_score: 6.5,
    grammatical_range_score: 7,
    accuracy_score: 6.5,
    pronunciation_score: 8,
  },
  {
    fluency_score: 7,
    coherence_score: 6.5,
    lexical_resource_score: 7,
    grammatical_range_score: 6.5,
    accuracy_score: 7,
    pronunciation_score: 7.5,
  },
  {
    fluency_score: 8,
    coherence_score: 8.5,
    lexical_resource_score: 8,
    grammatical_range_score: 7.5,
    accuracy_score: 8,
    pronunciation_score: 8,
  },
  {
    fluency_score: 5.5,
    coherence_score: 6,
    lexical_resource_score: 6,
    grammatical_range_score: 5.5,
    accuracy_score: 6,
    pronunciation_score: 6.5,
  },
  {
    fluency_score: 7.5,
    coherence_score: 8,
    lexical_resource_score: 7.5,
    grammatical_range_score: 8,
    accuracy_score: 7.5,
    pronunciation_score: 7.5,
  },
];

const averageScores = mockData.reduce((acc, cur) => {
  Object.keys(cur).forEach((key) => {
    acc[key] = (acc[key] || 0) + cur[key] / mockData.length;
  });
  return acc;
}, {});

const sortedScores = Object.entries(averageScores)
  .map(([key, value]) => ({ name: key, value }))
  .sort((a, b) => b.value - a.value);

const topScores = sortedScores
  .slice(0, 3)
  .map((item) => ({ ...item, value: Math.abs(item.value) }));
const bottomScores = sortedScores
  .slice(-3)
  .map((item) => ({ ...item, value: Math.abs(item.value) }));

const chartData = [...topScores, ...bottomScores];

const CustomizedAxisTick = ({ x, y, payload }) => {
  const { value } = payload;
  return (
    <text
      x={x}
      y={y}
      fill="#666"
      textAnchor="middle"
      dy={16}
      className="text-xs"
    >
      {value.replace(/_/g, " ").toUpperCase()}
    </text>
  );
};

const SpeakingChart = () => (
  <ResponsiveContainer width="100%" height={400}>
    <BarChart
      data={chartData}
      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" height={60} tick={<CustomizedAxisTick />} />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#B4ADEA" />
    </BarChart>
  </ResponsiveContainer>
);

export default SpeakingChart;
