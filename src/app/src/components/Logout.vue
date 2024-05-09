<template>
  <button @click="logout">登出</button>
</template>
<script setup>
import { useRouter } from 'vue-router';
import axios from "axios";
const router = useRouter();
async function logout() {
  console.log('Logging out...');
  const res = await axios.post(
    "http://localhost:8000/auth/logout",
    {},
    { withCredentials: true }
  );
  router.push({ name: 'login' });
}
</script>
