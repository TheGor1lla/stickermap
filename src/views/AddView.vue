<template>
  <div class="container">
    <form @submit.prevent>
      <div>
        <label for="image">Upload Image:</label>
        <input type="file" id="image" @change="handleFileChange" required="true" accept="image/*" />
      </div>
      <!-- Display if file is uploaded AND at least one info could not be found -->
      <section v-if="imageIsUploaded && !metadataIsChecked">
        <div>
          <label for="lat">Latitude:</label>
          <InputText type="text" v-model="formData.lat" id="lat" required="true" />
        </div>
        <div>
          <label for="long">Latitude:</label>
          <InputText type="text" v-model="formData.long" id="long" required="true" />
        </div>
        <div>
          <label for="timestamp">Timestamp:</label>
          <InputText type="text" v-model="formData.timestamp" id="long" required="true" />
        </div>
      </section>
      <!--Display once file is uploaded AND section above is filled/ignored-->
      <section v-if="imageIsUploaded && metadataIsChecked">
        <div>
          <label for="itemName">Name:</label>
          <input type="text" v-model="formData.itemName" id="itemName" required="true" />
        </div>
        <div>
          <label for="foundBy">Found by:</label>
          <InputText type="text" v-model="formData.foundBy" id="foundBy" required="true" />
        </div>
        <div>
          <label for="lat">Kind:</label>
          <RadioButtonGroup name="kind" class="flex flex-wrap gap-4">
            <div class="flex items-center gap-2">
              <RadioButton inputId="sticker" v-model="formData.kind" value="Sticker" />
              <label for="cheese">Sticker</label>
            </div>
            <div class="flex items-center gap-2">
              <RadioButton inputId="graffiti" v-model="formData.kind" value="Graffiti" />
              <label for="mushroom">Graffiti</label>
            </div>
          </RadioButtonGroup>
        </div>
        <div>
          <Button type="submit" @click="submitSticker"> Submit</Button>
        </div>
      </section>
      <div v-if="status" v-text="status"></div>
    </form>
    <div v-if="imagePreview">
      <h3>Preview:</h3>
      <img :src="imagePreview" alt="Image preview" width="300" />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import exifr from "exifr";
import { Button, InputText } from "primevue";
import RadioButton from "primevue/radiobutton";

const imageFile = ref();
const imagePreview = ref();
const status = ref(null);
const imageIsUploaded = ref(false);
const metadataIsChecked = ref(false);

const formData = ref({
  itemName: "",
  foundBy: "",
  lat: "",
  long: "",
  kind: "",
  timestamp: "",
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
      formData.value.lat = latitude;
      formData.value.long = longitude;
      metadataIsChecked.value = true;
      status.value = "Extracted metadata.";
    } catch (error) {
      console.error("Error extracting EXIF data:", error);
      metadataIsChecked.value = false;
      status.value = "Couldn't extract metadata.";
      console.log(status.value);
    }
    imageIsUploaded.value = true;
  }
};

const submitSticker = async () => {
  const tmpFormData = new FormData();
  tmpFormData.append("itemName", formData.value.itemName.trim());
  tmpFormData.append("foundBy", formData.value.foundBy.trim());
  tmpFormData.append("lat", formData.value.lat);
  tmpFormData.append("long", formData.value.long);
  tmpFormData.append("image", imageFile.value);
  tmpFormData.append("kind", formData.value.kind);
  try {
    const response = await fetch("http://localhost:3000/api/data", {
      method: "POST",
      body: tmpFormData,
    });
    if (response.ok) {
      status.value = "Data saved successfully!";
    } else {
      status.value = "Error saving data.";
    }
  } catch (error) {
    status.value = "Error occurred while saving data.";
    console.error("Error:", error);
  }
};
</script>
<style>
.container {
  display: flex;
  flex-wrap: wrap;
}
</style>
