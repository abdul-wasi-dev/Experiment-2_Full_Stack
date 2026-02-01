let currentLine = null;
let drawingActive = false;

const svgCanvas = document.getElementById("canvas");
const colorPicker = document.getElementById("colorPicker");
const sizePicker = document.getElementById("sizePicker");

let currentColor = colorPicker.value;
let currentSize = Number(sizePicker.value);

// update color
colorPicker.addEventListener("input", function () {
  currentColor = this.value;
});

// update size
sizePicker.addEventListener("input", function () {
  currentSize = Number(this.value);
});

// start drawing
svgCanvas.addEventListener("mousedown", function (event) {
  drawingActive = true;

  currentLine = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "polyline"
  );

  // REQUIRED SVG attributes
  currentLine.setAttribute("fill", "none");
  currentLine.setAttribute("stroke", currentColor);
  currentLine.setAttribute("stroke-width", currentSize);
  currentLine.setAttribute("stroke-linecap", "round");
  currentLine.setAttribute("stroke-linejoin", "round");

  svgCanvas.appendChild(currentLine);
});

// stop drawing
svgCanvas.addEventListener("mouseup", function () {
  drawingActive = false;
  currentLine = null;
});

// draw line
svgCanvas.addEventListener("mousemove", function (event) {
  if (!drawingActive || !currentLine) return;

  const rect = svgCanvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;

  const points = currentLine.getAttribute("points") || "";
  currentLine.setAttribute("points", points + `${x},${y} `);
});

// clear canvas
document.getElementById("clear").addEventListener("click", function () {
  svgCanvas.innerHTML = "";
});
