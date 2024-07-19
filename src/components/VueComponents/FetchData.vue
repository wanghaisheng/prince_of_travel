<template>
  <div>
    <div class="container-fluid">
      <div class="row px-4">
        <div class="col-lg-10 offset-lg-1 p-3 bg-light rounded-4 border mt-3">
          <!-- <h6 class="fs-5 text-secondary p-2">Filter cards</h6> -->
          <ul class="nav nav-pills nav-fill">
            <li class="nav-item me-2 mb-2 mb-md-0">
              <select class="form-select" aria-label="Filter by bank" v-model="bankFilter">
                <option value="" selected>Search by Bank</option>
                <option v-for="option in bankOptions" :key="option" :value="option">{{ option }}</option>
              </select>

              <!-- <select v-model="bankFilter">
      <option v-for="option in bankOptions" :key="option" :value="option">{{ option }}</option>
    </select> -->

              <!-- <select v-model="bankFilter">
  <option value="">All Cards</option>
  <option v-for="option in bankOptions" :key="option" :value="option">{{ option }}</option>
</select> -->

              <!-- <form class="form-floating">
                <input type="text" class="form-control rounded-3 border border-secondary" id="floatingInputValue"
                v-model="bankFilter" placeholder="Search by Bank Name">
                <label for="floatingInputValue" class="small text-secondary">Bank (i.e. BMO)</label>
              </form> -->
            </li>
            <li class="nav-item me-2 mb-2 mb-md-0">
              <select class="form-select" aria-label="Filter by issuer" v-model="providerFilter">
                <option value="" selected>Search by Network</option>
                <option v-for="option in providerOptions" :key="option" :value="option">{{ option }}</option>
              </select>


              <!-- <select v-model="providerFilter">
  <option value="">All Cards</option>
  <option v-for="option in providerOptions" :key="option" :value="option">{{ option }}</option>
</select> -->

