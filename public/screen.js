import Status from './status.js';

export default function Screen(renderer) {

  const ctx = renderer.ctx;

  const screenPaused = () => {
    renderer.renderText({
      x: (renderer.ctx.canvas.width / 2) - 210,
      y: renderer.ctx.canvas.height - 150,
      font: "bold 72px 'Press Start 2P'",
      text: 'PAUSED', color: 'red'
    });
  };

  const screenGameOver = () => {
    renderer.renderText({ x: (renderer.ctx.canvas.width / 2) - 160, y: renderer.ctx.canvas.height - 50, font: "bold 72px 'Press Start 2P'", text: 'GAME OVER', color: 'red' });
  };

  const renderScore = (hero) => {

    const size = 200;
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
    ctx.fillStyle = '#fff';
    ctx.font = "bold 18px " + fontName;
    ctx.fillText(hero.getScore(), x + margin * 2, y);

    y = y + 20;
    ctx.fillStyle = '#a38ade';
    ctx.font = "bold 10px " + fontName;
    ctx.fillText('Lifes', x + margin, y);

    y = y + 23;
    ctx.fillStyle = '#fff';
    ctx.font = "bold 18px " + fontName;
    ctx.fillText(hero.getLifes(), x + margin * 2, y);
  }

  const renderLegend = () => {

    const size = 48;
    const margin = 10;
    let position = ctx.canvas.height - (size + margin);

    const fontName = "'Press Start 2P'"

    ctx.fillStyle = 'rgba(255,255,255,.5)';
    ctx.fillRect(margin, position, ctx.canvas.width - (margin * 2), size);

    ctx.fillStyle = '#000';
    ctx.font = "bold 12px " + fontName;
    ctx.fillText('Directions', margin * 2, position + (margin * 2));

    position += 36;

    ctx.fillStyle = '#000';
    ctx.font = " 10px " + fontName;
    ctx.fillText('Arrow left, Arrow right, Arrow down, Arrow up', margin + 26, position);

    position -= 26;

    ctx.fillStyle = '#000';
    ctx.font = "bold 12px " + fontName;
    ctx.fillText('Fire', margin + 520, position + margin);

    ctx.fillStyle = '#000';
    ctx.font = " 10px " + fontName;
    ctx.fillText('Space', 550, position + 26);

    ctx.fillStyle = '#000';
    ctx.font = "bold 12px " + fontName;
    ctx.fillText('Commands', margin + 650, position + margin);

    ctx.fillStyle = '#000';
    ctx.font = " 10px " + fontName;
    ctx.fillText('Enter - pause/resume', 680, position + 26);
  }

  const render = (status, hero) => {
    switch (status) {
      case Status.gamePaused:
        screenPaused();
        break;
      case Status.gameOver:
        screenGameOver();
        break;
      default:
        break;
    }

    renderScore(hero);
    renderLegend();
  };

  return { screenPaused, screenGameOver, render };
}