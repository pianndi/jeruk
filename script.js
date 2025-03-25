var elem = document.getElementById("root")
elem.style.display = 'none'
const assets = document.querySelectorAll('img');
const progress = document.querySelector('progress')
progress.max = assets.length;
let loaded = 0;
assets.forEach(asset => {
  asset.onload = () => {
    loaded++;
    progress.value = loaded;
    if (loaded === assets.length) {
      //floatAnimation('.floating');
      elem.style.display = 'flex'

      document.querySelector('.loader').style.display = 'none'
    }
  }
  if (asset.complete) asset.onload();

});
const music = new Audio('song/L - Hal.mp3')
music.onloadeddata = function () {
  music_total_duration.innerText = formatTime(music.duration)
  song_duration.max = music.duration
  song_duration.value = music.currentTime;
}
let lasttime = 0
song_duration.oninput = function () {
  music.currentTime = song_duration.value
  lasttime = music.currentTime
  music_current_duration.innerText = formatTime(music.currentTime)
}
music.ontimeupdate = function () {
  if (music.currentTime - lasttime >= 1) {
    song_duration.value = music.currentTime
    lasttime = music.currentTime
    music_current_duration.innerText = formatTime(music.currentTime)
  }

  if (music.currentTime === music.duration) {
    if (loop_button.checked == true) {

      music.currentTime = 0;
      lasttime = 0
      music.play();
    } else {
      music.pause();
      play_button.checked = false;

    }
  }
}
play_button.onchange = function () {
  if (play_button.checked) {
    music.play()
  } else {
    music.pause()
  }
}
function formatTime(second) {
  return `${Math.floor(second / 60)}:${(Math.floor(second % 60)).toString().padStart(2, '0')}`
}

function floatAnimation(el) {
  const tlCan = new TimelineMax({ repeat: -1 });
  /*Can Animation*/
  tlCan
    //move top left
    .to(el, 3, { y: '-=30', x: '+=20', rotation: '-=5', ease: Power1.easeInOut })

    //move down right
    .to(el, 2, { y: '+=30', x: '-=20', rotation: '-=5', ease: Power1.easeInOut })


    .to(el, 3, { y: '-=20', rotation: '+=5', ease: Power1.easeInOut })

    .to(el, 3, { y: '+=20', rotation: '+=5', ease: Power1.easeInOut })


    .to(el, 3, { y: '-=50', ease: Power1.easeInOut })

    .to(el, 3, { y: '+=50', ease: Power1.easeInOut })


    .to(el, 3, { y: '-=30', ease: Power1.easeInOut })

    .to(el, 3, { y: '+=30', ease: Power1.easeInOut })


    .to(el, 2, { y: '-=30', ease: Power1.easeInOut })

    .to(el, 2, { y: '+=30', ease: Power1.easeInOut })

  TweenLite.to(tlCan, 27, { ease: Power1.easeInOut })

}
//just for reloading animation ;)

$(function () {
  $(".glitch").mgGlitch({
    // set 'true' to stop the plugin
    destroy: false,
    // set 'false' to stop glitching
    glitch: true,
    // set 'false' to stop scaling
    scale: true,
    // set 'false' to stop glitch blending
    blend: true,
    // select blend mode type
    blendModeType: 'hue',
    // set min time for glitch 1 elem
    glitch1TimeMin: 10,
    // set max time for glitch 1 elem
    glitch1TimeMax: 100,
    // set min time for glitch 2 elem
    glitch2TimeMin: 10,
    // set max time for glitch 2 elem
    glitch2TimeMax: 300,
  });
});

// window.onclick = function () {
//   document.body.removeChild(elem)
//   setTimeout(function () {
//     document.body.prepend(elem)
//   }, 100)
// }