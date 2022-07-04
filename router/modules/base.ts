// import DashboardIcon from 'icon/assets-slide-dashboard.svg';
import { MenuRoute } from '~/types/interface';

export default <Array<MenuRoute>>[
  {
    path: '/dashboard',
    name: 'dashboard',
    meta: { title: '仪表盘' /* , icon: DashboardIcon */ },
    children: [
      {
        path: 'base',
        name: 'base',
        meta: { title: '概览仪表盘' },
      },
      {
        path: 'detail',
        name: 'dashboardDetail',
        meta: { title: '统计报表' },
      },
    ],
  },
];
