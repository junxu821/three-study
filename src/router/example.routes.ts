import Layout from '@/layout/index.vue'
export default {
  path: '/',
  component: Layout,
  redirect: '/HelloWorld',
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
    path: 'TestGui',
    component: () => import("@/views/TestGui.vue"),
    meta: {
      title: 'gui'
    }
  },
  {
    path: 'TestVector3',
    component: () => import("@/views/TestVector3.vue"),
    meta: {
      title: 'gui'
    }
  },

  {
    path: 'Gallery',
    component: () => import("@/views/Gallery/index.vue"),
    meta: {
      title: '画廊'
    }
  },
  {
    path: 'TestArc',
    component: () => import("@/views/Line/TestArc.vue"),
    meta: {
      title: '圆弧'
    }
  },
  {
    path: 'TestMapControls',
    component: () => import("@/views/TestMapControls.vue"),
    meta: {
      title: '地图控件'
    }
  },
  {
    path: 'TestSpotLight',
    component: () => import("@/views/Light/TestSpotLight.vue"),
    meta: {
      title: '聚光灯'
    }
  },
  {
    path: 'TestOutlinePass',
    component: () => import("@/views/TestOutlinePass.vue"),
    meta: {
      title: '线框'
    }
  },
  {
    path: 'TestBloom',
    component: () => import("@/views/TestBloom.vue"),
    meta: {
      title: '线框'
    }
  },
  {
    path: 'SkyBox',
    component: () => import("@/views/SkyBox/index.vue"),
    meta: {
      title: '天空盒'
    }
  },
  {
    path: 'demo1',
    component: () => import("@/views/demo1/index.vue"),
    meta: {
      title: '天空盒'
    }
  },
  {
    path: 'TestRain',
    component: () => import('@/views/TestRain/index.vue'),
    meta: {
      title: '雨滴'
    }
  }

  ]
}
