export default function LegendScreen(ctx) {

  const render = () => {

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

  return { render };
}
