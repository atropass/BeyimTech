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
    matching_headings_score: 3,
    multiple_choice_score: 1,
    short_answer_score: 3,
    name_matching_score: 3,
    true_false_not_given_score: 1,
    yes_no_not_given_score: 3,
    summary_completion_score: 1,
    matching_sentence_endings_score: 3,
    sentence_completion_score: 1,
    table_completion_score: 3,
    matching_information_score: 2,
    diagram_labelling_score: 3,
  },
  {
    matching_headings_score: 2,
    multiple_choice_score: 2,
    short_answer_score: 2,
    name_matching_score: 2,
    true_false_not_given_score: 2,
    yes_no_not_given_score: 2,
    summary_completion_score: 2,
    matching_sentence_endings_score: 2,
    sentence_completion_score: 2,
    table_completion_score: 2,
    matching_information_score: 3,
    diagram_labelling_score: 2,
  },
  {
    matching_headings_score: 3,
    multiple_choice_score: 3,
    short_answer_score: 1,
    name_matching_score: 3,
    true_false_not_given_score: 1,
    yes_no_not_given_score: 2,
    summary_completion_score: 2,
    matching_sentence_endings_score: 1,
    sentence_completion_score: 3,
    table_completion_score: 1,
    matching_information_score: 1,
    diagram_labelling_score: 3,
  },
  {
    matching_headings_score: 1,
    multiple_choice_score: 1,
    short_answer_score: 3,
    name_matching_score: 1,
    true_false_not_given_score: 3,
    yes_no_not_given_score: 1,
    summary_completion_score: 3,
    matching_sentence_endings_score: 1,
    sentence_completion_score: 2,
    table_completion_score: 3,
    matching_information_score: 3,
    diagram_labelling_score: 1,
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

const ReadingChart = () => (
  <ResponsiveContainer width="100%" height={400}>
    <BarChart
      data={chartData}
      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" height={60} tick={<CustomizedAxisTick />} />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#06D6A0" />
    </BarChart>
  </ResponsiveContainer>
);

export default ReadingChart;
