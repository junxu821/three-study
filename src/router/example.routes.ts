import Layout from '@/layout/index.vue'
export default {
  path: '/example',
  component: Layout,
  redirect: '/example/HelloWorld',
  children: [{
    path: 'HelloWorld',
    component: () => import("@/views/HelloWorld.vue"),
    meta: {
      title: '第一个场景'
    }
  },
  {
    path: 'DrawingLines',
    component: () => import("@/views/DrawingLines.vue"),
    meta: {
      title: '画线'
    }
  },
  {
    path: 'Loading3DModels',
    component: () => import("@/views/Loading3DModels/index.vue"),
    meta: {
      title: '加载3D模型'
    }
  },
  {
    path: 'VRContent',
    component: () => import("@/views/VRContent.vue"),
    meta: {
      title: '加载VR内容'
    }
  },
  {
    path: 'AxesHelper',
    component: () => import("@/views/AxesHelper.vue"),
    meta: {
      title: '辅助坐标系'
    }
  },
  {
    path: 'TestStats',
    component: () => import("@/views/TestStats.vue"),
    meta: {
      title: '帧率'
    }
  },
  {
    path: 'TestBox',
    component: () => import("@/views/TestBox.vue"),
    meta: {
      title: '单列阵列'
    }
  },
  {
    path: 'TestGeometry',
    component: () => import("@/views/TestGeometry.vue"),
    meta: {
      title: '常见几何体'
    }
  },
  {
    path: 'BufferGeometry',
    component: () => import("@/views/BufferGeometry.vue"),
    meta: {
      title: '缓冲几何体'
    }
  },
  {
    path: 'TestGroup',
    component: () => import("@/views/TestGroup.vue"),
    meta: {
      title: '组的概念'
    }
  },
  {
    path: 'TestTexture',
    component: () => import("@/views/TestTexture/index.vue"),
    meta: {
      title: '测试纹理'
    }
  },
  {
    path: 'Gallery',
    component: () => import("@/views/Gallery/index.vue"),
    meta: {
      title: '画廊'
    }
  }
  ]
}
