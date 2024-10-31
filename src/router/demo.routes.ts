import Layout from '@/layout/index.vue'
export default {
    path: '/case',
    component: Layout,
    redirect: '/case/demo1',
    children: [
        {
            path: 'Canteen',
            component: () => import("@/views/case/Canteen/index.vue"),
            meta: {
                title: '天空盒'
            }
        },
        {
            path: 'SmartFactory',
            component: () => import("@/views/case/SmartFactory/index.vue"),
            meta: {
                title: '第一个场景'
            }
        },
        {
            path: 'Gallery',
            component: () => import("@/views/case/Gallery/index.vue"),
            meta: {
                title: '画廊'
            }
        },
    ]
}