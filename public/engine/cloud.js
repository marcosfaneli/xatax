import { getRandomInt } from "./commons.js";
import Sprite from "./sprite.js";

export default function Cloud(renderer) {

  const x = renderer.ctx.canvas.width + (getRandomInt(0, 100) * 10);
  const y = getRandomInt(0, renderer.ctx.canvas.height);

  const draw = () => {
    const image = openImage('./assets/cloud.jpg');

    x -= 1;

    const sprite = Sprite(image, 30, 20, 250, 150);
    ctx.drawImage(sprite.image, sprite.x, sprite.y, sprite.width, sprite.height, x, y, sprite.width, sprite.height);
  };

  return {
    draw,
  };
}