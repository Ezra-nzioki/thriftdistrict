
# Thrift District

A modern, eco-friendly online thrift shop built with React. Explore unique, sustainable fashion finds with our responsive web application.

## 🚀 Features

- **Responsive Design** - Mobile-first approach with Tailwind CSS breakpoints
- **Product Showcase** - Browse featured products with detailed information
- **Hero Section** - Eye-catching landing section highlighting the brand mission
- **Features Section** - Highlight key benefits of sustainable shopping
- **New Stock** - Showcase newly arrived thrifted items
- **Best Sellers** - Display top-rated products
- **Testimonials** - Customer reviews and feedback section
- **Navigation & Footer** - Smooth user experience with consistent layout

## 🛠️ Tech Stack

- **React 19** - UI library for building interactive components
- **Vite 7** - Modern build tool and development server
- **Tailwind CSS 4** - Utility-first CSS framework for responsive styling
- **JavaScript ES6+** - Modern JavaScript features

## 📦 Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm build

# Lint code
npm run lint

# Preview production build
npm run preview
```

## 📁 Project Structure

```
src/
├── components/
│   ├── layout/
│   │   ├── header.jsx      # Main header component
│   │   ├── header.css      # Header styles
│   │   ├── nav.jsx         # Navigation bar
│   │   └── footer.jsx      # Footer component
│   ├── sections/
│   │   ├── hero.jsx        # Hero banner section
│   │   ├── features.jsx    # Features highlight section
│   │   ├── newStock.jsx    # New arrivals section
│   │   ├── best.jsx        # Best sellers section
│   │   ├── products.jsx    # All products grid
│   │   ├── allProducts.js  # Products data/logic
│   │   └── testimonials.jsx # Customer reviews section
│   └── common/
│       ├── btn.jsx         # Reusable button component
│       └── card.jsx        # Reusable card component
├── App.jsx                 # Main app component
├── main.jsx                # React DOM entry point
├── index.css               # Global styles
└── products.js             # Product data
```

## 🎯 Core Components

- **Header** - Navigation and branding
- **Hero** - Welcome message with call-to-action
- **Features** - Brand statistics and highlights
- **NewStock** - Recently added items
- **Best** - Top-rated products
- **AllProducts** - Complete product listing
- **Testimonials** - Customer feedback
- **Footer** - Site footer with links

## 💚 About

Thrift District is dedicated to promoting sustainable fashion through an online thrift shop. Join the sustainable fashion movement and shop unique, eco-friendly clothing items.

Built with ❤️ for learning React and modern web development.

## Storefront discovery and SEO

- The All Products section filters locally by product name, description, category, and size. Search is debounced; category, size, and price/newest sorting can be combined.
- Set product sizes in the admin form as comma-separated tags (for example, `S, M, L`). Existing products remain searchable by name, description, and category; older products without a size are not assigned one automatically.
- Product titles link to stable `/products/<name>-<id>` pages. Each product page includes a canonical URL, Open Graph/Twitter metadata, and Product JSON-LD with its real price and stock availability. Rating markup is emitted only when genuine `rating` and `reviewCount` data exists; no ratings are fabricated.
- Product gallery images use lazy loading and responsive Cloudinary width/quality transforms. The hero image remains eager so the initial viewport can render promptly.
- `npm run build` fetches the public product list from `API_URL` (or `VITE_API_URL`), writes prerendered SEO metadata for the home, about, contact, and product pages, and generates `dist/sitemap.xml`. The build fails clearly if the product API cannot be reached instead of publishing a silently incomplete sitemap.
- `robots.txt` points crawlers to the deployed sitemap. After changing the site hostname, update `SITE_URL` (or `VITE_SITE_URL`) and `client/public/robots.txt`. The defaults use `https://thriftdistrict-78lo.onrender.com`.
- Static sitemap and product HTML are snapshots of the catalog at build time. Rebuild/redeploy the client after adding or removing products so crawlers receive the current sitemap and pre-rendered metadata. The React app still supports direct product routes for products added after the last build.

For a local build against a non-production backend:

```bash
cd client
API_URL=http://localhost:5005/api \
VITE_API_URL=http://localhost:5005/api \
SITE_URL=http://localhost:5173 \
VITE_SITE_URL=http://localhost:5173 \
npm run build
```

In Render, set the same values as service environment variables when using a custom frontend/backend hostname. `API_URL` is used by the build-time sitemap generator; `VITE_API_URL` and `VITE_SITE_URL` are embedded in the browser bundle and must be set before building.
