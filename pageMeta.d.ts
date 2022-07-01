declare module '#app' {
  interface PageMeta {
    // 是否需要鉴权，反之需要鉴定roleCode是否在user.roles授权中
    noAuth?: boolean;
  }
}

// It is always important to ensure you import/export something when augmenting a type
export {};
