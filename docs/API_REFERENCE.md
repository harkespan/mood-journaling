# 📚 API Reference

Dokumentasi lengkap untuk services, components, dan methods yang tersedia dalam aplikasi Mood Journal.

## 🔐 AuthService API

**File:** `src/services/auth.js`

### Methods

#### `init(): Promise<void>`
Menginisialisasi Google OAuth SDK dan konfigurasi authentication.

```javascript
await authService.init();
```

**Returns:** Promise yang resolve ketika initialization selesai  
**Throws:** Error jika Google SDK gagal dimuat atau initialized  
**Side Effects:** Memuat Google OAuth script ke DOM

---

#### `renderSignInButton(element: HTMLElement): void`
Render tombol Google Sign-In di element yang ditentukan.

```javascript
const buttonContainer = document.getElementById('signin-button');
authService.renderSignInButton(buttonContainer);
```

**Parameters:**
- `element` - DOM element tempat tombol akan di-render

**Requires:** `init()` harus sudah dipanggil sebelumnya  
**Side Effects:** Membuat tombol Google OAuth di DOM

---

#### `handleCredentialResponse(response: Object): void`
**Internal method** - Menangani response dari Google OAuth setelah user login.

```javascript
// Otomatis dipanggil oleh Google OAuth
// Tidak perlu dipanggil manual
```

**Parameters:**
- `response.credential` - JWT token dari Google

**Side Effects:** 
- Update `currentUser`
- Simpan user data ke localStorage
- Trigger event `userLoggedIn`

---

#### `getCurrentUser(): Object | null`
Mengambil informasi user yang sedang login.

```javascript
const user = authService.getCurrentUser();
if (user) {
  console.log(user.name, user.email);
}
```

**Returns:**
```javascript
{
  id: "google-user-id",
  name: "John Doe",
  email: "john@example.com", 
  picture: "https://lh3.googleusercontent.com/..."
} | null
```

---

#### `isLoggedIn(): boolean`
Cek apakah user sedang dalam status login.

```javascript
if (authService.isLoggedIn()) {
  // Show authenticated content
} else {
  // Show login page
}
```

**Returns:** `true` jika user sudah login, `false` jika belum

---

#### `signOut(): void`
Logout user dan bersihkan session data.

```javascript
authService.signOut();
// User akan di-redirect ke login page
```

**Side Effects:**
- Clear `currentUser`
- Remove user data dari localStorage
- Trigger event `userLoggedOut`

---

### Events

#### `userLoggedIn`
Event yang di-trigger setelah user berhasil login.

```javascript
window.addEventListener('userLoggedIn', (event) => {
  const userData = event.detail;
  console.log('User logged in:', userData);
});
```

**Event Detail:** User object dengan id, name, email, picture

---

#### `userLoggedOut`  
Event yang di-trigger setelah user logout.

```javascript
window.addEventListener('userLoggedOut', () => {
  console.log('User logged out');
  // Redirect to login or update UI
});
```

**Event Detail:** None

---

## 😊 MoodService API

**File:** `src/services/moodService.js`

### Methods

#### `getMoodOptions(): Array<MoodOption>`
Mengambil daftar mood yang tersedia untuk dipilih user.

```javascript
const moods = moodService.getMoodOptions();
moods.forEach(mood => {
  console.log(mood.emoji, mood.name, mood.value);
});
```

**Returns:**
```javascript
[
  { emoji: '😊', name: 'Happy', value: 'happy' },
  { emoji: '😢', name: 'Sad', value: 'sad' },
  { emoji: '😡', name: 'Angry', value: 'angry' },
  { emoji: '😴', name: 'Tired', value: 'tired' },
  { emoji: '😎', name: 'Cool', value: 'cool' },
  { emoji: '😰', name: 'Anxious', value: 'anxious' },
  { emoji: '🥳', name: 'Excited', value: 'excited' },
  { emoji: '😌', name: 'Calm', value: 'calm' }
]
```

---

#### `saveEntry(mood: string, story: string): MoodEntry`
Menyimpan atau update mood entry untuk hari ini.

```javascript
try {
  const entry = moodService.saveEntry('happy', 'Today was amazing!');
  console.log('Entry saved:', entry);
} catch (error) {
  console.error('Failed to save:', error);
}
```

