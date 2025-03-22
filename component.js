export class TextButton {                                 
  constructor(text, x, y, width, height, onClick, ctx) {    
    this.text = text;                                       
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.ctx = ctx;
    this.image = null;
    this.icon = null;
    this,imageLoaded = false;
    this.iconLoaded = false;

    if(imageSrc) {
      this.image = new Image();
      this.image.src = imageSrc;
      this.image.onload = () => {
        this.imageLoaded = true;
        this.draw();                                       
      };
    }
    if(iconSrc) {
      this.icon = new Image();
      this.icon.src = iconSrc;
      this.icon.onload = () => {
        this.iconLoaded = true;
        this.draw();
      };
    }


    this.onClick = function (event) {                      
      const mouseX = event.offsetX;                        
      const mouseY = event.offsetY;

      if (mouseX >= x && mouseX <= x + width && mouseY >= y && mouseY <= y + height) {
        onClick();                                         
      }
    };
    
  }

  draw(isDisabled = false) {                              
    if (this.imageLoaded) {
      this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    } else {
      this.ctx.fillStyle = isDisabled ? "gray" : "#4CAF50";
      this.ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    
    if (this.iconLoaded) {
      let iconSize = 20;
      let iconX = this.x + 10;                            
      let iconY = this.y + (this.height - iconSize) / 2;    
      this.ctx.drawImage(this.icon, iconX, iconY, iconSize, iconSize);
    }

    this.ctx.fillStyle = "white";
    this.ctx.font = "18px Arial";
    this.ctx.textAlign = "center";
    this.ctx.textBaseline = "middle"
    
    let textX = this.icon ? this.x + this.width / 2 + 10 : this.x + this.width /2;
    let textY = this.y + this.height / 2;
    
    this.ctx.fillText(this.text, thisX, thisY); 
  }
}
