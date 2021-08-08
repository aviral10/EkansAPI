// GLOBAL Ingridients

let GLOBAL_SIZE = 30;
let wid = 1380, hei = 600;
let canv:p5.Element;
let grid:any;
let inter:any;
function setup(): void {
    console.log("Setup initialized - P5 is running");
    frameRate(60);
    
    canv = createCanvas(wid, hei)
    canv.parent("canv_holder") 
    
    frameRate(10);
    // noLoop();
    inter = setInterval(()=>{
        getGrid();
    },10);
}

let inter2:any;
function fush(){
    let x = 0;
    inter2 = setInterval(()=>{
        if(x >= 5){
            clearInterval(inter2);
        }else{
            postData([1,1]);
            x++;
        }
    },100);
        
}

function postData(val=[0,0]){
    const data = { snake: val[0], food: val[1] };

    fetch('http://127.0.0.1:3000/advance', {
        method: 'POST', // or 'PUT'
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });

}

function getGrid(){
    fetch('http://127.0.0.1:3000/gridState')
    .then(data => {
        return data.json();
    }).then(gr => {
        grid = gr;
        if(grid === undefined){
            return false;
        }
    });
    
}
  

function draw(): void{
    background(240);
    if(grid===undefined){
        return;
    }
    for(let i=0;i<grid.length;i++){
        for(let j=0;j<grid[0].length;j++){
            let ele = [grid[i][j].row, grid[i][j].col];
            if(grid[i][j].isBlocked && grid[i][j].isDisabled){
                push()
                noStroke();
                let c = color(120, 64, 0);
                fill(c);
                // rectMode(CENTER);
                square(ele[1]*GLOBAL_SIZE, ele[0]*GLOBAL_SIZE, GLOBAL_SIZE);
                pop()
            }else if(grid[i][j].isDisabled){
                noStroke();
                let c = color(50, 55, 100);
                fill(c);
                square(ele[1]*GLOBAL_SIZE, ele[0]*GLOBAL_SIZE, GLOBAL_SIZE);
            }else if(grid[i][j].hasFood){
                push()
                noStroke();
                let c = color(212, 0, 0);
                fill(c);
                square(ele[1]*GLOBAL_SIZE, ele[0]*GLOBAL_SIZE, GLOBAL_SIZE);
                pop()
            }
        }
    }
    
    
}
