import React, { useState } from "react";
import { CATEGORIES } from "../data/db";
import styles from "./AddExpenseModal.module.css";

export default function AddExpenseModal({ onClose, onSave }) {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [note, setNote] = useState("");

  const handleSave = () => {
    if (!selectedCategory || !amount || isNaN(parseFloat(amount))) return;
    onSave({
      category: selectedCategory,
      amount: parseFloat(amount),
      date,
      note: note.trim() || selectedCategory.name,
    });
  };

  const isReady = selectedCategory && amount;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className={styles.header}>
          <div>
            <h2 className={styles.title}>Add Expense</h2>
            <p className={styles.sub}>Track your spending</p>
          </div>
          <button className={styles.closeBtn} onClick={onClose}>✕</button>
        </div>

        {/* Category grid */}
        <div className={styles.section}>
          <p className={styles.label}>
            Category
            {selectedCategory && (
              <span className={styles.selBadge}>{selectedCategory.name}</span>
            )}
          </p>
          <div className={styles.grid}>
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                className={`${styles.catBtn} ${selectedCategory?.id === cat.id ? styles.catActive : ""}`}
                style={selectedCategory?.id === cat.id ? { borderColor: cat.color, background: `${cat.color}18` } : {}}
                onClick={() => setSelectedCategory(cat)}
              >
                <span className={styles.catIcon}>{cat.icon}</span>
                <span className={styles.catName}>{cat.name.split(" ")[0]}</span>
                {selectedCategory?.id === cat.id && (
                  <span className={styles.check}>✓</span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Amount */}
        <div className={styles.section}>
          <p className={styles.label}>Amount</p>
          <div className={styles.amountWrap}>
            <span className={styles.rupee}>₹</span>
            <input
              className={styles.amountInput}
              type="number"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          {amount && !isNaN(parseFloat(amount)) && (
            <p className={styles.amountHint}>
              ₹{parseFloat(amount).toLocaleString("en-IN", { minimumFractionDigits: 2 })}
            </p>
          )}
        </div>

        {/* Date */}
        <div className={styles.section}>
          <p className={styles.label}>Date</p>
          <input
            className={styles.dateInput}
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        {/* Note */}
        <div className={styles.section}>
          <p className={styles.label}>Note <span className={styles.optional}>(optional)</span></p>
          <textarea
            className={styles.noteInput}
            placeholder="e.g. Groceries from BigBazaar"
            value={note}
            rows={2}
            onChange={(e) => setNote(e.target.value)}
            maxLength={100}
          />
          <p className={styles.charCount}>{note.length}/100</p>
        </div>

        {/* Footer */}
        <button
          className={`${styles.saveBtn} ${isReady ? styles.saveBtnReady : ""}`}
          onClick={handleSave}
          disabled={!isReady}
        >
          Save Expense
        </button>
        {!isReady && <p className={styles.reqHint}>Select a category and enter an amount</p>}
      </div>
    </div>
  );
}
