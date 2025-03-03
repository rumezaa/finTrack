
// chrome.runtime.onInstalled.addListener(() => {
//     console.log("CashCorn Extension Installed");
//   });
  
//   // Listener to react to messages sent from the content script
//   chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//     if (message.action === "blockButtonClick") {
//       console.log("Blocking button click on:", message.url);
  
//       // Check if sender.tab is defined to safely access tabId
//       if (sender.tab && sender.tab.id) {
//         const tabId = sender.tab.id;
  
//         // Inject the function to display the blocking overlay on the page
//         chrome.scripting.executeScript({
//           target: { tabId: tabId },
//           func: showBlockingOverlay,
//         });
  
//         // Send a response back to the content script (optional)
//         sendResponse({ success: true });
//       }
//     }
  
//     // Returning true to indicate asynchronous response
//     return true;
//   });
  
//   // Function to show overlay on the page (injected into the page context)
//   function showBlockingOverlay() {
//     const overlay = document.createElement("div");
//     overlay.id = "cashcorn-overlay";
//     overlay.classList.add(
//       "fixed", "top-0", "left-0", "w-full", "h-full", "bg-black/80",
//       "flex", "justify-center", "items-center", "z-[9999]"
//     );
  
//     const popup = document.createElement("div");
//     popup.classList.add(
//       "bg-white", "p-6", "rounded-2xl", "shadow-lg", "w-96", "text-center", "flex", "flex-col", "gap-4"
//     );
  
//     const title = document.createElement("h2");
//     title.innerText = "Whoa! Think Before You Buy 🛒";
//     title.classList.add("text-xl", "font-bold", "text-gray-800");
  
//     const message = document.createElement("p");
//     message.innerText = "Are you sure you want to continue?";
//     message.classList.add("text-gray-600");
  
//     const confirmButton = document.createElement("button");
//     confirmButton.innerText = "Yes, Proceed";
//     confirmButton.classList.add(
//       "bg-blue-500", "text-white", "px-4", "py-2", "rounded-lg", "hover:bg-blue-600", "transition"
//     );
  
//     confirmButton.addEventListener("click", () => {
//       overlay.remove(); // Remove the overlay
//       document.body.style.overflow = "auto"; // Restore scrolling
//     });
  
//     // Append elements to the popup and overlay
//     popup.appendChild(title);
//     popup.appendChild(message);
//     popup.appendChild(confirmButton);
//     overlay.appendChild(popup);
//     document.body.appendChild(overlay);
  
//     // Disable scrolling while the overlay is present
//     document.body.style.overflow = "hidden";
//   }


// background.js
// chrome.webNavigation.onCompleted.addListener((details) => {
//   chrome.scripting.executeScript({
//     target: { tabId: details.tabId },
//     files: ["content.js"]
//   });
// }, { url: [{ urlMatches: "https://.*" }] });


chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'showGame') {
    // Create a new popup window with a fixed position
    chrome.windows.create(
      {
        url: chrome.runtime.getURL('index.html'), // Specify your popup HTML here
        type: 'popup',
        width: 300,
        height: 400,
        left: window.screen.width - 300, // Use window.screen for positioning
        top: window.screen.height - 400,
      },
      (newWindow) => {
        // Optional: Handle any logic after the window is created (e.g., logging or modifications)
        console.log('Popup created', newWindow);
      }
    );

    // Send a message to the active tab in the current window
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      // Ensure the tab is valid before trying to send the message
      if (tabs && tabs.length > 0) {
        chrome.tabs.sendMessage(tabs[0].id, { action: 'showGame' }, (response) => {
          if (chrome.runtime.lastError) {
            console.error('Error sending message to tab:', chrome.runtime.lastError);
          }
        });
      } else {
        console.error('No active tab found');
      }
    });
  }
});





  
