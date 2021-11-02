export default function StartScreen(ctx, renderer) {

  const render = (name) => {
    const size = 360
    const height = 150;

    ctx.fillStyle = 'rgba(255, 255, 255, .7)';
    ctx.fillRect(
      (ctx.canvas.width / 2) - (size / 2),
      (ctx.canvas.height / 2) - (height / 2),
      size,
      height,
    );

    renderer.renderText({
      x: (ctx.canvas.width / 2) - 167,
      y: (ctx.canvas.height / 2) - 40,
      font: "bold 22px 'Press Start 2P'",
      text: 'Input your name',
      color: 'red'
    });

    renderer.renderText({
      x: (ctx.canvas.width / 2) - 162,
      y: (ctx.canvas.height / 2) + 25,
      font: "bold 40px 'Press Start 2P'",
      text: name,
      color: '#00fe00'
    });

    renderer.renderText({
      x: (ctx.canvas.width / 2) - 147,
      y: (ctx.canvas.height / 2) + 65,
      font: "14px 'Press Start 2P'",
      text: 'PRESS KEY TO CONTINUE',
      color: 'red'
    });
  }

  return {
    render
  }
}
