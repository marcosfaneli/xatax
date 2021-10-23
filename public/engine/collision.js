export default function Collision() {

  const checkCollision = (hero, enemy) => {
    if (hero.getX() < enemy.getX() + enemy.width &&
      hero.getX() + hero.width > enemy.getX() &&
      hero.getY() < enemy.getY() + enemy.height &&
      hero.height + hero.getY() > enemy.getY()) {
      // console.log('collision', hero.tag, enemy.tag);
      return true;
    }
    return false;
  }

  const checkKill = (enemies, shot) => {
    for (let i = 0; i < enemies.length; i++) {
      const enemy = enemies[i];
      if (enemy.isDead()) continue;

      if (checkCollision(enemy, shot)) {
        enemy.kill();
        shot.setOff();
        return true;
      }
    }
    return false;
  }

  return { checkCollision, checkKill };
}