# CampusDemand Transit Prototype (CDTP)

## Overview
CampusDemand Transit is a mobile-responsive web application for on-demand campus shuttle service. The app features an extremely simple UI focused on a single-action request button with GPS proximity-based geofencing.

## Purpose
This prototype demonstrates the feasibility of an on-demand tram stopping system using GPS proximity detection and geofencing. Students can request shuttles only when they are within the Stop Request Zone (SRZ) of their selected pickup location.

## Current State
- ✅ Next.js 14 with App Router and JavaScript
- ✅ Mobile-responsive design with Tailwind CSS
- ✅ Student interface with proximity-based ride requests
- ✅ Driver interface for managing ride queue
- ✅ In-memory data store for rides and shuttle state
- ✅ Real-time updates with polling fallback
- ✅ Geofencing logic (SRZ radius ~25 meters)
- ⏳ Map visualization (planned)

## Recent Changes
*November 23, 2025*
- Initial project setup with Next.js and Tailwind CSS
- Created student and driver interfaces
- Implemented proximity-based geofencing logic
- Added in-memory data store with ride management
- Configured workflow to run on port 5000
- Implemented real-time updates with polling mechanism

## Project Architecture

### Frontend (Next.js App Router)
- `/` - Landing page that automatically redirects to student interface
- `/student` - Student interface for requesting rides (default view)
- `/driver` - Driver dashboard for managing rides (accessible via direct URL)
- `components/` - Reusable React components

### Backend (Next.js API Routes)
- `/api/rides` - Ride management (GET, POST, PUT)
- `/api/shuttle` - Shuttle location and status
- `/api/ws` - WebSocket endpoint information

### Data Layer
- `lib/store.js` - In-memory data store with:
  - Campus stop locations (5 predefined stops)
  - Active rides storage
  - Shuttle state and location
  - Distance calculation and geofencing logic

### Key Features

#### Geofencing Logic
- **SRZ Radius**: 0.0005 degrees (~25 meters)
- **Distance Calculation**: Euclidean distance between GPS coordinates
- **Proximity Detection**: Real-time checking if student is within SRZ

#### Ride States
1. `requested` - Student has requested a ride
2. `matched` - Driver has accepted the ride
3. `in-transit` - Ride is in progress
4. `completed` - Ride finished successfully
5. `cancelled` - Ride cancelled by student

#### Campus Stops
1. Main Library (40.7128, -74.0060)
2. Dorm Building A (40.7138, -74.0070)
3. Student Center (40.7118, -74.0050)
4. Campus Gym (40.7148, -74.0080)
5. Engineering Building (40.7108, -74.0040)

## User Preferences
- **Language**: JavaScript (not TypeScript)
- **Framework**: Next.js with App Router
- **Styling**: Tailwind CSS for mobile-first design
- **UI Philosophy**: Extremely simple, single-action focused

## Technical Stack
- **Runtime**: Node.js 20
- **Framework**: Next.js 14.2
- **UI Library**: React 18.3
- **Styling**: Tailwind CSS 3.4
- **Real-time**: WebSocket (ws 8.18) with polling fallback
- **State Management**: In-memory storage (no database)

## Development Workflow
```bash
npm run dev   # Start development server on port 5000
npm run build # Build for production
npm start     # Start production server
```

## Mobile Optimization
- Viewport configured for mobile devices
- Touch-friendly button sizes (py-4 px-6)
- Responsive design with mobile-first approach
- Safe area padding for notched devices
- Maximum scale set to prevent zoom on input focus

## Demo Features
- **Student Side**: Simulate location near different campus stops
- **Driver Side**: Simulate shuttle movement to pickup/destination
- Real-time ride status updates
- Visual feedback for proximity zones

## Future Enhancements
- Real GPS integration
- Map visualization with live tracking
- Push notifications
- User authentication
- Ride history and analytics
- Multiple shuttle fleet management
- Route optimization algorithms
- Database persistence
