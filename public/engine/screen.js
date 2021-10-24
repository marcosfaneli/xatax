import LegendScreen from './screens/LegendScreen.js';
import ScoreScreen from './screens/ScoreScreen.js';
import TopPlayersScreen from './screens/TopPlayersScreen.js';
import Status from './status.js';

export default function Screen(renderer) {

  const ctx = renderer.ctx;

  const legendScreen = LegendScreen(ctx);
  const scoreScreen = ScoreScreen(ctx);
  const topPlayersScreen = TopPlayersScreen(ctx);

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

  const render = (status, hero, players) => {
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

    scoreScreen.render(hero);
    legendScreen.render();
    topPlayersScreen.render(players);
  };

  return { screenPaused, screenGameOver, render };
}