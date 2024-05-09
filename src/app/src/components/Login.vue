<template>
  <div :class="['container', containerClass]" id="container">
    <div class="form-container sign-up-container">
      <form @submit.prevent="signup">
        <h1>Create Account</h1>
        <div class="social-container">
          <a href="#" class="social"><i class="fab fa-facebook-f"></i></a>
          <a href="#" class="social"><i class="fab fa-google-plus-g"></i></a>
          <a href="#" class="social"><i class="fab fa-linkedin-in"></i></a>
        </div>
        <span>or use your email for registration</span>
        <input type="text" placeholder="Name" v-model="signupName" />
        <input type="email" placeholder="Email" v-model="signupEmail" />
        <input
          type="password"
          placeholder="Password"
          v-model="signupPassword"
        />
        <button>Sign Up</button>
      </form>
    </div>
    <div class="form-container log-in-container">
      <form @submit.prevent="login">
        <h1>Log in</h1>
        <div class="social-container">
          <a href="#" class="social"><i class="fab fa-facebook-f"></i></a>
          <a href="#" class="social"><i class="fab fa-google-plus-g"></i></a>
          <a href="#" class="social"><i class="fab fa-linkedin-in"></i></a>
        </div>
        <span>or use your account</span>
        <input placeholder="Username" v-model="username" />
        <input type="password" placeholder="Password" v-model="password" />
        <a href="#">Forgot your password?</a>
        <button>Log In</button>
      </form>
    </div>
    <div class="overlay-container">
      <div class="overlay">
        <div class="overlay-panel overlay-left">
          <h1>Welcome Back!</h1>
          <p>Already have an account? Log In</p>
          <button class="ghost" @click="showLogin">Log In</button>
        </div>
        <div class="overlay-panel overlay-right">
          <h1>Hello, There!</h1>
          <p>Don't have an account? Sign Up Free</p>
          <button class="ghost" @click="showSignup">Sign Up</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import axios from "axios";

const username = ref("");
const password = ref("");
const signupName = ref("");
const signupEmail = ref("");
const signupPassword = ref("");
const containerClass = ref("");

const login = () => {
  console.log("Logging in:", username.value, password.value);
  // 登录逻辑
};

const signup = () => {
  console.log(
    "Signing up:",
    signupName.value,
    signupEmail.value,
    signupPassword.value
  );
  // 注册逻辑
};

const showSignup = () => {
  containerClass.value = "right-panel-active";
};

const showLogin = () => {
  containerClass.value = "";
};
let styleLinks = [];

function loadAndStoreStyleSheet(href, options = {}) {
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = href;
  Object.entries(options).forEach(([key, value]) => {
    link.setAttribute(key, value);
  });
  document.head.appendChild(link);
  styleLinks.push(link);
}
onMounted(() => {
  loadAndStoreStyleSheet("/styles/login.css");
  loadAndStoreStyleSheet(
    "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css",
    {
      integrity:
        "sha512-xh6O/CkQoPOWDdYTDqeRdPCVd1SpvCA9XXcUnZS2FmJNp1coAFzvtCN9BmamE+4aHK8yyUHUSCcJHgXloTyT2A==",
      crossorigin: "anonymous",
      referrerpolicy: "no-referrer",
    }
  );
});
onUnmounted(() => {
  styleLinks.forEach((link) => {
    if (link) {
      document.head.removeChild(link);
    }
  });
});
</script>
