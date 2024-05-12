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
import { useRouter } from "vue-router";
// import Swal from "sweetalert2";
const username = ref("");
const password = ref("");
const signupName = ref("");
const signupEmail = ref("");
const signupPassword = ref("");
const containerClass = ref("");
const router = useRouter();
async function login() {
  if (username.value.length < 3 || password.value.length < 8) {
    alert("Username or password is too short!");
    return;
  }
  try {
    const response = await axios.post(
      "http://localhost:8000/auth/login",
      { username: username.value, password: password.value },
      { withCredentials: true }
    );
    username.value = "";
    password.value = "";
    console.log("Response:", response.data.message);
    if (response.data.is_logged_in) {
      router.push({ name: "editor" });
    } else {
      alert("登录失败，请检查您的用户名和密码。");
    }
  } catch (error) {
    // console.error("JS Error:", error.response.data);
    if (error.response) {
      console.log(error.response.data.detail);
    } else {
      console.error("錯誤: " + error.message);
    }
  }
}

async function signup() {
  if (signupName.value.length < 3 || signupPassword.value.length < 8) {
    alert("Username or password is too short!");
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
    signupName.value = "";
    signupPassword.value = "";
    signupEmail.value = "";
    console.log("Response:", response.data.message);
    // instance.proxy.$swal({
    //   position: "center",
    //   icon: "success",
    //   title: response.data.message,
    //   showConfirmButton: false,
    // });
  } catch (error) {
    console.error("JS Error:", error);
    // if (error.response) {
    //   error.response.data.detail.forEach((msg) => {
    //     console.error(msg.loc[1] + " " + msg.msg);
    //     // Swal.fire({
    //     //   position: "center",
    //     //   icon: "error",
    //     //   title: "Oops...",
    //     //   text: msg.loc[1] + " " + msg.msg,
    //     // });
    //   });
    // } else {
    //   //   Swal.fire({
    //   //     icon: "error",
    //   //     title: "Oops...",
    //   //     text: "錯誤: " + error.message,
    //   //   });
    //   console.error("錯誤: " + error.message);
    // }
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
  // loadAndStoreStyleSheet("/styles/login.css");
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
<style scoped>
/* *{
  box-sizing: border-box;
}
html,
body{
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
} */
/* body {
  background: #3260de;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-family: "Montserrat", sans-serif;
  height: 100vh;
  margin: -20px 0 50px;
} */
#app{
  background: #3260de;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-family: "Montserrat", sans-serif;
  height: 100vh;
  /* margin: -20px 0 50px; */
}

h1 {
  font-weight: bold;
  margin: 0;
}

h2 {
  text-align: center;
}

p {
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  letter-spacing: 0.5px;
  margin: 20px 0 30px;
}

span {
  font-size: 12px;
}

a {
  color: #333;
  font-size: 14px;
  text-decoration: none;
  margin: 15px 0;
}

button {
  border-radius: 20px;
  border: none;
  background-color: #3f2eff;
  color: #ffffff;
  font-size: 12px;
  font-weight: bold;
  padding: 12px 45px;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: transform 80ms ease-in;
}

button:active {
  transform: scale(0.95);
}

button:focus {
  outline: none;
}

button.ghost {
  background-color: transparent;
  border: 1px solid #ffffff;

  transition: 0.5s;
}

button.ghost:hover {
  background-color: #ffffff;
  color: #0e1119;
  cursor: pointer;
}

form {
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 50px;
  height: 100%;
  text-align: center;
}

input {
  background-color: #eee;
  border: none;
  padding: 12px 15px;
  margin: 8px 0;
  width: 100%;
}

.container {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  position: relative;
  overflow: hidden;
  width: 768px;
  max-width: 100%;
  min-height: 480px;
}

.form-container {
  position: absolute;
  top: 0;
  height: 100%;
  transition: all 0.6s ease-in-out;
}

.log-in-container {
  left: 0;
  width: 50%;
  z-index: 2;
}

.container.right-panel-active .log-in-container {
  transform: translateX(100%);
}

.sign-up-container {
  left: 0;
  width: 50%;
  opacity: 0;
  z-index: 1;
}

.container.right-panel-active .sign-up-container {
  transform: translateX(100%);
  opacity: 1;
  z-index: 5;
  animation: show 0.6s;
}

@keyframes show {
  0%,
  49.99% {
    opacity: 0;
    z-index: 1;
  }

  50%,
  100% {
    opacity: 1;
    z-index: 5;
  }
}

.overlay-container {
  position: absolute;
  top: 0;
  left: 50%;
  width: 50%;
  height: 100%;
  overflow: hidden;
  transition: transform 0.6s ease-in-out;
  z-index: 100;
}

.container.right-panel-active .overlay-container {
  transform: translateX(-100%);
}

.overlay {
  background: #ff416c;
  background: linear-gradient(142.18deg, #3793ff 0%, #fe368a 98.85%);

  background-repeat: no-repeat;
  background-size: cover;
  background-position: 0 0;
  color: #ffffff;
  position: relative;
  left: -100%;
  height: 100%;
  width: 200%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
}

.container.right-panel-active .overlay {
  transform: translateX(50%);
}

.overlay-panel {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 40px;
  text-align: center;
  top: 0;
  height: 100%;
  width: 50%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
}

.overlay-left {
  transform: translateX(-20%);
}

.container.right-panel-active .overlay-left {
  transform: translateX(0);
}

.overlay-right {
  right: 0;
  transform: translateX(0);
}

.container.right-panel-active .overlay-right {
  transform: translateX(20%);
}

.social-container {
  margin: 20px 0;
}

.social-container a {
  border: 1px solid #dddddd;
  border-radius: 50%;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  margin: 0 5px;
  height: 40px;
  width: 40px;
}
</style>
