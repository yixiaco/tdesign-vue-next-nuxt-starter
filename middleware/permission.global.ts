// navigateTo (route: string | Route, options: { redirectCode: number, replace: boolean )- 重定向到插件或中间件中的给定路由。
// 也可以直接调用它来执行页面导航
// abortNavigation (err?: string | Error)- 中止导航，并显示可选错误消息

export default defineNuxtRouteMiddleware(async (to /* , from */) => {
  const permissionStore = usePermissionStore();

  const { whiteListRouters } = permissionStore;

  const userStore = useUserStore();
  const { token } = userStore;
  if (token) {
    if (to.path === '/login') {
      userStore.logout();
      permissionStore.restore();
      return null;
    }

    const { roles } = userStore;
    if (roles && roles.length > 0) {
      if (permissionStore.hasRoute(to)) {
        return null;
      }
    } else {
      try {
        await userStore.getUserInfo();
        const { roles } = userStore;
        await permissionStore.initRoutes(roles);
        if (!permissionStore.hasRoute(to)) {
          // 没有这个路由权限
          return navigateTo('/404');
        }
      } catch (error) {
        return navigateTo(`/login?redirect=${to.path}&error=${encodeURIComponent(error)}`);
      }
    }
  } else if (!to.meta?.noAuth && whiteListRouters.indexOf(to.path) === -1) {
    return navigateTo(`/login?redirect=${to.path}`);
  }
  return null;
});
