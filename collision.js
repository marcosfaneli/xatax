export default function Collision() {

  const checkCollision = (hero, enemy) => {
    if (hero.getX() < enemy.getX() + enemy.width &&
      hero.getX() + hero.width > enemy.getX() &&
      hero.getY() < enemy.getY() + enemy.height &&
      hero.height + hero.getY() > enemy.getY()) {
      console.log('collision');
      return true;
    }
    return false;
  }

  return { checkCollision };
}