import { motion } from "framer-motion";
import useFontCycle from "../hooks/useFontCycle";
import Button from "./Button";

export default function Hero({
  username,
  showNews,
  setShowNews,
  showBlogs,
  setShowBlogs
}) {
  const font = useFontCycle();

  return (
    <section className="h-screen flex flex-col justify-center items-center relative">

      {/* TOGGLES TOP RIGHT */}
      <div className="
        absolute top-6 right-10
        bg-white/40 backdrop-blur-md
        px-4 py-3 rounded-xl
        shadow-md
        space-y-2
      ">

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={showNews}
            onChange={() => setShowNews(!showNews)}
          />
          Market News
        </label>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={showBlogs}
            onChange={() => setShowBlogs(!showBlogs)}
          />
          Blogs
        </label>

      </div>

      {/* TEXT ANIMATION */}
      <motion.div className="overflow-hidden h-[80px]">
        <motion.h1
          key={font}
          style={{ fontFamily: font }}
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-6xl font-bold tracking-tight"
        >
          Welcome, {username}
        </motion.h1>
      </motion.div>

      {/* BUTTONS */}
      <motion.div
        className="flex gap-20 mt-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <Button type="portfolio" />
        <Button type="expenses" />
      </motion.div>

    </section>
  );
}