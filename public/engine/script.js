import RenderObject from "./renderer.js";
import HeroObject from "./hero.js";
import EnemyObject from "./enemy.js";
import Status from "./status.js";
import Collision from "./collision.js";
import Screen from "./screen.js";
import LifeObject from "./life.js";
import { getRandomInt } from "./commons.js";
import Sky from "./sky.js";

export default function engine(ctxObj) {

  let frames = 0;
  let status = Status.gameStart;
  let time = 10;

  const MAX_ENEMIES = 10;

  let enemies = [];
  let shots = [];
  let lifes = [];

  const renderer = RenderObject(ctxObj);

  const hero = HeroObject(renderer);
  const screen = Screen(renderer);
  const sky = Sky(renderer);

  const collision = Collision();

  const loadScene = () => {
    for (let i = 0; i < MAX_ENEMIES; i++) {
      enemies.push(EnemyObject(renderer));
    }
  }

  const init = async () => {
    loadScene();
  }

  init();

  const onKeyUp = (e) => {
    screen.write(e.key);
  }

  const reset = () => {
    status = Status.gameStart;
    hero.reset();
    enemies = [];
    shots = [];
    lifes = [];
    time = 10;
    frames = 0;
  }

  const onKeyDown = (e) => {

    if (e.key === 'Enter') {

      if (status === Status.gameOver) {
        reset();
        screen.update();
        run();

        return;
      }

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
    ctxObj.clearRect(0, 0, ctxObj.canvas.width, ctxObj.canvas.height);

    switch (status) {
      case Status.gamePaused:
        console.log('game paused ' + frames);
        break;
      case Status.gameOver:
        console.log('game over ' + frames);
        break;
      case Status.gameStart:
        console.log('game start ' + frames);
        break;
      default:
        break;
    }

    frames++;

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

    sky.render();
    hero.render();

    enemies.forEach(enemy => enemy.render());
    shots.forEach(shot => shot.render());
    lifes.forEach(life => life.render());

    screen.render(status, hero);
  }

  return { onKeyDown, onKeyUp, run };
}
