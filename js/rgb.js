// Find all elements that will be used and assign them to variables
// const image = document.getElementById("Source");

// Create an image element
var image = new Image();

image.crossOrigin = "anonymous";
image.src = "img/pillars_of_creation_vsmall.jpg";



const Rcanvas = document.getElementById("R");
const Gcanvas = document.getElementById("G");
const Bcanvas = document.getElementById("B");
const RGBcanvas = document.getElementById("RGB");

const Rslider = document.getElementById("rOffset");
const Gslider = document.getElementById("gOffset");
const Bslider = document.getElementById("bOffset");

// If the image is completely loaded before this script executes, call init().
if (image.complete) init();

// In case it is not loaded yet, we listen to its "load" event and call init() when it fires.
image.addEventListener("load", init);

function init() {

  const RGBctx = RGBcanvas.getContext("2d");
  const Rctx = Rcanvas.getContext("2d");
  const Gctx = Gcanvas.getContext("2d");
  const Bctx = Bcanvas.getContext("2d");

  const width = image.naturalWidth;
  const height = image.naturalHeight;

  RGBcanvas.width = width;
  RGBcanvas.height = height;
  Rcanvas.width = width;
  Rcanvas.height = height;
  Gcanvas.width = width;
  Gcanvas.height = height;
  Bcanvas.width = width;
  Bcanvas.height = height;

  RGBctx.drawImage(image, 0, 0, width, height);





  const imageData = RGBctx.getImageData(0, 0, width, height);

  var Rdata = new Uint8ClampedArray(imageData.data);
  var Gdata = new Uint8ClampedArray(imageData.data);
  var Bdata = new Uint8ClampedArray(imageData.data);

  for (let i = 0; i < imageData.data.length; i += 4) {
    Rdata[i + 1] = Rdata[i + 0];
    Rdata[i + 2] = Rdata[i + 0];

    Gdata[i + 0] = Gdata[i + 1];
    Gdata[i + 2] = Gdata[i + 1];

    Bdata[i + 0] = Bdata[i + 2];
    Bdata[i + 1] = Bdata[i + 2];
  }

  R = new ImageData(Rdata, imageData.width, imageData.height)
  G = new ImageData(Gdata, imageData.width, imageData.height)
  B = new ImageData(Bdata, imageData.width, imageData.height)

  Rctx.putImageData(R, 0, 0);
  Gctx.putImageData(G, 0, 0);
  Bctx.putImageData(B, 0, 0);

  // Rctx.drawImage(Rcanvas, 0, 0, width, height);

  Rslider.addEventListener("change", updateRGB);
  Gslider.addEventListener("change", updateRGB);
  Bslider.addEventListener("change", updateRGB);


  function updateRGB() {

    var Rscale = Number(Rslider.value);
    var Gscale = Number(Gslider.value);
    var Bscale = Number(Bslider.value);

    var RGBdata = new Uint8ClampedArray(imageData.data);

    for (let i = 0; i < imageData.data.length; i += 4) {
      RGBdata[i + 0] = Rscale * RGBdata[i + 0];
      RGBdata[i + 1] = Gscale * RGBdata[i + 1];
      RGBdata[i + 2] = Bscale * RGBdata[i + 2];
    }

    RGB = new ImageData(RGBdata, imageData.width, imageData.height);
    RGBctx.putImageData(RGB, 0, 0);

  }


}
