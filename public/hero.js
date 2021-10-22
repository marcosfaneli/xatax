import BulletObject from "./bullet.js";

export default function HeroObject(renderer) {
  const tag = 'hero';
  let x = 50;
  let y = 50;
  const width = 10;
  const height = 10;
  const color = '#e3cf1b';
  const speed = 12;
  let lifes = 3;
  let score = 0;

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
  }

  const stroke = (value) => {
    console.log('stroke');
    lifes -= value;
  }

  const isDead = () => {
    return lifes <= 0;
  }

  const addScore = (value) => {
    score += value;
  }

  const getScore = () => {
    return score;
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

  return { getX, getY, width, height, tag, move, render, shoot, addLife, isDead, getLifes, addScore, stroke, getScore };
};