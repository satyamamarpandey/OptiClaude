# OptiClaude

A clean, practical, and beginner-friendly global Claude Code setup for Windows.

OptiClaude helps you set up Claude Code once and reuse that setup across:

- your current projects
- your future projects
- your future Claude Code sessions

This repository is intentionally structured to be simple:

- `settings.json` for global Claude Code settings
- `CLAUDE.md` for reusable global instructions
- `helpers/` for optional hook helpers
- `templates/` for reusable task templates
- `templates/data/` for example data files used by the templates

The goal of this README is simple:

**make setup easy enough that a brand new user can install it without guessing**

---

## Repository contents

```text
OptiClaude/
├── helpers/
│   ├── auto-memory-hook.mjs
│   └── hook-handler.cjs
├── templates/
│   ├── data/
│   ├── bugfix-task.md
│   ├── code-review.md
│   ├── docs-update.md
│   ├── feature-request.md
│   ├── project-kickoff.md
│   ├── prompt-improve.md
│   ├── refactor-task.md
│   ├── release-checklist.md
│   └── test-plan.md
├── CLAUDE.md
├── LICENSE
├── README.md
└── settings.json
```

---

## What this setup gives you

### Core global setup
- global `settings.json`
- global `CLAUDE.md`
- global Claude rules from Everything Claude Code
- optional helper scripts copied into your user Claude folder
- optional templates copied into your user Claude folder

### Optional extras
- Ruflo MCP
- Prompt Improver plugin
- Code Review Graph plugin
- Taskmaster AI MCP
- Claude Mem plugin
- Document Skills plugin

---

## What “global” means here

This setup uses your **user-level Claude folder**:

```text
%USERPROFILE%\.claude
```

That means the main files live here:

