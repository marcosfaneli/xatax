import { randomColor, getRandomInt } from "./commons.js";

export default function enemyObject(renderer) {
  const initial = renderer.ctx.canvas.width;

  const tag = 'enemy';
  let x = getRandomInt(initial, initial + (initial / 2));
  let y = getRandomInt(0, renderer.ctx.canvas.height);
  const width = getRandomInt(10, 30);
  const height = getRandomInt(10, 30);
  const color = randomColor();
  const speed = getRandomInt(1, 3);

  const update = () => {
    x = x < -width ? initial : x - speed;
  }

  const isOutOfScreen = () => {
    return x < -width;
  }

  const render = () => {
    renderer.render({ x, y, width, height, color, tag });
  }

  const getX = () => {
    return x;
  }

  const getY = () => {
    return y;
  }

  return { getX, getY, width, height, color, update, render, isOutOfScreen };
};