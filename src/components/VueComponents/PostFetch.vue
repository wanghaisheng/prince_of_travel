<template>
    <div>
    <div v-if="posts">
      <ul>
        <li>{{ posts[0].title.rendered }}</li>
        <li v-for="(post, index) in posts" :key="index">
          {{ post.title.rendered }} 
        </li>
      </ul>
    </div>
    <div v-else>
      Loading...
    </div>
</div>
  </template>
  
  <script>
import { ref, onMounted } from 'vue';

export default {
  setup() {
    const posts = ref(null);
    const isLoading = ref(true);

    const fetchData = async () => {
      try {
        const response = await fetch('https://princeoftravel.com/wp-json/wp/v2/posts?categories=942&_embed&per_page=10');
        const fetchedData = await response.json();
        posts.value = fetchedData;
        console.log(fetchedData)
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        isLoading.value = false;
      }
    };

    onMounted(fetchData);

    return { posts, isLoading };
  },
};
</script>