<!-- <select v-model="providerFilter">
      <option v-for="option in providerOptions" :key="option" :value="option">{{ option }}</option>
    </select> -->
              <!-- <form class="form-floating">
                <input type="text" class="form-control rounded-3 border border-secondary" id="floatingInputValue"
                v-model="providerFilter" placeholder="Search by Credit Card Provider">
                <label for="floatingInputValue" class="small text-secondary">Issuer (i.e. VISA)</label>
              </form> -->
            </li>
            <!-- <li class="nav-item me-2">
              <select v-model="annualFeeRange">
                <option value="">Select Range</option>
                <option value="0-100">$0 - $100</option>
                <option value="100-250">$100 - $250</option>
                <option value="250-500">$250 - $500</option>
                <option value="500-2000">$500 - 2000</option>
              </select>
            </li> -->
            <li class="nav-item me-2">
              <button @click="sortByAnnualFee" class="btn btn-dark rounded-3 w-100">Annual Fee $-$$</button>
            </li>
            <li class="nav-item me-2">
              <button @click="resetFilters" class="btn btn-dark rounded-3 w-100">Reset</button>
            </li>
          </ul>
        </div>
        </div>
    </div>
    <!-- end filter container -->

    <!-- <input v-model="bankFilter" placeholder="Filter by Bank Name" /> -->
    <!-- <input v-model="providerFilter" placeholder="Filter by Credit Card Provider" /> -->

    <div class="container-fluid">
      <div class="row p-4" v-if="filteredData.length">
          <div v-for="(post, index) in filteredData" :key="post.id" class="col-lg-6 px-2 credit-card-item" :data-id="index + 1">
            <!-- {{ post.title }} -->
        <div class="card mb-3 rounded-5 shadow position-relative d-flex justify-content-center" style="background: rgba(255,255,255,0.6);">
          <!-- min-height: 350px; -->
          
          <div class="row g-0 p-2">
            <div class="col-5 d-flex flex-column justify-content-center align-items-center text-start p-3 rounded-5 position-relative" style="background: #00000020;">
              <!-- min-height: 330px -->

            <div class="card-bg-circle position-absolute z-0 rounded-circle top-50 start-50 translate-middle"></div>
              <div class="text-center mx-auto position-relative">
                <img :src="getImageSrc(post.featured_image.large)" alt=""
                :class="isPortraitImage(post) ? 'portrait' : 'landscape'"
                 :data-image-id="'item_' + index">
              </div>
            </div>
            <div class="col-7 d-flex px-4 py-3">
              <div class="card-body position-relative py-0 px-0 d-flex flex-column justify-content-center align-items-start text-start">
                <h5 class="card-title fw-bold mb-0" style="font-size: 3.6vmin; letter-spacing: -1px" v-html="post.title"></h5>
                <!--<badge class="badge position-absolute end-0 top-0 m-3">{post.custom_fields.bank_name}</badge>-->
                <div class="my-2">
                  <!--<p class="small m-0 mt-2 mb-0" style="font-size: 16px" v-html="post.custom_fields.reward_points"></p>-->
                  <p class="small m-0 mt-2 mb-0 fw-bold" style="font-size: 14.5px" v-html="post.custom_fields.membership_reward"></p>
                  <p v-if="post.custom_fields.welcome_bonus_value" class="small m-0 my-0 fw-bold" style="font-size: 15px">$<span class="fw-bold" v-html="post.custom_fields.welcome_bonus_value"></span> First year value</p>
                  <p v-else class="small m-0 my-0" style="font-size: 14.5px">N/A</p>
                </div>

                <ul class="d-none d-md-block text-body-secondary mt-2 list-unstyled pe-3" style="font-size: 14px">
                  <li v-if="!post.custom_fields.features_1_feature || !post.custom_fields.features_2_feature" class="border-bottom border-top my-1 py-2" v-html="post.custom_fields.features_0_feature"></li>
                  <li v-else class="border-bottom border-top mb-1 pb-2 pt-1" v-html="post.custom_fields.features_0_feature"></li>
                  <li v-if="post.custom_fields.features_1_feature" class="border-bottom mb-1 pb-2" v-html="post.custom_fields.features_1_feature"></li>
                  <li v-if="post.custom_fields.features_2_feature" class="d-none d-xl-block border-bottom mb-1 pb-1" v-html="post.custom_fields.features_2_feature"></li>
                </ul>
                <div class="d-flex pt-2">
                  <button class="btn btn-sm btn-secondary fw-bold opacity-75 me-1 rounded-pill px-3 py-1 px-lg-4 py-lg-2" type="button" data-bs-toggle="offcanvas" :data-bs-target="'#item_' + index" aria-controls="offcanvasBottom">Details</button>
                  <a :href="`/credit-cards/${encodeURIComponent(post.slug)}`">
                    <button class="btn btn-sm btn-dark fw-bold rounded-pill px-3 py-1 px-lg-4 py-lg-2">Review</button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="offcanvas offcanvas-bottom mx-auto rounded-top-4 px-0" style="width: 90%; height: 90%" tabindex="-1" :id="'item_' + index" aria-labelledby="offcanvasBottomLabel" :data-product-slug="post.slug">
            <div class="offcanvas-body position-relative rounded-top-4" style="background: #ddd; padding: 76px; padding: 7% 10%">
              <svg id="offcanvasClose" role="button" style="width: 40px;" data-bs-dismiss="offcanvas" aria-label="Close" xmlns="http://www.w3.org/2000/svg" width="46" height="46" fill="currentColor" class="bi bi-x-circle-fill position-absolute end-0 top-0 m-4" viewBox="0 0 16 16">
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z"/>
              </svg>

              <div class="row px-3">
                  <div class="col-md-5 col-lg-4 d-flex justify-content-center align-items-center p-3 rounded-5 position-relative">
                    <div class="position-absolute z-0 rounded-circle top-50 start-50 translate-middle" style="height: 15vw; width: 15vw; background: #00000050"></div>
                    <div class="text-center position-relative">
                      <img :src="getImageSrc(post.featured_image.large)" alt=""
                      :class="isPortraitImage(post) ? 'portrait portrait-detail' : 'landscape landscape-detail'"
                      :data-image-id="'item_' + index">
                    </div>
                  </div>
                <div class="col-md-7 col-lg-8 d-flex flex-column justify-content-center align-items-center align-items-lg-start text-center text-md-start">
                  <h2 class="display-3 ls-1 lh-1 text-black-50 fw-bold my-0 mb-lg-4 px-4" v-html="post.title"></h2>
                </div>
              </div>

              <div class="container-fluid px-0 mt-3 mb-5">
                  <div class="row row-cols-1 row-cols-lg-2 row-cols-xl-4 g-3 my-3">
                    <div class="col">
                      <div class="bg-light rounded-4 shadow" style="min-height: 240px; padding: 2.5rem; --bs-bg-opacity: 0.5;">
                        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="currentColor" class="bi bi-award text-black-50 mb-2" viewBox="0 0 16 16">
                          <path d="M9.669.864 8 0 6.331.864l-1.858.282-.842 1.68-1.337 1.32L2.6 6l-.306 1.854 1.337 1.32.842 1.68 1.858.282L8 12l1.669-.864 1.858-.282.842-1.68 1.337-1.32L13.4 6l.306-1.854-1.337-1.32-.842-1.68zm1.196 1.193.684 1.365 1.086 1.072L12.387 6l.248 1.506-1.086 1.072-.684 1.365-1.51.229L8 10.874l-1.355-.702-1.51-.229-.684-1.365-1.086-1.072L3.614 6l-.25-1.506 1.087-1.072.684-1.365 1.51-.229L8 1.126l1.356.702z"/>
                          <path d="M4 11.794V16l4-1 4 1v-4.206l-2.018.306L8 13.126 6.018 12.1z"/>
                        </svg>
                        <h5 class="fs-4 fw-bold">Rewards</h5>
                        <p v-if="post.custom_fields.membership_reward == '' || post.custom_fields.membership_reward == null" class="my-0 text-black-50" style="font-size: 17px;">N/A</p>
                        <p v-else class="my-0 text-black-50" style="font-size: 17px;" v-html="post.custom_fields.membership_reward"></p>
                      </div>
                    </div>
                    <div class="col">  
                      <div class="bg-light rounded-4 shadow"  style="min-height: 240px; padding: 2.5rem; --bs-bg-opacity: 0.5;">
                        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="currentColor" class="bi bi-credit-card-2-back text-black-50 mb-2" viewBox="0 0 16 16">
                          <path d="M11 5.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5z"/>
                          <path d="M2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2zm13 2v5H1V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1m-1 9H2a1 1 0 0 1-1-1v-1h14v1a1 1 0 0 1-1 1"/>
                        </svg>
                        <h5 class="fs-4 fw-bold">1st Year Value</h5>
                        <p v-if="!post.custom_fields.welcome_bonus_value || post.custom_fields.welcome_bonus_value === '0'" class="my-0 text-black-50" style="font-size: 17px;">N/A</p>
                        <p v-else class="my-0 text-black-50" style="font-size: 17px;" v-html="'$' + post.custom_fields.welcome_bonus_value"></p>
                      </div>  
                      </div>
                      <div class="col">
                      <div class="bg-light rounded-4 shadow"  style="min-height: 240px; padding: 2.5rem; --bs-bg-opacity: 0.5;" >
                        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="currentColor" class="bi bi-coin text-black-50 mb-2" viewBox="0 0 16 16">
                          <path d="M5.5 9.511c.076.954.83 1.697 2.182 1.785V12h.6v-.709c1.4-.098 2.218-.846 2.218-1.932 0-.987-.626-1.496-1.745-1.76l-.473-.112V5.57c.6.068.982.396 1.074.85h1.052c-.076-.919-.864-1.638-2.126-1.716V4h-.6v.719c-1.195.117-2.01.836-2.01 1.853 0 .9.606 1.472 1.613 1.707l.397.098v2.034c-.615-.093-1.022-.43-1.114-.9zm2.177-2.166c-.59-.137-.91-.416-.91-.836 0-.47.345-.822.915-.925v1.76h-.005zm.692 1.193c.717.166 1.048.435 1.048.91 0 .542-.412.914-1.135.982V8.518z"/>
                          <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                          <path d="M8 13.5a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11m0 .5A6 6 0 1 0 8 2a6 6 0 0 0 0 12"/>
                        </svg>
                        <h5 class="fs-4 fw-bold">Fees</h5>
                        <p class="my-0 text-black-50" style="font-size: 17px;" v-html="'$' + post.custom_fields.annual_fee + ' Annual fee'"></p>
                      </div>  
                      </div>
                      <div class="col">
                      <div class="bg-light rounded-4 shadow"  style="min-height: 240px; padding: 2.5rem; --bs-bg-opacity: 0.5;">
                        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="currentColor" class="bi bi-patch-check text-black-50 mb-2" viewBox="0 0 16 16">
                          <path fill-rule="evenodd" d="M10.354 6.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7 8.793l2.646-2.647a.5.5 0 0 1 .708 0"/>
                          <path d="m10.273 2.513-.921-.944.715-.698.622.637.89-.011a2.89 2.89 0 0 1 2.924 2.924l-.01.89.636.622a2.89 2.89 0 0 1 0 4.134l-.637.622.011.89a2.89 2.89 0 0 1-2.924 2.924l-.89-.01-.622.636a2.89 2.89 0 0 1-4.134 0l-.622-.637-.89.011a2.89 2.89 0 0 1-2.924-2.924l.01-.89-.636-.622a2.89 2.89 0 0 1 0-4.134l.637-.622-.011-.89a2.89 2.89 0 0 1 2.924-2.924l.89.01.622-.636a2.89 2.89 0 0 1 4.134 0l-.715.698a1.89 1.89 0 0 0-2.704 0l-.92.944-1.32-.016a1.89 1.89 0 0 0-1.911 1.912l.016 1.318-.944.921a1.89 1.89 0 0 0 0 2.704l.944.92-.016 1.32a1.89 1.89 0 0 0 1.912 1.911l1.318-.016.921.944a1.89 1.89 0 0 0 2.704 0l.92-.944 1.32.016a1.89 1.89 0 0 0 1.911-1.912l-.016-1.318.944-.921a1.89 1.89 0 0 0 0-2.704l-.944-.92.016-1.32a1.89 1.89 0 0 0-1.912-1.911z"/>
                        </svg>
                        <h5 class="fs-4 fw-bold">Perks</h5>
                        <p class="my-0 text-black-50" style="font-size: 15px;" v-html="post.custom_fields.features_1_feature"></p>
                      </div>  
                      </div>
                    </div>  
                  </div>

              <div v-if="post.custom_fields.card_benefits_3_b_title === 'Interest rates'" class="mt-3">
                <h6 class="display-5 fw-bold my-4 text-black-50 ls-1" v-html="post.custom_fields.card_benefits_3_b_title.replace(/:/g, '')"></h6>
                <div class="fs-5 text-body-secondary">
                  <p v-html="functions.cleanString(post.custom_fields.card_benefits_3_b_content)"></p>
                </div>
              </div>
              
              <div v-if="post.custom_fields.card_content_1_c_content">
                <div class="display-5 fw-bold my-4 text-black-50 ls-1" v-html="post.custom_fields.card_content_1_c_title"></div>
                <div class="fs-5 text-body-secondary">
                  <p v-html="post.custom_fields.card_content_1_c_content"></p>
                </div>
              </div>
            
              <!-- <div v-if="post.custom_fields.card_content_4_c_content" class="display-5 fw-bold my-4 text-black-50 ls-1" v-html="post.custom_fields.card_content_4_c_title"></div>
              <div class="fs-5">
                <p v-html="post.custom_fields.card_content_4_c_content"></p>
              </div> -->

              <div v-if="post.custom_fields.legal_disclaimers" class="border-top border-secondary">
                <p class="mt-4" v-html="post.custom_fields.legal_disclaimers"></p>
              </div>
              <div class="d-flex mt-4 pt-4 justify-content-start border-top border-secondary">
                <a :href="'https://pftraveldev.wpengine.com' + post.custom_fields.apply_now_link" target="_blank">
                  <button class="btn btn-dark rounded-3 px-4 me-1">Apply</button>
                </a>
                <a :href="`/credit-cards/${encodeURIComponent(post.slug)}/`">
                  <button class="btn btn-secondary opacity-75 rounded-3 px-4 me-1">Details</button>
                </a>
              </div>
            </div>
        </div><!--end offcanvas-->

      </div><!--end main col-->
      </div><!--end row-->

      <div v-else-if="isLoading" class="row animate-in">
        <div class="col-lg-8 offset-lg-2 p-5 text-center">
          <div class="p-5 bg-ivory-light rounded-4 shadow">
            <h3>Fetching data...</h3>
            <div class="text-center">
              <div class="spinner-grow" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div v-else class="row animate-in">
        <div class="col-lg-8 offset-lg-2 p-5 text-center">
          <div class="p-5 bg-ivory-light rounded-4 shadow">
            <h3>No results match those criteria</h3>
          </div>
        </div>
      </div>


    </div><!--end container-->
  </div><!--end parent div-->
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import functions from '../../js/functions';

