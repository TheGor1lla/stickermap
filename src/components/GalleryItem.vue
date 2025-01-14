<script setup>
import Card from 'primevue/card';

defineProps({
  foundBy: String,
  title: String,
  imageUrl: String,
})

</script>

<template>
  <Card class="card">
    <template #header>
      <img alt="photo of street art" :src="imageUrl"/>
    </template>
    <template v-if="title" #title>{{ title }}</template>
    <template v-if="foundBy" #subtitle>
      Found by {{ foundBy }}
    </template>
  </Card>
</template>

<style scoped>
.card {
  margin: 5px;
  width: 25rem;
  overflow: hidden;
}

.card img {
  width: 100%;
  height: 100%;
}
</style>