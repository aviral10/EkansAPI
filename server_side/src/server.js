let grid;
let GLOBAL_SIZE = 30;
let wid = 1380, hei = 600;
let larry;
let food = [];
let BLOCKS = [];
class Box {
    constructor(i, j) {
        this.hasFood = false;
        this.isDisabled = false;
        this.isBlocked = false;
        this.row = i;
        this.col = j;
    }
}

class Body_block {
    constructor(x, y) {
        this.row = x;
        this.col = y;
    }
    update(x, y) {
        grid[this.row][this.col].isDisabled = false;
        this.row = x;
        this.col = y;
        grid[this.row][this.col].isDisabled = true;
    }
}

class Snake {
    constructor(x = 2, y = 2) {
        this.body = [];
        this.current_direction = [0, 0];
        let temp = new Body_block(x, y);
        this.body.push(temp);
        this.body[0].update(x, y);
    }
    _advance(direction) {
        this.current_direction = direction;
        let nRow = this.body[0].row + direction[0];
        if (nRow < 0 || nRow >= grid.length){
            // nRow = grid.length - 1;
            return;
        }
        // nRow %= grid.length;
        let nCol = this.body[0].col + direction[1];
        if (nCol < 0 || nCol >= grid[0].length){
            // nCol = grid[0].length - 1;
            return;
        }
        // nCol %= grid[0].length;
        let nBlock = this.body.splice(this.body.length - 1, 1)[0];
        this.body.splice(0, 0, nBlock);
        this.body[0].update(nRow, nCol);
    }
}

