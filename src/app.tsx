import "./app.css";

import Button from "preact-material-components/Button";
import "preact-material-components/Button/style.css";
import "preact-material-components/Theme/style.css";
import Checkbox from "preact-material-components/Checkbox";
import "preact-material-components/Checkbox/style.css";
import { useState } from "preact/hooks";
import { Battle } from "./components/Battle";

export const baseConfig = {
  jing: {
    atkBasic: 1022,
    atkBonus: 759,
    speed: 99 + 27,
    chargeRate: 100,
    chargeNeed: 130,
  },
  ting: {
    speed: 112 + 24,
    chargeRate: 117.9,
    chargeNeed: 130,
  },
  hasTing: true,
  ting1Hun: true,
};

// https://material.preactjs.com/component/button/
export function App() {
  const [config, _setConfig] = useState(baseConfig);

  function setConfig(
    character: "jing" | "ting" | null,
    key: string,
    value: any,
    isNum = true
  ) {
    if (isNum) {
      value = Number(value);
    }
    const newConfig = JSON.parse(JSON.stringify(config));

    if (character) {
      newConfig[character][key] = value;
    } else {
      newConfig[key] = value;
    }
    _setConfig(newConfig);
    resetBattle();
  }

  const [key, setKey] = useState(0);
  function resetBattle() {
    setKey(Math.floor(Math.random() * 1000));
  }

  return (
    <main>
      <h1>景元伤害计算器</h1>
      <a href="https://github.com/xiong35/jingyuan-calc">
        https://github.com/xiong35/jingyuan-calc
      </a>

      <table>
        <colgroup>
          <col span={1} style={{ width: "50%" }} />
          <col span={1} style={{ width: "25%" }} />
          <col span={1} style={{ width: "25%" }} />
        </colgroup>

        <tbody>
          <tr>
            <th>属性/角色</th>
            <th>景元</th>
            <th>
              <div
                className="fc"
                style={{ opacity: config.hasTing ? undefined : 0.5 }}
              >
                停云
                <Checkbox
                  checked={config.hasTing}
                  onClick={() =>
                    setConfig(null, "hasTing", !config.hasTing, false)
                  }
                />
              </div>
            </th>
          </tr>

          <tr>
            <td>攻击白字</td>
            <td>
              <input
                type="number"
                value={config.jing.atkBasic}
                onChange={(e) =>
                  setConfig(
                    "jing",
                    "atkBasic",
                    (e.target as HTMLInputElement).value
                  )
                }
              />
            </td>
            <td>/</td>
          </tr>

          <tr>
            <td>攻击绿字</td>
            <td>
              <input
                type="number"
                value={config.jing.atkBonus}
                onChange={(e) => {
                  setConfig(
                    "jing",
                    "atkBonus",
                    (e.target as HTMLInputElement).value
                  );
                }}
              />
            </td>
            <td>/</td>
          </tr>

          <tr>
            <td>充能效率</td>
            <td>
              <input
                type="number"
                value={config.jing.chargeRate}
                onChange={(e) =>
                  setConfig(
                    "jing",
                    "chargeRate",
                    (e.target as HTMLInputElement).value
                  )
                }
              />
            </td>
            <td>
              <input
                disabled={!config.hasTing}
                type="number"
                value={config.ting.chargeRate}
                onChange={(e) =>
                  setConfig(
                    "ting",
                    "chargeRate",
                    (e.target as HTMLInputElement).value
                  )
                }
              />
            </td>
          </tr>

          <tr>
            <td>速度</td>
            <td>
              <input
                type="number"
                value={config.jing.speed}
                onChange={(e) =>
                  setConfig(
                    "jing",
                    "speed",
                    (e.target as HTMLInputElement).value
                  )
                }
              />
            </td>
            <td>
              <input
                disabled={!config.hasTing}
                type="number"
                value={config.ting.speed}
                onChange={(e) =>
                  setConfig(
                    "ting",
                    "speed",
                    (e.target as HTMLInputElement).value
                  )
                }
              />
            </td>
          </tr>

          <tr>
            <td>停云 1 魂</td>
            <td>/</td>
            <td>
              <Checkbox
                disabled={!config.hasTing}
                checked={config.ting1Hun}
                onClick={() =>
                  setConfig(null, "ting1Hun", !config.ting1Hun, false)
                }
              />
            </td>
          </tr>
        </tbody>
      </table>

      <Button
        onClick={() => resetBattle()}
        style={{ marginTop: "1rem" }}
        raised
      >
        开始计算
      </Button>

      <Battle key={key} config={config}></Battle>
    </main>
  );
}
