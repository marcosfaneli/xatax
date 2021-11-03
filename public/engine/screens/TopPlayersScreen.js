import Api from "../services/api.js";

export default function TopPlayersScreen(ctx) {

  const size = 250;
  const margin = 10;
  const fontName = "'Press Start 2P'";
  const end = ctx.canvas.width - (margin * 2);

  let players = [];

  const update = () => {
    Api().getTopPlayers().then(data => {
      players = data;
    });
  }

  update();

  const renderPlayer = (player, x, y) => {
    ctx.fillStyle = '#fff';
    ctx.font = "10px " + fontName;
    ctx.fillText(player.user, x + margin * 2, y);

    ctx.fillStyle = '#a38ade';
    ctx.font = " 10px " + fontName;
    ctx.fillText(player.score, end - (player.score.toString().length * 10), y);
  }

  const render = () => {

    if (!players || players.length === 0) {
      return;
    }

    const x = ctx.canvas.width - (size + margin);

    let y = 115;
    ctx.fillStyle = '#571be3';
    ctx.strokeStyle = 'red';
    ctx.fillRect(x, y, size, 250);

    y += 20;
    ctx.fillStyle = '#a38ade';
    ctx.font = "bold 10px " + fontName;
    ctx.fillText('Top Players', x + margin, y);

    y += 22;

    players
      .slice(0, 10)
      .sort((a, b) => b.score - a.score)
      .forEach((player) => {
        renderPlayer(player, x, y)
        y += 22;
      });
  }

  return {
    render,
    update
  }
}