const bankFilter = ref('');
const providerFilter = ref('');
let data = ref([]);
const annualFeeRange = ref(''); // Initialize as empty string
// const annualFeeFilter = ref(false); 
const firstYearValueFilter = ref(false); 
const isLoading = ref(true); // Initially set to true

async function fetchData() {
  try {
    const response = await fetch('https://pftraveldev.wpengine.com/wp-json/pot/v1/credit-cards?per_page=100');
    if (!response.ok) throw new Error(`HTTP error status: ${response.status}`);
    data.value = await response.json(); // Populate data with fetched cards
    isLoading.value = false; // Set to false once data is fetched
    // Sort data by custom_fields.welcome_bonus_value in descending order
    data.value.sort((a, b) => {
      const valueA = parseFloat(a.custom_fields.welcome_bonus_value);
      const valueB = parseFloat(b.custom_fields.welcome_bonus_value);
      return valueB - valueA;
    });
    
  } catch (error) {
    console.error("Failed to fetch data:", error);
  }
}

onMounted(() => {
  fetchData();
  // isPortraitImage();
  data.value.forEach(image => {
    isPortraitImage(image.featured_image.large);
  });
});

// this searches the title field for bank name in the title string value
// the title has to have all terms in it to match. If the api response has
// special chars or different spelling i.e. Tims vs Tim's, it won't match.
const bankOptions = ref([
  'American Express', 
  'BMO', 
  'Brim', 
  'Canadian Tire',
  'CIBC',
  'Desjardins',
  'Home Trust',
  'KOHO',
  'Laurentian Bank',
  'MBNA',
  'Meridian', 
  'National Bank',
  'Neo',
  'PC Financial',
  'RBC',
  'Rogers',
  'Scotiabank',
  'Simplii Financial',
  'Tangerine',
  'TD',
  'Tims']); // Example options
