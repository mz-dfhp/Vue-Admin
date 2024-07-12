import type { RouteRecordRaw } from 'vue-router'

const layout = () => import('@/layout/index.vue')

const routes: RouteRecordRaw = {
  path: '/keep',
  component: layout,
  meta: {
    title: '缓存',
    sort: 2,
    icon: 'i-bi:grid',
  },
  children: [
    {
      path: 'keep-one',
      component: () => import('@/views/keep/keep-one-page.vue'),
      meta: {
        title: '缓存组件一',
        keepAlive: true,
      },
    },
    {
      path: 'keep-one-info',
      component: () => import('@/views/keep/keep-one-page-info.vue'),
      meta: {
        title: '缓存组件一(详情页)',
        hide: true,
        activeMenu: 'keep-one',
      },
    },
    {
      path: 'keep-two',
      meta: {
        title: '缓存组件二',
      },
      redirect: '',
      children: [
        {
          path: 'keep-two-page',
          component: () => import('@/views/keep/keep-two/keep-two-page.vue'),
          meta: {
            title: '二级缓存页面',
            keepAlive: true,
          },
        },
        {
          path: 'keep-three',
          meta: {
            title: '缓存组件三',
          },
          redirect: '',
          children: [
            {
              path: 'keep-three-page',
              component: () => import('@/views/keep/keep-two/keep-three/keep-three-page.vue'),
              meta: {
                title: '三级缓存页面',
                keepAlive: true,
              },
            },
            {
              path: 'keep-four',
              meta: {
                title: '缓存组件四',
              },
              redirect: '',
              children: [
                {
                  path: 'keep-four-page',
                  component: () => import('@/views/keep/keep-two/keep-three/keep-four/keep-four-page.vue'),
                  meta: {
                    title: '四级缓存页面',
                    keepAlive: true,
                  },
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}

export default routes
