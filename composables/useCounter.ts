export const useCounter = () => {
  const count = useState('count', () => 0);

  let intervalTimerId;

  // 重置计时器
  function initCount() {
    count.value = 60;
    clearTimer();
    intervalTimerId = setInterval(() => {
      if (count.value <= 0) {
        clearTimer();
      } else {
        count.value -= 1;
      }
    }, 1000);
  }

  onUnmounted(() => {
    count.value = 0;
    clearTimer();
  });

  // 清理计时器
  function clearTimer() {
    if (intervalTimerId) {
      clearInterval(intervalTimerId);
      intervalTimerId = null;
    }
  }

  return { count, initCount };
};
