import React, { useState } from "react";
import styles from "./ExpensesPage.module.css";

const FILTERS = ["All", "This Week", "Food & Dining", "Shopping", "Transport", "Health", "Entertainment"];

function formatDate(d) {
  const date = new Date(d);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  if (date.toDateString() === today.toDateString()) return "Today";
  if (date.toDateString() === yesterday.toDateString()) return "Yesterday";
  return date.toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" });
}

function groupByDate(list) {
  const groups = {};
  list.forEach((exp) => {
    const label = formatDate(exp.date);
    if (!groups[label]) groups[label] = [];
    groups[label].push(exp);
  });
  return groups;
}

export default function ExpensesPage({ expenses, onAddExpense, onDelete }) {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  // Category breakdown
  const catTotals = {};
  expenses.forEach((e) => {
    catTotals[e.category.name] = catTotals[e.category.name] || { ...e.category, total: 0, count: 0 };
    catTotals[e.category.name].total += e.amount;
    catTotals[e.category.name].count += 1;
  });
  const catData = Object.values(catTotals).sort((a, b) => b.total - a.total);
  const totalExpenses = expenses.reduce((s, e) => s + e.amount, 0);
  const maxCat = catData[0]?.total || 1;

  // Filter expenses
  const filtered = expenses.filter((e) => {
    const matchSearch =
      e.note.toLowerCase().includes(search.toLowerCase()) ||
      e.category.name.toLowerCase().includes(search.toLowerCase());

    let matchFilter = true;
    if (filter === "This Week") {
      const d = new Date(e.date);
      const week = new Date();
      week.setDate(week.getDate() - 7);
      matchFilter = d >= week;
    } else if (filter !== "All") {
      matchFilter = e.category.name.toLowerCase().includes(filter.toLowerCase());
    }
    return matchSearch && matchFilter;
  });

  const grouped = groupByDate(filtered);

  return (
    <div className={styles.page}>
      {/* Page Header */}
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.title}>Expenses <span className={styles.grad}>Dashboard</span></h1>
          <p className={styles.sub}>Detailed spending breakdown · April 2026</p>
        </div>
        <button className={styles.addBtn} onClick={onAddExpense}>
          <span>+</span> Add Expense
        </button>
      </div>

      {/* Summary row */}
      <div className={styles.summaryRow}>
        <div className={`glass-sm ${styles.summChip}`} style={{ "--c": "#6C63FF" }}>
          <p className={styles.summLabel}>Total Spent</p>
          <p className={styles.summValue}>₹{totalExpenses.toLocaleString("en-IN")}</p>
        </div>
        <div className={`glass-sm ${styles.summChip}`} style={{ "--c": "#43D9AD" }}>
          <p className={styles.summLabel}>Categories</p>
          <p className={styles.summValue}>{catData.length}</p>
        </div>
        <div className={`glass-sm ${styles.summChip}`} style={{ "--c": "#FF6B6B" }}>
          <p className={styles.summLabel}>Transactions</p>
          <p className={styles.summValue}>{expenses.length}</p>
        </div>
        <div className={`glass-sm ${styles.summChip}`} style={{ "--c": "#FFB347" }}>
          <p className={styles.summLabel}>Avg / Transaction</p>
          <p className={styles.summValue}>
            ₹{expenses.length ? Math.round(totalExpenses / expenses.length).toLocaleString("en-IN") : 0}
          </p>
        </div>
      </div>

      {/* Two-column layout */}
      <div className={styles.twoCol}>
        {/* Category breakdown */}
        <div className={`glass ${styles.catCard}`}>
          <h3 className={styles.cardTitle}>Category Breakdown</h3>
          {catData.length === 0 ? (
            <div className={styles.empty}>
              <span>📊</span>
              <p>No expenses yet. Start tracking!</p>
            </div>
          ) : (
            <div className={styles.catList}>
              {catData.map((cat) => {
                const pct = ((cat.total / totalExpenses) * 100).toFixed(1);
                const barPct = (cat.total / maxCat) * 100;
                return (
                  <div key={cat.name} className={styles.catRow}>
                    <div className={styles.catLeft}>
                      <div className={styles.catIcon} style={{ background: `${cat.color}22` }}>
                        {cat.icon}
                      </div>
                      <div>
                        <p className={styles.catName}>{cat.name}</p>
                        <p className={styles.catCount}>{cat.count} transaction{cat.count !== 1 ? "s" : ""}</p>
                      </div>
                    </div>
                    <div className={styles.catRight}>
                      <p className={styles.catAmount}>₹{cat.total.toLocaleString("en-IN")}</p>
                      <p className={styles.catPct} style={{ color: cat.color }}>{pct}%</p>
                    </div>
                    <div className={styles.barWrap}>
                      <div
                        className={styles.bar}
                        style={{ width: `${barPct}%`, background: cat.color }}
                      />
                    </div>
                  </div>
                );
              })}
              {/* Total row */}
              <div className={styles.totalRow}>
                <span>Total</span>
                <span>₹{totalExpenses.toLocaleString("en-IN")}</span>
              </div>
            </div>
          )}
        </div>

        {/* Spending bar chart */}
        <div className={`glass ${styles.chartCard}`}>
          <h3 className={styles.cardTitle}>Spending by Category</h3>
          {catData.length === 0 ? (
            <div className={styles.empty}>
              <span>📈</span>
              <p>No data yet</p>
            </div>
          ) : (
            <div className={styles.barChart}>
              {catData.map((cat) => {
                const pct = (cat.total / maxCat) * 100;
                return (
                  <div key={cat.name} className={styles.barGroup}>
                    <div className={styles.barColWrap}>
                      <p className={styles.barLabel}>₹{(cat.total / 1000).toFixed(1)}k</p>
                      <div className={styles.barCol}>
                        <div
                          className={styles.barFill}
                          style={{ height: `${pct}%`, background: cat.color }}
                        />
                      </div>
                    </div>
                    <p className={styles.barCatIcon}>{cat.icon}</p>
                    <p className={styles.barCatName}>{cat.name.split(" ")[0]}</p>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Transaction list */}
      <div className={`glass ${styles.txSection}`}>
        {/* Search + filters */}
        <div className={styles.txHeader}>
          <h3 className={styles.cardTitle}>All Transactions</h3>
          <div className={styles.searchWrap}>
            <span className={styles.searchIcon}>🔍</span>
            <input
              className={styles.searchInput}
              placeholder="Search expenses..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className={styles.filterRow}>
          {FILTERS.map((f) => (
            <button
              key={f}
              className={`${styles.filterChip} ${filter === f ? styles.filterActive : ""}`}
              onClick={() => setFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className={styles.empty} style={{ padding: "40px" }}>
            <span>🔍</span>
            <p>No expenses match your search</p>
          </div>
        ) : (
          Object.entries(grouped).map(([dateLabel, list]) => (
            <div key={dateLabel} className={styles.dateGroup}>
              <p className={styles.dateLabel}>{dateLabel}</p>
              <div className={styles.txList}>
                {list.map((exp) => (
                  <div key={exp.id} className={styles.txRow}>
                    <div className={styles.txIcon} style={{ background: `${exp.category.color}22` }}>
                      {exp.category.icon}
                    </div>
                    <div className={styles.txInfo}>
                      <p className={styles.txNote}>{exp.note}</p>
                      <span
                        className={styles.txCatBadge}
                        style={{ color: exp.category.color, background: `${exp.category.color}18`, border: `1px solid ${exp.category.color}44` }}
                      >
                        {exp.category.name}
                      </span>
                    </div>
                    <div className={styles.txRight}>
                      <p className={styles.txAmount}>−₹{exp.amount.toLocaleString("en-IN")}</p>
                      <button
                        className={styles.deleteBtn}
                        onClick={() => onDelete(exp.id)}
                        title="Delete"
                      >
                        🗑
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
