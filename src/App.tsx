import { useState } from "react";
import { applyTheme } from "./theme/applyTheme";
import baseTheme from "./theme/theme-base.json";
import sassyTheme from "./theme/theme-sassy.json";
import { Button } from "./components/Button";
import { Select } from "./components/Select";
import { getTheme } from "./theme/getTheme";

const THEMES = {
  base: JSON.stringify(baseTheme, null, 2),
  sassy: JSON.stringify(sassyTheme, null, 2),
};

function App() {
  const [theme, setTheme] = useState(THEMES.base);

  const handleThemeSelected: React.ChangeEventHandler<HTMLSelectElement> = (
    e
  ) => {
    const selectedKey = e.target.value as keyof typeof THEMES;
    const newTheme = THEMES[selectedKey] ?? "";
    setTheme(newTheme);
  };

  const handleReset = () => {
    setTheme(THEMES.base);
    applyTheme(THEMES.base);
  };

  const handleApply = () => applyTheme(theme);

  const handleReadTheme = () => {
    const currentThemeObj = getTheme();
    const currentTheme = JSON.stringify(currentThemeObj, null, 2);
    setTheme(currentTheme);
    console.log(`> Current theme:`, currentTheme);
  };

  return (
    <div className="p-10">
      <div className="flex flex-col gap-2 mb-8 w-150 items-start">
        <Select
          label="Theme definition:"
          options={[
            { label: "Base", value: "base" },
            { label: "Sassy", value: "sassy" },
          ]}
          onChange={handleThemeSelected}
        />

        <textarea
          id="theme"
          value={theme}
          rows={8}
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
          onChange={(e) => setTheme(e.target.value)}
        />
        <div className="flex gap-2">
          <Button color="primary" size="sm" onClick={handleApply}>
            Apply
          </Button>
          <Button color="secondary" size="sm" onClick={handleReset}>
            Reset
          </Button>
          <Button color="secondary" size="sm" onClick={handleReadTheme}>
            Read current theme
          </Button>
        </div>
      </div>
      <div className="flex gap-2 bg-special w-100 p-8 justify-center">
        <Button color="primary" size="lg">
          Primary
        </Button>
        <Button color="secondary" size="lg">
          Secondary
        </Button>
      </div>
    </div>
  );
}

export default App;
