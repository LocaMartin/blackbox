<div>
  <p><b>[ Prerequisites ]:</b>
    <img src="https://img.shields.io/badge/Node.js-18+-339933?logo=nodedotjs&logoColor=white"/>
    <img src="https://img.shields.io/badge/npm-CB3837?logo=npm&logoColor=white"/>
    <img src="https://img.shields.io/badge/Yarn-2C8EBB?logo=yarn&logoColor=white"/>
  </p>
</div>

<div>
  <p><b>[ Technology Stack ]: </b>
    <img src="https://img.shields.io/badge/Next.js-14-000000?logo=nextdotjs&logoColor=white"/>
    <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?logo=tailwindcss&logoColor=white"/>
    <img src="https://img.shields.io/badge/shadcn/ui-111111?logo=react&logoColor=61DAFB"/>
    <img src="https://img.shields.io/badge/Lucide_Icons-000000?logo=react&logoColor=61DAFB"/>
    <img src="https://img.shields.io/badge/React_Hooks-61DAFB?logo=react&logoColor=black"/>
    <img src="https://img.shields.io/badge/Local_Storage-4285F4?logo=googlechrome&logoColor=white"/>
    <img src="https://img.shields.io/badge/GitHub_Pages-222222?logo=githubpages&logoColor=white"/>
  </p>
</div>

## Quick Start

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
     basePath: process.env.NODE_ENV === 'production' ? '/your-repo' : '',
     assetPrefix: process.env.NODE_ENV === 'production' ? '/your-repo/' : '',
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

## Configuration

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

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
