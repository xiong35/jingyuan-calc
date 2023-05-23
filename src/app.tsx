import "./app.css";

import Button from "preact-material-components/Button";
import "preact-material-components/Button/style.css";
import "preact-material-components/Theme/style.css";
// https://material.preactjs.com/component/button/
export function App() {
  return (
    <main>
      <h1>景元伤害计算器</h1>

      <form>
        <Button ripple raised>
          Flat button with ripple
        </Button>
        <Button ripple raised className="mdc-theme--primary-bg">
          Primary background button
        </Button>
        <Button href="/">This button will be rendered as an anchor</Button>
      </form>
    </main>
  );
}
