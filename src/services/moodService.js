// Mood Service for managing mood entries
class MoodService {
  constructor() {
    this.storageKey = 'moodEntries';
  }

  // Get all mood entries
  getAllEntries() {
    try {
      const stored = localStorage.getItem(this.storageKey);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Failed to get entries:', error);
      return [];
    }
  }

  // Get entries for a specific date
  getEntriesByDate(date) {
    const entries = this.getAllEntries();
    const dateString = this.formatDate(date);
    return entries.filter(entry => entry.date === dateString);
  }

  // Get entry for today
  getTodayEntry() {
    const today = new Date();
    const entries = this.getEntriesByDate(today);
    return entries.length > 0 ? entries[0] : null;
  }

  // Save mood entry
  saveEntry(mood, story) {
    try {
      const entries = this.getAllEntries();
      const today = new Date();
      const dateString = this.formatDate(today);
      
      // Remove existing entry for today if any
      const filteredEntries = entries.filter(entry => entry.date !== dateString);
      
      // Add new entry
      const newEntry = {
        id: Date.now(),
        date: dateString,
        mood: mood,
        story: story,
        timestamp: today.toISOString()
      };
      
      filteredEntries.push(newEntry);
      
      // Sort by date (newest first)
      filteredEntries.sort((a, b) => new Date(b.date) - new Date(a.date));
      
      localStorage.setItem(this.storageKey, JSON.stringify(filteredEntries));
      return newEntry;
    } catch (error) {
      console.error('Failed to save entry:', error);
      throw error;
    }
  }

  // Delete entry
  deleteEntry(id) {
    try {
      const entries = this.getAllEntries();
      const filteredEntries = entries.filter(entry => entry.id !== id);
      localStorage.setItem(this.storageKey, JSON.stringify(filteredEntries));
      return true;
    } catch (error) {
      console.error('Failed to delete entry:', error);
      return false;
    }
  }

  // Format date to YYYY-MM-DD
  formatDate(date) {
    return date.toISOString().split('T')[0];
  }

  // Get mood emoji options
  getMoodOptions() {
    return [
      { emoji: '😊', name: 'Happy', value: 'happy' },
      { emoji: '😢', name: 'Sad', value: 'sad' },
      { emoji: '😡', name: 'Angry', value: 'angry' },
      { emoji: '😴', name: 'Tired', value: 'tired' },
      { emoji: '😎', name: 'Cool', value: 'cool' },
      { emoji: '😰', name: 'Anxious', value: 'anxious' },
      { emoji: '🥳', name: 'Excited', value: 'excited' },
      { emoji: '😌', name: 'Calm', value: 'calm' }
    ];
  }

  // Get entries for last N days (default 7 days)
  getEntriesForLastDays(days = 7) {
    const entries = this.getAllEntries();
    const today = new Date();
    const startDate = new Date(today);
    startDate.setDate(today.getDate() - days + 1); // Include today
    
    return entries.filter(entry => {
      const entryDate = new Date(entry.date);
      return entryDate >= startDate && entryDate <= today;
    });
  }

  // Get entries by date range
  getEntriesByDateRange(startDate, endDate) {
    const entries = this.getAllEntries();
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    return entries.filter(entry => {
      const entryDate = new Date(entry.date);
      return entryDate >= start && entryDate <= end;
    });
  }

  // Get entries for specific month and year
  getEntriesForMonth(year, month) {
    const entries = this.getAllEntries();
    
    return entries.filter(entry => {
      const entryDate = new Date(entry.date);
      return entryDate.getFullYear() === year && entryDate.getMonth() === (month - 1);
    });
  }

  // Get entries for specific year
  getEntriesForYear(year) {
    const entries = this.getAllEntries();
    
    return entries.filter(entry => {
      const entryDate = new Date(entry.date);
      return entryDate.getFullYear() === year;
    });
  }

  // Get available months with entries
  getAvailableMonths() {
    const entries = this.getAllEntries();
    const months = new Set();
    
    entries.forEach(entry => {
      const date = new Date(entry.date);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      months.add(monthKey);
    });
    
    return Array.from(months).sort().reverse(); // Latest first
  }

  // Get available years with entries
  getAvailableYears() {
    const entries = this.getAllEntries();
    const years = new Set();
    
    entries.forEach(entry => {
      const date = new Date(entry.date);
      years.add(date.getFullYear());
    });
    
    return Array.from(years).sort().reverse(); // Latest first
  }

  // Get entries grouped by month for history view
  getEntriesGroupedByMonth() {
    const entries = this.getAllEntries();
    const grouped = {};
    
    entries.forEach(entry => {
      const date = new Date(entry.date);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      
      if (!grouped[monthKey]) {
        grouped[monthKey] = [];
      }
      grouped[monthKey].push(entry);
    });
    
    return grouped;
  }

  // Helper: Get month name from month number
  getMonthName(monthNumber) {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return months[monthNumber - 1];
  }

  // Helper: Format date range for display
  formatDateRange(startDate, endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    const startFormatted = start.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    });
    const endFormatted = end.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
    
    return `${startFormatted} - ${endFormatted}`;
  }
}

export default new MoodService();