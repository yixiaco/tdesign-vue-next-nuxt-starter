import { Ref } from 'vue';
import * as echarts from 'echarts/core';

/**
 * eChart hook
 * @param domId
 * @param chart
 */
export const useChart = (domId: string): Ref<echarts.ECharts> => {
  let chartContainer: HTMLCanvasElement;
  const selfChart = ref<echarts.ECharts | any>();
  const updateContainer = () => {
    // TODO resize 报错，响应式的问题，待处理
    selfChart.value.resize({
      width: chartContainer.clientWidth,
      height: chartContainer.clientHeight,
    });
  };

  onMounted(() => {
    if (!chartContainer && process.browser) {
      chartContainer = document.getElementById(domId) as HTMLCanvasElement;
    }
    selfChart.value = echarts.init(chartContainer);
  });

  if (process.browser) {
    window.addEventListener('resize', updateContainer, false);
  }

  onUnmounted(() => {
    if (process.browser) {
      window.removeEventListener('resize', updateContainer);
    }
  });

  return selfChart;
};
