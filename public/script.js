import RenderObject from "./renderer.js";
import HeroObject from "./hero.js";
import EnemyObject from "./enemy.js";
import Status from "./status.js";
import Collision from "./collision.js";
import Screen from "./screen.js";
import LifeObject from "./life.js";
import { getRandomInt } from "./commons.js";

export default function engine(ctxObj) {

  let frames = 0;
  let status = Status.gameStarted;
  let time = 10;

  const MAX_ENEMIES = 10;

  let enemies = [];
  let shots = [];
  let lifes = [];

  const renderer = RenderObject(ctxObj);

  const loadScene = () => {
    for (let i = 0; i < MAX_ENEMIES; i++) {
      enemies.push(EnemyObject(renderer));
    }
  }

  const hero = HeroObject(renderer);
  const screen = Screen(renderer);

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
    enemies.filter(enemy => !enemy.isDead()).forEach(enemy => {
      if (collision.checkCollision(hero, enemy)) {
        hero.stroke(1);

        if (hero.isDead()) status = Status.gameOver;
        else enemy.kill();
      }
    });
  }

  const checkKill = () => {
    shots.map(shot => collision.checkKill(enemies, shot)).forEach(item => hero.addScore(item ? 1 : 0));
  }

  const checkCatchLife = () => {
    lifes.map(life => collision.checkCollision(hero, life)).forEach(item => {
      if (item) {
        lifes.splice(lifes.indexOf(item), 1);
        hero.addLife();
      }
    });
  }

  const updateLifes = () => {
    lifes = lifes.filter(life => !life.isOutOfScreen());

    if (frames === time) {
      lifes.push(LifeObject(renderer));
      time += getRandomInt(10, ctxObj.canvas.width * 20);
    }

    lifes.forEach(life => life.update());
  }

  const updateEnemies = () => {
    enemies = enemies.filter(enemy => !enemy.isOutOfScreen());
    // score += MAX_ENEMIES - filtered.length;

    while (enemies.length < MAX_ENEMIES) {
      enemies.push(EnemyObject(renderer));
    }

    enemies.forEach(enemy => enemy.update());
  }

  const updateShots = () => {
    const filtered = shots.filter(shot => !shot.isOutOfScreen() && !shot.isOff());
    shots = filtered;

    shots.forEach(shot => shot.update());
  }

  const run = () => {

    updateEnemies();
    updateShots();
    updateLifes();

    checkCollision();
    checkKill();
    checkCatchLife();

    render();

    if (status === Status.gameStarted) {
      window.requestAnimationFrame(run);
    }
  }

  const render = () => {
    ctxObj.clearRect(0, 0, ctxObj.canvas.width, ctxObj.canvas.height);

    frames++;

    renderSky();

    hero.render();

    enemies.forEach(enemy => enemy.render());
    shots.forEach(shot => shot.render());
    lifes.forEach(life => life.render());

    screen.render(status, hero);
  }

  return { onKeyDown, run };
}
