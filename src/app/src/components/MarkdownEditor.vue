<template>
  <div class="editor-container">
    <header>
      <h2>Markdown 編輯器</h2>
    </header>
    <div class="editor">
      <div class="editor-pane">
        <textarea v-model="markdown"></textarea>
      </div>
      <div class="preview-pane" v-html="htmlContent"></div>
    </div>
    <div class="controls">
      <input
        type="text"
        v-model="loadFilename"
        placeholder="Enter filename to load.md"
      />
      <button @click="loadMarkdown">加載Markdown</button>
      <input
        type="text"
        v-model="saveFilename"
        placeholder="Enter filename to save.md"
      />
      <button @click="saveMarkdown">保存Markdown</button>
      <Logout />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import axios from "axios";
import MarkdownIt from "markdown-it";
import Logout from "./Logout.vue";
import StyleManager from "@/styleManager";

const styleManager = StyleManager;
const md = new MarkdownIt();
const markdown = ref("");
const loadFilename = ref("");
const saveFilename = ref("");
const htmlContent = computed(() => md.render(markdown.value));
// styleManager.setStyle(document.body, {
//   margin: "0",
//   "font-family": "Arial, sans-serif",
// });
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
      { withCredentials: true }
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
</script>

<style scoped>
.editor-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

header {
  background-color: #24292e;
  color: white;
  padding: 1em;
  text-align: center;
}

.editor {
  display: flex;
  flex: 1;
  overflow: hidden;
}

.editor-pane,
.preview-pane {
  flex: 1;
  padding: 1em;
  box-sizing: border-box;
  overflow: auto;
}

.editor-pane {
  background-color: #2d2d2d;
  color: white;
}

textarea {
  width: 100%;
  height: 100%;
  border: none;
  resize: none;
  background-color: transparent;
  color: white;
  font-family: monospace;
  font-size: 16px;
  outline: none;
}

.preview-pane {
  background-color: white;
  border-left: 1px solid #ccc;
}

.controls {
  padding: 1em;
  background-color: #f5f5f5;
  display: flex;
  align-items: center;
  gap: 0.5em;
}

input[type="text"] {
  flex: 1;
  padding: 0.5em;
  font-size: 16px;
}

button {
  padding: 0.5em 1em;
  font-size: 16px;
  cursor: pointer;
}

button:disabled {
  cursor: not-allowed;
}
</style>
