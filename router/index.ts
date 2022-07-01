import baseRouters from './modules/base';
import componentsRouters from './modules/components';
import othersRouters from './modules/others';
import { MenuRoute } from '~/types/interface';

// name: page的组件名称,如果是嵌套路由名称为"parent-child"
// 关于单层路由，meta 中设置 { single: true } 即可为单层路由，{ hidden: true } 即可在侧边栏隐藏该路由

// 存放动态路由
export const asyncRouterList: Array<MenuRoute> = [...baseRouters, ...componentsRouters, ...othersRouters];

// 存放固定的路由
export const defaultRouterList: Array<MenuRoute> = [
  {
    path: '/',
    name: 'index',
    meta: { hidden: true },
  },
];

export const allRoutes = [...defaultRouterList, ...asyncRouterList];
