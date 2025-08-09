# 🏗️ Architecture Overview

Dokumentasi arsitektur dan struktur kode aplikasi Mood Journal.

## 🎯 Arsitektur Aplikasi

### High-Level Architecture
```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Authentication │    │   Data Storage  │
│   (Vue.js)      │◄──►│   (Google OAuth) │    │  (LocalStorage) │
│                 │    │                  │    │                 │
└─────────────────┘    └──────────────────┘    └─────────────────┘
```

### Technology Stack
- **Frontend Framework**: Vue.js 3 (Composition API)
- **Routing**: Vue Router 4
- **Build Tool**: Vite 7
- **Authentication**: Google OAuth 2.0
- **Data Persistence**: Browser LocalStorage
- **Styling**: CSS3 dengan responsive design

## 📁 Project Structure

```
mood-journaling/
├── docs/                    # 📚 Documentation files
│   ├── README.md            # Project overview
│   ├── SETUP.md             # Setup instructions  
│   ├── USER_GUIDE.md        # User manual
│   ├── ARCHITECTURE.md      # This file
│   ├── API_REFERENCE.md     # API documentation
│   └── DEPLOYMENT.md        # Deployment guide
├── public/                  # 🌐 Static assets
│   └── favicon.ico          # App icon
├── src/                     # 💻 Source code
│   ├── components/          # 🧩 Reusable Vue components
│   │   ├── LoginPage.vue    # Authentication page
│   │   ├── MoodSelector.vue # Mood selection UI
│   │   ├── JournalEntry.vue # Journal text input
│   │   └── MoodSummary.vue  # AI insights display
│   ├── views/               # 📄 Page-level components
│   │   ├── HomeView.vue     # Main dashboard
│   │   └── HistoryView.vue  # History browser
│   ├── services/            # 🔧 Business logic layer
│   │   ├── auth.js          # Authentication service
│   │   ├── moodService.js   # Mood data service
│   │   └── aiInsights.js    # AI analysis service
│   ├── router/              # 🛣️ Routing configuration
│   │   └── index.js         # Route definitions
│   ├── App.vue              # 🏠 Root component
│   └── main.js              # 🚪 Application entry point
├── package.json             # 📦 Dependencies & scripts
├── vite.config.js           # ⚙️ Vite configuration
└── index.html               # 🌍 HTML template
```

## 🧩 Component Architecture

### Component Hierarchy
```
App.vue                          # Root application
├── LoginPage.vue               # Shown when not authenticated
└── Main App Layout             # Shown when authenticated
    ├── Navigation Bar          # Top navigation
    └── Router View             # Dynamic content area
        ├── HomeView.vue        # Today's mood entry
        │   ├── MoodSelector.vue
        │   └── JournalEntry.vue
        └── HistoryView.vue     # Past entries browser
```

### Component Communication
- **Props Down**: Parent → Child data flow
- **Events Up**: Child → Parent communication  
- **Service Layer**: Shared business logic
- **Local Storage**: Persistent data across sessions

## 🔧 Service Layer Architecture

### AuthService (`src/services/auth.js`)
```javascript
class AuthService {
  // Google OAuth integration
  init()                    // Initialize Google SDK
  renderSignInButton()      // Render login button
  handleCredentialResponse() // Process login callback
  getCurrentUser()          // Get current user info
  signOut()                 // Logout functionality
  isLoggedIn()             // Authentication state check
}
```

**Key Features:**
- Google OAuth 2.0 integration
- JWT token parsing
- User session management
- Event-driven authentication state
- LocalStorage persistence

### MoodService (`src/services/moodService.js`)
```javascript
class MoodService {
  // Mood data management
  getMoodOptions()          // Available mood types
  saveEntry()              // Save mood + journal entry
  getAllEntries()          // Retrieve all entries
  getTodayEntry()          // Get today's entry
  getEntriesByDate()       // Filter by specific date
  deleteEntry()            // Remove entry
  formatDate()             // Date formatting utilities
}
```

**Key Features:**
- CRUD operations for mood entries
- Date-based filtering and sorting
- LocalStorage abstraction
- Mood type definitions
- Data validation

### AIInsightsService (`src/services/aiInsights.js`)
```javascript
class AIInsightsService {
  // AI-powered analysis
  generateMoodSummary()     // Comprehensive mood analysis
  analyzeEntries()          // Statistical mood analysis
  analyzeTrends()           // Trend detection algorithms
  detectPatterns()          // Pattern recognition
  generateInsights()        // Natural language insights
  generateRecommendations() // Actionable suggestions
}
```

**Key Features:**
- Pure client-side AI analysis (no external APIs)
- Mood categorization (positive/negative/neutral)
- Statistical analysis with trend detection
- Pattern recognition (streaks, consistency)
- Natural language insight generation
- Personalized recommendations
- Real-time analysis based on filtered data

## 🎨 UI/UX Architecture

### Design System

#### Color Palette
```css
/* Primary gradient */
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);

/* Background gradient */
background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);

/* Text colors */
primary: #333333;
secondary: #666666;
muted: #999999;
```

#### Component States
- **Default**: Normal interactive state
- **Hover**: Subtle elevation and color change
- **Active**: Selected/pressed state with stronger styling
- **Disabled**: Grayed out with no interaction
- **Loading**: Animated state during async operations

#### Responsive Breakpoints
```css
/* Mobile first approach */
@media (max-width: 480px)  { /* Mobile */ }
@media (max-width: 768px)  { /* Tablet */ }
@media (max-width: 1024px) { /* Small desktop */ }
/* Default styles for larger screens */
```

