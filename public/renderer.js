import Cloud from './cloud.js';

export default function RenderObject(ctx) {

  const renderImage = (sprite, x, y) => {
    ctx.drawImage(sprite.image, sprite.x, sprite.y, sprite.width, sprite.height, x, y, sprite.width, sprite.height);
  };

  const renderText = (content) => {
    ctx.fillStyle = content.color;
    ctx.font = content.font;
    ctx.fillText(content.text, content.x, content.y);
  }

  const renderHero = (hero) => {
    ctx.beginPath();
    ctx.arc(hero.x, hero.y, hero.width, 0, 2 * Math.PI);
    ctx.fillStyle = hero.color;
    ctx.fill();
    ctx.lineWidth = 1;
    ctx.strokeStyle = '#003399';
    ctx.stroke();
  };

  const renderBullet = (bullet) => {
    ctx.beginPath();
    ctx.arc(bullet.x, bullet.y, bullet.width, 0, 2 * Math.PI);
    ctx.fillStyle = bullet.color;
    ctx.fill();
    ctx.lineWidth = 1;
    ctx.strokeStyle = '#003399';
    ctx.stroke();
  };

  const render = (object) => {
    const { x, y, width, height, color, tag } = object;
    // console.log(object);
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height);
  }

  return { render, renderImage, renderText, renderHero, renderBullet, ctx };
}