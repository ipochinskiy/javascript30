const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

const togglePlay = () => {
  const method = video.paused ? 'play' : 'pause';
  video[method]();
}

const updateButton = (paused) => toggle.textContent = this.paused ? '►' : '❚ ❚';

const skip = (seconds) => video.currentTime += parseFloat(seconds);

const handleRangeUpdate = (value) => video[this.name] = value;

const handleProgress = () => {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = percent + '%';
};

const scrub = (offsetX) => {
  const scrubTime = (offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

video.addEventListener('click', togglePlay);
video.addEventListener('play', function () {
  updateButton(this.paused);
});
video.addEventListener('pause', function () {
  updateButton(this.paused);
});
video.addEventListener('timeupdate', handleProgress);

toggle.addEventListener('click', togglePlay);
skipButtons.forEach(button => button.addEventListener('click', function () {
  skip(this.dataset.skip);
}));
ranges.forEach(range => range.addEventListener('change', function () {
  handleRangeUpdate(this.value);
}));
ranges.forEach(range => range.addEventListener('mousemove', function () {
  handleRangeUpdate(this.value);
}));

let mousedown = false;
progress.addEventListener('click', (e) => scrub(e.offsetX));
progress.addEventListener('mousemove', (e) => mousedown && scrub(e.offsetX));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);
