export const applyTheme = (theme: string) => {
  const themeObj = JSON.parse(theme);
  Object.entries(themeObj).forEach(([key, value]) => {
    document.documentElement.style.setProperty(`--${key}`, value as string);
  });
};
