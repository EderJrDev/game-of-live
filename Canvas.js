class Canvas {
  constructor() {
    this.canvas = document.getElementById("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.Width = this.ctx.canvas.clientWidth;
    this.Height = this.ctx.canvas.clientHeight;
  }
  rectangle(x, y, larg, alt, corBorda, corInterna) {
    this.ctx.fillStyle = corInterna;
    this.ctx.strokeStyle = corBorda;
    if (corInterna) this.ctx.fillRect(x, y, larg, alt);
    if (corBorda) this.ctx.strokeRect(x, y, larg, alt);
  }
}