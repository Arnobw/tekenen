// var canvas = document.getElementById("canvasje");
// var ctx = canvas.getContext("2d");



//pixel art omegalole
// canvas.addEventListener('mousedown',function(){
//     var x = event.clientX;     // Get the horizontal coordinate
//     var y = event.clientY;     // Get the vertical coordinate

//     ctx.fillStyle = "#FF0000";

// ctx.fillRect(x-14, y-14, 10, 10);
// console.log('drawing at' + x + " " + "and" + y + "!");
// });

//mooiere manier : https://codepen.io/medo001/pen/FIbza

var x = "black",
    y = 2,
    rainbow = false;



var img = new Image;
img.src = "img/duck.png";


var canvas, ctx, flag = false,
    prevX = 0,
    currX = 0,
    prevY = 0,
    currY = 0,
    dot_flag = false;

document.getElementById("brush").addEventListener("keyup", function () {
    y = document.getElementById('brush').value;
});






function init() {
    canvas = document.getElementById('can');
    ctx = canvas.getContext("2d");
    w = canvas.width;
    h = canvas.height;

    canvas.addEventListener("mousemove", function (e) {
        findxy('move', e)
    }, false);
    canvas.addEventListener("mousedown", function (e) {
        findxy('down', e)
    }, false);
    canvas.addEventListener("mouseup", function (e) {
        findxy('up', e)
    }, false);
    canvas.addEventListener("mouseout", function (e) {
        findxy('out', e)
    }, false);
}

function set_brush_color(e) {
    x = e.target.id;

    if (x == "grad") {
        rainbow = false;
        grd = ctx.createRadialGradient(800.000, 800.000, 0.000, 800.000, 800.000, 800.000);

        // adds colors to the gradient
        grd.addColorStop(0.000, 'rgba(255, 0, 0, 1.000)');
        grd.addColorStop(0.150, 'rgba(255, 0, 255, 1.000)');
        grd.addColorStop(0.330, 'rgba(0, 0, 255, 1.000)');
        grd.addColorStop(0.490, 'rgba(0, 255, 255, 1.000)');
        grd.addColorStop(0.670, 'rgba(0, 255, 0, 1.000)');
        grd.addColorStop(0.840, 'rgba(255, 255, 0, 1.000)');
        grd.addColorStop(1.000, 'rgba(255, 0, 0, 1.000)');
        x = grd;

    } else if (x == "random") {
        x = getRandomColor();
        rainbow = true;

        console.log(rainbow);

    } else if (x == "farb") {
        rainbow = false;
        x = document.getElementById('color').value;
    } else {
        rainbow = false;
        console.log(rainbow);
        x = x;


    }
}

b = document.getElementsByClassName('paint_btn');
for (i = 0; i < b.length; i++) {
    b[i].addEventListener('click', set_brush_color);
}




function getRandomColor() {
    var r = 255,
        g = 0,
        b = 0;

    fader = setInterval(function () {
        if (r > 0 && b == 0) {
            r--;
            g++;
        }
        if (g > 0 && r == 0) {
            g--;
            b++;
        }
        if (b > 0 && g == 0) {
            r++;
            b--;
        }

        x = "rgb(" + r + "," + g + "," + b + ")";

        console.log(x);
        console.log("running");


        if (rainbow == false) {
            clearInterval(fader);
            console.log("stopped");
            set_brush_color(x);

        }





    }, 10);

}





function draw() {
    ctx.beginPath();
    ctx.lineJoin = ctx.lineCap = 'round';
    ctx.fillStyle = x;
    ctx.strokeStyle = x;
    ctx.moveTo(prevX, prevY);
    ctx.lineTo(currX, currY);
    ctx.lineWidth = y;
    // ctx.arc(currX, currY, y/2, 0, Math.PI * 4);
    ctx.stroke();
    ctx.fill();
    ctx.closePath();
}

function erase() {
    var m = confirm("Clear canvas?");
    if (m) {
        ctx.clearRect(0, 0, w, h);

    }
}
document.getElementById('clear').addEventListener('click', erase);


function findxy(res, e) {
    if (res == 'down') {
        prevX = currX;
        prevY = currY;
        currX = e.clientX - canvas.offsetLeft;
        currY = e.clientY - canvas.offsetTop;

        flag = true;
        dot_flag = true;
        if (dot_flag) {
            ctx.beginPath();
            ctx.fillStyle = x;
            ctx.fillRect(currX, currY, 2, 2);
            ctx.closePath();
            dot_flag = false;
        }
    }
    if (res == 'up' || res == "out") {
        flag = false;
    }
    if (res == 'move') {
        if (flag) {
            prevX = currX;
            prevY = currY;
            currX = e.clientX - canvas.offsetLeft;
            currY = e.clientY - canvas.offsetTop;
            draw();
        }
    }
}




$(document).ready(function () {

    $('#colorpicker').farbtastic('#color');

});





//jquery tijd...



$(function () {
    $('#knoppen').draggable();
    $('#color_picker').draggable();



});

$('#farb').click(function () {
    $('#color_picker').toggle();
    x = $('#color').val();
});

//init paint functions :))))))
document.onload = init();