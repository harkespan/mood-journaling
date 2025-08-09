<template>
  <div class="mood-summary">
    <div class="summary-card">
      <div class="summary-header">
        <div class="summary-icon">🧠</div>
        <div class="summary-title">
          <h3>AI Mood Insights</h3>
          <p v-if="summary.entryCount > 0" class="entry-count">
            Based on {{ summary.entryCount }} {{ summary.entryCount === 1 ? 'entry' : 'entries' }}
          </p>
        </div>
        <button 
          class="expand-toggle"
          @click="toggleExpanded"
          :class="{ expanded: isExpanded }"
        >
          <span class="expand-icon">▼</span>
        </button>
      </div>

      <div class="main-summary">
        <p class="summary-text">{{ summary.summary }}</p>
      </div>

      <div v-if="summary.entryCount > 0" class="mood-distribution">
        <div class="distribution-bars">
          <div class="distribution-bar">
            <div class="bar-label">
              <span class="mood-emoji">😊</span>
              <span class="mood-text">Positive</span>
              <span class="mood-percentage">{{ summary.analysis.percentages.positive }}%</span>
            </div>
            <div class="progress-bar">
              <div 
                class="progress-fill positive" 
                :style="{ width: summary.analysis.percentages.positive + '%' }"
              ></div>
            </div>
          </div>

          <div class="distribution-bar">
            <div class="bar-label">
              <span class="mood-emoji">😔</span>
              <span class="mood-text">Negative</span>
              <span class="mood-percentage">{{ summary.analysis.percentages.negative }}%</span>
            </div>
            <div class="progress-bar">
              <div 
                class="progress-fill negative" 
                :style="{ width: summary.analysis.percentages.negative + '%' }"
              ></div>
            </div>
          </div>

          <div class="distribution-bar">
            <div class="bar-label">
              <span class="mood-emoji">😐</span>
              <span class="mood-text">Neutral</span>
              <span class="mood-percentage">{{ summary.analysis.percentages.neutral }}%</span>
            </div>
            <div class="progress-bar">
              <div 
                class="progress-fill neutral" 
                :style="{ width: summary.analysis.percentages.neutral + '%' }"
              ></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Expanded Content -->
      <div v-if="isExpanded && summary.entryCount > 0" class="expanded-content">
        
        <!-- Detailed Insights -->
        <div v-if="summary.insights.length > 0" class="insights-section">
          <h4>📊 Detailed Insights</h4>
          <ul class="insights-list">
            <li v-for="(insight, index) in summary.insights" :key="index" class="insight-item">
              {{ insight }}
            </li>
          </ul>
        </div>

        <!-- Trend Analysis -->
        <div v-if="summary.trends && summary.trends.trend !== 'insufficient_data'" class="trends-section">
          <h4>📈 Trend Analysis</h4>
          <div class="trend-info">
            <div class="trend-direction">
              <span class="trend-icon">{{ getTrendIcon(summary.trends.trend) }}</span>
              <span class="trend-text">{{ getTrendText(summary.trends.trend, summary.trends.strength) }}</span>
            </div>
            <div v-if="summary.trends.streaks.longestStreak >= 3" class="streak-info">
              <strong>Longest streak:</strong> {{ summary.trends.streaks.longestStreak }} consecutive 
              {{ summary.trends.streaks.longestStreakCategory }} days
            </div>
          </div>
        </div>

        <!-- Most Frequent Mood -->
        <div class="frequent-mood-section">
          <h4>🎭 Mood Breakdown</h4>
          <div class="mood-stats">
            <div class="stat-item">
              <span class="stat-label">Most Frequent:</span>
              <span class="stat-value">{{ getMoodEmoji(summary.analysis.mostFrequentMood) }} {{ capitalizeFirst(summary.analysis.mostFrequentMood) }}</span>
            </div>
            <div class="stat-item">
              <span class="stat-label">Consistency:</span>
              <span class="stat-value">{{ getConsistencyText(summary.trends.consistency) }}</span>
            </div>
          </div>
        </div>

        <!-- Recommendations -->
        <div v-if="summary.recommendations.length > 0" class="recommendations-section">
          <h4>💡 Recommendations</h4>
          <div class="recommendations-list">
            <div 
              v-for="(rec, index) in summary.recommendations" 
              :key="index" 
              class="recommendation-item"
              :class="'recommendation-' + rec.type"
            >
              <span class="rec-icon">{{ rec.icon }}</span>
              <span class="rec-text">{{ rec.text }}</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import moodService from '../services/moodService.js'

