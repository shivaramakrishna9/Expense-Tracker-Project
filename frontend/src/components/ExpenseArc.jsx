import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { useState } from "react";

/**
 * Blue Eclipse palette (used for Expense section)
 */
const COLORS = [
  "#272757",
  "#8686AC",
  "#505081",
  "#0F0E47",
  "#3A3A7A",
  "#6C6CB0",
  "#1B1B5E",
];

/**
 * ExpenseArc Component
 * - 180° donut chart
 * - Shows expense distribution
 * - Hover highlights slice + tooltip
 */
export default function ExpenseArc({ expenses, total }) {
  const [activeIndex, setActiveIndex] = useState(null);

  // Transform raw data → recharts format
  const data = expenses.map((e) => ({
    name: e.category,
    value: Number(e.amount),
  }));

  return (
    <div className="w-full">

      {/* Chart Container */}
      <div className="w-full h-[320px] relative">
        <ResponsiveContainer>
          <PieChart>

            {/* Tooltip on hover */}
            <Tooltip formatter={(v, n) => [`₹${v}`, n]} />

            {/* 180° arc */}
            <Pie
              data={data}
              dataKey="value"
              startAngle={180}
              endAngle={0}
              innerRadius={80}
              outerRadius={120}
              paddingAngle={4}
              onMouseEnter={(_, i) => setActiveIndex(i)}
              onMouseLeave={() => setActiveIndex(null)}
            >
              {data.map((entry, i) => (
                <Cell
                  key={i}
                  fill={COLORS[i % COLORS.length]}
                  stroke={i === activeIndex ? "#000" : "#fff"}
                  strokeWidth={2}
                  style={{
                    filter:
                      i === activeIndex
                        ? "brightness(1.2) drop-shadow(0px 6px 12px rgba(15,14,71,0.5))"
                        : "none",
                    transition: "0.3s",
                  }}
                />
              ))}
            </Pie>

          </PieChart>
        </ResponsiveContainer>

        {/* Center Total Value */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <p className="text-xl font-bold">₹{total}</p>
        </div>
      </div>

      {/* Legend */}
      <div className="mt-4 space-y-2">
        {data.map((e, i) => (
          <div key={i} className="flex items-center gap-2 text-sm">
            <div
              className="w-3 h-3 rounded-full"
              style={{ background: COLORS[i % COLORS.length] }}
            />
            <span>{e.name}</span>
          </div>
        ))}
      </div>

    </div>
  );
}