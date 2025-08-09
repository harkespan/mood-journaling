// AI-powered insights service for mood analysis
class AIInsightsService {
  constructor() {
    // Define mood categories for analysis
    this.moodCategories = {
      positive: ['happy', 'excited', 'cool', 'calm'],
      negative: ['sad', 'angry', 'anxious'],
      neutral: ['tired']
    };
  }

  // Main function to generate comprehensive mood summary
  generateMoodSummary(entries, timeframe = 'recent') {
    if (!entries || entries.length === 0) {
      return this.getEmptyStateSummary(timeframe);
    }

    const analysis = this.analyzeEntries(entries);
    const trends = this.analyzeTrends(entries);
    const patterns = this.detectPatterns(entries, timeframe);
    const insights = this.generateInsights(analysis, trends, patterns, timeframe);

    return {
      summary: this.generateMainSummary(analysis, trends, timeframe),
      analysis: analysis,
      trends: trends,
      patterns: patterns,
      insights: insights,
      recommendations: this.generateRecommendations(analysis, trends, patterns),
      timeframe: timeframe,
      entryCount: entries.length
    };
  }

  // Analyze mood distribution and statistics
  analyzeEntries(entries) {
    const totalEntries = entries.length;
    const moodCounts = {
      positive: 0,
      negative: 0,
      neutral: 0
    };

    const specificMoodCounts = {};
    const moodSequence = [];

    // Count moods by category and specific types
    entries.forEach(entry => {
      const category = this.categorizeMood(entry.mood);
      moodCounts[category]++;
      
      specificMoodCounts[entry.mood] = (specificMoodCounts[entry.mood] || 0) + 1;
      moodSequence.push({
        mood: entry.mood,
        category: category,
        date: entry.date
      });
    });

    // Calculate percentages
    const percentages = {
      positive: Math.round((moodCounts.positive / totalEntries) * 100),
      negative: Math.round((moodCounts.negative / totalEntries) * 100),
      neutral: Math.round((moodCounts.neutral / totalEntries) * 100)
    };

    // Find dominant mood
    const dominantCategory = this.getDominantCategory(percentages);
    const mostFrequentMood = this.getMostFrequentMood(specificMoodCounts);

    return {
      totalEntries,
      moodCounts,
      percentages,
      specificMoodCounts,
      moodSequence,
      dominantCategory,
      mostFrequentMood,
      variance: this.calculateVariance(moodSequence)
    };
  }

  // Analyze trends over time
  analyzeTrends(entries) {
    if (entries.length < 3) {
      return { trend: 'insufficient_data', direction: 'stable', strength: 0 };
    }

    const sortedEntries = [...entries].sort((a, b) => new Date(a.date) - new Date(b.date));
    const moodValues = sortedEntries.map(entry => this.getMoodValue(entry.mood));
    
    // Calculate trend using linear regression
    const trend = this.calculateTrend(moodValues);
    const streaks = this.calculateStreaks(sortedEntries);
    
    return {
      trend: trend.direction,
      strength: trend.strength,
      slope: trend.slope,
      recentTrend: this.getRecentTrend(moodValues),
      streaks: streaks,
      consistency: this.calculateConsistency(moodValues)
    };
  }

  // Detect patterns in mood data
  detectPatterns(entries, timeframe) {
    const patterns = {
      weeklyPattern: this.detectWeeklyPattern(entries),
      monthlyPattern: this.detectMonthlyPattern(entries),
      streakPattern: this.detectStreakPatterns(entries),
      fluctuationPattern: this.detectFluctuationPattern(entries)
    };

    return patterns;
  }

  // Generate human-readable insights
  generateInsights(analysis, trends, patterns, timeframe) {
    const insights = [];

    // Dominant mood insight
    insights.push(this.getDominantMoodInsight(analysis, timeframe));

    // Trend insight
    if (trends.trend !== 'insufficient_data') {
      insights.push(this.getTrendInsight(trends, timeframe));
    }

    // Pattern insights
    if (patterns.weeklyPattern.hasPattern) {
      insights.push(patterns.weeklyPattern.insight);
    }

    // Streak insights
    if (patterns.streakPattern.hasStreak) {
      insights.push(patterns.streakPattern.insight);
    }

    // Consistency insight
    insights.push(this.getConsistencyInsight(trends.consistency, analysis.variance));

    return insights.filter(insight => insight && insight.length > 0);
  }

