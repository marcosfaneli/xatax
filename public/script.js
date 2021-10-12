import renderObject from "./renderer.js";
import heroObject from "./hero.js";
import enemyObject from "./enemy.js";
import Status from "./status.js";
import Collision from "./collision.js";

export default function engine(ctxObj) {

  let status = Status.gameStarted;
  let score = 0;
  const MAX_ENEMIES = 10;

  let enemies = [];
  let shots = [];

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
      status = status === Status.gameStarted ? Status.gamePaused : Status.gameStarted;
      run();
    }

    if (status === Status.gameStarted) {
      hero.move(e.key);

      const shoot = hero.shoot(e.key);
      if (shoot) {
        shots.push(shoot);
      }
    }

    render();
  }

  const renderSky = () => {
    renderer.render({ x: 0, y: 0, width: ctxObj.canvas.width, height: ctxObj.canvas.height, color: '#bbf3f9' });
  }

  const checkCollision = () => {
    enemies.filter(enemy => !enemy.isDead()).map(enemy => collision.checkCollision(hero, enemy)).forEach(item => {
      if (item) {
        status = Status.gameOver;
      }
    });
  }

  const checkKill = () => {
    shots.map(shot => collision.checkKill(enemies, shot)).forEach(item => score += item ? 1 : 0);
  }

  const updateEnemies = () => {
    const filtered = enemies.filter(enemy => !enemy.isOutOfScreen());
    enemies = filtered;

    // score += MAX_ENEMIES - filtered.length;

    while (enemies.length < MAX_ENEMIES) {
      enemies.push(enemyObject(renderer));
    }

    enemies.forEach(enemy => enemy.update());
  }

  const updateShots = () => {
    const filtered = shots.filter(shot => !shot.isOutOfScreen());
    shots = filtered;

    shots.forEach(shot => shot.update());
  }

  const run = () => {

    updateEnemies();
    updateShots();

    checkCollision();
    checkKill();

    render();

    if (status === Status.gameStarted) {
      window.requestAnimationFrame(run);
    }
  }

  const renderScreenMessage = () => {
    if (status === Status.gamePaused) {
      renderer.renderText({ x: ctxObj.canvas.width / 2 - 30, y: ctxObj.canvas.height - 50, font: 'Arial', text: 'PAUSED', color: 'red' });
    } else if (status === Status.gameOver) {
      renderer.renderText({ x: ctxObj.canvas.width / 2 - 30, y: ctxObj.canvas.height - 50, font: 'Arial', text: 'GAME OVER', color: 'red' });
    }
  }

  const renderScore = () => {
    renderer.render({ x: ctxObj.canvas.width - 105, y: 5, width: 100, height: 30, color: 'blue' });
    renderer.renderText({ x: ctxObj.canvas.width - 99, y: 18, font: 'Arial', text: 'Score: ' + score, color: 'white' });
  }

  const render = () => {
    ctxObj.clearRect(0, 0, ctxObj.canvas.width, ctxObj.canvas.height);

    renderSky();

    hero.render();

    enemies.forEach(enemy => enemy.render());
    shots.forEach(shot => shot.render());

    renderScore();

    renderScreenMessage();
  }

  return { onKeyDown, run };
}
