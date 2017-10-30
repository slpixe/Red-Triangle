"use strict";

console.clear();

/* ============= Global Variables ============= */
var state = null;
var player = null;
var slider = document.getElementById("seek");
var elPlayingStatus = document.getElementById("playingStatus");
var elOpenSearch = document.querySelector('.search');
var videoDuration = null; //total video length seconds
var userActive = false;
var userActiveTimer = null;
var sliderInUse = false;
var DEBUG = true;
var url = new URL(window.location);
var youtubeKey = url.searchParams.get("API_KEY");

var youtubeApiUrl = 'https://www.googleapis.com/youtube/v3/';

//config values
var VOLUME = 0; //percent
var INTERVAL_USER_ACTIVE = 3000;
var INTERVAL_SLIDER = 50; // in ms
// var DEBUG_TIMER = 5000;
var DEBUG_TIMER = 30000;

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

/*========TEMPLATES==========*/

const SearchItem = ({title, videoId, thumbnail}) => `
  <li>
    <img src="${thumbnail}" alt="" />
    <strong>${title}</strong>
  </li>
`;

/*========FUNCTIONS==========*/

function stopVideo () {
  player.stopVideo();
}

function togglePause () {
  if (state == YT.PlayerState.PLAYING) {
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

  slider.value = Math.ceil(player.getCurrentTime());
}

function hideToolboxCountdown () {
  clearTimeout(userActiveTimer);
  userActiveTimer = setTimeout(userInactive, INTERVAL_USER_ACTIVE);
  // 1000 milisec = 1 sec
}

function userInactive () {
  console.log('userInactive');
  hideToolbox();
  searchHide();
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

function searchShow () {
  console.log('showing search');
  document.querySelector('.search-pane').classList.add('show');
}

function searchHide () {
  console.log('hiding search');
  document.querySelector('.search-pane').classList.remove('show');
}

function debugInfo () {
  console.clear();
  console.log("DEBUG_TIMER: " + DEBUG_TIMER);
  console.log("state: " + state);
  console.log("videoDuration: " + videoDuration);
  console.log("userActive: " + userActive);
  console.log("userActiveTimer: " + userActiveTimer);
  console.log("sliderInUse: " + sliderInUse);
  console.log("VOLUME: " + VOLUME);
  console.log("INTERVAL_USER_ACTIVE: " + INTERVAL_USER_ACTIVE);
  console.log("INTERVAL_SLIDER: " + INTERVAL_SLIDER);
}

function searchForBacon () {
  fetch(youtubeApiUrl + 'search?key=' + youtubeKey + '&type=video&part=snippet&q=bacon')
    .then(resp => resp.json())
    .then((resp) => {
      console.log(resp.pageInfo);

      resp.items.map(x => {
        console.log(x);
        const item = SearchItem({
          title: x.snippet.title,
          videoId: x.id.videoId,
          thumbnail: x.snippet.thumbnails.high.url
        });
        document.querySelector('.search-results').innerHTML += item;
      });
    });

  // document.querySelector('.search-results').innerHTML = SearchItem({
  //   title: 'tests',
  //   videoId: '#abc123',
  //   thumbnail: 'http://placehold.it/200x200.jpg'
  // });

}

searchForBacon();

/*=======Events========*/

if (DEBUG) {
  setInterval(debugInfo, DEBUG_TIMER);
}

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
elOpenSearch.addEventListener('click', searchShow);
