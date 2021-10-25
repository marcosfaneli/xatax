import LegendScreen from './screens/LegendScreen.js';
import ScoreScreen from './screens/ScoreScreen.js';
import TopPlayersScreen from './screens/TopPlayersScreen.js';
import Status from './status.js';

export default function Screen(renderer) {

  const ctx = renderer.ctx;

  let message = '';

  const legendScreen = LegendScreen(ctx);
  const scoreScreen = ScoreScreen(ctx);
  const topPlayersScreen = TopPlayersScreen(ctx);

  const update = (key) => {
    if (key === 'Backspace') {
      message = message.slice(0, -1);
    } else if (key !== 'Shift' && key !== 'Control' && key !== 'Alt' && key !== 'Meta') {
      message += key;
    }
  };

  const screenPaused = () => {
    renderer.renderText({
      x: (ctx.canvas.width / 2) - 210,
      y: ctx.canvas.height - 150,
      font: "bold 72px 'Press Start 2P'",
      text: 'PAUSED', color: 'red'
    });
  };

  const screenGameOver = () => {
    renderer.renderText({
      x: (ctx.canvas.width / 2) - 330,
      y: ctx.canvas.height - 150,
      font: "bold 72px 'Press Start 2P'",
      text: 'GAME OVER',
      color: 'red'
    });
  };

  const startScreen = () => {

    const size = 360
    const height = 150;

    ctx.fillStyle = '#fff';
    ctx.fillRect(
      (ctx.canvas.width / 2) - (size / 2),
      (ctx.canvas.height / 2) - (height / 2),
      size,
      height
    );

    renderer.renderText({
      x: (ctx.canvas.width / 2) - 170,
      y: (ctx.canvas.height / 2) - 45,
      font: "bold 22px 'Press Start 2P'",
      text: 'Input your name',
      color: 'red'
    });
  };

  const render = (status, hero, players) => {
    switch (status) {
      case Status.gamePaused:
        screenPaused();
        break;
      case Status.gameOver:
        screenGameOver();
        break;
      case Status.gameStart:
        startScreen();
        break;
      default:
        break;
    }

    scoreScreen.render(hero);
    legendScreen.render();
    topPlayersScreen.render(players);
  };

  return { screenPaused, screenGameOver, update, render };
}