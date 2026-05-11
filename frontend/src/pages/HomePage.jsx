import React from "react";
import styles from "./HomePage.module.css";

const STAT_CARDS = (expenses, profile) => {
  const totalIncome = profile?.monthly_income ?? 0;
  const recurringTotal =
    profile?.recurring_expenses?.reduce((s, e) => s + e.amount, 0) ?? 0;
  const variableTotal = expenses.reduce((s, e) => s + e.amount, 0);
  const savings = totalIncome - recurringTotal - variableTotal;

  return [
    {
      label: "Monthly Income",
      value: `₹${totalIncome.toLocaleString("en-IN")}`,
      icon: "💰",
      gradient: "linear-gradient(135deg, #6C63FF, #8B84FF)",
      shadow: "rgba(108,99,255,0.3)",
    },
    {
      label: "Variable Expenses",
      value: `₹${variableTotal.toLocaleString("en-IN")}`,
      icon: "🧾",
      gradient: "linear-gradient(135deg, #FF6B6B, #FF8E53)",
      shadow: "rgba(255,107,107,0.3)",
    },
    {
      label: "Recurring Expenses",
      value: `₹${recurringTotal.toLocaleString("en-IN")}`,
      icon: "🔁",
      gradient: "linear-gradient(135deg, #FFB347, #FFCC02)",
      shadow: "rgba(255,179,71,0.3)",
    },
    {
      label: "Current Savings",
      value: `₹${Math.max(0, savings).toLocaleString("en-IN")}`,
      icon: "🎯",
      gradient: "linear-gradient(135deg, #43D9AD, #38B2AC)",
      shadow: "rgba(67,217,173,0.3)",
    },
  ];
};

function SavingsRing({ currentSavings, lastMonthSavings }) {
  const r = 60;
  const circ = 2 * Math.PI * r;
  const topUp = Math.max(0, currentSavings - lastMonthSavings);
  const total = Math.max(1, currentSavings);
  
  const lastMonthPct = (lastMonthSavings / total) * 100;
  const topUpPct = (topUp / total) * 100;
  
  const lastMonthDash = (lastMonthPct / 100) * circ;
  const topUpDash = (topUpPct / 100) * circ;

  return (
    <svg width="150" height="150" viewBox="0 0 150 150">
      <circle cx="75" cy="75" r={r} fill="none" stroke="rgba(108,99,255,0.1)" strokeWidth="12" />
      <circle
        cx="75"
        cy="75"
        r={r}
        fill="none"
        stroke="#38B2AC"
        strokeWidth="12"
        strokeLinecap="round"
        strokeDasharray={`${lastMonthDash} ${circ}`}
        strokeDashoffset={circ / 4}
        style={{ transition: "stroke-dasharray 1s ease" }}
      />
      <circle
        cx="75"
        cy="75"
        r={r}
        fill="none"
        stroke="#22C55E"
        strokeWidth="12"
        strokeLinecap="round"
        strokeDasharray={`${topUpDash} ${circ}`}
        strokeDashoffset={(circ / 4) - lastMonthDash}
        style={{ transition: "stroke-dasharray 1s ease" }}
      />
      <text x="75" y="70" textAnchor="middle" fill="#1A1F36" fontSize="20" fontFamily="Clash Display" fontWeight="700">
        ₹{currentSavings.toLocaleString("en-IN")}
      </text>
      <text x="75" y="90" textAnchor="middle" fill="#6B7280" fontSize="10" fontFamily="Sora">
        Total Saved
      </text>
    </svg>
  );
}

