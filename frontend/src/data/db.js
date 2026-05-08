// ── Constant mock database ──────────────────────────────────────────────────
export const USER = {
  fullName: "Arjun Sharma",
  email: "arjun@spendsmart.in",
  monthlyIncome: 85000,
  savingsGoal: 30000,
  recurringExpenses: [
    { id: "r1", label: "Rent", amount: 18000 },
    { id: "r2", label: "Utilities", amount: 3500 },
    { id: "r3", label: "Internet", amount: 999 },
    { id: "r4", label: "Subscriptions", amount: 1500 },
  ],
};

export const CATEGORIES = [
  { id: "food",          name: "Food & Dining",   icon: "🍜", color: "#FF6B6B" },
  { id: "shopping",      name: "Shopping",         icon: "🛍️", color: "#4ECDC4" },
  { id: "transport",     name: "Transport",         icon: "🚗", color: "#FFE66D" },
  { id: "health",        name: "Health",            icon: "💊", color: "#FF8B94" },
  { id: "entertainment", name: "Entertainment",     icon: "🎬", color: "#A8E6CF" },
  { id: "education",     name: "Education",         icon: "📚", color: "#DDA0DD" },
  { id: "utilities",     name: "Utilities",         icon: "⚡", color: "#87CEEB" },
  { id: "travel",        name: "Travel",            icon: "✈️", color: "#F0A500" },
  { id: "gifts",         name: "Gifts",             icon: "🎁", color: "#FF9FF3" },
  { id: "misc",          name: "Misc",              icon: "📦", color: "#C8C8C8" },
];

export const INITIAL_EXPENSES = [
  {
    id: 1,
    category: { id: "food", name: "Food & Dining", icon: "🍜", color: "#FF6B6B" },
    amount: 1200,
    date: "2026-04-26",
    note: "Sunday brunch at Social",
  },
  {
    id: 2,
    category: { id: "shopping", name: "Shopping", icon: "🛍️", color: "#4ECDC4" },
    amount: 4500,
    date: "2026-04-25",
    note: "New running shoes",
  },
  {
    id: 3,
    category: { id: "transport", name: "Transport", icon: "🚗", color: "#FFE66D" },
    amount: 850,
    date: "2026-04-24",
    note: "Cab rides this week",
  },
  {
    id: 4,
    category: { id: "entertainment", name: "Entertainment", icon: "🎬", color: "#A8E6CF" },
    amount: 699,
    date: "2026-04-23",
    note: "Netflix + Prime renewal",
  },
  {
    id: 5,
    category: { id: "food", name: "Food & Dining", icon: "🍜", color: "#FF6B6B" },
    amount: 2300,
    date: "2026-04-22",
    note: "Grocery run – DMart",
  },
  {
    id: 6,
    category: { id: "health", name: "Health", icon: "💊", color: "#FF8B94" },
    amount: 1800,
    date: "2026-04-20",
    note: "Physio session",
  },
  {
    id: 7,
    category: { id: "education", name: "Education", icon: "📚", color: "#DDA0DD" },
    amount: 2999,
    date: "2026-04-18",
    note: "Udemy courses",
  },
  {
    id: 8,
    category: { id: "travel", name: "Travel", icon: "✈️", color: "#F0A500" },
    amount: 5500,
    date: "2026-04-15",
    note: "Goa trip deposit",
  },
];
