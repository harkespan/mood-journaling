<template>
  <div class="history-view">
    <div class="container">
      <div class="header">
        <h1>📖 Your Mood History</h1>
        <p>{{ getHeaderDescription() }}</p>
      </div>

      <!-- Filter Controls -->
      <div class="filter-controls">
        <div class="filter-tabs">
          <button 
            class="filter-tab"
            :class="{ active: activeFilter === 'recent' }"
            @click="setFilter('recent')"
          >
            📅 Last 7 Days
          </button>
          <button 
            class="filter-tab"
            :class="{ active: activeFilter === 'range' }"
            @click="setFilter('range')"
          >
            📆 Date Range
          </button>
          <button 
            class="filter-tab"
            :class="{ active: activeFilter === 'month' }"
            @click="setFilter('month')"
          >
            🗓️ By Month
          </button>
          <button 
            class="filter-tab"
            :class="{ active: activeFilter === 'year' }"
            @click="setFilter('year')"
          >
            📊 By Year
          </button>
        </div>

        <!-- Date Range Filter -->
        <div v-if="activeFilter === 'range'" class="date-range-filter">
          <div class="date-inputs">
            <div class="date-input-group">
              <label>From:</label>
              <input type="date" v-model="dateRange.start" @change="applyDateRangeFilter">
            </div>
            <div class="date-input-group">
              <label>To:</label>
              <input type="date" v-model="dateRange.end" @change="applyDateRangeFilter">
            </div>
          </div>
        </div>

        <!-- Month Filter -->
        <div v-if="activeFilter === 'month'" class="month-filter">
          <select v-model="selectedMonth" @change="applyMonthFilter" class="month-select">
            <option value="">Select Month</option>
            <option 
              v-for="month in availableMonths" 
              :key="month" 
              :value="month"
            >
              {{ formatMonthOption(month) }}
            </option>
          </select>
        </div>

        <!-- Year Filter -->
        <div v-if="activeFilter === 'year'" class="year-filter">
          <select v-model="selectedYear" @change="applyYearFilter" class="year-select">
            <option value="">Select Year</option>
            <option 
              v-for="year in availableYears" 
              :key="year" 
              :value="year"
            >
              {{ year }}
            </option>
          </select>
        </div>

        <!-- Entries Count & Clear Filter -->
        <div v-if="entries.length > 0" class="filter-info">
          <span class="entries-count">{{ entries.length }} entries found</span>
          <button 
            v-if="activeFilter !== 'recent'" 
            @click="clearFilter" 
            class="clear-filter-btn"
          >
            ✕ Clear Filter
          </button>
        </div>
      </div>

      <!-- AI Summary (always show, even with no entries for empty state) -->
      <MoodSummary :summary="aiSummary" />

      <div v-if="entries.length === 0" class="empty-state">
        <div class="empty-icon">📝</div>
        <h3>{{ getEmptyStateTitle() }}</h3>
        <p>{{ getEmptyStateMessage() }}</p>
        <router-link to="/" class="cta-button">Write Your First Entry</router-link>
      </div>

      <div v-else class="entries-list">
        <div 
          v-for="entry in entries" 
          :key="entry.id"
          class="entry-card"
          @click="toggleEntry(entry.id)"
        >
          <div class="entry-header">
            <div class="entry-date">
              <span class="mood-emoji">{{ getMoodEmoji(entry.mood) }}</span>
              <div class="date-info">
                <div class="date-main">{{ formatDate(entry.date) }}</div>
                <div class="date-sub">{{ formatDateRelative(entry.date) }}</div>
              </div>
            </div>
            <div class="expand-icon" :class="{ expanded: expandedEntries.includes(entry.id) }">
              ▼
            </div>
          </div>
          
          <div v-if="expandedEntries.includes(entry.id)" class="entry-content">
            <div class="mood-info">
              <strong>Mood:</strong> {{ getMoodName(entry.mood) }} {{ getMoodEmoji(entry.mood) }}
            </div>
            <div class="story-content">
              <strong>Story:</strong>
              <p>{{ entry.story }}</p>
            </div>
            <div class="entry-meta">
              <small>Saved on {{ formatDateTime(entry.timestamp) }}</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moodService from '../services/moodService.js'
