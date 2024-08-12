<template>
  <div class="container-fluid animate-in" v-if="isLoading">
    <div class="row pt-5 mt-5 min-vh-100">
      <div class="col-md-6 p-5 d-flex flex-column justify-content-center align-items-start">
          <div class="m-3 py-5">
            <h1 class="display-1 fw-bold lh-1 ls-1 my-3">{{ title }}</h1>
            <p class="fs-5 mt-0 col-lg-10 text-black-50">{{ description }}</p>
          </div>
        </div>

        <div class="col-md-6 p-4">
            <div class="pb-3">
              <div class="rounded-1" style="height: 300px; width: 100%; background: #eee;"></div>
              <p class="placeholder-glow mb-2 mt-3">
                <span class="placeholder col-12 placeholder-lg rounded-2 py-4"></span>
              </p>
              <p class="placeholder-glow my-2">
                <span class="placeholder col-10 placeholder-lg rounded-2"></span>
              </p>
              <p class="placeholder-glow my-1">
                <span class="placeholder col-9 placeholder-lg rounded-2"></span>
              </p>
              <p class="placeholder-glow my-1">
                <span class="placeholder col-8 placeholder-lg rounded-2"></span>
              </p>
              <button class="btn btn-dark fw-bold rounded-pill px-5 py-3 mt-3 shadow" disabled></button>
            </div>
        </div>
      </div>
      </div>

    <div class="container-fluid" style="background: #fffbf8" v-else-if="posts.length">
    <!-- <div class="container-fluid animate-in" style="background: #fffbf8"> -->
      <!-- First Section -->
      <div class="row pt-5 mt-5">
        <!-- <div class="col-lg-12 pt-2 px-3">
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
        </div> -->
        <div class="col-md-6 p-5 d-flex flex-column justify-content-center align-items-start">
          <div class="m-3 py-5">
            <h1 class="display-1 fw-bold lh-1 ls-1 my-3">{{ title }}</h1>
            <p class="fs-5 mt-0 col-lg-10 text-black-50">{{ description }}</p>
          </div>
        </div>

        <div v-for="(item, index) in filteredData?.slice(0,3)" :key="index" class="col-md-6 p-4 animate-in">
          <a :href="`/reviews/${removeSpecialCharactersFromURL(item.slug)}/`">
            <div class="pb-3">
              <img :src="item._embedded['wp:featuredmedia'][0].source_url || item.data.imageUrl" class="w-100" style="object-fit: cover; height: 350px" alt="">
              <p class="mt-4 mb-0" v-if="index != 0">{{functions.formatDate(item.date)}}</p>
              <h1 class="text-body-secondary fw-bold lh-1 mb-3 mt-4" v-if="index === 0">{{ item.title.rendered }}</h1>
              <h1 class="text-body-secondary fw-bold lh-1 my-3" v-else>{{ item.title.rendered }}</h1>
              <div class="col-md-10 fs-5 text-body-secondary mt-0 mb-2" v-html="functions.shorten(item.excerpt.rendered, 150)"></div>
              <button class="btn btn-dark fw-bold rounded-pill px-4 mt-1 shadow">Read article</button>
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
              <p class="mt-4 mb-0">{{functions.formatDate(item.date)}}</p>
              <h1 class="text-body-secondary fw-bold lh-1 my-3">{{ item.title.rendered }}</h1>
              <div class="col-md-10 fs-5 text-body-secondary mt-0 mb-2" v-html="functions.shorten(item.excerpt.rendered, 150)"></div>
              <button class="btn btn-dark fw-bold rounded-pill px-4 mt-1 shadow">Read article</button>
            </div>
          </a>
        </div>
      </div>
  
    <!-- Third3 -->
    <div class="row">
        <div v-for="(item, index) in filteredData?.slice(6,9)" :class="[index === 0 ? 'col-md-6' : 'col-md-6 col-lg-3', 'p-4']" :key="index">
          <a :href="`/reviews/${removeSpecialCharactersFromURL(item.slug)}/`">
            <div class="pb-3">
              <img :src="item._embedded['wp:featuredmedia'][0].source_url || item.data.imageUrl" class="w-100" style="object-fit: cover;" alt="">
              <p class="mt-4 mb-0">{{functions.formatDate(item.date)}}</p>
              <h1 :class="[index !== 0 ? 'fs-3' : '', 'text-body-secondary fw-bold lh-1 my-3']" v-html="item.title.rendered"></h1>
              <div class="col-md-10 fs-5 text-body-secondary mt-0 mb-2" v-html="functions.shorten(item.excerpt.rendered, 150)"></div>
              <button class="btn btn-dark fw-bold rounded-pill px-4 mt-3 shadow">Read article</button>
            </div>
          </a>
        </div>
    </div><!--end row -->

    <!-- Fourth3 -->
      <div class="row" v-for="(item, index) in filteredData?.slice(9,12)" :key="index">
            <div class="col-lg-6 p-4">
                <img :src="item._embedded['wp:featuredmedia'][0].source_url || item.data.imageUrl" class="w-100 h-100" style="object-fit: cover;" alt="">
            </div>

          <div class="col-lg-6 px-4 pb-5 pt-0 p-lg-5 d-flex flex-column justify-content-center align-items-start">
            <a :href="`/reviews/${removeSpecialCharactersFromURL(item.slug)}/`">
              <p class="mt-4 mb-0">{{functions.formatDate(item.date)}}</p>
            <h1 class="text-body-secondary fw-bold text-balance lh-1 my-3" v-html="item.title.rendered"></h1>
            <div class="col-md-10 fs-5 text-body-secondary mt-0 mb-2" v-html="functions.shorten(item.excerpt.rendered, 150)"></div>
            <button class="btn btn-dark fw-bold rounded-pill px-4 mt-1 shadow">Read article</button>
            </a>
          </div>
    </div>
    <!--end row -->

    <!-- Fifth3 -->
    <div class="row min-vh-100">
        <div class="col-lg-4 p-3" v-for="(item, index) in filteredData?.slice(12,15)" :key="index">
          <a :href="`/reviews/${removeSpecialCharactersFromURL(item.slug)}/`">
            <div class="pb-3">
              <img :src="item._embedded['wp:featuredmedia'][0].source_url || item.data.imageUrl" class="w-100" style="object-fit: cover;" alt="">
              <p class="mt-4 mb-0">{{functions.formatDate(item.date)}}</p>
              <h1 class="text-body-secondary fw-bold lh-1 my-3" v-html="item.title.rendered"></h1>
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
              <p class="mt-4 mb-0">{{functions.formatDate(item.date)}}</p>
              <h1 class="text-body-secondary fw-bold lh-1 my-3" v-html="item.title.rendered"></h1>
              <div class="col-md-10 fs-5 text-body-secondary mt-0 mb-2" v-html="functions.shorten(item.excerpt.rendered, 150)"></div>
              <a :href="`/reviews/${removeSpecialCharactersFromURL(item.slug)}/`">
                <button class="btn btn-dark fw-bold rounded-pill px-4 mt-1 shadow">Read article</button>
              </a>
            </div>
        </div>
      </div>

      <div class="col-lg-6 p-5 order-1 order-lg-2">
        <div class="col-lg-12 py-5">
          <h1 class="display-2 fw-bold">More {{ title }}</h1>
        </div>
        <div class="row g-5">
            <div class="col-lg-6 px-3" v-for="(item, index) in filteredData.slice(19, 31)" :key="index">
              <img :src="item._embedded['wp:featuredmedia'][0]?.source_url || item.data?.imageUrl" class="w-100" style="object-fit: cover;" alt="">
              <p class="mt-4 mb-0">{{functions.formatDate(item.date)}}</p>
              <h4 class="text-body-secondary fw-bold my-3" v-html="item.title.rendered"></h4>
              <div class="text-body-secondary my-0" v-html="functions.shorten(item.excerpt.rendered, 100) + '...'"></div>
              <a :href="`/reviews/${removeSpecialCharactersFromURL(item.slug)}/`">
                <button class="btn btn-sm btn-dark rounded-pill px-4 py-1 mt-1">Read article</button>
              </a>
            </div>
        </div>
      </div>
    </div>

    <!-- Rest of Posts -->
    <div class="row row-cols-1 row-cols-md-3 row-cols-lg-4 g-3 p-4">
        <div class="col p-3" v-for="(item, index) in filteredData.slice(31)" :key="index">
          <img v-if="item._embedded['wp:featuredmedia'][0].source_url || item.data?.imageUrl" :src="item._embedded['wp:featuredmedia'][0].source_url || item.data?.imageUrl" class="w-100" style="object-fit: cover; min-height: 210px;" alt="">
          <div v-else style="min-height: 210px; width: 100%; background: #eee;"></div>
          <p class="mt-4 mb-0">{{functions.formatDate(item.date)}}</p>
          <h1 class="fs-3 text-body-secondary fw-bold lh-1 my-3" v-html="item.title.rendered"></h1>
          <div class="col-md-10 fs-5 text-body-secondary mt-0 mb-2" v-html="functions.shorten(item.excerpt.rendered, 150)"></div>
          <a :href="`/reviews/${removeSpecialCharactersFromURL(item.slug)}/`">
            <button class="btn btn-dark fw-bold rounded-pill px-4 mt-1">Read article</button>
          </a>
        </div>
    </div>
