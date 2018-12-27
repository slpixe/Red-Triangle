"use strict";

/*! modernizr 3.6.0 (Custom Build) | MIT *
 * https://modernizr.com/download/?-speechrecognition-setclasses !*/
 !function(e,n,t){function r(e,n){return typeof e===n}function o(){var e,n,t,o,i,s,a;for(var l in C)if(C.hasOwnProperty(l)){if(e=[],n=C[l],n.name&&(e.push(n.name.toLowerCase()),n.options&&n.options.aliases&&n.options.aliases.length))for(t=0;t<n.options.aliases.length;t++)e.push(n.options.aliases[t].toLowerCase());for(o=r(n.fn,"function")?n.fn():n.fn,i=0;i<e.length;i++)s=e[i],a=s.split("."),1===a.length?Modernizr[a[0]]=o:(!Modernizr[a[0]]||Modernizr[a[0]]instanceof Boolean||(Modernizr[a[0]]=new Boolean(Modernizr[a[0]])),Modernizr[a[0]][a[1]]=o),h.push((o?"":"no-")+a.join("-"))}}function i(e){var n=_.className,t=Modernizr._config.classPrefix||"";if(w&&(n=n.baseVal),Modernizr._config.enableJSClass){var r=new RegExp("(^|\\s)"+t+"no-js(\\s|$)");n=n.replace(r,"$1"+t+"js$2")}Modernizr._config.enableClasses&&(n+=" "+t+e.join(" "+t),w?_.className.baseVal=n:_.className=n)}function s(e){return e.replace(/([a-z])-([a-z])/g,function(e,n,t){return n+t.toUpperCase()}).replace(/^-/,"")}function a(e,n){return!!~(""+e).indexOf(n)}function l(){return"function"!=typeof n.createElement?n.createElement(arguments[0]):w?n.createElementNS.call(n,"http://www.w3.org/2000/svg",arguments[0]):n.createElement.apply(n,arguments)}function f(e,n){return function(){return e.apply(n,arguments)}}function u(e,n,t){var o;for(var i in e)if(e[i]in n)return t===!1?e[i]:(o=n[e[i]],r(o,"function")?f(o,t||n):o);return!1}function p(e){return e.replace(/([A-Z])/g,function(e,n){return"-"+n.toLowerCase()}).replace(/^ms-/,"-ms-")}function c(n,t,r){var o;if("getComputedStyle"in e){o=getComputedStyle.call(e,n,t);var i=e.console;if(null!==o)r&&(o=o.getPropertyValue(r));else if(i){var s=i.error?"error":"log";i[s].call(i,"getComputedStyle returning null, its possible modernizr test results are inaccurate")}}else o=!t&&n.currentStyle&&n.currentStyle[r];return o}function d(){var e=n.body;return e||(e=l(w?"svg":"body"),e.fake=!0),e}function m(e,t,r,o){var i,s,a,f,u="modernizr",p=l("div"),c=d();if(parseInt(r,10))for(;r--;)a=l("div"),a.id=o?o[r]:u+(r+1),p.appendChild(a);return i=l("style"),i.type="text/css",i.id="s"+u,(c.fake?c:p).appendChild(i),c.appendChild(p),i.styleSheet?i.styleSheet.cssText=e:i.appendChild(n.createTextNode(e)),p.id=u,c.fake&&(c.style.background="",c.style.overflow="hidden",f=_.style.overflow,_.style.overflow="hidden",_.appendChild(c)),s=t(p,e),c.fake?(c.parentNode.removeChild(c),_.style.overflow=f,_.offsetHeight):p.parentNode.removeChild(p),!!s}function v(n,r){var o=n.length;if("CSS"in e&&"supports"in e.CSS){for(;o--;)if(e.CSS.supports(p(n[o]),r))return!0;return!1}if("CSSSupportsRule"in e){for(var i=[];o--;)i.push("("+p(n[o])+":"+r+")");return i=i.join(" or "),m("@supports ("+i+") { #modernizr { position: absolute; } }",function(e){return"absolute"==c(e,null,"position")})}return t}function g(e,n,o,i){function f(){p&&(delete N.style,delete N.modElem)}if(i=r(i,"undefined")?!1:i,!r(o,"undefined")){var u=v(e,o);if(!r(u,"undefined"))return u}for(var p,c,d,m,g,y=["modernizr","tspan","samp"];!N.style&&y.length;)p=!0,N.modElem=l(y.shift()),N.style=N.modElem.style;for(d=e.length,c=0;d>c;c++)if(m=e[c],g=N.style[m],a(m,"-")&&(m=s(m)),N.style[m]!==t){if(i||r(o,"undefined"))return f(),"pfx"==n?m:!0;try{N.style[m]=o}catch(h){}if(N.style[m]!=g)return f(),"pfx"==n?m:!0}return f(),!1}function y(e,n,t,o,i){var s=e.charAt(0).toUpperCase()+e.slice(1),a=(e+" "+b.join(s+" ")+s).split(" ");return r(n,"string")||r(n,"undefined")?g(a,n,o,i):(a=(e+" "+z.join(s+" ")+s).split(" "),u(a,n,t))}var h=[],C=[],S={_version:"3.6.0",_config:{classPrefix:"",enableClasses:!0,enableJSClass:!0,usePrefixes:!0},_q:[],on:function(e,n){var t=this;setTimeout(function(){n(t[e])},0)},addTest:function(e,n,t){C.push({name:e,fn:n,options:t})},addAsyncTest:function(e){C.push({name:null,fn:e})}},Modernizr=function(){};Modernizr.prototype=S,Modernizr=new Modernizr;var _=n.documentElement,w="svg"===_.nodeName.toLowerCase(),x="Moz O ms Webkit",b=S._config.usePrefixes?x.split(" "):[];S._cssomPrefixes=b;var E=function(n){var r,o=prefixes.length,i=e.CSSRule;if("undefined"==typeof i)return t;if(!n)return!1;if(n=n.replace(/^@/,""),r=n.replace(/-/g,"_").toUpperCase()+"_RULE",r in i)return"@"+n;for(var s=0;o>s;s++){var a=prefixes[s],l=a.toUpperCase()+"_"+r;if(l in i)return"@-"+a.toLowerCase()+"-"+n}return!1};S.atRule=E;var z=S._config.usePrefixes?x.toLowerCase().split(" "):[];S._domPrefixes=z;var P={elem:l("modernizr")};Modernizr._q.push(function(){delete P.elem});var N={style:P.elem.style};Modernizr._q.unshift(function(){delete N.style}),S.testAllProps=y;var T=S.prefixed=function(e,n,t){return 0===e.indexOf("@")?E(e):(-1!=e.indexOf("-")&&(e=s(e)),n?y(e,n,t):y(e,"pfx"))};Modernizr.addTest("speechrecognition",!!T("SpeechRecognition",e)),o(),i(h),delete S.addTest,delete S.addAsyncTest;for(var j=0;j<Modernizr._q.length;j++)Modernizr._q[j]();e.Modernizr=Modernizr}(window,document);

