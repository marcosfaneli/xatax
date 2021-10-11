import renderObject from "./renderer.js";
import heroObject from "./hero.js";
import enemyObject from "./enemy.js";
import Status from "./status.js";
import Collision from "./collision.js";
import Cloud from "./cloud.js";
import { getRandomInt } from "./commons.js";

export default function engine(ctxObj) {

  let status = Status.gameStarted;
  let score = 0;
  const MAX_ENEMIES = 10;

  let enemies = [];

  const renderer = renderObject(ctxObj);

  const loadScene = () => {
    for (let i = 0; i < MAX_ENEMIES; i++) {
      enemies.push(enemyObject(renderer));
    }
  }
  const hero = heroObject(renderer);
  const collision = Collision();

  loadScene();

  const onKeyDown = (e) => {

    if (e.key === 'Enter') {
      status = 0;
    }

    hero.move(e.key);
    render();
  }

  const renderSky = () => {
    renderer.render({ x: 0, y: 0, width: ctxObj.canvas.width, height: ctxObj.canvas.height, color: '#bbf3f9' });
  }

  const checkCollision = () => {
    enemies.map(enemy => collision.checkCollision(hero, enemy)).forEach(item => {
      if (item) {
        status = Status.gameOver;
      }
    });
  }

  const update = () => {
    const filtered = enemies.filter(enemy => !enemy.isOutOfScreen());
    enemies = filtered;

    score += MAX_ENEMIES - filtered.length;

    while (enemies.length < MAX_ENEMIES) {
      enemies.push(enemyObject(renderer));
    }
    enemies.forEach(enemy => enemy.update());
  }

  const run = () => {
    ctxObj.clearRect(0, 0, ctxObj.canvas.width, ctxObj.canvas.height);

    update();

    checkCollision();

    if (status !== Status.gameOver) {
      window.requestAnimationFrame(run);
    }

    render();
  }

  const renderScore = () => {
    renderer.render({ x: ctxObj.canvas.width - 105, y: 5, width: 100, height: 30, color: 'blue' });
    renderer.renderText({ x: ctxObj.canvas.width - 99, y: 18, font: 'Arial', text: 'Score: ' + score, color: 'white' });
  }

  const render = () => {
    renderSky();

    hero.render();
    enemies.forEach(enemy => enemy.render());

    renderScore();
  }

  return { onKeyDown, run };
}
