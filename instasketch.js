let myCanvas;
let cWidth;
let cHeight;
let margin;
// let instaCanvas;
let bgColour = "transparent";
let gridOption = 3;
let currentText = "Enter text";
let img;
let maskCanvas;
//let input;
let mask;
let imageFile;
let newImage;
//let uploadedImage;

let indigoButton = document.getElementById("b1");
let lilacButton = document.getElementById("b2");
let tealButton = document.getElementById("b3");
let mintButton = document.getElementById("b4");
let whiteButton = document.getElementById("b5");
let blackButton = document.getElementById("b6");
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

indigoButton.addEventListener("click", (e) => {
  colorButton(e);
});

lilacButton.addEventListener("click", (e) => {
  colorButton(e);
});
tealButton.addEventListener("click", (e) => {
  colorButton(e);
});

mintButton.addEventListener("click", (e) => {
  colorButton(e);
});

whiteButton.addEventListener("click", (e) => {
  colorButton(e);
});
blackButton.addEventListener("click", (e) => {
  colorButton(e);
});


saveButton.addEventListener("click", () => {
  // let combinedCanvas = instaCanvas;
  // combinedCanvas.image(myCanvas, 0, 0);
  // combinedCanvas.image(instaCanvas, 0, 0);
  // save(combinedCanvas, "MasterWorks_1080x1080.jpg");
  save(myCanvas, "MasterWorks_1080x1080.jpg");
});

calculateCanvas();

function preload() {
  img = loadImage("images/gen-default-image.jpg");
  // console.log("preloaded image", img);
}
function setup() {
  margin = cWidth / 27;
  pixelDensity(1);
  myCanvas = createCanvas(cWidth, cHeight);
  myCanvas.parent("canvas-parent");
  maskCanvas = createGraphics(cWidth, cHeight);
  // instaCanvas = createGraphics(1080, 1080);

  input = createFileInput(handleFile);
  // input.position(0, 0);
  input.id("p5input");
  input.parent("file-input-parent");
}

function draw() {
  background(bgColour);
  maskCanvas.clear();

  // instaCanvas.background(255, 0, 0);
  gridOption = gridSlider.value;

  stroke(0);
  strokeWeight(3);

  // grid
  makeGrid();

  makeText(50);
}

function makeText(tSize) {
  strokeWeight(0);
  textSize(tSize);
  fill(10);
  textAlign(LEFT, BOTTOM);
  if (gridOption == 1) {
    text(currentText, margin + 10, margin + tSize);
  } else if (gridOption == 2) {
    textAlign(CENTER, CENTER);
    text(currentText, cWidth / 2, cWidth / 2);
  } else if (gridOption == 3) {
    text(currentText, cWidth / 2 + margin + 10, margin + tSize);
  }
}

function makeGrid() {
  fill(255);
  // make a new image from the uploaded/default image
  if (img && gridOption != 3) {
    let iWidth = img.width;
    let iHeight = img.height;
    let iRatio = iWidth / iHeight;

    if (iWidth > iHeight) {
      iHeight = height;
      iWidth = iHeight * iRatio;
    } else {
      iWidth = width;
      iHeight = iWidth / iRatio;
    }
    newImg = createImage(width, height);
    newImg.copy(img, 0, 0, img.width, img.height, 0, 0, iWidth, iHeight);
  }
  if (gridOption == 1) {
    // draw mask and circle
    maskCanvas.rect(margin, margin, cWidth - margin * 2, cHeight - margin * 2);
    if (img) {
      newImg.mask(maskCanvas);
      image(newImg, 0, 0, width, height, 0, 0, width, height, COVER, CENTER);
    }
    noFill();
    rect(margin, margin, cWidth - margin * 2, cHeight - margin * 2);
  } 
  
  else if (gridOption == 2) {
    rect(margin, margin, cWidth - margin * 2, cHeight - margin * 2);
    let centerX = cWidth / 2;
    let centerY = cHeight / 2;
    let circleRadius = min(cWidth, cHeight) / 2 - margin * 2;

    // draw mask and circle
    maskCanvas.circle(centerX, centerY, circleRadius * 2);
    if (img) {
      newImg.mask(maskCanvas);
      image(newImg, 0, 0, width, height, 0, 0, width, height, COVER, CENTER);
    }
    noFill();
    circle(centerX, centerY, circleRadius * 2);

  
  } else if (gridOption == 3) {
    // draw mask and circle
    maskCanvas.rect(
      margin + (cWidth - margin * 2) / 2,
      margin + (cWidth - margin * 2) / 2,
      (cWidth - margin * 2) / 2,
      (cHeight - margin * 2) / 2
    );
    if (img) {
      let iWidth = img.width;
      let iHeight = img.height;
      let iRatio = iWidth / iHeight;

      if (iWidth > iHeight) {
        iHeight = cWidth - margin * 2;
        iWidth = iHeight * iRatio;
      } else {
        iWidth = cWidth - margin * 2;
        iHeight = iWidth / iRatio;
      }
      newImg = createImage(width, height);
      newImg.copy(
        img,
        0,
        0,
        img.width,
        img.height,
        margin + (cWidth - margin * 2) / 4,
        margin + (cWidth - margin * 2) / 4,
        iWidth,
        iHeight
      );
      newImg.mask(maskCanvas);
      image(newImg, 0, 0, width, height, 0, 0, width, height, COVER, CENTER);
    }
    noFill();
    rect(margin, margin, (cWidth - margin * 2) / 2, (cHeight - margin * 2) / 2);
    rect(
      margin + (cWidth - margin * 2) / 2,
      margin,
      (cWidth - margin * 2) / 2,
      (cHeight - margin * 2) / 2
    );
    rect(
      margin,
      margin + (cWidth - margin * 2) / 2,
      (cWidth - margin * 2) / 2,
      (cHeight - margin * 2) / 2
    );
    rect(
      margin + (cWidth - margin * 2) / 2,
      margin + (cWidth - margin * 2) / 2,
      (cWidth - margin * 2) / 2,
      (cHeight - margin * 2) / 2
    );
    // line(margin, cHeight / 1.4, cWidth - margin, cHeight / 1.4);
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
    // let img = createImg(file.data, "");
    img = loadImage(file.data, (img) => {
      image(img, 0, 0);
    });
  } else {
    img = null;
  }
}
