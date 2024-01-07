function bfs(gridLayout, gridSize, sp, fp){
    M = gridSize[0];
    N = gridSize[1];
    sr = sp[0];
    sc = sp[1];
    fr = fp[0];
    fc = fp[1];
    
    let map = gridLayout;
    
    let step = new Array(M).fill(-1).map(() => new Array(N).fill(-1));
    for(let i = 0; i < M; i++) for(let j = 0; j < N; j++) if(map[i][j] == -1){
        step[i][j] = 1000000;
        addObstacle(i, j);
    }
    
    step[sr][sc] = 0;
    
    let qr = [sr];
    let qc = [sc];
    
    let cr = 0;
    let cc = 0;
    
    let lr = -1;
    let lc = -1;
    
    function stp(){
        addDiscard(cr, cc);
        cr = qr.shift();
        cc = qc.shift();
        addCur(cr, cc);
    
        if(cr == fr && cc == fc) {
            endSeq();
            return;
        }
    
        if(cr > 0){
            if(step[cr-1][cc] ==-1){
                step[cr-1][cc] = step[cr][cc]+1;
                qr.push(cr-1);
                qc.push(cc);
                addQueue(cr-1, cc);
            }
        }
    
        if(cr < M-1){
            if(step[cr+1][cc] ==-1){
                step[cr+1][cc] = step[cr][cc]+1;
                qr.push(cr+1);
                qc.push(cc);
                addQueue(cr+1, cc);
            }
        }
        if(cc > 0){
            if(step[cr][cc-1] ==-1){
                step[cr][cc-1] = step[cr][cc]+1;
                qr.push(cr);
                qc.push(cc-1);
                addQueue(cr, cc-1);
            }
        }
    
        if(cc < N-1){
            if(step[cr][cc+1] ==-1){
                step[cr][cc+1] = step[cr][cc]+1;
                qr.push(cr);
                qc.push(cc+1);
                addQueue(cr, cc+1);
            }
        }
    
        if(qr.length == 0) return 0;
    
        setTimeout(() => stp(), 5000/speed);
    }
    stp();  

    function endSeq(){
        isRunning = false;
        onAlgorithmEnd();
    }
    
}
    
function startBFS(){
    bfs(gridLayout, gridSize, [0,0], [gridSize[0]-1, gridSize[1]-1]);
}

    