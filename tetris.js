
class Tetris{
  constructor(imageX, imageY, template){
    this.x = canvas.width/2;
    this.template = template;
    this.imageX = imageX;
    this.imageY = imageY;
    this.speed = 240/framePerSecond;
    this.size = 40;
    //this.yReal = -this.template[0].length * this.size;
    this.yReal = -this.template[0].length * this.size;
    this.y = this.yReal - this.yReal % this.size;
    this.isBottom = false;
    this.isLeftClear = true;
    this.isRigthClear = true;
  }
  
  show(){
    //drawing image (image, imageX, imageY, width, heigth, the width wanted, the heigth wanted)
    for(var i =0; i < this.template[0].length; i++) {
      for(var j =0; j < this.template[0].length; j++){
        if(this.template[i][j] == 1){
          canvasContext.drawImage(image, this.imageX, this.imageY, 24, 24, this.x + j * this.size , this.y + i * this.size, this.size, this.size); 
        }
      }
    }
  }

  move(){
    this.numberOfFlats = 0;
    for(var i = 0; i < this.template[0].length; i++){
      for(var j = 0; j < this.template[0].length; j++){
        if(this.template[i][j] == 1){
          this.numberOfFlats++;
          j = this.template[0].length - 1;
        }
      }
    }
    if(this.template[0].length == 3 && this.numberOfFlats == 2 && this.template[0][0] != 1 && this.template[0][1] != 1 && this.template[0][2] != 1){
      this.numberOfFlats++;
    }
    if(this.template[0].length == 4 && this.template[2][0] == 1 && this.y == canvas.height - 3 * this.size ){
      this.isBottom = true;
    }

    if(this.y == canvas.height - this.numberOfFlats * this.size){
      this.isBottom = true;
    }

    for(var i = 0; i < this.template[0].length; i++){
      for(var j = this.template[0].length - 1; j >=0; j--){
        if( this.y / this.size + 5 + j >= 24 ){

        } 
        else if(this.template[j][i] == 1 && gameMatris[ this.y / this.size + 5 + j][this.x/ this.size + i] == 1){
          this.isBottom = true;
          j = 0; 
        }
        if(this.y < 0 && this.isBottom){
          gameOver = true;
        }
      }
    } 
    if(this.y < canvas.height - this.numberOfFlats * this.size && !this.isBottom){
      this.yReal += this.speed;
      this.y = this.yReal - this.yReal % this.size;
    }
       
  }


  update(){
    this.move();
    this.show();
  }
  
  checkLeft(){
    this.numberOfEmptyColumnsAtLeft =0;
    loop1:
    for(var i = 0; i < this.template[0].length; i++){
      for(var j = 0; j < this.template[0].length; j++){
        if(this.template[j][i] == 0){
          this.numberOfEmptyColumnsAtLeft += 1/this.template[0].length;
        }
        else {
          break loop1;
        }
      }
    }
    this.numberOfEmptyColumnsAtLeft -= this.numberOfEmptyColumnsAtLeft % 1;
    for(var i = 0; i < this.template[0].length; i++){
      for(var j = 0; j < this.template[0].length; j++){
        if(this.template[j][i] == 1 && gameMatris[this.y/ this.size + j + 4][this.x/ this.size + i - 1] == 1){
          this.isLeftClear = false;

        }
      }
    }
    if(this.x == -this.numberOfEmptyColumnsAtLeft * this.size){
      this.isLeftClear = false;
    }
  }

  moveLeft(){ 
    if(this.isLeftClear){
      this.x -= this.size;
      this.isRigthClear = true;
    }
  }

  checkRight(){
    this.numberOfEmptyColumnsAtRight = 0;
    loop1:
    for(var i = this.template[0].length - 1;i >= 0; i--){
      for(var j = 0; j < this.template[0].length; j++){
        if(this.template[j][i] == 0){
          this.numberOfEmptyColumnsAtRight += 1 / this.template[0].length;
        }
        else {
          break loop1;
        }
      }
    }
    this.numberOfEmptyColumnsAtRight -= this.numberOfEmptyColumnsAtRight% 1;
    for(var i = this.template[0].length - 1; i >= 0; i--){
      for(var j = 0; j < this.template[0].length; j++){
        if(this.template[j][i] == 1 && gameMatris[this.y/ this.size + j + 4][this.x/ this.size + i + 1] == 1){
          this.isRigthClear = false;
        }
      }
    }

    if(this.x == canvas.width - this.template[0].length * this.size + this.numberOfEmptyColumnsAtRight * this.size){
      this.isRigthClear = false;
    }

  }

  moveRight(){ 
    if(this.isRigthClear){
      this.x += this.size;
      this.isLeftClear = true;
    }
  }

  moveBottom(){
    for(var i = 0; i < this.template[0].length; i++){
      for(var j = this.template[0].length - 1; j >=0; j--){
        if(this.template[j][i] == 1 && gameMatris[ this.y / this.size + 4 + j][this.x/ this.size + i] == 1){
          this.isBottom = true;
          j = 0; 
        }
      }
    }
    if(this.template[0].length == 4 && this.template[2][0] == 1 && this.y == canvas.height - 3 * this.size ){
      this.isBottom = true;
    }

    if(!this.isBottom && this.y > this.numberOfFlats * this.size){
      this.yReal += this.size;
      this.y = this.yReal - this.yReal % this.size;
      score += 10;
    }
  }

