import { PropType } from 'vue';
import { storeToRefs } from 'pinia';
import TLogo from 'icon/assets-t-logo.svg?component';
import TLogoFull from 'icon/assets-logo-full.svg?component';
import { Menu as TMenu } from 'tdesign-vue-next';
import { prefix } from '~/config/global';
import pgk from '~/package.json';
import { getActive } from '~/utils/router';
import LayoutMenuContent from '~/components/layout/LayoutMenuContent';

const MIN_POINT = 992 - 1;

const useComputed = (props) => {
  const settingStore = useSettingStore();
  const { setting } = storeToRefs(settingStore);
  const collapsed = computed(() => setting.value.isSidebarCompact);

  const active = computed(() => getActive());

  const defaultExpanded = computed(() => {
    const path = getActive();
    const parentPath = path.substring(0, path.lastIndexOf('/'));
    return parentPath === '' ? [] : [parentPath];
  });

  const sideNavCls = computed(() => {
    const { isCompact } = props;
    return [
      `${prefix}-sidebar-layout`,
      {
        [`${prefix}-sidebar-compact`]: isCompact,
      },
    ];
  });

  const menuCls = computed(() => {
    const { showLogo, isFixed, layout } = props;
    return [
      `${prefix}-side-nav`,
      {
        [`${prefix}-side-nav-no-logo`]: !showLogo,
        [`${prefix}-side-nav-no-fixed`]: !isFixed,
        [`${prefix}-side-nav-mix-fixed`]: layout === 'mix' && isFixed,
      },
    ];
  });

  const layoutCls = computed(() => {
    const { layout } = props;
    return [`${prefix}-side-nav-${layout}`, `${prefix}-sidebar-layout`];
  });

  return {
    active,
    defaultExpanded,
    collapsed,
    sideNavCls,
    menuCls,
    layoutCls,
  };
};

export default defineComponent({
  name: 'SideNav',
  components: {
    LayoutMenuContent,
    TMenu,
  },
  props: {
    menu: {
      type: Array as PropType<string[]>,
      default: () => [],
    },
    showLogo: {
      type: Boolean as PropType<boolean>,
      default: true,
    },
    isFixed: {
      type: Boolean as PropType<boolean>,
      default: true,
    },
    layout: {
      type: String as PropType<string>,
      default: '',
    },
    headerHeight: {
      type: String as PropType<string>,
      default: '64px',
    },
    theme: {
      type: String as PropType<string>,
      default: 'light',
    },
    isCompact: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
  },
  setup(props) {
    const router = useRouter();
    const settingStore = useSettingStore();
    const { setting } = storeToRefs(settingStore);

    const changeCollapsed = () => {
      settingStore.updateConfig({
        isSidebarCompact: !setting.value.isSidebarCompact,
      });
    };

    const autoCollapsed = () => {
      const isCompact = window.innerWidth <= MIN_POINT;
      settingStore.updateConfig({
        isSidebarCompact: isCompact,
      });
    };

    onMounted(() => {
      autoCollapsed();
      window.onresize = () => {
        autoCollapsed();
      };
    });

    const goHome = () => {
      router.push('/dashboard/base');
    };

    return {
      prefix,
      ...useComputed(props),
      autoCollapsed,
      changeCollapsed,
      goHome,
    };
  },
  render() {
    // @ts-ignore
    const { version } = pgk;
    return (
      <div class={this.sideNavCls}>
        <t-menu
          class={this.menuCls}
          theme={this.theme}
          value={this.active}
          default-expanded={this.defaultExpanded}
          collapsed={this.collapsed}
          v-slots={{
            logo: () =>
              this.showLogo && (
                <span class={`${prefix}-side-nav-logo-wrapper`} onClick={this.goHome}>
                  {this.collapsed ? (
                    <TLogo class={`${prefix}-side-nav-logo-t-logo`} />
                  ) : (
                    <TLogoFull class={`${prefix}-side-nav-logo-tdesign-logo`} />
                  )}
                </span>
              ),
            operations: () => (
              <span class="version-container">
                {!this.collapsed && 'TDesign Starter'} {version}
              </span>
            ),
          }}
        >
          <LayoutMenuContent navData={this.menu} />
        </t-menu>
        <div class={`${prefix}-side-nav-placeholder${this.collapsed ? '-hidden' : ''}`}></div>
      </div>
    );
  },
});
