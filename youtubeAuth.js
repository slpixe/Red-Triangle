var YOUTUBE_API_KEY ="AIzaSyD1FAU-dhvMVDsYucfSVEJnYQ7mzxkxMZs";
var YOUTUBE_CLIENT_ID = "770186346406-vfarrg780dneqf2p9v55p3klopglm9qt.apps.googleusercontent.com";
var CLIENT_SECRET = "cJNnCipM6dMiO55MQZk5Pp2M";
var DISCOVERY_URL = 'https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest';

var loginOutBtn = document.querySelector('#sign-in-or-out-button');
var authStatusDiv = document.querySelector('#auth-status');

var GoogleAuth;
var SCOPE = 'https://www.googleapis.com/auth/youtube.readonly';
function handleClientLoad() {
  // Load the API's client and auth2 modules.
  // Call the initClient function after the modules load.
  gapi.load('client:auth2', initClient);
}

function initClient() {
    console.log('initClient');
  // Initialize the gapi.client object, which app uses to make API requests.
  // Get API key and client ID from API Console.
  // 'scope' field specifies space-delimited list of access scopes.
  gapi.client.init({
      'apiKey': YOUTUBE_API_KEY,
      'discoveryDocs': [DISCOVERY_URL],
      'clientId': YOUTUBE_CLIENT_ID,
      'scope': SCOPE
  }).then(function () {
    GoogleAuth = gapi.auth2.getAuthInstance();

    // Listen for sign-in state changes.
    GoogleAuth.isSignedIn.listen(updateSigninStatus);

    // Handle initial sign-in state. (Determine if user is already signed in.)
    var user = GoogleAuth.currentUser.get();
    setSigninStatus();

    // Call handleAuthClick function when user clicks on
    //      "Sign In/Authorize" button.
    loginOutBtn.onclick = () => handleAuthClick();
  });
}

function handleAuthClick() {
  if (GoogleAuth.isSignedIn.get()) {
    // User is authorized and has clicked 'Sign out' button.
    GoogleAuth.signOut();
  } else {
    // User is not signed in. Start Google auth flow.
    GoogleAuth.signIn();
  }
}

function revokeAccess() {
  GoogleAuth.disconnect();
}

function setSigninStatus(isSignedIn) {
  var user = GoogleAuth.currentUser.get();
  var isAuthorized = user.hasGrantedScopes(SCOPE);
  if (isAuthorized) {
    loginOutBtn.innerHTML = 'Sign out';
  } else {
    loginOutBtn.innerHTML = 'Sign In/Authorize';
  }
}

function updateSigninStatus(isSignedIn) {
  setSigninStatus();
}