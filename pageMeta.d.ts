declare module '#app' {
  interface PageMeta {
    // 标题
    title?: string;
    // 图标
    icon?: string;
    // 权限标识
    roleCode?: unknown;
    // 是否是动态路由，如果非动态路由，则直接在菜单中展示，反之需要鉴定roleCode是否在user.roles授权中
    asyncRouter?: boolean;
    // 是否在菜单中隐藏
    hidden?: boolean;
    // 单层路由
    single?: boolean;
  }
}

// It is always important to ensure you import/export something when augmenting a type
export {};
