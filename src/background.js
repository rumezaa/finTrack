chrome.action.onClicked.addListener(function(tab) {
    const googleSignInUrl = "https://accounts.google.com/ServiceLogin";  // This is the URL to Google's sign-in page
    chrome.tabs.create({ url: googleSignInUrl });
  });