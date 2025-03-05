<template>
  <form @submit.prevent>
    <div>
      <label for="itemName">Name:</label>
      <input type="text" v-model="formData.itemName" id="itemName" required="true" />
    </div>
    <div>
      <label for="foundBy">Found by:</label>
      <InputText type="text" v-model="formData.foundBy" id="foundBy" required="true" />
    </div>
    <div>
      <label for="lat">Latitude:</label>
      <InputText type="text" v-model="formData.lat" id="lat" required="true" />
    </div>
    <div>
      <label for="long">Latitude:</label>
      <InputText type="text" v-model="formData.long" id="long" required="true" />
    </div>
    <div>
      <input type="file" @change="handleFileChange" required="true" accept="image/*" />
    </div>
    <div>
      <Button type="submit" @click="submitSticker"> Submit</Button>
    </div>
  </form>

  <div v-if="imagePreview">
    <h3>Preview:</h3>
    <img :src="imagePreview" alt="Image preview" width="300" />
  </div>
</template>

<script setup>
import { ref } from "vue";
import exifr from "exifr";
import { Button } from "primevue";
import { InputText } from "primevue";

const imageFile = ref();
const imagePreview = ref();

const formData = ref({
  itemName: "",
  foundBy: "",
  lat: "",
  long: "",
});

const handleFileChange = async (event) => {
  const file = event.target.files[0];
  if (file) {
    imageFile.value = file;
    const reader = new FileReader();
    reader.onload = (e) => {
      imagePreview.value = e.target.result;
    };
    reader.readAsDataURL(file);

    try {
      let { latitude, longitude } = await exifr.gps(file);
      console.log(latitude + " " + longitude);
      formData.value.lat = latitude;
      formData.value.long = longitude;
    } catch (error) {
      console.error("Error extracting EXIF data:", error);
    }
  }
};

const submitSticker = async () => {
  const tmpFormData = new FormData();
  tmpFormData.append("itemName", formData.value.itemName.trim());
  tmpFormData.append("foundBy", formData.value.foundBy.trim());
  tmpFormData.append("lat", formData.value.lat.trim());
  tmpFormData.append("long", formData.value.long.trim());
  tmpFormData.append("image", imageFile.value);
  try {
    const response = await fetch("http://localhost:3000/api/data", {
      method: "POST",
      body: tmpFormData,
    });

    const result = await response.json();

    if (response.ok) {
      alert("Data saved successfully!");
      console.log(result);
    } else {
      alert("Error saving data.");
    }
  } catch (error) {
    console.error("Error:", error);
    alert("Error occurred while saving data.");
  }
};
</script>
