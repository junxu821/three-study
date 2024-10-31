import Layout from '@/layout/index.vue'
export default {
  path: '/study',
  component: Layout,
  redirect: '/study/HelloWorld',
  children: [{
    path: 'HelloWorld',
    component: () => import("@/views/study/TestAnimation/index.vue"),
    meta: {
      title: '第一个场景'
    }
  },
  {
    path: 'DrawingLines',
    component: () => import("@/views/study/DrawingLines.vue"),
    meta: {
      title: '画线'
    }
  },
  {
    path: 'Loading3DModels',
    component: () => import("@/views/study/Loading3DModels/index.vue"),
    meta: {
      title: '加载3D模型'
    }
  },
  {
    path: 'VRContent',
    component: () => import("@/views/study/VRContent.vue"),
    meta: {
      title: '加载VR内容'
    }
  },
  {
    path: 'AxesHelper',
    component: () => import("@/views/study/AxesHelper.vue"),
    meta: {
      title: '辅助坐标系'
    }
  },
  {
    path: 'TestStats',
    component: () => import("@/views/study/TestStats.vue"),
    meta: {
      title: '帧率'
    }
  },
  {
    path: 'TestBox',
    component: () => import("@/views/study/TestBox.vue"),
    meta: {
      title: '单列阵列'
    }
  },
  {
    path: 'TestGeometry',
    component: () => import("@/views/study/TestGeometry.vue"),
    meta: {
      title: '常见几何体'
    }
  },
  {
    path: 'BufferGeometry',
    component: () => import("@/views/study/BufferGeometry.vue"),
    meta: {
      title: '缓冲几何体'
    }
  },
  {
    path: 'TestGroup',
    component: () => import("@/views/study/TestGroup.vue"),
    meta: {
      title: '组的概念'
    }
  },
  {
    path: 'TestTexture',
    component: () => import("@/views/study/TestTexture/index.vue"),
    meta: {
      title: '测试纹理'
    }
  },
  {
    path: 'TestGui',
    component: () => import("@/views/study/TestGui.vue"),
    meta: {
      title: 'gui'
    }
  },
  {
    path: 'TestVector3',
    component: () => import("@/views/study/TestVector3.vue"),
    meta: {
      title: 'gui'
    }
  },


  {
    path: 'TestArc',
    component: () => import("@/views/study/Line/TestArc.vue"),
    meta: {
      title: '圆弧'
    }
  },
  {
    path: 'TestMapControls',
    component: () => import("@/views/study/TestMapControls.vue"),
    meta: {
      title: '地图控件'
    }
  },
  {
    path: 'TestSpotLight',
    component: () => import("@/views/study/Light/TestSpotLight.vue"),
    meta: {
      title: '聚光灯'
    }
  },
  {
    path: 'TestOutlinePass',
    component: () => import("@/views/study/TestOutlinePass.vue"),
    meta: {
      title: '线框'
    }
  },
  {
    path: 'TestBloom',
    component: () => import("@/views/study/TestBloom.vue"),
    meta: {
      title: '线框'
    }
  },
  {
    path: 'SkyBox',
    component: () => import("@/views/study/SkyBox/index.vue"),
    meta: {
      title: '天空盒'
    }
  },
  {
    path: 'TestRain',
    component: () => import('@/views/study/TestRain/index.vue'),
    meta: {
      title: '雨滴'
    }
  },
  {
    path: 'TestAnimation',
    component: () => import('@/views/study/TestAnimation/index.vue'),
    meta: {
      title: '测试动画'
    }
  },
  {
    path: 'TestSky',
    component: () => import('@/views/study/TestSky.vue'),
    meta: {
      title: '测试天空插件'
    }
  },
  {
    path: 'TestTeapot',
    component: () => import('@/views/study/TestTeapot.vue'),
    meta: {
      title: '茶壶'
    }
  },
  {
    path: 'TestGrid',
    component: () => import('@/views/study/TestGrid/index.vue'),
    meta: {
      title: '网格'
    }
  },
  ]
}
