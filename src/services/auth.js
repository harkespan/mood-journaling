// Google OAuth Authentication Service
class AuthService {
  constructor() {
    this.isInitialized = false;
    this.currentUser = null;
  }

  // Initialize Google OAuth
  async init() {
    if (this.isInitialized) return;

    // Load Google OAuth library
    await this.loadGoogleScript();
    
    // Initialize with Google OAuth client ID from environment variables
    const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    
    // Validate that CLIENT_ID is available
    if (!CLIENT_ID) {
      console.error('Google OAuth Client ID not found. Please check your .env file and ensure VITE_GOOGLE_CLIENT_ID is set.');
      throw new Error('Missing Google OAuth configuration');
    }
    
    try {
      await window.google.accounts.id.initialize({
        client_id: CLIENT_ID,
        callback: this.handleCredentialResponse.bind(this)
      });
      this.isInitialized = true;
      console.log('Google OAuth initialized successfully');
    } catch (error) {
      console.error('Failed to initialize Google OAuth:', error);
      throw error;
    }
  }

  // Load Google OAuth script
  loadGoogleScript() {
    return new Promise((resolve, reject) => {
      if (window.google) {
        resolve();
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }

  // Handle Google OAuth response
  handleCredentialResponse(response) {
    try {
      const payload = this.parseJWT(response.credential);
      this.currentUser = {
        id: payload.sub,
        name: payload.name,
        email: payload.email,
        picture: payload.picture
      };
      
      // Store user in localStorage
      localStorage.setItem('user', JSON.stringify(this.currentUser));
      
      // Trigger custom event
      window.dispatchEvent(new CustomEvent('userLoggedIn', { detail: this.currentUser }));
    } catch (error) {
      console.error('Failed to handle credential response:', error);
    }
  }

  // Parse JWT token
  parseJWT(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
  }

  // Render Google Sign-In button
  renderSignInButton(element) {
    if (!this.isInitialized) {
      console.error('AuthService not initialized');
      return;
    }

    window.google.accounts.id.renderButton(element, {
      theme: 'outline',
      size: 'large',
      text: 'sign_in_with',
      shape: 'rectangular'
    });
  }

  // Sign out
  signOut() {
    this.currentUser = null;
    localStorage.removeItem('user');
    window.dispatchEvent(new CustomEvent('userLoggedOut'));
  }

  // Get current user
  getCurrentUser() {
    if (!this.currentUser) {
      const stored = localStorage.getItem('user');
      if (stored) {
        this.currentUser = JSON.parse(stored);
      }
    }
    return this.currentUser;
  }

  // Check if user is logged in
  isLoggedIn() {
    return !!this.getCurrentUser();
  }
}

export default new AuthService();