# Menu System Documentation

## Overview
This document describes the improved menu system with global theming, scroll detection, and responsive mobile design.

## Files Structure
```
src/
├── styles/
│   └── theme.js                 # Global theme variables and CSS variables
├── hooks/
│   └── useScrollSection.js      # Custom hook for scroll-based section detection
├── components/
│   └── commons/
│       ├── MenuComponents.jsx   # Reusable menu components
│       └── README.md           # This documentation
└── modules/
    └── portfolio/
        └── components/
            └── Menu.jsx         # Main menu component
```

## Features

### 1. Global Theme System
- **File**: `src/styles/theme.js`
- **Purpose**: Centralized theme management with CSS variables
- **Usage**: Import theme object or use CSS variables directly

```javascript
import { theme } from '@styles/theme';

// Using theme object
const color = theme.colors.primary;

// Using CSS variables in styled-components
const StyledComponent = styled.div`
  color: var(--color-primary);
  font-size: var(--font-size-base);
`;
```

### 2. Scroll Section Detection
- **File**: `src/hooks/useScrollSection.js`
- **Purpose**: Automatically detects which section is currently visible
- **Features**:
  - Throttled scroll events for performance
  - GSAP integration for smooth scrolling
  - Configurable section list

```javascript
import useScrollSection from '@hooks/useScrollSection';

const { activeSection, scrollToSection, isScrolling } = useScrollSection();
```

### 3. Reusable Components
- **File**: `src/components/commons/MenuComponents.jsx`
- **Purpose**: Base components for consistent styling
- **Components**:
  - `MenuItem`: Navigation item with active state
  - `CTAButton`: Call-to-action button
  - `StatusIndicator`: Status dot indicator
  - `MobileMenuButton`: Hamburger menu button
  - `MobileMenuPanel`: Mobile menu container
  - `Logo`: Logo component

### 4. Main Menu Component
- **File**: `src/modules/portfolio/components/Menu.jsx`
- **Features**:
  - Responsive design (desktop/mobile)
  - Automatic section detection
  - Smooth scrolling with GSAP
  - Mobile menu with overlay
  - Accessibility features

## Usage

### Basic Implementation
```jsx
import Menu from '@modules/portfolio/components/Menu';

function App() {
  return (
    <div>
      <Menu />
      {/* Your content with proper section IDs */}
    </div>
  );
}
```

### Section IDs Required
Make sure your sections have the following IDs:
- `#hero` - Hero section
- `#about` - About section
- `#skills` - Skills section
- `#qualification` - Experience/Qualification section
- `#services` - Services section
- `#projects` - Projects section
- `#contact` - Contact section

### Customizing Theme
Edit `src/styles/theme.js` to customize:
- Colors
- Fonts
- Spacing
- Border radius
- Shadows
- Breakpoints
- Z-index values

### Adding New Menu Items
1. Add the section ID to the `menuItems` array in `Menu.jsx`
2. Ensure the corresponding section has the correct ID
3. The scroll detection will automatically work

## Mobile Menu Features
- **Overlay**: Dark overlay when menu is open
- **Slide Animation**: Smooth slide-in from right
- **Touch Friendly**: Large touch targets
- **Body Scroll Lock**: Prevents background scrolling
- **Click Outside**: Closes menu when clicking outside
- **Accessibility**: Proper focus management

## Performance Optimizations
- **Throttled Scroll Events**: Uses `requestAnimationFrame` for smooth performance
- **Lazy GSAP Loading**: GSAP is loaded only when needed
- **CSS Variables**: Efficient theming without JavaScript
- **Minimal Re-renders**: Optimized state management

## Browser Support
- Modern browsers with CSS custom properties support
- Mobile Safari 10+
- Chrome 49+
- Firefox 31+
- Edge 16+

## Troubleshooting

### Menu Items Not Highlighting
- Ensure section IDs match exactly
- Check that sections are properly positioned
- Verify scroll detection is working in browser dev tools

### Mobile Menu Not Working
- Check that `react-responsive` is installed
- Verify breakpoint configuration
- Ensure proper event handling

### Styling Issues
- Check CSS variables are loaded
- Verify theme import paths
- Ensure styled-components is properly configured
