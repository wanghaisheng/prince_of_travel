<template>
    <div>
      <ul>
        <li v-for="(post, index) in posts" :key="index">
          {{ post.title.rendered }} 
        </li>
      </ul>
      <button @click="loadPreviousPage" :disabled="currentPage === 1">Previous Page</button>
      <button @click="loadNextPage">Next Page</button>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  
  const posts = ref([]);
  const currentPage = ref(1);
  
  async function getData(page) {
    try {
      const res = await fetch(`https://princeoftravel.com/wp-json/wp/v2/posts?categories=942&_embed&per_page=10&page=${page}`);
      const finalRes = await res.json();
      posts.value = finalRes;
      console.log(posts.value[0].title.rendered);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  
 onMounted(() => {
    getData(currentPage.value);
  })
 
  
  function loadNextPage() {
    currentPage.value++;
    getData(currentPage.value);
  }
  
  function loadPreviousPage() {
    currentPage.value--;
    getData(currentPage.value);
  }
  </script>
  