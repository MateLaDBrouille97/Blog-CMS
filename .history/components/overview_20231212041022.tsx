"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Rectangle,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

interface OverviewProps {
  data: any[];
}

export const Overview: React.FC<OverviewProps> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
       
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}`}
        />

        <Bar
          dataKey="totalChapter"
          fill="#3498db"
          radius={[4, 4, 0, 0]}
          activeBar={<Rectangle fill="pink" stroke="blue" />}
        />
        <Bar
          dataKey="totalArticle"
          fill="#82ca9d"
          radius={[4, 4, 0, 0]}
          activeBar={<Rectangle fill="gold" stroke="purple" />}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};
