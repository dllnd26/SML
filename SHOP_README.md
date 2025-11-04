# SML Merch Shop

## Overview
A modern e-commerce shop for Surinamese Major League official merchandise, featuring jerseys and team apparel.

## Pages Created

### 1. Shop Page (`/shop`)
- **Location**: `app/shop/page.tsx`
- **Features**:
  - Product grid layout with responsive design
  - Product cards with images, prices, and quick info
  - Featured product badges
  - Stock status indicators
  - Info section with shipping, payment, and authenticity details
  - Hover animations and modern UI

### 2. Product Details Page (`/shop/[id]`)
- **Location**: `app/shop/[id]/page.tsx`
- **Features**:
  - Large product image display
  - Size selection interface
  - Quantity selector
  - Add to cart functionality
  - Product features and benefits
  - Size guide table
  - Related products section
  - 5-star rating display
  - Breadcrumb navigation

### 3. Product Data
- **Location**: `lib/products.ts`
- **Contains**:
  - Product interface/type definitions
  - Mock product data for both jerseys
  - Helper functions (`getProductById`, `getFeaturedProducts`)

## Products Included

1. **SML Home Jersey 2023-2024**
   - Price: $79.99
   - Image: `/shirt_2023-2024.jpg`
   - Features red/green stripes design

2. **SML Home Jersey 2024-2025**
   - Price: $89.99
   - Image: `/shirt_2024-2025.png`
   - Features modern dynamic design

## Navigation
- Shop link added to main navigation header with ShoppingBag icon
- Accessible from all pages via the navigation menu

## Design Features
- **Modern UI**: Clean, professional e-commerce design
- **Responsive**: Works on mobile, tablet, and desktop
- **Animations**: Smooth hover effects and transitions using Framer Motion
- **Color Scheme**: Red and green accents matching team colors
- **Typography**: Bold, clear headings with good hierarchy
- **Icons**: Lucide React icons throughout

## Technologies Used
- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion (animations)
- Lucide React (icons)

## Future Enhancements
- Shopping cart state management (Context API or Zustand)
- Checkout flow
- Payment integration (Stripe, PayPal)
- User authentication
- Order history
- Product reviews and ratings
- Inventory management
- Multiple product images/gallery
- Product variants (colors, customization)
- Wishlist functionality

## Running the Shop
```bash
npm run dev
```

Then navigate to `http://localhost:3000/shop` to view the shop page.
