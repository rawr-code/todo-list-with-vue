import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/:type?",
    name: "Home",
    component: Home,
  },
  {
    path: "/todos/new",
    name: "AddTodo",
    component: () =>
      import(/* webpackChunkName: "addTodo" */ "../views/AddTodo.vue"), // Lazy load
  },
  {
    path: "/todos/edit/:id",
    name: "EditTodo",
    component: () =>
      import(/* webpackChunkName: "editTodo" */ "../views/EditTodo.vue"), // Lazy load
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