- `%USERPROFILE%\.claude\settings.json`
- `%USERPROFILE%\.claude\CLAUDE.md`
- `%USERPROFILE%\.claude\rules\`
- `%USERPROFILE%\.claude\helpers\`
- `%USERPROFILE%\.claude\templates\`

Because of that, the setup works across:

- existing repos
- new repos
- future Claude Code sessions

A few tools may still create repo-local state later. That is normal.

---

# Start here

## Who this guide is for

Use this guide if:

- you are on Windows
- you want to use Command Prompt
- you want one setup for all projects
- you want the easiest known-working flow

## Important notes before you begin

- Run all commands in **Windows Command Prompt (CMD)**.
- Do not switch between CMD and PowerShell during setup unless you know why.
- Install the **core setup first**.
- Only install the optional plugins and MCP tools after the core setup works.
- If a plugin or MCP tool fails, your core setup can still work fine.

---

# 5-minute quick start

This is the shortest safe path.

## Step 0 - Check prerequisites in CMD

Open **Command Prompt** and run:

```cmd
node -v
npm -v
claude --version
git --version
```

You want:

- Node.js 20+
- npm 9+
- Git installed
- Claude Code installed and recognized in PATH

If `claude` is not installed, run:

```cmd
npm install -g @anthropic-ai/claude-code
claude --version
```

Optional, only if you intentionally want to skip permission checks during setup:

```cmd
claude --dangerously-skip-permissions
```

## Step 1 - Clone this repository

Example location:

```cmd
D:
mkdir Claude
cd /d D:\Claude
git clone https://github.com/satyamamarpandey/OptiClaude.git
cd /d D:\Claude\OptiClaude
```

## Step 2 - Create your global Claude folders

```cmd
mkdir "%USERPROFILE%\.claude"
mkdir "%USERPROFILE%\.claude\rules"
mkdir "%USERPROFILE%\.claude\helpers"
mkdir "%USERPROFILE%\.claude\templates"
```

## Step 3 - Copy OptiClaude global files

```cmd
copy /Y "settings.json" "%USERPROFILE%\.claude\settings.json"
copy /Y "CLAUDE.md" "%USERPROFILE%\.claude\CLAUDE.md"
xcopy /E /I /Y "helpers\*" "%USERPROFILE%\.claude\helpers\"
if exist "templates" xcopy /E /I /Y "templates\*" "%USERPROFILE%\.claude\templates\"
```

### Important note about `templates/data`

Because this uses `xcopy /E`, it also copies everything inside:

```text
templates\data\
```

So you do **not** need a separate copy command for the files inside `templates/data`.

## Step 4 - Install Everything Claude Code rules globally

Go to your working folder and clone the ECC repo:

```cmd
cd /d D:\Claude
git clone https://github.com/affaan-m/everything-claude-code.git
cd /d D:\Claude\everything-claude-code
npm install
```

Clean old rules and recreate folders:

```cmd
rmdir /S /Q "%USERPROFILE%\.claude\rules"
mkdir "%USERPROFILE%\.claude\rules"
mkdir "%USERPROFILE%\.claude\rules\common"
mkdir "%USERPROFILE%\.claude\rules\typescript"
mkdir "%USERPROFILE%\.claude\rules\python"
```

Copy each ruleset into the correct folder:

```cmd
xcopy /E /I /Y "rules\common\*" "%USERPROFILE%\.claude\rules\common\"
xcopy /E /I /Y "rules\typescript\*" "%USERPROFILE%\.claude\rules\typescript\"
xcopy /E /I /Y "rules\python\*" "%USERPROFILE%\.claude\rules\python\"
```

Verify the folders:

```cmd
dir "%USERPROFILE%\.claude\rules"
dir "%USERPROFILE%\.claude\rules\common"
dir "%USERPROFILE%\.claude\rules\typescript"
dir "%USERPROFILE%\.claude\rules\python"
```

## Step 5 - Install the Everything Claude Code plugin

Run these commands in CMD:

```cmd
claude plugin marketplace add affaan-m/everything-claude-code
claude plugin install everything-claude-code@everything-claude-code --scope user
```

## Step 6 - Open Claude Code and test it

Open Claude Code:

```cmd
claude
```

If prompted, choose:

```text
Yes, I trust this folder
```

Once Claude Code opens, run:

```text
/reload-plugins
```

Then test one command:

```text
/everything-claude-code:plan "test"
```

Then exit:

```text
/exit
```

At this point, your **core global setup is working**.

---

# Exact tested setup flow

This section matches the flow that was actually verified to work.

## Part 0 - Check prerequisites in CMD

```cmd
node -v
npm -v
claude --version
```

If Claude Code is missing:

```cmd
npm install -g @anthropic-ai/claude-code
```

Optional:

```cmd
claude --dangerously-skip-permissions
```

## Part 1 - One-time global setup for all projects

### Step 1 - Open CMD and check basics

```cmd
git --version
node -v
npm -v
```

### Step 1.1 - Clone Everything Claude Code

Example:

```cmd
D:
mkdir Claude
cd /d D:\Claude

