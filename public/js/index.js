window.addEventListener("mousedown", (e) => {
    if(e.button == 0) leftClickHeld = true;
    else if (e.button > 0) rightClickHeld = true;
})

window.addEventListener("mouseup", (e) => {
    if(e.button == 0) leftClickHeld = false;
    else if (e.button > 0) rightClickHeld = false;
})










function drawObstacle(r, c){
    gridLayout[r][c] = -1;
    addObstacle(r, c);
}

function clearObstacle(r, c){
    gridLayout[r][c] = 1;
    if(isWeighted) assignWeight(r, c);
    else clearCell(r, c);
}

function handleCellClick(e, r, c){
    if(isRunning) return;

    e.preventDefault();

    if(e.button == 0){
        drawObstacle(r, c);
    }
    else clearObstacle(r, c);
}

function handleCellHover(e, r, c){
    if(isRunning) return;

    if(leftClickHeld){
        drawObstacle(r, c);
        return;
    }
    if(rightClickHeld){
        clearObstacle(r, c);
        return;
    }
}

function getPWeight(w, low, high){
    return (w - low) / (high - low)
}

function assignWeight(r, c){
    let w = Math.floor(Math.random()*(weightRange[1] - weightRange[0] + 1))+weightRange[0];
    let pw = getPWeight(w, weightRange[0], weightRange[1]);
    gridLayout[r][c] = w;
    addWeight(r,c,pw, w);
}

function clearWeight(r, c){

}

function initializeGrid(elm, M, N){
    elm.style.gridTemplateColumns = "repeat("+N+", minmax(0, 1fr))";
    for(let i = 0; i < M; i++) for(let j = 0; j < N; j++) {
        let cell = document.createElement("div");
        cell.classList.add("r"+i+"c"+j);
        cell.classList.add("gridElement");
        cell.addEventListener("mouseover", (e) => handleCellHover(e, i, j));
        cell.addEventListener("mousedown", (e) => handleCellClick(e, i, j));
        cell.addEventListener("contextmenu", (e) => e.preventDefault());
        elm.appendChild(cell);
    }
}

function clearProgram(){
    for(let i = 0; i < gridSize[0]; i++) for(let j = 0; j < gridSize[1]; j++) {
        if(gridLayout[i][j] == -1){
            clearObstacle(i, j);
        }
        else{
            addWeight(i, j, getPWeight(gridLayout[i][j], weightRange[0], weightRange[1]), gridLayout[i][j]);
        }
    }
    document.querySelector(".svg_overlay_0").innerHTML = "";
    document.querySelector(".svg_overlay_1").innerHTML = "";
}

function updateGridSize(nr, nc){
    let gridElm = document.querySelector(".grid");
    gridElm.innerHTML = "";
    initializeGrid(gridElm, nr, nc);

    gridBackupLayout = structuredClone(gridLayout);
    gridLayout = new Array(nr).fill(1).map(() => new Array(nc).fill(1));
    for(let i = 0; i < gridSize[0]; i++) for(let j = 0; j < gridSize[1]; j++){
        if(i<nr && j<nc){
            if(gridBackupLayout[i][j] < 0) addObstacle(i, j);
            gridLayout[i][j] = gridBackupLayout[i][j];
        }
    }

    gridBackupLayout = structuredClone(gridLayout);
    gridSize = [nr, nc];
}

function updateCellWeights(){
    if(!isWeighted) {
        for(let i = 0; i < gridSize[0]; i++) for(let j = 0; j < gridSize[1]; j++) {
            if(gridLayout[i][j] != -1) {
                gridLayout[i][j] = 1;
            }
        }
        return;
    }

    for(let i = 0; i < gridSize[0]; i++) for(let j = 0; j < gridSize[1]; j++) {
        if(gridLayout[i][j] != -1) {
            assignWeight(i, j);
        }
    }
}

function updateAlgoirthmType(){

}




function startDIJ(){
    dij(gridLayout, gridSize, [0,0], [gridSize[0]-1, gridSize[1]-1]);
}

function startASTAR(){
    astar(gridLayout, gridSize, [0,0], [gridSize[0]-1, gridSize[1]-1]);
}

function loadParam(txt, div, tabelm){
    div.innerHTML = "";
    txt = txt.replaceAll("<s>", "<strong>");
    txt = txt.replaceAll("</s>", "</strong>");
    txt = txt.replaceAll("<t>", `<span class="`+tabelm+`"></span>`);
    let parsedString = txt.split('\n');
    console.log(parsedString);

    for(let i = 0; i < parsedString.length; i++){
        div.innerHTML += parsedString[i];
        div.innerHTML += "<br>";
    }
}

