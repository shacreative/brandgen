let myCanvas;
let cWidth;
let cHeight;
let margin;
let instaCanvas;
let bgColour = "transparent";
let gridOption = 2;
//let uploadedImage;



let redButton = document.getElementById("b1");
let greenButton = document.getElementById("b2");
let blueButton = document.getElementById("b3");
let gridSlider = document.getElementById("gridSlider")
//let fileUpload = document.getElementById("fileUpload");

redButton.addEventListener("click", (e) => {
  colorButton(e);
});
greenButton.addEventListener("click", (e) => {
  colorButton(e);
});
blueButton.addEventListener("click", (e) => {
  colorButton(e);
});


saveButton.addEventListener("click", () => {
  let combinedCanvas = instaCanvas;
  combinedCanvas.image(myCanvas, 0, 0);
  combinedCanvas.image(instaCanvas, 0, 0);
  save(combinedCanvas, "MasterWorks_1080x1080.jpg");
});

calculateCanvas();


function setup() {
  margin = cWidth/27;
  pixelDensity(1);
  myCanvas = createCanvas(cWidth, cHeight);
  myCanvas.parent("canvas-parent");
  instaCanvas = createGraphics(1080, 1080);
}

function draw() {
  background(bgColour);
  instaCanvas.background(255, 0, 0);
  gridOption = gridSlider.value;
  stroke(0);
  strokeWeight(3);
  if(gridOption == 1) {
    rect(margin, margin, cWidth-margin*2, cHeight-margin*2);
    
  } else if (gridOption == 2) {
    rect(margin, margin, cWidth-margin*2, cHeight-margin*2);
    let centerX = cWidth/2;
    let centerY = cHeight/2;
    let circleRadius = min(cWidth, cHeight)/2 - margin*2;
    ellipse(centerX, centerY, circleRadius*2, circleRadius*2);
    
  } else if (gridOption == 3) {
    rect(margin, margin, cWidth-margin*2, cHeight/1.44);
    rect(margin, cHeight/1.40, cWidth-margin*2, cHeight/4);
    
  } else if (gridOption == 4) {
    rect(margin, margin, cWidth/2-margin, cHeight/2-margin);
    rect(margin, margin + cHeight/2, cWidth/2-margin, cHeight/2-margin);
    rect(cHeight/2-margin + margin*2, margin, cWidth/2-margin, cHeight-margin);
  }
}


function windowResized() {
  calculateCanvas();
  resizeCanvas(cWidth, cHeight);
}

function calculateCanvas() {
  myCanvas = document.getElementById("canvas-parent");
  cWidth = myCanvas.offsetWidth;
  cHeight = myCanvas.offsetHeight;
}

function colorButton(e) {
  console.log("bg colour", e.target.value);
  bgColour = e.target.value
}


