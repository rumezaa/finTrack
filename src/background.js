chrome.action.onClicked.addListener(function(tab) {
    const googleSignInUrl = "https://accounts.google.com/ServiceLogin";  // This is the URL to Google's sign-in page
    chrome.tabs.create({ url: googleSignInUrl });
  });
chrome.runtime.onInstalled.addListener(() => {
    console.log("CashCorn Extension Installed");
  });
  
  // Listener to react to messages sent from the content script
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "blockButtonClick") {
      console.log("Blocking button click on:", message.url);
  
      // Check if sender.tab is defined to safely access tabId
      if (sender.tab && sender.tab.id) {
        const tabId = sender.tab.id;
  
        // Inject the function to display the blocking overlay on the page
        chrome.scripting.executeScript({
          target: { tabId: tabId },
          func: showBlockingOverlay,
        });
  
        // Send a response back to the content script (optional)
        sendResponse({ success: true });
      }
    }
  
    // Returning true to indicate asynchronous response
    return true;
  });
  
  // Function to show overlay on the page (injected into the page context)
  function showBlockingOverlay() {
    const overlay = document.createElement("div");
    overlay.id = "cashcorn-overlay";
    overlay.classList.add(
      "fixed", "top-0", "left-0", "w-full", "h-full", "bg-black/80",
      "flex", "justify-center", "items-center", "z-[9999]"
    );
  
    const popup = document.createElement("div");
    popup.classList.add(
      "bg-white", "p-6", "rounded-2xl", "shadow-lg", "w-96", "text-center", "flex", "flex-col", "gap-4"
    );
  
    const title = document.createElement("h2");
    title.innerText = "Whoa! Think Before You Buy 🛒";
    title.classList.add("text-xl", "font-bold", "text-gray-800");
  
    const message = document.createElement("p");
    message.innerText = "Are you sure you want to continue?";
    message.classList.add("text-gray-600");
  
    const confirmButton = document.createElement("button");
    confirmButton.innerText = "Yes, Proceed";
    confirmButton.classList.add(
      "bg-blue-500", "text-white", "px-4", "py-2", "rounded-lg", "hover:bg-blue-600", "transition"
    );
  
    confirmButton.addEventListener("click", () => {
      overlay.remove(); // Remove the overlay
      document.body.style.overflow = "auto"; // Restore scrolling
    });
  
    // Append elements to the popup and overlay
    popup.appendChild(title);
    popup.appendChild(message);
    popup.appendChild(confirmButton);
    overlay.appendChild(popup);
    document.body.appendChild(overlay);
  
    // Disable scrolling while the overlay is present
    document.body.style.overflow = "hidden";
  }
  
