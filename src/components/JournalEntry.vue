<template>
  <div class="journal-entry">
    <h3>Write your story</h3>
    <p class="instruction">What happened today? How do you feel about it?</p>
    
    <textarea 
      v-model="story"
      class="story-textarea"
      placeholder="Tell your story... What made you feel this way today? What are you grateful for? What challenges did you face?"
      rows="8"
      maxlength="1000"
    ></textarea>
    
    <div class="character-count">
      {{ story.length }}/1000 characters
    </div>
  </div>
</template>

<script>
export default {
  name: 'JournalEntry',
  props: {
    modelValue: {
      type: String,
      default: ''
    }
  },
  emits: ['update:modelValue'],
  data() {
    return {
      story: this.modelValue || ''
    }
  },
  watch: {
    story(newValue) {
      this.$emit('update:modelValue', newValue);
    },
    modelValue(newValue) {
      this.story = newValue || '';
    }
  }
}
</script>

<style scoped>
.journal-entry {
  margin-bottom: 30px;
}

.journal-entry h3 {
  text-align: center;
  color: #333;
  margin-bottom: 10px;
  font-size: 1.3em;
}

.instruction {
  text-align: center;
  color: #666;
  margin-bottom: 20px;
  font-size: 0.95em;
  line-height: 1.4;
}

.story-textarea {
  width: 100%;
  padding: 15px;
  border: 2px solid #e0e0e0;
  border-radius: 12px;
  font-size: 16px;
  line-height: 1.6;
  resize: vertical;
  min-height: 150px;
  font-family: inherit;
  transition: border-color 0.3s ease;
  box-sizing: border-box;
}

.story-textarea:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.story-textarea::placeholder {
  color: #aaa;
  font-style: italic;
}

.character-count {
  text-align: right;
  color: #666;
  font-size: 0.85em;
  margin-top: 8px;
}

@media (max-width: 480px) {
  .story-textarea {
    font-size: 16px; /* Prevents zoom on iOS */
    min-height: 120px;
  }
  
  .instruction {
    font-size: 0.9em;
  }
}
</style>