const providerOptions = ref(['Visa', 'Mastercard', 'American Express']); // Example options

const filteredData = computed(() => {
  // Show all cards initially; apply filters only after the initial load
  let result = [...data.value]; // Start with all cards

  if (bankFilter.value) {
    result = result.filter(item => {
      // Replace &nbsp; with a space in item.title
      const cleanedTitle = item.title.replace(/&nbsp;/g, ' ');
      return cleanedTitle !== undefined &&
             cleanedTitle.toLowerCase().includes(bankFilter.value.toLowerCase());
    });
  }
  
if (providerFilter.value) {
  result = result.filter(item =>
    item.custom_fields.payment_network_name !== undefined && // Ensure payment_network_name exists
    item.custom_fields.payment_network_name.toLowerCase().trim() === providerFilter.value.toLowerCase().trim()
  );
}
  if (annualFeeRange.value) {
    const [feeLowerBound, feeUpperBound] = annualFeeRange.value.split('-').map(num => parseInt(num.trim(), 10));

    result = result.filter(item =>
      parseInt(item.custom_fields.annual_fee, 10) >= feeLowerBound &&
      parseInt(item.custom_fields.annual_fee, 10) <= feeUpperBound
    );
  }
  return result;
});

// const toggleAnnualFeeFilter = () => {
//   annualFeeFilter.value =!annualFeeFilter.value;
//   filteredData.value = filteredData.value; // Force update to apply the new filter
// };
// const toggleFirstYearValue = () => {
//   firstYearValueFilter.value =!firstYearValueFilter.value;
//   filteredData.value = filteredData.value; // Force update to apply the new filter
// };