export default {
  name: 'MoodSummary',
  props: {
    summary: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      isExpanded: false
    }
  },
  methods: {
    toggleExpanded() {
      this.isExpanded = !this.isExpanded;
    },

    getTrendIcon(trend) {
      const icons = {
        'improving': '📈',
        'declining': '📉',
        'stable': '➡️'
      };
      return icons[trend] || '➡️';
    },

    getTrendText(trend, strength) {
      const texts = {
        'improving': `Improving (${Math.round(strength)}% confidence)`,
        'declining': `Declining (${Math.round(strength)}% confidence)`,
        'stable': 'Stable pattern'
      };
      return texts[trend] || 'Stable pattern';
    },

    getMoodEmoji(mood) {
      const moodOptions = moodService.getMoodOptions();
      const moodOption = moodOptions.find(m => m.value === mood);
      return moodOption ? moodOption.emoji : '😊';
    },

    getConsistencyText(consistency) {
      if (consistency > 0.8) return 'Very Consistent';
      if (consistency > 0.6) return 'Quite Consistent';
      if (consistency > 0.4) return 'Moderately Variable';
      return 'Highly Variable';
    },

    capitalizeFirst(str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    }
  }
}
</script>

<style scoped>
.mood-summary {
  margin-bottom: 30px;
}

.summary-card {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 20px;
  padding: 25px;
  box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3);
  overflow: hidden;
}

.summary-header {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 20px;
}

.summary-icon {
  font-size: 2em;
  opacity: 0.9;
}

.summary-title {
  flex: 1;
}

.summary-title h3 {
  margin: 0 0 5px 0;
  font-size: 1.4em;
  font-weight: 600;
}

.entry-count {
  margin: 0;
  opacity: 0.8;
  font-size: 0.9em;
}

.expand-toggle {
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: white;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.expand-toggle:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: translateY(-1px);
}

.expand-icon {
  transition: transform 0.3s ease;
  font-size: 1.2em;
}

.expand-toggle.expanded .expand-icon {
  transform: rotate(180deg);
}

.main-summary {
  margin-bottom: 25px;
}

.summary-text {
  font-size: 1.1em;
  line-height: 1.6;
  margin: 0;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.mood-distribution {
  margin-bottom: 20px;
}

.distribution-bars {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.distribution-bar {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.bar-label {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.9em;
}

.mood-emoji {
  font-size: 1.1em;
}

.mood-text {
  flex: 1;
  margin-left: 10px;
  text-align: left;
}

.mood-percentage {
  font-weight: 600;
  min-width: 40px;
  text-align: right;
}

.progress-bar {
  height: 8px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  border-radius: 10px;
  transition: width 0.8s ease;
}

.progress-fill.positive {
  background: linear-gradient(90deg, #4ade80, #22c55e);
}

.progress-fill.negative {
  background: linear-gradient(90deg, #f87171, #ef4444);
}

.progress-fill.neutral {
  background: linear-gradient(90deg, #a3a3a3, #737373);
}

.expanded-content {
  margin-top: 25px;
  padding-top: 25px;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
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

.insights-section,
.trends-section,
.frequent-mood-section,
.recommendations-section {
  margin-bottom: 25px;
}

.insights-section h4,
.trends-section h4,
.frequent-mood-section h4,
.recommendations-section h4 {
  margin: 0 0 15px 0;
  font-size: 1.1em;
  font-weight: 600;
  opacity: 0.9;
}

.insights-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.insight-item {
  padding: 10px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  line-height: 1.5;
}

.insight-item:last-child {
  border-bottom: none;
}

.trend-info {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.trend-direction {
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 500;
}

.trend-icon {
  font-size: 1.2em;
}

.streak-info {
  font-size: 0.9em;
  opacity: 0.8;
}

.mood-stats {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.stat-item {
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.stat-item:last-child {
  border-bottom: none;
}

.stat-label {
  opacity: 0.8;
}

.stat-value {
  font-weight: 500;
}

.recommendations-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.recommendation-item {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: 15px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  line-height: 1.5;
}

.rec-icon {
  font-size: 1.2em;
  margin-top: 2px;
}

.rec-text {
  flex: 1;
}

@media (max-width: 768px) {
  .summary-card {
    padding: 20px;
  }
  
  .summary-header {
    gap: 12px;
  }
  
  .summary-icon {
    font-size: 1.5em;
  }
  
  .summary-title h3 {
    font-size: 1.2em;
  }
  
  .mood-stats {
    gap: 8px;
  }
  
  .expand-toggle {
    width: 35px;
    height: 35px;
  }
}

@media (max-width: 480px) {
  .summary-card {
    padding: 15px;
  }
  
  .summary-text {
    font-size: 1em;
  }
  
  .bar-label {
    font-size: 0.85em;
  }
  
  .recommendation-item {
    padding: 12px;
  }
}
</style>