const PURCHASE_BUTTON_IDENTIFIERS = {
    text: ['buy now', 'add to cart', 'checkout', 'purchase', 'place order', 'add to basket'],
    classes: ['buy-button', 'add-to-cart', 'checkout-button'],
    selectors: {
      'amazon': '[name="submit.buy-now"], [name="submit.add-to-cart"]',
      'ebay': '.btn-primary.vi-bin-header, #binBtn_btn',
      'walmart': '.button--primary:contains("Add to cart")',
      'etsy': '.add-to-cart-button, .buy-now-button'
    }
  };
  
  import { createRoot } from 'react-dom/client';
  import MindfulPopup from '../components/MindfulPopup';
  
  let popupRoot: ReturnType<typeof createRoot> | null = null;
  let isPopupVisible = false;
  
  const showPopup = () => {
    let container = document.getElementById('mindful-shopping-root');
    if (!container) {
      container = document.createElement('div');
      container.id = 'mindful-shopping-root';
      document.body.appendChild(container);
    }
  
    if (!popupRoot) {
      popupRoot = createRoot(container);
    }
  
    isPopupVisible = true;
    popupRoot.render(
      <MindfulPopup 
        isVisible={isPopupVisible} 
        onComplete={() => {
          isPopupVisible = false;
          popupRoot?.render(
            <MindfulPopup 
              isVisible={false} 
              onComplete={() => {}} 
            />
          );
          chrome.runtime.sendMessage({
            action: 'purchaseAttempted',
            timestamp: new Date().toISOString(),
            url: window.location.href
          });
        }} 
      />
    );
  };
  
  const findPurchaseButtons = () => {
    const buttons: Element[] = [];
    
    // Check text content
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
      buttons.push(textNodes.snapshotItem(i) as Element);
    }
  
    // Check class names and selectors
    PURCHASE_BUTTON_IDENTIFIERS.classes.forEach(className => {
      buttons.push(...Array.from(document.getElementsByClassName(className)));
    });
  
    const hostname = window.location.hostname;
    for (const [site, selector] of Object.entries(PURCHASE_BUTTON_IDENTIFIERS.selectors)) {
      if (hostname.includes(site)) {
        buttons.push(...Array.from(document.querySelectorAll(selector)));
      }
    }
  
    return [...new Set(buttons)];
  };
  
  const interceptPurchaseButtons = () => {
    const buttons = findPurchaseButtons();
    
    buttons.forEach(button => {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        showPopup();
      });
    });
  };
  
  // Run on page load and DOM changes
  interceptPurchaseButtons();
  new MutationObserver(() => {
    interceptPurchaseButtons();
  }).observe(document.body, { childList: true, subtree: true });

  // src/content/amazonInterceptor.ts
export function interceptAmazonPurchaseButtons() {
  const selectors = ['#add-to-cart-button', '#buy-now-button'];

  function handleButtonClick(event: Event) {
    event.preventDefault();
    event.stopPropagation();

    const overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    overlay.style.zIndex = '9999';
    overlay.style.display = 'flex';
    overlay.style.justifyContent = 'center';
    overlay.style.alignItems = 'center';
    overlay.style.color = '#fff';

    const contentBox = document.createElement('div');
    contentBox.style.background = '#fff';
    contentBox.style.padding = '20px';
    contentBox.style.borderRadius = '8px';
    contentBox.style.color = '#000';
    contentBox.style.textAlign = 'center';
    contentBox.innerHTML = `
      <h2>Mindful Pause</h2>
      <p>Are you sure you want to proceed with your purchase?</p>
      <button id="continuePurchase">Continue</button>
    `;
    
    overlay.appendChild(contentBox);
    document.body.appendChild(overlay);

    document.getElementById('continuePurchase')?.addEventListener('click', () => {
      overlay.remove();
      // Optionally trigger original button action here.
    });
  }

  selectors.forEach(selector => {
    const button = document.querySelector(selector);
    if (button) {
      button.addEventListener('click', handleButtonClick);
    }
  });
}
