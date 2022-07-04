// import ListIcon from 'icon/assets-slide-list.svg';
// import FormIcon from 'icon/assets-slide-form.svg';
// import DetailIcon from 'icon/assets-slide-detail.svg';
import { MenuRoute } from '~/types/interface';

export default <Array<MenuRoute>>[
  {
    path: '/list',
    name: 'list',
    meta: { title: '列表页' /* , icon: ListIcon */ },
    children: [
      {
        path: 'base',
        name: 'listBase',
        meta: { title: '基础列表页' },
      },
      {
        path: 'card',
        name: 'listCard',
        meta: { title: '卡片列表页' },
      },
      {
        path: 'filter',
        name: 'listFilter',
        meta: { title: '筛选列表页' },
      },
      {
        path: 'tree',
        name: 'listTree',
        meta: { title: '树状筛选列表页' },
      },
    ],
  },
  {
    path: '/form',
    name: 'form',
    meta: { title: '表单页' /* , icon: FormIcon */ },
    children: [
      {
        path: 'base',
        name: 'formBase',
        meta: { title: '基础表单页' },
      },
      {
        path: 'step',
        name: 'formStep',
        meta: { title: '分步表单页' },
      },
    ],
  },
  {
    path: '/detail',
    name: 'detail',
    meta: { title: '详情页' /* , icon: DetailIcon */ },
    children: [
      {
        path: 'base',
        name: 'detailBase',
        meta: { title: '基础详情页' },
      },
      {
        path: 'advanced',
        name: 'detailAdvanced',
        meta: { title: '多卡片详情页' },
      },
      {
        path: 'deploy',
        name: 'detailDeploy',
        meta: { title: '数据详情页' },
      },
      {
        path: 'secondary',
        name: 'detailSecondary',
        meta: { title: '二级详情页' },
      },
    ],
  },
  {
    path: '/result',
    name: 'result',
    meta: { title: '结果页', icon: 'check-circle' },
    children: [
      {
        path: 'success',
        name: 'result-success',
        meta: { title: '成功页' },
      },
      {
        path: 'fail',
        name: 'result-fail',
        meta: { title: '失败页' },
      },
      {
        path: 'network-error',
        name: 'result-network-error',
        meta: { title: '网络异常' },
      },
      {
        path: '403',
        name: 'result-403',
        meta: { title: '无权限' },
      },
      {
        path: '404',
        name: 'result-404',
        meta: { title: '访问页面不存在页' },
      },
      {
        path: '500',
        name: 'result-500',
        meta: { title: '服务器出错页' },
      },
      {
        path: 'browser-incompatible',
        name: 'result-browser-incompatible',
        meta: { title: '浏览器不兼容页' },
      },
      {
        path: 'maintenance',
        name: 'result-maintenance',
        meta: { title: '系统维护页' },
      },
    ],
  },
];
