import { RouteRecordNormalized, RouteRecordRaw } from 'vue-router';
import { defineStore } from 'pinia';

/**
 * 过滤路由权限
 * @param routes 路由
 * @param roles 用户角色
 */
function filterPermissionsRouters(routes: Array<RouteRecordNormalized | RouteRecordRaw>, roles: Array<unknown>) {
  const res = [];
  const removeRoutes = [];
  routes.forEach((route) => {
    if (route.children && route.children.length !== 0) {
      const { accessedRouters, removeRoutes: remove } = filterPermissionsRouters(route.children, roles);
      route.children = accessedRouters;
      removeRoutes.push(...remove);
    } else if (!route.meta?.asyncRouter) {
      // 如果设置了非动态路由，则直接加入到路由中
      res.push(route);
    } else if (route.meta.hidden) {
      // 隐藏路由菜单
      removeRoutes.push(route);
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
  const routers = ref([]);
  const removeRoutes = ref([]);

  function initRoutes(roles: Array<unknown>) {
    const { accessedRouters, removeRoutes: remove } = filterPermissionsRouters(routes, roles);
    routers.value = accessedRouters;
    removeRoutes.value = remove;
  }

  return { whiteListRouters, routers, removeRoutes, initRoutes };
});
