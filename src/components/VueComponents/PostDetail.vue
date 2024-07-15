<template>
    <div class="container-fluid" style="background: #fffbf8">
      <!-- First Section -->
      <div class="row pt-5 mt-5">
        <div class="col-md-6 p-5 d-flex flex-column justify-content-center align-items-start">
          <div class="m-3 py-5">
            <h1 class="display-1 fw-bold lh-1 ls-1 my-3">Reviews</h1>
            <p class="fs-5 mt-0 col-lg-10 text-black-50">Explore our in-depth Reviews, covering the world’s best airlines, hotels, airport lounges, credit cards, and more. Whether you're a seasoned jetsetter or planning your very first trip, our curated trip reports give you a deep sense of what you can expect upon setting off on your own journey.</p>
          </div>
        </div>

        <div v-for="(item, index) in first3" :key="index" class="col-md-6 p-4">
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
        <div v-for="(item, index) in second3" :key="index" class="col-md-4 p-3">
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
  
        <!-- Second3 -->
    <div class="row min-vh-100">
        <div class="col-md-4 p-3" v-for="(item, index) in second3" :key="index">
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
 

    <!-- Third3 -->
    <div class="row">
        <div v-for="(item, index) in third3" :class="[index === 0 ? 'col-md-6' : 'col-md-3', 'p-4']" :key="index">
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
      <div v-for="(item, index) in fourth3" :key="index">
        <div v-if="index === 0">
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

        <div class="col-lg-6 p-4" v-else>
            <a :href="`/reviews/${removeSpecialCharactersFromURL(item.slug)}/`">
                <div class="pb-3">
                    <img :src="item._embedded['wp:featuredmedia'][0].source_url || item.data.imageUrl" class="w-100" style="object-fit: cover;" alt="">
                    <h1 class="text-body-secondary fw-bold lh-1 mb-3 mt-4" v-html="item.title.rendered"></h1>
                    <div class="col-md-10 fs-5 text-body-secondary mt-0 mb-2" v-html="functions.shorten(item.excerpt.rendered, 150)"></div>
                    <!--<div class="py-2">
                        <p class="small text-uppercase fw-bold my-0"><span class="fw-light text-secondary">Written by</span> {item._embedded?.author[0].name || item.data.author}</p>
                        <p class="small text-uppercase fw-bold my-0"><span class="fw-light text-secondary">On</span> {item.date.toString().slice(0,10) || item.data.pubDate.toString().slice(0,10)}</p>
                    </div>-->
                    <button class="btn btn-dark fw-bold rounded-pill px-4 mt-3 shadow">Read article</button>
                </div>
            </a>
        </div>
    </div><!--end row -->

    <!-- Fifth3 -->
    <div class="row min-vh-100">
        <div class="col-lg-4 p-3" v-for="(item, index) in fifth3" :key="index">
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
            <div class="col-lg-12 p-4" v-for="(item, index) in sixth5" :key="index">
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
          <h1 class="display-2 fw-bold">More reviews</h1>
        </div>
        <div class="row g-5">
            <div class="col-lg-6" v-for="(item, index) in next16" :key="index">
              <img :src="item._embedded['wp:featuredmedia'][0].source_url || item.data.imageUrl" class="w-100" style="object-fit: cover;" alt="">
              <h1 class="fs-5 text-body-secondary fw-bold" v-html="item.title.rendered"></h1>
              <p class="col-md-8 fs-5 text-body-secondary my-0" v-html="functions.shorten(item.excerpt.rendered, 100) + '...'"></p>
              <a :href="`/reviews/${removeSpecialCharactersFromURL(item.slug)}/`">
                <button class="btn btn-dark rounded-pill px-4 mt-2">Read article</button>
              </a>
            </div>
        </div>
      </div>
    </div>

    <!-- Rest of Posts -->
    <div class="row row-cols-1 row-cols-md-3 row-cols-lg-4 g-3 p-4">
        <div class="col p-3" v-for="(item, index) in restOfPosts" :key="index">
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
import { defineProps, onMounted } from 'vue';
import functions from '../../js/functions';

const props = defineProps({
    // first3: Array,
    // second3: Array,
    // third3: Array,
    // fourth3: Array,
    // fifth3: Array,
    // sixth5: Array,
    // next16: Array,
    // restOfPosts: Array,
    category: {
        type: String
    }
    });
    
    const apiUrl = `https://pftraveldev.wpengine.com/wp-json/wp/v2/posts?meta_key=category_name&meta_value=reviews&_embed`;
    // const apiUrl = `https://pftraveldev.wpengine.com/wp-json/wp/v2/posts?meta_key=category_name&meta_value=${category}&_embed`;
const perPage = 100; // Number of posts per page
// const perPage = 100; // Number of posts per page
let posts = [];
let currentPage = 1;
let totalFetchedPosts = 0;
while (totalFetchedPosts < 567) { // Stop when reaching 50 posts
const response = await fetch(`${apiUrl}&per_page=${perPage}&page=${currentPage}`);
const data = await response.json();
// console.log('Received posts:', data);
if (data.length === 0) {
	console.log('No more posts, exiting loop');
	break; // No more posts, exit loop
}

posts = posts.concat(data);
console.log('Data type of array:', typeof posts);
totalFetchedPosts += posts.length; // Update total fetched posts
currentPage++;
}

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

const [first3, second3, third3, fourth3, fifth3, sixth5, next16, restOfPosts] = destructureArray(posts);

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

</script>