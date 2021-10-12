import BulletObject from "./bullet.js";

export default function HeroObject(renderer) {
  const tag = 'hero';
  let x = 20;
  let y = 10;
  const width = 10;
  const height = 10;
  const color = '#e3cf1b';
  const speed = 8;
  let lifes = 3;

  const directions = {
    'ArrowUp': () => {
      y -= speed;
    },
    'ArrowDown': () => {
      y += speed;
    },
    'ArrowLeft': () => {
      x -= speed;
    },
    'ArrowRight': () => {
      x += speed;
    }
  }

  const addLife = () => {
    lifes++;
    console.log(lifes);
  }

  const render = () => {
    renderer.renderHero({ tag, x, y, width, height, color });
  }

  const move = (direction) => {
    if (direction in directions) {
      directions[direction]();
    }
  }

  const shoot = (key) => {
    if (key === ' ') {
      return BulletObject(x, y, renderer);
    }
  }

  const getX = () => {
    return x;
  }

  const getY = () => {
    return y;
  }

  const getLifes = () => {
    return lifes;
  }

  return { getX, getY, width, height, tag, move, render, shoot, addLife, getLifes };
};