import { defineStore } from 'pinia';
import { RouteLocationNormalized } from 'vue-router';
import { defaultRouterList, asyncRouterList } from '~/router';
import { MenuRoute } from '~/types/interface';

/**
 * 过滤路由权限
 * @param routes 路由
 * @param roles 用户角色
 */
function filterPermissionsRouters(routes: Array<MenuRoute>, roles: Array<unknown>) {
  const res = <Array<MenuRoute>>[];
  const removeRoutes = <Array<MenuRoute>>[];
  routes.forEach((route) => {
    if (route.children && route.children.length !== 0) {
      const { accessedRouters, removeRoutes: remove } = filterPermissionsRouters(route.children, roles);
      if (accessedRouters.length > 0) {
        route.children = accessedRouters;
        res.push(route);
      }
      removeRoutes.push(...remove);
    } else if (roles.includes('all')) {
      // 拥有全部权限
      res.push(route);
    } else {
      const roleCode = route.meta?.roleCode || route.name;
      if (roleCode && roles.includes(roleCode)) {
        res.push(route);
      } else {
        removeRoutes.push(route);
      }
    }
  });
  return { accessedRouters: res, removeRoutes };
}

export const usePermissionStore = defineStore('permission', () => {
  const whiteListRouters = ref(['/login']);
  const routers = ref<Array<MenuRoute>>([]);
  const removeRoutes = ref<Array<MenuRoute>>([]);

  // 初始化路由
  function initRoutes(roles: Array<unknown>) {
    const { accessedRouters, removeRoutes: remove } = filterPermissionsRouters(asyncRouterList, roles);
    routers.value = defaultRouterList.concat(accessedRouters);
    removeRoutes.value = remove;
  }

  // 重置路由
  function restore() {
    routers.value = [];
    removeRoutes.value = [];
  }

  // 是否存在路由权限
  function hasRoute(to: RouteLocationNormalized, router = routers.value) {
    if (to.meta?.noAuth) {
      return true;
    }
    for (const route of router) {
      if (route.name === to.name.toString()) {
        return true;
      }
      if (route.children) {
        if (hasRoute(to, route.children) === true) {
          return true;
        }
      }
    }
    return false;
  }

  return { whiteListRouters, routers, removeRoutes, initRoutes, restore, hasRoute };
});
