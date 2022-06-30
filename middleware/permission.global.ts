// navigateTo (route: string | Route, options: { redirectCode: number, replace: boolean )- 重定向到插件或中间件中的给定路由。
// 也可以直接调用它来执行页面导航
// abortNavigation (err?: string | Error)- 中止导航，并显示可选错误消息

import { storeToRefs } from 'pinia';

export default defineNuxtRouteMiddleware(async (to, from) => {
  console.log(to);
  const permissionStore = usePermissionStore();

  const { whiteListRouters } = storeToRefs(permissionStore);

  const userStore = useUserStore();
  const { token } = userStore;

  console.log(token);

  if (token) {
    if (to.path === '/login') {
      console.log('login');
      userStore.logout();
      permissionStore.restore();
      return null;
    }

    const { roles } = userStore;

    if (roles && roles.length > 0) {
      return null;
    }
    try {
      console.log(1);
      await userStore.getUserInfo();
      console.log(2);
      const { roles } = userStore;
      console.log(3);
      await permissionStore.initRoutes(roles);
      console.log(4);
      if (!permissionStore.hasRoute(to.name)) {
        return navigateTo('/');
      }
      console.log(5);
    } catch (error) {
      return navigateTo(`/login?redirect=${to.path}&error=${encodeURIComponent(error)}`);
    }
  } else if (whiteListRouters.value.indexOf(to.path) === -1) {
    return navigateTo(`/login?redirect=${to.path}`);
  }
  return null;
});