function loadDescription(type){
    fetch('./txt/param_'+type+'.txt')
        .then(response => response.text())
        .then(text => loadParam(text, document.querySelector(".param_pg"), "tab"));
    fetch('./txt/desc_'+type+'.txt')
        .then(response => response.text())
        .then(text => loadParam(text, document.querySelector(".method_pg"), "tab3"));
}

function switchType(type){
    currentSearchAlgorithm = type;
    loadDescription(type);
    if(type == "bfs") document.querySelector(".current_algoirthm_display").innerHTML = "Breadth-First Search";
    if(type == "dij") document.querySelector(".current_algoirthm_display").innerHTML = "Dijkstra's Algoirthm";
    if(type == "astar") document.querySelector(".current_algoirthm_display").innerHTML = "A* Algorithm";
}

function requestTypeSwitch(type){
    switchType(type);
}

function handleTypeSwitchClick(e, type){
    if(isRunning) return;

    if(e.button == 0){
        requestTypeSwitch(type);
        document.querySelector(".bfs").style.display = "none";
        document.querySelector(".dij").style.display = "none";
        document.querySelector(".astar").style.display = "none";
        setTimeout(()=>{
            document.querySelector(".bfs").style.display = "block";
            document.querySelector(".dij").style.display = "block";
            document.querySelector(".astar").style.display = "block";
            console.log("timeout");
        }, 200);
    }
}

var settingsOpen = false;

function refreshProgram(){
    if(isRunning) return;

    if(settingsOpen){
        return;
    }

    detailedView = input_divs.dv.checked;

    let nr = parseInt(input_divs.r.value);
    let nc = parseInt(input_divs.c.value);
    updateGridSize(nr, nc);

    let nspd = parseInt(input_divs.spd.value);
    speed = nspd;

    isWeighted = input_divs.wc.checked;

    if(isWeighted){
        let nwl = parseInt(input_divs.wl.value);
        let nwh = parseInt(input_divs.wh.value);
        weightRange = [nwl, nwh];
    }

    document.querySelector(".svg_overlay_0").innerHTML = "";
    document.querySelector(".svg_overlay_1").innerHTML = "";
    
    updateCellWeights();
}

function runProgram(){
    if(isRunning) return;

    if(isWeighted){
        if(currentSearchAlgorithm == "dij") {
            startDIJ();
            return;
        }
        if(currentSearchAlgorithm == "astar") {
            startASTAR();
            return;
        }
    }
    else{
        if(currentSearchAlgorithm == "bfs"){
            startBFS();
            return;
        }
        if(currentSearchAlgorithm == "dij") {
            startDIJ();
            return;
        }
    }

    alert("Invalid Algoirthm");
}


function openSettings(){
    settingsOpen = true;
    initializeInputs();
    document.querySelector(".settings_overlay").style.display = "flex";
}

function closeSettings(){
    settingsOpen = false;
    initializeInputs();
    document.querySelector(".settings_overlay").style.display = "none";
}

function handleSettingsClick(e){
    if(e.button != 0) return;
    if(settingsOpen) closeSettings();
    else openSettings();
}

function handleSettingsCancel(e){
    if(e.button != 0) return;
    closeSettings();
}

function handleSettingsApply(e){
    if(e.button != 0) return;
    settingsOpen = false;
    refreshProgram();
    closeSettings();
    // setTimeout(() => closeSettings(), 1500);
}



function defaultProgram(){
    if(isRunning) return;

    // closeSettings();

    input_divs.r.value = 10;
    input_divs.c.value = 10;
    updateGridSize(10, 10);

    input_divs.spd.value = 100;
    speed = 700;

    isWeighted = false;
    input_divs.wc.checked = false;

    input_divs.wl.value = 2;
    input_divs.wh.value = 10;
    weightRange = [2, 10];
    updateCellWeights();

    detailedView = false;

    switchType("bfs");
}

defaultProgram();

document.querySelector(".bfs").addEventListener("click", (e) => handleTypeSwitchClick(e, "bfs"));
document.querySelector(".dij").addEventListener("click", (e) => handleTypeSwitchClick(e, "dij"));
document.querySelector(".astar").addEventListener("click", (e) => handleTypeSwitchClick(e, "astar"));

document.querySelector(".settings_apply").addEventListener("click", (e) => {handleSettingsApply(e)});
document.querySelector(".settings_cancel").addEventListener("click", (e) => {handleSettingsCancel(e)});

document.querySelector(".settings_button").addEventListener("click", (e) => {handleSettingsClick(e)})
document.querySelector(".clear_button").addEventListener("click", () => {clearProgram()});
document.querySelector(".restore_button").addEventListener("click", () => {defaultProgram()});
document.querySelector(".refresh_button").addEventListener("click", () => {refreshProgram()});
document.querySelector(".play_button").addEventListener("click", () => {runProgram()});