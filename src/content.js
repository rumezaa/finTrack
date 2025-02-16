(function() {
  // Declare the detectBuyButton function inside an IIFE to avoid global conflicts
  const detectBuyButton = () => {
    const buttonTypes = [
      "#buy-now-button",
      ".btn-buy-now",
      "button",
      "a",
      "input[type='submit']",
      "input[type='button']"
    ];

    // Keywords for matching Buy-related buttons
    const keywords = [
      "buy now",
      "add to cart",
      "buy",
      "purchase",
      "checkout",
      "order now"
    ];

    const checkButtons = () => {
      // Loop through the different button types
      for (const type of buttonTypes) {
        const buttons = document.querySelectorAll(type);
        buttons.forEach(button => {
          // Check text content (or value for input buttons)
          const text = button.textContent?.toLowerCase() || button.value?.toLowerCase();
          if (text && keywords.some(keyword => text.includes(keyword))) {
            console.log("Buy button detected:", button);

            // Add event listener to prevent immediate purchase and trigger the game
            button.addEventListener("click", (event) => {
              event.preventDefault(); // Stop the purchase action

              // Send message to React App to render the game
              chrome.runtime.sendMessage({ action: "showGame" });
            }, { once: true });
          }
        });
      }
    };

    checkButtons();

    // Observe for dynamically added buttons (e.g., Single Page Apps)
    const observer = new MutationObserver(() => checkButtons());
    observer.observe(document.body, { childList: true, subtree: true });
  };

  // Start detecting buttons when the page loads
  window.addEventListener("load", detectBuyButton);
})();
