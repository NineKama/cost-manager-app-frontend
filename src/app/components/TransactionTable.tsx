"use client";

import { Transaction } from "./TransactionForm";

interface Props {
  transactions: Transaction[];
}

const TransactionTable = ({ transactions }: Props) => {
  return (
    <div className="overflow-x-auto">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Transactions</h2>

      {transactions.length === 0 ? (
        <p className="text-gray-500 text-center">No transactions found.</p>
      ) : (
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
          <thead>
            <tr className="bg-gray-100 text-gray-700">
              <th className="py-3 px-4 border-b">Title</th>
              <th className="py-3 px-4 border-b">Category</th>
              <th className="py-3 px-4 border-b">Date</th>
              <th className="py-3 px-4 border-b">Price</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx, index) => (
              <tr
                key={index}
                className="text-center hover:bg-gray-50 transition-colors duration-200"
              >
                <td className="py-3 px-4 border-b">{tx.title}</td>
                <td className="py-3 px-4 border-b">{tx.category}</td>
                <td className="py-3 px-4 border-b">{tx.date}</td>
                <td className="py-3 px-4 border-b text-green-600 font-semibold">{tx.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TransactionTable;
