import { acceptHMRUpdate, defineStore } from 'pinia';

const InitUserInfo = {
  roles: [],
};

export const useUserStore = defineStore('user', () => {
  // 默认token不走权限
  const token = ref('main_token');
  const userInfo = ref(InitUserInfo);

  const roles = computed(() => userInfo.value?.roles);

  async function login(userInfo: Record<string, unknown>) {
    const mockLogin = async (userInfo: Record<string, unknown>) => {
      // 登录请求流程
      console.log(userInfo);
      // const { account, password } = userInfo;
      // if (account !== 'td') {
      //   return {
      //     code: 401,
      //     message: '账号不存在',
      //   };
      // }
      // if (['main_', 'dev_'].indexOf(password) === -1) {
      //   return {
      //     code: 401,
      //     message: '密码错误',
      //   };
      // }
      // const token = {
      //   main_: 'main_token',
      //   dev_: 'dev_token',
      // }[password];
      return {
        code: 200,
        message: '登陆成功',
        data: 'main_token',
      };
    };

    const res = await mockLogin(userInfo);
    if (res.code === 200) {
      token.value = res.data;
    } else {
      throw res;
    }
  }

  async function getUserInfo() {
    const mockRemoteUserInfo = async (token: string) => {
      if (token === 'main_token') {
        return {
          name: 'td_main',
          roles: ['all'],
        };
      }
      return {
        name: 'td_dev',
        roles: ['UserIndex', 'DashboardBase', 'login'],
      };
    };

    userInfo.value = await mockRemoteUserInfo(token.value);
  }

  function logout() {
    token.value = '';
    userInfo.value = InitUserInfo;
  }
  function removeToken() {
    token.value = '';
  }

  return {
    token,
    userInfo,
    roles,
    login,
    getUserInfo,
    logout,
    removeToken,
  };
});

if (import.meta.hot) import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot));