**Parameters:**
- `mood` - Mood value (harus salah satu dari mood options)
- `story` - Journal text (max 1000 characters)

**Returns:** MoodEntry object yang tersimpan  
**Throws:** Error jika gagal menyimpan ke localStorage

**Validation:**
- Mood value harus valid
- Story tidak boleh kosong
- Story max 1000 karakter

**Behavior:**
- Jika sudah ada entry hari ini, akan di-update
- Jika belum ada, akan dibuat entry baru
- Entry di-sort by date (terbaru di atas)

---

#### `getAllEntries(): Array<MoodEntry>`
Mengambil semua mood entries yang tersimpan, diurutkan by date terbaru.

```javascript
const entries = moodService.getAllEntries();
console.log(`Total entries: ${entries.length}`);
```

**Returns:**
```javascript
[
  {
    id: 1642248600000,
    date: "2024-01-15",
    mood: "happy", 
    story: "Today was amazing!",
    timestamp: "2024-01-15T10:30:00.000Z"
  },
  // ... more entries
]
```

**Returns:** Array kosong `[]` jika tidak ada entries atau error

---

#### `getTodayEntry(): MoodEntry | null`
Mengambil mood entry untuk hari ini (jika ada).

```javascript
const todayEntry = moodService.getTodayEntry();
if (todayEntry) {
  console.log('Today mood:', todayEntry.mood);
  console.log('Today story:', todayEntry.story);
} else {
  console.log('No entry for today yet');
}
```

**Returns:** MoodEntry untuk hari ini atau `null` jika belum ada

---

#### `getEntriesByDate(date: Date): Array<MoodEntry>`
Mengambil entries untuk tanggal tertentu.

```javascript
const specificDate = new Date('2024-01-15');
const entries = moodService.getEntriesByDate(specificDate);
```

**Parameters:**
- `date` - Date object untuk tanggal yang dicari

**Returns:** Array of MoodEntry untuk tanggal tersebut

---

#### `deleteEntry(id: number): boolean`
Menghapus entry berdasarkan ID.

```javascript
const success = moodService.deleteEntry(1642248600000);
if (success) {
  console.log('Entry deleted successfully');
} else {
  console.log('Failed to delete entry');
}
```

**Parameters:**
- `id` - Entry ID (timestamp)

**Returns:** `true` jika berhasil dihapus, `false` jika gagal

---

#### `formatDate(date: Date): string`
**Utility method** - Format Date object ke string YYYY-MM-DD.

```javascript
const dateString = moodService.formatDate(new Date());
console.log(dateString); // "2024-01-15"
```

**Parameters:**
- `date` - Date object yang akan diformat

**Returns:** Date string dalam format YYYY-MM-DD

---

#### `getEntriesGroupedByMonth(): Object`
Mengambil entries yang di-group berdasarkan bulan.

```javascript
const grouped = moodService.getEntriesGroupedByMonth();
console.log(grouped);
// {
//   "2024-01": [entry1, entry2, ...],
//   "2023-12": [entry3, entry4, ...]
// }
```

**Returns:** Object dengan key bulan (YYYY-MM) dan value array entries

---

## 🧩 Component Props & Events

### MoodSelector.vue

#### Props
```javascript
{
  modelValue: {
    type: String,
    required: false,
    default: null
  }
}
```

#### Events
```javascript
{
  'update:modelValue': String  // Selected mood value
}
```

#### Usage
```vue
<template>
  <MoodSelector v-model="selectedMood" />
</template>

<script>
data() {
  return {
    selectedMood: 'happy'
  }
}
</script>
```

---

### JournalEntry.vue

#### Props
```javascript
{
  modelValue: {
    type: String,
    required: false,
    default: ''
  }
}
```

#### Events
```javascript
{
  'update:modelValue': String  // Journal text content
}
```

#### Usage
```vue
<template>
  <JournalEntry v-model="journalText" />
</template>

<script>
data() {
  return {
    journalText: 'Today was...'
  }
}
</script>
```

---

## 🌐 Router API

**File:** `src/router/index.js`

### Routes

#### `/` - HomeView
Halaman utama untuk input mood dan journal hari ini.