  // Generate main summary text
  generateMainSummary(analysis, trends, timeframe) {
    const { dominantCategory, percentages } = analysis;
    const timeText = this.getTimeframeText(timeframe);

    // Base summary on dominant category
    if (percentages.positive >= 60) {
      return `Mostly positive vibes ${timeText}! 😊 You're having a great time with ${percentages.positive}% positive moods.`;
    } else if (percentages.negative >= 50) {
      return `Challenging period ${timeText}. 💙 ${percentages.negative}% of your entries show you've been facing some tough times.`;
    } else if (Math.abs(percentages.positive - percentages.negative) <= 15) {
      return `Mixed emotions ${timeText}. 🌈 Your mood has been balanced with varied experiences.`;
    } else if (percentages.positive >= 40) {
      return `Generally positive ${timeText}! ✨ ${percentages.positive}% positive moods with some ups and downs.`;
    } else {
      return `Varied mood journey ${timeText}. 🎭 You've experienced a range of emotions during this period.`;
    }
  }

  // Generate actionable recommendations
  generateRecommendations(analysis, trends, patterns) {
    const recommendations = [];

    // Based on dominant mood
    if (analysis.percentages.negative >= 50) {
      recommendations.push({
        type: 'wellness',
        text: 'Consider talking to someone you trust or engaging in activities that usually make you feel better.',
        icon: '💙'
      });
    }

    // Based on trends
    if (trends.trend === 'improving') {
      recommendations.push({
        type: 'positive',
        text: 'Keep up the good momentum! Continue doing what\'s been working for you lately.',
        icon: '🌟'
      });
    } else if (trends.trend === 'declining') {
      recommendations.push({
        type: 'support',
        text: 'Your mood has been declining lately. Consider self-care activities or reaching out for support.',
        icon: '🤗'
      });
    }

    // Based on consistency
    if (trends.consistency < 0.3) {
      recommendations.push({
        type: 'stability',
        text: 'Your moods have been quite variable. Try establishing a consistent daily routine.',
        icon: '⚖️'
      });
    }

    return recommendations;
  }

  // Helper methods
  categorizeMood(mood) {
    if (this.moodCategories.positive.includes(mood)) return 'positive';
    if (this.moodCategories.negative.includes(mood)) return 'negative';
    return 'neutral';
  }

  getMoodValue(mood) {
    // Convert mood to numerical value for trend analysis
    const moodValues = {
      'sad': 1, 'angry': 1, 'anxious': 2,
      'tired': 3,
      'calm': 4, 'cool': 4, 'happy': 5, 'excited': 5
    };
    return moodValues[mood] || 3;
  }

  getDominantCategory(percentages) {
    if (percentages.positive >= Math.max(percentages.negative, percentages.neutral)) {
      return 'positive';
    } else if (percentages.negative >= percentages.neutral) {
      return 'negative';
    }
    return 'neutral';
  }

  getMostFrequentMood(specificMoodCounts) {
    return Object.entries(specificMoodCounts)
      .reduce((a, b) => specificMoodCounts[a[0]] > specificMoodCounts[b[0]] ? a : b)[0];
  }

  calculateVariance(moodSequence) {
    const values = moodSequence.map(entry => this.getMoodValue(entry.mood));
    const mean = values.reduce((a, b) => a + b, 0) / values.length;
    const variance = values.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / values.length;
    return variance;
  }

  calculateTrend(moodValues) {
    const n = moodValues.length;
    const x = Array.from({ length: n }, (_, i) => i);
    const sumX = x.reduce((a, b) => a + b, 0);
    const sumY = moodValues.reduce((a, b) => a + b, 0);
    const sumXY = x.reduce((acc, xi, i) => acc + xi * moodValues[i], 0);
    const sumXX = x.reduce((acc, xi) => acc + xi * xi, 0);

    const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
    
    let direction, strength;
    if (Math.abs(slope) < 0.1) {
      direction = 'stable';
      strength = 0;
    } else if (slope > 0) {
      direction = 'improving';
      strength = Math.min(Math.abs(slope) * 100, 100);
    } else {
      direction = 'declining';
      strength = Math.min(Math.abs(slope) * 100, 100);
    }

    return { direction, strength, slope };
  }

