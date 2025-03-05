<template>
  <div>
    <h1>Stickermap</h1>
    Welcome :)
    <ul>
      <li v-for="sticker in stickers" :key="sticker.stickername">
        {{ sticker.stickername }} - Found by: {{ sticker.foundby }} at Lat: {{ sticker.lat }}, Long: {{ sticker.long }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const stickers = ref([]);

// Function to fetch data from PostgreSQL (assuming an API endpoint is set up)
const fetchStickerData = async () => {
  try {
    const response = await fetch('http://localhost:3000/api/data'); // Replace with your API endpoint
    if (response.ok) {
      const data = await response.json();
      stickers.value = data; // Set the fetched data into the ref
      logStickerData(data); // Call the function to log the data
    } else {
      console.error('Failed to fetch sticker data');
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

// Function to log all sticker information
const logStickerData = (data) => {
  data.forEach(sticker => {
    console.log(`Sticker Name: ${sticker.stickername}, Found By: ${sticker.foundby}, Location: Lat: ${sticker.lat}, Long: ${sticker.long}`);
  });
};

// Fetch sticker data when the component is mounted
onMounted(() => {
  fetchStickerData();
});
</script>
