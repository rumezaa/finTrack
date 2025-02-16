import { jsx as _jsx } from "react/jsx-runtime";
// src/content.tsx
import ReactDOM from 'react-dom/client'; // Use createRoot from react-dom/client
import Game from './components/Game'; // Import your Game component (it’s a .tsx file)
// Add custom CSS (for the popup, etc.)
const addCustomStyle = (css) => {
    const style = document.createElement('style');
    style.innerHTML = css;
    document.head.appendChild(style);
};
// Custom CSS for the popup
addCustomStyle(`
  .mindful-popup-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.4);
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
    const overlay = document.createElement('div');
    overlay.classList.add('mindful-popup-overlay');
    const contentBox = document.createElement('div');
    contentBox.classList.add('mindful-popup-content');
    // Render React component inside the contentBox
    const root = ReactDOM.createRoot(contentBox); // Create a root element for rendering
    root.render(_jsx(Game, {})); // Render the Game component into the popup
    overlay.appendChild(contentBox);
    document.body.appendChild(overlay);
    // Handle button click to remove the popup
    document.getElementById('continuePurchase')?.addEventListener('click', () => {
        overlay.remove(); // Remove popup
    });
};
// Function to find and intercept purchase buttons
const findPurchaseButtons = () => {
    const buttons = [];
    // Define button selectors or classes
    const selectors = [
        'button', // Generic button tag
        '.buy-now', // Specific class for buy buttons
        // Add more selectors here for different sites
    ];
    selectors.forEach(selector => {
        // Type assertion to ensure the elements are buttons
        buttons.push(...Array.from(document.querySelectorAll(selector)));
    });
    return buttons;
};
// Intercept purchase buttons and show popup
const interceptPurchaseButtons = () => {
    const buttons = findPurchaseButtons();
    buttons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent default action
            showPopup(); // Show the mindful popup
        });
    });
};
// Run on page load and DOM changes
interceptPurchaseButtons();
new MutationObserver(() => {
    interceptPurchaseButtons();
}).observe(document.body, { childList: true, subtree: true });
