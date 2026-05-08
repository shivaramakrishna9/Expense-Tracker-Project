const expenses = [
  { name: "Shopping", amount: 2000 },
  { name: "Eating", amount: 3000 },
  { name: "Travel", amount: 1500 },
  { name: "Groceries", amount: 1200 },
  { name: "Fuel", amount: 1000 },
  { name: "Subscriptions", amount: 800 },
  { name: "Entertainment", amount: 1800 },
];

export default function ExpenseTable() {
  const total = expenses.reduce((sum, item) => sum + item.amount, 0);

  return (
    <div className="bg-white/50 backdrop-blur-md rounded-xl p-6 shadow-md w-full">
      <div className="flex justify-between font-semibold border-b pb-2 mb-3">
        <span>Category</span>
        <span>Amount</span>
      </div>

      {expenses.map((item, i) => (
        <div key={i} className="flex justify-between py-1 text-gray-700">
          <span>{item.name}</span>
          <span>₹{item.amount}</span>
        </div>
      ))}

      <div className="flex justify-between font-bold mt-4 border-t pt-3">
        <span>Total</span>
        <span>₹{total}</span>
      </div>
    </div>
  );
}