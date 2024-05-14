<template>
  <div>
    <MarkdownEditor v-if="selectedFile" :file="selectedFile" @buttonClicked="handleButtonClicked"/>
    <MarkdownList v-else="selectedFile" @fileSelected="handleFileSelected" />
    
  </div>
</template>

<script setup>
import { ref } from "vue";
import MarkdownEditor from "@/components/MarkdownEditor.vue";
import MarkdownList from "@/components/MarkdownList.vue";


const selectedFile = ref("");

const handleFileSelected = (file) => {
//   console.log("File selected in parent:", file); // 添加日志输出
  selectedFile.value = file;
};
const handleButtonClicked = (btn) => {
  selectedFile.value = "";
};
</script>
