import { randomColor, getRandomInt, uuidv4 } from "./commons.js";

export default function EnemyObject(renderer) {
  const initial = renderer.ctx.canvas.width;

  const id = uuidv4();
  const tag = 'enemy';
  let x = getRandomInt(initial, initial + (initial / 2));
  let y = getRandomInt(0, renderer.ctx.canvas.height);
  const width = getRandomInt(40, 60);
  const height = getRandomInt(40, 60);
  const color = randomColor();
  const speed = getRandomInt(1, 6);
  let dead = false;

  const update = () => {
    x = x < -width ? initial : x - speed;
  }

  const isOutOfScreen = () => {
    return x < -width;
  }

  const kill = () => {
    dead = true;
  }

  const isDead = () => {
    return dead;
  }

  const render = () => {
    if (dead) return;
    renderer.renderEnemy({ x, y, width, height, color });
  }

  const getX = () => {
    return x;
  }

  const getY = () => {
    return y;
  }

  return { getX, getY, width, height, id, color, tag, update, render, isOutOfScreen, kill, isDead };
};