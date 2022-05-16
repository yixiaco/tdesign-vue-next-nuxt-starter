import { useDark, useToggle } from '@vueuse/core';

export const useTheme = () => {
    const isDark = useDark({
        selector: 'html',
        attribute: 'theme-mode',
        valueDark: 'dark',
        valueLight: 'light',
    })

    const useToggleDark = useToggle(isDark);

    return {
        isDark,
        useToggleDark
    }
}
