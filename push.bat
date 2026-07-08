@echo off
title Push Portfolio to GitHub
echo ====================================================
echo      Deploying Portfolio to GitHub Repository
echo ====================================================
echo.

:: Check if git is installed
where git >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERROR] Git is not installed or not in your PATH.
    echo Please install Git from https://git-scm.com/ and try again.
    pause
    exit /b
)

:: Navigate to script directory
cd /d "%~dp0"

:: Initialize Git if not already initialized
if not exist ".git" (
    echo [1/4] Initializing Git repository...
    git init
    git branch -M main
) else (
    echo [1/4] Git repository already initialized.
)

:: Stage and commit all files
echo [2/4] Staging and committing files...
git add .
git commit -m "Deploy personal portfolio"

:: Get GitHub URL from user
echo.
echo Please enter your GitHub Repository HTTPS URL.
echo (Example: https://github.com/yourusername/personal-portfolio.git)
set /p REPO_URL="URL: "

if "%REPO_URL%"=="" (
    echo [ERROR] Repository URL cannot be empty.
    pause
    exit /b
)

:: Configure remote origin
echo.
echo [3/4] Configuring remote origin...
git remote remove origin >nul 2>nul
git remote add origin %REPO_URL%

:: Push to GitHub main branch
echo.
echo [4/4] Pushing files to GitHub...
echo (You may be prompted by Git to log in to GitHub in a popup window)
echo.
git push -u origin main

if %errorlevel% eq 0 (
    echo.
    echo ====================================================
    echo [SUCCESS] Your portfolio has been pushed to GitHub!
    echo ====================================================
    echo.
    echo Next Steps:
    echo 1. Go to your repository settings on github.com
    echo 2. Go to 'Pages' in the left sidebar
    echo 3. Select 'main' branch, click Save
    echo 4. Your portfolio will be live shortly!
) else (
    echo.
    echo [ERROR] Push failed. Please check your URL and internet connection.
)

echo.
pause
