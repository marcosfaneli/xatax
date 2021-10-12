import { getRandomInt } from "./commons.js";

export default function LifeObject(renderer) {
  const initial = renderer.ctx.canvas.width;

  let x = getRandomInt(initial, initial + (initial / 2));
  let y = getRandomInt(0, renderer.ctx.canvas.height);
  const tag = 'life';
  const width = 6;
  const height = 6;
  const color = '#fff';
  const speed = 1;

  const update = () => {
    x = x < -width ? initial : x - speed;
  }

  const isOutOfScreen = () => {
    return x < -width;
  }

  const render = () => {
    renderer.renderLife({ x, y, width, height, color, tag });
  }

  const getX = () => {
    return x;
  }

  const getY = () => {
    return y;
  }

  return { getX, getY, width, height, tag, update, render, isOutOfScreen };
};