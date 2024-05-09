import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import LoginView from "@/views/LoginView.vue";

const router = createRouter({
  history: createWebHistory(), // 使用 HTML5 History 模式
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      meta: { title: '首頁' },
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
      meta: { title: '登入' },
    },
  ],
});
router.beforeEach((to, from, next) => {
  const defaultTitle = "預設標題";
  document.title =
    typeof to.meta.title === "string" ? to.meta.title : defaultTitle;
  next();
});
export default router;
