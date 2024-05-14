<template>
    <div>
      <ul>
        <li v-for="file in files" :key="file" @click="selectFile(file)" class="clickable">{{ file }}</li>
      </ul>
    </div>
    <Logout />
  </template>
  
  <script setup>
  import Logout from "@/components/Logout.vue";
  import { ref, onMounted } from "vue";
  import axios from "axios";
  const emit = defineEmits(['fileSelected']);  // 定义事件
  
  const directory = ref("");
  const files = ref([]);
  
  const getFiles = async () => {
    try {
      const response = await axios.get("http://localhost:8000/files", {
        withCredentials: true,
      });
      files.value = response.data.files;
    } catch (error) {
      console.error("Error fetching files:", error);
      alert(
        "Error fetching files: " + (error.response?.data?.detail || error.message)
      );
    }
  };
  
  const selectFile = (file) => {
    console.log("File selected:", file);
    emit("fileSelected", file);
  };
  
  onMounted(() => {
    getFiles();
  });
  </script>
  
  <style scoped>
  .clickable {
    cursor: pointer;
    color: blue;
    text-decoration: underline;
  }
  .clickable:hover {
    color: darkblue;
  }
  </style>
  