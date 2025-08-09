<template>
  <div id="app">
    <div v-if="!isLoggedIn" class="login-wrapper">
      <LoginPage />
    </div>
    
    <div v-else class="main-app">
      <nav class="main-nav">
        <div class="nav-container">
          <div class="nav-brand">
            <h2>🌟 Mood Journal</h2>
          </div>
          
          <div class="nav-menu">
            <router-link to="/" class="nav-link" active-class="active">
              📝 Today
            </router-link>
            <router-link to="/history" class="nav-link" active-class="active">
              📖 History
            </router-link>
            <button @click="logout" class="logout-button">
              👋 Logout
            </button>
          </div>
          
          <div class="user-info">
            <img 
              v-if="currentUser?.picture" 
              :src="currentUser.picture" 
              :alt="currentUser.name"
              class="user-avatar"
            >
            <span class="user-name">{{ currentUser?.name }}</span>
          </div>
        </div>
      </nav>
      
      <main class="main-content">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script>
import LoginPage from './components/LoginPage.vue'
import authService from './services/auth.js'

export default {
  name: 'App',
  components: {
    LoginPage
  },
  data() {
    return {
      isLoggedIn: false,
      currentUser: null
    }
  },
  async created() {
    // Initialize auth service
    await authService.init();
    
    // Check if user is already logged in
    this.currentUser = authService.getCurrentUser();
    this.isLoggedIn = authService.isLoggedIn();
    
    // Listen for auth state changes
    window.addEventListener('userLoggedIn', this.handleUserLoggedIn);
    window.addEventListener('userLoggedOut', this.handleUserLoggedOut);
  },
  
  beforeUnmount() {
    window.removeEventListener('userLoggedIn', this.handleUserLoggedIn);
    window.removeEventListener('userLoggedOut', this.handleUserLoggedOut);
  },
  
  methods: {
    handleUserLoggedIn(event) {
      this.currentUser = event.detail;
      this.isLoggedIn = true;
    },
    
    handleUserLoggedOut() {
      this.currentUser = null;
      this.isLoggedIn = false;
    },
    
    logout() {
      authService.signOut();
    }
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  min-height: 100vh;
}

#app {
  min-height: 100vh;
}

.login-wrapper {
  min-height: 100vh;
}

.main-app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-nav {
  background: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  height: 70px;
}

.nav-brand h2 {
  color: #333;
  font-size: 1.5em;
  font-weight: 600;
}

.nav-menu {
  display: flex;
  align-items: center;
  gap: 20px;
}

.nav-link {
  text-decoration: none;
  color: #666;
  font-weight: 500;
  padding: 8px 16px;
  border-radius: 20px;
  transition: all 0.3s ease;
}

.nav-link:hover {
  color: #667eea;
  background: rgba(102, 126, 234, 0.1);
}

.nav-link.active {
  color: white;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.logout-button {
  background: none;
  border: 1px solid #ddd;
  color: #666;
  padding: 8px 16px;
  border-radius: 20px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s ease;
}

.logout-button:hover {
  border-color: #667eea;
  color: #667eea;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
}

.user-name {
  color: #333;
  font-weight: 500;
  font-size: 0.9em;
}

.main-content {
  flex: 1;
}

@media (max-width: 768px) {
  .nav-container {
    padding: 0 15px;
    height: 60px;
  }
  
  .nav-brand h2 {
    font-size: 1.3em;
  }
  
  .nav-menu {
    gap: 10px;
  }
  
  .nav-link, .logout-button {
    font-size: 0.85em;
    padding: 6px 12px;
  }
  
  .user-info {
    gap: 8px;
  }
  
  .user-avatar {
    width: 32px;
    height: 32px;
  }
  
  .user-name {
    font-size: 0.8em;
    display: none; /* Hide on mobile to save space */
  }
}

@media (max-width: 480px) {
  .nav-container {
    flex-wrap: wrap;
    height: auto;
    padding: 10px 15px;
  }
  
  .nav-brand {
    order: 1;
    flex: 1;
  }
  
  .user-info {
    order: 2;
  }
  
  .nav-menu {
    order: 3;
    width: 100%;
    justify-content: center;
    margin-top: 10px;
    padding-top: 10px;
    border-top: 1px solid #eee;
  }
}
</style>
