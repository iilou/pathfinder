function basicDIJ(map, M, N, sr, sc, fr, fc){
    var dist = new Array(M).fill(-1).map(() => new Array(N).fill(-1));
    var vis = new Array(M).fill(false).map(() => new Array(N).fill(false));
    let qr = [sr];
    let qc = [sc];
    let cr = 0;
    let cc = 0;
    let cm = 0;
    let ci = 0;
    while(true){
        cm = 100000;
        for(let i = 0; i < qr.length; i++){
            if(dist[qr[i]][qc[i]] < cm){
                cm = dist[qr[i]][qc[i]];
                ci = i;
            }
        }
        cr = qr[ci];
        cc = qc[ci];
        qr.splice(ci, 1);
        qc.splice(ci, 1);
        if(cr == fr && cc == fc) break;
        vis[cr] = true;
        vis[cc] = true;
        if(cr > 0 && map[cr-1][cc] != -1 && !vis[cr-1][cc] && (dist[cr-1][cc] == -1 || dist[cr-1][cc] > dist[cr][cc] + map[cr-1][cc])){
            if(dist[cr-1][cc] == -1){
                qr.push(cr-1);
                qc.push(cc);
            }
            dist[cr-1][cc] = dist[cr][cc] + map[cr-1][cc];
        }
        if(cr < M-1 && map[cr+1][cc] != -1 && !vis[cr+1][cc] && (dist[cr+1][cc] == -1 || dist[cr+1][cc] > dist[cr][cc] + map[cr+1][cc])){
            if(dist[cr+1][cc] == -1){
                qr.push(cr+1);
                qc.push(cc);
            }
            dist[cr+1][cc] = dist[cr][cc] + map[cr+1][cc];
        }

        if(cc > 0 && map[cr][cc-1] != -1 && !vis[cr][cc-1] && (dist[cr][cc-1] == -1 || dist[cr][cc-1] > dist[cr][cc-1] + map[cr][cc-1])){
            if(dist[cr][cc-1] == -1){
                qr.push(cr);
                qc.push(cc-1);
            }
            dist[cr][cc-1] = dist[cr][cc] + map[cr][cc-1];
        }
        if(cc < N-1 && map[cr][cc+1] != -1 && !vis[cr][cc+1] && (dist[cr][cc+1] == -1 || dist[cr][cc+1] > dist[cr][cc+1] + map[cr][cc+1])){
            if(dist[cr][cc+1] == -1){
                qr.push(cr);
                qc.push(cc+1);
            }
            dist[cr][cc+1] = dist[cr][cc] + map[cr][cc+1];
        }
        if(qr.length == 0) break;
    }
    return dist[fr][fc];
}

