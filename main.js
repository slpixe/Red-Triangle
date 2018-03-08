"use strict";

// console.clear();

/* ============= Global Variables ============= */
var state = null;
var player = null;
var videoDuration = null; //total video length seconds
var userActive = false;
var userActiveTimer = null;
var sliderInUse = false;
var DEBUG = true;
var lastKeystroke = null;
var nextPageToken = null;
var isSearching = null;
var searchString = null;
var url = new URL(window.location);
var API_KEY_YOUTUBE = url.searchParams.get("API_KEY");

var youtubeApiUrl = 'https://www.googleapis.com/youtube/v3/';

//Elements
var slider = document.getElementById("seek");
var elPlayingStatus = document.getElementById("playingStatus");
var elSearchOpen = document.querySelector('.search');
var elSearchPane = document.querySelector('.search-pane');
var elSearchInput = document.querySelector('.search-input');
var elSearchSubmitBtn = document.querySelector('.search-submit');
var elSearchResults = document.querySelector('.search-results');
var elSearchClose = document.querySelector('.search-close');

//config values
var VOLUME = 0; //percent
var INTERVAL_USER_ACTIVE = 3000;
var INTERVAL_SLIDER = 50; // in ms
// var DEBUG_TIMER = 5000;
var DEBUG_TIMER = 60000;
var SCROLL_TRIGGER = 300;  // in pixels, before hitting the bottom
var SEARCH_DELAY = 1000;  // in milliseconds

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
  <li class="search-result-item" data-videoid="${videoId}">
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

  try {
    slider.value = Math.ceil(player.getCurrentTime());
  } catch (e) {}
}

function hideToolboxCountdown () {
  clearTimeout(userActiveTimer);
  userActiveTimer = setTimeout(userInactive, INTERVAL_USER_ACTIVE);
}

function userInactive () {
  userActive = false;
  if (DEBUG)
    console.log('userInactive');
  hideToolbox();
  // searchHide();
}

function showToolbox () {
  document.querySelector('.tools').classList.add('show');
}

function hideToolbox () {
  document.querySelector('.tools').classList.remove('show');
}

function searchShow () {
  if (DEBUG)
    console.log('showing search');
  document.querySelector('.search-pane').classList.add('show');
}

function onSearchScroll (el) {
  if (el.scrollTop + el.clientHeight + SCROLL_TRIGGER >= el.scrollHeight) {
    if (DEBUG)
      console.log('do search based on scrolling (no delay and nextPage)');
    search(true, true);
  }
}

function searchHide () {
  if (DEBUG)
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

function searchInputUpdated (e) {
  //if search is not different e.g. select all, move cursor - do nothing
  if( elSearchInput.value === searchString ) return;

  clearSearchResults();
  searchString = elSearchInput.value


  if (e.key === 'Enter') {
    search(true)
  }

  var date = new Date();
  lastKeystroke = date.getTime();
  setTimeout(search, SEARCH_DELAY);
}

function clearSearchResults() {
  document.querySelector('.search-results').innerHTML = '';
}

function search (noDelay, nextPage) {
  //quit out if theres no search value
  if (elSearchInput.value.length === 0) return;

  //if called by keyup check that longer than the delay has passed, otherwise cancel out
  var date = new Date();
  if (!noDelay && date.getTime() - lastKeystroke < SEARCH_DELAY)
    return;

  //if already searching (e.g. got called again because rapid scroll hits then cancel out
  if (isSearching)
    return;

  if (DEBUG)
    console.log('noDelay = ' + noDelay);

  if (DEBUG)
    console.log('nextPage = ' + nextPage);
  fetchSearchFromYoutube(elSearchInput.value, nextPage);
}

function fetchSearchFromYoutube (query, nextPage) {
  var encodedQuery = encodeURIComponent(query);

  var url = youtubeApiUrl + 'search?q=' + encodedQuery + '&type=video&part=snippet&maxResults=10&key=' + API_KEY_YOUTUBE;

  if (nextPage && nextPageToken)
    url += '&pageToken=' + nextPageToken;

  if (DEBUG)
    console.log(url);

  isSearching = true;

  fetch(url)
    .then(response => response.json())
    .then((response) => {
      if (DEBUG) {
        console.log(response);
      }

      nextPageToken = response.nextPageToken;

      response.items.map(x => {
        const item = SearchItem({
          title: x.snippet.title,
          videoId: x.id.videoId,
          thumbnail: x.snippet.thumbnails.high.url
        });
        document.querySelector('.search-results').innerHTML += item;
      });

      isSearching = false;
    });
}

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

function handleUserActive () {
  userActive = true;
  showToolbox();
  hideToolboxCountdown();
}

function handleSearchItemResultClick (e) {
  if(e.target && e.target.parentNode.className === 'search-result-item')
    if(e.target.parentNode.dataset.videoid)
      loadVideo(e.target.parentNode.dataset.videoid);
      searchHide();
}

document.onmousemove = handleUserActive;
// not working for some reason
// document.onscroll = handleUserActive;

elPlayingStatus.addEventListener('click', togglePause);
elSearchOpen.addEventListener('click', searchShow);
elSearchClose.addEventListener('click', searchHide);
elSearchInput.addEventListener('keyup', function (e) { searchInputUpdated(e); });
elSearchInput.addEventListener('search', function (e) { searchInputUpdated(e); });
elSearchSubmitBtn.addEventListener('click', function () {search(true)});
elSearchResults.addEventListener('click', function (e) { handleSearchItemResultClick(e); });

//not working for some reason
// elSearchPane.addEventListener('scroll', onSearchScroll(this));