const mapPixels = (pixels, action) => {
  const newPixels = [];
  for (let i = 0; i < pixels.length; i += 4) {
    const [ r, g, b, a ] = action(pixels.slice(i, i + 4), i);
    newPixels[i + 0] = r;
    newPixels[i + 1] = g;
    newPixels[i + 2] = b;
    newPixels[i + 3] = a;
  }
  return newPixels;
};

const isBetween = (val, min, max) => (val >= min) && (val <= max);

const redEffect = (pixels) => mapPixels(
  pixels,
  ([ r, g, b, a ]) => [ r + 200, g - 50, b * 0.5, a ]
);

const rgbSplit = (pixels) => mapPixels(
  pixels,
  ([ r, g, b, a ], i) => [ pixels[i + 150], pixels[i - 499], pixels[i + 548], pixels[i + 3]]
);

const greenScreen = (pixels) => {
  const levels = {};
  rgbInputs.forEach((input) => levels[input.name] = input.value);

  mapPixels(pixels, ([ r, g, b, a ]) => {
    const is = isBetween(r, levels.rmin, levels.rmax)
      && isBetween(g, levels.gmin, levels.gmax)
      && isBetween(b, levels.bmin, levels.bmax);

    return is ? [ r, g, b, 0 ] : [ r, g, b, a ];
  });
}

const playSound = () => {
  snap.currentTime = 0;
  snap.play();
};

const createFotoElement = (data) => {
  const link = document.createElement('a');
  link.href = data;
  link.setAttribute('download', 'handsome');
  link.innerHTML = `<img src="${data}" alt="Handsome Man" />`;
  return link;
};

const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');
const rgbInputs = document.querySelectorAll('.rgb input');

const getVideo = () => {
  navigator.mediaDevices
    .getUserMedia({ video: true, audio: false })
    .then(localMediaStream => {
      video.src = window.URL.createObjectURL(localMediaStream);
      video.play();
    })
    .catch(err => console.error(err.message, err.stack));
}

const paintToCanavas = () => {
  const [ videoWidth: width, videoHeight: height ] = video;

  canvas.width = width;
  canvas.height = height;

  return setInterval(() => {
    ctx.drawImage(video, 0, 0, width, height);
    const pixels = ctx.getImageData(0, 0, width, height);

    // const = newPixels = redEffect(pixels.data);
    // const = newPixels = rgbSplit(pixels.data);
    // ctx.globalAlpha = 0.8;
    // const = newPixels = greenScreen(pixels.data);

    ctx.putImageData(newPixels, 0, 0);
  }, 16);
}

const takePhoto = () => {
  playSound();
  const link = createFotoElement(canvas.toDataURL('image/jpeg'));
  strip.insertBefore(link, strip.firsChild);
}

getVideo();

video.addEventListener('canplay', paintToCanavas);
