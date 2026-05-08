import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css";

export default function Navbar({ page, onNavigate, userName }) {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const initials = userName
    ? userName.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2)
    : "AS";

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    localStorage.removeItem("pendingFinanceSetup");
    setMenuOpen(false);
    navigate("/login", { replace: true });
  };

  return (
    <nav className={styles.nav}>
      <div className={styles.inner}>
        {/* Logo */}
        <div className={styles.logo} onClick={() => onNavigate("home")}>
          <span className={styles.logoIcon}>💸</span>
          <span className={styles.logoText}>SpendSmart</span>
        </div>

        {/* Nav links */}
        <div className={styles.links}>
          <button
            className={`${styles.link} ${page === "home" ? styles.active : ""}`}
            onClick={() => onNavigate("home")}
          >
            Home
          </button>
          <button
            className={`${styles.link} ${page === "expenses" ? styles.active : ""}`}
            onClick={() => onNavigate("expenses")}
          >
            Expenses
          </button>
        </div>

        {/* Avatar */}
        <div className={styles.avatarWrap} ref={menuRef}>
          <button
            type="button"
            className={styles.avatar}
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Open profile menu"
          >
            {initials}
          </button>

          {menuOpen && (
            <div className={styles.menu}>
              <button
                type="button"
                className={styles.menuItem}
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