</div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import functions from '../../js/functions';
let posts = ref([]);
const bankFilter = ref('');

let intervalId;

  const props = defineProps({
    title: String,
    description: String,
    endpoint: String
  })


    const isLoading = ref(true); // Initially set to true

    if (!posts.value.length) {
    fetchData();
  }

async function fetchData() {
  try {

//     const apiUrl = `https://princeoftravel.wpenginepowered.com/wp-json/wp/v2/posts?meta_key=category_name&meta_value=${props.endpoint}&_embed&orderby=date&order=desc`;
// const perPage = 10; // Number of posts per page
// let articles = [];
// let currentPage = 1;
// let totalPages = 1; // Initialize with 1 to start the loop

// while (currentPage <= totalPages) {
//     const response = await fetch(`${apiUrl}&per_page=${perPage}&page=${currentPage}`);
//     const data = await response.json();
//     // isLoading.value = false;

//     // Check response headers for total pages
//     const totalPagesHeader = response.headers.get('X-WP-TotalPages');
//     totalPages = totalPagesHeader ? parseInt(totalPagesHeader, 10) : 1;

//     if (data.length === 0) {
//         console.log('No more posts, exiting loop');
//         break; // No more posts, exit loop
//     }

//     articles = articles.concat(data);
//     currentPage++;
// }

// // isLoading.value = false; // Set to false once all data is fetched
// posts.value = articles; // Update posts after fetching all pages
// console.log('Data type of array:', typeof posts.value);


//     const apiUrl = `https://pftraveldev.wpengine.com/wp-json/wp/v2/posts?meta_key=category_name&meta_value=${props.endpoint}&_embed&orderby=date&order=desc`;
//     // const apiUrl = 'https://pftraveldev.wpengine.com/wp-json/wp/v2/posts?meta_key=category_name&meta_value=news&_embed&orderby=date&order=desc';

// const perPage = 100; // Number of posts per page
// let articles = [];
// let currentPage = 1;
// let totalPages = 1; // Initialize with 1 to start the loop

// while (currentPage <= totalPages) {
//     const response = await fetch(`${apiUrl}&per_page=${perPage}&page=${currentPage}`);
//     const data = await response.json();
//     isLoading.value = false; // Set to false once data is fetched

//     // Check response headers for total pages
//     const totalPagesHeader = response.headers.get('X-WP-TotalPages');
//     totalPages = totalPagesHeader ? parseInt(totalPagesHeader, 10) : 1;

//     if (data.length === 0) {
//         console.log('No more posts, exiting loop');
//         break; // No more posts, exit loop
//     }

//     posts.value = articles.concat(data);
//     console.log('Data type of array:', typeof posts.value);
//     currentPage++;

// OG code getting fixed # posts

    const apiUrl = `https://pftraveldev.wpengine.com/wp-json/wp/v2/posts?meta_key=category_name&meta_value=${props.endpoint}&_embed`;
    const perPage = 100; // Number of posts per page
    let currentPage = 1;
    let totalFetchedPosts = 0;
    while (totalFetchedPosts < 1000) { // Stop when reaching 50 posts
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
  
  isLoading.value = false;
  } catch (error) {
    console.error("Failed to fetch data:", error);
  }
}


onMounted(() => {
  // Check if data already exists to avoid refetching
  if (!posts.value.length) {
    fetchData();
  }

  // Start the interval for data fetching
  intervalId = setInterval(fetchData, 60000); // Fetch data every 5 minutes
  // intervalId = setInterval(fetchData, 300000); // Fetch data every 5 minutes
});

onUnmounted(() => {
  // Clear the interval when the component is unmounted
  clearInterval(intervalId);
});

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