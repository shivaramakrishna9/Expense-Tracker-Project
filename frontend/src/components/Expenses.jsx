import useExpenses from "../hooks/useExpenses";
import ExpenseArc from "./ExpenseArc";

/**
 * Expenses Dashboard
 * - Left: Table view
 * - Right: Chart visualization
 * - Bottom: Optional blogs section
 */
export default function Expenses({ showBlogs }) {
  const expenses = useExpenses();

  const total = expenses.reduce(
    (sum, e) => sum + Number(e.amount),
    0
  );

  return (
    <section
      id="expenses" // Required for scroll navigation
      className="min-h-screen flex flex-col justify-center px-20"
    >

      {/* Title */}
      <h2 className="text-5xl font-bold text-center mb-12">
        Expense Dashboard
      </h2>

      <div className="flex gap-12 items-center">

        {/* LEFT → Table */}
        <div className="w-1/2">
          <div className="bg-white/40 backdrop-blur-md p-6 rounded-xl shadow-md">

            {/* Header */}
            <div className="flex justify-between font-semibold border-b pb-2 mb-3">
              <span>Category</span>
              <span>Amount</span>
            </div>

            {/* Rows */}
            {expenses.map((e, i) => (
              <div
                key={i}
                className="flex justify-between py-2 hover:bg-white/30 rounded px-2"
              >
                <span>{e.category}</span>
                <span>₹{e.amount}</span>
              </div>
            ))}

            {/* Total */}
            <div className="flex justify-between font-bold mt-4 border-t pt-3">
              <span>Total</span>
              <span>₹{total}</span>
            </div>
          </div>

          {/* Add Expense Button (future modal trigger) */}
          <button className="mt-6 w-full py-4 rounded-xl bg-[#CCBEB1] shadow-[0_6px_0_#997E67] active:translate-y-1 active:shadow-[0_2px_0_#997E67] transition font-semibold">
            + Add Expense
          </button>
        </div>

        {/* RIGHT → Chart */}
        <div className="w-1/2">
          <ExpenseArc expenses={expenses} total={total} />
        </div>

      </div>

      {/* BLOGS / TIPS */}
      {showBlogs && (
        <div className="grid grid-cols-3 gap-6 mt-12">
          <div className="bg-white/40 backdrop-blur-md p-5 rounded-xl shadow-md hover:scale-105 transition">
            Track spending
          </div>
          <div className="bg-white/40 backdrop-blur-md p-5 rounded-xl shadow-md hover:scale-105 transition">
            Budget wisely
          </div>
          <div className="bg-white/40 backdrop-blur-md p-5 rounded-xl shadow-md hover:scale-105 transition">
            Invest savings
          </div>
        </div>
      )}
    </section>
  );
}