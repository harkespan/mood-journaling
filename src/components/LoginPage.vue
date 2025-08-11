<template>
  <div class="login-page">
    <div class="login-container">
      <div class="app-header">
        <h2>🌟 Mood Journal</h2>
        <p>Track your daily mood and write your story</p>
      </div>
      
      <div class="login-content">
        <div class="welcome-message">
          <h3>Welcome!</h3>
          <p>Please sign in with your Google account to start tracking your mood and writing your daily journal.</p>
        </div>
        
        <div class="google-signin-container">
          <div id="google-signin-button" ref="googleSigninButton"></div>
        </div>
      </div>
      
      <div class="login-footer">
        <div class="footer-links">
          <router-link to="/terms" class="terms-link">
            📜 Terms of Service
          </router-link>
          <span class="separator">•</span>
          <a href="https://github.com/harkespan/mood-journaling" target="_blank" rel="noopener noreferrer" class="github-link">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style="margin-right: 6px;">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            Open Source
          </a>
        </div>
        <p class="footer-text">Free & open source mood tracking app</p>
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

.login-footer {
  margin-top: 40px;
  text-align: center;
  padding-top: 30px;
  border-top: 1px solid rgba(255, 255, 255, 0.3);
}

.footer-links {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
  margin-bottom: 15px;
  flex-wrap: wrap;
}

.terms-link,
.github-link {
  color: #333;
  text-decoration: none;
  font-size: 0.95em;
  font-weight: 600;
  padding: 10px 16px;
  border-radius: 10px;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.terms-link:hover,
.github-link:hover {
  color: #000;
  background: rgba(255, 255, 255, 1);
  border-color: rgba(255, 255, 255, 1);
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.separator {
  color: rgba(255, 255, 255, 0.7);
  font-size: 1em;
  font-weight: bold;
}

.footer-text {
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.9em;
  margin: 0;
  font-style: italic;
  font-weight: 500;
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
  
  .footer-links {
    flex-direction: column;
    gap: 12px;
  }
  
  .separator {
    display: none;
  }
  
  .terms-link,
  .github-link {
    font-size: 0.9em;
    padding: 12px 20px;
    min-width: 180px;
    justify-content: center;
  }
  
  .footer-text {
    font-size: 0.85em;
  }
}
</style>