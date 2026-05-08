import { motion } from "framer-motion";

/**
 * Reusable navigation button
 * - Scrolls smoothly to target section
 * - Has hover + press animation
 */
export default function Button({ type }) {
  const isPortfolio = type === "portfolio";

  const handleClick = () => {
    const targetId = isPortfolio ? "portfolio" : "expenses";

    const target = document.getElementById(targetId);

    // Ensure element exists before scrolling
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <motion.button
      onClick={handleClick}
      whileTap={{ scale: 0.94 }}
      whileHover={{ y: -4 }}
      className={`
        group relative overflow-hidden
        flex items-center justify-center
        px-10 py-5
        rounded-2xl
        text-lg font-medium
        border border-black/10
        backdrop-blur-md
        shadow-[0_8px_0_rgba(0,0,0,0.2)]
        active:shadow-[0_3px_0_rgba(0,0,0,0.2)]
        transition-all duration-200

        ${
          isPortfolio
            ? "bg-[#CCBEB1] hover:bg-blue-200"
            : "bg-[#997E67] hover:bg-green-200"
        }
      `}
    >
      {/* Text + Emoji animation container */}
      <div className="flex items-center gap-2 transition-all duration-300 group-hover:-translate-x-2">
        
        {/* Button Label */}
        <span>
          {isPortfolio ? "Go to Portfolio" : "Manage Expenses"}
        </span>

        {/* Emoji + Arrow (appears on hover) */}
        <span className="flex items-center gap-2 opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
          <span className="text-xl">
            {isPortfolio ? "📊" : "💸"}
          </span>

          <span className="text-lg font-bold transition-transform group-hover:translate-y-1">
            ↓
          </span>
        </span>
      </div>
    </motion.button>
  );
}