let svg = document.querySelector(".svg_overlay_2");
// svg.style.top = document.querySelector(".main").getBoundingClientRect().y + "px";

const n = 50;

let xmax = 2000;
let ymax = 1500;

let rmin = 10;
let rmax = 150;

let G = 10;

let fps = 60;
let dtRange = [1000, 2000];
let vRange = [0.1, 2];

let circles = new Array(n);
let circlePos = new Array(n);
let circleVel = new Array(n);
let circleRad = new Array(n);
let mouseControlled = -1;
let mousePos = {"x":0, "y":0};
window.addEventListener("mousemove", (e) => {
    mousePos.x = e.clientX;
    mousePos.y = e.clientY;
})

for(let i = 0; i < n; i++){
    let x = Math.random()*xmax;
    let y = Math.random()*ymax;

    let r = Math.random()*(rmax-rmin) + rmin;

    circles[i] = addCircle(svg, x, y, r, "#E6A5A5");
    circlePos[i] = {"x":x, "y":y};
    circleVel[i] = {"x":0, "y":0};
    circleRad[i] = r;
    console.log(x, y);
    mouseControlled[i] = false;

    // circles[i].addEventListener("mouseenter", (e) => {
    //     if(mouseControlled == -1){
    //         mouseControlled = i;
    //     }
    //     console.log("enter");
    // });
    // circles[i].addEventListener("mouseleave", (e) => {
    //     mouseControlled = -1;
    // });
}


let svg2 = document.querySelector(".svg_overlay_3");
// svg2.style.top = document.querySelector(".body2").getBoundingClientRect().y + "px";

let n2 = 50;
let xmax2 = document.querySelector(".body2").getBoundingClientRect().width;
let ymax2 = document.querySelector(".body2").getBoundingClientRect().height;

svg2.setAttribute("height", ymax2);
svg2.setAttribute("width", xmax2);

let widthRange = [10, 500];
let heightRange = [10, 500];

let rects = new Array(n);
let rPos = new Array(n);
let rVel = new Array(n);

for(let i = 0; i < n; i++){
    let x = Math.random()*xmax;
    let y = Math.random()*ymax;
    let w = Math.random()*(widthRange[1] - widthRange[0]) + widthRange[0];
    let h = Math.random()*(heightRange[1] - heightRange[0]) + heightRange[0];

    rects[i] = addRect(svg2, x, y, w, h, "#E2E3BD");
    rPos[i] = {"x":x, "y":y};
    rVel[i] = {"x":0, "y":0};
}








function bgUpdate(){
    for(let i = 0; i < circles.length; i++){
        // if(i == mouseControlled){
        //     circlePos[i].x = mousePos.x;
        //     circlePos[i].y = mousePos.y;
        //     circles[i].setAttribute("cx", circlePos[i].x);
        //     circles[i].setAttribute("cy", circlePos[i].y);
        //     continue;
        // }
        if(squareDist(circlePos[i], mousePos) > 10000 && squareDist(circlePos[i], mousePos) < 200000){
            circleVel[i].x += ((mousePos.x-circlePos[i].x)) * G / squareDist(circlePos[i], mousePos);
            circleVel[i].y += ((mousePos.y-circlePos[i].y)) * G / squareDist(circlePos[i], mousePos);
        }
        
        if(circlePos[i].x + circleVel[i].x >= xmax) {
            circlePos[i].x = 2*xmax - circleVel[i].x - circlePos[i].x;
            circleVel[i].x = -circleVel[i].x;
        }
        else if(circlePos[i].x + circleVel[i].x <= 0) {
            circlePos[i].x = -circleVel[i].x - circlePos[i].x;
            circleVel[i].x = -circleVel[i].x;
        }
        else{
            circlePos[i].x += circleVel[i].x;
        }

        if(circlePos[i].y + circleVel[i].y >= ymax) {
            circlePos[i].y = 2*ymax - circleVel[i].y - circlePos[i].y;
            circleVel[i].y = -circleVel[i].y;
        }
        else if(circlePos[i].y + circleVel[i].y <= 0) {
            circlePos[i].y = -circleVel[i].y - circlePos[i].y;
            circleVel[i].y = -circleVel[i].y;
        }
        else{
            circlePos[i].y += circleVel[i].y;
        }
        circles[i].setAttribute("cx", circlePos[i].x);
        circles[i].setAttribute("cy", circlePos[i].y);



        if(rPos[i].x + rVel[i].x >= xmax2) {
            rPos[i].x = 2*xmax2 - rVel[i].x - rPos[i].x;
            rVel[i].x = -rVel[i].x;
        }
        else if(rPos[i].x + rVel[i].x <= 0) {
            rPos[i].x = -rVel[i].x - rPos[i].x;
            rVel[i].x = -rVel[i].x;
        }
        else{
            rPos[i].x += rVel[i].x;
        }

        if(rPos[i].y + rVel[i].y >= ymax2) {
            rPos[i].y = 2*ymax2 - rVel[i].y - rPos[i].y;
            rVel[i].y = -rVel[i].y;
        }
        else if(rPos[i].y + rVel[i].y <= 0) {
            rPos[i].y = -rVel[i].y - rPos[i].y;
            rVel[i].y = -rVel[i].y;
        }
        else{
            rPos[i].y += rVel[i].y;
        }
        rects[i].setAttribute("x", rPos[i].x);
        rects[i].setAttribute("y", rPos[i].y);
    }
    
    setTimeout(() => bgUpdate(), 1000/60);
}

function bgPulse(){
    for(let i = 0; i < circles.length; i++){
        circleVel[i].x = (Math.random()>0.5?1:-1)*(Math.random()*(vRange[1]-vRange[0])+vRange[0]);
        circleVel[i].y = (Math.random()>0.5?1:-1)*(Math.random()*(vRange[1]-vRange[0])+vRange[0]);
        if(Math.random()<0.5) {
            rVel[i].x = 2*(Math.random()>0.5?1:-1)*(Math.random()*(vRange[1]-vRange[0])+vRange[0]);
            rVel[i].y = 0;
        }
        else {
            rVel[i].x = 0;
            rVel[i].y = 2*(Math.random()>0.5?1:-1)*(Math.random()*(vRange[1]-vRange[0])+vRange[0]);
        }
    }

    setTimeout(() => bgPulse(), Math.random()*(dtRange[1]-dtRange[0])+dtRange[0]);
}

bgPulse();
bgUpdate();


