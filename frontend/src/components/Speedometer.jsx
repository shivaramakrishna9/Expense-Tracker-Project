import { motion } from "framer-motion";

export default function Speedometer({ value = 70 }) {
  const radius = 90;
  const circumference = Math.PI * radius;

  return (
    <div className="flex flex-col items-center">

      <svg width="220" height="130">
        {/* background arc */}
        <path
          d="M10 110 A90 90 0 0 1 210 110"
          stroke="#ddd"
          strokeWidth="12"
          fill="none"
        />

        {/* animated arc */}
        <motion.path
          d="M10 110 A90 90 0 0 1 210 110"
          stroke="url(#grad)"
          strokeWidth="12"
          fill="none"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{
            strokeDashoffset: circumference * (1 - value / 100),
          }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />

        <defs>
          <linearGradient id="grad">
            <stop offset="0%" stopColor="#00c6ff" />
            <stop offset="100%" stopColor="#0072ff" />
          </linearGradient>
        </defs>
      </svg>

      <p className="text-2xl font-semibold mt-2">{value}%</p>
    </div>
  );
}