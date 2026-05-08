import { useEffect, useState } from "react";

const fonts = [
  "'Montserrat', sans-serif",
  "'Playfair Display', serif",
  "'Quicksand', sans-serif",
  "Impact, sans-serif",
  "monospace",
];

export default function useFontCycle() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % fonts.length);
    }, 5000);

    return () => clearInterval(interval); // cleanup (VERY important)
  }, []);

  return fonts[index];
}
