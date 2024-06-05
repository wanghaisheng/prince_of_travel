<template>
    <div>
    <div v-if="posts" class="container-fluid">
        <div class="row g-4 p-4">
            <div class="col-md-6 col-lg-3" v-for="(post, index) in posts" :key="index">
		<div class="card rounded-4 p-0 border-0 shadow bg-pc-light mb-3" 
        style="min-height: 500px; break-inside: avoid-column; white-space: nowrap;">
			<div class="text-center">
              <img ref="images" :src="post.featured_image.large"
              class="landscape"
              :data-image-id="'item_' + index"
            alt="">
            <!-- :data-image-id="'item_' + index" -->
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
        </div>	
        </div>
        </div>
          

    </div>
    <div v-else>
      Loading...
    </div>
</div>
  </template>
  
  <script>

import { ref, onMounted } from 'vue';

const images = ref([]);

// bit-alaska post had a cross at the end of the url which threw a build error in netlify
const removeSpecialCharactersFromURL = (url) => {
      // Define a regular expression to match special characters
      const regex = /[^\w\s\-#]/gi;
      // Replace special characters with an empty string
      const cleanURL = url.replace(regex, '');
      return cleanURL;
    };

export default {
  setup() {
    const posts = ref(null);
    const isLoading = ref(true);
    const imageElements = ref([]);
    

    const fetchData = async () => {
      try {
        const response = await fetch('https://pftraveldev.wpengine.com/wp-json/pot/v1/credit-cards?per_page=4');
        const fetchedData = await response.json();
        posts.value = fetchedData;
        console.log(fetchedData)
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        isLoading.value = false;
      }
    };

    const isPortraitImage = (imageElement) => {
      return new Promise((resolve) => {
        const img = new Image();
        img.onload = function() {
          const width = this.width;
          const height = this.height;
          resolve(width < height);
        };
        img.src = imageElement.src;
      });
    };

    // Define handleImageLoad before onMounted
    const handleImageLoad = (imageElement) => {
      isPortraitImage(imageElement)
        .then((isPortrait) => {
          if (isPortrait) {
            imageElement.classList.add('portrait');
            imageElement.classList.remove('landscape');
          }
        })
        .catch((error) => {
          console.error('Error loading image:', error);
        });
    };

    // const checkImageOrientation = () => {
    //   imageElements.value.forEach(image => {
    //     const imgElement = refs.imageElements.find(ref => ref.alt === image.alt);
    //     if (imgElement) {
    //       const img = new Image();
    //       img.onload = function() {
    //         const width = this.width;
    //         const height = this.height;
    //         const isPortrait = width < height;
    //               if (isPortrait) {
    //       imageElement.classList.add('portrait');
    //       imageElement.classList.remove('landscape');
    //     } else {
    //       imageElement.classList.remove('portrait');
    //       imageElement.classList.add('landscape');
    //     }
    //         // isPortrait ? imgElement.classList.add('portrait') : imgElement.classList.add('landscape');
    //       };
    //       img.src = image.url;
    //     }
    //   });
    // };
     

    onMounted(() => {
      fetchData();
      images.value.forEach((imageElement) => {
        // Check if the image is already loaded
        if (imageElement.complete) {
          handleImageLoad(imageElement);
        } else {
          // Listen for the load event if the image is not yet loaded
          imageElement.addEventListener('load', () => handleImageLoad(imageElement));
        }
      });
    });


    return { posts, isLoading, images, removeSpecialCharactersFromURL };
  },
};
</script>

<style>
.portrait {
  /* Styles for portrait images */
  height: 300px;
  width: 200px;
  background-color: #d6d6d6;
  text-align: center;
  margin: 20px 0;
}

.landscape {
  /* Styles for landscape images */
  padding: 10px;
  width: 100%;
}
</style>
<!-- 
<template>
  <div>
    <div v-if="isLoading">Loading...</div>
    <div v-else-if="error">{{ error }}</div>
    <div v-else>
      <div v-for="(item, index) in responseData" :key="index">
        Pass item as a scoped slot prop
        <slot :item="item"></slot>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, watchEffect } from 'vue';

export default {
  props: {
    endpoint: {
      type: String,
      required: true
    }
  },
  setup(props, { slots }) {
    const isLoading = ref(false);
    const error = ref(null);
    const responseData = ref([]);

    const fetchData = async () => {
      isLoading.value = true;
      try {
        const response = await fetch(props.endpoint);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        responseData.value = data;
      } catch (err) {
        error.value = err.message || 'An error occurred';
      } finally {
        isLoading.value = false;
      }
    };

    watchEffect(() => {
      fetchData();
    });

    return {
      isLoading,
      error,
      responseData
    };
  }
};
</script> -->
  
<!-- then in the template -->

<!-- <template>
    <CustomComponent endpoint="your-api-endpoint">
      Access the item using the slot
      <template #default="{ item }">
        <div>
          <h2>{{ item.title }}</h2>
          <p>{{ item.description }}</p>
        </div>
      </template>
    </CustomComponent>
  </template>
  
  <script>
  import CustomComponent from './CustomComponent.vue';
  
  export default {
    components: {
      CustomComponent
    }
  };
  </script> -->
  