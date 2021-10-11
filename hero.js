export default function heroObject(renderer) {
  const tag = 'hero';
  let x = 20;
  let y = 10;
  const width = 10;
  const height = 10;
  const color = 'green';
  const speed = 8;

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

  const render = () => {
    renderer.render({ x, y, width, height, color, tag });
  }

  const move = (direction) => {
    if (direction in directions) {
      directions[direction]();
    }
  }

  const getX = () => {
    return x;
  }

  const getY = () => {
    return y;
  }

  return { getX, getY, width, height, color, move, render };
};