git clone https://github.com/affaan-m/everything-claude-code.git
cd everything-claude-code
npm install
```

### Step 2 - Make sure `.claude` global folders exist

```cmd
mkdir "%USERPROFILE%\.claude"
mkdir "%USERPROFILE%\.claude\rules"
mkdir "%USERPROFILE%\.claude\templates"
mkdir "%USERPROFILE%\.claude\helpers"
```

### Step 3 - Clean old wrongly copied rules

```cmd
rmdir /S /Q "%USERPROFILE%\.claude\rules"
mkdir "%USERPROFILE%\.claude\rules"
```

### Step 4 - Create proper rule subfolders

```cmd
mkdir "%USERPROFILE%\.claude\rules\common"
mkdir "%USERPROFILE%\.claude\rules\typescript"
mkdir "%USERPROFILE%\.claude\rules\python"
```

### Step 5 - Copy each ruleset into its own folder

```cmd
xcopy /E /I /Y "rules\common\*" "%USERPROFILE%\.claude\rules\common\"
xcopy /E /I /Y "rules\typescript\*" "%USERPROFILE%\.claude\rules\typescript\"
xcopy /E /I /Y "rules\python\*" "%USERPROFILE%\.claude\rules\python\"
```

### Step 6 - Verify the folders exist

```cmd
dir "%USERPROFILE%\.claude\rules"
dir "%USERPROFILE%\.claude\rules\common"
dir "%USERPROFILE%\.claude\rules\typescript"
dir "%USERPROFILE%\.claude\rules\python"
```

## Part 2 - Global Claude Code settings for all projects

### Step 7 - Open `settings.json`

```cmd
notepad "%USERPROFILE%\.claude\settings.json"
```

Then paste the repository `settings.json` content into that file.

If you prefer the easier method, just copy the file directly instead:

```cmd
cd /d D:\Claude\OptiClaude
copy /Y "settings.json" "%USERPROFILE%\.claude\settings.json"
copy /Y "CLAUDE.md" "%USERPROFILE%\.claude\CLAUDE.md"
xcopy /E /I /Y "helpers\*" "%USERPROFILE%\.claude\helpers\"
if exist "templates" xcopy /E /I /Y "templates\*" "%USERPROFILE%\.claude\templates\"
```

## Part 3 - Plugin install inside Claude Code

Open Claude Code:

```cmd
claude
```

At that screen, select:

```text
Yes, I trust this folder
```

Once Claude Code opens, run:

```text
/reload-plugins
```

Test one of them:

```text
/everything-claude-code:plan "test"
```

Then exit:

```text
/exit
```

---

# Core setup in plain English

If you are totally new, here is what you are actually doing:

1. Installing Claude Code so the `claude` command works in CMD.
2. Creating your global Claude folder in `%USERPROFILE%\.claude`.
3. Copying this repo's `settings.json`, `CLAUDE.md`, `helpers`, and `templates` there.
4. Cloning Everything Claude Code and copying its rules into your global rules folder.
5. Installing the Everything Claude Code plugin in user scope.
6. Opening Claude Code once and testing that the plugin loads.

That is the full core setup.

If that works, everything else below is optional.

---

# Optional extras

These are useful, but they are **not required** for the core setup.

Install them only after the core setup works.

---

## Optional 1 - Ruflo CLI globally

If you want to use the `ruflo` command directly in CMD, run:

```cmd
npm install -g ruflo@latest
ruflo --version
```

## Optional 2 - Add Ruflo to Claude Code globally

This is the important part if you want Ruflo available across all sessions and projects.

On Windows, run:

```cmd
claude mcp add --scope user --transport stdio ruflo -- cmd /c npx -y ruflo@latest mcp start
```

Then verify:

```cmd
claude mcp list
```

### One-time cleanup if you added Ruflo locally before

```cmd
cd /d D:\Claude
claude mcp remove "ruflo" -s local
claude mcp list
```

---

## Optional 3 - Prompt Improver plugin globally

### Add the marketplace

```cmd
claude plugin marketplace add severity1/severity1-marketplace
```

### Install the plugin

```cmd
claude plugin install prompt-improver@severity1-marketplace --scope user
```

---

## Optional 4 - Reduce token usage with Code Review Graph

### Install `uv` first if missing

Option A, easiest from CMD with WinGet:

```cmd
winget install --id=astral-sh.uv -e
```

### Add the marketplace

```cmd
claude plugin marketplace add tirth8205/code-review-graph
```

### Install the plugin

```cmd
claude plugin install code-review-graph@code-review-graph --scope user
```

---

## Optional 5 - Taskmaster AI MCP globally

If you want Taskmaster available across all projects and sessions, use **user scope**:

```cmd
claude mcp add --scope user taskmaster-ai -- npx -y task-master-ai
```

Then verify:

```cmd
claude mcp list
```

---

## Optional 6 - Claude Mem globally

### Add the marketplace

```cmd
claude plugin marketplace add thedotmack/claude-mem
```

### Install the plugin

```cmd
claude plugin install claude-mem@thedotmack --scope user
```

---

## Optional 7 - Document Skills globally

### Add the marketplace

```cmd
claude plugin marketplace add anthropics/skills
```

### Install the plugin

```cmd
claude plugin install document-skills@anthropic-agent-skills --scope user
```

---

# Final verification

After the core setup and any optional extras you want, run these checks.

## Check Claude Code

```cmd
claude --version
```

## Check plugins

```cmd
claude plugin list
```

## Check MCP servers

```cmd
claude mcp list
```

## Open Claude Code once more

```cmd
claude
```

Inside Claude Code, run:

```text
/reload-plugins
```

Then test:

```text
/everything-claude-code:plan "test"
```

If that works, your setup is ready.

---

# Troubleshooting

## `claude` is not recognized

Run:

```cmd
npm install -g @anthropic-ai/claude-code
claude --version
```

Then close CMD and open a fresh CMD window.

## `git` is not recognized

Install Git for Windows:

```cmd
winget install --id Git.Git -e
```

Then open a fresh CMD window and verify:

```cmd
git --version
```

## `node` or `npm` is not recognized

Install Node.js LTS:

```cmd
winget install --id OpenJS.NodeJS.LTS -e
```

Then open a fresh CMD window.

## `uv` is not recognized

Install it:

```cmd
winget install --id=astral-sh.uv -e
```

## Plugin mismatch

If Claude shows plugin errors at startup, make sure plugins enabled in `settings.json` are actually installed.

Verify installed plugins with:

```cmd
claude plugin list
```

If needed, either:

- install the missing plugin
- or remove it from `enabledPlugins` in `settings.json`

## Taskmaster fails to install

Try this first:

```cmd
npx -y task-master-ai --help
```

If that fails too, fix Node.js and npm first.

Then retry:

```cmd
claude mcp add --scope user taskmaster-ai -- npx -y task-master-ai
```

## Ruflo exists in multiple scopes

Remove the local copy if needed:

```cmd
claude mcp remove "ruflo" -s local
claude mcp list
```

## Hook errors after startup

Check that these files exist:

```text
%USERPROFILE%\.claude\helpers\hook-handler.cjs
%USERPROFILE%\.claude\helpers\auto-memory-hook.mjs
```

If they are missing, copy the helpers again:

```cmd
cd /d D:\Claude\OptiClaude
xcopy /E /I /Y "helpers\*" "%USERPROFILE%\.claude\helpers\"
```

## Templates are missing

Copy them again:

```cmd
cd /d D:\Claude\OptiClaude
xcopy /E /I /Y "templates\*" "%USERPROFILE%\.claude\templates\"
```

Because `xcopy /E` is recursive, it also copies `templates\data\` and everything inside it.

---

# Reset and reinstall

If you want to redo the setup cleanly:

```cmd
rmdir /S /Q "%USERPROFILE%\.claude\rules"
rmdir /S /Q "%USERPROFILE%\.claude\helpers"
rmdir /S /Q "%USERPROFILE%\.claude\templates"
mkdir "%USERPROFILE%\.claude\rules"
mkdir "%USERPROFILE%\.claude\helpers"
mkdir "%USERPROFILE%\.claude\templates"
```

Then copy the files again from OptiClaude.

---

# Recommended install order

Use this order for the smoothest experience:

1. Install Claude Code.
2. Clone OptiClaude.
3. Copy `settings.json`, `CLAUDE.md`, `helpers`, and `templates`.
4. Clone Everything Claude Code and copy rules.
5. Install the Everything Claude Code plugin.
6. Open Claude Code and test it.
7. Install Ruflo, Prompt Improver, Code Review Graph, Taskmaster, Claude Mem, and Document Skills only if you want them.

---

# FAQ

## Do I need to copy `templates/data` separately?

No.

This command:

```cmd
xcopy /E /I /Y "templates\*" "%USERPROFILE%\.claude\templates\"
```

already copies:

- all top-level template markdown files
- the `data` folder
- all files inside `templates\data\`

## Do I need all the optional plugins?

No.

The only thing you really need for the main setup is the core OptiClaude files and the Everything Claude Code rules/plugin.

## What if one optional plugin fails?

Skip it and continue.

Do not block your full setup because one extra tool had an issue.

## Is this for one project only?

No.

The setup is designed for user scope, so it works across multiple projects.

---

# Credits

This setup builds on top of the work of the original tool and repository authors.

Main credits:

- Everything Claude Code
- Ruflo
- Taskmaster AI
- Prompt Improver
- Code Review Graph
- Claude Mem
- Anthropic Skills

If OptiClaude helps you, consider starring both this repository and the original projects behind the tools.