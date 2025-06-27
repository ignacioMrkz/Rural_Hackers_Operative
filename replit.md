# Beautiful Bees: Polinizadoras Rurais - Interactive Learning System

## Overview

This is a React-based interactive learning application designed for "Beautiful Bees: Polinizadoras Rurais" - a transformative program that unites women, territories, and knowledge in deep collective learning. The application provides an immersive terminal-style educational experience with retro aesthetics, featuring sections on biomimetic principles, village exploration, and interactive mini-games.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom retro/terminal theme
- **3D Graphics**: React Three Fiber with Drei utilities for 3D components
- **State Management**: Zustand for global state management
- **Build Tool**: Vite with custom configuration for game assets
- **UI Components**: Radix UI primitives with custom styling

### Backend Architecture
- **Runtime**: Node.js with Express server
- **Development**: Hot Module Replacement (HMR) via Vite integration
- **Static Serving**: Serves built client application in production
- **API Structure**: RESTful endpoints under `/api` prefix

### Database Layer
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Database**: Configured for PostgreSQL (via Neon serverless)
- **Schema**: User management with extensible structure
- **Development Storage**: In-memory storage fallback for development

## Key Components

### Game System
- **Terminal Interface**: Retro CRT-style terminal with typewriter effects
- **Progress Tracking**: Persistent progress using Zustand with localStorage
- **Sound System**: Audio management with mute/unmute functionality
- **Interactive Elements**: Section navigation, village exploration, bee mini-games

### Educational Content
- **Three Pillars**: Nature-based, being-based, and connection-based thinking
- **Village Explorer**: Interactive exploration of Galician villages (Anceu and Fornelos de Montes)
- **Mini-Games**: Educational bee-themed quiz games
- **Progress System**: Section completion tracking with visual feedback

### Visual Design
- **Retro Aesthetic**: VT323 and Share Tech Mono fonts for terminal feel
- **CRT Effects**: CSS-based scanlines and flickering effects
- **Color Scheme**: Green terminal text on black background with accent colors
- **3D Elements**: GLTF model support for enhanced visual elements

## Data Flow

1. **Application Entry**: React app loads with Zustand state initialization
2. **User Navigation**: Terminal-style menu system routes between sections
3. **Content Delivery**: Static educational content rendered with typewriter effects
4. **Progress Tracking**: Completion state persisted to localStorage via Zustand
5. **Audio Management**: Sound effects managed through dedicated audio store
6. **3D Rendering**: React Three Fiber handles 3D content when present

## External Dependencies

### Frontend Libraries
- **UI Framework**: React with TypeScript support
- **3D Graphics**: `@react-three/fiber`, `@react-three/drei`, `@react-three/postprocessing`
- **State Management**: `zustand` with persistence middleware
- **Data Fetching**: `@tanstack/react-query` for server state management
- **UI Components**: Comprehensive Radix UI component library
- **Styling**: `tailwindcss`, `clsx`, `class-variance-authority`

### Backend Dependencies
- **Server**: Express.js with TypeScript support
- **Database**: `@neondatabase/serverless`, `drizzle-orm`, `drizzle-kit`
- **Development**: `tsx` for TypeScript execution, `esbuild` for production builds
- **Session Management**: `connect-pg-simple` for PostgreSQL sessions

### Development Tools
- **Build System**: Vite with React plugin
- **GLSL Support**: `vite-plugin-glsl` for shader development
- **Error Handling**: `@replit/vite-plugin-runtime-error-modal`
- **TypeScript**: Full type coverage across client, server, and shared code

## Deployment Strategy

### Development Environment
- **Hot Reload**: Vite dev server with Express integration
- **Port Configuration**: Application runs on port 5000
- **Asset Handling**: Support for 3D models (GLTF/GLB) and audio files (MP3/OGG/WAV)

### Production Build
- **Client Build**: Vite builds React app to `dist/public`
- **Server Build**: ESBuild bundles Express server to `dist/index.js`
- **Static Serving**: Express serves built client application
- **Environment**: NODE_ENV=production for optimizations

### Replit Configuration
- **Runtime**: Node.js 20 with web and bash modules
- **Deployment**: Autoscale deployment target
- **Database**: PostgreSQL via DATABASE_URL environment variable
- **Port Mapping**: Internal port 5000 mapped to external port 80

## User Preferences

Preferred communication style: Simple, everyday language.

## Recent Changes

- June 26, 2025: Created Rural Hackers OS with boot sequence and login system
- Added Minecraft/Pokemon-style village exploration game featuring art residents
- Implemented authentic character interactions with Shona, Nacho, África, Pepe, Agustín, Anís, Agatha, Jorge, and Noelia
- Added Fuchiqueira repair café and community buildings
- Enhanced Windows 98 interface with draggable icons and resizable windows
- Integrated bee spacecraft pollination game with galactic theme
- Removed progress tracking display for cleaner interface
- Added Rural Hackers branding with authentic logo integration

## Architecture Updates

### Rural Hackers OS System
- **Boot Sequence**: Retro terminal-style loading with Rural Hackers branding
- **Authentication**: Login screen with username input and guest access
- **Village Explorer**: 2D canvas-based game with character dialogue system
- **Character System**: Nine art residents with unique activities and multi-part conversations
- **Building System**: Interactive locations including Fuchiqueira repair café and Anceu Coliving
- **Game Mechanics**: WASD movement, space bar interactions, collision detection

### Enhanced UI Components
- **Draggable Desktop**: Absolute positioning system for moveable icons
- **Resizable Windows**: CSS resize handles with min/max constraints
- **Windows 98 Aesthetics**: Authentic button styles, panel designs, and color schemes
- **Rural Hackers Branding**: Custom taskbar with green theme and logo integration

## Changelog

Changelog:
- June 26, 2025. Initial setup and Rural Hackers OS implementation