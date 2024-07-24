<template>
  <div class="container-fluid animate-in" v-if="isLoading">
    <div class="row pt-5 mt-5 min-vh-100">
        <div class="col-lg-10 offset-lg-1 d-flex flex-column justify-content-center align-items-center text-center">
          <div class="p-5">
            <h1 class="display-1 fw-bold lh-1 ls-1 my-3">{{ title }}</h1>
            <p class="col-lg-8 offset-lg-2 fs-5 mt-0 text-black-50">{{ description }}</p>
            <!-- <p class="fs-5 mt-0 text-black-50">Explore our in-depth Reviews, covering the world’s best airlines, hotels, airport lounges, credit cards, and more. Whether you're a seasoned jetsetter or planning your very first trip, our curated trip reports give you a deep sense of what you can expect upon setting off on your own journey.</p> -->
            <h3>Fetching posts...</h3>
            <div class="text-center">
              <div class="spinner-grow" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="container-fluid animate-in" style="background: #fffbf8" v-else>
      <!-- First Section -->
      <div class="row pt-5 mt-5">
        <div class="col-lg-12 pt-2 px-3">
          <form class="form-floating">
                <input type="text" class="form-control rounded-3 border border-secondary" id="floatingInputValue"
                v-model="bankFilter" placeholder="Search posts">
                <label for="floatingInputValue" class="small text-secondary">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
                </svg>
                <span class="ms-2">Type your search (i.e. American Express)</span>
                </label>
              </form>
        </div>
        <div class="col-lg-12 px-4 pt-4" v-if="bankFilter">
          <div class="row">
            <div class="col-lg-3" v-for="(item, index) in filteredData" :key="item.id">
              <a :href="item.slug">
                <img :src="item._embedded['wp:featuredmedia'][0]?.source_url || item.data?.imageUrl" class="w-100" style="object-fit: cover; height: 200px" alt="">
                <h3 v-html="item.title.rendered"></h3>
              </a>
            </div>
          </div>
        </div>
        <div class="col-md-6 p-5 d-flex flex-column justify-content-center align-items-start">
          <div class="m-3 py-5">
            <h1 class="display-1 fw-bold lh-1 ls-1 my-3">Reviews</h1>
            <p class="fs-5 mt-0 col-lg-10 text-black-50">Explore our in-depth Reviews, covering the world’s best airlines, hotels, airport lounges, credit cards, and more. Whether you're a seasoned jetsetter or planning your very first trip, our curated trip reports give you a deep sense of what you can expect upon setting off on your own journey.</p>
          </div>
        </div>

        <div v-for="(item, index) in filteredData?.slice(0,3)" :key="index" class="col-md-6 p-4">
          <a :href="`/reviews/${removeSpecialCharactersFromURL(item.slug)}/`">
            <div class="pb-3">
              <img :src="item._embedded['wp:featuredmedia'][0].source_url || item.data.imageUrl" class="w-100" style="object-fit: cover; height: 350px" alt="">
              <h1 class="text-body-secondary fw-bold lh-1 mb-3 mt-4">{{ item.title.rendered }}</h1>
              <div class="col-md-10 fs-5 text-body-secondary mt-0 mb-2" v-html="functions.shorten(item.excerpt.rendered, 150)"></div>
              <button class="btn btn-dark fw-bold rounded-pill px-4 mt-3 shadow">Read article</button>
            </div>
          </a>
        </div>
      </div><!--end row -->
  
      <!-- Second Section -->
      <div class="row min-vh-100">
        <div v-for="(item, index) in filteredData?.slice(3,6)" :key="index" class="col-md-4 p-3">
          <a :href="`/reviews/${removeSpecialCharactersFromURL(item.slug)}/`">
            <div class="pb-3">
              <img :src="item._embedded['wp:featuredmedia'][0].source_url || item.data.imageUrl" class="w-100" style="object-fit: cover;" alt="">
              <h1 class="text-body-secondary fw-bold lh-1 mb-3 mt-4">{{ item.title.rendered }}</h1>
              <div class="col-md-10 fs-5 text-body-secondary mt-0 mb-2" v-html="functions.shorten(item.excerpt.rendered, 150)"></div>
              <button class="btn btn-dark fw-bold rounded-pill px-4 mt-3 shadow">Read article</button>
            </div>
          </a>
        </div>
      </div>
  
    <!-- Third3 -->
    <div class="row">
        <div v-for="(item, index) in filteredData?.slice(6,9)" :class="[index === 0 ? 'col-md-6' : 'col-md-3', 'p-4']" :key="index">
          <a :href="`/reviews/${removeSpecialCharactersFromURL(item.slug)}/`">
            <div class="pb-3">
              <img :src="item._embedded['wp:featuredmedia'][0].source_url || item.data.imageUrl" class="w-100" style="object-fit: cover;" alt="">
              <h1 :class="[index !== 0 ? 'fs-3' : '', 'text-body-secondary fw-bold lh-1 mb-3 mt-4']" v-html="item.title.rendered"></h1>
              <div class="col-md-10 fs-5 text-body-secondary mt-0 mb-2" v-html="functions.shorten(item.excerpt.rendered, 150)"></div>
              <button class="btn btn-dark fw-bold rounded-pill px-4 mt-3 shadow">Read article</button>
            </div>
          </a>
        </div>
    </div><!--end row -->

    <!-- Fourth3 -->
    <div class="row">
      <div v-for="(item, index) in filteredData?.slice(9,12)" :key="index">
        <div class="d-flex">
            <div class="col-lg-6 p-4">
                <img :src="item._embedded['wp:featuredmedia'][0].source_url || item.data.imageUrl" class="w-100" style="object-fit: cover;" alt="">
            </div>

          <div class="col-lg-6 p-5 d-flex flex-column justify-content-center align-items-start">
            <a :href="`/reviews/${removeSpecialCharactersFromURL(item.slug)}/`">
            <h1 class="text-body-secondary fw-bold text-balance lh-1 mb-3 mt-4" v-html="item.title.rendered"></h1>
            <div class="col-md-10 fs-5 text-body-secondary mt-0 mb-2" v-html="functions.shorten(item.excerpt.rendered, 150)"></div>
            <div class="py-2">
              <p class="small text-uppercase fw-bold my-0"><span class="fw-light text-secondary">Written by</span> {{item._embedded?.author[0].name || item.data.author}}</p>
              <p class="small text-uppercase fw-bold my-0"><span class="fw-light text-secondary">On</span> {{item.date.toString().slice(0,10) || item.data.pubDate.toString().slice(0,10)}}</p>
            </div>
            <button class="btn btn-dark fw-bold rounded-pill px-4 mt-3 shadow">Read article</button>
            </a>
          </div>
        </div>
    </div>
    <!--end row -->

    <!-- Fifth3 -->
    <div class="row min-vh-100">
        <div class="col-lg-4 p-3" v-for="(item, index) in filteredData?.slice(12,15)" :key="index">
          <a :href="`/reviews/${removeSpecialCharactersFromURL(item.slug)}/`">
            <div class="pb-3">
              <img :src="item._embedded['wp:featuredmedia'][0].source_url || item.data.imageUrl" class="w-100" style="object-fit: cover;" alt="">
              <h1 class="text-body-secondary fw-bold lh-1 mb-3 mt-4" v-html="item.title.rendered"></h1>
              <div class="col-md-10 fs-5 text-body-secondary mt-0 mb-2" v-html="functions.shorten(item.excerpt.rendered, 150)"></div>
              <button class="btn btn-dark fw-bold rounded-pill px-4 mt-3 shadow">Read article</button>
            </div>
          </a>
        </div>
    </div>

    <!-- Sixth5 -->
    <div class="row">
      <div class="col-lg-6">
        <div class="row p-3">
            <div class="col-lg-12 p-4" v-for="(item, index) in filteredData?.slice(15,19)" :key="index">
              <img :src="item._embedded['wp:featuredmedia'][0].source_url || item.data.imageUrl" class="w-100" style="object-fit: cover;" alt="">
              <h1 class="text-body-secondary fw-bold lh-1 mb-3 mt-4" v-html="item.title.rendered"></h1>
              <div class="col-md-10 fs-5 text-body-secondary mt-0 mb-2" v-html="functions.shorten(item.excerpt.rendered, 150)"></div>
              <div class="py-2">
                <p class="small text-uppercase fw-bold my-0"><span class="fw-light text-secondary">Written by</span> {{ item._embedded?.author[0].name || item.data.author }}</p>
                <p class="small text-uppercase fw-bold my-0"><span class="fw-light text-secondary">On</span> {{ item.date.toString().slice(0,10) || item.data.pubDate.toString().slice(0,10) }}</p>
              </div>
              <a :href="`/reviews/${removeSpecialCharactersFromURL(item.slug)}/`">
                <button class="btn btn-dark fw-bold rounded-pill px-4 mt-3 shadow">Read article</button>
              </a>
            </div>
        </div>
      </div>

      <div class="col-lg-6 p-5 order-1 order-lg-2">
        <div class="col-lg-12 py-5">
          <h1 class="display-2 fw-bold">More {{ title }}</h1>
        </div>
        <div class="row g-5">
            <div class="col-lg-6" v-for="(item, index) in filteredData.slice(19, 31)" :key="index">
              <img :src="item._embedded['wp:featuredmedia'][0]?.source_url || item.data?.imageUrl" class="w-100" style="object-fit: cover;" alt="">
              <h4 class="text-body-secondary fw-bold" v-html="item.title.rendered"></h4>
              <div class="fs-5 text-body-secondary my-0" v-html="functions.shorten(item.excerpt.rendered, 100) + '...'"></div>
              <a :href="`/reviews/${removeSpecialCharactersFromURL(item.slug)}/`">
                <button class="btn btn-dark rounded-pill px-4 mt-2">Read article</button>
              </a>
            </div>
        </div>
      </div>
    </div>

    <!-- Rest of Posts -->
    <div class="row row-cols-1 row-cols-md-3 row-cols-lg-4 g-3 p-4">
        <div class="col p-3" v-for="(item, index) in filteredData.slice(31)" :key="index">
          <img :src="item._embedded['wp:featuredmedia'][0].source_url || item.data?.imageUrl" class="w-100" style="object-fit: cover;" alt="">
          <h1 class="fs-3 text-body-secondary fw-bold lh-1 mb-3 mt-4" v-html="item.title.rendered"></h1>
          <div class="col-md-10 fs-5 text-body-secondary mt-0 mb-2" v-html="functions.shorten(item.excerpt.rendered, 150)"></div>
          <div class="py-2">
            <p class="small text-uppercase fw-bold my-0"><span class="fw-light text-secondary">Written by</span> {{ item._embedded?.author[0].name || item.data.author }}</p>
            <p class="small text-uppercase fw-bold my-0"><span class="fw-light text-secondary">On</span> {{ item.date.toString().slice(0,10) || item.data.pubDate.toString().slice(0,10) }}</p>
          </div>
          <a :href="`/reviews/${removeSpecialCharactersFromURL(item.slug)}/`">
            <button class="btn btn-dark fw-bold rounded-pill px-4 mt-3 shadow">Read article</button>
          </a>
        </div>
    </div>
  </div>
