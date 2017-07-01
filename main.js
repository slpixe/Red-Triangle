"use strict";

console.clear();

/* ============= Global Variables ============= */
var state = null;
var player = null;
var slider = document.getElementById("seek");
var elPlayingStatus = document.getElementById("playingStatus");
var videoDuration = null; //total video length seconds
var userActive = false;
var userActiveTimer = null;
var sliderInUse = false;

//config values
var VOLUME = 0; //percent
var INTERVAL_USER_ACTIVE = 3000;
var INTERVAL_SLIDER = 50; // in ms

//passeed through values (E.g. get parameters from url
// www.mysite.com/my_app.html?Use_Id=abc
var GET = {};
var query = window.location.search.substring(1).split("&");
for (var i = 0, max = query.length; i < max; i++) {
  if (query[i] === "") // check for trailing & with no param
    continue;

  var param = query[i].split("=");
  GET[decodeURIComponent(param[0])] = decodeURIComponent(param[1] || "");
}

/*========FUNCTIONS==========*/

function stopVideo () {
  player.stopVideo();
}

function togglePause () {
  if(state == YT.PlayerState.PLAYING) {
    player.pauseVideo();
    // elPause
  } else {
    player.playVideo();
  }
}

function loadVideo (videoId) {
  if (player) {
    player.destroy();
  }

  player = new YT.Player("player", {
    videoId: videoId,
    playerVars: {
      autoplay: 0,
      controls: 0, //hide default controls from player
      disablekb: 1, //prevent keyboard controls e.g. space to pause
      modestbranding: 1, //not 100% sure
      showinfo: 0,
      rel: 0
    },
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });

  slider.value = 0;
}

function onPlayerReady (event) {
  event.target.playVideo();

  player.setVolume(VOLUME);

  videoDuration = player.getDuration();
  slider.setAttribute(
    "max",
    videoDuration
  );

}

function onPlayerStateChange (event) {
  /*
   -1 – unstarted
   0 – ended
   1 – playing
   2 – paused
   */
  state = event.data;

  switch (state) {
    case YT.PlayerState.PLAYING:
      elPlayingStatus.className = "";
      elPlayingStatus.classList.add('pause');
      break;
    case YT.PlayerState.ENDED:
      elPlayingStatus.className = "";
      elPlayingStatus.classList.add('play');
      break;
    case YT.PlayerState.PAUSED:
      elPlayingStatus.className = "";
      elPlayingStatus.classList.add('play');
      break;
  }

  // if(state == YT.PlayerState.PLAYING) {
  //   elPlayingStatus.classList.add('pause');
  // } else if{
  //   elPlayingStatus.className = "";
  // }

}

function slider_onChange (slider) {
  player.seekTo(slider.value, true);
}

function slider_onMousedown () {
  sliderInUse = true;
}

function slider_onMouseup () {
  sliderInUse = false;
}

function updateSlider () {
  if (sliderInUse) return;

  if (state != YT.PlayerState.PLAYING) return;

  slider.value = player.getCurrentTime();
}

function hideToolboxCountdown () {
  clearTimeout(userActiveTimer);
  userActiveTimer = setTimeout(userInactive, INTERVAL_USER_ACTIVE);
  // 1000 milisec = 1 sec
}

function userInactive () {
  console.log('userInactive');
  hideToolbox();
  userActive = false;
}

function showToolbox () {
  if (!userActive) {
    document.querySelector('.tools').classList.add('show');
  }
}

function hideToolbox () {
  document.querySelector('.tools').classList.remove('show');
}

/*=======Events========*/

//api calls this once loaded
function onYouTubeIframeAPIReady () {
  loadVideo("WUgvvPRH7Oc");

  //loop for slider position
  setInterval(updateSlider, INTERVAL_SLIDER);
}

function handleMouseMove () {
  showToolbox();
  hideToolboxCountdown();
  userActive = true;
}

document.onmousemove = handleMouseMove;

elPlayingStatus.addEventListener('click', togglePause);