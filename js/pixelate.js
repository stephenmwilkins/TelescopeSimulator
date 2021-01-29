

var pixelated_canvas = document.getElementById('pixelated');
var pixelated_ctx = pixelated_canvas.getContext('2d');

var blurred_canvas = document.getElementById('blurred');
var blurred_ctx = blurred_canvas.getContext('2d');

// Create an image element
var img = new Image();

//When the page first loads - draw the initial demo image
window.onload = firstDraw();

function firstDraw() {
    //preload the demo image
    var initialImageURL = 'img/M101.jpg';
    draw(initialImageURL);

}

//takes any image URL and creates an un pixelated image /4 the orginal size of the image
function draw (imgURL) {
    // Specify the src to load the image
    img.crossOrigin="anonymous";
    img.src = imgURL;

    img.onload = function() {
        pixelated_canvas.height = img.height;
        pixelated_canvas.width = img.width;
        pixelated_ctx.drawImage(img, 0, 0, pixelated_canvas.width, pixelated_canvas.height);
        pixelate();

        blurred_canvas.height = img.height;
        blurred_canvas.width = img.width;
        blurred_ctx.drawImage(img, 0, 0, blurred_canvas.width, blurred_canvas.height);
        blur();

    };




}

//
function pixelate() {

    //dynamically adjust canvas size to the size of the uploaded image
    pixelated_canvas.height = img.height;
    pixelated_canvas.width = img.width;

    /// if in play mode use that value, else use slider value
    var size = (blocks.value) * 0.01,

        /// cache scaled width and height
        w = pixelated_canvas.width * size,
        h = pixelated_canvas.height * size;

    /// draw original image to the scaled size

    pixelated_ctx.drawImage(img,0,0);


    var data = pixelated_ctx.getImageData(0,0,pixelated_canvas.width,pixelated_canvas.height);

    var radius = Number(slider.value);

    console.log(radius);

    data = StackBlur.imageDataRGBA(data, 0, 0, img.width, img.height, radius);

    pixelated_ctx.putImageData(data,0,0);

    pixelated_ctx.drawImage(pixelated_canvas,0,0);

    pixelated_ctx.drawImage(pixelated_canvas,0,0, w, h);

    /// then draw that scaled image thumb back to fill canvas
    /// As smoothing is off the result will be pixelated
    pixelated_ctx.mozImageSmoothingEnabled = false;
    pixelated_ctx.imageSmoothingEnabled = false;
    // //
    pixelated_ctx.drawImage(pixelated_canvas, 0, 0, w, h, 0, 0, pixelated_canvas.width, pixelated_canvas.height);

    // ctx.drawImage(canvas, 0, 0, w, h);

}




function blur() {

    /// draw original image to the scaled size

    blurred_ctx.drawImage(img,0,0);

    var data = blurred_ctx.getImageData(0,0,blurred_canvas.width,blurred_canvas.height);

    var radius = Number(slider.value);

    data = StackBlur.imageDataRGBA(data, 0, 0, img.width, img.height, radius);

    blurred_ctx.putImageData(data,0,0);

    blurred_ctx.drawImage(blurred_canvas,0,0);

    // also update the pixelated version
    pixelate();

}




// event listeneners for slider
blocks.addEventListener('change', pixelate, false);

// event listeneners for slider
slider.addEventListener('change', blur, false);




//
//
// //takes any image URL and creates an un pixelated image /4 the orginal size of the image
// function blur () {
//
//   document.getElementById('blurred').style.filter = 'blur('+slider.value+'px)';
//   // document.getElementById('pixelated').style.filter = 'blur('+slider.value+'px)';
//
//   pixelate();
//
// }