</div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import functions from '../../js/functions';
let posts = ref([]);
const bankFilter = ref('');

  const props = defineProps({
    title: String,
    description: String,
    endpoint: String
  })


    const isLoading = ref(true); // Initially set to true

async function fetchData() {
  try {
    const apiUrl = `https://pftraveldev.wpengine.com/wp-json/wp/v2/posts?meta_key=category_name&meta_value=${props.endpoint}&_embed`;
    // const apiUrl = `https://pftraveldev.wpengine.com/wp-json/wp/v2/posts?meta_key=category_name&meta_value=${category}&_embed`;
    const perPage = 100; // Number of posts per page
    // let posts = [];
    let currentPage = 1;
    let totalFetchedPosts = 0;
    while (totalFetchedPosts < 567) { // Stop when reaching 50 posts
    const response = await fetch(`${apiUrl}&per_page=${perPage}&page=${currentPage}`);
    const data = await response.json();
    isLoading.value = false; // Set to false once data is fetched
    if (data.length === 0) {
      console.log('No more posts, exiting loop');
      break; // No more posts, exit loop
    }
    posts.value = posts.value.concat(data);
    console.log('Data type of array:', typeof posts.value);
    totalFetchedPosts += posts.value.length; // Update total fetched posts
    currentPage++;
}
    
  } catch (error) {
    console.error("Failed to fetch data:", error);
  }
}

    
//     const apiUrl = `https://pftraveldev.wpengine.com/wp-json/wp/v2/posts?meta_key=category_name&meta_value=reviews&_embed`;
//     // const apiUrl = `https://pftraveldev.wpengine.com/wp-json/wp/v2/posts?meta_key=category_name&meta_value=${category}&_embed`;
// const perPage = 100; // Number of posts per page
// // const perPage = 100; // Number of posts per page
// // let posts = [];
// let currentPage = 1;
// let totalFetchedPosts = 0;
// while (totalFetchedPosts < 567) { // Stop when reaching 50 posts
// const response = await fetch(`${apiUrl}&per_page=${perPage}&page=${currentPage}`);
// const data = await response.json();
// // console.log('Received posts:', data);
// if (data.length === 0) {
// 	console.log('No more posts, exiting loop');
// 	break; // No more posts, exit loop
// }

