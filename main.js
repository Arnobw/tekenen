var x = "black",
    y = 20,
    shadow = 10,
    hue = 0;
    rainbow = false,
    duckie = false;
    eraser = false;
    neonBrush = false;
    defaultBrush = true;
    rainbowBrush = false;
    direction = true;
    document.getElementById("box").style.backgroundColor =x;


var img = new Image;
img.src = "img/duck.png";


var canvas, ctx, flag = false,
    prevX = 0,
    currX = 0,
    prevY = 0,
    currY = 0,
    dot_flag = false;

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
    fallBack = x;
    console.log(fallBack);

    if (x == "grad") {
        rainbow = false;
        grd = ctx.createRadialGradient(800.000, 800.000, 0.000, 800.000, 800.000, 800.000);
        ctx.globalCompositeOperation="source-over";
        // adds colors to the gradient
        grd.addColorStop(0.000, 'rgba(255, 0, 0, 1.000)');
        grd.addColorStop(0.150, 'rgba(255, 0, 255, 1.000)');
        grd.addColorStop(0.330, 'rgba(0, 0, 255, 1.000)');
        grd.addColorStop(0.490, 'rgba(0, 255, 255, 1.000)');
        grd.addColorStop(0.670, 'rgba(0, 255, 0, 1.000)');
        grd.addColorStop(0.840, 'rgba(255, 255, 0, 1.000)');
        grd.addColorStop(1.000, 'rgba(255, 0, 0, 1.000)');
        x = fallBack;
        x = grd;
        document.getElementById("box").style.backgroundColor = grd;
        duckie = false;

    } else if (x == "random") {
        x = getRandomColor();
        rainbow = true;
        ctx.globalCompositeOperation="source-over";
        console.log(rainbow);
        duckie = false;
        }
        
        else if (x=="eraser") {
            ctx.globalCompositeOperation="destination-out";
            duckie = false;
            rainbow = false;
        }

        else if (x=="duck"){
            duckie = true;
            rainbow = false;

            ctx.globalCompositeOperation="source-over";
        }

        else if (x=="rainbowBrush"){
            defaultBrush = false;
            duckie = false;
            rainbow = false;
            rainbowBrush = true;
        }

        else {
        rainbow = false;
        console.log(rainbow);
        ctx.globalCompositeOperation="source-over";
        x = fallBack;
        document.getElementById("box").style.backgroundColor =x;
        document.getElementById('box').style.width = y + 'px';
        document.getElementById('box').style.height = y + 'px';
        duckie = false;
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

        laatstekleur = "rgb(" + r + "," + g + "," + b + ")";
        x = laatstekleur;
        document.getElementById("box").style.backgroundColor =x;
        console.log(x);
        console.log("running");


        if (rainbow == false) {
            clearInterval(fader);
            console.log("stopped");
            x = fallBack;
            document.getElementById("box").style.backgroundColor =x;
            console.log(laatstekleur);
        }





    }, 70);

}



// BRUSHES
function draw() {
   
    if (duckie == true){
        ctx.drawImage(img, currX-62.5, currY-73.5);
    }
    else if (defaultBrush == true){
        isDrawing = true;
        ctx.beginPath();
        ctx.lineJoin = ctx.lineCap = 'round';
        ctx.shadowBlur = shadow;
        ctx.shadowColor = x;
        ctx.fillStyle = x;
        ctx.strokeStyle = x;
        ctx.moveTo(prevX, prevY);
        ctx.lineTo(currX, currY);
        ctx.lineWidth = y;
        ctx.stroke();
        ctx.fill();
        ctx.closePath();

    } else if (rainbowBrush == true) {
        ctx.shadowBlur = shadow;
        ctx.shadowColor = `hsl(${hue}, 100%, 50%)`;;
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';
        ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
        ctx.beginPath();
        ctx.moveTo(prevX, prevY);
        ctx.lineTo(currX, currY);
        ctx.stroke();
        hue++;
        if (hue >= 360) { hue = 0; }
        if (ctx.lineWidth >= 100 || ctx.lineWidth <= 1) {
          direction = !direction;
        }
        if (direction) {
          ctx.lineWidth--;
        }
        else {
          ctx.lineWidth++;
        }
      
      }
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
    
    if (duckie) {
        draw();
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

//jquery tijd...
$(document).ready(function () {

    $('#colorpicker').farbtastic('#color');

});


$(function () {
    $('#knoppen').draggable();
    $('#color_picker').draggable();



});

$('#colorpicker').mouseup(function () {
    // $('#color_picker').toggle();
    x = $('#color').val();
    document.getElementById("box").style.backgroundColor =x;
    fallBack = x;
    console.log(fallBack);
    duckie=false;
    rainbow=false;
    defaultBrush=true;
    ctx.globalCompositeOperation="source-over";
});

$('#slider').mouseup(function () {
    y= $('#amount').val();
    $('#box').css("height", y + 'px');
    $('#box').css("width", y + 'px');

});

//init paint functions :))))))
document.onload = init();


$(document).bind('mousemove', function(e){
    $('#box').css({
      top: e.pageY - $("#box").height()/2 , // just minus by half the height
      left:  e.pageX - $("#box").width()/2  // just minus by half the width
    });
  });

  $( function() {
    $( "#slider" ).slider({
      value:10,
      min: 0,
      max: 100,
      step: 10,
      slide: function( event, ui ) {
        $( "#amount" ).val(ui.value );
      }
    });
    $( "#amount" ).val( $( "#slider" ).slider( "value" ) );
  } );

    //counter shit 
    $(document).ready(function() {
        $('.minus').click(function () {
            var $input = $(this).parent().find('input');
            shadow--;
            $input.val(shadow);
            $input.change();



            console.log(shadow);

        });
        $('.plus').click(function () {
            var $input = $(this).parent().find('input');

            shadow++;
            $input.val(shadow);
            $input.change();
            console.log(shadow);
        });
    });