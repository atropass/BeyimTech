import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const mockData = [
  {
    task1_achievement_score: 6,
    task1_coherence_score: 6.5,
    task1_lexical_resource_score: 5.5,
    task1_grammatical_range_score: 6,
    task2_response_score: 7,
    task2_coherence_score: 6.5,
    task2_lexical_resource_score: 6,
    task2_grammatical_range_score: 6.5,
    overall_writing_score: 6.5,
  },
  {
    task1_achievement_score: 5,
    task1_coherence_score: 5,
    task1_lexical_resource_score: 4.5,
    task1_grammatical_range_score: 5,
    task2_response_score: 5.5,
    task2_coherence_score: 5,
    task2_lexical_resource_score: 5.5,
    task2_grammatical_range_score: 5,
    overall_writing_score: 5,
  },
  {
    task1_achievement_score: 7,
    task1_coherence_score: 7,
    task1_lexical_resource_score: 6.5,
    task1_grammatical_range_score: 7,
    task2_response_score: 7.5,
    task2_coherence_score: 7.5,
    task2_lexical_resource_score: 7,
    task2_grammatical_range_score: 7.5,
    overall_writing_score: 7,
  },
  {
    task1_achievement_score: 8,
    task1_coherence_score: 7.5,
    task1_lexical_resource_score: 7.5,
    task1_grammatical_range_score: 8,
    task2_response_score: 7,
    task2_coherence_score: 7,
    task2_lexical_resource_score: 7.5,
    task2_grammatical_range_score: 7,
    overall_writing_score: 7.5,
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

const WritingChart = () => (
  <ResponsiveContainer width="100%" height={400}>
    <BarChart
      data={chartData}
      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" height={60} tick={<CustomizedAxisTick />} />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#F39C6B" />
    </BarChart>
  </ResponsiveContainer>
);

export default WritingChart;
