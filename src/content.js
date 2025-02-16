// Detecting buy buttons and preventing immediate purchases

const detectBuyButton = () => {
    const buttonTypes = [
        "#buy-now-button",
        ".btn-buy-now",
        "button:contains('Buy Now')",
        "button:contains('Add to Cart')",
        "button:contains('Buy')",
        "button:contains('Purchase')"
    ];

    for (const type of buttonTypes) {
        const button = document.querySelector(type);
        if (button) {
            console.log("buy button detected", button);
            button.addEventListener("click", showBlockingOverlay);
            return;
        }
    }
};

const showBlockingOverlay = () => {
    event.preventDefault(); // Stop immediate purchase
  
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
      overlay.remove();
      document.body.style.overflow = "auto";
      (event.target).click(); // Trigger original button
    });
  
    injectTailwindAnimations();

    // Append elements
    popup.appendChild(title);
    popup.appendChild(message);
    popup.appendChild(confirmButton);
    overlay.appendChild(popup);
    document.body.appendChild(overlay);
    document.body.style.overflow = "hidden"; // Disable scrolling
};

const injectTailwindAnimations = () => {
  if (document.getElementById("cashcorn-styles")) return;

  const style = document.createElement("style");
  style.id = "cashcorn-styles";
  style.innerHTML = `
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    .animate-fadeIn {
      animation: fadeIn 0.3s ease-in-out;
    }

    @keyframes fadeOut {
      from { opacity: 1; }
      to { opacity: 0; }
    }
    .animate-fadeOut {
      animation: fadeOut 0.3s ease-in-out;
    }

    @keyframes scaleUp {
      from { transform: scale(0.8); opacity: 0; }
      to { transform: scale(1); opacity: 1; }
    }
    .animate-scaleUp {
      animation: scaleUp 0.3s ease-in-out;
    }
  `;
  document.head.appendChild(style);
};

window.addEventListener("load", detectBuyButton)