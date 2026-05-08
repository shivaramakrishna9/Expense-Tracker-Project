import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { useState } from "react";

/**
 * Wisteria Bloom palette (Portfolio section)
 */
const COLORS = [
  "#D3D3FF",
  "#9400D3",
  "#D8BFD8",
  "#ED80E9",
];

export default function PortfolioPie() {
  const [activeIndex, setActiveIndex] = useState(null);

  const data = [
    { name: "Nifty50", value: 40000 },
    { name: "HDFC Fund", value: 30000 },
    { name: "Gold ETF", value: 20000 },
    { name: "Crypto", value: 10000 },
  ];

  return (
    <div className="w-full h-[320px]">
      <ResponsiveContainer>
        <PieChart>

          <Tooltip formatter={(v, n) => [`₹${v}`, n]} />

          <Pie
            data={data}
            dataKey="value"
            innerRadius={60}
            outerRadius={100}
            paddingAngle={2}
            onMouseEnter={(_, i) => setActiveIndex(i)}
            onMouseLeave={() => setActiveIndex(null)}
          >
            {data.map((entry, i) => (
              <Cell
                key={i}
                fill={COLORS[i % COLORS.length]}
                stroke="#fff"
                strokeWidth={2}
                style={{
                  filter:
                    i === activeIndex
                      ? "brightness(1.15) drop-shadow(0px 6px 10px rgba(148,0,211,0.3))"
                      : "none",
                  transition: "0.3s",
                }}
              />
            ))}
          </Pie>

        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}