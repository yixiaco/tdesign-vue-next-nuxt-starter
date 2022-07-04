// import LogoutIcon from 'icon/assets-slide-logout.svg';
import { MenuRoute } from '~/types/interface';

export default <Array<MenuRoute>>[
  {
    path: '/user',
    name: 'user',
    meta: { title: '个人页', icon: 'user-circle' },
    children: [
      {
        path: 'index',
        name: 'userIndex',
        meta: { title: '个人中心' },
      },
    ],
  },
  {
    path: '/loginRedirect',
    name: 'loginRedirect',
    meta: { title: '登录页' /* , icon: LogoutIcon */ },
    children: [
      {
        path: 'login',
        name: 'login',
        meta: { title: '登录中心' },
      },
    ],
  },
];
