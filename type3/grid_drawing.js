let s1 = function(sketch) {

  const squares = [];
  let imageList = [];
  let slider;
  let value = 40;
  let value2 = 40;

  let checkbox1, checkbox2, checkbox3, checkbox4, checkbox5, checkbox6, eraser, fade;

  let gridSize = 500;


  sketch.preload = function() {
    for(let i = 0 ; i < 16; i++){
      imageList[i] = sketch.loadImage("data/SVG/Asset-"+(i)+".svg");
    }
  }


  sketch.setup = function() {
    sketch.createCanvas(550, 580);
    slider = sketch.createSlider(10, 100);
    slider.position(10 + sketch.canvas.offsetLeft, 10 + sketch.canvas.offsetTop);
    slider.size(200);
    sketch.angleMode(sketch.DEGREES);

    checkbox1 = sketch.createCheckbox('grid', false);
    checkbox1.position(220 + sketch.canvas.offsetLeft, 10 + sketch.canvas.offsetTop);

    fade = sketch.createCheckbox('fade', false);
    fade.position(280 + sketch.canvas.offsetLeft, 10 + sketch.canvas.offsetTop);

    checkbox5 = sketch.createCheckbox('refresh', false);
    checkbox5.position(10 + sketch.canvas.offsetLeft, 35 + sketch.canvas.offsetTop);

    checkbox2 = sketch.createCheckbox('spin', false);
    checkbox2.position(90 + sketch.canvas.offsetLeft, 35 + sketch.canvas.offsetTop);

    checkbox6 = sketch.createCheckbox('rotate', false);
    checkbox6.position(150 + sketch.canvas.offsetLeft, 35 + sketch.canvas.offsetTop);

    checkbox3 = sketch.createCheckbox('colors', false);
    checkbox3.position(220 + sketch.canvas.offsetLeft, 35 + sketch.canvas.offsetTop);

    checkbox4 = sketch.createCheckbox('random', false);
    checkbox4.position(290 + sketch.canvas.offsetLeft, 35 + sketch.canvas.offsetTop);

    eraser = sketch.createCheckbox('eraser', false);
    eraser.position(470 + sketch.canvas.offsetLeft, 10 + sketch.canvas.offsetTop);
    
    sketch.background(255);
    
    for (let i = 10; i < gridSize; i += value) {
      for (let j = 80; j < gridSize + 50; j += value) {
        let sq = new Square(i, j, value, value2);
        squares.push(sq);
      }
    }
    
    slider.input(() => {
      value = slider.value();
      squares.length = 0;
      for (let i = 10; i < gridSize; i += value) {
        for (let j = 80; j < gridSize + 50; j += value) {
          let sq = new Square(i, j, value, value2);
          squares.push(sq);
        }
      }
    });
    
    
  }

  sketch.draw = function() {
    for (let sq of squares) {
      sq.display();
    }
    
  }

  sketch.mouseDragged = function() {
    for (let sq of squares) {
      sq.checkMouse();
    }
  }

  sketch.keyPressed = function() {
    if (sketch.keyCode === 32) {
      var image = sketch.canvas.toDataURL("image/png").replace("image/png", "image/octet-stream")
      window.location.href=image;
      console.log(image)
    }
  }

  class Square {
    constructor(x, y, size, size2) {
      this.x = x;
      this.y = y;
      this.size = size;
    }

    display() {
    
      sketch.fill(255,255,255,10);

      if (checkbox1.checked()) {
        if (checkbox5.checked()) {
          sketch.fill(255,255,255);
          sketch.stroke(0);
        } else {
          if (fade.checked()) {
            sketch.fill(255,255,255,10);
          } else {
            sketch.fill(255,255,255,0);
          }
          sketch.stroke(0);
        }
      } else {
        if (checkbox5.checked()) {
          sketch.fill(255,255,255);
          sketch.noStroke();
        } else {
          if (fade.checked()) {
            sketch.fill(255,255,255,10);
          } else {
            sketch.fill(255,255,255,0);
          }
          sketch.noStroke();
        }
      }
      
      
      sketch.rect(this.x, this.y, this.size, this.size);
      if(this.color == 80){
        sketch.push();
        sketch.translate(this.x + this.size/2,this.y + this.size/2);
        sketch.imageMode(sketch.CENTER);
        sketch.rectMode(sketch.CENTER);
        sketch.angleMode(sketch.DEGREES);

        if (this.spin && !this.eraser) {
          sketch.rotate(sketch.random(360));
        } else {
          if (this.rotates && !this.eraser) {
            sketch.rotate(this.rotate * 45);
          } else {
            sketch.rotate(0);
          }

        }
        
        sketch.noStroke();
      
        if (this.colors && !this.eraser) {
          sketch.fill(100+ this.r, 50, 50+this.b);
          if (this.random && !this.eraser){
            sketch.fill(sketch.random(255),sketch.random(255),sketch.random(255));
            sketch.ellipse(0,0,sketch.random(5,this.size), sketch.random(5,this.size));
          } else {
            sketch.rect(0,0,this.r/10, this.size);
          }
          
        } else{
          if (this.random && !this.eraser){
            sketch.fill(0);
            sketch.ellipse(0,0,sketch.random(5,50), sketch.random(5,50));
          } else {
            sketch.image(this.current, 0,0, this.size, this.size);
          }
        }
        
        if(this.eraser){
          sketch.fill(255);
          sketch.rotate(0);
          sketch.noStroke();
          sketch.rect(0,0,this.size,this.size);
        }
        
        sketch.pop();
      }
    }

    checkMouse() {
      if (sketch.mouseX >= this.x && sketch.mouseX <= this.x + this.size && sketch.mouseY >= this.y && sketch.mouseY <= this.y + this.size) {
        this.color = 80;
        this.rotate = sketch.int(sketch.random(8));
        this.r = sketch.random(255);
        this.g = sketch.random(255);
        this.b = sketch.random(255);

        this.random = checkbox4.checked();
        this.colors = checkbox3.checked();
        this.rotates = checkbox6.checked();
        this.spin = checkbox2.checked();
        this.eraser = eraser.checked();

        if ( sketch.keyIsDown(81) ) { //q
          this.current =  imageList[15] 
        } 
        else if (sketch.keyIsDown(87)) { //w
          this.current =  imageList[1]
        } 
        else if (sketch.keyIsDown(69)) { //e
          this.current =  imageList[2]
        }
        else if (sketch.keyIsDown(82)) { //r
          this.current =  imageList[3]
        }
        else if (sketch.keyIsDown(84)) { //t
          this.current =  imageList[4]
        }
        else if (sketch.keyIsDown(89)) { //y
          this.current =  imageList[5]
        }
        else if (sketch.keyIsDown(85)) { //u
          this.current =  imageList[6]
        }
        else if (sketch.keyIsDown(73)) { //i
          this.current =  imageList[7]
        }
        else if (sketch.keyIsDown(79)) { //o
          this.current =  imageList[8]
        }
        else if (sketch.keyIsDown(80)) { //p
          this.current =  imageList[9]
        }
        else if (sketch.keyIsDown(65)) { //a
          this.current =  imageList[10]
        }
        else if (sketch.keyIsDown(83)) { //s
          this.current =  imageList[11]
        }
        else if (sketch.keyIsDown(68)) { //d
          this.current =  imageList[12]
        }
        else if (sketch.keyIsDown(70)) { //f
          this.current =  imageList[13]
        }
        else if (sketch.keyIsDown(71)) { //g
          this.current =  imageList[14]
        }
        
        else {
          this.current =  imageList[0]
        }
      }
    }

  }

};

new p5(s1);

function createCanvas(){
  new p5(s1);
}