// const sortByFirstYearValue = () => {
//   data.value.sort((a, b) => {
//     const valueA = parseFloat(a.custom_fields.welcome_bonus_value);
//     const valueB = parseFloat(b.custom_fields.welcome_bonus_value);
//     return valueB - valueA;
//   });
// };

const sortByAnnualFee = () => {
  // Filter out items with empty ('') or undefined welcome_bonus_value
  const filteredData = data.value.filter(item => {
    const value = item.custom_fields.annual_fee;
    return value !== undefined && value !== '';
  });

  // Sort filtered data
  filteredData.sort((a, b) => {
    const valueA = parseFloat(a.custom_fields.annual_fee);
    const valueB = parseFloat(b.custom_fields.annual_fee);
    return valueA - valueB;
  });

  // Replace data.value with sorted and filtered data
  data.value = filteredData;
};

const resetFilters = () => {
  bankFilter.value = '';
  providerFilter.value = '';
  annualFeeRange.value = ''; // Reset annual fee range
  filteredData.value = [...data.value]; // Reset filteredData to original data
};

// Function to get image src
const getImageSrc = (srcObject) => {
  return srcObject ? srcObject : ''; // Handle cases where srcObject may be undefined
};

// Example usage:
const isPortraitImage = (image) => {
  const img = new Image();
  img.onload = function() {
    image.isPortrait = this.height > this.width;
  };
  img.src = getImageSrc(image.featured_image.large); // Pass the large image src
  return image.isPortrait;
};
</script>

