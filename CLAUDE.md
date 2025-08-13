# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the @telegram-apps/telegram-ui library - a comprehensive React UI component library for building Telegram Mini Apps. It provides pre-designed components that follow iOS Human Interface Guidelines and Android Material Design, ensuring consistent cross-platform experiences.

## Development Commands

### Build Commands
- `npm run build` - Full build (tests, types, JS/CSS)
- `npm run build:test` - Run tests with Jest
- `npm run build:types` - Build TypeScript declarations
- `npm run build:js-css` - Build JavaScript and CSS

### Development
- `npm run dev` - Start Storybook dev server on port 6006
- `npm run watch` - Watch mode for ES6, CJS, and CSS builds

### Testing
- `npm run build:test` - Run Jest tests
- Test files follow pattern: `*.test.ts` or `*.test.tsx`
- Test configuration in `jest.config.js`

### Linting
The project uses ESLint with TypeScript, Airbnb config, and Prettier:
- ESLint configuration in `.eslintrc.js`
- Prettier configuration in `.pretterrc`

## Architecture

### Component Organization
Components are organized by category in `src/components/`:
- **Blocks** - Large content blocks
- **Feedback** - User feedback components
- **Form** - Form controls and inputs
- **Layout** - Layout containers
- **Misc** - Miscellaneous utilities
- **Navigation** - Navigation components
- **Overlays** - Modals, popovers, drawers
- **Service** - Service components
- **Typography** - Text components

### Build System
- **SWC** for TypeScript/JSX compilation (config in `package.swcrc`)
- **PostCSS** with CSS Modules for styling
- **Webpack** for CSS bundling
- Outputs both ES6 modules (`dist/`) and CommonJS (`dist/cjs/`)
- TypeScript declarations generated for both formats

### Key Dependencies
- React 18+ (peer dependency)
- @floating-ui/react-dom for positioning
- vaul for drawer components
- CSS Modules for component styling

### Module Structure
- Entry point: `src/index.ts`
- Components export from `src/components/index.ts`
- Helpers in `src/helpers/`
- Hooks in `src/hooks/`
- Icons in `src/icons/`
- Type definitions in `src/types/`

## Development Patterns

### Component Structure
Each component typically includes:
- Main component file (`.tsx`)
- CSS Module (`.module.css`)
- Sub-components in `components/` subdirectory
- Exports through component's `index.ts`

### CSS Modules
- Component styles use CSS Modules
- Global styles bundled to `dist/styles.css`
- PostCSS plugins for logical properties and gap support

### TypeScript
- Strict TypeScript configuration
- Declaration maps generated for debugging
- Both ES6 and CJS type definitions produced

## Integration Notes

### Usage in Applications
Components require importing the global stylesheet:
```jsx
import '@telegram-apps/telegram-ui/dist/styles.css';
```

### Storybook Development
- Stories in `*.stories.tsx` files
- Storybook config in `.storybook/`
- Live playground at https://tgui.xelene.me/