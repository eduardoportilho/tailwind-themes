import { useState } from "react";
import { applyTheme } from "./theme/applyTheme";
import baseTheme from "./theme/base-theme.json";
import { Button } from "./components/Button";

const BASE_THEME = JSON.stringify(baseTheme, null, 2);

function App() {
  const [theme, setTheme] = useState(BASE_THEME);

  const handleApply = () => applyTheme(theme);

  return (
    <div className="p-10">
      <div className="flex flex-col gap-2 mb-8">
        <label className="text-lg" htmlFor="theme">
          Theme definition:
        </label>

        <textarea
          id="theme"
          value={theme}
          rows={4}
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
          onChange={(e) => setTheme(e.target.value)}
        />
        <div className="flex gap-2">
          <Button color="primary" size="sm" onClick={handleApply}>
            Apply
          </Button>
          <Button
            color="secondary"
            size="sm"
            onClick={() => setTheme(BASE_THEME)}
          >
            Reset
          </Button>
        </div>
      </div>
      <div className="flex gap-2">
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
