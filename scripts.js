const video = document.querySelector("video");
const toggleBtn = document.querySelector(".toggle");
const skipMinus10 = document.querySelector("button[data-skip='-10']");
const skipPlus25 = document.querySelector("button[data-skip='25']");
const volume = document.querySelector("input[name='volume']");
const playbackRate = document.querySelector("input[name='playbackRate']");
const progress = document.querySelector(".progress");
const progressBar = document.querySelector(".progress__filled");
const fullscreenBtn = document.querySelector(".fullscreen");

// playing and stopping video
let bool = false;
video.addEventListener("click", () => {
    bool = !bool;
    playStopVideo(bool);
})

toggleBtn.addEventListener("click", () => {
    bool = !bool;
    playStopVideo(bool);
})

function playStopVideo(bool) {
    if (bool) {
        video.play();
        toggleIcon();
    } else {
        video.pause();
        toggleIcon();
    }
}
function toggleIcon() {
    toggleBtn.innerHTML = this.paused ? "▶️" : "⏸";

}
video.addEventListener("pause", toggleIcon);
video.addEventListener("play", toggleIcon);


// skipping video time
function skip() {
    video.currentTime += Number(this.dataset.skip);
}

skipMinus10.addEventListener("click", skip);

skipPlus25.addEventListener("click", skip);

// volume
volume.addEventListener("input", e => {
    video.volume = e.target.value;
})

// playbackRate
playbackRate.addEventListener("input", e => {
    video.playbackRate = e.target.value;
})

// video progress
let fullVideoLength;
video.addEventListener('loadedmetadata', function () {
    fullVideoLength = video.duration;
});

video.addEventListener('timeupdate', e => {
    let currentVideoTime = e.target.currentTime / fullVideoLength;
    progressBar.style.flexBasis = `${currentVideoTime * 100}%`;
})


progress.addEventListener("click", e => {
    progressBar.style.flexBasis = `${(e.offsetX / progress.offsetWidth) * 100}%`;
    video.currentTime = fullVideoLength * (e.offsetX / progress.offsetWidth);
})

let mousedown = false;
progress.addEventListener("mousemove", (e) => {
    if (mousedown) {
        progressBar.style.flexBasis = `${(e.offsetX / progress.offsetWidth) * 100}%`;
        video.currentTime = fullVideoLength * (e.offsetX / progress.offsetWidth);
    }
});

progress.addEventListener("mousedown", () => mousedown = true);
progress.addEventListener("mouseup", () => mousedown = false);

// play video full screen  ⇲
fullscreenBtn.addEventListener("click", () => {
    video.requestFullscreen();
})