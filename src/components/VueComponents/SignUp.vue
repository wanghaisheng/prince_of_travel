<template>
    <form @submit.prevent="signup">
      <input type="email" v-model="email" placeholder="Email" required>
      <input type="password" v-model="password" placeholder="Password" required>
      <button type="submit">Sign Up</button>
    </form>
  </template>
  
  <script>
  import { ref } from 'vue';
  import { createUserWithEmailAndPassword } from '../../../firebase';
  
  export default {
    setup() {
      const email = ref('');
      const password = ref('');
  
      const signup = async () => {
        try {
          const userCredential = await createUserWithEmailAndPassword(email.value, password.value);
          console.log('User signed up:', userCredential.user);
          // You can redirect the user to another page upon successful signup
        } catch (error) {
          console.error('Error signing up:', error.message);
        }
      };
  
      return {
        email,
        password,
        signup
      };
    }
  };
  </script>
  