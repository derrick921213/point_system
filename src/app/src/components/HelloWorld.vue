<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import StyleManager from "@/styleManager";
defineProps({
  msg: String,
});
const count = ref(0);
const styleManager = StyleManager;
const html = document.documentElement;
onMounted(() => {
  // styleManager.loadAndStoreStyleSheet("/styles/style.css");
  styleManager.setStyle(html, {
    "font-family": "Inter, system-ui, Avenir, Helvetica, Arial, sans-serif",
    "line-height": 1.5,
    "font-weight": 400,
    "color-scheme": "light dark",
    color: "rgba(255, 255, 255, 0.87)",
    "background-color": "#242424",
    "font-synthesis": "none",
    "text-rendering": "optimizeLegibility",
    "-webkit-font-smoothing": "antialiased",
    "-moz-osx-font-smoothing": "grayscale",
  });
  styleManager.setStyle(document.body, {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  });
});
onUnmounted(() => {
  styleManager.resetAll();
});
</script>

<template>
  <h1>{{ msg }}</h1>
  <div class="card">
    <button type="button" @click="count++">count is {{ count }}</button>
    <p>
      Edit
      <code>components/HelloWorld.vue</code> to test HMR
    </p>
  </div>
  <p>
    Check out
    <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank"
      >create-vue</a
    >, the official Vue + Vite starter
  </p>
  <p>
    Install
    <a href="https://github.com/vuejs/language-tools" target="_blank">Volar</a>
    in your IDE for a better DX
  </p>
  <p class="read-the-docs">Click on the Vite and Vue logos to learn more</p>
</template>
<style scoped>
a {
  font-weight: 500;
  color: #646cff;
  text-decoration: inherit;
}
a:hover {
  color: #535bf2;
}

body {
  margin: 0;
  display: flex;
  place-items: center;
  min-width: 320px;
  min-height: 100vh;
  justify-content: center; /* 水平居中 */
  align-items: center;
}

h1 {
  font-size: 3.2em;
  line-height: 1.1;
}

button {
  border-radius: 8px;
  border: 1px solid transparent;
  padding: 0.6em 1.2em;
  font-size: 1em;
  font-weight: 500;
  font-family: inherit;
  background-color: #1a1a1a;
  cursor: pointer;
  transition: border-color 0.25s;
}
button:hover {
  border-color: #646cff;
}
button:focus,
button:focus-visible {
  outline: 4px auto -webkit-focus-ring-color;
}

.card {
  padding: 2em;
}

@media (prefers-color-scheme: light) {
  html {
    color: #213547;
    background-color: #ffffff;
  }
  a:hover {
    color: #747bff;
  }
  button {
    background-color: #f9f9f9;
  }
}

.read-the-docs {
  color: #888;
}
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
