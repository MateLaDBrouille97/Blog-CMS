"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  Rectangle,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface OverviewProps {
  data: any[];
}

export const Overview3: React.FC<OverviewProps> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <RadarChart cx="100%" cy="100%" outerRadius="80%" data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="category" />
          <PolarRadiusAxis />
          <Radar name="Mike" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
        </RadarChart>
    </ResponsiveContainer>
  );
};
