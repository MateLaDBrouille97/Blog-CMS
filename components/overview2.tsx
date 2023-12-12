"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  Rectangle,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface OverviewProps {
  data: any[];
}

export const Overview2: React.FC<OverviewProps> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <ComposedChart data={data}>
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
        <Tooltip />
        <Legend />
        {/* <Bar
          dataKey="totalArticle"
          fill="#82ca9d"
          radius={[4, 4, 0, 0]}
          activeBar={<Rectangle fill="gold" stroke="purple" />}
        /> */}
        <Bar
          dataKey="totalNews"
          fill="#3498db"
          radius={[4, 4, 0, 0]}
          activeBar={<Rectangle fill="pink" stroke="blue" />}
        />
        <Bar
          dataKey="totalOpinions"
          fill="#eb3495"
          radius={[4, 4, 0, 0]}
          activeBar={<Rectangle fill="red" stroke="blue" />}
        />
        <Bar
          dataKey="totalGeopol"
          fill="orange"
          radius={[4, 4, 0, 0]}
          activeBar={<Rectangle fill="purple" stroke="blue" />}
        />
        <Bar
          dataKey="totalAnalysis"
          fill="red"
          radius={[4, 4, 0, 0]}
          activeBar={<Rectangle fill="green" stroke="blue" />}
        />
        <Bar
          dataKey="totalUsefulHacks"
          fill="purple"
          radius={[4, 4, 0, 0]}
          activeBar={<Rectangle fill="#eb3495" stroke="blue" />}
        />
        <Line type="monotone" dataKey="totalArticle" stroke="#ff7300" />
      </ComposedChart>
    </ResponsiveContainer>
  );
};
