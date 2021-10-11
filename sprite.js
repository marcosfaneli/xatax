export default function Sprite(img, eixoX, eixoY, w, h) {
  const x = eixoX;
  const y = eixoY;
  const width = w;
  const height = h;
  const image = img;

  return { image, x, y, width, height };
}