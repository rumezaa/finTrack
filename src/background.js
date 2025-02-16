// background.js

chrome.runtime.onInstalled.addListener(() => {
  console.log("Extension installed!");
});

// Listen for a message from content.js when a purchase button is clicked
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "SHOW_GAME_POPUP") {
    showGamePopup();
  }
});

// Function to show the game popup
function showGamePopup() {
  chrome.windows.create({
    url: "popup.html", // URL of your React app (bundled with Vite)
    type: "popup",
    width: 400,
    height: 600,
    left: screen.width - 400, // Position the window on the right
    top: screen.height / 2 - 300, // Center vertically
  });
}
