export class TextButton {
  constructor(text, x, y, width, height, onClick, ctx) {
    this.text = text;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.onClick = function (event) {
      const mouseX = event.offsetX;
      const mouseY = event.offsetY;

      if (mouseX >= x && mouseX <= x + width && mouseY >= y && mouseY <= y + height) {
        onClick();
      }
    };
    this.ctx = ctx;
  }

  draw(isDisabled = false) {
    this.ctx.fillStyle = isDisabled
      ? "gray"
      : "#4CAF50";
    this.ctx.fillRect(this.x, this.y, this.width, this.height);
    this.ctx.fillStyle = "white";
    this.ctx.font = "18px Arial";
    this.ctx.fillText(this.text, this.x + this.width / 2, this.y + this.height / 2 + 6);
  }
}
