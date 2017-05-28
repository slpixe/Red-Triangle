"use strict";

console.clear();

/* ===== Configuration ======== */
var API_KEY = null; // API KEY HERE!
/* ============= Global Variables ============= */
//var state = "watching";
var player = null;
var slider = null;
var videoDuration = null;
var searchResults = {};
var isSearching = false;
var userActive = false;
var userActiveTimer = null;
var sliderInUse = false;

//config values
var VOLUME = 100; //percent
var INTERVAL_USER_ACTIVE = 1500;
var INTERVAL_SLIDER = 50; // in ms

/*========FUNCTIONS==========*/

function stopVideo() {
  player.stopVideo();
}

function loadVideo(videoId) {
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
      rel: 0,
    },
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });

  slider = document.getElementById("slider");
  // slider.setAttribute(
  // 	"max",
  // 	parseDuration(response.items[0].contentDetails.duration)
  // );
  // slider.value = 0;
}

function onPlayerReady(event) {
  event.target.playVideo();
  console.log(player.getDuration());
}

function onPlayerStateChange(event){
  /*
   -1 – unstarted
   0 – ended
   1 – playing
   2 – paused
   */
  // console.log(event.data);
}

function slider_onChange(slider) {
  player.seekTo(slider.value, true);
}

function slider_onMousedown() {
  sliderInUse = true;
}

function slider_onMouseup() {
  sliderInUse = false;
}

function updateSlider() {
  if (sliderInUse) return;

  // console.clear();
  // console.log(player.getCurrentTime());
  // slider.MaterialSlider.change(player.getCurrentTime());
  // slider.value = player.getCurrentTime();
}

function hideToolboxCountdown() {
  clearTimeout(userActiveTimer);
  userActiveTimer = setTimeout(userInactive, INTERVAL_USER_ACTIVE);
  // 1000 milisec = 1 sec
}

function userInactive(){
  console.log('userInactive');
  hideToolbox();
  userActive = false;
}

function showToolbox(){
  if(!userActive){
    document.querySelector('.tools').classList.add('show');
  }
}

function hideToolbox(){
  document.querySelector('.tools').classList.remove('show');
}

/*=======Events========*/

//loops
setInterval(updateSlider, INTERVAL_SLIDER);

//api calls this once loaded
function onYouTubeIframeAPIReady() {
  loadVideo("WUgvvPRH7Oc");
}

function handleMouseMove(e) {
  showToolbox();
  hideToolboxCountdown();
  userActive = true;
}

document.onmousemove = handleMouseMove;