export default function HomePage({ expenses, onNavigate, onAddExpense, profile, user }) {
  const stats = STAT_CARDS(expenses, profile);
  const recurringTotal =
    profile?.recurring_expenses?.reduce((s, e) => s + e.amount, 0) ?? 0;
  const variableTotal = expenses.reduce((s, e) => s + e.amount, 0);
  const monthlyIncome = profile?.monthly_income ?? 0;
  const lastMonthSavings = profile?.last_month_savings ?? 0;

  const savings = Math.max(0, monthlyIncome - recurringTotal - variableTotal);

  // Recent 4 expenses
  const recent = expenses.slice(0, 4);

  return (
    <div className={styles.page}>
      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroText}>
          <p className={styles.greeting}>
            Good {getGreeting()}, {(user?.name || "there").split(" ")[0]} 👋
          </p>
          <h1 className={styles.heroTitle}>Your Financial <span className={styles.grad}>Overview</span></h1>
          <p className={styles.heroSub}>April 2026 · Track smarter, save better</p>
        </div>
        <button className={styles.addBtn} onClick={onAddExpense}>
          <span className={styles.addBtnIcon}>+</span> Add Expense
        </button>
      </section>

      {/* Stat cards */}
      <section className={styles.statsGrid}>
        {stats.map((s) => (
          <div key={s.label} className={styles.statCard} style={{ "--grad": s.gradient, "--sh": s.shadow }}>
            <div className={styles.statIcon}>{s.icon}</div>
            <p className={styles.statValue}>{s.value}</p>
            <p className={styles.statLabel}>{s.label}</p>
          </div>
        ))}
      </section>

      {/* Two-col: savings goal + recent */}
      <section className={styles.twoCol}>
        {/* Savings goal */}
        <div className={`glass ${styles.savingsCard}`}>
          <h3 className={styles.cardTitle}>Savings Performance</h3>
          <div className={styles.ringWrap}>
            <SavingsRing currentSavings={savings} lastMonthSavings={lastMonthSavings} />
          </div>
          <div className={styles.savingsMeta}>
            <div className={styles.metaItem}>
              <p className={styles.metaLabel}>Last Month Saved</p>
              <p className={styles.metaValue} style={{ color: "#38B2AC" }}>
                ₹{lastMonthSavings.toLocaleString("en-IN")}
              </p>
            </div>
            <div className={styles.metaDivider} />
            <div className={styles.metaItem}>
              <p className={styles.metaLabel}>Top Up</p>
              <p className={styles.metaValue} style={{ color: "#22C55E" }}>
                ₹{Math.max(0, savings - lastMonthSavings).toLocaleString("en-IN")}
              </p>
            </div>
            <div className={styles.metaDivider} />
            <div className={styles.metaItem}>
              <p className={styles.metaLabel}>Current Total</p>
              <p className={styles.metaValue}>
                ₹{savings.toLocaleString("en-IN")}
              </p>
            </div>
          </div>
        </div>

        {/* Recent transactions */}
        <div className={`glass ${styles.recentCard}`}>
          <div className={styles.recentHeader}>
            <h3 className={styles.cardTitle}>Recent Transactions</h3>
            <button className={styles.viewAll} onClick={() => onNavigate("expenses")}>
              View all →
            </button>
          </div>
          {recent.length === 0 ? (
            <div className={styles.empty}>
              <span style={{ fontSize: "2rem" }}>🧾</span>
              <p>No expenses yet</p>
            </div>
          ) : (
            <div className={styles.txList}>
              {recent.map((exp) => (
                <div key={exp.id} className={styles.txRow}>
                  <div className={styles.txIcon} style={{ background: `${exp.category.color}22` }}>
                    {exp.category.icon}
                  </div>
                  <div className={styles.txInfo}>
                    <p className={styles.txNote}>{exp.note}</p>
                    <p className={styles.txDate}>{formatDate(exp.date)}</p>
                  </div>
                  <p className={styles.txAmount}>−₹{exp.amount.toLocaleString("en-IN")}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Recurring expenses */}
      <section className={`glass ${styles.recurringSection}`}>
        <h3 className={styles.cardTitle}>Recurring Expenses</h3>
        <div className={styles.recurringGrid}>
          {(profile?.recurring_expenses || []).length === 0 ? (
            <div className={styles.empty}>
              <span style={{ fontSize: "2rem" }}>🔁</span>
              <p>No recurring expenses set yet</p>
            </div>
          ) : (
            profile.recurring_expenses.map((r, idx) => (
              <div key={`${r.category}-${idx}`} className={styles.recurringChip}>
                <p className={styles.recurLabel}>{r.category}</p>
                <p className={styles.recurAmount}>₹{r.amount.toLocaleString("en-IN")}</p>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
}

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return "Morning";
  if (h < 17) return "Afternoon";
  return "Evening";
}

function formatDate(d) {
  const date = new Date(d);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  if (date.toDateString() === today.toDateString()) return "Today";
  if (date.toDateString() === yesterday.toDateString()) return "Yesterday";
  return date.toLocaleDateString("en-IN", { month: "short", day: "numeric" });
}
