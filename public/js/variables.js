var gridLayout = new Array(10).fill(0).map(() => new Array(10).fill(0));
var gridBackupLayout = new Array(10).fill(0).map(() => new Array(10).fill(0));
var gridSize = [10,10];
var weightRange = [0,10];


var leftClickHeld = false;
var rightClickHeld = false;

var isWeighted = false;

var currentSearchAlgorithm = "bfs";
var isInvalid = false;

var speed = 100;

var isRunning = false;

var detailedView = false;

var input_divs = {
    "r":    document.querySelector(".rows_input"),
    "c":    document.querySelector(".cols_input"),
    "spd":  document.querySelector(".spd_input"),
    "wl":   document.querySelector(".weight_min"),
    "wh":   document.querySelector(".weight_max"),
    "wc":   document.querySelector(".weighted_toggle"),
    "dv":   document.querySelector(".detail_toggle"),
}