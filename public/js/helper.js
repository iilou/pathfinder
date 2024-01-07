function changeTile(r, c, color){
    document.querySelector(".r"+r+"c"+c).style.backgroundColor = color;
}

function changeTileText(r, c, text){
    document.querySelector(".r"+r+"c"+c).innerHTML = text;
}

function addCur(r,c){
    changeTile(r, c, "#FFAEC9");
}

function addAdj(r,c){
}

function addQueue(r, c){
    changeTile(r, c, "#99D9EA");
}

function addNext(r, c){
}

function addObstacle(r, c){
    changeTile(r, c, "#FFF200");
}

function addDiscard(r,c){
    changeTile(r, c, "#585858");
}

function clearCell(r, c){
    changeTile(r, c, "#808080");
    changeTileText(r, c, "");
}

function addWeight(r, c, pW, txt){
    changeTile(r, c, "rgb("+(196-pW*64)+","+(196-pW*64)+","+(196-pW*64)+")");
    if(detailedView) changeTileText(r, c, txt);
}






function squareDist(p, q){
    return (q.x-p.x)*(q.x-p.x)+(q.y-p.y)*(q.y-p.y);
}




function initializeInputs(){
    input_divs.r.value = gridSize[0];
    input_divs.c.value = gridSize[1];
    input_divs.spd.value = speed;
    input_divs.wl.value = weightRange[0];
    input_divs.wh.value = weightRange[1];
    input_divs.wc.checked = isWeighted;
    input_divs.dv.checked = detailedView;
}

function disableInputs(inputs){
    document.querySelector(".rows_input").readOnly = true;
    document.querySelector(".cols_input").readOnly = true;
    document.querySelector(".spd_input").readOnly = true;
    document.querySelector(".weight_min").readOnly = true;
    document.querySelector(".weight_max").readOnly = true;
    document.querySelector(".weighted_toggle").readOnly = true;
}

function enableInputs(inputs){
    document.querySelector(".rows_input").readOnly = false;
    document.querySelector(".cols_input").readOnly = false;
    document.querySelector(".spd_input").readOnly = false;
    document.querySelector(".weight_min").readOnly = false;
    document.querySelector(".weight_max").readOnly = false;
    document.querySelector(".weighted_toggle").readOnly = false;
}



function getSVG(num){
    return document.querySelector(".svg_overlay_"+num);
}

function addLine(svg, x1, y1, x2, y2, fill, size){
    var newLine = document.createElementNS('http://www.w3.org/2000/svg','line');
    newLine.setAttribute('x1', x1);
    newLine.setAttribute('y1', y1);
    newLine.setAttribute('x2', x2);
    newLine.setAttribute('y2', y2);
    newLine.setAttribute("stroke", fill);
    newLine.setAttribute("stroke-width", size);
    svg.appendChild(newLine);
    return newLine;
}

function addCircle(svg, x, y, r, fill=-1){
    var newCircle = document.createElementNS('http://www.w3.org/2000/svg','circle');
    newCircle.setAttribute('cx', x);
    newCircle.setAttribute('cy', y);
    newCircle.setAttribute('r', r);
    if(fill != -1) newCircle.setAttribute('fill', fill);
    if(svg != -1) svg.appendChild(newCircle);
    return newCircle;
}

function addRect(svg, x, y, w, h, fill=-1){
    var newCircle = document.createElementNS('http://www.w3.org/2000/svg','rect');
    newCircle.setAttribute('x', x);
    newCircle.setAttribute('y', y);
    newCircle.setAttribute('width', w);
    newCircle.setAttribute('height', h);
    if(fill != -1) newCircle.setAttribute('fill', fill);
    if(svg != -1) svg.appendChild(newCircle);
    return newCircle;
}