### Animation & Transitions
- **Page transitions**: Smooth routing changes
- **Hover effects**: Subtle elevation (translateY(-2px))
- **Loading states**: Spinner animations
- **Expand/collapse**: Smooth height transitions
- **Button interactions**: Scale and shadow effects

## 💾 Data Architecture

### Data Models

#### User Model
```javascript
{
  id: "google-user-id",
  name: "John Doe", 
  email: "john@example.com",
  picture: "https://avatar-url.jpg"
}
```

#### Mood Entry Model
```javascript
{
  id: timestamp,           // Unique identifier
  date: "2024-01-15",     // YYYY-MM-DD format
  mood: "happy",          // Mood type value
  story: "Today was...",  // Journal text (max 1000 chars)
  timestamp: "2024-01-15T10:30:00.000Z"  // Full datetime
}
```

#### Mood Type Model
```javascript
{
  emoji: "😊",
  name: "Happy",
  value: "happy"
}
```

### Data Flow

#### Save Entry Flow
```
User Input → Validation → MoodService.saveEntry() → LocalStorage → UI Update
```

#### Load History Flow  
```
Component Mount → MoodService.getAllEntries() → LocalStorage → Sort by Date → Render List
```

#### Authentication Flow
```
Google Login → JWT Parse → User Object → LocalStorage → App State Update
```

### Storage Strategy

#### LocalStorage Structure
```javascript
// Key: 'moodEntries'
[
  {id: 1642248600000, date: "2024-01-15", mood: "happy", story: "...", timestamp: "..."},
  {id: 1642162200000, date: "2024-01-14", mood: "calm", story: "...", timestamp: "..."}
]

// Key: 'user'  
{id: "123", name: "John", email: "john@example.com", picture: "..."}
```

**Benefits of LocalStorage:**
- ✅ Fast access (no network requests)
- ✅ Works offline after initial load
- ✅ Simple implementation
- ✅ No backend server required

**Limitations:**
- ❌ Limited to ~5-10MB per domain
- ❌ Data tied to specific browser
- ❌ No cross-device sync
- ❌ User can clear data

## 🔐 Security Architecture

### Authentication Security
- **Google OAuth 2.0**: Industry-standard authentication
- **JWT tokens**: Secure user identity verification
- **Client-side validation**: Input sanitization and validation
- **No sensitive data storage**: Passwords handled by Google

### Data Security
- **Client-side only**: No server-side data storage
- **Browser sandbox**: Data isolated per domain
- **HTTPS required**: Secure data transmission (production)
- **Input validation**: Prevent XSS and injection attacks

### Privacy Considerations
- **Google permissions**: Only basic profile information
- **Local storage**: Data stays on user's device
- **No analytics**: No user tracking implemented
- **User control**: Easy logout and data remains local

## 🚀 Performance Architecture

### Loading Strategy
- **Code splitting**: Vue Router lazy loading
- **Bundle optimization**: Vite tree-shaking
- **CSS optimization**: Component-scoped styles
- **Image optimization**: Efficient emoji rendering

### Runtime Performance
- **Vue 3 reactivity**: Efficient DOM updates
- **LocalStorage**: Fast data access
- **Debounced inputs**: Prevent excessive updates
- **Lazy rendering**: History entries loaded on demand

### Build Optimization
```javascript
// vite.config.js optimizations
build: {
  rollupOptions: {
    output: {
      manualChunks: {
        vendor: ['vue', 'vue-router'],
        google: ['@google-cloud/local-auth', 'googleapis']
      }
    }
  }
}
```

## 🧪 Testing Architecture

### Component Testing Strategy
- **Unit tests**: Individual component logic
- **Integration tests**: Component interactions
- **E2E tests**: Full user workflows
- **Visual regression**: UI consistency checks

### Testing Tools (Recommended)
- **Vitest**: Unit testing framework
- **Vue Testing Library**: Component testing utilities
- **Playwright**: End-to-end testing
- **Cypress**: Alternative E2E framework

## 🔄 State Management

### Current Implementation: Composables Pattern
```javascript
// Reactive state without Vuex/Pinia
const authState = reactive({
  user: null,
  isLoggedIn: false
});

// Service-based state management
authService.getCurrentUser();
moodService.getAllEntries();
```

### Future Considerations
For larger applications, consider:
- **Pinia**: Vue 3 state management
- **Vuex**: Traditional Vue state management
- **Composables**: Custom reactive composables

## 🌐 Deployment Architecture

### Static Site Hosting
```
Source Code → Vite Build → Static Files → CDN Hosting
```

**Recommended Platforms:**
- **Netlify**: Easy deployment with git integration
- **Vercel**: Optimized for frontend frameworks
- **GitHub Pages**: Free hosting for public repos
- **Firebase Hosting**: Google integration benefits

### Environment Configuration
```javascript
// Production considerations
const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
const API_URL = import.meta.env.VITE_API_URL || 'localhost';
```

## 🔮 Scalability Considerations

### Current Limitations
- **Single user per browser**: No multi-user support
- **LocalStorage limits**: ~5MB data storage
- **No data sync**: Tied to specific device/browser
- **No real-time features**: Offline-first approach

### Future Scaling Options
- **Backend API**: User accounts and cloud storage
- **Database**: PostgreSQL or MongoDB for data persistence  
- **Real-time sync**: WebSocket for live updates
- **Mobile apps**: React Native or Flutter
- **Analytics**: User behavior tracking and insights

---

Arsitektur ini dirancang untuk kesederhanaan, performa, dan maintainability sambil memberikan foundation yang kuat untuk pengembangan future features.