const squares = [];
let img, img2;
let slider;
let value = 40;
let value2 = 40;
let current;

let checkbox1, checkbox2, checkbox3;


function preload() {
  img = loadImage('data/shape1.svg');
  img2 = loadImage('data/shape2.svg');
}


function setup() {
  createCanvas(windowWidth, windowHeight);
  slider = createSlider(40, 100);
  slider.position(100, 10);
  slider.size(200);
  angleMode(DEGREES);

  checkbox1 = createCheckbox();
  checkbox1.position(390, 8);

  checkbox2 = createCheckbox();
  checkbox2.position(490, 8);

  checkbox3 = createCheckbox();
  checkbox3.position(610, 8);
  
  background(255);
  
  rect(100,100, width-200, height-200);
  for (let i = 100; i < width - 100; i += value) {
    for (let j = 100; j < height - 100; j += value) {
      let sq = new Square(i, j, value, value2);
      squares.push(sq);
    }
  }
  
  slider.input(() => {
    value = slider.value();
    squares.length = 0;
    //fill(255);
    //rect(100,100,width-100, height-100);
     for (let i = 100; i < width - 100; i += value) {
      for (let j = 100; j < height - 100; j += value) {
        let sq = new Square(i, j, value, value2);
        squares.push(sq);
      }
    }
  });
  
 
  textSize(20);
  text("tile size",10,25);
  text("grid",350,25);
  text("spin",450,25);
  text("colors",550,25);
}

function draw() {
  for (let sq of squares) {
    sq.display();
  }
  
}

function mouseDragged() {
  for (let sq of squares) {
    sq.checkMouse();
  }
}

class Square {
  constructor(x, y, size, size2) {
    this.x = x;
    this.y = y;
    this.size = size;
  }

  display() {
  
    //noFill();
    fill(255,255,255,10);

    if (checkbox1.checked()) {
      stroke(0);
    } else {
      fill(255,255,255);
      noStroke();
    }
    // noStroke();
    
    
    rect(this.x, this.y, this.size, this.size);
    if(this.color == 80){
      push();
      translate(this.x + this.size/2,this.y + this.size/2);
      imageMode(CENTER);
      rectMode(CENTER);
      angleMode(DEGREES);

      if (checkbox2.checked()) {
        rotate(random(360));
      } else {
        rotate(this.rotate * 45);
      }
      
      // fill(random(255),random(255),random(255));
      //fill(255);
      noStroke();
      //stroke(255);
      // blendMode(DIFFERENCE);
     
      if (checkbox3.checked()) {
        fill(100+ this.r, 50, 50+this.b);
        rect(0,0,this.r/10, this.size);
      } else{
        image(this.current, 0,0, this.size, this.size);
      }
      // ellipse(0,0,random(5,50), random(5,50));
      // image(this.current, 0,0, this.size, this.size);
      
      
      
      pop();
    }
  }

  checkMouse() {
    if (mouseX >= this.x && mouseX <= this.x + this.size && mouseY >= this.y && mouseY <= this.y + this.size) {
      this.color = 80;
      this.rotate = int(random(8));
      this.r = random(255);
      this.g = random(255);
      this.b = random(255);
      //this.current = img2

      if ( keyIsDown(ENTER) ) {
         this.current = img
      } else {
         this.current = img2
      }
    }
  }

}