// posts.value = posts.concat(data);
// console.log('Data type of array:', typeof posts);
// totalFetchedPosts += posts.length; // Update total fetched posts
// currentPage++;
// }

onMounted(() => {
  fetchData();
  // setInterval(fetchData, 2 * 60 * 60 * 1000); // 2 hours in milliseconds
  // setInterval(fetchData, 30 * 60 * 1000, console.log('New fetch triggered')); // 30 minutes in milliseconds
  setInterval(fetchData, 5 * 60 * 1000, console.log('New fetch triggered')); // 5 minutes in milliseconds
})

function destructureArray(array) {
    const first3 = array.slice(0, 3);
    const second3 = array.slice(3, 6);
    const third3 = array.slice(6, 9);
    const fourth3 = array.slice(9, 12);
    const fifth3 = array.slice(12, 15);
    const sixth5 = array.slice(15, 19);
    const next16 = array.slice(19, 31);
    const restOfPosts = array.slice(31);

    return [first3, second3, third3, fourth3, fifth3, sixth5, next16, restOfPosts];
}

// const [firstArticle, ...allArticles] = newsPosts;

// bit-alaska post had a cross at the end of the url which threw a build error in netlify
function removeSpecialCharactersFromURL(url) {
    // Define a regular expression to match special characters
	const regex = /[^\w\s\-#]/gi;
    // Replace special characters with an empty string
    const cleanURL = url.replace(regex, '');
    return cleanURL;
}

functions.modifyApiResponse(posts);

const filteredData = computed(() => {
  // Show all cards initially; apply filters only after the initial load
  let result = [...posts.value]; // Start with all cards

  if (bankFilter.value) {
    result = result.filter(item =>
    item.title.rendered !== undefined &&
    item.title.rendered.toLowerCase().includes(bankFilter.value.toLowerCase())
    );
  }
  return result;
});

const [first3, second3, third3, fourth3, fifth3, sixth5, next16, restOfPosts] = destructureArray(posts.value);
</script>