# 🤝 Contributing Guide (Beginner Friendly)

Welcome to the Expense Tracker project!

This guide explains **step-by-step how to contribute**, even if you are new to Git and GitHub.

---

# 🧠 CORE IDEA (VERY IMPORTANT)

We NEVER work directly on the `main` branch.

Instead:
- Each person creates their own branch
- Works on that branch
- Then merges into `main`

👉 Think:
- `main` = final stable project
- `your branch` = your personal workspace

---

# 🚨 RULES (FOLLOW STRICTLY)

❌ Do NOT push directly to `main`  
❌ Do NOT overwrite others’ code  
❌ Do NOT commit without testing  

✅ Always create a new branch  
✅ Always pull latest code before starting  
✅ Always use meaningful commit messages  

---

# 🚀 COMPLETE WORKFLOW (STEP BY STEP)

---

## 🔹 STEP 1: Open project in terminal

```bash
cd expense-tracker

## 🔹 STEP 2: Switch to main branch
```bash
git checkout main
##🔹 STEP 3: Pull latest code
```bash
git pull origin main
👉 This ensures your code is up-to-date.

##🔹 STEP 4: Create your own branch
```bash
git checkout -b ticket-1-your-feature-name

Examples:

ticket-1-hero-ui

ticket-2-expense-dashboard

ticket-3-api-integration

##🔹 STEP 5: Do your work
Now you can:

Edit files

Add features

Fix bugs

##🔹 STEP 6: Stage your changes
```bash
git add .
##🔹 STEP 7: Commit your work
```Bash
git commit -m "Added expense dashboard UI"
##🔹 STEP 8: Push your branch
```Bash
git push origin ticket-1-your-feature-name
##🔹 STEP 9: Create Pull Request (PR)
On GitHub:

Go to repository

Click Compare & Pull Request

Add description

##🔹 STEP 10: Handle Merge Conflicts (if any)
```Bash
git checkout main
git pull origin main
git checkout ticket-1-your-feature-name
git merge main

If you see this:

Plaintext
<<<<<<< HEAD
your code
=======
other code
>>>>>>> main
👉 Fix manually, then:

```Bash
git add .
git commit -m "Resolved merge conflicts"
git push

##🔹 STEP 11: Merge Pull Request
Click Merge

Confirm merge

##🔹 STEP 12: Delete your branch

```Bash
git branch -d ticket-1-your-feature-name
git push origin --delete ticket-1-your-feature-name
🔁 DAILY WORKFLOW
```Bash
git checkout main
git pull origin main
git checkout -b new-feature

🧪 COMMON ERRORS
❌ Push rejected

```Bash
git pull origin main
git push
❌ Forgot branch

```Bash
git checkout -b fix-branch
📌 PROJECT NOTES
React version must be 18

Tailwind CSS v4 is used

Do not change dependencies without discussion

🎯 SUMMARY
Pull → Branch → Work → Commit → Push → PR → Merge → Delete

💡 FINAL TIP
If confused → ask before pushing

Do NOT break main
