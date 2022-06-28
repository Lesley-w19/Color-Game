var diffEls = document.querySelectorAll(".diff__btn");
var diffEl = document.querySelector(".diff__btn.active").innerHTML;
var n = diffEl;
var colorsEl = document.querySelector(".colors");
var colorsBlocks;
var rgbEl = document.querySelector(".rgb");
var statusEl = document.querySelector(".status");
var colors = [];
let number_of_tiles;
let baseColor;
resetGame(n);

function checkColors(color1, clickedDiv) {
  // your code here
  if (color1 !== baseColor) {
    clickedDiv.style.backgroundColor = "transparent";
  } else {
    colorsBlocks.forEach((colorBlock) => {
      if (colorBlock < 2) {
        document.querySelector(".text").innerHTML = "You have won!";
        setNumberOfTiles();
      } else {
        colorBlock.style.backgroundColor = baseColor;
        document.querySelector(".text").innerHTML = "You have won!";
        setNumberOfTiles();
      }
    });
  }
}

function resetGame(n) {
  createBlocks(n);
  document.body.style.color = "black";
  colors = [];
  pickColors(n);
  pickedColor = random(n);
  baseColor = colors[pickedColor];
  rgbEl.innerHTML = baseColor;
  setColors();
  statusEl.innerHTML =
    "Try to guess the right color based on the RGB value by clicking on the blocks.";
}

function setColors() {
  for (var i = 0; i < colorsBlocks.length; i++) {
    colorsBlocks[i].style.backgroundColor = colors[i];
  }
}

function pickColors(n) {
  for (var i = 0; i < n; i++) {
    colors.push(randomColor());
  }
}

function randomColor() {
  return "rgb(" + random(255) + ", " + random(255) + ", " + random(255) + ")";
}

function random(r) {
  return Math.floor(Math.random() * r);
}

function setNumberOfTiles() {
  // your code here
  setTimeout(() => {
    resetGame(number_of_tiles);
    document.querySelector(".text").innerHTML = "";
  }, 1000);
}

function createBlocks(num) {
  colorsEl.innerHTML = "";

  // here is an example of a loop that is used to create the blocks of color depending on you choice ie 6 or 9, however you need to add event listeners
  for (var i = 0; i < num; i++) {
    var block = document.createElement("div");
    block.classList.add("colors__block");
    colorsEl.appendChild(block);
  }
  colorsBlocks = document.querySelectorAll(".colors__block");

  colorsBlocks.forEach((cBlock) => {
    cBlock.addEventListener("click", (e) => {
      const divAccessed = e.target;
      const val = e.target.style.backgroundColor;
      checkColors(val, divAccessed);
    });
  });

  // for (var i = 0; i < colorsBlocks.length; i++) {
  //   colorsBlocks[i].addEventListener("click", checkColors());
  // }
}

diffEls.forEach((displayBtn) => {
  displayBtn.addEventListener("click", (e) => {
    number_of_tiles = e.target.innerHTML;
    document.querySelector(".active").classList.remove("active");
    e.target.classList.add("active");
    createBlocks(number_of_tiles);
    random(number_of_tiles);
    pickColors(number_of_tiles);
    resetGame(number_of_tiles);
  });
});
