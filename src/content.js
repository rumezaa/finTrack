// Add Custom CSS - Function
const Add_Custom_Style = css => document.head.appendChild(document.createElement("style")).innerHTML = css;

// Add custom CSS (for popup and other styles)
Add_Custom_Style(`
   
    /* Popup styles */
    .mindful-popup-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.4);  /* Lighter opacity */
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
    }

    .mindful-popup-content {
        background: white;
        padding: 20px;
        border-radius: 8px;
        text-align: center;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    }

    .mindful-popup-content button {
        background: #007bff;
        color: white;
        border: none;
        padding: 10px 20px;
        border-radius: 4px;
        cursor: pointer;
    }

    .mindful-popup-content button:hover {
        background: #0056b3;
    }
`);

// Function to show the mindful popup
const showPopup = () => {
    // Create overlay
    const overlay = document.createElement('div');
    overlay.classList.add('mindful-popup-overlay');

    // Create content box
    const contentBox = document.createElement('div');
    contentBox.classList.add('mindful-popup-content');

    // Add content
    contentBox.innerHTML = `
        <h2>Mindful Pause</h2>
        <p>Are you sure you want to proceed with your purchase?</p>
        <button id="continuePurchase">Continue</button>
    `;

    // Append content to overlay
    overlay.appendChild(contentBox);
    document.body.appendChild(overlay);

    // Add event listener to close popup
    document.getElementById('continuePurchase').addEventListener('click', () => {
        overlay.remove();  // Remove overlay on click
        // You can also trigger the original purchase action here if needed
    });
}

// Find all purchase buttons (based on the selectors you have for each website)
const findPurchaseButtons = () => {
    const buttons = [];
    
    const PURCHASE_BUTTON_IDENTIFIERS = {
        text: ['buy now', 'add to cart', 'checkout', 'purchase', 'place order', 'add to basket', 'proceed to checkout'],
        classes: ['buy-button', 'add-to-cart', 'checkout-button'],
        selectors: {
            'amazon': '[name="submit.buy-now"], [name="submit.add-to-cart"]',
            'ebay': '.btn-primary.vi-bin-header, #binBtn_btn',
            'walmart': '.button--primary:contains("Add to cart")',
            'etsy': '.add-to-cart-button, .buy-now-button'
        }
    };
    
    // Check text content of buttons
    const textNodes = document.evaluate(
      "//button[contains(translate(., 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '" + 
      PURCHASE_BUTTON_IDENTIFIERS.text.join("') or contains(translate(., 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '") + 
      "')]",
      document,
      null,
      XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
      null
    );

    for (let i = 0; i < textNodes.snapshotLength; i++) {
        buttons.push(textNodes.snapshotItem(i));
    }

    // Check class names and selectors
    PURCHASE_BUTTON_IDENTIFIERS.classes.forEach(className => {
        buttons.push(...Array.from(document.getElementsByClassName(className)));
    });

    // Check hostname-specific selectors
    const hostname = window.location.hostname;
    for (const [site, selector] of Object.entries(PURCHASE_BUTTON_IDENTIFIERS.selectors)) {
        if (hostname.includes(site)) {
            buttons.push(...Array.from(document.querySelectorAll(selector)));
        }
    }

    return [...new Set(buttons)];
}

// Intercept purchase buttons
const interceptPurchaseButtons = () => {
    const buttons = findPurchaseButtons();
    
    buttons.forEach(button => {
        // Intercept the first click on the button
        button.addEventListener('click', (e) => {
            e.preventDefault();  // Prevent the original action

            // Only show the popup if it's the first click
            if (!button.dataset.popupShown) {
                showPopup();  // Show the mindful popup
                button.dataset.popupShown = "true";  // Mark this button to prevent future popups
            } else {
                // Allow the purchase to continue if the popup was already shown
                button.click();  // Trigger the purchase action (click again)
            }
        });
    });
}

// Run on page load and DOM changes
interceptPurchaseButtons();
new MutationObserver(() => {
    interceptPurchaseButtons();
}).observe(document.body, { childList: true, subtree: true });
