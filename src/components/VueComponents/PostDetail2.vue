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
                <img :src="item._embedded['wp:featuredmedia'][0].source_url || item.data?.imageUrl" class="w-100" style="object-fit: cover; height: 325px" alt="">
                <p class="mt-4 mb-0">{{functions.formatDate(item.date)}}</p>
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
                <img :src="item._embedded['wp:featuredmedia'][0].source_url || item.data?.imageUrl" class="w-100" style="object-fit: cover;" alt="">
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
                <img :src="item._embedded['wp:featuredmedia'][0].source_url || item.data?.imageUrl" class="w-100" style="object-fit: cover;" alt="">
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
                  <img :src="item._embedded['wp:featuredmedia'][0].source_url || item.data?.imageUrl" class="w-100 h-100" style="object-fit: cover;" alt="">
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
                <img :src="item._embedded['wp:featuredmedia'][0].source_url || item.data?.imageUrl" class="w-100" style="object-fit: cover;" alt="">
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
                <img :src="item._embedded['wp:featuredmedia'][0].source_url || item.data?.imageUrl" class="w-100" style="object-fit: cover;" alt="">
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
  const isLoading = ref(true); // Initially set to true

  
    const props = defineProps({
      title: String,
      description: String,
      endpoint: String
    })

    const cacheDbName = 'PostsCacheDB';
const cacheStoreName = 'posts';
const cacheDuration = 60 * 60 * 1000; // Cache duration in milliseconds (1 hour)

function openDb() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(cacheDbName, 1);

    request.onupgradeneeded = function (event) {
      const db = event.target.result;
      const store = db.createObjectStore(cacheStoreName, { keyPath: 'id' });
      store.createIndex('timestamp', 'timestamp', { unique: false });
    };

    request.onsuccess = function (event) {
      resolve(event.target.result);
    };

    request.onerror = function (event) {
      reject(event.target.error);
    };
  });
}

async function storeData(data) {
  try {
    const db = await openDb();
    const transaction = db.transaction([cacheStoreName], 'readwrite');
    const store = transaction.objectStore(cacheStoreName);
    const timestamp = Date.now();

    data.forEach(item => {
      store.put({ ...item, timestamp });
    });

    transaction.oncomplete = function () {
      console.log('Data stored successfully.');
    };

    transaction.onerror = function (event) {
      console.error('Failed to store data:', event.target.error);
    };
  } catch (error) {
    console.error('Error storing data:', error);
  }
}


// Fetch data from API and store it in IndexedDB
async function fetchData() {
  try {
    const apiUrl = `https://princeoftravel.wpenginepowered.com/wp-json/wp/v2/posts?meta_key=category_name&meta_value=${props.endpoint}&_embed`;
    const perPage = 100; // Number of posts per page
    let currentPage = 1;
    let totalFetchedPosts = 0;
    let allPosts = [];

    while (totalFetchedPosts < 1000) { // Stop when reaching 1000 posts
      const response = await fetch(`${apiUrl}&per_page=${perPage}&page=${currentPage}`);
      const data = await response.json();
      if (data.length === 0) {
        console.log('No more posts, exiting loop');
        break; // No more posts, exit loop
      }
      allPosts = allPosts.concat(data);
      totalFetchedPosts += data.length; // Update total fetched posts
      currentPage++;
    }

    await storeData(allPosts);
    posts.value = allPosts;
    isLoading.value = false; // Set to false once data is fetched

    console.log('Data fetched and stored successfully.');
  } catch (error) {
    console.error('Failed to fetch data:', error);
  }
}

async function loadCachedData() {
  try {
    const db = await openDb();
    const transaction = db.transaction([cacheStoreName], 'readonly');
    const store = transaction.objectStore(cacheStoreName);
    const currentTime = Date.now();

    return new Promise((resolve, reject) => {
      const request = store.getAll();

      request.onsuccess = function (event) {
        const data = event.target.result;
        const validData = data.filter(item => currentTime - item.timestamp < cacheDuration);
        
        if (validData.length > 0) {
          posts.value = validData;
          isLoading.value = false;
          console.log('Loaded cached data:', posts.value);
          resolve(true);
        } else {
          console.log('Cache is invalid or missing');
          resolve(false);
        }
      };

      request.onerror = function (event) {
        console.error('Failed to load cached data:', event.target.error);
        reject(event.target.error);
      };
    });
  } catch (error) {
    console.error('Error loading cached data:', error);
    return false;
  }
}

onMounted(async () => {
  // Load cached data if available and valid
  const dataLoaded = await loadCachedData();
  if (!dataLoaded) {
    await fetchData();
  }

  // Start the interval for data fetching
  setInterval(fetchData, 60000); // Fetch data every minute
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

 