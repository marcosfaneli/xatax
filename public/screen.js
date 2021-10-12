import Status from './status.js';

export default function Screen(renderer) {

  const screenPaused = () => {
    renderer.renderText({ x: (renderer.ctx.canvas.width / 2) - 210, y: renderer.ctx.canvas.height - 50, font: 'bold 72px Gluten', text: 'PAUSED', color: 'red' });
  };

  const screenGameOver = () => {
    renderer.renderText({ x: (renderer.ctx.canvas.width / 2) - 160, y: renderer.ctx.canvas.height - 50, font: 'bold 72px Gluten', text: 'GAME OVER', color: 'red' });
  };

  const renderScore = (hero) => {
    const ctx = renderer.ctx;

    const size = 200;
    const margin = 10;

    const x = ctx.canvas.width - (size + margin);

    let y = margin;
    ctx.fillStyle = '#571be3';
    ctx.strokeStyle = 'red';
    ctx.fillRect(x, margin, size, (size / 2));

    y = y * 3;
    ctx.fillStyle = '#a38ade';
    ctx.font = "bold 10px 'Noto Sans Mono'";
    ctx.fillText('Score', x + margin, y);

    y = y + 22;
    ctx.fillStyle = '#fff';
    ctx.font = "bold 24px 'Noto Sans Mono'";
    ctx.fillText(hero.getScore(), x + margin * 2, y);

    y = y + 20;
    ctx.fillStyle = '#a38ade';
    ctx.font = "bold 10px 'Noto Sans Mono'";
    ctx.fillText('Lifes', x + margin, y);

    y = y + 22;
    ctx.fillStyle = '#fff';
    ctx.font = "bold 24px 'Noto Sans Mono'";
    ctx.fillText(hero.getLifes(), x + margin * 2, y);
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
  };

  return { screenPaused, screenGameOver, render };
}