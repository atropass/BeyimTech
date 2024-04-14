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
    multiple_choice_score: 70,
    matching_questions_score: 60,
    diagram_labelling_score: 90,
    summary_completion_score: 70,
    sentence_completion_score: 80,
    short_answer_score: 85,
  },
  {
    multiple_choice_score: 75,
    matching_questions_score: 65,
    diagram_labelling_score: 88,
    summary_completion_score: 72,
    sentence_completion_score: 75,
    short_answer_score: 80,
  },
  {
    multiple_choice_score: 80,
    matching_questions_score: 70,
    diagram_labelling_score: 95,
    summary_completion_score: 80,
    sentence_completion_score: 85,
    short_answer_score: 90,
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

const ListeningChart = () => (
  <ResponsiveContainer width="100%" height={400}>
    <BarChart
      data={chartData}
      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" height={60} tick={<CustomizedAxisTick />} />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#4361EE" />
    </BarChart>
  </ResponsiveContainer>
);

export default ListeningChart;
