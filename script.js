let btn_start = document.getElementById("btn_start");
let main = document.querySelector(".main");
let canva = document.querySelector(".canva");
let canvas_page = document.querySelector(".canvas_page");
let body = document.querySelector("body");
let is_painted = false;
//let current_color = "red";

let draw = document.querySelector(".draw");
draw.addEventListener("click", () => {
  is_painted = false;
});

let clear = document.querySelector(".clear");
clear.addEventListener("click", () => {
  is_painted = true;
});

let save = document.querySelector(".save");
save.addEventListener("click", () => {
  let cells = document.querySelectorAll(".cell");
  let cells_color = [];
  cells.forEach((cell) => {
    cells_color.push(cell.style.backgroundColor || "white");
  });
  console.log(cells_color, "кнопка сохранить");
  localStorage.setItem("saved_paint", JSON.stringify(cells_color));
});

//window.addEventListener("load", () => {
//
//});

let fill = document.querySelector(".fill");
fill.addEventListener("click", () => {
  let cells = document.querySelectorAll(".cell");
  anime({
    targets: cells,
    duration: 100,
    backgroundColor: current_color,
    easing: "linear",
    delay: (l, i) => i * 0.5,
  });
  //cells.forEach((item) => {
  // item.style.backgroundColor = current_color;
  // });
});

let reset = document.querySelector(".reset");
reset.addEventListener("click", () => {
  let cells = document.querySelectorAll(".cell");
  cells.forEach((item) => {
    item.style.backgroundColor = "white";
  });
});

let input = document.querySelector(".input");
input.addEventListener("input", () => {
  current_color = input.value;
});

btn_start.addEventListener("click", () => {
  current_color = input.value;
  canva.style.display = "flex";
  main.style.display = "none";
  body.style.backgroundImage = "none";
  body.style.backgroundColor = "#7D5EF7";
  create_conva();
});

function create_conva() {
  canvas_page.innerHTML = "";
  for (let i = 0; i < 3000; i++) {
    let cell = document.createElement("div");
    cell.classList.add("cell");
    cell.addEventListener("mousedown", () => {
      cell.style.backgroundColor = is_painted ? "white" : current_color;
    });
    cell.addEventListener("mouseover", () => {
      if (is_mousedown) {
        cell.style.backgroundColor = is_painted ? "white" : current_color;
      }
    });
    canvas_page.appendChild(cell);
  }
  let saved_cells = JSON.parse(localStorage.getItem("saved_paint"));
  console.log(saved_cells, "массив");
  if (saved_cells) {
    document.querySelectorAll(".cell").forEach((cell, index) => {
      cell.style.backgroundColor = saved_cells[index] || "white";
    });
  }
}

let is_mousedown = false;
document.addEventListener("mousedown", () => {
  is_mousedown = true;
});

document.addEventListener("mouseup", () => {
  is_mousedown = false;
});

let load = document.querySelector(".load");
load.addEventListener("click", () => {
  html2canvas(canvas_page).then((canvas) => {
    let link = document.createElement("a");
    link.download = "picture.jpg";
    link.href = canvas.toDataURL();
    link.click();
    console.log(link.href);
  });
});
