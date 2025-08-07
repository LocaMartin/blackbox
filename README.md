<div align="center">
<h1><a href="BLACK_BOX.md">BLACK BOX</a></h1>
<h3>Personal Development App</h3>
</div>

A sophisticated personal development tracking application built with Next.js, featuring glassmorphism design and comprehensive self-improvement tools.

## Features

- **Goal Tracking** - Set and monitor progress on personal objectives
- **Task Management** - Nested tasks with checkboxes and numbering
- **Daily Progress** - Track daily achievements and routines  
- **Reflection Tools** - Log positives, mistakes, and learnings
- **Habit Management** - Monitor and overcome addictions/bad habits
- **Focus Timer** - Built-in stopwatch for time tracking
- **Rich Text Editor** - Advanced note-taking capabilities
- **Local Data Storage** - All data stays in your browser
- **Password Protection** - Secure access to your personal data
- **Glassmorphism UI** - Beautiful, modern interface design

## Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn package manager

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/black-box-app.git
   cd black-box-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to \`http://localhost:3000\`

## Deployment to GitHub Pages

### Method 1: Using GitHub Actions (Recommended)

1. **Fork or create the repository on GitHub**

2. **Enable GitHub Pages**
   - Go to your repository settings
   - Scroll to "Pages" section
   - Select "GitHub Actions" as the source

3. **Create GitHub Actions workflow**
   Create \`.github/workflows/deploy.yml\`:

   ```yaml
   name: Deploy to GitHub Pages

   on:
     push:
       branches: [ main ]
     pull_request:
       branches: [ main ]

   jobs:
     build-and-deploy:
       runs-on: ubuntu-latest
       
       steps:
       - name: Checkout
         uses: actions/checkout@v4

       - name: Setup Node.js
         uses: actions/setup-node@v4
         with:
           node-version: '18'
           cache: 'npm'

       - name: Install dependencies
         run: npm ci

       - name: Build application
         run: npm run build

       - name: Export static files
         run: npm run export

       - name: Deploy to GitHub Pages
         uses: peaceiris/actions-gh-pages@v3
         if: github.ref == 'refs/heads/main'
         with:
           github_token: \${{ secrets.GITHUB_TOKEN }}
           publish_dir: ./out
   ```

4. **Update next.config.js**
   ```javascript
   /** @type {import('next').NextConfig} */
   const nextConfig = {
     output: 'export',
     trailingSlash: true,
     images: {
       unoptimized: true
     },
     basePath: process.env.NODE_ENV === 'production' ? '/your-repo-name' : '',
     assetPrefix: process.env.NODE_ENV === 'production' ? '/your-repo-name/' : '',
   }

   module.exports = nextConfig
   ```

5. **Update package.json scripts**
   ```json
   {
     "scripts": {
       "dev": "next dev",
       "build": "next build",
       "start": "next start",
       "lint": "next lint",
       "export": "next export"
     }
   }
   ```

6. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Setup GitHub Pages deployment"
   git push origin main
   ```

### Method 2: Manual Deployment

1. **Build the application**
   ```bash
   npm run build
   npm run export
   ```

2. **Deploy the `out` folder**
   - Upload the contents of the `out` folder to your GitHub Pages repository
   - Or use the `gh-pages` npm package:
   
   ```bash
   npm install --save-dev gh-pages
   npx gh-pages -d out
   ```

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file for local development:

```env
NEXT_PUBLIC_APP_NAME=Black Box
NEXT_PUBLIC_VERSION=1.0.0
```

### Customization

- **Colors**: Edit `tailwind.config.ts` to change the color scheme
- **Fonts**: Update `app/layout.tsx` to change typography
- **Logo**: Replace the Brain icon in the header with your custom logo
- **Default Password**: Modify the login component to set your preferred password

## Security & Privacy

- **Local Storage Only**: All user data is stored locally in the browser
- **No External APIs**: No data is sent to external servers
- **Password Protection**: Access is secured with a login system
- **Client-Side Only**: Runs entirely in the browser

## Technology Stack

- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS with custom glassmorphism effects
- **UI Components**: shadcn/ui component library
- **Icons**: Lucide React icons
- **State Management**: React hooks and local storage
- **Deployment**: Static export for GitHub Pages

## Browser Compatibility

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

If you encounter any issues:

1. Check the [Issues](https://github.com/yourusername/black-box-app/issues) page
2. Create a new issue with detailed information
3. Include browser version and error messages

## 🎯 Roadmap

- [ ] Data export/import functionality
- [ ] Mobile app version
- [ ] Advanced analytics dashboard
- [ ] Habit streak tracking
- [ ] Pomodoro timer integration
- [ ] Theme customization options

---

**Built with ❤️ for personal growth and self-improvement**
