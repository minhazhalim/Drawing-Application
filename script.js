const tool = document.querySelectorAll('.tool');
const colorButtons = document.querySelectorAll('.colors .option');
const fillColor = document.querySelector('#fill-color');
const sizeSlider = document.querySelector('#size-slider');
const colorPicker = document.querySelector('#color-picker');
const clearCanvas = document.querySelector('.clear-canvas');
const saveImage = document.querySelector('.save-image');
const canvas = document.querySelector('canvas');
const zim = canvas.getContext('2d');
let isDrawing = false;
let selectedTool = 'brush';
let selectedColor = '#000';
let brushWidth = 5;
let previousMouseX;
let previousMouseY;
let snapshot;
const setCanvasBackground = () => {
     zim.fillStyle = '#fff';
     zim.fillRect(0,0,canvas.width,canvas.height);
     zim.fillStyle = selectedColor;
};
window.addEventListener('load',() => {
     canvas.width = canvas.offsetWidth;
     canvas.height = canvas.offsetHeight;
     setCanvasBackground();
});
const drawRect = (event) => {
     if(!fillColor.checked){
          return zim.strokeRect(event.offsetX,event.offsetY,previousMouseX - event.offsetX,previousMouseY - event.offsetY);
     }
     zim.fillRect(event.offsetX,event.offsetY,previousMouseX - event.offsetX,previousMouseY - event.offsetY);
};
const drawCircle = (event) => {
     zim.beginPath();
     let radius = Math.sqrt(Math.pow((previousMouseX - event.offsetX),2) + Math.pow((previousMouseY - event.offsetY),2));
     zim.arc(previousMouseX,previousMouseY,radius,0,2 * Math.PI);
     fillColor.checked ? zim.fill() : zim.stroke();
};
const drawTriangle = (event) => {
     zim.beginPath();
     zim.moveTo(previousMouseX,previousMouseY);
     zim.lineTo(event.offsetX,event.offsetY);
     zim.lineTo(previousMouseX * 2 - event.offsetX,event.offsetY);
     zim.closePath();
     fillColor.checked ? zim.fill() : zim.stroke();
}
const startDraw = (event) => {
     isDrawing = true;
     previousMouseX = event.offsetX;
     previousMouseY = event.offsetY;
     zim.beginPath();
     zim.lineWidth = brushWidth;
     zim.strokeStyle = selectedColor;
     zim.fillStyle = selectedColor;
     snapshot = zim.getImageData(0,0,canvas.width,canvas.height);
};
const drawing = (event) => {
     if(!isDrawing) return;
     zim.putImageData(snapshot,0,0);
     if(selectedTool === 'brush' || selectedTool === 'eraser'){
          zim.strokeStyle = selectedTool === 'eraser' ? '#fff' : selectedColor;
          zim.lineTo(event.offsetX,event.offsetY);
          zim.stroke();
     }else if(selectedTool === 'rectangle'){
          drawRect(event);
     }else if(selectedTool === 'circle'){
          drawCircle(event);
     }else{
          drawTriangle(event);
     }
};
tool.forEach(button => {
     button.addEventListener('click',() => {
          document.querySelector('.options .active').classList.remove('active');
          button.classList.add('active');
          selectedTool = button.id;
     });
});
sizeSlider.addEventListener('change',() => brushWidth = sizeSlider.value);
colorButtons.forEach(button => {
     button.addEventListener('click',() => {
          document.querySelector('.options .selected').classList.remove('selected');
          button.classList.add('selected');
          selectedColor = window.getComputedStyle(button).getPropertyValue('background-color');
     });
});
colorPicker.addEventListener('change',() => {
     colorPicker.parentElement.style.backgroundColor = colorPicker.value;
     colorPicker.parentElement.click();
});
clearCanvas.addEventListener('click',() => {
     zim.clearRect(0,0,canvas.width,canvas.height);
     setCanvasBackground();
});
saveImage.addEventListener('click',() => {
     const a = document.createElement('a');
     a.download = `${Date.now()}.jpg`;
     a.href = canvas.toDataURL();
     a.click();
});
canvas.addEventListener('mousedown',startDraw);
canvas.addEventListener('mousemove',drawing);
canvas.addEventListener('mouseup',() => isDrawing = false);