import aiInsights from '../services/aiInsights.js'
import MoodSummary from '../components/MoodSummary.vue'

export default {
  name: 'HistoryView',
  components: {
    MoodSummary
  },
  data() {
    return {
      entries: [],
      expandedEntries: [],
      activeFilter: 'recent', // 'recent', 'range', 'month', 'year'
      dateRange: {
        start: '',
        end: ''
      },
      selectedMonth: '',
      selectedYear: '',
      availableMonths: [],
      availableYears: [],
      aiSummary: null
    }
  },
  created() {
    this.initializeFilters();
    this.loadEntries();
  },
  methods: {
    initializeFilters() {
      // Set default date range to today
      const today = new Date();
      const weekAgo = new Date();
      weekAgo.setDate(today.getDate() - 6);
      
      this.dateRange.start = this.formatDateForInput(weekAgo);
      this.dateRange.end = this.formatDateForInput(today);
      
      // Load available months and years
      this.availableMonths = moodService.getAvailableMonths();
      this.availableYears = moodService.getAvailableYears();
    },

    loadEntries() {
      // Load entries based on active filter
      switch (this.activeFilter) {
        case 'recent':
          this.entries = moodService.getEntriesForLastDays(7);
          break;
        case 'range':
          if (this.dateRange.start && this.dateRange.end) {
            this.entries = moodService.getEntriesByDateRange(
              this.dateRange.start, 
              this.dateRange.end
            );
          } else {
            this.entries = [];
          }
          break;
        case 'month':
          if (this.selectedMonth) {
            const [year, month] = this.selectedMonth.split('-');
            this.entries = moodService.getEntriesForMonth(
              parseInt(year), 
              parseInt(month)
            );
          } else {
            this.entries = [];
          }
          break;
        case 'year':
          if (this.selectedYear) {
            this.entries = moodService.getEntriesForYear(parseInt(this.selectedYear));
          } else {
            this.entries = [];
          }
          break;
        default:
          this.entries = moodService.getEntriesForLastDays(7);
      }
      
      // Generate AI summary after loading entries
      this.generateAISummary();
    },

    generateAISummary() {
      const timeframe = this.getTimeframeForAI();
      this.aiSummary = aiInsights.generateMoodSummary(this.entries, timeframe);
    },

    getTimeframeForAI() {
      switch (this.activeFilter) {
        case 'recent':
          return 'week';
        case 'range':
          return 'range';
        case 'month':
          return 'month';
        case 'year':
          return 'year';
        default:
          return 'recent';
      }
    },

    setFilter(filterType) {
      this.activeFilter = filterType;
      this.expandedEntries = []; // Collapse all entries when changing filter
      this.loadEntries();
    },

    applyDateRangeFilter() {
      if (this.dateRange.start && this.dateRange.end) {
        this.loadEntries();
      }
    },

    applyMonthFilter() {
      this.loadEntries();
    },

    applyYearFilter() {
      this.loadEntries();
    },

    clearFilter() {
      this.activeFilter = 'recent';
      this.selectedMonth = '';
      this.selectedYear = '';
      this.dateRange.start = this.formatDateForInput(new Date(Date.now() - 6 * 24 * 60 * 60 * 1000));
      this.dateRange.end = this.formatDateForInput(new Date());
      this.loadEntries();
    },

    formatDateForInput(date) {
      return date.toISOString().split('T')[0];
    },

    formatMonthOption(monthKey) {
      const [year, month] = monthKey.split('-');
      const monthName = moodService.getMonthName(parseInt(month));
      return `${monthName} ${year}`;
    },

    getHeaderDescription() {
      switch (this.activeFilter) {
        case 'recent':
          return 'Showing your mood entries from the last 7 days';
        case 'range':
          if (this.dateRange.start && this.dateRange.end) {
            return `Showing entries from ${moodService.formatDateRange(this.dateRange.start, this.dateRange.end)}`;
          }
          return 'Select a date range to view your entries';
        case 'month':
          if (this.selectedMonth) {
            return `Showing entries for ${this.formatMonthOption(this.selectedMonth)}`;
          }
          return 'Select a month to view your entries';
        case 'year':
          if (this.selectedYear) {
            return `Showing entries for ${this.selectedYear}`;
          }
          return 'Select a year to view your entries';
        default:
          return 'Look back at your mood journey';
      }
    },

    getEmptyStateTitle() {
      if (this.activeFilter === 'recent') {
        return 'No entries in the last 7 days';
      } else {
        return 'No entries found';
      }
    },

    getEmptyStateMessage() {
      switch (this.activeFilter) {
        case 'recent':
          return 'Start tracking your mood daily to see your recent history here!';
        case 'range':
          return 'No entries found in the selected date range. Try a different range or start writing!';
        case 'month':
          return 'No entries found for the selected month. Try a different month or start writing!';
        case 'year':
          return 'No entries found for the selected year. Try a different year or start writing!';
        default:
          return 'Start tracking your mood to see your history here!';
      }
    },
    
    toggleEntry(entryId) {
      const index = this.expandedEntries.indexOf(entryId);
      if (index > -1) {
        this.expandedEntries.splice(index, 1);
      } else {
        this.expandedEntries.push(entryId);
      }
    },
    
    getMoodEmoji(moodValue) {
      const moodOptions = moodService.getMoodOptions();
      const mood = moodOptions.find(m => m.value === moodValue);
      return mood ? mood.emoji : '😊';
    },
    
    getMoodName(moodValue) {
      const moodOptions = moodService.getMoodOptions();
      const mood = moodOptions.find(m => m.value === moodValue);
      return mood ? mood.name : 'Unknown';
    },
    
    formatDate(dateString) {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    },
    
    formatDateRelative(dateString) {
      const date = new Date(dateString);
      const today = new Date();
      const diffTime = today - date;
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays === 0) return 'Today';
      if (diffDays === 1) return 'Yesterday';
      if (diffDays < 7) return `${diffDays} days ago`;
      if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
      return `${Math.floor(diffDays / 30)} months ago`;
    },
    
    formatDateTime(timestamp) {
      const date = new Date(timestamp);
      return date.toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    }
  }
}
</script>

