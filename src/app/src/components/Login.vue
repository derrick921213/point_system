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
        <input
          type="text"
          placeholder="Username(至少 3 個字母)"
          v-model="signupName"
        />
        <input
          type="password"
          placeholder="Password(至少 8 個字母)"
          v-model="signupPassword"
        />
        <input type="email" placeholder="Email" v-model="signupEmail" />
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
        <input type="text" placeholder="Username" v-model="username" />
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
import { ref, onMounted, onUnmounted, getCurrentInstance } from "vue";
import axios from "axios";
// import Swal from "sweetalert2";
const username = ref("");
const password = ref("");
const signupName = ref("");
const signupEmail = ref("");
const signupPassword = ref("");
const containerClass = ref("");
async function login() {
  if (username.value.length < 3 || password.value.length < 8) {
    alert("Username or password is too short!")
    return;
  }
  try {
    const respone = await axios.post(
      "http://localhost:8000/auth/login",
      { username: username.value, password: password.value },
      { withCredentials: true }
    );
    console.log("Response:", respone.data.message);
  } catch (error) {
    // console.error("JS Error:", error.response.data);
    if (error.response) {
      // Vue.swal('Hello Vue world!!!');
      //   Swal.fire({
      //     icon: "error",
      //     title: "Oops...",
      //     text: error.response.data.detail,
      //   });
      console.log(error.response.data.detail);
    } else {
      //   Swal.fire({
      //     icon: "error",
      //     title: "Oops...",
      //     text: "錯誤: " + error.message,
      //   });
      console.error("錯誤: " + error.message);
    }
  }
}

async function signup() {
  if (signupName.value.length < 3 || signupPassword.value.length < 8) {
    alert("Username or password is too short!")
    return;
  }
  try {
    const response = await axios.post(
      "http://localhost:8000/auth/register/",
      {
        username: signupName.value,
        password: signupPassword.value,
        email: signupEmail.value,
      },
      { withCredentials: true }
    );
    console.log("Response:", response.data.message);
    // instance.proxy.$swal({
    //   position: "center",
    //   icon: "success",
    //   title: response.data.message,
    //   showConfirmButton: false,
    // });
  } catch (error) {
    // console.error("JS Error:", error);
    if (error.response) {
      error.response.data.detail.forEach((msg) => {
        console.error(msg.loc[1] + " " + msg.msg);
        // Swal.fire({
        //   position: "center",
        //   icon: "error",
        //   title: "Oops...",
        //   text: msg.loc[1] + " " + msg.msg,
        // });
      });
    } else {
      //   Swal.fire({
      //     icon: "error",
      //     title: "Oops...",
      //     text: "錯誤: " + error.message,
      //   });
      console.error("錯誤: " + error.message);
    }
  }
}

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
