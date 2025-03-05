<template>
  <form @submit.prevent>
    <div class="container">
      <div>
        <label for="image">Upload Image:</label>
        <FileUpload
          mode="basic"
          @select="handleFileChange"
          customUpload
          auto
          accept="image/*" />
      </div>
    </div>
    <div v-if="imageIsUploaded">
      <Accordion :value="accordionOpenValue">
        <AccordionPanel value="0" :disabled="!imageIsUploaded">
          <AccordionHeader>
            <span>
              <Checkmark v-if="imageIsUploaded && metadataIsChecked" />
              <ErrorMark v-else-if="imageIsUploaded && !metadataIsChecked" />
              <span>Metadata</span>
            </span>
          </AccordionHeader>
          <AccordionContent>
            <div>
              <label for="lat">Latitude:</label>
              <InputText type="text" v-model="formData.lat" id="lat" required="true" />
            </div>
            <div>
              <label for="long">Longitude:</label>
              <InputText type="text" v-model="formData.long" id="long" required="true" />
            </div>
            <div>
              <label for="foundDate">Found on:</label>
              <DatePicker
                v-model="formData.foundDate"
                id="foundDate"
                showButtonBar
                :maxDate="new Date()"
                :manualInput="false"
              />
            </div>
          </AccordionContent>
        </AccordionPanel>
        <AccordionPanel value="1" :disabled="!imageIsUploaded">
          <AccordionHeader>Tell us more</AccordionHeader>
          <AccordionContent>
            <div>
              <label for="itemName">Name:</label>
              <input type="text" v-model="formData.itemName" id="itemName" required="true" />
            </div>
            <div>
              <label for="foundBy">Found by:</label>
              <InputText type="text" v-model="formData.foundBy" id="foundBy" required="true" />
            </div>
            <div>
              <label for="kind">Kind:</label>
              <RadioButtonGroup name="kind" v-model="formData.kind">
                <div>
                  <RadioButton inputId="sticker" value="Sticker" />
                  <label for="sticker">Sticker</label>
                </div>
                <div>
                  <RadioButton inputId="graffiti" value="Graffiti" />
                  <label for="graffiti">Graffiti</label>
                </div>
                <div>
                  <RadioButton inputId="smthElse" value="smthElse" />
                  <label for="smthElse">Something else</label>
                </div>
              </RadioButtonGroup>
            </div>
          </AccordionContent>
        </AccordionPanel>
      </Accordion>
      <div>
        <Button type="submit" @click="submitSticker">Submit</Button>
        <Button severity="secondary" @click="clearForm">Clear</Button>
      </div>
    </div>
    <div v-if="status" v-text="status"></div>
    <div v-if="imagePreview">
      <h3>Preview:</h3>
      <img :src="imagePreview" alt="Image preview" width="300" />
    </div>
  </form>
</template>

<script setup>
import { ref, watch, computed } from "vue";
import exifr from "exifr";
import {
  Accordion,
  AccordionContent,
  AccordionHeader,
  AccordionPanel,
  Button,
  DatePicker,
  FileUpload,
  InputText,
  RadioButton,
  RadioButtonGroup
} from "primevue";
import Checkmark from "@/components/icons/Checkmark.vue";
import ErrorMark from "@/components/icons/ErrorMark.vue";

const imageFile = ref();
const imagePreview = ref();
const status = ref(null);
const imageIsUploaded = ref(false);
const metadataIsChecked = ref(false);
const accordionOpenValue = ref(null); // Start with no panel open

const getInitialData = () => ({
  itemName: "",
  foundBy: "",
  foundDate: "",
  lat: "",
  long: "",
  kind: "",
  timestamp: ""
});

watch(accordionOpenValue, (newValue, oldValue) => {
  console.log(`Accordion value changed from ${oldValue} to ${newValue}`);
});

const formData = ref(getInitialData());

const handleFileChange = async (event) => {
  const file = event.files[0];
  if (file) {
    imageFile.value = file;
    const reader = new FileReader();
    reader.onload = (e) => {
      imagePreview.value = e.target.result;
    };
    reader.readAsDataURL(file);
    let imageMetadata;
    try {
      imageMetadata = await exifr.parse(file, ['latitude', 'GPSLatitude', 'longitude', 'DateTimeOriginal'])
      // imageMetadata = await exifr.parse(file, { exif: ["gps", "DateTimeOriginal"] });
    } catch (error) {
      console.error("Error extracting EXIF data:", error);
      status.value = "Couldn't extract metadata.";
    }
    console.log("hiiii");
    console.log(imageMetadata);

    if (checkIfAllMetadataExtracted) {
      console.log("anybody there?");
      accordionOpenValue.value = 0;
      metadataIsChecked.value = false;
      status.value = "No metadata found.";
    } else {
      formData.value.lat = imageMetadata.latitude;
      formData.value.long = imageMetadata.longitude;
      formData.value.foundDate = imageMetadata.DateTimeOriginal;
      metadataIsChecked.value = true;
      accordionOpenValue.value = 1;
    }
    imageIsUploaded.value = true;
  }
};

const checkIfAllMetadataExtracted = computed(() => {
  for (let key in formData.value) {
    if (formData.value.imageMetadata.hasOwnProperty(key)) {
      const value = formData.value.imageMetadata[key];

    }
  return latitude !== null && latitude !== undefined && longitude !== null && longitude !== undefined && foundDate !== null && foundDate !== undefined;

}})

const isFieldValid = (value) => {
  return value !== null && value !== undefined && value !== '';
};

// Computed property to check if all required fields are valid
const isFormValid = computed(() => {
  return Object.values(form.value).every(isFieldValid);
});



const submitSticker = async () => {
  const submitFormData = new FormData();
  submitFormData.append("itemName", formData.value.itemName.trim());
  submitFormData.append("foundBy", formData.value.foundBy.trim());
  submitFormData.append("foundDate", formData.value.foundDate.toISOString());
  submitFormData.append("lat", formData.value.lat);
  submitFormData.append("long", formData.value.long);
  submitFormData.append("image", imageFile.value);
  submitFormData.append("kind", formData.value.kind);
  submitFormData.append("uploadDate", new Date().toISOString());
  console.log(submitFormData);
  try {
    const response = await fetch("http://localhost:3000/api/data", {
      method: "POST",
      body: submitFormData
    });
    if (response.ok) {
      status.value = "Data saved successfully!";
      clearForm();
    } else {
      status.value = "Error saving data.";
    }
  } catch (error) {
    status.value = "Error occurred while saving data.";
    console.error("Error:", error);
  }
};

function clearForm() {
  imageFile.value = null;
  imagePreview.value = null;
  imageIsUploaded.value = false;
  metadataIsChecked.value = false;
  formData.value = getInitialData();
  accordionOpenValue.value = null;
}
</script>
<style>
.container {
  display: flex;
  flex-wrap: wrap;
}
</style>
