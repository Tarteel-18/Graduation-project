# 🪟 Complete Windows Setup Guide - For Absolute Beginners

This guide will walk you through setting up the entire project on a Windows machine, step by step. **No prior experience needed!**

---

## 📋 Table of Contents

1. [Prerequisites - What You Need](#prerequisites)
2. [Step 1: Install Required Software](#step-1-install-required-software)
3. [Step 2: Clone the Repository](#step-2-clone-the-repository)
4. [Step 3: Set Up the Backend (Python)](#step-3-set-up-the-backend-python)
5. [Step 4: Set Up the Frontend (Node.js)](#step-4-set-up-the-frontend-nodejs)
6. [Step 5: Get Your OpenAI API Key](#step-5-get-your-openai-api-key)
7. [Step 6: Run the Application](#step-6-run-the-application)
8. [Troubleshooting](#troubleshooting)

## ✨ Good News: 100% Cloud-Based Setup!

**This project uses cloud-based AI models by default - NO local model downloads needed!** This means:
- ✅ **Zero large model downloads** (saves gigabytes of disk space)
- ✅ **Faster setup** (2-5 minutes vs 30+ minutes with local models)
- ✅ **Easier for beginners** (just install Python packages, add API key, done!)
- ✅ **Better performance** (cloud models are optimized and always up-to-date)
- ✅ **No GPU needed** (everything runs in the cloud)

**What you need:**
- Just your OpenAI API key (we'll get this in Step 5)
- Everything else runs in the cloud - no model downloads, no GPU, no hassle!

**Default configuration:**
- ✅ Cloud embeddings (OpenAI API) - no local models
- ✅ Cloud LLM (GPT-4o) - no local models  
- ✅ Reranking disabled (optional, not needed for good results) - no local models

---

## 📦 Prerequisites

Before starting, you need:

1. **A Windows computer** (Windows 10 or 11)
2. **VS Code** (or any code editor) - [Download here](https://code.visualstudio.com/)
3. **Git** - [Download here](https://git-scm.com/download/win)
4. **An internet connection**
5. **An OpenAI API key** (we'll get this later)

---

## Step 1: Install Required Software

### 1.1 Install Git

1. Download Git from: https://git-scm.com/download/win
2. Run the installer
3. **Important:** During installation, choose these options:
   - ✅ "Use Visual Studio Code as Git's default editor" (if you have VS Code)
   - ✅ "Git from the command line and also from 3rd-party software"
   - ✅ "Use the OpenSSL library"
   - ✅ "Checkout Windows-style, commit Unix-style line endings"
4. Click "Next" through the rest (defaults are fine)
5. Click "Install"
6. **Restart your computer** after installation

**Verify installation:**
- Press `Windows Key + R`
- Type `cmd` and press Enter
- Type: `git --version`
- You should see something like: `git version 2.xx.x`

### 1.2 Install Python

1. Download Python from: https://www.python.org/downloads/
2. **IMPORTANT:** Check ✅ "Add Python to PATH" during installation
3. Click "Install Now"
4. Wait for installation to complete

**Verify installation:**
- Open Command Prompt (cmd)
- Type: `python --version`
- You should see: `Python 3.x.x`
- Also type: `pip --version`
- You should see: `pip 23.x.x`

### 1.3 Install Node.js

1. Download Node.js from: https://nodejs.org/
2. Choose the **LTS version** (recommended)
3. Run the installer
4. Click "Next" through all steps (defaults are fine)
5. Click "Install"

**Verify installation:**
- Open Command Prompt (cmd)
- Type: `node --version`
- You should see: `v20.x.x` or higher
- Type: `npm --version`
- You should see: `10.x.x` or higher

**⚠️ Important:** You need Node.js version **20.19+ or 22.12+** for this project. If you have an older version, download the latest LTS from the link above.

### 1.4 Install VS Code (Optional but Recommended)

1. Download VS Code from: https://code.visualstudio.com/
2. Run the installer
3. Check ✅ "Add to PATH" during installation
4. Click "Install"

---

## Step 2: Clone the Repository

### 2.1 Open VS Code (or Command Prompt)

**Option A: Using VS Code (Recommended)**
1. Open VS Code
2. Press `Ctrl + Shift + P` (or `Cmd + Shift + P` on Mac)
3. Type: `Git: Clone`
4. Enter the repository URL: `https://github.com/Tarteel-18/Graduation-project.git`
5. Choose a folder to save the project (e.g., `C:\Users\YourName\Documents\Graduation-project`)
6. Click "Open" when asked

**Option B: Using Command Prompt**
1. Open Command Prompt (cmd)
2. Navigate to where you want the project:
   ```cmd
   cd C:\Users\YourName\Documents
   ```
3. Clone the repository:
   ```cmd
   git clone https://github.com/Tarteel-18/Graduation-project.git
   ```
4. Navigate into the project:
   ```cmd
   cd Graduation-project
   ```

### 2.2 Switch to the Correct Branch

In VS Code Terminal or Command Prompt:

```cmd
git checkout feature/chatbot-backend
```

You should see: `Switched to branch 'feature/chatbot-backend'`

---

## Step 3: Set Up the Backend (Python)

### 3.1 Open Terminal in VS Code

- Press `` Ctrl + ` `` (backtick key, above Tab)
- Or go to: Terminal → New Terminal

### 3.2 Navigate to Backend Folder

```cmd
cd chatbot-backend
```

### 3.3 Create a Virtual Environment

A virtual environment keeps Python packages isolated for this project.

```cmd
python -m venv venv
```

Wait a few seconds. You should see a new `venv` folder appear.

### 3.4 Activate the Virtual Environment

**On Windows Command Prompt:**
```cmd
venv\Scripts\activate
```

**On Windows PowerShell:**
```powershell
venv\Scripts\Activate.ps1
```

If PowerShell gives an error about execution policy, run:
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

**You'll know it's activated when you see `(venv)` at the start of your command line!**

Example:
```
(venv) C:\Users\YourName\Documents\Graduation-project\chatbot-backend>
```

### 3.5 Install Python Dependencies

```cmd
pip install -r requirements.txt
```

**This will take 2-5 minutes** - it's downloading packages. You'll see progress bars.

**✅ Great news:** The project uses **100% cloud-based AI models by default**:
- ✅ **No large model downloads** - everything runs in the cloud via OpenAI API
- ✅ **Saves gigabytes of disk space** - no local AI models needed
- ✅ **Faster setup** - just install Python packages, no model downloads
- ✅ **Works immediately** - just add your OpenAI API key

**Common issues:**
- If you get "pip is not recognized": Make sure Python was added to PATH during installation
- If download is slow: This is normal, just wait
- If you see warnings about sentence-transformers: That's fine - it's completely optional and not needed for the default setup

### 3.6 Create Environment File

```cmd
copy .env.example .env
```

(If `.env.example` doesn't exist, that's okay - we'll create `.env` manually)

### 3.7 Edit the .env File

1. In VS Code, open the `chatbot-backend` folder
2. Look for `.env` file (if it doesn't exist, create a new file named `.env`)
3. Add this line (we'll get the API key in Step 5):

```
OPENAI_API_KEY=your-api-key-here
```

**Save the file** (`Ctrl + S`)

---

## Step 4: Set Up the Frontend (Node.js)

### 4.1 Open a NEW Terminal

**Important:** Keep the backend terminal open, but open a **NEW terminal** for the frontend.

In VS Code:
- Click the `+` button next to the terminal tab
- Or press `` Ctrl + Shift + ` ``

### 4.2 Navigate to Project Root

```cmd
cd ..
```

(This goes back to the main project folder)

### 4.3 Install Frontend Dependencies

```cmd
npm install
```

**This will take 2-5 minutes** - downloading Node.js packages.

**Common issues:**
- If you get "npm is not recognized": Make sure Node.js was installed correctly
- If it's slow: Normal, just wait

---

## Step 5: Get Your OpenAI API Key

### 5.1 Create an OpenAI Account

1. Go to: https://platform.openai.com/
2. Click "Sign up" (or "Log in" if you have an account)
3. Complete the registration

### 5.2 Get Your API Key

1. Once logged in, go to: https://platform.openai.com/api-keys
2. Click "Create new secret key"
3. Give it a name (e.g., "Graduation Project")
4. **IMPORTANT:** Copy the key immediately - you won't see it again!
5. It should look like: `sk-proj-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`

### 5.3 Add API Key to .env File

1. Open `chatbot-backend\.env` file in VS Code
2. Replace `your-api-key-here` with your actual API key:

```
OPENAI_API_KEY=sk-proj-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

3. **Save the file** (`Ctrl + S`)

**⚠️ Security Note:** Never share your API key or commit it to Git!

---

## Step 6: Run the Application

**You need TWO terminals running at the same time!**

### 6.1 Start the Backend Server

**Terminal 1 (Backend):**

1. Make sure you're in the `chatbot-backend` folder:
   ```cmd
   cd chatbot-backend
   ```

2. Make sure virtual environment is activated (you should see `(venv)`):
   ```cmd
   venv\Scripts\activate
   ```

3. Start the backend server:
   ```cmd
   python -m app.main
   ```

4. **Wait for this message:**
   ```
   INFO:     Uvicorn running on http://0.0.0.0:8001
   INFO:     Application startup complete.
   ```

5. **Keep this terminal open!** Don't close it.

**If you see errors:**
- "Module not found": Make sure virtual environment is activated and you ran `pip install -r requirements.txt`
- "Port 8001 already in use": See Troubleshooting section

### 6.2 Start the Frontend Server

**Terminal 2 (Frontend) - NEW TERMINAL:**

1. Navigate to project root:
   ```cmd
   cd C:\Users\YourName\Documents\Graduation-project
   ```
   (Or wherever you cloned the project)

2. Start the frontend:
   ```cmd
   npm run dev
   ```

3. **Wait for this message:**
   ```
   ➜  Local:   http://localhost:5173/
   ➜  Network: use --host to expose
   ```

4. **Keep this terminal open too!**

### 6.3 Open the Application

1. Open your web browser (Chrome, Edge, Firefox, etc.)
2. Go to: **http://localhost:5173**
3. You should see the website!

### 6.4 Use the Chatbot

1. Look for a **chat icon** in the bottom-left corner of the page
2. Click it to open the chat widget
3. Type a question in Arabic (e.g., "ما هي الخدمات المتوفرة؟")
4. Press Enter or click the send button
5. Wait for the response!

**🎉 Congratulations! Everything should be working now!**

---

## 🔧 Troubleshooting

### Problem: "Port 8001 already in use" (Backend)

**Solution:**
1. Find what's using the port:
   ```cmd
   netstat -ano | findstr :8001
   ```
2. Note the PID (last number)
3. Kill the process:
   ```cmd
   taskkill /PID <PID_NUMBER> /F
   ```
4. Or change the port in `chatbot-backend\app\config.py`:
   ```python
   PORT: int = 8002  # Change to 8002 or any other port
   ```

### Problem: "Port 5173 already in use" (Frontend)

**Solution:**
- Vite will automatically use the next available port (5174, 5175, etc.)
- Check the terminal output for the actual port number
- Or specify a port:
  ```cmd
  npm run dev -- --port 3000
  ```

### Problem: "python is not recognized"

**Solution:**
1. Reinstall Python and make sure ✅ "Add Python to PATH" is checked
2. Or use `py` instead of `python`:
   ```cmd
   py -m venv venv
   py -m app.main
   ```

### Problem: "npm is not recognized"

**Solution:**
1. Reinstall Node.js
2. Restart your computer
3. Open a NEW Command Prompt and try again

### Problem: Backend says "OpenAI API key not found"

**Solution:**
1. Make sure `.env` file exists in `chatbot-backend` folder
2. Check the file has: `OPENAI_API_KEY=sk-proj-...`
3. Make sure there are no spaces around the `=` sign
4. Restart the backend server

### Problem: Chatbot doesn't respond / "Connection error"

**Solution:**
1. Make sure **both** terminals are running (backend AND frontend)
2. Check backend terminal shows: `Uvicorn running on http://0.0.0.0:8001`
3. Check frontend terminal shows: `Local: http://localhost:5173`
4. Try refreshing the browser page
5. Check browser console (F12 → Console tab) for errors

### Problem: "Module not found" errors in Python

**Solution:**
1. Make sure virtual environment is activated (`(venv)` should appear)
2. Reinstall dependencies:
   ```cmd
   pip install -r requirements.txt
   ```

### Problem: Frontend shows blank page

**Solution:**
1. Check browser console (F12 → Console tab) for errors
2. Make sure frontend server is running
3. Try clearing browser cache: `Ctrl + Shift + Delete`
4. Try a different browser

### Problem: "Embedding dimension mismatch" error

**Error message:** `Embedding dimension 1536 does not match collection dimensionality 768`

**Solution:**
This happens when you switch between different embedding models (e.g., from local to cloud, or between different cloud models). The vector database needs to be recreated with the new dimensions.

**Fix:**

1. Stop the backend server (press `Ctrl + C` in the backend terminal)

2. Delete the vector database:
   ```cmd
   cd chatbot-backend
   rmdir /s /q vector_db
   ```

3. Restart the backend server:
   ```cmd
   python -m app.main
   ```

4. The server will automatically recreate the vector database with the correct dimensions and reload your FAQ documents.

**Note:** This is normal when switching embedding models. The vector database will be automatically rebuilt with the correct dimensions.

---

## 📝 Quick Reference Commands

### Backend Commands

```cmd
# Navigate to backend
cd chatbot-backend

# Activate virtual environment
venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run server
python -m app.main
```

### Frontend Commands

```cmd
# Navigate to project root
cd C:\Users\YourName\Documents\Graduation-project

# Install dependencies
npm install

# Run development server
npm run dev
```

---

## 🎯 What Each Part Does

- **Backend (Python)**: Handles the chatbot logic, connects to OpenAI, searches documents
- **Frontend (Vue.js)**: The website you see in the browser, the chat widget UI
- **OpenAI API**: Provides the AI language model that generates responses
- **Vector Database**: Stores document embeddings for fast search

---

## ✅ Checklist

Before asking for help, make sure:

- [ ] Git is installed (`git --version` works)
- [ ] Python is installed (`python --version` works)
- [ ] Node.js is installed (`node --version` works)
- [ ] Project is cloned
- [ ] On correct branch (`feature/chatbot-backend`)
- [ ] Backend virtual environment is created and activated
- [ ] Backend dependencies installed (`pip install -r requirements.txt`)
- [ ] Frontend dependencies installed (`npm install`)
- [ ] `.env` file exists with valid OpenAI API key
- [ ] Backend server is running (Terminal 1)
- [ ] Frontend server is running (Terminal 2)
- [ ] Both terminals show "running" messages
- [ ] Browser is open to `http://localhost:5173`

---

## 🆘 Still Having Issues?

1. **Check the terminal output** - errors usually appear there
2. **Check browser console** - Press F12 → Console tab
3. **Make sure both servers are running** - You need TWO terminals
4. **Restart everything** - Close terminals, restart VS Code, try again
5. **Check file paths** - Make sure you're in the correct folders

---

## 📚 Additional Resources

- **VS Code Git Tutorial**: https://code.visualstudio.com/docs/sourcecontrol/intro-to-git
- **Python Virtual Environments**: https://docs.python.org/3/tutorial/venv.html
- **Node.js Documentation**: https://nodejs.org/docs
- **OpenAI API Docs**: https://platform.openai.com/docs

---

**Good luck! You've got this! 🚀**

