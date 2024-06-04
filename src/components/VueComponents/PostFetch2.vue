<!-- <template>
  <div>
    <div v-for="card in creditCards" :key="card.id">{{ card.custom_fields.title }}</div>
    <div v-if="loading" id="loader">Loading...</div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';

export default {
  setup() {
    const creditCards = ref([]);
    const loading = ref(false);
    const perPage = 8; // Number of credit cards to fetch per request
    let page = 1; // Track the current page

    const fetchCreditCards = async () => {
  console.log('Fetching credit cards...');
  loading.value = true;
  try {
    const response = await fetch(`https://pftraveldev.wpengine.com/wp-json/pot/v1/credit-cards?page=${page}&per_page=${perPage}`);
    const data = await response.json();
    console.log('Received data:', data);
    creditCards.value = data;
  } catch (error) {
    console.error('Error fetching data:', error);
  } finally {
    loading.value = false;
  }
};

    onMounted(() => {
      fetchCreditCards();
    });

    return { creditCards, loading };
  }
};
</script>

<style>
  #loader {
    text-align: center;
    margin-top: 20px;
  }
</style> -->

<template>
  <div>
    <div v-for="card in creditCards" :key="card.id">{{ card }}</div>
    <div v-if="loading" id="loader">Loading...</div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';

export default {
  setup() {
    const creditCards = ref([]);
    const loading = ref(false);
    let lastItemId = null; // Track the last item fetched

    const fetchCreditCards = async () => {
      loading.value = true;
      try {
        let url = `https://pftraveldev.wpengine.com/wp-json/pot/v1/credit-cards`;
        if (lastItemId) {
          url += `?last_id=${lastItemId}`;
        }
        const response = await fetch(url);
        const data = await response.json();
        creditCards.value = [...creditCards.value, ...data];
        lastItemId = data[data.length - 1].id; // Update lastItemId with the ID of the last item fetched
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        loading.value = false;
      }
    };

    const handleScroll = () => {
      const scrollPosition = window.innerHeight + window.scrollY;
      const documentHeight = document.documentElement.scrollHeight;
      const bottomOffset = 20; // Adjust this value as needed

      if (scrollPosition >= documentHeight - bottomOffset && !loading.value) {
        fetchCreditCards();
      }
    };

    onMounted(() => {
      fetchCreditCards();
      window.addEventListener('scroll', handleScroll);
    });

    return { creditCards, loading };
  }
};
</script>

<style>
  #loader {
    text-align: center;
    margin-top: 20px;
  }
</style>
