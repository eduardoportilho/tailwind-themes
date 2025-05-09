export const getTheme = () => {
  const baseVars = getStyleSheetsCssVariables()
    .filter(themeVarFilter)
    .map(varToPropMap);
  const overridenVars = getDocumentCssVariables()
    .filter(themeVarFilter)
    .map(varToPropMap);

  const theme = {
    ...reduceKeyValue(baseVars),
    ...reduceKeyValue(overridenVars),
  };

  return theme;
};

const themeVarFilter = (keyValue: { key: string; value: string }) =>
  keyValue.key.startsWith("--theme");

/**
 * { key: '--KEY', value }[] → { key: 'KEY', value }[]
 */
const varToPropMap = ({ key, value }: { key: string; value: string }) => ({
  key: key.startsWith("--") ? key.slice(2) : key,
  value,
});

/**
 * { key, value }[] → {key: value}
 */
const reduceKeyValue = (keyValue: { key: string; value: string }[]) =>
  keyValue.reduce((propMap, { key, value }) => {
    return {
      ...propMap,
      [key]: value,
    };
  }, {} as Record<string, string>);

const getDocumentCssVariables = () => {
  const cssVars = [];
  for (let index = 0; index < document.documentElement.style.length; index++) {
    const key = document.documentElement.style.item(index);
    const value = document.documentElement.style.getPropertyValue(key);
    cssVars.push({ key, value });
  }
  return cssVars;
};

const getStyleSheetsCssVariables = () =>
  Array.from(document.styleSheets)
    .filter((styleSheet) => {
      try {
        return styleSheet.cssRules;
      } catch (e) {
        console.warn(e);
      }
    })
    .map((styleSheet) => Array.from(styleSheet.cssRules))
    .flat()
    .filter(
      (cssRule) => isCSSStyleRule(cssRule) && cssRule.selectorText === ":root"
    )
    .map((cssRule) =>
      cssRule.cssText.split("{")[1].split("}")[0].trim().split(";")
    )
    .flat()
    .filter((text) => text !== "")
    .map((text) => text.split(":"))
    .map((parts) => ({ key: parts[0].trim(), value: parts[1].trim() }));

const isCSSStyleRule = (cssRule: CSSRule): cssRule is CSSStyleRule => {
  return typeof (cssRule as CSSStyleRule).selectorText === "string";
};
