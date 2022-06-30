import { defineStore } from 'pinia';
import { COLOR_TOKEN, LIGHT_CHART_COLORS, DARK_CHART_COLORS, TColorSeries } from '~/config/color';
import STYLE_CONFIG from '~/config/style';

const state = {
  ...STYLE_CONFIG,
  showSettingPanel: false,
  colorList: COLOR_TOKEN,
  chartColors: LIGHT_CHART_COLORS,
};

export type TState = typeof state;

export const useSettingStore = defineStore('setting', () => {
  const setting = ref<TState>(state);

  // 方法
  function changeMode(mode: 'dark' | 'light' | 'auto') {
    let theme = mode;

    if (mode === 'auto') {
      const media = window.matchMedia('(prefers-color-scheme:dark)');
      if (media.matches) {
        theme = 'dark';
      } else {
        theme = 'light';
      }
    }
    const isDarkMode = theme === 'dark';

    if (process.browser) {
      document.documentElement.setAttribute('theme-mode', isDarkMode ? 'dark' : '');
    }

    setting.value.chartColors = isDarkMode ? DARK_CHART_COLORS : LIGHT_CHART_COLORS;
  }

  function changeBrandTheme(brandTheme: string) {
    if (process.browser) {
      document.documentElement.setAttribute('theme-color', brandTheme);
    }
  }

  function addColor(payload: TColorSeries) {
    setting.value.colorList = { ...setting.value.colorList, ...payload };
  }

  function updateConfig(payload: Partial<TState>) {
    for (const key in payload) {
      if (payload[key] !== undefined) {
        setting.value[key] = payload[key];
      }
      if (key === 'mode') {
        // @ts-ignore
        changeMode(payload[key]);
      }
      if (key === 'brandTheme') {
        changeBrandTheme(payload[key]);
      }
    }
  }

  const showSidebar = computed(() => setting.value.layout !== 'top');
  const showSidebarLogo = computed(() => setting.value.layout === 'side');
  const showHeaderLogo = computed(() => setting.value.layout !== 'side');
  const displayMode = computed(() => {
    if (setting.value.mode === 'auto') {
      const media = window.matchMedia('(prefers-color-scheme:dark)');
      if (media.matches) {
        return 'dark';
      }
      return 'light';
    }
    return setting.value.mode;
  });
  return {
    setting,
    showSidebar,
    showSidebarLogo,
    showHeaderLogo,
    displayMode,
    changeMode,
    changeBrandTheme,
    addColor,
    updateConfig,
  };
});
