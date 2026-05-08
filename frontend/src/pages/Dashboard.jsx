import React, { useEffect, useMemo, useState } from "react";
import Navbar from "../components/Navbar";
import AddExpenseModal from "../components/AddExpenseModal";
import HomePage from "./HomePage";
import ExpensesPage from "./ExpensesPage";

export default function Dashboard() {
  const [page, setPage] = useState("home");
  const [expenses, setExpenses] = useState([]);
  const [profile, setProfile] = useState(null);
  const [me, setMe] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [saveError, setSaveError] = useState("");

  const token = useMemo(() => localStorage.getItem("token"), []);

  useEffect(() => {
    if (!token) return;

    const headers = { Authorization: `Bearer ${token}` };

    Promise.all([
      fetch("/api/expenses", { headers }).then((r) => r.json()),
      fetch("/subscriptions/me", { headers }).then((r) => r.json()),
      fetch("/api/auth/me", { headers }).then((r) => r.json()),
    ])
      .then(([expensesRes, profileRes, meRes]) => {
        if (Array.isArray(expensesRes)) setExpenses(expensesRes);
        setProfile(profileRes);
        setMe(meRes);

        if (meRes?.name) {
          localStorage.setItem("userName", meRes.name);
        }
      })
      .catch(() => {
        // If API fails, keep empty state (UI still renders)
      });
  }, [token]);

  const handleAddExpense = async (expense) => {
    setSaveError("");
    try {
      const response = await fetch("/api/expenses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(expense),
      });

      if (!response.ok) {
        const errorText = await response.text();
        setSaveError(errorText || "Failed to save expense");
        return;
      }
      const saved = await response.json();
      setExpenses((prev) => [saved, ...prev]);
      setShowModal(false);
    } catch {
      setSaveError("Could not reach server while saving expense");
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/expenses/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) return;
      setExpenses((prev) => prev.filter((e) => e.id !== id));
    } catch {
      // ignore
    }
  };

  return (
    <>
      {/* Floating gradient blobs — always in background */}
      <div className="blob-container">
        <div className="blob blob-1" />
        <div className="blob blob-2" />
        <div className="blob blob-3" />
        <div className="blob blob-4" />
      </div>

      {/* Nav */}
      <Navbar
        page={page}
        onNavigate={setPage}
        userName={me?.name || localStorage.getItem("userName") || "User"}
      />

      {/* Page content */}
      {page === "home" && (
        <HomePage
          expenses={expenses}
          onNavigate={setPage}
          onAddExpense={() => setShowModal(true)}
          profile={profile}
          user={me}
        />
      )}

      {page === "expenses" && (
        <ExpensesPage
          expenses={expenses}
          onAddExpense={() => setShowModal(true)}
          onDelete={handleDelete}
        />
      )}

      {/* Add Expense Modal */}
      {showModal && (
        <>
          <AddExpenseModal
            onClose={() => setShowModal(false)}
            onSave={handleAddExpense}
          />
          {saveError && (
            <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-[1000] bg-red-600 text-white px-4 py-2 rounded-xl shadow-lg">
              {saveError}
            </div>
          )}
        </>
      )}
    </>
  );
}