function dij(gridLayout, gridSize, sp, fp){
    isRunning = true;

    let sr = sp[0];
    let sc = sp[1];
    let fr = fp[0];
    let fc = fp[1];
    let M = gridSize[0];
    let N = gridSize[1];

    let pr = new Array(M).fill(-1).map(() => new Array(N).fill(-1));
    let pc = new Array(N).fill(-1).map(() => new Array(N).fill(-1));
    var dist = new Array(M).fill(-1).map(() => new Array(N).fill(-1));
    var vis = new Array(M).fill(false).map(() => new Array(N).fill(false));

    var lineList = new Array(M).fill(-1).map(() => new Array(N).fill(-1));
    var circleList = new Array(M).fill(-1).map(() => new Array(N).fill(-1));
    var hasCircle = new Array(M).fill(false).map(() => new Array(N).fill(false));
    
    var map = gridLayout;

    pr[sr][sc] = sr;
    pc[sr][sc] = sc;
    dist[sr][sc] = 0;

    var svgLine = getSVG(0);
    var svgCircle = getSVG(1);
    
    var gridBounding = document.querySelector(".grid").getBoundingClientRect();
    svgLine.setAttribute("width", gridBounding.width);
    svgCircle.setAttribute("width", gridBounding.width);
    svgLine.setAttribute("height", gridBounding.height);
    svgCircle.setAttribute("height", gridBounding.height);
    svgLine.style.left = gridBounding.x + "px";
    svgCircle.style.left = gridBounding.x + "px";
    svgLine.style.top = gridBounding.y + "px";
    svgCircle.style.top = gridBounding.y + "px";

    var delta = document.querySelector(".r0c1").getBoundingClientRect().x - document.querySelector(".r0c0").getBoundingClientRect().x; 
    var baseX = document.querySelector(".r0c0").getBoundingClientRect().x + document.querySelector(".r0c0").getBoundingClientRect().width/2 - gridBounding.x;
    var baseY = document.querySelector(".r0c0").getBoundingClientRect().y + document.querySelector(".r0c0").getBoundingClientRect().height/2 - gridBounding.y;

    let qr = [sr];
    let qc = [sc];

    let cr = 0;
    let cc = 0;
    let cm = 0;
    let ci = 0;



    //change weight editing -> improve reste after algo finish




    let maxDist = basicDIJ(map, M, N, sr, sc, fr, fc);

    function newLine(r1, c1, r2, c2, color="black"){
        return addLine(svgLine, baseX + c1 * delta, baseY + r1 * delta, baseX + c2 * delta, baseY + r2 * delta, color, "7");
    }
    
    for(let i = 0; i < M; i++) for(let j = 0; j < N; j++) circleList[i][j] = addCircle(-1, baseX + j*delta, baseY + i*delta, '8');
    function updateCircle(r, c, toUpdate=false){
        if(toUpdate) {
            circleList[r][c].setAttribute('fill', 'hsl('+ Math.min(121 + 220*dist[r][c]/maxDist, 359) + ', 51%, 60%)');
        }
        
        if(hasCircle[r][c]) svgCircle.removeChild(circleList[r][c]);
        else hasCircle[r][c] = true;
        svgCircle.appendChild(circleList[r][c]);
    }

    function stp(){
        cm = 100000;
        for(let i = 0; i < qr.length; i++){
            if(dist[qr[i]][qc[i]] < cm){
                cm = dist[qr[i]][qc[i]];
                ci = i;
            }
        }
        
        addWeight(cr, cc, getPWeight(map[cr][cc], weightRange[0], weightRange[1]), map[cr][cc]);
        cr = qr[ci];
        cc = qc[ci];
        addCur(cr, cc);

        qr.splice(ci, 1);
        qc.splice(ci, 1);

        if(cr == fr && cc == fc) {
            endSeq();
            return;
        }

        vis[cr] = true;
        vis[cc] = true;

        if(cr > 0){
            if(map[cr-1][cc] != -1 && !vis[cr-1][cc] && (dist[cr-1][cc] == -1 || dist[cr-1][cc] > dist[cr][cc] + map[cr-1][cc])){
                
                if(dist[cr-1][cc] == -1){
                    qr.push(cr-1);
                    qc.push(cc);
                    addQueue(cr-1, cc);
                }

                else{ // already explored
                    lineList[cr-1][cc].remove();
                }

                dist[cr-1][cc] = dist[cr][cc] + map[cr-1][cc];

                lineList[cr-1][cc] = newLine(cr, cc, cr-1, cc);
                updateCircle(cr-1, cc, true);
                updateCircle(cr, cc);
                pr[cr-1][cc] = cr;
                pc[cr-1][cc] = cc;
            }
        }
    
        if(cr < M-1){
            if(map[cr+1][cc] != -1 && !vis[cr+1][cc] && (dist[cr+1][cc] == -1 || dist[cr+1][cc] > dist[cr][cc] + map[cr+1][cc])){
                if(dist[cr+1][cc] == -1){
                    qr.push(cr+1);
                    qc.push(cc);
                    addQueue(cr+1, cc);
                }

                else{ // already explored
                    lineList[cr+1][cc].remove();
                }

                dist[cr+1][cc] = dist[cr][cc] + map[cr+1][cc];
                lineList[cr+1][cc] = newLine(cr, cc, cr+1, cc);
                updateCircle(cr+1, cc, true);
                updateCircle(cr, cc);
                pr[cr+1][cc] = cr;
                pc[cr+1][cc] = cc;
            }
        }

        if(cc > 0){
            if(map[cr][cc-1] != -1 && !vis[cr][cc-1] && (dist[cr][cc-1] == -1 || dist[cr][cc-1] > dist[cr][cc-1] + map[cr][cc-1])){
                if(dist[cr][cc-1] == -1){
                    qr.push(cr);
                    qc.push(cc-1);
                    addQueue(cr, cc-1);
                }

                else{ // already explored
                    lineList[cr1][cc-1].remove();
                }

                dist[cr][cc-1] = dist[cr][cc] + map[cr][cc-1];
                lineList[cr][cc-1] = newLine(cr, cc, cr, cc-1);
                updateCircle(cr, cc-1, true);
                updateCircle(cr, cc);
                pr[cr][cc-1] = cr;
                pc[cr][cc-1] = cc;
            }
        }
    
        if(cc < N-1){
            if(map[cr][cc+1] != -1 && !vis[cr][cc+1] && (dist[cr][cc+1] == -1 || dist[cr][cc+1] > dist[cr][cc+1] + map[cr][cc+1])){
                if(dist[cr][cc+1] == -1){
                    qr.push(cr);
                    qc.push(cc+1);
                    addQueue(cr, cc+1);
                }

                else{ // already explored
                    lineList[cr1][cc+1].remove();
                }

                dist[cr][cc+1] = dist[cr][cc] + map[cr][cc+1];
                lineList[cr][cc+1] = newLine(cr, cc, cr, cc+1);
                updateCircle(cr, cc+1, true);
                updateCircle(cr, cc);
                pr[cr][cc+1] = cr;
                pc[cr][cc+1] = cc;
            }
        }

        if(qr.length == 0) {
            alert("no solution")
            return;
        }

        setTimeout(() => stp(), 5000/speed);
    }

    stp();

    function endSeq(){
        let cr = fr;
        let cc = fc;
        let nr = cr;
        let nc = cc;
        while(cr != sr || cc != sc){
            console.log(cr, cc, pr[cr][cc], pc[cr][cc]);
            newLine(cr, cc, pr[cr][cc], pc[cr][cc], "red");
            updateCircle(cr, cc);
            updateCircle(pr[cr][cc], pc[cr][cc]);
            nr=pr[cr][cc];
            nc=pc[cr][cc];
            cr = nr;
            cc = nc;
        }

        isRunning = false;
    }

    console.log(pr, pc);
}

function dijDesc(){

}

function dijSampleJava(){
    return ""
}