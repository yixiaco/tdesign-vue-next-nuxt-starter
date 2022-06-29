import { storeToRefs } from 'pinia';
import {
  Layout as TLayout,
  Content as TContent,
  Footer as TFooter,
  Aside as TAside,
  Dropdown as TDropdown,
  Tabs as TTabs,
  TabPanel as TTabPanel,
  DropdownMenu as TDropdownMenu,
} from 'tdesign-vue-next';
import { prefix } from '~/config/global';
import { TRouterInfo } from '~/types/interface';
import 'style/layout.less';
import LayoutSideNav from '~/components/layout/LayoutSideNav';
import LayoutBreadcrumb from '~/components/layout/LayoutBreadcrumb.vue';
import LayoutContent from '~/components/layout/LayoutContent.vue';
import LayoutFooter from '~/components/layout/LayoutFooter.vue';
import LayoutHeader from '~/components/layout/LayoutHeader.vue';
import LayoutSetting from '~/components/layout/LayoutSetting.vue';

const name = `${prefix}-base-layout`;

export default defineComponent({
  name,
  components: {
    TLayout,
    TContent,
    TFooter,
    TAside,
    TDropdown,
    TTabs,
    TTabPanel,
    TDropdownMenu,
  },
  setup(props, { slots }) {
    const route = useRoute();
    const router = useRouter();
    const permissionStore = usePermissionStore();
    const settingStore = useSettingStore();
    const tabsRouterStore = useTabsRouterStore();
    const { routers: menuRouters } = storeToRefs(permissionStore);
    const { setting } = storeToRefs(settingStore);

    const mainLayoutCls = computed(() => [
      {
        't-layout--with-sider': settingStore.showSidebar,
      },
    ]);

    const headerMenu = computed(() => {
      const { layout, splitMenu } = setting.value;
      if (layout === 'mix') {
        if (splitMenu) {
          return menuRouters.value.map((menu) => ({
            ...menu,
            children: [],
          }));
        }
        return [];
      }
      return menuRouters.value;
    });

    const sideMenu = computed(() => {
      const { layout, splitMenu } = setting.value;
      let newMenuRouters = menuRouters.value;
      if (layout === 'mix' && splitMenu) {
        newMenuRouters.forEach((menu) => {
          if (route.path.indexOf(menu.path) === 0) {
            newMenuRouters = menu.children.map((subMenu) => ({ ...subMenu, path: `${menu.path}/${subMenu.path}` }));
          }
        });
      }
      return newMenuRouters;
    });

    const appendNewRoute = () => {
      const {
        path,
        meta: { title },
        name,
      } = route;
      tabsRouterStore.appendTabRouterList({ path, title: title as string, name, isAlive: true });
    };

    const getTabRouterListCache = () => {
      tabsRouterStore.initTabRouterList(JSON.parse(localStorage.getItem('tabRouterList')));
    };
    const setTabRouterListCache = () => {
      const { tabRouters } = tabsRouterStore;
      localStorage.setItem('tabRouterList', JSON.stringify(tabRouters));
    };

    onMounted(() => {
      appendNewRoute();
    });

    // 如果不需要持久化标签页可以注释掉以下的 onMounted 和 onBeforeUnmount 的内容
    onMounted(() => {
      if (localStorage.getItem('tabRouterList')) getTabRouterListCache();
      window.addEventListener('beforeunload', setTabRouterListCache);
    });

    onBeforeUnmount(() => {
      window.removeEventListener('beforeunload', setTabRouterListCache);
    });

    watch(
      () => route.path,
      () => {
        appendNewRoute();
        if (process.browser) {
          document.querySelector(`.${prefix}-layout`).scrollTo({ top: 0, behavior: 'smooth' });
        }
      },
    );

    const handleRemove = ({ value: path, index }) => {
      const { tabRouters } = tabsRouterStore;
      const nextRouter = tabRouters[index + 1] || tabRouters[index - 1];

      tabsRouterStore.subtractCurrentTabRouter({ path, routeIdx: index });
      if (path === route.path) {
        router.push(nextRouter.path);
      }
    };
    const handleChangeCurrentTab = (path: string) => {
      router.push(path);
    };
    const handleRefresh = (currentPath: string, routeIdx: number) => {
      tabsRouterStore.toggleTabRouterAlive(routeIdx);
      nextTick(() => {
        tabsRouterStore.toggleTabRouterAlive(routeIdx);
        router.replace({ path: currentPath });
      });
    };
    const handleCloseAhead = (path: string, routeIdx: number) => {
      tabsRouterStore.subtractTabRouterAhead({ path, routeIdx });
    };
    const handleCloseBehind = (path: string, routeIdx: number) => {
      tabsRouterStore.subtractTabRouterBehind({ path, routeIdx });
    };
    const handleCloseOther = (path: string, routeIdx: number) => {
      tabsRouterStore.subtractTabRouterOther({ path, routeIdx });
    };

    const renderSidebar = () => {
      return (
        settingStore.showSidebar && (
          <LayoutSideNav
            showLogo={settingStore.showSidebarLogo}
            layout={setting.value.layout}
            isFixed={setting.value.isSidebarFixed}
            menu={sideMenu.value}
            theme={settingStore.displayMode}
            isCompact={setting.value.isSidebarCompact}
          />
        )
      );
    };

    const renderHeader = () => {
      return (
        setting.value.showHeader && (
          <LayoutHeader
            showLogo={settingStore.showHeaderLogo}
            theme={settingStore.displayMode}
            layout={setting.value.layout}
            isFixed={setting.value.isHeaderFixed}
            menu={headerMenu.value}
            isCompact={setting.value.isSidebarCompact}
          />
        )
      );
    };

    const renderFooter = () => {
      return (
        <t-footer class={`${prefix}-footer-layout`}>
          <LayoutFooter />
        </t-footer>
      );
    };

    const renderContent = () => {
      const { setting } = settingStore;
      const { showBreadcrumb, showFooter, isUseTabsRouter } = setting;
      const tabRouters = tabsRouterStore.tabRouters.filter((route) => route.isAlive || route.isHome);
      return (
        // <t-layout class={[`${prefix}-layout`]} key={route.name}> 如果存在多个滚动列表之间切换时，页面不刷新导致的样式问题 请设置key 但会导致多标签tab页的缓存失效
        <t-layout class={[`${prefix}-layout`]}>
          {isUseTabsRouter && (
            <t-tabs
              theme="card"
              class={`${prefix}-layout-tabs-nav`}
              value={route.path}
              onChange={handleChangeCurrentTab}
              style={{ width: '100%', position: 'sticky', top: 0 }}
              onRemove={handleRemove}
            >
              {tabRouters.map((router: TRouterInfo, idx: number) => (
                <t-tab-panel
                  value={router.path}
                  key={`${router.path}_${idx}`}
                  v-slots={{
                    label: () => (
                      <t-dropdown
                        trigger="context-menu"
                        minColumnWidth={128}
                        popupProps={{ overlayClassName: 'router-tabs-dropdown' }}
                        v-slots={{
                          dropdown: () =>
                            router.path === route.path ? (
                              <t-dropdown-menu>
                                <t-dropdown-item onClick={() => handleRefresh(router.path, idx)}>
                                  <t-icon name="refresh" />
                                  刷新
                                </t-dropdown-item>
                                {idx > 1 && (
                                  <t-dropdown-item onClick={() => handleCloseAhead(router.path, idx)}>
                                    <t-icon name="arrow-left" />
                                    关闭左侧
                                  </t-dropdown-item>
                                )}
                                {idx < tabRouters.length - 1 && (
                                  <t-dropdown-item onClick={() => handleCloseBehind(router.path, idx)}>
                                    <t-icon name="arrow-right" />
                                    关闭右侧
                                  </t-dropdown-item>
                                )}
                                <t-dropdown-item onClick={() => handleCloseOther(router.path, idx)}>
                                  <t-icon name="close-circle" />
                                  关闭其它
                                </t-dropdown-item>
                              </t-dropdown-menu>
                            ) : null,
                        }}
                      >
                        {!router.isHome ? router.title : <t-icon name="home" />}
                      </t-dropdown>
                    ),
                  }}
                  removable={!router.isHome}
                />
              ))}
            </t-tabs>
          )}
          <t-content class={`${prefix}-content-layout`}>
            {showBreadcrumb && <LayoutBreadcrumb />}
            <LayoutContent>{slots.default?.()}</LayoutContent>
          </t-content>
          {showFooter && renderFooter()}
        </t-layout>
      );
    };

    return {
      setting,
      mainLayoutCls,
      renderSidebar,
      renderHeader,
      renderContent,
    };
  },
  render() {
    const { layout } = this.setting;
    const header = this.renderHeader();
    const sidebar = this.renderSidebar();
    const content = this.renderContent();
    return (
      <div>
        {layout === 'side' ? (
          <t-layout class={this.mainLayoutCls} key="side">
            <t-aside>{sidebar}</t-aside>
            <t-layout>{[header, content]}</t-layout>
          </t-layout>
        ) : (
          <t-layout key="no-side">
            {header}
            <t-layout class={this.mainLayoutCls}>{[sidebar, content]}</t-layout>
          </t-layout>
        )}
        <LayoutSetting />
      </div>
    );
  },
});
