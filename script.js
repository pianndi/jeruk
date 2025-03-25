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
      PowerGlitch.glitch('.glitch')
      floatAnimation('.floating');
      elem.style.display = 'flex'

      document.querySelector('.loader').style.display = 'none'
    }
  }
  if (asset.complete) asset.onload();

});
floatAnimation('.floating-glitch-1');
floatAnimation('.floating-glitch-2');
const music = new Audio('song/L - Hal.mp3')
music.currentTime = lyrics_timestamps[lyrics_timestamps.length - 1].start - 2
music.currentTime = 16
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
  if (music.currentTime - lasttime >= 0.5) {
    song_duration.value = music.currentTime
    lasttime = music.currentTime
    music_current_duration.innerText = formatTime(music.currentTime)
  }
  lyrics_timestamps.forEach((item, i) => {
    if (!document.querySelector(`#lyric_${i}`) && music.currentTime > item.start && music.currentTime < item.end + 1) {
      lyrics_el.innerHTML += `
        <div class="chat chat-end new-chat" id="lyric_${i}">
          <div class="chat-bubble text-sm">${item.text}</div>
        </div>
    `
      // setTimeout(function () {
      //   if (document.querySelector(`#lyric_${i}`)) {
      //     document.querySelector(`#lyric_${i}`).remove()
      //   }
      // }, (item.end - music.currentTime) * 1000 + 1000)
      setTimeout(function () {
        if (document.querySelector(`#lyric_${i}`)) {
          document.querySelector(`#lyric_${i}`).classList.remove('new-chat')
        }
      }, 500)
    } else if (document.querySelector(`#lyric_${i}`) && !(music.currentTime > item.start && music.currentTime < item.end + 1)) {
      document.querySelector(`#lyric_${i}`).remove()
    }

  })

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
  const tlCan = gsap.timeline({ repeat: -1, delay: gsap.utils.random(0, 2) });

  tlCan
    .to(el, 3, { y: '-=30', x: '+=20', rotation: '-=5', ease: 'power1.inOut' })
    .to(el, 2, { y: '+=30', x: '-=20', rotation: '-=5', ease: 'power1.inOut' })
    .to(el, 3, { y: '-=20', rotation: '+=5', ease: 'power1.inOut' })
    .to(el, 3, { y: '+=20', rotation: '+=5', ease: 'power1.inOut' })
    .to(el, 3, { y: '-=50', ease: 'power1.inOut' })
    .to(el, 3, { y: '+=50', ease: 'power1.inOut' })
    .to(el, 3, { y: '-=30', ease: 'power1.inOut' })
    .to(el, 3, { y: '+=30', ease: 'power1.inOut' })
    .to(el, 2, { y: '-=30', ease: 'power1.inOut' })
    .to(el, 2, { y: '+=30', ease: 'power1.inOut' });

  gsap.to(tlCan, { duration: 27, ease: 'power1.inOut' });
}
const ctx = canvas.getContext('2d')
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const rains = [{ x: random(0, canvas.width), y: 0, size: random(10, 20) }]
ctx.strokeStyle = 'rgba(255,255,255,0.25)'
ctx.lineWidth = 2
let lastTime = performance.now()
let hujanTimer = 0;
function draw() {

  let currentTime = performance.now()
  let deltaTime = currentTime - lastTime
  hujanTimer += deltaTime
  lastTime = currentTime
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  rains.forEach((rain, i) => {
    rain.y += 2
    ctx.beginPath()
    ctx.moveTo(rain.x, rain.y)
    ctx.lineTo(rain.x, rain.y - rain.size)
    ctx.closePath()
    ctx.stroke()
    if (rain.y > canvas.height) {
      rains.splice(i, 1)
    }
  })
  if (hujanTimer > random(100, 2000)) {
    hujanTimer = 0
    rains.push({ x: random(0, canvas.width), y: 0, size: random(10, 20) })
  }
  requestAnimationFrame(draw)
}
draw()
function random(min, max) {
  return Math.round(min + Math.random() * (max - min))
}

const jeruk_suka = parseInt(localStorage.getItem('jeruk_suka')) == 1
love_button.checked = jeruk_suka
love_button.onclick = function(e){
  localStorage.setItem('jeruk_suka', (e.target.checked ? 1 : 0))
}

//just for reloading animation ;)

// window.onclick = function () {
//   document.body.removeChild(elem)
//   setTimeout(function () {
//     document.body.prepend(elem)
//   }, 100)
// }