import LegendScreen from './screens/LegendScreen.js';
import ScoreScreen from './screens/ScoreScreen.js';
import StartScreen from './screens/StartScreen.js';
import TopPlayersScreen from './screens/TopPlayersScreen.js';
import GameOverScreen from './screens/GameOverScreen.js';
import Status from './status.js';

export default function Screen(renderer) {

  const ctx = renderer.ctx;

  let message = '';

  const legendScreen = LegendScreen(ctx);
  const scoreScreen = ScoreScreen(ctx);
  const topPlayersScreen = TopPlayersScreen(ctx);
  const startScreen = StartScreen(ctx, renderer);
  const gameOverScreen = GameOverScreen(ctx, renderer, true);

  const update = (key) => {
    if (key === 'Backspace') {
      message = message.slice(0, -1);
    } else if (
      key !== 'Shift' &&
      key !== 'Control' &&
      key !== 'Alt' &&
      key !== 'Meta' &&
      key !== 'CapsLock' &&
      key !== 'Tab' &&
      key !== 'Enter' &&
      key !== 'ArrowUp' &&
      key !== 'ArrowDown' &&
      key !== 'ArrowLeft' &&
      key !== 'ArrowRight' &&
      message.length < 8
    ) {
      message += key.toUpperCase();
    }

    screenStart();
  };

  const screenPaused = () => {
    renderer.renderText({
      x: (ctx.canvas.width / 2) - 210,
      y: ctx.canvas.height - 150,
      font: "bold 72px 'Press Start 2P'",
      text: 'PAUSED', color: 'red'
    });
  };

  const screenStart = () => {
    startScreen.render(message);
  };

  const screenGameOver = (hero) => {
    gameOverScreen.render(hero, message);
  };

  const render = (status, hero) => {
    switch (status) {
      case Status.gamePaused:
        screenPaused();
        break;
      case Status.gameOver:
        screenGameOver(hero);
        break;
      case Status.gameStart:
        screenStart();
        break;
      default:
        break;
    }

    scoreScreen.render(hero);
    legendScreen.render();
    topPlayersScreen.render();
  };

  return { screenPaused, screenGameOver, update, render };
}