```javascript
// Navigasi programmatic
this.$router.push('/');

// Dalam template  
<router-link to="/">Today</router-link>
```

---

#### `/history` - HistoryView
Halaman untuk melihat riwayat mood entries.

```javascript
// Navigasi programmatic
this.$router.push('/history');

// Dalam template
<router-link to="/history">History</router-link>
```

---

## 💾 LocalStorage Schema

### Keys Used

#### `'user'`
Menyimpan informasi user yang login.

**Value:**
```javascript
{
  "id": "google-user-id",
  "name": "John Doe", 
  "email": "john@example.com",
  "picture": "https://avatar-url.jpg"
}
```

---

#### `'moodEntries'`  
Menyimpan array semua mood entries.

**Value:**
```javascript
[
  {
    "id": 1642248600000,           // Timestamp sebagai unique ID
    "date": "2024-01-15",          // YYYY-MM-DD format
    "mood": "happy",               // Mood value
    "story": "Today was amazing!", // Journal text
    "timestamp": "2024-01-15T10:30:00.000Z"  // Full ISO datetime
  }
  // ... more entries
]
```

---

## 🔧 Utility Functions

### Date Formatting

#### `formatDate(date: Date): string`
```javascript
const today = new Date();
const formatted = moodService.formatDate(today);
// Returns: "2024-01-15"
```

#### `formatDateRelative(dateString: string): string`
**Component internal function** - Convert date to relative format.

```javascript
// In HistoryView.vue
formatDateRelative("2024-01-15")
// Returns: "Today" | "Yesterday" | "3 days ago" | etc.
```

#### `formatDateTime(timestamp: string): string` 
**Component internal function** - Format full datetime for display.

```javascript
// In HistoryView.vue
formatDateTime("2024-01-15T10:30:00.000Z")
// Returns: "Jan 15, 2024, 10:30 AM"
```

---

## 🎨 CSS Classes Reference

### Global Styles

#### Layout Classes
- `.container` - Max-width content container
- `.main-content` - Main content area
- `.main-nav` - Top navigation bar

#### Button Classes
- `.save-button` - Primary action button with gradient
- `.logout-button` - Secondary button with border
- `.cta-button` - Call-to-action button for empty states

#### State Classes
- `.active` - Active/selected state
- `.loading` - Loading state with disabled interaction
- `.disabled` - Disabled state

### Component-Specific Styles

#### Mood Selector
- `.mood-grid` - Grid layout for mood options
- `.mood-item` - Individual mood selection item
- `.mood-emoji` - Emoji display in mood items

#### History View
- `.entry-card` - Container for each history entry
- `.entry-header` - Entry header with date and mood
- `.entry-content` - Expandable content area
- `.expand-icon` - Chevron icon for expand/collapse

---

## 🔍 Error Handling

### Common Error Types

#### Authentication Errors
```javascript
// Google OAuth initialization failed
try {
  await authService.init();
} catch (error) {
  console.error('Auth init failed:', error);
  // Show fallback UI or retry mechanism
}
```

#### Data Persistence Errors
```javascript  
// LocalStorage save failed
try {
  const entry = moodService.saveEntry(mood, story);
} catch (error) {
  console.error('Save failed:', error);
  // Show error message to user
}
```

#### Validation Errors
```javascript
// Invalid input validation
if (!selectedMood || !journalStory.trim()) {
  throw new Error('Mood and story are required');
}
```

### Error Recovery Strategies
- **Graceful degradation**: Show error messages but keep app functional
- **Retry mechanisms**: Allow user to retry failed operations  
- **Fallback UI**: Show alternative content when data fails to load
- **User feedback**: Clear error messages with actionable steps

---

## 📱 Browser Compatibility

### Supported Features
- **ES6+ JavaScript**: Modern syntax support required
- **CSS3**: Grid, Flexbox, gradients, transitions
- **LocalStorage**: Required for data persistence
- **Fetch API**: For Google OAuth (polyfill available)

### Minimum Browser Versions
- **Chrome**: 90+
- **Firefox**: 88+ 
- **Safari**: 14+
- **Edge**: 90+

---

Dokumentasi ini mencakup semua API yang tersedia dalam aplikasi. Untuk implementasi detail atau contoh penggunaan lebih lanjut, lihat source code di folder `src/`.