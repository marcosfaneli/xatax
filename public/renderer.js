import Cloud from './cloud.js';

export default function renderObject(ctx) {

  const renderImage = (sprite, x, y) => {
    ctx.drawImage(sprite.image, sprite.x, sprite.y, sprite.width, sprite.height, x, y, sprite.width, sprite.height);
  };

  const renderText = (content) => {
    ctx.fillStyle = content.color;
    ctx.font = content.font;
    ctx.fillText(content.text, content.x, content.y);
  }

  const render = (object) => {
    const { x, y, width, height, color, tag } = object;
    // console.log(object);
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height);
  }

  return { render, renderImage, renderText, ctx };
}