<style scoped>
.history-view {
  min-height: calc(100vh - 80px);
  padding: 20px;
}

.container {
  max-width: 800px;
  margin: 0 auto;
}

.header {
  text-align: center;
  margin-bottom: 40px;
}

.header h1 {
  color: #333;
  margin-bottom: 10px;
  font-size: 2em;
  font-weight: 600;
}

.header p {
  color: #666;
  font-size: 1.1em;
}

/* Filter Controls Styling */
.filter-controls {
  background: white;
  border-radius: 15px;
  padding: 25px;
  margin-bottom: 30px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
}

.filter-tabs {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.filter-tab {
  background: #f8f9fa;
  border: 2px solid #e9ecef;
  color: #666;
  padding: 10px 20px;
  border-radius: 25px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s ease;
  font-size: 0.9em;
}

.filter-tab:hover {
  border-color: #667eea;
  color: #667eea;
  background: rgba(102, 126, 234, 0.05);
}

.filter-tab.active {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-color: #667eea;
  color: white;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.25);
}

/* Date Range Filter */
.date-range-filter {
  margin-top: 15px;
  animation: slideDown 0.3s ease;
}

.date-inputs {
  display: flex;
  gap: 20px;
  align-items: end;
}

.date-input-group {
  flex: 1;
}

.date-input-group label {
  display: block;
  color: #666;
  font-weight: 500;
  margin-bottom: 5px;
  font-size: 0.9em;
}

.date-input-group input[type="date"] {
  width: 100%;
  padding: 12px;
  border: 2px solid #e0e0e0;
  border-radius: 10px;
  font-size: 14px;
  transition: border-color 0.3s ease;
}

.date-input-group input[type="date"]:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

/* Month and Year Filters */
.month-filter,
.year-filter {
  margin-top: 15px;
  animation: slideDown 0.3s ease;
}

