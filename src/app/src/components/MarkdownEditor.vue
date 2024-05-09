<template>
  <div>
    <h2>Markdown 編輯器</h2>
    <input
      type="text"
      v-model="loadFilename"
      placeholder="Enter filename to load.md"
    />
    <button @click="loadMarkdown">加載Markdown</button>
    <textarea v-model="markdown" @input="updatePreview"></textarea>
    <div v-html="htmlContent" class="markdown-preview"></div>
    <input
      type="text"
      v-model="saveFilename"
      placeholder="Enter filename to save.md"
    />
    <button @click="saveMarkdown">保存Markdown</button>
    <Logout />
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import axios from "axios";
import MarkdownIt from "markdown-it";
import Logout from "./Logout.vue";

const md = new MarkdownIt();
const markdown = ref("");
const loadFilename = ref("");
const saveFilename = ref("");
const htmlContent = computed(() => md.render(markdown.value));

function validateFilename(filename) {
  if (!filename.endsWith(".md")) {
    alert('Filename must end with ".md"');
    return false;
  }
  return true;
}

async function loadMarkdown() {
  if (!validateFilename(loadFilename.value)) return;

  try {
    const response = await axios.get(
      `http://localhost:8000/files/markdown/${loadFilename.value}`,
      { withCredentials: true }
    );
    console.log(response.data);
    markdown.value = response.data;
    // updatePreview(); // Ensure the preview is updated when new markdown is loaded
  } catch (error) {
    console.error("Failed to load markdown:", error);
    alert("Failed to load markdown: " + error.message);
  }
}

async function saveMarkdown() {
  if (!saveFilename.value.endsWith(".md")) {
    alert('Filename must end with ".md"');
    return;
  }

  const blob = new Blob([markdown.value], { type: "text/plain" });
  const formData = new FormData();
  formData.append("file", blob, saveFilename.value);

  try {
    const response = await axios.put(
      `http://localhost:8000/files/markdown/${saveFilename.value}`,
      formData,
      { withCredentials: true },
    );
    if (response.status === 200) {
      alert("File saved successfully");
    }
  } catch (error) {
    if (error.response && error.response.status === 400) {
      alert(error.response.data);
    } else {
      console.error("Failed to save markdown:", error);
      alert("Failed to save markdown: " + error.message);
    }
  }
}

// function updatePreview() {
//   // 此函数只需存在即可，实际的 HTML 内容更新是由计算属性 htmlContent 自动处理的
// }
</script>

<style scoped>
textarea,
input[type="text"] {
  width: 100%;
  height: 2.5em;
  margin-bottom: 10px;
}
.markdown-preview {
  border: 1px solid #ccc;
  padding: 10px;
  background-color: #f8f8f8;
}
button {
  margin-right: 10px;
}
</style>