  changeRotation() {
    var newTemplate = [];
    var array;
    for(var i = 0; i < this.template[0].length; i++) {
      array = [];
      for(var j = 0; j < this.template[0].length; j++) {
        array.push(this.template[-j + this.template[0].length - 1][i]);
      }
      newTemplate[i] = array;    
    }
    if(this.isLeftClear && this.isRigthClear){
      this.template = newTemplate;
    }
  }
}
var gameOver = false;
var size = 40;
var framePerSecond = 60;
var canvas = document.getElementById('canvas');
var image = document.getElementById('image');
var canvasContext = canvas.getContext('2d');
var scoreCanvas = document.getElementById('scoreCanvas');
var scoreCanvasContext = scoreCanvas.getContext('2d');
var squareSize = 24;
var gameMatris = [];
var array;
var shapes = [new Tetris( 0, 120,[[0,1,0], [0,1,0],[1,1,0]]),
              new Tetris( 0, 96,[[0,0,0],[1,1,1], [0,1,0]]),
              new Tetris( 0, 72, [[0,1,0], [0,1,0], [0,1,1]]),
              new Tetris( 0, 48, [[0,0,0], [0,1,1], [1,1,0]],),
              new Tetris( 0, 24, [[0,0,1,0],  [0,0,1,0],  [0,0,1,0],  [0,0,1,0]]),
              new Tetris( 0, 0, [[1,1], [1,1]]),
              new Tetris( 0, 144, [[0,0,0], [1,1,0], [0,1,1]])
              ]
var currentShape = shapes[Math.floor(Math.random() * shapes.length)];
var onScreen = [];
var particles = [];
var matrisForm = [];
var score = 0;

window.onload = function(){
  gameLoop();
}
function gameLoop(){
  setInterval(show, 1000/framePerSecond);
}

function show(){
  update();
  draw();
}

function update(){  
  canvasContext.clearRect(0, 0, canvas.width, canvas.height);
  deleteCompleteLines();
  updateMatris();

}

function draw(){
  canvasContext.fillStyle = '#E6E6FA';
  canvasContext.fillRect(0,0, canvas.width, canvas.height);
  canvasContext.beginPath();
  canvasContext.lineWidth = '2';
  canvasContext.strokeStyle = 'white';
  for(var i = 0; i < canvas.width; i+=size){
    for(var j = 0; j < canvas.height; j+=size){
      canvasContext.rect(i, j, size, size);
    }
  }
  canvasContext.stroke(); 
  if( !gameOver && currentShape.isBottom){
    var randomNumber = Math.floor(Math.random() * 3);
    for(var i = 0; i < currentShape.template[0].length; i++){
      for(var j = 0; j < currentShape.template[0].length; j++){
        if(currentShape.template[i][j] == 1){
          particles.push([currentShape.x + j * size, currentShape.y + i * size, currentShape.imageX, currentShape.imageY])
        }
      }
    }
    currentShape = shapes[randomNumber];
    shapes.splice(randomNumber, 1);
    shapes.push(new Tetris(currentShape.imageX, currentShape.imageY, currentShape.template));
  }
  currentShape.update();
  showParticles();
  if(gameOver){
    canvasContext.font = "bold 70px Courier New";
    canvasContext.textAlign = "center";
    canvasContext.fillStyle = "white";
    canvasContext.strokeStyle = "#8A2BE2";
    canvasContext.fillText("GAME OVER" ,canvas.width/2, canvas.height /2);
    canvasContext.strokeText("GAME OVER", canvas.width/2, canvas.height/2);
  }
  drawScore();
}

window.addEventListener('keydown', event => {
  if(event.keyCode == 37){
    currentShape.checkLeft();
    currentShape.moveLeft();
    currentShape.checkLeft();
  }
  else if(event.keyCode == 38){
    currentShape.changeRotation();
  }
  else if(event.keyCode == 39) {
    currentShape.checkRight();
    currentShape.moveRight();
    currentShape.checkRight();
  }
  else if(event.keyCode == 40) {
    currentShape.moveBottom();
  }
})


function updateMatris(){  
  gameMatris = [];
  for(var i = 0; i < (canvas.height + 4 * size)/ size; i++) {
    array = [];
    for(var j = 0; j < canvas.width / size; j++) {
      array.push(0);
    }
    gameMatris[i] = array;
  }
  for(var i = 0; i < particles.length; i++){
    gameMatris[particles[i][1]/size + 4][particles[i][0]/size] = 1;
  }
}

function showParticles(){
  for(var i = 0; i < particles.length; i++){
    canvasContext.drawImage(image, particles[i][2], particles[i][3], 24, 24, particles[i][0], particles[i][1], size, size); 
  }
}

function deleteCompleteLines(){
  for(var i = gameMatris.length - 1; i > 0; i--){
    if(!gameMatris[i].includes(0)){
      for(var j = 0; j < particles.length; j++){
        if(particles[j][1]/size == i - 4) {
          particles.splice(j, 1);
          j--
        }
      } 
      for(var j = 0; j < particles.length; j++){
        if(particles[j][1]/ size < i - 4){
          particles[j][1] += size;
        }
      }
      score +=300;
    }
    updateMatris();  }
}

function drawScore(){
  scoreCanvasContext.fillStyle = '#E6E6FA';
  scoreCanvasContext.fillRect(0, 0, scoreCanvas.width, scoreCanvas.height);
  scoreCanvasContext.strokeStyle = "#8A2BE2";
  scoreCanvasContext.fillStyle = 'white';
  scoreCanvasContext.font = 'bolder 50px Courier New';
  scoreCanvasContext.textAlign = 'center';
  scoreCanvasContext.lineWidth = 2;
  scoreCanvasContext.fillText("SCORE", scoreCanvas.width/2, 70);
  scoreCanvasContext.strokeText('SCORE', scoreCanvas.width/2, 70);
  scoreCanvasContext.fillText(score, scoreCanvas.width/2, 140);
  scoreCanvasContext.lineWidth = 3;
  scoreCanvasContext.strokeText(score, scoreCanvas.width/2, 140);
}
