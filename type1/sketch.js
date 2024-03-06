// ToDo
// dat.gui for gap, fade spee, shrink speed, etc.

// gui properties
let sketchProps = {

  fade: true, // fade stroke?
  fadeSpeed: 0.5,

  shrink: false, // shrink stroke?
  shrinkSpeed: 0,

  ellipseSize: 60,
  gapFactor: 0.6,
  bgColor: [255, 255, 255], // RGB array
  ellipseColor: 1, // RGB array

  pulse: true, // pulse animation?

  // grid
  gridMode: true,
  gridCells: 100,
};

// adjust size to parent div
let parentDiv = document.getElementById("sketch");
let width = parentDiv.offsetWidth;
let height = parentDiv.offsetHeight;

// class array
let shapes = []; // empty array for class objects

// interaction variables
let gap = sketchProps.ellipseSize * 0.6; // gap between objects equals ellipse size
let distance = gap + 1; // initial distance to previous object must be greater than gap
let currentFrame = 0; // the current frame

// grid variables
let drawing; // canvas for our draing
let gridSize; // size of the grid
let gridCells = sketchProps.gridCells; // number of cells per row

let img;


// SETUP
function setup() {

  let canvas = createCanvas(width, height);
  canvas.parent("sketch");
  setupDatGui();

  // calculate the gridSize
  gridSize = width / sketchProps.gridCells;

  // initialize the drawing canvas
  drawing = createGraphics(width, height);
  drawing.fill(255); // fill color
  drawing.noStroke(); // no stroke

  // styling
  background(0);
  noStroke();
  // noCursor();
  ellipseColor = sketchProps.ellipseColor; // colour of ellipse
  // preventTouchScroll();

}

function preload() {
  img = loadImage('./data/shape1.svg');
}



// DRAW
function draw() {
  // get values from gui
  ellipseSize = sketchProps.ellipseSize; // ellipse size
  gap = ellipseSize * sketchProps.gapFactor; // gap size
  gridSize = width / sketchProps.gridCells; // recalculate grid size

  background(sketchProps.bgColor);

  // Grid lines
  if (sketchProps.gridMode) {

    //drawing.background(0, 0); // transparent background
    drawing.background(255);

    // draw the grid lines
    for (let x = 0; x < width; x = x + gridSize) {
      for (let y = 0; y < height; y = y + gridSize) {

        drawing.fill(0, 0); // transparent fill color
        drawing.stroke('black'); // stroke color
        drawing.strokeWeight(0.1); // stroke weight

        drawing.rect(x, y, gridSize, gridSize); // draw grid lines
      }
    }
  } else {
    drawing.clear(); // clear the drawing
  }


  // get the current frame
  currentFrame = frameCount;

  // calculate distance between mouse and previous object
  // but only if we have at least one shape
  if (shapes.length > 0) {
    let previousShape = shapes[shapes.length - 1];
    distance = dist(mouseX, mouseY, previousShape.x, previousShape.y);
  }

  // drawing mode: grid
  if (sketchProps.gridMode) {

    // draw on the grid
    if (mouseIsPressed) {

      let multiX = mouseX - (mouseX % gridSize);
      let multiY = mouseY - (mouseY % gridSize);

      // drawing.fill('#c2d4f4');
      // drawing.noStroke();
      // drawing.ellipse(multiX + gridSize / 2, multiY + gridSize / 2, gridSize / 2, gridSize / 2); // draw ellipse
      // drawing.imageMode(CENTER);
      // drawing.image(img, multiX + gridSize / 2, multiY + gridSize / 2, ellipseSize, ellipseSize )
      drawing.rect(multiX + ellipseSize / 2, multiY + gridSize / 2, gridSize, ellipseSize )
     
      // create new class object
      let newShape = new Circle(multiX + gridSize / 2, multiY + gridSize / 2, ellipseSize, sketchProps.ellipseColor, currentFrame);
      shapes.push(newShape);
    }

    image(drawing, 0, 0); // draw the canvas

  }

  // drawing mode: free
  else {

    // draw while mouse is pressed and if distance is greater than gap
    if (mouseIsPressed && distance > gap) {

      // create new class object
      let newShape = new Circle(mouseX, mouseY, ellipseSize, sketchProps.ellipseColor, currentFrame);
      shapes.push(newShape);

    }
  }

  // draw array of class objects
  for (let i = 0; i < shapes.length; i++) {
    shapes[i].display();
  }

  // cursor
  // fill("red");
  // ellipse(mouseX, mouseY, ellipseSize, ellipseSize);

}


