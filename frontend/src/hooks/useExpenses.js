import { useEffect, useState } from "react";
import { parseCSV } from "../utils/parseCSV";

export default function useExpenses() {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    fetch("/src/data/expenses.csv")
      .then((res) => res.text())
      .then((text) => {
        const data = parseCSV(text);
        setExpenses(data);
      });
  }, []);

  return expenses;
}
