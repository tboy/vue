import {
  constantRoutes
} from '@/router'
import {
  getAdminMenu
} from '@/api/sys'
import Layout from '@/layout'
/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route
    }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })

  return res
}

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  generateRoutes({
    commit
  }, roles) {
    return new Promise(resolve => {
      const accessedRoutes = []
      // if (roles.includes('admin')) {
      //   accessedRoutes = asyncRoutes || []
      // } else {
      //   accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
      // }
      getAdminMenu().then(res => {
        const {
          data
        } = res
        data.map(item => {
          const m1 = {
            path: item.path,
            component: Layout,
            alwaysShow: item.alwaysShow == 1
          }
          if (item.childList.length == 0) {
            m1.children = [{
              path: 'index',
              component: () => import(`@/views${item.path}/index`),
              name: item.path,
              meta: {
                title: item.title,
                icon: item.icon,
                noCache: true
              }
            }]
          } else {
            m1.redirect = item.path
            m1.alwaysShow = item.alwaysShow == 1 // will always show the root menu
            m1.name = item.path
            m1.meta = {
              title: item.title,
              icon: item.icon,
              roles: ['admin'] // you can set roles in root nav
            }
            m1.children = []
            item.childList.map(item2 => {
              let compent = m1.path + '/' + item2.path
              const m2 = {
                path: item2.path,
                component: () => import(`@/views${compent}/index`),
                name: item2.path,
                meta: {
                  title: item2.title,
                  roles: ['admin'] // or you can only set roles in sub nav
                }
              }
              m1.children.push(m2)
            })

          }
          accessedRoutes.push(m1)
        })
        commit('SET_ROUTES', accessedRoutes)
        resolve(accessedRoutes)
      })


    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
