import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

interface ChartProps {
  chartData: any[];
  selectedLine: string | null;
  handleLegendClick: (e: any) => void;
}

const Chart: React.FC<ChartProps> = ({
  chartData,
  selectedLine,
  handleLegendClick,
}) => {
  return (
    <ResponsiveContainer width="100%" height={400} className="mt-5">
      <LineChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend onClick={handleLegendClick} />
        {(selectedLine === 'Subscription' || !selectedLine) && (
          <Line type="monotone" dataKey="Subscription" stroke="#1E4894" />
        )}
        {(selectedLine === 'Logistics' || !selectedLine) && (
          <Line type="monotone" dataKey="Logistics" stroke="#02D5E1" />
        )}
      </LineChart>
    </ResponsiveContainer>
  );
};

export default Chart;
