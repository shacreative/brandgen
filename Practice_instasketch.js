let myCanvas;
let cWidth;
let cHeight;
let margin;
let instaCanvas;
let bgColour = "transparent";
let gridOption = 2;
let currentText;
let img;
let input;

//let uploadedImage;

let redButton = document.getElementById("b1");
let greenButton = document.getElementById("b2");
let blueButton = document.getElementById("b3");
let gridSlider = document.getElementById("gridSlider");
let textInput = document.getElementById("textInput");
// let imageUpload = document.getElementById("imageUpload");
//let fileUpload = document.getElementById("fileUpload");

// imageUpload.addEventListener("change", (e) => {
//   console.log(e);
//   let uploadImage = e.target.files[0];
//   if (uploadImage.type === "image/png" || uploadImage.type === "image/jpeg") {
//     img = createImg(uploadImage.data, "");
//     img.hide();
//     console.log("image uploaded");
//   } else {
//     img = null;
//     console.log("image isn't an image");
//   }
// });

textInput.addEventListener("input", (e) => {
  currentText = e.target.value;
});

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
  margin = cWidth / 27;
  pixelDensity(1);
  myCanvas = createCanvas(cWidth, cHeight);
  myCanvas.parent("canvas-parent");
  instaCanvas = createGraphics(1080, 1080);

  input = createFileInput(handleFile);
  // input.position(0, 0);
  input.id("p5input");
  input.parent("file-input-parent");
}

function draw() {
  background(bgColour);
  if (img) image(img, 0, 0);
  instaCanvas.background(255, 0, 0);
  gridOption = gridSlider.value;
  stroke(0);
  strokeWeight(3);

  if (gridOption == 1) {
    rect(margin, margin, cWidth - margin * 2, cHeight - margin * 2);
    
  } else if (gridOption == 2) {
    rect(margin, margin, cWidth - margin * 2, cHeight - margin * 2);
    let centerX = cWidth / 2;
    let centerY = cHeight / 2;
    let circleRadius = min(cWidth, cHeight) / 2 - margin * 2;
    ellipse(centerX, centerY, circleRadius * 2, circleRadius * 2);

  } else if (gridOption == 3) {
    rect(margin, margin, cWidth - margin * 2, cHeight - margin * 2);
    line(margin, cHeight / 1.4, cWidth - margin, cHeight / 1.4);
    // rect(margin, margin, cWidth - margin * 2, cHeight / 1.44);
    // rect(margin, cHeight / 1.4, cWidth - margin * 2, cHeight / 4);
  } else if (gridOption == 4) {
    rect(margin, margin, cWidth / 2 - margin, cHeight / 2 - margin);
    rect(
      margin,
      margin + cHeight / 2,
      cWidth / 2 - margin,
      cHeight / 2 - margin
    );
    rect(
      cHeight / 2 - margin + margin * 2,
      margin,
      cWidth / 2 - margin,
      cHeight - margin
    );
  }

  strokeWeight(0);
  textSize(50);
  text(currentText, 50, 50);
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
  bgColour = e.target.value;
}

function handleFile(file) {
  print(file);
  if (file.type === "image") {
    img = createImg(file.data, "");
    img.hide();
  } else {
    img = null;
  }
}
