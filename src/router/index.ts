
import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
const files: Record<string, any> = import.meta.glob('./*.routes.ts', { eager: true })
const routes: Array<RouteRecordRaw> = []
for (const file of Object.values(files)) {
    routes.push(file.default)
}
routes.push({
    path: '/',
    redirect: routes[0].path,
})
routes.push({
    path: '/NotFound',
    component: () => import("@/views/NotFound.vue"),
})
const router = createRouter({
    history: createWebHashHistory(),
    routes,
});
router.beforeEach((to, _from, next) => {
    document.title =  to.meta.title as string||'threeJs'
    next()
})
export default router;