<style>

.card-bg-circle {
  height: 14ch;
  width: 14ch;
  background: #00000050
}

.portrait {
  /* Styles for portrait images */
  height: 240px;
  width: 150px;
  text-align: center;
}

.landscape {
  /* Styles for landscape images */
  width: 100%;
  padding: 20px;
  margin: 0 auto;
}

.card, 
.card .col-5 {
  min-height: 390px;
}

@media only screen and (max-width: 768px)   {
  .card, .card .col-5 {
    min-height: 0;
  }
    .landscape {
      padding: 0;
  }
    .landscape-detail {
      padding: 20px 30px 10px;
  }
  .portrait {
    height: 180px;
    width: 110px;
  }
  .portrait-detail {
    height: 210px;
    width: 130px;
  }
}

@media only screen and (max-width: 601px)   {
  .card-bg-circle {
    height: 11ch;
    width: 11ch;
    background: rgba(0, 0, 0, 0.1);
  }
}
</style>




<!-- <template>
  <div>
    <button @click="filterCards(post.custom_fields.annual_fee === '0')">Filter Visa Cards</button>
    <ul>
      <li v-for="post in filteredCards" :key="post.id">
        {{ post.title }} 
      </li>
    </ul>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';

export default {
  name: 'CreditCardList',
  setup() {
    // Sample credit card data
    const posts = ref([]);

    const fetchData = async () => {
      try {
        const response = await fetch('https://pftraveldev.wpengine.com/wp-json/pot/v1/credit-cards?per_page=100');
        const fetchedData = await response.json();
        posts.value = fetchedData;
        console.log(fetchedData)
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        console.log('loaded');
      }
    };
  
    // onMounted(fetchData);
    onMounted(() => {
      fetchData();

    });

    // State for filtered cards
    const filteredCards = ref([]);

    // Function to filter cards by type
    const filterCards = (type) => {
      filteredCards.value = posts.value.filter(card => card.type === type);
    };

    return {
      filteredCards,
      filterCards
    };
  }
};
</script>

<style scoped>
/* Add your component-specific styles here if needed */
</style>
const res = await fetch("https://pftraveldev.wpengine.com/wp-json/pot/v1/credit-cards?per_page=100");
const posts = await res.json(); -->