<template>
  <div class="container">
    <GalleryItem image-url="/src/assets/placeholder_sticker.jpg" title="Stickerwall" foundBy="lord" ></GalleryItem>
    <GalleryItem image-url="/src/assets/placeholder_sticker.jpg"></GalleryItem>
    <GalleryItem image-url="/src/assets/placeholder_sticker.jpg" title="Banana" foundBy="steep" ></GalleryItem>
    <GalleryItem image-url="/src/assets/placeholder_sticker.jpg"></GalleryItem>
    <GalleryItem image-url="/src/assets/placeholder_sticker.jpg" title="Branches" foundBy="Nord" ></GalleryItem>
  </div>
</template>

<script>
import GalleryItem from "@/components/GalleryItem.vue";

export default {
  components: {GalleryItem}
}
</script>

<style scoped>
.container {
  display: flex;
  flex-wrap: wrap;
}
</style>
