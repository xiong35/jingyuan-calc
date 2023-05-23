import { baseConfig } from "../app";

import Button from "preact-material-components/Button";
import "preact-material-components/Button/style.css";
import "preact-material-components/Theme/style.css";
import { useEffect, useMemo, useRef, useState } from "preact/hooks";
import { Game } from "../game/base/Game";
import { Ting } from "../game/Ting";
import { Rounder } from "../game/Rounder";
import { Shen } from "../game/Shen";
import { Jing } from "../game/Jing";

export function Battle({ config }: { config: typeof baseConfig }) {
  const [_, setFlag] = useState(0);
  const hintContainer = useRef<HTMLDivElement>(null);

  function refreshUI() {
    setFlag(Math.random());
    requestAnimationFrame(
      () => (hintContainer.current!.scrollTop = 999999999999)
    );
  }
  useEffect(() => {
    Game.refreshUI = refreshUI;
  }, []);

  const game = useMemo(() => {
    console.log(config);
    const ting = new Ting(
      0,
      0,
      config.ting.chargeNeed,
      config.ting.chargeRate / 100,
      config.ting.speed
    );
    const jing = new Jing(
      config.jing.atkBasic,
      config.jing.atkBonus,
      config.jing.chargeNeed,
      config.jing.chargeRate / 100,
      config.jing.speed
    );
    const rounder = new Rounder();
    const shen = new Shen(jing);

    const game = new Game([ting, jing, rounder, shen]);

    return game;
  }, []);

  return (
    <div>
      <div className="fc" style={{ gap: "1rem", margin: "1rem" }}>
        <Button onClick={() => game.tick()} secondary raised>
          运行1步
        </Button>
        <Button onClick={() => game.tick5Turns()} secondary raised>
          运行5回合
        </Button>
      </div>

      <div ref={hintContainer} className="hints">
        {game.hints.map((h) => (
          <p style={h.style}>{h.content}</p>
        ))}
      </div>

      <h2>总伤害：{game.totalDmg}</h2>
    </div>
  );
}
