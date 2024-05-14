import { createRouter, createWebHistory } from "vue-router";
import axios from 'axios';
import HomeView from "@/views/HomeView.vue";
import LoginView from "@/views/LoginView.vue";
import MarkdownEditorView from "@/views/MarkdownEditorView.vue";
import NotFound from '@/views/NotFound.vue'

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
    {
      path: '/:catchAll(.*)',  // 捕获所有未匹配的路由
      name: 'NotFound',
      component: NotFound
    },
    {
      path: "/editor",
      name: "editor",
      component: MarkdownEditorView,
      meta: { title: 'MarkDown 編輯器' },
      beforeEnter: async (to, from, next) => {
        try {
          const response = await axios.get('http://localhost:8000/auth/isLogin',{ withCredentials: true });
          if (response.data.is_logged_in) {
            next();
          } else {
            next({ name: 'login' });
          }
        } catch (error) {
          next({ name: 'login' });
        }
      },
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
