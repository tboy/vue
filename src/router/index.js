import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'



/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [{
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [{
      path: '/redirect/:path(.*)',
      component: () => import('@/views/redirect/index')
    }]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
let d = 'datacenter'
export const asyncRoutes = [{
    path: '/datacenter',
    component: Layout,
    children: [{
      path: 'index',
      component: () => import('@/views/datacenter/index'),
      name: 'datacenter',
      meta: {
        title: '数据中心',
        icon: 'documentation',
        noCache: true
      }
    }]
  },
  {
    path: '/audit',
    component: Layout,
    children: [{
      path: 'index',
      component: () => import('@/views/audit/index'),
      name: 'audit',
      meta: {
        title: '内容审核',
        icon: 'documentation',
        noCache: true
      }
    }]
  },
  {
    path: '/businessmanager',
    component: Layout,
    redirect: '/businessmanager',
    alwaysShow: true, // will always show the root menu
    name: 'businessmanager',
    meta: {
      title: '业务管理',
      icon: 'lock',
      roles: ['admin'] // you can set roles in root nav
    },
    children: [
      {
      path: 'personalaudit',
      component: () => import('@/views/businessmanager/personalaudit/index'),
      name: 'personalaudit',
      meta: {
        title: '个人实名认证',
        roles: ['admin'] // or you can only set roles in sub nav
      }
    },
    {
      path: 'organaudit',
      component: () => import('@/views/businessmanager/organaudit/index'),
      name: 'organaudit',
      meta: {
        title: '机构实名认证',
        roles: ['admin'] // or you can only set roles in sub nav
      }
    },
    {
      path: 'shopaudit',
      component: () => import('@/views/businessmanager/shopaudit/index'),
      name: 'shopaudit',
      meta: {
        title: '平台店铺',
        roles: ['admin'] // or you can only set roles in sub nav
      }
    },
    {
      path: 'personalaudit',
      component: () => import('@/views/businessmanager/personalaudit/index'),
      name: 'PagePermission',
      meta: {
        title: '单项产品认证',
        roles: ['admin'] // or you can only set roles in sub nav
      }
    },
    {
      path: 'personalaudit',
      component: () => import('@/views/businessmanager/personalaudit/index'),
      name: 'PagePermission',
      meta: {
        title: '第三方交易平台',
        roles: ['admin'] // or you can only set roles in sub nav
      }
    },
    {
      path: 'personalaudit',
      component: () => import('@/views/businessmanager/personalaudit/index'),
      name: 'PagePermission',
      meta: {
        title: '企业资质认证',
        roles: ['admin'] // or you can only set roles in sub nav
      }
    }
    ]
  },

  {
    path: '/goodsmanager',
    component: Layout,
    redirect: '/goodsmanager',
    alwaysShow: true, // will always show the root menu
    name: 'goodsmanager',
    meta: {
      title: '商品管理',
      icon: 'lock',
      roles: ['admin'] // you can set roles in root nav
    },
    children: [
      {
      path: 'personalaudit',
      component: () => import('@/views/businessmanager/personalaudit/index'),
      name: 'PagePermission',
      meta: {
        title: '商品列表',
        roles: ['admin'] // or you can only set roles in sub nav
      }
    },
    {
      path: 'personalaudit',
      component: () => import('@/views/businessmanager/personalaudit/index'),
      name: 'PagePermission',
      meta: {
        title: '新增商品',
        roles: ['admin'] // or you can only set roles in sub nav
      }
    }
    ]
  },
  {
      path: '/ordermanager',
      component: Layout,
      children: [{
        path: 'index',
        component: () => import('@/views/datacenter/index'),
        name: 'ordermanager',
        meta: {
          title: '订单管理',
          icon: 'documentation',
          noCache: true
        }
      }]
    },
    {
        path: '/optlog',
        component: Layout,
        children: [{
          path: 'index',
          component: () => import('@/views/datacenter/index'),
          name: 'optlog',
          meta: {
            title: '操作日志',
            icon: 'documentation',
            noCache: true
          }
        }]
      },
  // 404 page must be placed at the end !!!
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
