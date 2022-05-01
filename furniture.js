class furniture {
    // x and y are coordinates of top left of furniture
    // w and h are width and height of rectangle
    constructor(x, y, w, h, image) {
      this.dragging = false; // Is the object being dragged?
      
      this.x = x;
      this.y = y;
      this.w = w;
      this.h = h;
      this.image = image;
      
      this.img = loadImage(this.image);
      
      this.on = false;

      this.prev_x = -1;
      this.prev_y = -1;
      
      this.offsetX = 0;
      this.offsetY = 0;
    }
  
    // update location if being dragged
    update() {
      if (this.dragging) {
        this.x = mouseX + this.offsetX;
        this.y = mouseY + this.offsetY;
      }
    }
  
    show() {
      stroke(0);
      // different transparency/tint based on state
      if (this.dragging) {
        tint(255, 127);
      } 
      else {
        tint(255, 255);
      }
      // different image based on on/off
      if (this.on == true && this.image == "images/tv_off.png") {
        this.image = "images/tv_on.jpg";
        this.img = loadImage(this.image);
      }
      else if (this.on == false && this.image == "images/tv_on.jpg") {
        this.image = "images/tv_off.png";
        this.img = loadImage(this.image);
      }
      else if (this.on == true && this.image == "images/recliner_not_reclined.jpg") {
        this.image = "images/recliner_reclined.png";
        this.img = loadImage(this.image);
      }
      else if (this.on == false && this.image == "images/recliner_reclined.png") {
        this.image = "images/recliner_not_reclined.jpg";
        this.img = loadImage(this.image);
      }
      else if (this.on == true && this.image == "images/fan_off.jpeg") {
        this.image = "images/fan_on.jpg";
        this.img = loadImage(this.image);
      }
      else if (this.on == false && this.image == "fan_on.jpg") {
        this.image = "images/images/fan_off.jpeg";
        this.img = loadImage(this.image);
      }
      else if (this.on == true && this.image == "images/lamp_on.png") {
        this.image = "images/lamp_off.jpg";
        this.img = loadImage(this.image);
      }
      else if (this.on == false && this.image == "images/lamp_off.jpg") {
        this.image = "images/images/lamp_on.png";
        this.img = loadImage(this.image);
      }
      image(this.img, this.x, this.y, this.w, this.h);
    }
  
    pressed() {
      // check if pressing on furniture
      if (mouseX > this.x && mouseX < this.x + this.w && mouseY > this.y && mouseY < this.y + this.h) {
        this.dragging = true;
        // maintain position of rectangle
        this.offsetX = this.x - mouseX;
        this.offsetY = this.y - mouseY;
      }
    }
  
    released() {
      // Quit dragging
      this.dragging = false;
      // this.prev_x = this.x;
      // this.prev_y = this.y;
    }
   
    out_of_bounds() {
      if (this.x < 10 || this.y < 60 || this.x + this.w > 1010 || this.y + this.h > 710) {
        return true;
      }
      return false;
    }
    
    overlaps(f) {
      if (this.x <= (f.x+f.w) && 
          f.x <= (this.x + this.w) &&
          (this.y+this.h) >= f.y &&
          (f.y+f.h) >= this.y) {
        return true;
      }
      return false;
    }
  }