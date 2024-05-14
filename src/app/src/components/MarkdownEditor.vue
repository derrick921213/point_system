<template>
  <div class="editor-container">
    <header>
      <h2>Markdown 編輯器</h2>
    </header>
    <div class="editor">
      <div class="editor-pane">
        <textarea
          v-model="markdown"
          spellcheck="false"
          @keydown="handleTab"
        ></textarea>
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
import hljs from "highlight.js";
import 'highlight.js/styles/github-dark.css'

const styleManager = StyleManager;
const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
  breaks: true,
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return (
          '<pre class="hljs language-' +
          lang.toLowerCase() +
          '"><code>' +
          hljs.highlight(str, { language: lang, ignoreIllegals: true }).value +
          "</code></pre>"
        );
      } catch (__) {}
    }
    return '<pre><code class="hljs">' + str + "</code></pre>";
  },
});
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
function handleTab(event) {
  if (event.key === "Tab") {
    event.preventDefault();
    const textarea = event.target;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    textarea.value =
      textarea.value.substring(0, start) + "\t" + textarea.value.substring(end);
    textarea.selectionStart = textarea.selectionEnd = start + 1;
    markdown.value = textarea.value;
  }
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
}

.editor-pane {
  flex: 1;
  padding: 1em;
  box-sizing: border-box;
  background-color: #2d2d2d;
  color: white;
  overflow: hidden;
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
  overflow-y: auto;
  overflow-x: hidden;
  word-wrap: break-word;
  tab-size: 4;
  -moz-tab-size: 4;
  -o-tab-size: 4;
}
::v-deep pre {
  padding: 9.5px;
}
::v-deep pre code {
  white-space: pre;
  tab-size: 4;
  -moz-tab-size: 4;
  -o-tab-size: 4;
}
.preview-pane {
  flex: 1;
  padding: 1em;
  box-sizing: border-box;
  background-color: white;
  border-left: 1px solid #ccc;
  word-break: break-word;
  overflow: auto;
}

::v-deep .preview-pane ul {
  margin: 0;
  padding-left: 40px;
  /* list-style: none; */
}
::v-deep .preview-pane ol {
  margin: 0;
  padding-left: 40px;
  /* list-style: none; */
}

::v-deep .preview-pane ul li {
  position: relative;
  margin-bottom: 2.5px;
  word-wrap: break-word;
  margin-left: 0px;
}

::v-deep .preview-pane ul li ::marker {
  color: #000;
  font-size: 1em;
  line-height: 1;
}
::v-deep .preview-pane ol li {
  position: relative;
  margin-bottom: 2.5px;
  word-wrap: break-word;
  margin-left: 0px;
}

::v-deep .preview-pane ol li ::marker {
  color: #000;
  font-size: 1em;
  line-height: 1;
}

::v-deep .preview-pane h1,
::v-deep .preview-pane h2,
::v-deep .preview-pane h3,
::v-deep .preview-pane h4,
::v-deep .preview-pane h5,
::v-deep .preview-pane h6 {
  margin: 0;
  padding: 0;
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
