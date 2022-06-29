import { defineStore } from 'pinia';
import { TRouterInfo, TTabRouterType } from '~/types/interface';

const homeRoute: Array<TRouterInfo> = [
  {
    path: '/dashboard/base',
    routeIdx: 0,
    title: '仪表盘',
    name: 'DashboardBase',
    isHome: true,
  },
];

const state = <TTabRouterType>{
  tabRouterList: homeRoute,
  isRefreshing: false,
};

// 不需要做多标签tabs页缓存的列表 值为每个页面对应的name 如 DashboardDetail
// const ignoreCacheRoutes = ['DashboardDetail'];
const ignoreCacheRoutes = ['login'];

export const useTabsRouterStore = defineStore('tabsRouter', () => {
  const tabsRouter = ref(state);

  const tabRouters = computed(() => tabsRouter.value.tabRouterList);
  const refreshing = computed(() => tabsRouter.value.isRefreshing);

  // 处理刷新
  function toggleTabRouterAlive(routeIdx: number) {
    tabsRouter.value.isRefreshing = !tabsRouter.value.isRefreshing;
    tabRouters[routeIdx].isAlive = !tabRouters[routeIdx].isAlive;
  }

  // 处理新增
  function appendTabRouterList(newRoute: TRouterInfo) {
    const needAlive = !ignoreCacheRoutes.includes(newRoute.name as string);
    if (!tabRouters.value.find((route: TRouterInfo) => route.path === newRoute.path)) {
      tabsRouter.value.tabRouterList = tabsRouter.value.tabRouterList.concat({ ...newRoute, isAlive: needAlive });
    }
  }

  // 处理关闭当前
  function subtractCurrentTabRouter(newRoute: TRouterInfo) {
    const { routeIdx } = newRoute;
    tabsRouter.value.tabRouterList = tabsRouter.value.tabRouterList
      .slice(0, routeIdx)
      .concat(tabsRouter.value.tabRouterList.slice(routeIdx + 1));
  }

  // 处理关闭右侧
  function subtractTabRouterBehind(newRoute: TRouterInfo) {
    const { routeIdx } = newRoute;
    tabsRouter.value.tabRouterList = tabsRouter.value.tabRouterList.slice(0, routeIdx + 1);
  }

  // 处理关闭左侧
  function subtractTabRouterAhead(newRoute: TRouterInfo) {
    const { routeIdx } = newRoute;
    tabsRouter.value.tabRouterList = homeRoute.concat(tabsRouter.value.tabRouterList.slice(routeIdx));
  }

  // 处理关闭其他
  function subtractTabRouterOther(newRoute: TRouterInfo) {
    const { routeIdx } = newRoute;
    tabsRouter.value.tabRouterList =
      routeIdx === 0 ? homeRoute : homeRoute.concat([tabsRouter.value.tabRouterList?.[routeIdx]]);
  }

  function removeTabRouterList() {
    tabsRouter.value.tabRouterList = [];
  }
  function initTabRouterList(newRoutes: TRouterInfo[]) {
    newRoutes?.forEach((route: TRouterInfo) => appendTabRouterList(route));
  }

  return {
    tabsRouter,
    tabRouters,
    refreshing,
    toggleTabRouterAlive,
    appendTabRouterList,
    subtractCurrentTabRouter,
    subtractTabRouterBehind,
    subtractTabRouterAhead,
    subtractTabRouterOther,
    removeTabRouterList,
    initTabRouterList,
  };
});
