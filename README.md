# Suriname Major League (SML) Website

A modern, professional football league website built with Next.js, showcasing the premier football league of Suriname.

## 🎯 Features

- **Home Page**: Hero section with latest highlights, upcoming fixtures, league table preview, and news
- **League Table**: Interactive standings with sorting, filtering, and team statistics
- **Fixtures & Results**: Calendar-style layout with match cards, live status indicators, and filtering by status
- **Teams**: Grid view of all teams with detailed team pages including rosters and match history
- **News**: Latest league announcements and match reports with individual article pages
- **About**: League history, mission, values, and milestones
- **Contact**: Contact form with office information and social media links

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Animations**: Framer Motion
- **Icons**: Lucide React

## 🎨 Brand Colors

- **Primary**: #3E8C21 (Green)
- **Secondary**: #93D70E (Light Green)
- **Base**: #212835 (Dark Blue/Gray)

## 📦 Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 🚀 Development

The application will be available at `http://localhost:3000`

### Project Structure

```
/app
  /about          - About page
  /contact        - Contact page
  /matches        - Fixtures & Results page
  /news           - News listing and article pages
  /table          - League table page
  /teams          - Teams listing and detail pages
  layout.tsx      - Root layout with header and footer
  page.tsx        - Home page
  globals.css     - Global styles

/components
  /layout         - Header and Footer components
  /ui             - shadcn/ui components

/lib
  data.ts         - Mock data for teams, matches, standings, etc.
  utils.ts        - Utility functions
```

## ✨ Key Features

### Animations
- Smooth page transitions with Framer Motion
- Hover effects on cards and buttons
- Animated hero text entrance
- Live match pulse animation
- Staggered list animations

### Responsive Design
- Mobile-first approach
- Adaptive layouts for all screen sizes
- Mobile navigation menu
- Optimized touch interactions

### User Experience
- Sticky navigation with scroll effects
- Quick access to key information
- Intuitive filtering and sorting
- Visual feedback on interactions

## 📝 Customization

### Adding Teams
Edit `/lib/data.ts` and add team objects to the `teams` array.

### Adding Matches
Edit `/lib/data.ts` and add match objects to the `matches` array.

### Adding News
Edit `/lib/data.ts` and add article objects to the `newsArticles` array.

### Updating Colors
Edit `tailwind.config.ts` to modify the color scheme.

## 🌐 Deployment

This project can be deployed to:
- Vercel (recommended)
- Netlify
- Any Node.js hosting platform

```bash
# Build the project
npm run build

# The output will be in the .next folder
```

## 📄 License

This project is created for the Suriname Major League.

## 🤝 Contributing

For contributions or suggestions, please contact the SML administration.

---

Built with ⚽ for Surinamese Football
