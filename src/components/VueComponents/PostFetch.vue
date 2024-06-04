<template>
    <div>
    <div v-if="posts">
      <!-- <ul>
        <li v-for="(post, index) in posts" :key="index">
          {{ post.custom_fields.title }} 
        </li>
      </ul> -->
      <!-- {posts?.map((post, index) => (		 -->
					<div v-for="(post, index) in posts" :key="index" class="card rounded-4 p-0 border-0 shadow bg-pc-light mb-3" style="min-height: 500px; break-inside: avoid-column; white-space: nowrap;">
						<div class="text-center" style="background: #d6d6d6">
              <img :src="post.featured_image.large" class="landscape" :data-image-id="'item_' + index"
            alt="">
            </div>
						<div class="card-body position-relative px-4 pb-3">
							<h5 class="fs-4 text-dark card-title fw-bold mb-0" style="font-size: 24px; text-wrap: pretty" v-html="post.custom_fields.credit_card_short_name"></h5>
              <span class="badge position-absolute end-0 top-0 m-3">{{post.custom_fields.bank_name}}</span>
              <div class="my-3">
							  <p class="small m-0 text-secondary mt-2 mb-0" style="font-size: 16px" v-html="post.custom_fields.reward_points"></p>
                <p class="small m-0 text-secondary my-0" style="font-size: 16px" v-html="post.custom_fields.fees"></p>
              </div>
              <ul class="text-black-50 mt-2 text-balance" style="font-size: 16px">
                <li v-html="post.custom_fields.features_0_feature"></li>
                <li v-html="post.custom_fields.features_1_feature"></li>
                <li v-html="post.custom_fields.features_2_feature"></li>
              </ul>
              <div class="d-flex flex-wrap pb-3 pt-2">
                <button class="btn btn-sm btn-secondary opacity-75 me-1 rounded-pill px-4" type="button" data-bs-toggle="offcanvas" :data-bs-target="'#item_' + index" aria-controls="offcanvasBottom">Details</button>
                <!-- <a :href="`/credit-cards/${removeSpecialCharactersFromURL(post.slug)`">
                <button class="btn btn-sm btn-secondary rounded-pill px-4 mt-2 mt-lg-0">Review</button>
                </a> -->

                <a :href="'/credit-cards/' + removeSpecialCharactersFromURL(post.slug)">
                <button class="btn btn-sm btn-secondary rounded-pill px-4 mt-2 mt-lg-0">Learn more</button>
                </a>
              </div>
						</div>

            <div class="offcanvas offcanvas-bottom mx-2 mx-lg-5 rounded-top-4" style="height: 90%" tabindex="-1" :id="'item_' + index" aria-labelledby="offcanvasBottomLabel" :data-product-slug="post.slug">
            <div class="offcanvas-body position-relative rounded-top-4" style="background: var(--beige); padding: 76px">
              <svg id="offcanvasClose" role="button" style="width: 40px;" data-bs-dismiss="offcanvas" aria-label="Close" xmlns="http://www.w3.org/2000/svg" width="46" height="46" fill="currentColor" class="bi bi-x-circle-fill position-absolute end-0 top-0 m-4" viewBox="0 0 16 16">
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z"/>
              </svg>

              <div class="row">
                <div class="col-lg-3 d-flex justify-content-center align-items-center">
                  <img :src="post.featured_image.large" :data-image-id="'item_' + index" class="credit-card-img" alt="">
                </div>  
                <div class="col-lg-9 d-flex flex-column justify-content-center align-items-start">
                  <h2 class="display-3 ls-1 lh-1 text-black-50 fw-bold my-4 px-4" v-html="post.title"></h2>
                </div>
              </div>

              <div class="container-fluid px-0 mt-4 mb-5">
                  <div class="row row-cols-1 row-cols-sm-2 row-cols-lg-4 g-4 my-3">
                    <div class="col">
                      <div class="bg-light rounded-4 shadow" style="min-height: 214px; padding: 2.5rem; --bs-bg-opacity: 0.5;">
                        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="currentColor" class="bi bi-award text-black-50 mb-2" viewBox="0 0 16 16">
                          <path d="M9.669.864 8 0 6.331.864l-1.858.282-.842 1.68-1.337 1.32L2.6 6l-.306 1.854 1.337 1.32.842 1.68 1.858.282L8 12l1.669-.864 1.858-.282.842-1.68 1.337-1.32L13.4 6l.306-1.854-1.337-1.32-.842-1.68zm1.196 1.193.684 1.365 1.086 1.072L12.387 6l.248 1.506-1.086 1.072-.684 1.365-1.51.229L8 10.874l-1.355-.702-1.51-.229-.684-1.365-1.086-1.072L3.614 6l-.25-1.506 1.087-1.072.684-1.365 1.51-.229L8 1.126l1.356.702z"/>
                          <path d="M4 11.794V16l4-1 4 1v-4.206l-2.018.306L8 13.126 6.018 12.1z"/>
                        </svg>
                        <h5 class="fs-3 fw-bold">MR Points</h5>
                        <p class="my-0 text-black-50" style="font-size: 17px;" v-html="post.custom_fields.membership_reward"></p>
                      </div>
                    </div>
                    <div class="col">  
                      <div class="bg-light rounded-4 shadow"  style="min-height: 214px; padding: 2.5rem; --bs-bg-opacity: 0.5;">
                        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="currentColor" class="bi bi-credit-card-2-back text-black-50 mb-2" viewBox="0 0 16 16">
                          <path d="M11 5.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5z"/>
                          <path d="M2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2zm13 2v5H1V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1m-1 9H2a1 1 0 0 1-1-1v-1h14v1a1 1 0 0 1-1 1"/>
                        </svg>
                        <h5 class="fs-3 fw-bold">1st Year Value</h5>
                        <p class="my-0 text-black-50" style="font-size: 17px;" v-html="post.custom_fields.fees"></p>
                      </div>  
                      </div>
                      <div class="col">
                      <div class="bg-light rounded-4 shadow"  style="min-height: 214px; padding: 2.5rem; --bs-bg-opacity: 0.5;">
                        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="currentColor" class="bi bi-coin text-black-50 mb-2" viewBox="0 0 16 16">
                          <path d="M5.5 9.511c.076.954.83 1.697 2.182 1.785V12h.6v-.709c1.4-.098 2.218-.846 2.218-1.932 0-.987-.626-1.496-1.745-1.76l-.473-.112V5.57c.6.068.982.396 1.074.85h1.052c-.076-.919-.864-1.638-2.126-1.716V4h-.6v.719c-1.195.117-2.01.836-2.01 1.853 0 .9.606 1.472 1.613 1.707l.397.098v2.034c-.615-.093-1.022-.43-1.114-.9zm2.177-2.166c-.59-.137-.91-.416-.91-.836 0-.47.345-.822.915-.925v1.76h-.005zm.692 1.193c.717.166 1.048.435 1.048.91 0 .542-.412.914-1.135.982V8.518z"/>
                          <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                          <path d="M8 13.5a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11m0 .5A6 6 0 1 0 8 2a6 6 0 0 0 0 12"/>
                        </svg>
                        <h5 class="fs-3 fw-bold">Fees</h5>
                        <p class="my-0 text-black-50" style="font-size: 17px;" v-html="'$' + post.custom_fields.annual_fee + ' Annual fee'"></p>
                      </div>  
                      </div>
                      <div class="col">
                      <div class="bg-light rounded-4 shadow"  style="min-height: 214px; padding: 2.5rem; --bs-bg-opacity: 0.5;">
                        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="currentColor" class="bi bi-patch-check text-black-50 mb-2" viewBox="0 0 16 16">
                          <path fill-rule="evenodd" d="M10.354 6.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7 8.793l2.646-2.647a.5.5 0 0 1 .708 0"/>
                          <path d="m10.273 2.513-.921-.944.715-.698.622.637.89-.011a2.89 2.89 0 0 1 2.924 2.924l-.01.89.636.622a2.89 2.89 0 0 1 0 4.134l-.637.622.011.89a2.89 2.89 0 0 1-2.924 2.924l-.89-.01-.622.636a2.89 2.89 0 0 1-4.134 0l-.622-.637-.89.011a2.89 2.89 0 0 1-2.924-2.924l.01-.89-.636-.622a2.89 2.89 0 0 1 0-4.134l.637-.622-.011-.89a2.89 2.89 0 0 1 2.924-2.924l.89.01.622-.636a2.89 2.89 0 0 1 4.134 0l-.715.698a1.89 1.89 0 0 0-2.704 0l-.92.944-1.32-.016a1.89 1.89 0 0 0-1.911 1.912l.016 1.318-.944.921a1.89 1.89 0 0 0 0 2.704l.944.92-.016 1.32a1.89 1.89 0 0 0 1.912 1.911l1.318-.016.921.944a1.89 1.89 0 0 0 2.704 0l.92-.944 1.32.016a1.89 1.89 0 0 0 1.911-1.912l-.016-1.318.944-.921a1.89 1.89 0 0 0 0-2.704l-.944-.92.016-1.32a1.89 1.89 0 0 0-1.912-1.911z"/>
                        </svg>
                        <h5 class="fs-3 fw-bold">Perks</h5>
                        <p class="my-0 text-black-50" style="font-size: 17px;" v-html="post.custom_fields.features_1_feature"></p>
                      </div>  
                      </div>
                    </div>  
                  </div>
              
              <div class="display-5 fw-bold my-4 text-black-50" v-html="post.custom_fields.card_content_1_c_title"></div>
              <div class="fs-5 text-body-secondary">
                <p v-html="post.custom_fields.card_content_1_c_content"></p>
              </div>
              <div class="display-5 fw-bold my-4 text-black-50" v-html="post.custom_fields.card_content_4_c_title"></div>
              <div class="fs-5">
                <p v-html="post.custom_fields.card_content_4_c_content"></p>
              </div>
              <div class="d-flex mt-5 pt-4 justify-content-end border-top border-secondary">
                <a :href="post.custom_fields.colum_block_0_col1_button_link" target="_blank">
                  <button class="btn btn-secondary rounded-pill px-4 me-2">Apply Now</button>
                </a>
                <!-- <a href={`/credit-cards/${removeSpecialCharactersFromURL(post.slug)}/`}>
                  <button class="btn btn-secondary rounded-pill px-4">Read More</button>
                </a> -->
              </div>
            </div>
        </div>

					</div>	
          

			<!-- ))}		 -->
    </div>
    <div v-else>
      Loading...
    </div>
</div>
  </template>
  
  <script>
import { ref, onMounted, onBeforeUnmount } from 'vue';

// bit-alaska post had a cross at the end of the url which threw a build error in netlify
const removeSpecialCharactersFromURL = (url) => {
      // Define a regular expression to match special characters
      const regex = /[^\w\s\-#]/gi;
      // Replace special characters with an empty string
      const cleanURL = url.replace(regex, '');
      return cleanURL;
    };

function isPortraitImage(imageElement, callback) {
    const img = new Image();
    img.onload = function() {
        const width = this.width;
        const height = this.height;
        callback(width < height);
    };
    img.src = imageElement.src;
}

export default {
  setup() {
    const posts = ref(null);
    const isLoading = ref(true);

    const fetchData = async () => {
      try {
        const response = await fetch('https://pftraveldev.wpengine.com/wp-json/pot/v1/credit-cards?per_page=100');
        const fetchedData = await response.json();
        posts.value = fetchedData;
        console.log(fetchedData)
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        isLoading.value = false;
      }
    };
  
    // onMounted(fetchData);
    onMounted(() => {
      fetchData();

    });


    return { posts, isLoading, removeSpecialCharactersFromURL };
  },
};
</script>