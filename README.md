# Portfolioterm

A lightweight, terminal-style portfolio website built with Next.js. No backend required - fully static and perfect for GitHub Pages deployment.

## Features

- 🖥️ Terminal-style interface (black background, green text)
- ⌨️ Text-based command interface
- 📜 Command history (↑/↓ arrow keys)
- 🔍 Tab completion
- 📱 Responsive design
- 🚀 Zero backend dependencies
- ⚡ Fast static export

## Commands

- `help` - Show available commands
- `clear` / `cls` - Clear terminal
- `whoami` - Show portfolio owner info
- `ls` / `list` / `dir` - List available sections
- `about` - Show about information
- `projects` - Display all projects
- `skills` - Show technical skills
- `contact` - Display contact information
- `exit` / `quit` - Reload page

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Build static export (for GitHub Pages)
npm run build:static
```

## Deployment to GitHub Pages

### Automated Deployment (Recommended)

The repository includes a GitHub Actions workflow that automatically builds and deploys your site on every push to the `main` branch.

**Setup Steps:**

1. **Enable GitHub Pages:**
   - Go to your repository on GitHub
   - Navigate to **Settings** → **Pages**
   - Under **Source**, select **GitHub Actions**
   - Save the settings

2. **Push your code:**
   ```bash
   git push origin main
   ```

3. **Monitor deployment:**
   - Go to the **Actions** tab in your repository
   - Watch the workflow run (it will build and deploy automatically)
   - Once complete, your site will be live at:
     ```
     https://bharry29.github.io/Portfolioterm/
     ```

### Manual Deployment

If you prefer to deploy manually:

```bash
# Build static site
npm run build:prod

# The static files will be in the 'out' directory
# You can then use gh-pages or manually push to gh-pages branch
```

### Build Commands

- `npm run build` - Standard Next.js build
- `npm run build:static` - Build with GitHub Pages configuration
- `npm run build:prod` - Production build optimized for GitHub Pages

## Tech Stack

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Framer Motion

## License

MIT

