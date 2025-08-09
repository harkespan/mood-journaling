<template>
  <div class="login-page">
    <div class="login-container">
      <div class="app-header">
        <h1>🌟 Mood Journal</h1>
        <p>Track your daily mood and write your story</p>
      </div>
      
      <div class="login-content">
        <div class="welcome-message">
          <h2>Welcome!</h2>
          <p>Please sign in with your Google account to start tracking your mood and writing your daily journal.</p>
        </div>
        
        <div class="google-signin-container">
          <div id="google-signin-button" ref="googleSigninButton"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import authService from '../services/auth.js'

export default {
  name: 'LoginPage',
  async mounted() {
    try {
      await authService.init();
      authService.renderSignInButton(this.$refs.googleSigninButton);
    } catch (error) {
      console.error('Failed to initialize auth:', error);
    }

    // Listen for login success
    window.addEventListener('userLoggedIn', this.handleUserLoggedIn);
  },
  
  beforeUnmount() {
    window.removeEventListener('userLoggedIn', this.handleUserLoggedIn);
  },

  methods: {
    handleUserLoggedIn(event) {
      // Redirect to main app
      this.$router.push('/');
    }
  }
}
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.login-container {
  background: white;
  border-radius: 20px;
  padding: 40px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  text-align: center;
  max-width: 400px;
  width: 100%;
}

.app-header h1 {
  margin: 0 0 10px 0;
  color: #333;
  font-size: 2.5em;
}

.app-header p {
  margin: 0 0 30px 0;
  color: #666;
  font-size: 1.1em;
}

.welcome-message h2 {
  margin: 0 0 15px 0;
  color: #333;
  font-size: 1.8em;
}

.welcome-message p {
  margin: 0 0 30px 0;
  color: #666;
  line-height: 1.6;
}

.google-signin-container {
  display: flex;
  justify-content: center;
}

#google-signin-button {
  display: flex;
  justify-content: center;
}

@media (max-width: 480px) {
  .login-container {
    padding: 30px 20px;
  }
  
  .app-header h1 {
    font-size: 2em;
  }
  
  .welcome-message h2 {
    font-size: 1.5em;
  }
}
</style>