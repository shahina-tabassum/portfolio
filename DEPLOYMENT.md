# How to Deploy your Portfolio to GitHub Pages

Follow these simple steps to push your portfolio to GitHub and host it live for free!

## Prerequisites
1. Make sure you have **Git** installed on your machine.
2. Make sure you are logged into your **GitHub** account.

---

## Step 1: Initialize Git and Commit Your Files
Open your terminal (PowerShell, Command Prompt, or Git Bash), navigate to your portfolio folder, and run the following commands:

```bash
# 1. Navigate to the project folder
cd d:\java_resumeeee\personal-portfolio

# 2. Initialize a local Git repository
git init

# 3. Add all project files
git add .

# 4. Commit the files locally
git commit -m "Initial commit of my personal portfolio"

# 5. Rename the default branch to 'main'
git branch -M main
```

---

## Step 2: Create a New Repository on GitHub
1. Go to [GitHub](https://github.com/) and log in.
2. Click the **"+"** icon in the top-right corner and select **New repository**.
3. Name your repository (e.g., `personal-portfolio` or `yourusername.github.io`).
4. Keep the repository **Public** (required for free GitHub Pages hosting).
5. **Do NOT** check any options under "Initialize this repository with" (no README, .gitignore, or license).
6. Click **Create repository**.

---

## Step 3: Link Local Repository to GitHub and Push
Copy the remote repository URL from GitHub (it will look like `https://github.com/yourusername/repository-name.git`) and run the following commands:

```bash
# 1. Add your GitHub repository as the remote origin (replace with your actual URL)
git remote add origin https://github.com/yourusername/repository-name.git

# 2. Push your files to GitHub
git push -u origin main
```

---

## Step 4: Enable GitHub Pages (Free Hosting)
Once your files are pushed to GitHub:
1. Go to your repository page on GitHub.
2. Click on the **Settings** tab (the gear icon on the top nav).
3. Scroll down the left sidebar and click on **Pages**.
4. Under **Build and deployment** -> **Source**, select **Deploy from a branch**.
5. Under **Branch**, change from *None* to **main**, keep the folder as **/ (root)**, and click **Save**.

### 🎉 Your Portfolio is Live!
GitHub will take about 1-2 minutes to build the site. Refresh the page, and you will see your live URL at the top of the Settings -> Pages screen (usually `https://yourusername.github.io/repository-name/`).
