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

1. Push code to GitHub repository
2. Go to repository Settings → Pages
3. Under "Source", select "GitHub Actions"
4. The workflow will automatically deploy on push to `main` branch

The site will be available at `https://yourusername.github.io` (or your custom domain).

## Tech Stack

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Framer Motion

## License

MIT

