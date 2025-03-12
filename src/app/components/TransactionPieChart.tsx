"use client";

import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Transaction } from "./TransactionForm";

interface Props {
  transactions: Transaction[];
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A28EFF"];

const TransactionPieChart = ({ transactions }: Props) => {
  // Group transactions by category and sum prices
  const categoryTotals = transactions.reduce((acc: Record<string, number>, transaction) => {
    acc[transaction.category] = (acc[transaction.category] || 0) + transaction.price;
    return acc;
  }, {});

  const data = Object.entries(categoryTotals).map(([category, price]) => ({
    name: category,
    value: price,
  }));

  if (data.length === 0) {
    return <p className="text-gray-500 text-center">Don't have data</p>;
  }

  return (
    <div className="flex flex-col md:flex-row justify-center items-center gap-8">
      {/* Pie Chart */}
      <div className="w-full md:w-1/2 h-96">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              outerRadius={150}
              dataKey="value"
            >
              {data.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Custom Legend / Price Per Category */}
      <div className="w-full md:w-1/3 space-y-4">
        <h3 className="text-lg font-semibold text-gray-700 mb-2">Cost by Category</h3>
        {data.map((entry, index) => (
          <div key={index} className="flex justify-between items-center border-b pb-2">
            <div className="flex items-center gap-2">
              <div
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: COLORS[index % COLORS.length] }}
              ></div>
              <span className="text-gray-700">{entry.name}</span>
            </div>
            <span className="font-semibold text-gray-900">{entry.value.toLocaleString()} đ</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransactionPieChart;