function randomRange(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function generateFood(i = 0, j = 0) {
    if (i != 0 && j != 0) {
        food = [i, j];
        grid[i][j].hasFood = true;
        return;
    }
    let avai = [];
    for (let x = 3; x < grid.length; x += Math.floor(randomRange(1, 4))) {
        for (let y = 0; y < grid[0].length; y += Math.floor(randomRange(2, 6))) {
            if (grid[x][y].isDisabled == false) {
                avai.push([x, y]);
            }
        }
    }
    let ra = Math.floor(randomRange(0, avai.length));
    let rand = avai[ra];
    food = [rand[0], rand[1]];
    grid[food[0]][food[1]].hasFood = true;
}

function generateBlocks(num = 10, sz = 10) {
    let points = [];
    for (let i = 0; i < num; i++) {
        let x = Math.floor(randomRange(3, grid.length - 2));
        let y = Math.floor(randomRange(3, grid[0].length - 2));
        points.push([x, y]);
    }
    for (let i = 0; i < num; i++) {
        if (grid[points[i][0]][points[i][1]].isDisabled == false) {
            randomizedDFS_commence(points[i][0], points[i][1], sz);
        }
    }
}
function randomizedDFS_commence(i, j, TILL) {
    let visited = [];
    for (let i = 0; i < grid.length; i++) {
        let tp = [];
        for (let j = 0; j < grid[0].length; j++) {
            tp.push(false);
        }
        visited.push(tp);
    }
    let isValid = (i, j) => {
        if (i > 3 && j > 3 && i < grid.length - 2 && j < grid[0].length - 2) {
            if ((grid[i][j].isDisabled == false && grid[i][j].isBlocked == false) && visited[i][j] == false && grid[i][j].hasFood == false) {
                return true;
            }
        }
        return false;
    };
    function manhatten_dist(i, j, x, y) {
        return Math.abs(x - i) + Math.abs(y - j);
    }
    let farthest = 0;
    function DFS(x, y) {
        if (TILL <= 0) {
            return;
        }
        visited[x][y] = true;
        grid[x][y].isDisabled = true;
        grid[x][y].isBlocked = true;
        BLOCKS.push([x, y]);
        let neighbours = [];
        let hold = [x, y];
        let top = [hold[0] - 1, hold[1], manhatten_dist(i, j, hold[0] - 1, hold[1])];
        let bottom = [hold[0] + 1, hold[1], manhatten_dist(i, j, hold[0] + 1, hold[1])];
        let left = [hold[0], hold[1] - 1, manhatten_dist(i, j, hold[0], hold[1] - 1)];
        let right = [hold[0], hold[1] + 1, manhatten_dist(i, j, hold[0], hold[1] + 1)];
        let insideMx = 0;
        if (isValid(top[0], top[1]) && top[2] >= farthest) {
            neighbours.push([top[0], top[1]]);
            insideMx = Math.max(insideMx, top[2]);
        }
        if (isValid(right[0], right[1]) && right[2] >= farthest) {
            neighbours.push([right[0], right[1]]);
            insideMx = Math.max(insideMx, right[2]);
        }
        if (isValid(bottom[0], bottom[1]) && bottom[2] >= farthest) {
            neighbours.push([bottom[0], bottom[1]]);
            insideMx = Math.max(insideMx, bottom[2]);
        }
        if (isValid(left[0], left[1]) && left[2] >= farthest) {
            neighbours.push([left[0], left[1]]);
            insideMx = Math.max(insideMx, left[2]);
        }
        farthest = Math.max(farthest, insideMx);
        while (neighbours.length != 0) {
            let rval = Math.floor(randomRange(0,neighbours.length));
            let ob = neighbours[rval];
            neighbours.splice(rval, 1);
            if (visited[ob[0]][ob[1]] == false) {
                TILL--;
                DFS(ob[0], ob[1]);
            }
        }
    }
    DFS(i, j);
}


function foodEaten() {
    
}

function step(snk, fod) {
    let dir = {
        0: [-1,0],
        1: [0, 1],
        2: [1, 0],
        3: [0,-1]
    }
    
    advance_snake(dir[snk][0], dir[snk][1]);
    advance_food(dir[fod][0],dir[fod][1]);
}

function advance_snake(i,j) {
    // console.log("inside snake", dir);
    larry._advance([i, j]);
}

function advance_food(x, y) {
    let nRow = food[0] + x;
    if (nRow < 0 || nRow >= grid.length){
        // nRow = grid.length - 1;
        return;
    }
    // nRow %= grid.length;
    let nCol = food[1] + y;
    if (nCol < 0 || nCol >= grid[0].length){
        // nCol = grid[0].length - 1;
        return;
    }
    // nCol %= grid[0].length;
    grid[food[0]][food[1]].hasFood = false;
    food[0] = nRow;
    food[1] = nCol;
    grid[nRow][nCol].hasFood = true;
}

function grid_state() {
    let board = [];
    for (let i = 0; i < grid.length; i++) {
        let temp = [];
        for (let j = 0; j < grid[0].length; j++) {
            let val = 0;
            if (grid[i][j].isDisabled && grid[i][j].isBlocked) {
                val = -1;
            }
            else if (grid[i][j].isDisabled) {
                val = 1;
            }
            else if (grid[i][j].hasFood) {
                val = 2;
            }
            temp.push(val);
        }
        board.push(temp);
    }
    return board;
}

function reset() {
    grid = [];
    for (let i = 0; i < hei / GLOBAL_SIZE; i++) {
        let brid = [];
        for (let j = 0; j < wid / GLOBAL_SIZE; j++) {
            let temp = new Box(i, j);
            brid.push(temp);
        }
        grid.push(brid);
    }
    larry = new Snake();
    let _points = grid.length > 20 ? 30 : 20;
    let _len = Math.floor((5 / 41) * grid[0].length);
    BLOCKS = [];
    generateBlocks(_points, 5);
    generateFood();
}


import express from 'express'
import cors from 'cors'
let port = 3000

const app = express();
app.use(cors({
    origin: "http://localhost:3001",
}))
import ej from 'ejs'
import fs from 'fs';

import bodyParser from 'body-parser'



app.set('view engine', 'ejs');
app.engine('html', ej.renderFile);


app.use(express.json());    // to support JSON-encoded bodies
app.use(express.urlencoded()); //to support url encoding


// Front page display
app.get('/hello', (req,res) => {
    reset();
    // console.log(grid);
    // fs.writeFile("test.txt", JSON.stringify(BLOCKS), function(err) {
    //     if(err) {
    //         return console.log(err);
    //     }
    //     console.log("The file was saved!");
    // }); 
    res.render("index.html");
});

// GET request
app.get('/gridState', (req,res) => {
    res.json(grid);
});

// POST request
app.post('/advance', function(req, res) {
    // console.log(typeof req.body['snake'],typeof req.body['food']);
    step(parseInt(req.body['snake']), parseInt(req.body['food']));
    res.json("Succ");
});

app.listen(port, () => {
    reset();
    console.log("Server running");
})

app.use(express.static('public'))