"use client";

import { useState } from "react";

export interface Transaction {
  id?: number;
  title: string;
  price: number;
  category: string;
  date: string;
}

interface Props {
  onAdd: (transaction: Transaction) => void;
}

const TransactionForm = ({ onAdd }: Props) => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState("");
  const [date, setDate] = useState(() => new Date().toISOString().split("T")[0]);

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !category || !date) {
      alert("Please fill in all fields.");
      return;
    }

    const newTransaction: Transaction = {
      title,
      price,
      category,
      date,
    };

    try {


      // Send Post request to FastAPI backend
      const response = await fetch(`${API_URL}/transactions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTransaction),
      });

      if (!response.ok) {
        throw new Error("Failed to add transaction");
      }

      const data = await response.json();
      console.log("Transaction added:", data);
  
      onAdd(newTransaction);

      setTitle("");
      setPrice(0);
      setCategory("");
      setDate("");
      setDate(new Date().toISOString().split("T")[0]);
    } catch (error) {
      console.error(error);
      alert('An error occurred while adding the transaction. Please try again.');
    }
  
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 mb-8 p-6 border border-gray-200 rounded-lg bg-gray-50 shadow-sm"
    >
      <h2 className="text-2xl font-semibold text-gray-700">Add Transaction</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="p-3 border border-gray-300 rounded focus:ring-2 focus:ring-blue-400"
          required
        />

        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="p-3 border border-gray-300 rounded focus:ring-2 focus:ring-blue-400"
          required
        />

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="p-3 border border-gray-300 rounded focus:ring-2 focus:ring-blue-400"
          required
        />

        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          className="p-3 border border-gray-300 rounded focus:ring-2 focus:ring-blue-400"
          required
        />
      </div>

      <button
        type="submit"
        className="mt-4 w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded shadow dark:text-gray-900"
      >
        Add Transaction
      </button>
    </form>
  );
};

export default TransactionForm;