.month-select,
.year-select {
  width: 100%;
  max-width: 300px;
  padding: 12px 15px;
  border: 2px solid #e0e0e0;
  border-radius: 10px;
  font-size: 14px;
  background: white;
  cursor: pointer;
  transition: border-color 0.3s ease;
}

.month-select:focus,
.year-select:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

/* Filter Info */
.filter-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  padding-top: 15px;
  border-top: 1px solid #f0f0f0;
}

.entries-count {
  color: #666;
  font-weight: 500;
  font-size: 0.9em;
}

.clear-filter-btn {
  background: none;
  border: 1px solid #dc3545;
  color: #dc3545;
  padding: 8px 15px;
  border-radius: 20px;
  cursor: pointer;
  font-size: 0.85em;
  font-weight: 500;
  transition: all 0.3s ease;
}

.clear-filter-btn:hover {
  background: #dc3545;
  color: white;
  transform: translateY(-1px);
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.empty-state {
  text-align: center;
  padding: 60px 20px;
  background: white;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
}

.empty-icon {
  font-size: 4em;
  margin-bottom: 20px;
}

.empty-state h3 {
  color: #333;
  margin-bottom: 10px;
  font-size: 1.5em;
}

.empty-state p {
  color: #666;
  margin-bottom: 30px;
  font-size: 1.1em;
}

.cta-button {
  display: inline-block;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  text-decoration: none;
  padding: 15px 30px;
  border-radius: 25px;
  font-weight: 600;
  transition: transform 0.3s ease;
}

.cta-button:hover {
  transform: translateY(-2px);
}

.entries-list {
  space-y: 15px;
}

.entry-card {
  background: white;
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
  margin-bottom: 15px;
  cursor: pointer;
  transition: all 0.3s ease;
  overflow: hidden;
}

.entry-card:hover {
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.12);
  transform: translateY(-2px);
}

.entry-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
}

.entry-date {
  display: flex;
  align-items: center;
  gap: 15px;
}

.mood-emoji {
  font-size: 2.5em;
  display: block;
}

.date-info {
  line-height: 1.3;
}

.date-main {
  font-weight: 600;
  color: #333;
  font-size: 1.1em;
}

.date-sub {
  color: #666;
  font-size: 0.9em;
}

.expand-icon {
  color: #999;
  transition: transform 0.3s ease;
  font-size: 1.2em;
}

.expand-icon.expanded {
  transform: rotate(180deg);
}

.entry-content {
  padding: 0 20px 20px 20px;
  border-top: 1px solid #f0f0f0;
  animation: slideDown 0.3s ease;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.mood-info {
  margin: 15px 0;
  color: #333;
}

.story-content {
  margin: 15px 0;
  color: #333;
}

.story-content p {
  margin: 8px 0 0 0;
  line-height: 1.6;
  color: #555;
  background: #f8f9fa;
  padding: 15px;
  border-radius: 10px;
  border-left: 4px solid #667eea;
}

.entry-meta {
  margin-top: 15px;
  color: #999;
  font-size: 0.85em;
}

@media (max-width: 768px) {
  .history-view {
    padding: 15px;
  }
  
  .header h1 {
    font-size: 1.6em;
  }
  
  .filter-controls {
    padding: 20px;
  }
  
  .filter-tabs {
    gap: 8px;
  }
  
  .filter-tab {
    font-size: 0.85em;
    padding: 8px 15px;
  }
  
  .date-inputs {
    flex-direction: column;
    gap: 15px;
  }
  
  .filter-info {
    flex-direction: column;
    gap: 10px;
    align-items: stretch;
  }
  
  .clear-filter-btn {
    align-self: center;
  }
  
  .entry-header {
    padding: 15px;
  }
  
  .mood-emoji {
    font-size: 2em;
  }
  
  .entry-date {
    gap: 12px;
  }
  
  .entry-content {
    padding: 0 15px 15px 15px;
  }
}

@media (max-width: 480px) {
  .filter-tabs {
    flex-direction: column;
    gap: 8px;
  }
  
  .filter-tab {
    text-align: center;
  }
  
  .date-input-group input[type="date"],
  .month-select,
  .year-select {
    font-size: 16px; /* Prevents zoom on iOS */
  }
}
</style>