import { createRouter, createWebHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";

/**
 * Routes
 * - Home: landing page / commands list
 * - Command: command details, param `name`
 */
const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: () => import("../pages/Home.vue"),
    meta: { title: "Home" },
  },
  {
    path: "/commands",
    name: "Commands",
    component: () => import("../pages/Home.vue"),
    meta: { title: "Commands" },
  },
  {
    path: "/command/:name",
    name: "Command",
    component: () => import("../pages/Command.vue"),
    // Pass the route param as a prop the Command page will receive
    props: (route) => ({ commandName: String(route.params?.name ?? "") }),
    meta: { title: "Command" },
  },
  {
    // Fallback for unmatched routes
    path: "/:pathMatch(.*)*",
    redirect: "/",
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL ?? "/"),
  routes,
  scrollBehavior() {
    // Always scroll to top on navigation (better UX for docs)
    return { left: 0, top: 0 };
  },
});

// Set the document title based on route meta or command name
router.beforeEach((to) => {
  const base = "Kam — Wiki";
  if (to.name === "Command") {
    const name = String(to.params?.name ?? "");
    document.title = name ? `${name} · Command | ${base}` : `Command | ${base}`;
  } else if (to.meta?.title) {
    document.title = `${String(to.meta.title)} | ${base}`;
  } else {
    document.title = base;
  }
});

export default router;
