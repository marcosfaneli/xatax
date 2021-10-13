import Status from './status.js';

export default function Screen(renderer) {

  const screenPaused = () => {
    renderer.renderText({ x: (renderer.ctx.canvas.width / 2) - 210, y: renderer.ctx.canvas.height - 50, font: "bold 72px 'Press Start 2P'", text: 'PAUSED', color: 'red' });
  };

  const screenGameOver = () => {
    renderer.renderText({ x: (renderer.ctx.canvas.width / 2) - 160, y: renderer.ctx.canvas.height - 50, font: "bold 72px 'Press Start 2P'", text: 'GAME OVER', color: 'red' });
  };

  const renderScore = (hero) => {
    const ctx = renderer.ctx;

    const size = 200;
    const margin = 10;

    const fontName = "'Press Start 2P'"

    const x = ctx.canvas.width - (size + margin);

    let y = margin;
    ctx.fillStyle = '#571be3';
    ctx.strokeStyle = 'red';
    ctx.fillRect(x, margin, size, (size / 2));

    y = y * 3;
    ctx.fillStyle = '#a38ade';
    ctx.font = "bold 10px " + fontName;
    ctx.fillText('Score', x + margin, y);

    y = y + 22;
    ctx.fillStyle = '#fff';
    ctx.font = "bold 24px " + fontName;
    ctx.fillText(hero.getScore(), x + margin * 2, y);

    y = y + 20;
    ctx.fillStyle = '#a38ade';
    ctx.font = "bold 10px " + fontName;
    ctx.fillText('Lifes', x + margin, y);

    y = y + 22;
    ctx.fillStyle = '#fff';
    ctx.font = "bold 24px " + fontName;
    ctx.fillText(hero.getLifes(), x + margin * 2, y);
  }

  const renderLegend = () => {
    const ctx = renderer.ctx;

    const size = 100;
    const margin = 10;
    const position = ctx.canvas.height - (size + margin);

    ctx.fillStyle = 'rgba(255,255,255,.5)';
    ctx.fillRect(margin, position, ctx.canvas.width - (margin * 2), size);

    ctx.fillStyle = '#000';
    ctx.font = "bold 16px " + fontName;
    ctx.fillText('Directions', position + margin, margin * 2);

    ctx.fillStyle = '#000';
    ctx.font = "bold 14px " + fontName;
    ctx.fillText('Arrow left, Arrow right, Arrow down, Arrow up', position + 16, margin * 3);

    ctx.fillStyle = '#000';
    ctx.font = "bold 16px " + fontName;
    ctx.fillText('Fire', position + margin, margin + 100);

    ctx.fillStyle = '#000';
    ctx.font = "bold 14px " + fontName;
    ctx.fillText('Space', position + 16, 100 + (margin * 3));

    ctx.fillStyle = '#000';
    ctx.font = "bold 16px " + fontName;
    ctx.fillText('Commands', position + margin, margin + 150);

    ctx.fillStyle = '#000';
    ctx.font = "bold 14px " + fontName;
    ctx.fillText('Enter - pause/resume', position + 16, 150 + (margin * 3));
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