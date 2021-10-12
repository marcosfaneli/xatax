import Status from './status.js';

export default function Screen(renderer) {

  const screenPaused = () => {
    renderer.renderText({ x: renderer.ctx.canvas.width / 2 - 30, y: renderer.ctx.canvas.height - 50, font: 'Arial', text: 'PAUSED', color: 'red' });
  };

  const screenGameOver = () => {
    renderer.renderText({ x: renderer.ctx.canvas.width / 2 - 30, y: renderer.ctx.canvas.height - 50, font: 'Arial', text: 'GAME OVER', color: 'red' });
  };

  const render = (status) => {
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
  };

  return { screenPaused, screenGameOver, render };
}