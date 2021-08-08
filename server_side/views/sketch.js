



let numberOfShapesControl;
let slider;
let GLOBAL_SIZE = 30;
var grid;
let wid, hei;
let canv;
let larry;
let TIME = 300;
let STOP = false;
let inter;
let food = [];
let SCORE = 0, HIGHSCORE = 0;
function setup() {
    console.log("Setup initialized - P5 is running");
    frameRate(60);
    wid = floor((windowWidth / 1.1) / GLOBAL_SIZE) * GLOBAL_SIZE;
    hei = floor((windowHeight / 1.1) / GLOBAL_SIZE) * GLOBAL_SIZE;
    hei = min(hei, 720);
    canv = createCanvas(wid, hei);
    canv.parent("canv_holder");
    reset();
}





//# sourceMappingURL=../sketch/sketch/build.js.map