import { RouteRecordName, RouteRecordNormalized, RouteRecordRaw } from 'vue-router';
import { defineStore } from 'pinia';

/**
 * 过滤路由权限
 * @param routes 路由
 * @param roles 用户角色
 */
function filterPermissionsRouters(routes: Array<RouteRecordNormalized | RouteRecordRaw>, roles: Array<unknown>) {
  const res = <Array<RouteRecordNormalized | RouteRecordRaw>>[];
  const removeRoutes = <Array<RouteRecordNormalized | RouteRecordRaw>>[];
  routes.forEach((route) => {
    if (route.children && route.children.length !== 0) {
      const { accessedRouters, removeRoutes: remove } = filterPermissionsRouters(route.children, roles);
      route.children = accessedRouters;
      removeRoutes.push(...remove);
    } else if (!route.meta?.asyncRouter) {
      // 如果设置了非动态路由，则直接加入到路由中
      res.push(route);
    } else if (roles.includes('all')) {
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
  const router = useRouter();
  const routes = router.getRoutes();

  const whiteListRouters = ref(['/login']);
  const routers = ref<Array<RouteRecordNormalized | RouteRecordRaw>>([]);
  const removeRoutes = ref<Array<RouteRecordNormalized | RouteRecordRaw>>([]);

  // 初始化路由
  function initRoutes(roles: Array<unknown>) {
    const { accessedRouters, removeRoutes: remove } = filterPermissionsRouters(routes, roles);
    routers.value = accessedRouters;
    removeRoutes.value = remove;
  }

  // 重置路由
  function restore() {
    routers.value = [];
    removeRoutes.value = [];
  }

  // 是否存在路由
  function hasRoute(name: RouteRecordName, router = routers.value) {
    for (const r of router) {
      if (r.name === name) {
        return true;
      }
      if (r.children) {
        if (hasRoute(name, r.children) === true) {
          return true;
        }
      }
    }
    return false;
  }

  return { whiteListRouters, routers, removeRoutes, initRoutes, restore, hasRoute };
});