// console.clear();

/* ============= Global Variables ============= */
var state = null;
var player = null;
var videoDuration = null; //total video length seconds
var userActive = false;
var userActiveTimer = null;
var sliderInUse = false;
var DEBUG = false;
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

// google api
var CLIENT_ID = "770186346406-vfarrg780dneqf2p9v55p3klopglm9qt.apps.googleusercontent.com";
var CLIENT_SECRET = "cJNnCipM6dMiO55MQZk5Pp2M";

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
      autoplay: 1,
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
  elSearchInput.focus();
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

function searchInputUpdated (e, force = false) {
  //if search is not different e.g. select all, move cursor - do nothing
  if( elSearchInput.value === searchString ) return;

  clearSearchResults();
  searchString = elSearchInput.value


  if ((e && e.key === 'Enter') || force) {
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

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function debugMilliseconds() {
  return Math.floor(Date.now() / 100).toString().substring(8);
}

// https://github.com/Daniel-Hug/speech-input
/*global webkitSpeechRecognition */
(function() {
  var speechRecognition = window[Modernizr.prefixed('speechRecognition', window, false)];
  
  if (!speechRecognition) return;

  var recognition = new speechRecognition;

    // setup recognition
    var prefix = '';
    var talkMsg = 'Speak now';
		var isSentence;
		var recognizing = false;
		var timeout;
		var oldPlaceholder = null;
    var inputEl = document.querySelector('.speech-input');
    var micBtn = document.querySelector('.speech-btn');
		recognition.continuous = true;
		recognition.interimResults = true;

		// if lang attribute is set on field use that
		// (defaults to use the lang of the root element)
		if (inputEl.lang) recognition.lang = inputEl.lang;

		function restartTimer() {
      if(DEBUG) {
        console.log(debugMilliseconds(), 'speech - restartTimer');
      }
			timeout = setTimeout(function() {
				recognition.stop();
			}, SEARCH_DELAY);
		}

		recognition.onstart = function() {
      if(DEBUG) {
        console.log(debugMilliseconds(), 'speech - onStart');
      }
			oldPlaceholder = inputEl.placeholder;
			inputEl.placeholder = inputEl.dataset.ready || talkMsg;
			recognizing = true;
			micBtn.classList.add('listening');
			restartTimer();
		};

		recognition.onend = function() {
      if(DEBUG) {
        console.log(debugMilliseconds(), 'speech - onEnd');
      }
			recognizing = false;
			clearTimeout(timeout);
			micBtn.classList.remove('listening');
			if (oldPlaceholder !== null) inputEl.placeholder = oldPlaceholder;

			searchInputUpdated(null, true);
    };

		recognition.onresult = function(event) {
      if(DEBUG) {
        console.log(debugMilliseconds(), 'speech - onResult');
      }
			clearTimeout(timeout);

			// get SpeechRecognitionResultList object
			var resultList = event.results;

			// go through each SpeechRecognitionResult object in the list
			var finalTranscript = '';
			var interimTranscript = '';
			for (var i = event.resultIndex; i < resultList.length; ++i) {
				var result = resultList[i];

				// get this result's first SpeechRecognitionAlternative object
				var firstAlternative = result[0];

				if (result.isFinal) {
					finalTranscript = firstAlternative.transcript;
				} else {
					interimTranscript += firstAlternative.transcript;
				}
			}

			// capitalize transcript if start of new sentence
			var transcript = finalTranscript || interimTranscript;
			transcript = !prefix || isSentence ? capitalize(transcript) : transcript;

			// append transcript to cached input value
			inputEl.value = prefix + transcript;

			// set cursur and scroll to end
			inputEl.focus();
			if (inputEl.tagName === 'INPUT') {
				inputEl.scrollLeft = inputEl.scrollWidth;
			} else {
				inputEl.scrollTop = inputEl.scrollHeight;
			}

			restartTimer();
		};

		micBtn.addEventListener('click', function(event) {
			event.preventDefault();

			// stop and exit if already going
			if (recognizing) {
				recognition.stop();
				return;
			}

			// Cache current input value which the new transcript will be appended to
			var endsWithWhitespace = inputEl.value.slice(-1).match(/\s/);
			prefix = !inputEl.value || endsWithWhitespace ? inputEl.value : inputEl.value + ' ';

			// check if value ends with a sentence
			isSentence = prefix.trim().slice(-1).match(/[\.\?\!]/);

			// restart recognition
			recognition.start();
		}, false);
})();