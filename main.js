var x = "black",
    y = document.getElementById('amount').value;
    shadow = 0,
    hue = 0,
    composite = "source-over",
    rainbow = false,
    duckie = false;
    eraser = false;
    defaultBrush = true;
    hueBrush = false;
    pulseBrush = false;
    direction = true;
    document.getElementById("box").style.backgroundColor =x;
    img = new Image;
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
    klik.play();

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
        ctx.globalCompositeOperation=composite;
        console.log(rainbow);
        duckie = false;
        }
        
        else if (x=="eraser") {

            duckie = false;
            hueBrush = false;
            defaultBrush=false;
            eraser=true;
        }

        else if (x=="duck"){
            duckie = true;
            rainbow = false;
            hueBrush = false;

            ctx.globalCompositeOperation=composite;
        }

        else if (x=="hueBrush"){
            defaultBrush = false;
            duckie = false;
            rainbow = false;
            hueBrush = true;
        }

        else if (x=="pulseBrush"){
            x = fallBack;
        }

        else {
        rainbow = false;
        console.log(rainbow);
        ctx.globalCompositeOperation=composite;
        x = fallBack;
        document.getElementById("box").style.backgroundColor =x;
        document.getElementById('box').style.width = y + 'px';
        document.getElementById('box').style.height = y + 'px';
        duckie = false;
        hueBrush = false;
    }
}

b = document.getElementsByClassName('paint_btn');
for (i = 0; i < b.length; i++) {
    b[i].addEventListener('click', set_brush_color);
}



//weggegooid want het is stinky
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
    
    //PULSE BRUSH
    function pulse(){
        brushState = x;
        if (pulseBrush == true) {
            if (y >= 100 || y <= 10) {
                direction = !direction;
              }
              if (direction) {
                y--;
                $('#box').css("height", y + 'px');
                $('#box').css("width", y + 'px');
              }
              else {
                y++;   
                $('#box').css("height", y + 'px');
                $('#box').css("width", y + 'px');
              }
              return y; 
        } else {
            y = document.getElementById('amount').value;
            $('#box').css("height", y + 'px');
            $('#box').css("width", y + 'px');
            x = brushState;

        } return y;
     };   

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
        ctx.lineWidth = pulse();
        ctx.globalCompositeOperation = composite;
        ctx.stroke();
        ctx.fill();
        ctx.closePath();

    } else if (hueBrush == true) {
        isDrawing = true;
        ctx.beginPath();
        ctx.fillStyle = x;
        ctx.strokeStyle = x;
        ctx.globalCompositeOperation = composite;
        ctx.shadowBlur = shadow;
        ctx.shadowColor = `hsl(${hue}, 100%, 50%)`;;
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';
        ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
        ctx.moveTo(prevX, prevY);
        ctx.lineTo(currX, currY);
        ctx.lineWidth = pulse();
        hue++;
        if (hue >= 360) { hue = 0; }
        }  else if (eraser == true){
            isDrawing = true;
            ctx.beginPath();
            ctx.lineJoin = ctx.lineCap = 'round';
            ctx.shadowBlur = shadow;
            ctx.shadowColor = x;
            ctx.fillStyle = x;
            ctx.strokeStyle = x;
            ctx.moveTo(prevX, prevY);
            ctx.lineTo(currX, currY);
            ctx.lineWidth = pulse();
            ctx.globalCompositeOperation = "destination-out";
            ctx.stroke();
            ctx.fill();
            ctx.closePath();
    
        }
        ctx.stroke();
        ctx.fill();
        ctx.closePath();
    }
   


function clear() {
    var m = confirm("Clear canvas?");
    if (m) {
        ctx.clearRect(0, 0, w, h);
        ohno.play();
    }
}
document.getElementById('clear').addEventListener('click', clear);

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
        shadow=0;
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

$('#composite').mouseup(function(){
    composite = $('#composite').val();
})

$(function () {
    $('#color_picker').draggable();
});



$('#colorpicker').mouseup(function () {
    // $('#color_picker').toggle();
    alt_biep.play();
    x = $('#color').val();
    document.getElementById("box").style.backgroundColor =x;
    fallBack = x;
    console.log(fallBack);
    duckie=false;
    rainbow=false;
    defaultBrush=true;
    ctx.globalCompositeOperation=composite;
});

$('#slider').mouseup(function () {
    klik.play();
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
            minus.play();


            console.log(shadow);

        });
        $('.plus').click(function () {
            var $input = $(this).parent().find('input');

            shadow++;
            $input.val(shadow);
            $input.change();
            console.log(shadow);
            biep.play();
        });
    });

$('#pulseBrush').click(function(){
    if(pulseBrush == false) {
        pulseBrush = true;
    } else {
        pulseBrush = false;

    }
});


// GELUIDEN

var klik = new Howl({
    src: ['audio/blip1.wav'],
    volume: 0.4
});

var biep = new Howl({
    src: ['audio/button14.wav'],
    volume: 0.4
});

var alt_biep = new Howl({
    src: ['audio/button17.wav'],
    volume: 0.4
});

var minus = new Howl({
    src: ['audio/button10.wav'],
    volume: 0.4
});

// var draw = new Howl({
//     src: ['audio/marker.mp3'],
//     volume: 0.07
// });

var ohno = new Howl({
    src: ['audio/ohno.mp3'],
    volume: 0.5
});