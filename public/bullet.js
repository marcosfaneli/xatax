export default function BulletObject(x, y, renderer) {
  const final = renderer.ctx.canvas.width;

  const tag = 'bullet';
  const width = 3;
  const height = 3;
  const color = '#000';
  const speed = 6;

  const update = () => {
    x = x < final ? x + speed : final;
  }

  const isOutOfScreen = () => {
    return x >= final;
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

  return { getX, getY, width, height, tag, update, render, isOutOfScreen };
};