import Api from "../services/api.js";

export default function GameOverScreen(ctx, renderer) {
  const size = 360
  const height = 150;

  const renderRecord = (data) => {

    ctx.fillStyle = 'rgba(255, 255, 255, .9)';
    ctx.fillRect(
      (ctx.canvas.width / 2) - (size / 2),
      (ctx.canvas.height / 2) - (height / 2),
      size,
      height,
    );

    renderer.renderText({
      x: (ctx.canvas.width / 2) - 161,
      y: (ctx.canvas.height / 2) - 40,
      font: "bold 22px 'Press Start 2P'",
      text: 'Congratulation!',
      color: 'blue'
    });

    const sizeText = data.position.toString().length * 72 / 2;

    renderer.renderText({
      x: (ctx.canvas.width / 2) - sizeText,
      y: (ctx.canvas.height / 2) + 40,
      font: "bold 72px 'Press Start 2P'",
      text: data.position,// + 'st place',
      color: 'yellow'
    });

    renderer.renderText({
      x: (ctx.canvas.width / 2) - 98,
      y: (ctx.canvas.height / 2) + 65,
      font: "14px 'Press Start 2P'",
      text: 'Your Position',
      color: 'blue'
    });
  }

  const render = (hero, name) => {
    renderer.renderText({
      x: (ctx.canvas.width / 2) - 330,
      y: ctx.canvas.height - 150,
      font: "bold 72px 'Press Start 2P'",
      text: 'GAME OVER',
      color: 'red'
    });

    Api().recordScore(name, hero.getScore())
      .then((data) => {
        renderRecord(data);
      });
  }

  return {
    render
  }
}
