<template>
  <div class="home-view">
    <div class="container">
      <div class="header">
        <h1>{{ getDateString() }}</h1>
        <p v-if="existingEntry">You already logged your mood today. You can update it below.</p>
        <p v-else>Let's capture how you're feeling today!</p>
      </div>

      <div class="mood-journal-form">
        <MoodSelector v-model="selectedMood" />
        
        <JournalEntry v-model="journalStory" />
        
        <div class="form-actions">
          <button 
            :disabled="!selectedMood || !journalStory.trim()"
            @click="saveEntry"
            class="save-button"
            :class="{ loading: isSaving }"
          >
            <span v-if="!isSaving">
              {{ existingEntry ? 'Update Entry' : 'Save Entry' }}
            </span>
            <span v-else>Saving...</span>
          </button>
        </div>
        
        <div v-if="message" class="message" :class="message.type">
          {{ message.text }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MoodSelector from '../components/MoodSelector.vue'
import JournalEntry from '../components/JournalEntry.vue'
import moodService from '../services/moodService.js'

export default {
  name: 'HomeView',
  components: {
    MoodSelector,
    JournalEntry
  },
  data() {
    return {
      selectedMood: '',
      journalStory: '',
      existingEntry: null,
      isSaving: false,
      message: null
    }
  },
  async created() {
    // Load existing entry for today if any
    this.loadTodayEntry();
  },
  methods: {
    loadTodayEntry() {
      const todayEntry = moodService.getTodayEntry();
      if (todayEntry) {
        this.existingEntry = todayEntry;
        this.selectedMood = todayEntry.mood;
        this.journalStory = todayEntry.story;
      }
    },
    
    async saveEntry() {
      if (!this.selectedMood || !this.journalStory.trim()) {
        this.showMessage('Please select a mood and write your story', 'error');
        return;
      }

      this.isSaving = true;
      
      try {
        await moodService.saveEntry(this.selectedMood, this.journalStory.trim());
        this.showMessage('Your entry has been saved successfully! 🎉', 'success');
        this.loadTodayEntry(); // Refresh to show as existing entry
      } catch (error) {
        console.error('Error saving entry:', error);
        this.showMessage('Failed to save your entry. Please try again.', 'error');
      } finally {
        this.isSaving = false;
      }
    },
    
    showMessage(text, type = 'info') {
      this.message = { text, type };
      setTimeout(() => {
        this.message = null;
      }, 4000);
    },
    
    getDateString() {
      const today = new Date();
      return today.toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
    }
  }
}
</script>

<style scoped>
.home-view {
  min-height: calc(100vh - 80px);
  padding: 20px;
}

.container {
  max-width: 600px;
  margin: 0 auto;
}

.header {
  text-align: center;
  margin-bottom: 40px;
}

.header h1 {
  color: #333;
  margin-bottom: 10px;
  font-size: 1.8em;
  font-weight: 600;
}

.header p {
  color: #666;
  font-size: 1.1em;
}

.mood-journal-form {
  background: white;
  padding: 30px;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.form-actions {
  text-align: center;
  margin-top: 30px;
}

.save-button {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 15px 40px;
  border-radius: 25px;
  font-size: 1.1em;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 160px;
}

.save-button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(102, 126, 234, 0.3);
}

.save-button:disabled {
  background: #ccc;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

.save-button.loading {
  background: #999;
}

.message {
  margin-top: 20px;
  padding: 12px;
  border-radius: 8px;
  text-align: center;
  font-weight: 500;
}

.message.success {
  background: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
}

.message.error {
  background: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
}

.message.info {
  background: #d1ecf1;
  color: #0c5460;
  border: 1px solid #bee5eb;
}

@media (max-width: 768px) {
  .home-view {
    padding: 15px;
  }
  
  .mood-journal-form {
    padding: 20px;
  }
  
  .header h1 {
    font-size: 1.5em;
  }
  
  .save-button {
    padding: 12px 30px;
    font-size: 1em;
  }
}
</style>