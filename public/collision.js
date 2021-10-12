export default function Collision() {

  const checkCollision = (hero, enemy) => {
    if (hero.getX() < enemy.getX() + enemy.width &&
      hero.getX() + hero.width > enemy.getX() &&
      hero.getY() < enemy.getY() + enemy.height &&
      hero.height + hero.getY() > enemy.getY()) {
      console.log('collision', hero.tag, enemy.tag);
      return true;
    }
    return false;
  }

  const checkKill = (enemies, shot) => {
    for (let i = 0; i < enemies.length; i++) {
      if (checkCollision(enemies[i], shot)) {
        enemies[i].kill();
        return true;
      }
    }
    return false;
  }

  return { checkCollision, checkKill };
}