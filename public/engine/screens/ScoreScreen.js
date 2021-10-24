export default function ScoreScreen(ctx) {

  const render = (hero) => {

    const size = 250;
    const margin = 10;

    const fontName = "'Press Start 2P'"

    const x = ctx.canvas.width - (size + margin);

    let y = margin;
    ctx.fillStyle = '#571be3';
    ctx.strokeStyle = 'red';
    ctx.fillRect(x, margin, size, 95);

    y = y * 3;
    ctx.fillStyle = '#a38ade';
    ctx.font = "bold 10px " + fontName;
    ctx.fillText('Score', x + margin, y);

    y = y + 22;
    ctx.fillStyle = '#feca12';
    ctx.font = "bold 18px " + fontName;
    ctx.fillText(hero.getScore(), x + margin * 2, y);

    y = y + 20;
    ctx.fillStyle = '#a38ade';
    ctx.font = "bold 10px " + fontName;
    ctx.fillText('Lifes', x + margin, y);

    y = y + 23;
    ctx.fillStyle = '#fe1612';
    ctx.font = "bold 18px " + fontName;
    ctx.fillText(hero.getLifes(), x + margin * 2, y);
  }

  return {
    render
  }
}
