# How to Set Up .env File

## Step-by-Step Instructions

### Step 1: Copy the example file
```bash
cd chatbot-backend
cp .env.example .env
```

### Step 2: Edit the .env file

You have several options:

#### Option A: Using nano (easiest for beginners)
```bash
nano .env
```
- Use arrow keys to navigate
- Find the line: `OPENAI_API_KEY=sk-your-openai-api-key-here`
- Replace `sk-your-openai-api-key-here` with your actual API key
- Press `Ctrl+X` to exit
- Press `Y` to save
- Press `Enter` to confirm

#### Option B: Using vim
```bash
vim .env
```
- Press `i` to enter insert mode
- Find and edit the line
- Press `Esc` to exit insert mode
- Type `:wq` and press `Enter` to save and quit

#### Option C: Using echo (quick one-liner)
```bash
echo "OPENAI_API_KEY=sk-your-actual-key-here" > .env
```
⚠️ This overwrites the file, so make sure you include all other settings if needed.

#### Option D: Using a text editor (VS Code, etc.)
```bash
code .env        # VS Code
gedit .env       # GNOME Text Editor
```

### Step 3: Verify your .env file

```bash
cat .env
```

You should see:
```
OPENAI_API_KEY=sk-proj-xxxxxxxxxxxxxxxxxxxxx
```

**Important:** 
- ✅ Your API key should start with `sk-`
- ✅ No spaces around the `=`
- ✅ No quotes needed (but they won't hurt)

### Example .env file content:

```
OPENAI_API_KEY=sk-proj-abc123def456ghi789jkl012mno345pqr678stu901vwx234yz
```

### Common Mistakes:

❌ **Wrong:**
```
OPENAI_API_KEY = sk-abc123    # Spaces around =
OPENAI_API_KEY="sk-abc123"    # Quotes (optional but not needed)
OPENAI_API_KEY=sk-abc123      # Missing part of key
```

✅ **Correct:**
```
OPENAI_API_KEY=sk-proj-abc123def456ghi789jkl012mno345pqr678stu901vwx234yz
```

## Quick Command Summary:

```bash
# 1. Copy example
cp .env.example .env

# 2. Edit it (choose one method)
nano .env                    # Easiest
# OR
echo "OPENAI_API_KEY=sk-your-key" > .env    # Quick but overwrites

# 3. Verify
cat .env
```

