export default function BulletObject(x, y, renderer) {
  const final = renderer.ctx.canvas.width;

  const tag = 'bullet';
  const width = 3;
  const height = 3;
  const color = '#fff';
  const speed = 6;
  let off = false;

  const update = () => {
    x = x < final ? x + speed : final;
  }

  const isOutOfScreen = () => {
    return x >= final;
  }

  const render = () => {
    renderer.render({ x, y, width, height, color, tag });
  }

  const setOff = () => {
    off = true;
  }

  const isOff = () => {
    return off;
  }

  const getX = () => {
    return x;
  }

  const getY = () => {
    return y;
  }

  return { getX, getY, width, height, tag, update, setOff, isOff, render, isOutOfScreen };
};