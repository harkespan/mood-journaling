<template>
  <div class="mood-selector">
    <h3>How are you feeling today?</h3>
    <div class="mood-grid">
      <div 
        v-for="mood in moodOptions" 
        :key="mood.value"
        class="mood-item"
        :class="{ active: selectedMood === mood.value }"
        @click="selectMood(mood.value)"
      >
        <span class="mood-emoji">{{ mood.emoji }}</span>
        <span class="mood-name">{{ mood.name }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import moodService from '../services/moodService.js'

export default {
  name: 'MoodSelector',
  props: {
    modelValue: String
  },
  emits: ['update:modelValue'],
  data() {
    return {
      moodOptions: moodService.getMoodOptions(),
      selectedMood: this.modelValue || null
    }
  },
  watch: {
    modelValue(newValue) {
      this.selectedMood = newValue;
    }
  },
  methods: {
    selectMood(moodValue) {
      this.selectedMood = moodValue;
      this.$emit('update:modelValue', moodValue);
    }
  }
}
</script>

<style scoped>
.mood-selector {
  margin-bottom: 30px;
}

.mood-selector h3 {
  text-align: center;
  color: #333;
  margin-bottom: 20px;
  font-size: 1.3em;
}

.mood-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  gap: 15px;
  max-width: 500px;
  margin: 0 auto;
}

.mood-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px 10px;
  border: 2px solid #e0e0e0;
  border-radius: 15px;
  cursor: pointer;
  transition: all 0.3s ease;
  background: white;
}

.mood-item:hover {
  border-color: #667eea;
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.mood-item.active {
  border-color: #667eea;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(102, 126, 234, 0.3);
}

.mood-emoji {
  font-size: 2.5em;
  margin-bottom: 8px;
  display: block;
}

.mood-name {
  font-size: 0.9em;
  font-weight: 500;
}

@media (max-width: 480px) {
  .mood-grid {
    grid-template-columns: repeat(4, 1fr);
    gap: 10px;
  }
  
  .mood-item {
    padding: 12px 8px;
  }
  
  .mood-emoji {
    font-size: 2em;
  }
  
  .mood-name {
    font-size: 0.8em;
  }
}
</style>