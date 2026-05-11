import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./ProfilePage.module.css";

export default function ProfilePage() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [me, setMe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [saveSuccess, setSaveSuccess] = useState(false);

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    Promise.all([
      fetch("/subscriptions/me", { headers: { Authorization: `Bearer ${token}` } }).then(r => r.json()),
      fetch("/api/auth/me", { headers: { Authorization: `Bearer ${token}` } }).then(r => r.json()),
    ])
      .then(([profileRes, meRes]) => {
        setProfile(profileRes);
        setMe(meRes);
        setFormData({
          monthly_income: profileRes.monthly_income || 0,
          target_saving: profileRes.target_saving || 0,
          last_month_savings: profileRes.last_month_savings || 0,
          recurring_expenses: profileRes.recurring_expenses || [],
        });
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [token, navigate]);

  const handleSave = async () => {
    try {
      console.log("Saving data:", {
        monthly_salary: formData.monthly_income,
        expected_savings: formData.target_saving,
        last_month_savings: formData.last_month_savings,
        subscriptions: formData.recurring_expenses,
      });
      const response = await fetch("/subscriptions/setup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          monthly_salary: formData.monthly_income,
          expected_savings: formData.target_saving,
          last_month_savings: formData.last_month_savings,
          subscriptions: formData.recurring_expenses,
        }),
      });
      console.log("Response status:", response.status);
      if (response.ok) {
        setProfile(prev => ({ ...prev, ...formData }));
        setEditing(false);
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 2000);
      } else {
        const errorText = await response.text();
        console.error("Save failed:", errorText);
        alert(`Failed to save changes: ${errorText}`);
      }
    } catch (e) {
      console.error("Save error:", e);
      alert("Failed to save changes: " + e.message);
    }
  };

  const handleDeleteAccount = async () => {
    if (!window.confirm("Are you sure you want to delete your account? This cannot be undone.")) {
      return;
    }
    try {
      await fetch(`/api/auth/delete`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      localStorage.clear();
      navigate("/login");
    } catch (e) {
      alert("Failed to delete account");
    }
  };

  const handleRecurringChange = (idx, field, value) => {
    const updated = [...formData.recurring_expenses];
    updated[idx] = { ...updated[idx], [field]: field === "amount" ? Number(value) : value };
    setFormData({ ...formData, recurring_expenses: updated });
  };

  const addRecurring = () => {
    setFormData({
      ...formData,
      recurring_expenses: [...formData.recurring_expenses, { category: "", amount: 0 }],
    });
  };

  const removeRecurring = (idx) => {
    setFormData({
      ...formData,
      recurring_expenses: formData.recurring_expenses.filter((_, i) => i !== idx),
    });
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    navigate("/login", { replace: true });
  };

  if (loading) return <div className={styles.loading}>Loading...</div>;

  return (
    <div className={styles.page}>
      <div className="blob-container">
        <div className="blob blob-1" />
        <div className="blob blob-2" />
        <div className="blob blob-3" />
      </div>

      <div className={styles.card}>
        <div className={styles.headerRow}>
          <h1 className={styles.title}>Profile Settings</h1>
          <button onClick={() => navigate("/dashboard")} className={styles.homeBtn}>
            ← Home
          </button>
        </div>

        {saveSuccess && (
          <div className={styles.successMsg}>Changes saved successfully!</div>
        )}

        <div className={styles.section}>
          <p className={styles.label}>Name</p>
          <p className={styles.value}>{me?.name || "N/A"}</p>
        </div>

        <div className={styles.section}>
          <p className={styles.label}>Email</p>
          <p className={styles.value}>{me?.email || "N/A"}</p>
        </div>

        <div className={styles.grid}>
          <div className={styles.inputGroup}>
            <label className={styles.label}>Monthly Income</label>
            <input
              type="number"
              value={formData.monthly_income || ""}
              onChange={(e) => setFormData({ ...formData, monthly_income: Number(e.target.value) })}
              disabled={!editing}
              className={styles.input}
            />
          </div>
          <div className={styles.inputGroup}>
            <label className={styles.label}>Monthly Target Saving</label>
            <input
              type="number"
              value={formData.target_saving || ""}
              onChange={(e) => setFormData({ ...formData, target_saving: Number(e.target.value) })}
              disabled={!editing}
              className={styles.input}
            />
          </div>
          <div className={styles.inputGroup}>
            <label className={styles.label}>Last Month Savings</label>
            <input
              type="number"
              value={formData.last_month_savings || ""}
              onChange={(e) => setFormData({ ...formData, last_month_savings: Number(e.target.value) })}
              disabled={!editing}
              className={styles.input}
            />
          </div>
        </div>

        <div className={styles.recurringSection}>
          <p className={styles.label}>Recurring Expenses</p>
          {formData.recurring_expenses.map((r, idx) => (
            <div key={idx} className={styles.recurringRow}>
              <input
                type="text"
                placeholder="Category"
                value={r.category}
                onChange={(e) => handleRecurringChange(idx, "category", e.target.value)}
                disabled={!editing}
                className={styles.input}
              />
              <input
                type="number"
                placeholder="Amount"
                value={r.amount}
                onChange={(e) => handleRecurringChange(idx, "amount", e.target.value)}
                disabled={!editing}
                className={styles.input}
              />
              {editing && (
                <button
                  onClick={() => removeRecurring(idx)}
                  className={styles.removeBtn}
                >
                  ✕
                </button>
              )}
            </div>
          ))}
          {editing && (
            <button onClick={addRecurring} className={styles.addBtn}>
              + Add Recurring Expense
            </button>
          )}
        </div>

        <div className={styles.actions}>
          {editing ? (
            <>
              <button onClick={handleSave} className={styles.saveBtn}>Save Changes</button>
              <button onClick={() => setEditing(false)} className={styles.cancelBtn}>Cancel</button>
            </>
          ) : (
            <button onClick={() => setEditing(true)} className={styles.editBtn}>Edit Profile</button>
          )}
        </div>

        <div className={styles.bottomActions}>
          <button onClick={handleLogout} className={styles.logoutBtn}>Logout</button>
          <button onClick={handleDeleteAccount} className={styles.deleteBtn}>Delete Account</button>
        </div>
      </div>
    </div>
  );
}