  calculateStreaks(entries) {
    let currentStreak = 1;
    let longestStreak = 1;
    let currentMoodCategory = this.categorizeMood(entries[0].mood);
    let longestStreakCategory = currentMoodCategory;

    for (let i = 1; i < entries.length; i++) {
      const currentCategory = this.categorizeMood(entries[i].mood);
      
      if (currentCategory === currentMoodCategory) {
        currentStreak++;
      } else {
        if (currentStreak > longestStreak) {
          longestStreak = currentStreak;
          longestStreakCategory = currentMoodCategory;
        }
        currentStreak = 1;
        currentMoodCategory = currentCategory;
      }
    }

    if (currentStreak > longestStreak) {
      longestStreak = currentStreak;
      longestStreakCategory = currentMoodCategory;
    }

    return { longestStreak, longestStreakCategory, currentStreak, currentMoodCategory };
  }

  calculateConsistency(moodValues) {
    const mean = moodValues.reduce((a, b) => a + b, 0) / moodValues.length;
    const variance = moodValues.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / moodValues.length;
    const stdDev = Math.sqrt(variance);
    return Math.max(0, 1 - (stdDev / 2)); // Normalize to 0-1 scale
  }

  getRecentTrend(moodValues) {
    if (moodValues.length < 3) return 'stable';
    
    const recentValues = moodValues.slice(-3);
    const trend = this.calculateTrend(recentValues);
    return trend.direction;
  }

  detectWeeklyPattern(entries) {
    // Placeholder for weekly pattern detection
    return { hasPattern: false, insight: '' };
  }

  detectMonthlyPattern(entries) {
    // Placeholder for monthly pattern detection  
    return { hasPattern: false, insight: '' };
  }

  detectStreakPatterns(entries) {
    const streaks = this.calculateStreaks(entries);
    
    if (streaks.longestStreak >= 3) {
      const emoji = streaks.longestStreakCategory === 'positive' ? '🔥' : streaks.longestStreakCategory === 'negative' ? '💙' : '⚖️';
      return {
        hasStreak: true,
        insight: `${emoji} ${streaks.longestStreak} consecutive ${streaks.longestStreakCategory} days - that's a notable pattern!`
      };
    }
    
    return { hasStreak: false, insight: '' };
  }

  detectFluctuationPattern(entries) {
    // Analyze mood fluctuation patterns
    return { hasPattern: false, insight: '' };
  }

  getDominantMoodInsight(analysis, timeframe) {
    const { dominantCategory, percentages, mostFrequentMood } = analysis;
    const timeText = this.getTimeframeText(timeframe);
    
    if (dominantCategory === 'positive' && percentages.positive >= 60) {
      return `🌟 You've been predominantly ${mostFrequentMood} ${timeText}, showing great emotional well-being!`;
    } else if (dominantCategory === 'negative' && percentages.negative >= 50) {
      return `💙 Your mood has been challenging ${timeText}, with ${mostFrequentMood} being most common. Remember, it's okay to have tough times.`;
    }
    
    return `🌈 You've experienced a balanced mix of emotions ${timeText}, with ${mostFrequentMood} appearing most frequently.`;
  }

  getTrendInsight(trends, timeframe) {
    const timeText = this.getTimeframeText(timeframe);
    
    if (trends.trend === 'improving' && trends.strength > 30) {
      return `📈 Your mood has been improving ${timeText}! Things are looking up.`;
    } else if (trends.trend === 'declining' && trends.strength > 30) {
      return `📉 Your mood has been declining ${timeText}. Consider what might be contributing to this pattern.`;
    }
    
    return `⚖️ Your mood has been relatively stable ${timeText}.`;
  }

  getConsistencyInsight(consistency, variance) {
    if (consistency > 0.7) {
      return `🎯 Your mood has been quite consistent - you seem to have good emotional stability.`;
    } else if (consistency < 0.4) {
      return `🎭 Your mood varies quite a bit - you experience a wide range of emotions.`;
    }
    
    return '';
  }

  getTimeframeText(timeframe) {
    const timeframes = {
      'recent': 'in the last week',
      'range': 'during this period',
      'month': 'this month',
      'year': 'this year',
      'week': 'this week'
    };
    return timeframes[timeframe] || 'recently';
  }

  getEmptyStateSummary(timeframe) {
    return {
      summary: `No mood data available for analysis ${this.getTimeframeText(timeframe)}.`,
      analysis: null,
      trends: null,
      patterns: null,
      insights: ['Start tracking your mood daily to get personalized insights!'],
      recommendations: [{
        type: 'start',
        text: 'Begin your mood tracking journey by writing your first entry today.',
        icon: '🌱'
      }],
      timeframe: timeframe,
      entryCount: 0
    };
  }
}

export default new AIInsightsService();