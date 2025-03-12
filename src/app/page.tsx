"use client";

import { useEffect, useState } from "react";
import TransactionForm, { Transaction } from "./components/TransactionForm";
import TransactionTabs from "./components/TransactionTabs";
import DarkModeToggle from "./components/DarkmodeToggle";

export default function Home() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const handleAddTransaction = (transaction: Transaction) => {
    setTransactions((prev) => [...prev, { ...transaction, id: prev.length + 1 }]);
  };

  //fetch transactions from backend
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch("http://localhost:8000/transactions");
        if (!response.ok) {
          throw new Error("Failed to fetch transactions"); 
        }
        const data = await response.json();
        setTransactions(data);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };
    fetchTransactions();
  }, []);

  return (
    <main className="flex flex-col items-center justify-start min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 py-12 px-4">
    <div className="w-full max-w-4xl bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold">💸 Cost Manager</h1>
        <DarkModeToggle />
      </div>

        <TransactionForm onAdd={handleAddTransaction} />

        <TransactionTabs transactions={transactions} />
      </div>
    </main>
  );
}
