import React, {useState, ChangeEvent} from "react";
import Sketch from "react-p5";
import p5Types from "p5";

const width = 800;
const height = 800;

const defaultState = {
  size: 40,
};

let circles: any[] = [];

function interSectsWithAnyCircle(x: number, y: number, diameter: number) {
  for (let circle of circles) {
    let distance = Math.sqrt((x - circle.x) ** 2 + (y - circle.y) ** 2);
    if ((diameter + circle.diameter) / 2 > distance) {
      return true;
    }
  }
  return false;
}

export const Example = () => {
  const [state, setState] = useState(defaultState);

  const setNumberValue =
    (key: string) => (event: ChangeEvent<HTMLInputElement>) =>
      setState({...state, [key]: parseInt(event.target.value, 10)});

  const setup = (p5: p5Types, canvasParentRef: Element) => {
    p5.createCanvas(width, height).parent(canvasParentRef);
    p5.rect(0, 0, width, height); // Create canvas border
    p5.colorMode(p5.HSB, 360, 100, 100);
  };

  const draw = (p5: p5Types) => {
    p5.noStroke();

    for (let i = 0; i < 100; i++) {
      let x = Math.random() * width;
      let y = Math.random() * height;
      let diameter = Math.sqrt(Math.random() * 999000 / (p5.frameCount + 1));

      if (!interSectsWithAnyCircle(x, y, diameter)) {
        circles.push({x, y, diameter});
        let h = i * 20;
        let s = p5.random(20, 80);
        let brightness = p5.random(80, 100)
        p5.fill(h, s, brightness);

        p5.circle(x, y, diameter);
      }
    }
  };

  return (
    <div className="canvas-container">
      <Sketch setup={setup} draw={draw}/>

      <div className="input-panel">
        <p>Circle size</p>
        <input
          type="range"
          defaultValue={state.size}
          min={1}
          max={100}
          step="1"
          onChange={setNumberValue("size")}
        />
      </div>
    </div>
  );
};
