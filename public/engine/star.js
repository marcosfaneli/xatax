import { getRandomInt } from "./commons.js";

export default function StarObject(renderer, startInitial) {
  const initial = startInitial ? startInitial : renderer.ctx.canvas.width;

  const tag = 'star';
  let x = getRandomInt(initial, initial * 2);
  let y = getRandomInt(0, renderer.ctx.canvas.height);
  const width = getRandomInt(1, 4);
  const height = width;
  const color = '#fff';
  const speed = 1;

  const update = () => {
    x = x < -width ? initial : x - speed;
  }

  const isOutOfScreen = () => {
    return x < -width;
  }

  const render = () => {
    console.log(`rendering star`);
    renderer.render({ x, y, width, height, color, tag, opacity: 95 });
  }

  const getX = () => {
    return x;
  }

  const getY = () => {
    return y;
  }

  return { getX, getY, width, height, tag, update, render, isOutOfScreen };
};