// CLASSES

// circle class
class Circle {

  // get the object properties
  constructor(x, y, r, c, f) {
    this.x = x; // x position
    this.y = y; // y position
    this.r = r; // radius
    this.c = c; // colour
    this.f = f; // the frame the object was created
    this.transparency = 0; // default value that we subtract from alphaValue
    this.shrink = 0; // default value that we subtract from animatedSize
  }

  // methods
  display() {

    // animate the size
    // let animatedSize = this.r + map(sin((frameCount - this.f) * 0.1), -1, 1, -10, 10);
    let animatedSize = this.r - this.shrink;

    // draw the object
    
    // ellipse(this.x, this.y, animatedSize);
    // imageMode(CENTER);
    // image(img, this.x - animatedSize / 2, this.y - animatedSize / 2, animatedSize, animatedSize)
    if (this.c <= 1){
      fill(59, 59, 168);
    }
    if (this.c >= 2){
      fill(232, 245, 51);
    }

    if (this.c >= 3){
      fill(237, 118, 248);
    }

    if (this.c >= 4){
      fill(255,255,255);
    }

    if (this.c >= 5){
      fill(0,0,0);
    }


    
    
    rect(this.x - animatedSize / 2, this.y - gridSize / 2, animatedSize, gridSize);

    // fade out stroke
    if (sketchProps.fade) {
      this.transparency += sketchProps.fadeSpeed;
    }

    // shrink stroke
    if (animatedSize >= 0 && sketchProps.shrink) { // don't shrink smaller than 0
      this.shrink += sketchProps.shrinkSpeed;
    }

    // pulse animation
    if (sketchProps.pulse) {
      this.r = this.r + map(cos((frameCount - this.f) * 0.1), -100, 1, -1, 1);
    }
  }
}

// clear all shapes
function clearAll() {
  shapes = [];
  distance = gap + 1;
  drawing.clear();
}


// adjust canvas size on resize
function windowResized() {

  // adjust width and height to parent div
  width = parentDiv.offsetWidth;
  height = parentDiv.offsetHeight;
  resizeCanvas(width, height);

  // adjust the grid
  gridSize = width / sketchProps.gridCells; // recalculate grid size

}



// gui function
function setupDatGui() {

  let gui = new dat.GUI({ autoPlace: false });
  gui.domElement.id = 'gui';
  document.body.appendChild(gui.domElement);
  // document.getElementById('myContainer').appendChild(gui.domElement); // append to a specific div

  // folders
  let f1 = gui.addFolder('Canvas');
  let f2 = gui.addFolder('Stroke');
  let f3 = gui.addFolder('Animation');
  let f4 = gui.addFolder('Grid');

  // add controlers to folder 1
  f1.addColor(sketchProps, 'bgColor').name('Background'); // color picker
  f1.add(window, 'clearAll').name('Clear!'); // clear button
  f1.open();

  // add controlers to folder 2
  f2.add(sketchProps, 'ellipseColor', 1, 5).name('Color'); // color picker
  f2.add(sketchProps, 'ellipseSize', 5, 100).name('Size'); // size slider
  f2.add(sketchProps, 'gapFactor', 0, 10).name('Gap'); // size slider
  f2.open();

  // add controlers to folder 3
  f3.add(sketchProps, 'fade').name('Fade out?')
  f3.add(sketchProps, 'fadeSpeed', 0.1, 10).name('Fade'); // fade slider
  f3.add(sketchProps, 'shrink').name('Shrink?'); // Checkbox for shrink
  f3.add(sketchProps, 'shrinkSpeed', 0.01, 1).name('Shrink speed'); // speed slider
  f3.add(sketchProps, 'pulse').name('Pulse?'); // Checkbox for pulse
  f3.open();

  // add controlers to folder 4
  f4.add(sketchProps, 'gridMode').name('Activate'); // Checkbox for grid
  f4.add(sketchProps, 'gridCells', 1, 100).name('Grid size'); // size slider
  f4.open();

}

