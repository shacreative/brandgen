let myCanvas;
let cWidth;
let cHeight;
let margin;
// let instaCanvas;
let bgColour = "transparent";
let gridOption = 1;
let tSize = 32;
let currentText = "text here";
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
let biegeButton = document.getElementById("b7");
let gridSlider = document.getElementById("gridSlider");
let textInput = document.getElementById("textInput");
let gridOptionLabel = document.getElementById("gridOptionLabel");
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

gridSlider.addEventListener("change", (e) => {
  gridOption = e.target.value;
  gridOptionLabel.innerHTML = gridOption;
});

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

biegeButton.addEventListener("click", (e) => {
  colorButton(e);
});

saveButton.addEventListener("click", () => {
  // let combinedCanvas = instaCanvas;
  // combinedCanvas.image(myCanvas, 0, 0);
  // combinedCanvas.image(instaCanvas, 0, 0);
  // save(combinedCanvas, "MasterWorks_1080x1080.jpg");
  resizeCanvas(1080, 1080);
  maskCanvas = createGraphics(1080, 1080);
  background(bgColour);
  maskCanvas.clear();
  makeGrid();
  makeText();
  save(myCanvas, "MasterWorks_1080x1080.jpg");
  resizeCanvas(cWidth, cHeight);
  maskCanvas = createGraphics(cWidth, cHeight);
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
  maskCanvas = createGraphics(width, height);
  // instaCanvas = createGraphics(1080, 1080);

  input = createFileInput(handleFile);
  // input.position(0, 0);
  input.id("p5input");
  input.parent("file-input-parent");

  // stroke("#222222");
  // strokeWeight(3);
}

function draw() {
  background(bgColour);
  maskCanvas.clear();
  makeGrid();
  makeText();
}

function makeText() {
  strokeWeight(0);
  textSize(tSize);
  textFont("TiemposHeadline");
  fill("#222222");
  textAlign(LEFT, BOTTOM);
  //if (gridOption == 1) {
  //textAlign(CENTER, CENTER);
  //text(currentText, width / 2, width / 2);

  if (gridOption == 2) {
    textAlign(CENTER, CENTER);
    text(currentText, width / 2, height / 2);

    // else if (gridOption == 3) {
    //textAlign(CENTER, CENTER);
    //text(currentText, width / 2, width / 2);
    // fill(88, 102, 153);
  } else if (gridOption == 4) {
    textAlign(CENTER, CENTER);
    text(currentText, width / 2, height / 2);
  } else if (gridOption == 5) {
    // textSize(24);
    textAlign(CENTER, CENTER);
    textWrap(WORD);
    // fill("red");
    // rect(
    //   margin * 2 + (height - margin * 2) / 3,
    //   height - (height - margin * 2) / 3,
    //   width - margin * 4 - (height - margin * 2) / 3,
    //   (height - margin * 2) / 3 - margin * 2
    // );
    // fill("black");
    text(
      currentText,
      margin * 2 + (height - margin * 2) / 3,
      height - (height - margin * 2) / 3,
      width - margin * 4 - (height - margin * 2) / 3,
      (height - margin * 2) / 3 - margin * 2
    );
  } else if (gridOption == 6) {
    textAlign(CENTER);
    text(currentText, width / 2 + margin + 90, margin + 290);
  }
}

function makeGrid() {
  strokeWeight(3);
  fill(255);
  // make a new image from the uploaded/default image
  if (img && gridOption != 6) {
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

  ////////////// GRID OPTION 1 IMAGE ONLY //////////////

  if (gridOption == 1) {
    // draw mask and circle
    maskCanvas.rect(margin, margin, width - margin * 2, height - margin * 2);
    if (img) {
      newImg.mask(maskCanvas);
      image(newImg, 0, 0, width, height, 0, 0, width, height, COVER, CENTER);
    }
    noFill();
    rect(margin, margin, width - margin * 2, height - margin * 2);
  }

  ////////////// GRID OPTION 2 TEXT ONLY //////////////

  if (gridOption == 2) {
    // draw mask and circle
    maskCanvas.rect(margin, margin, width - margin * 2, height - margin * 2);

    noFill();
    rect(margin, margin, width - margin * 2, height - margin * 2);
  }

  ////////////// GRID OPTION 3 IMAGE ONLY //////////////
  else if (gridOption == 3) {
    noFill();
    rect(margin, margin, width - margin * 2, height - margin * 2);
    let centerX = width / 2;
    let centerY = height / 2;
    let circleRadius = min(width, height) / 2 - margin * 2;

    // draw mask and circle
    maskCanvas.circle(centerX, centerY, circleRadius * 2);
    if (img) {
      newImg.mask(maskCanvas);
      image(newImg, 0, 0, width, height, 0, 0, width, height, COVER, CENTER);
    }
    noFill();
    circle(centerX, centerY, circleRadius * 2);
  }

  ////////////// GRID OPTION 4 TEXT ONLY //////////////
  else if (gridOption == 4) {
    noFill();
    rect(margin, margin, width - margin * 2, height - margin * 2);
    let centerX = width / 2;
    let centerY = height / 2;
    let circleRadius = min(width, height) / 2 - margin * 2;

    noFill();
    circle(centerX, centerY, circleRadius * 2);
  }

  ////////////// GRID OPTION 5 IMAGE + TEXT //////////////
  else if (gridOption == 5) {
    // draw mask and circle
    maskCanvas.rect(
      margin,
      margin,
      width - margin * 2,
      ((height - margin * 2) * 2) / 3
    );
    if (img) {
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
      newImg.copy(
        img,
        0,
        0,
        img.width,
        img.height,
        margin,
        margin - (height - margin * 2) / 6,
        width - margin * 2,
        width - margin * 2
      );
      newImg.mask(maskCanvas);
      image(newImg, 0, 0, width, height, 0, 0, width, height, COVER, CENTER);
    }
    noFill();
    rect(margin, margin, width - margin * 2, height - margin * 2);

    // 1/3 width rectangle (minus margins)
    rect(
      margin,
      height - (height - margin * 2) / 3 - margin,
      (height - margin * 2) / 3,
      (height - margin * 2) / 3
    );

    circle(
      margin + (height - margin * 2) / 6,
      height - (height - margin * 2) / 3 - margin + (height - margin * 2) / 6,
      (height - margin * 2) / 3 - margin * 2
    );

    // full width rectangle (minus margins)
    rect(
      margin,
      height - (height - margin * 2) / 3 - margin,
      width - margin * 2,
      (height - margin * 2) / 3
    );
  }

  ////////////// GRID OPTION 6 IMAGE + TEXT //////////////
  else if (gridOption == 6) {
    // draw mask and circle
    maskCanvas.rect(
      margin + (width - margin * 2) / 2,
      margin + (width - margin * 2) / 2,
      (width - margin * 2) / 2,
      (height - margin * 2) / 2
    );
    if (img) {
      let iWidth = img.width;
      let iHeight = img.height;
      let iRatio = iWidth / iHeight;

      if (iWidth > iHeight) {
        iHeight = width - margin * 2;
        iWidth = iHeight * iRatio;
      } else {
        iWidth = width - margin * 2;
        iHeight = iWidth / iRatio;
      }
      newImg = createImage(width, height);
      newImg.copy(
        img,
        0,
        0,
        img.width,
        img.height,
        margin + (width - margin * 2) / 4,
        margin + (width - margin * 2) / 4,
        iWidth,
        iHeight
      );
      newImg.mask(maskCanvas);
      image(
        newImg,
        -(height - margin * 2) / 2,
        0,
        width,
        height,
        0,
        0,
        width,
        height,
        COVER,
        CENTER
      );
    }
    noFill();

    circle(
      (width - margin * 2) / 4 + margin,
      (width - margin * 2) / 4 + margin,
      (height - margin * 6) / 2
    );
    rect(margin, margin, (width - margin * 2) / 2, (height - margin * 2) / 2);

    rect(
      margin + (width - margin * 2) / 2,
      margin,
      (width - margin * 2) / 2,
      (height - margin * 2) / 2
    );
    rect(
      margin,
      margin + (width - margin * 2) / 2,
      (width - margin * 2) / 2,
      (height - margin * 2) / 2
    );

    circle(795, 795, 400);
    rect(
      margin + (width - margin * 2) / 2,
      margin + (width - margin * 2) / 2,
      (width - margin * 2) / 2,
      (height - margin * 2) / 2
    );
  }
  // line(margin, height / 1.4, width - margin, height / 1.4);
  // rect(margin, margin, width - margin * 2, height / 1.44);
  // rect(margin, height / 1.4, width - margin * 2, height / 4);
}

function windowResized() {
  calculateCanvas();
  resizeCanvas(cWidth, cHeight);
  maskCanvas = createGraphics(cWidth, cHeight);
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
