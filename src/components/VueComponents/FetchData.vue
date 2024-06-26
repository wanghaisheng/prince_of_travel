<template>
  <div>
    <div class="container-fluid">
      <div class="row px-4">
        <div class="col-lg-10 offset-lg-1 p-3 bg-light rounded-4 border mt-3">
          <!-- <h6 class="fs-5 text-secondary p-2">Filter cards</h6> -->
          <ul class="nav nav-pills nav-fill">
            <li class="nav-item me-2 mb-2 mb-md-0">
              <form class="form-floating">
                <input type="text" class="form-control rounded-3 border border-secondary" id="floatingInputValue"
                v-model="bankFilter" placeholder="Search by Bank Name">
                <label for="floatingInputValue" class="small text-secondary">Bank (i.e. BMO)</label>
              </form>
            </li>
            <li class="nav-item me-2 mb-2 mb-md-0">
              <form class="form-floating">
                <input type="text" class="form-control rounded-3 border border-secondary" id="floatingInputValue"
                v-model="providerFilter" placeholder="Search by Credit Card Provider">
                <label for="floatingInputValue" class="small text-secondary">Issuer (i.e. VISA)</label>
              </form>
            </li>
            <li class="nav-item me-2">
              <button @click="toggleAnnualFeeFilter" class="btn btn-dark rounded-3 w-100 py-3">No annual fee</button>
            </li>
            <li class="nav-item me-2">
              <button @click="toggleFirstYearValue" class="btn btn-dark rounded-3 w-100 py-3">First year value</button>
            </li>
            <li class="nav-item me-2">
              <button @click="resetFilters" class="btn btn-dark rounded-3 w-100 py-3">Reset</button>
            </li>
          </ul>
        </div>
        </div>

    </div>

    <!-- <input v-model="bankFilter" placeholder="Filter by Bank Name" /> -->
    <!-- <input v-model="providerFilter" placeholder="Filter by Credit Card Provider" /> -->

    <div class="container-fluid">
      <div class="row p-4">
        <div class="col-lg-3 p-5" v-for="item in filteredData" :key="item.id">
          <img :src="item.featured_image.large" alt="" :class="[isPortrait(item.imageURL) ? 'portrait' : 'landscape']">
          <h5 class="">{{item.title}}</h5>
        </div>
      </div>
    </div>
    <ul>
      <!-- <li v-for="item in filteredData" :key="item.id">
        {{ item.custom_fields.bank_name }} - {{ item.custom_fields.payment_network_name }}
      </li> -->
    </ul>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';

const bankFilter = ref('');
const providerFilter = ref('');
let data = ref([]);
const annualFeeFilter = ref(false); 
const firstYearValueFilter = ref(false); 

async function fetchData() {
  try {
    const response = await fetch('https://pftraveldev.wpengine.com/wp-json/pot/v1/credit-cards?per_page=100');
    if (!response.ok) throw new Error(`HTTP error status: ${response.status}`);
    data.value = await response.json(); // Populate data with fetched cards
  } catch (error) {
    console.error("Failed to fetch data:", error);
  }
}

onMounted(fetchData);

const filteredData = computed(() => {
  // Show all cards initially; apply filters only after the initial load
  let result = [...data.value]; // Start with all cards
  if (bankFilter.value) {
    result = result.filter(item =>
      item.custom_fields.bank_name.toLowerCase().includes(bankFilter.value.toLowerCase())
    );
  }
  if (providerFilter.value) {
    result = result.filter(item =>
      item.custom_fields.payment_network_name.toLowerCase().includes(providerFilter.value.toLowerCase())
    );
  }
  if (annualFeeFilter.value) {
    result = result.filter(item => item.custom_fields.annual_fee === '0');
  }
  if (firstYearValueFilter.value) {
    result = result.filter(item => item.custom_fields.welcome_bonus_value > '150');
  }
  return result;
});

const toggleAnnualFeeFilter = () => {
  annualFeeFilter.value =!annualFeeFilter.value;
  filteredData.value = filteredData.value; // Force update to apply the new filter
};
const toggleFirstYearValue = () => {
  firstYearValueFilter.value =!firstYearValueFilter.value;
  filteredData.value = filteredData.value; // Force update to apply the new filter
};

const resetFilters = () => {
  bankFilter.value = '';
  providerFilter.value = '';
  annualFeeFilter.value = false;
  firstYearValueFilter.value = false;
  filteredData.value = [...data.value]; // Reset filteredData to original data
};


function isPortrait(imageUrl) {
  // Fetch the image metadata to check its orientation
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = function() {
      resolve(this.height > this.width);
    };
    img.src = imageUrl;
    console.log(imageUrl + ' = portrait')
  });
}
</script>

<!-- <style>
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
</style> -->




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