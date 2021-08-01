const canvas = document.getElementById('canvas');
const decrease = document.getElementById('decrease');
const increase = document.getElementById('increase');
const size = document.getElementById('size');
const color = document.getElementById('color');
const clear = document.getElementById('clear');
const zim = canvas.getContext('2d');
let sizeLength = 30;
let isPressed = false;
let colorName = 'black';
let x = undefined;
let y = undefined;
canvas.addEventListener('mousedown',(event) => {
     isPressed = true;
     x = event.offsetX;
     y = event.offsetY;
});
canvas.addEventListener('mouseup',(event) => {
     isPressed = false;
     x = undefined;
     y = undefined;
});
canvas.addEventListener('mousemove',(event) => {
     if(isPressed){
          const x2 = event.offsetX;
          const y2 = event.offsetY;
          drawCircle(x2,y2);
          drawLine(x,y,x2,y2);
          x = x2;
          y = y2;
     }
});
function drawCircle(x,y){
     zim.beginPath();
     zim.arc(x,y,sizeLength,0,Math.PI * 2);
     zim.fillStyle = colorName;
     zim.fill();
}
function drawLine(x1,y1,x2,y2){
     zim.beginPath();
     zim.moveTo(x1,y1);
     zim.lineTo(x2,y2);
     zim.strokeStyle = colorName;
     zim.lineWidth = sizeLength * 2;
     zim.stroke();
}
decrease.addEventListener('click',() => {
     sizeLength -= 5;
     if(sizeLength < 5){
          sizeLength = 5;
     }
     updateSizeOnScreen();
});
increase.addEventListener('click',() => {
     sizeLength += 5;
     if(sizeLength > 50){
          sizeLength = 50;
     }
     updateSizeOnScreen();
});
color.addEventListener('change',(event) => {
     colorName = event.target.value;
});
clear.addEventListener('click',() => {
     zim.clearRect(0,0,canvas.width,canvas.height);
});
function updateSizeOnScreen(){
     size.innerText = sizeLength;
}