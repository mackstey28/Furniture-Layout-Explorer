let lof = []; // list of furniture (lof) objects
let curr_f; // current furniture being moved
let clear_room;

function setup() {
  createCanvas(1480, 720);
  
  sofa_img = loadImage("images/sofa.png");
  table_img = loadImage("images/table.jpg");
  bed_img = loadImage("images/bed.png");
  chair_img = loadImage("images/chair.png");
  refrigerator_img = loadImage("images/refrigerator.png");
  fan_img = loadImage("images/fan_off.jpeg");
  lamp_img = loadImage("images/lamp_off.jpg");
  recliner_img = loadImage("images/recliner_not_reclined.jpg");
  tv_img = loadImage("images/tv_off.png");
  
  background_img = loadImage("images/background.jpg");
  
  clear_room = createButton("Clear room");
  clear_room.size(200,50);
  clear_room.position(420,5);
  clear_room.style("font-size", "32px");
  clear_room.mouseClicked(clearAll);
}

function draw() {
  background(0,0,0);
  noStroke();
  
  textSize(32);
  fill(255);
  text("Drag furniture in the room", 10, 40);
  text(lof.length, 700, 40);
  
  rect(10, 60, 1000, 650); // room
  rect(1020, 60, 450, 650, 28); // furniture selection
  
  // generate thumbnails
  image(sofa_img, 1045, 70, 200, 100);
  image(table_img, 1045, 190, 200, 100);
  image(bed_img, 1050, 300, 200, 150);
  image(chair_img, 1140, 460, 100, 100);
  image(refrigerator_img, 1050, 470, 80, 80);
  image(fan_img, 1050, 580, 80, 80);
  image(lamp_img, 1150, 580, 80, 80);
  image(recliner_img, 1290, 70, 150, 150);
  image(tv_img, 1290, 250, 150, 100);
  
  // background
  image(background_img, 10, 60, 1000, 650);
  
  for (let i = 0; i < lof.length; i++) {
    lof[i].update();
    lof[i].show();
  }
}

function mousePressed() {
  // create new sofa
  if (mouseX >= 1045 && mouseX <= 1245 && mouseY >= 70 && mouseY <= 170) {
    lof.push(new furniture(1045, 70, 200, 100, "images/sofa.png"));
  }
  // create new table
  if (mouseX >= 1045 && mouseX <= 1245 && mouseY >= 190 && mouseY <= 290) {
    lof.push(new furniture(1045, 190, 200, 100, "images/table.jpg"));
  }
  // create new bed
  if (mouseX >= 1050 && mouseX <= 1350 && mouseY >= 300 && mouseY <= 450) {
    lof.push(new furniture(1070, 310, 200, 150, "images/bed.png"));
  }
  // create new chair
  if (mouseX >= 1140 && mouseX <= 1240 && mouseY >= 460 && mouseY <= 560) {
    lof.push(new furniture(1140, 460, 100, 100, "images/chair.png"));
  }
  // create new refrigerator
  if (mouseX >= 1050 && mouseX <= 1130 && mouseY >= 470 && mouseY <= 550) {
    lof.push(new furniture(1050, 470, 80, 80, "images/refrigerator.png"));
  }
  // create new fan
  if (mouseX >= 1050 && mouseX <= 1130 && mouseY >= 580 && mouseY <= 660) {
    lof.push(new furniture(1050, 580, 80, 80, "images/fan_off.jpeg"));
  }
  // create new lamp
  if (mouseX >= 1150 && mouseX <= 1230 && mouseY >= 580 && mouseY <= 660) {
    lof.push(new furniture(1150, 580, 80, 80, "images/lamp_off.jpg"));
  }
  // create new recliner  image(recliner_img, 1290, 70, 150, 150);
  if (mouseX >= 1290 && mouseX <= 1440 && mouseY >= 70 && mouseY <= 220) {
    lof.push(new furniture(1290, 70, 150, 150, "images/recliner_not_reclined.jpg", false));
  }
   // create new tv
  if (mouseX >= 1290 && mouseX <= 1440 && mouseY >= 250 && mouseY <= 350) {
    lof.push(new furniture(1290, 250, 150, 100, "images/tv_off.png"));
  }
  
  curr_f = lof[lof.length - 1];
  
  if (mouseButton === RIGHT) { // if right click while dragging, rotate
    for (let i = 0; i < lof.length; i++) {
      if (mouseX >= lof[i].x && mouseX <= lof[i].x+lof[i].w &&
         mouseY >= lof[i].y && mouseY <= lof[i].y+lof[i].w) {
        if (lof[i].on == true) {
          lof[i].on = false;
        }
        else {
          lof[i].on = true;
        }
        break;
      }
    }
  }

  for (let i = 0; i < lof.length; i++) {
    lof[i].pressed();
    if (lof[i].dragging == true) {
      curr_f = lof[i];
    }
  }
}

function mouseReleased() {
  //console.log("Current furniture: " + curr_f.image);
  //console.log("Current furniture prev_x: " + curr_f.prev_x);
  //console.log("Current furniture prev_y: " + curr_f.prev_y);
  
  already_popped = false;
  
  // check if out of bounds
  if (curr_f.out_of_bounds() == true) {
    alert("Can't be out of bounds!");
    // if out of bounds and first time being moved in
    if (curr_f.prev_x == -1 && curr_f.prev_y == -1) {
      //console.log("Out of bounds detected, deleting.");
      tint(255, 255);
      lof.pop(); // TO FIX
      already_popped = true;
    }
    // if it existed before, move to previous position
    else {
      //console.log("Out of bounds detected, moving to previous position.");
      curr_f.x = curr_f.prev_x;
      curr_f.y = curr_f.prev_y;
    }
  }
  
  for (let i = 0; i < lof.length; i++) {
    // skip if comparing to itself
    if (curr_f.x == lof[i].x && curr_f.y == lof[i].y) {
      continue;
    }
    // if overlapping on first creation, delete object
    else if (curr_f.overlaps(lof[i]) && (curr_f.prev_x == -1 || curr_f.prev_y == -1) && already_popped == false) {
      alert("Can't have overlap!");
      //console.log("Overlap detected, deleting.");
      lof.pop(); // TO FIX
    }
    // if overlapping on rearrangement, set back to initial x and y
    else if (curr_f.overlaps(lof[i]) && curr_f.prev_x != -1 && curr_f.prev_y != -1) {
      curr_f.x = curr_f.prev_x;
      curr_f.y = curr_f.prev_y;
      alert("Can't have overlap!");
      //console.log("Overlap detected, moving to previous position.");
      //console.log("Previous position x: " + curr_f.prev_x);
      //console.log("Previous position y: " + curr_f.prev_y);
      break;
    }
  }
  
  // else, set intial x = x and initial y = y
  curr_f.prev_x = curr_f.x;
  curr_f.prev_y = curr_f.y;
  //console.log("New position x: " + curr_f.x);
  //console.log("New position y: " + curr_f.y);
  
  for (let i = 0; i < lof.length; i++) {
    lof[i].released();
  }
}

function clearAll() {
  lof = [];
}