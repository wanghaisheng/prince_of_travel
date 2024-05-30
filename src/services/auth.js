// Sign up function
async function signUp(email, password, displayName) {
    try {
      const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
      await userCredential.user.updateProfile({ displayName });
      return userCredential.user;
    } catch (error) {
      throw error;
    }
  }
  
  // Login function
  async function login(email, password) {
    try {
      const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);
      return userCredential.user;
    } catch (error) {
      throw error;
    }
  }
  
  // Logout function
  async function logout() {
    try {
      await firebase.auth().signOut();
    } catch (error) {
      throw error;
    }
  }
  