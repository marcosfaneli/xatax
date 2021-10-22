import StarObject from "./star.js";
import { getRandomInt } from "./commons.js";

export default function Sky(renderer) {

  const ctx = renderer.ctx;
  let stars = [];
  const MAX_STARS = 100;

  const createSpace = () => {
    const initial = getRandomInt(30, 90);
    for (let i = 0; i < MAX_STARS; i++) {
      stars.push(new StarObject(renderer, getRandomInt(10, ctx.canvas.width)));
    }
  };

  createSpace();

  const update = () => {
    stars = stars.filter(star => !star.isOutOfScreen());

    for (let i = 0; stars.length < MAX_STARS; i++) {
      stars.push(StarObject(renderer));
    }

    stars.forEach(star => star.update());
  }

  const render = () => {
    update();

    const grd = ctx.createLinearGradient(0, 0, 0, ctx.canvas.height);

    grd.addColorStop(0, "black");
    grd.addColorStop(1, "blue");

    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    stars.forEach(star => star.render());
  }

  return { render, update };
}

