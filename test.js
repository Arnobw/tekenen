
function duck_brush(){
  var img = new Image();
  img.src = "img/duck.png"
  
  function distanceBetween(point1, point2) {
    return Math.sqrt(Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2));
  }
  function angleBetween(point1, point2) {
    return Math.atan2( point2.x - point1.x, point2.y - point1.y );
  }
  
  var canvas = document.getElementById('can');
  var ctx = canvas.getContext('2d');
  ctx.lineJoin = ctx.lineCap = 'round';
  
  var isDrawing, lastPoint;
  
  canvas.onmousedown = function(e) {
    isDrawing = true;
    lastPoint = { x: e.clientX - canvas.offsetLeft, y: e.clientY - canvas.offsetTop };
  };
  
  canvas.onmousemove = function(e) {
    if (!isDrawing) return;
    
    var currentPoint = { x: e.clientX - canvas.offsetLeft, y: e.clientY - canvas.offsetTop  };
    var dist = distanceBetween(lastPoint, currentPoint);
    var angle = angleBetween(lastPoint, currentPoint);
    
    for (var i = 0; i < dist; i++) {
      x = lastPoint.x + (Math.sin(angle) * i) - 50;
      y = lastPoint.y + (Math.cos(angle) * i) - 50;
      ctx.drawImage(img, x, y);
    }
    
    lastPoint = currentPoint;
  };
  
  canvas.onmouseup = function() {
    isDrawing = false;
  };
};

document.getElementById('duck').addEventListener('click', duck_brush);

// var x = "black",
//     y = 2,
//     rainbow = false;


// var canvas = document.getElementById('can');
// var ctx = canvas.getContext('2d');
// var isDrawing;

// function set_brush_color(e) {
//   x= e.target.id;
 
//   if (x == "grad"){
//       rainbow = false;
//       grd = ctx.createRadialGradient(800.000, 800.000, 0.000, 800.000, 800.000, 800.000);
      
//     // adds colors to the gradient
//     grd.addColorStop(0.000,'rgba(255, 0, 0, 1.000)');
//     grd.addColorStop(0.150, 'rgba(255, 0, 255, 1.000)');
//     grd.addColorStop(0.330, 'rgba(0, 0, 255, 1.000)');
//     grd.addColorStop(0.490, 'rgba(0, 255, 255, 1.000)');
//     grd.addColorStop(0.670, 'rgba(0, 255, 0, 1.000)');
//     grd.addColorStop(0.840, 'rgba(255, 255, 0, 1.000)');
//     grd.addColorStop(1.000, 'rgba(255, 0, 0, 1.000)');
//       x= grd;
      
//   }
//   else if (x == "random") {
//     x = getRandomColor();
//     rainbow = true;
    
//     console.log(rainbow); 
      
//   }

//   else if (x == "farb"){
//       rainbow = false;
//       x = document.getElementById('color').value;  
//   }


//   else {
//       rainbow = false;
//       console.log(rainbow);
//       x = x;
      
      
//   }
// }

// b = document.getElementsByClassName('paint_btn');
// for(i=0; i<b.length;i++){
//   b[i].addEventListener('click', set_brush_color);
// }




// function getRandomColor() {
//   var r=255,g=0,b=0;
  
//  fader =  setInterval(function(){
//       if(r > 0 && b == 0){
//           r--;
//           g++;
//         }
//         if(g > 0 && r == 0){
//           g--;
//           b++;
//         }
//         if(b > 0 && g == 0){
//           r++;
//           b--;
//       }
        
//       x= "rgb("+r+","+g+","+b+")";
  
//       console.log(x);
//       console.log("running");
     

//      if(rainbow == false) {
//       clearInterval(fader);
//       console.log("stopped");
//       set_brush_color(x);
      
//   }


  

   
//   },10);
   
//   }

// canvas.onmousedown = function(e) {
//   isDrawing = true;
//   ctx.lineWidth = 10;
//   ctx.lineJoin = ctx.lineCap = 'round';
//   ctx.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
// };
// canvas.onmousemove = function(e) {
//   if (isDrawing) {
//     ctx.beginPath();
//     ctx.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
//     ctx.strokeStyle=x;
//     ctx.fillstyle="red";
//     ctx.fill();
//     ctx.stroke();
//     ctx.closePath();
//   }
// };
// canvas.onmouseup = function() {
//   isDrawing = false;
// };