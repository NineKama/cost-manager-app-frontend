"use client";

import { useState } from "react";
import TransactionTable from "./TransactionTable";
import TransactionPieChart from "./TransactionPieChart";
import { Transaction } from "./TransactionForm";

interface Props {
  transactions: Transaction[];
}

const TransactionTabs = ({ transactions }: Props) => {
  const [activeTab, setActiveTab] = useState("table");

  const getFirstDayOfMonth = () => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-01`;
  };

  const getToday = () => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(
      now.getDate()
    ).padStart(2, "0")}`;
  };

  const [fromDate, setFromDate] = useState(getFirstDayOfMonth());
  const [toDate, setToDate] = useState(getToday());

  // Filter transactions by from - to date range
  const filteredTransactions = transactions.filter((tx) => {
    return (!fromDate || tx.date >= fromDate) && (!toDate || tx.date <= toDate);
  });

  return (
    
    <div className="mt-8">
         {/* Date Filter Section */}
         <div className="flex gap-2 items-center">
          <label className="text-sm text-gray-600">Từ</label>
          <input
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            className="border p-2 rounded"
          />

          <label className="text-sm text-gray-600">Đến</label>
          <input
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            className="border p-2 rounded"
          />
        </div>
      {/* Tabs */}
      <div className="flex border-b mb-4">
        <button
          className={`px-4 py-2 ${
            activeTab === "table"
              ? "border-b-2 border-blue-600 text-blue-600 font-semibold"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("table")}
        >
          📝 Transaction
        </button>

        <button
          className={`px-4 py-2 ml-4 ${
            activeTab === "chart"
              ? "border-b-2 border-blue-600 text-blue-600 font-semibold"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("chart")}
        >
          📊 Charts
        </button>
      </div>

      {/* Content */}
      {activeTab === "table" ? (
        <TransactionTable transactions={filteredTransactions} />
      ) : (
        <TransactionPieChart transactions={filteredTransactions} />
      )}
    </div>
  );
};

export default TransactionTabs;