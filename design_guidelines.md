# Samudra Sachet Design Guidelines

## Design Approach

**System**: Custom design system inspired by **Material Design** principles with Google Maps/Earth aesthetics, emphasizing clarity, hierarchy, and trust for government disaster management.

**Core Principles**:
- **Clarity First**: Information must be instantly scannable during crisis situations
- **Trust & Authority**: Government platform requiring professional, credible appearance
- **Data Density Balance**: Rich information without overwhelming users
- **Accessibility**: High contrast, clear hierarchy, WCAG AA compliant

---

## Color System

### Light Mode (Primary)
- **Background**: `30 10% 97%` (#F8F6F2 - warm neutral)
- **Surface/Cards**: `0 0% 100%` (pure white)
- **Primary (Deep Ocean Blue)**: `217 89% 35%` (#0D47A1)
- **Primary Hover**: `217 89% 30%`
- **Accent (Alert Orange)**: `32 100% 62%` (#FFAB40)
- **Accent Hover**: `32 100% 55%`
- **Success (Verified)**: `142 71% 45%` (emerald green)
- **Warning (Pending)**: `45 100% 51%` (amber)
- **Danger (High Priority)**: `0 84% 60%` (coral red)
- **Text Primary**: `217 89% 15%` (very dark blue)
- **Text Secondary**: `217 20% 45%` (muted blue-gray)
- **Border/Dividers**: `217 20% 85%`

### Dark Mode
- **Background**: `217 30% 8%`
- **Surface/Cards**: `217 25% 12%`
- **Primary**: `217 89% 65%` (lightened for contrast)
- **Text Primary**: `30 10% 95%`
- **Borders**: `217 20% 20%`

### Map-Specific Colors
- **Citizen Reports (Verified)**: Success green pins
- **Citizen Reports (Pending)**: Warning amber pins (opacity based on trust score)
- **Social Media Hotspots**: Gradient from `32 100% 62%` to `0 84% 60%` (orange to red for intensity)
- **Alert Zones**: `0 84% 60%` with 20% opacity fill
- **Admin Warning Overlay**: `217 89% 35%` with 10% opacity

---

## Typography

**Font Family**: 'Inter' (Google Fonts) - excellent for data-dense interfaces

**Scale**:
- **Hero/Dashboard Title**: text-4xl (36px) font-bold
- **Section Headers**: text-2xl (24px) font-semibold
- **Card Titles**: text-lg (18px) font-semibold
- **Body Text**: text-base (16px) font-normal
- **Metadata/Labels**: text-sm (14px) font-medium
- **Captions/Timestamps**: text-xs (12px) font-normal

**Line Height**: Leading-relaxed (1.625) for body text, leading-tight (1.25) for headings

---

## Layout System

**Spacing Primitives**: Use Tailwind units of **2, 4, 8, 12, 16** (e.g., p-4, gap-8, m-12)

**Grid System**:
- **Dashboard Layout**: 12-column CSS Grid
- **Sidebar**: Fixed 280px width (w-70)
- **Main Content Area**: Flexible, min-height screen
- **Card Spacing**: gap-6 for card grids
- **Section Padding**: px-8 py-6 for containers

**Container Widths**:
- **Full Dashboard**: w-full (uses sidebar + main split)
- **Modal/Dialogs**: max-w-2xl (672px)
- **Forms**: max-w-xl (576px)
- **Analytics Cards**: Responsive grid (grid-cols-1 md:grid-cols-2 lg:grid-cols-3)

---

## Component Library

### Navigation
- **Admin Sidebar**: Fixed left sidebar with icon + label navigation, grouped by function (Reports, Analytics, Alerts, Settings)
- **Top Bar**: Breadcrumbs, global search, notifications bell, user profile dropdown
- **Mobile**: Collapsible hamburger menu with overlay

### Map Interface (Core Component)
- **Full-height interactive map** (Mapbox GL JS or Leaflet)
- **Floating Control Panel** (top-right): Layer toggles with checkboxes and icons
- **Zoom Controls**: Standard +/- buttons (bottom-right)
- **Legend**: Bottom-left floating card explaining pin colors and heatmap intensity
- **Report Details Panel**: Slide-in from right (400px width) when pin clicked, showing image, description, trust score meter, verification actions

### Cards
- **Report Cards**: White background, rounded-lg, shadow-md, p-6
  - Header: Hazard type badge + timestamp
  - Body: Description preview (2 lines max)
  - Footer: Location tag + trust score indicator
  - Thumbnail image if available (aspect-video, rounded)
- **Stat Cards**: Minimal design with large number (text-3xl font-bold), small label below, optional trend indicator (↑ green or ↓ red)

### Forms
- **Input Fields**: border-2 border-gray-300, rounded-md, px-4 py-3, focus:border-primary
- **Dropdowns**: Custom styled with chevron icon
- **File Upload**: Drag-drop zone with dashed border, camera icon, "Upload photo" text
- **Buttons**:
  - Primary: bg-primary text-white px-6 py-3 rounded-md font-semibold
  - Secondary: border-2 border-primary text-primary (outline variant)
  - Danger: bg-danger for critical actions
  - Icon buttons: Square 40px with centered icon for map controls

### Data Displays
- **Trust Score Meter**: Circular progress indicator (0-100) with color coding:
  - 80-100: Success green
  - 50-79: Warning amber  
  - 0-49: Danger red
- **Timeline**: Vertical line with dots for report history
- **Charts**: Use Chart.js with coastal color palette - line charts for trends, donut for distribution, bar for comparisons

### Verification Workflow Panel
- **Queue List**: Scrollable list of report cards, sorted by priority
- **Filter Bar**: Quick filters (All, Pending, High Priority, By Hazard Type)
- **Action Buttons Row**: Three equal-width buttons (Verify, Escalate, Dismiss) with icons

### Alert Creation Interface
- **Map Drawing Tool**: Polygon/circle selector on map
- **Message Composer**: Textarea with character count (max 280)
- **Severity Selector**: Radio buttons (Info, Warning, Critical) with color indicators
- **Preview Pane**: Shows how alert appears on mobile

---

## Key Screen Compositions

### Admin Dashboard (Landing)
- Left sidebar navigation
- Main area: Large map (70% height) + stat cards row above (4 cards: Total Reports, Verified Today, Active Alerts, High Priority)
- Heatmap layer active by default showing social media activity

### Report Verification Page
- Split view: Left = filterable report queue (40%), Right = map with selected report highlighted (60%)
- Details panel slides in from right when report selected

### Analytics Page
- 3-column grid of chart cards
- Top row: Time-series line chart (full width)
- Second row: Hazard type breakdown (donut), Geographic distribution (bar), Sentiment trends (area chart)

### Citizen Reporting Interface (Web MVP)
- Clean, centered single-column form (max-w-xl)
- Large hazard type selector with icons (grid of cards)
- Photo upload zone prominent
- Auto-detected location shown on mini-map preview
- Submit button fixed at bottom on mobile

---

## Images

**Hero Section**: Not applicable - this is a utility dashboard, not a marketing site. Dashboard opens directly to map interface.

**Report Cards**: User-uploaded hazard photos (aspect-video 16:9, object-cover, rounded-lg, max-h-48)

**Empty States**: Illustrated graphics for "No reports yet" states (simple line art in primary color)

**User Avatars**: Circular, 40px diameter for profile displays

---

## Animations

**Minimal & Purposeful Only**:
- Pin drops on map: Simple scale-in (0.8 to 1) over 200ms
- Panel slides: translate-x transitions, 300ms ease-out
- Button hovers: Subtle color darkening (no transforms)
- Toast notifications: Slide down from top, 400ms
- **No** loading spinners on map tiles (native Mapbox handles this)

---

## Accessibility

- All map pins must have keyboard-accessible click handlers
- Color is never the only indicator (icons + text labels always present)
- Focus states: 2px solid accent orange ring
- Dark mode maintains minimum 7:1 contrast for text
- Form inputs have visible labels (not placeholder-only)
- Alert messages include ARIA live regions for screen readers