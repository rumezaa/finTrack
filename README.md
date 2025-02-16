# CashCorn Project Story

## We teach through examples and awareness

CashCorn takes inspiration from squirrels that learn to stock up over the winter to live an easier and smoother cold season, and we think that individuals striving for financial independence are quite similar. They need to critically think about the time and reasons for them spending money, especially in the digital age where online impulse purchases are all too common.

## Allows you to think critically about your purchases

CashCorn is a Google extension that does a couple of things for you. It detects when you're making an impulsive buy, and stops you in your tracks by forcing you to play and reflect on if you truly need the product and showing you the common risks associated with it. With this, participants can think and see if this is a purchase they need, or something they can cook at home.

## A clean extension built using conventional front-end tools creatively

We built CashCorn as a Chrome extension using react app built with Vite:

- **Frontend:** react-app developed through Vite for quick and easy installation with tailwind
- **Build Process:** Vite was used due to its speed and having the most familiarity in the group
- **Extension Architecture:**  
  - **Content Script:** Injects our code into shopping pages to detect purchase button clicks and render the overlay. Popup shows up when a button click is detected to annoy users and provide them time to think about their choices
  - **Background Script:** Handles logging and stores purchase attempt statistics
  - **Popup:** Provides a dedicated UI when clicking the extension icon, with a dashboard displaying ho your monthly budgeting goals are fitting up your play and wall
- **Tooling:** We used Chrome manifest 3 and then went with VS Code from there

## Challenges we ran into

Building CashCorn wasn’t without challenge for each of us

- **New to chrome extensions:** We encountered multiple errors as we learned about the difference between browsers and how extensions interact with the user. It's a difficulty we wouldn't have experienced had it not been a challenge
- **Commiting Complexity:** Working on multiple features on multiple branches made it difficult to work off each other. With everyone having their own component, it was difficult for inspiration to arise as we were all working on our own things until discussed further
- **File Structure & Integration:** We had to refine our project structure to avoid duplicate or unused files, ensuring a clean workspace, mainly because of the confusion from Vite regarding .js, .jsx, .ts and .tsx files
- **Cross-Site Compatibility:** Designing selectors to reliably intercept purchase buttons on different websites (like Amazon and Temu) meant we needed to test and adapt our code for varying DOM structures. This presented with other challenges such as finding alternative methods for activation

## Accomplishments that we're proud of

- **Seamless User Experience:** Despite the technical challenges, CashCorn provides a smooth, responsive overlay that gently interrupts the buying process, encouraging users to reflect before making a purchase.
- **Thorough set of Features:** We built an extension that integrates multiple modern solutions that all have their own creative and important element towards improving independence for all, especially those looking for financial stability.
- **Flexibility and Scalability:** The project’s modular design with components and parts allows the use of updates or changes as time passes, to keep the methods of keeping impulsive buyers aware

## What we learned

Throughout this project, we deepened our understanding of:

- **Chrome Extension Development:** Navigating the constraints and features of Manifest V3, content scripts, and background service workers. The biggest challenge was understanding the injection and background processes that are needed by a Chrome extension
- **Modern Frontend Tooling:** Normally we use Next.js, but we opted for Vite because we were working on an extension, and wanted different tools to use. Overall was the same, but some small nuances forced us to break some habits
- **Cross-Platform Challenges:** Adapting our code to work reliably across various online retail platforms with differing HTML structures, as well as making sure we accounted for both Mac and Windows with commands and spacing, was crucial to a smooth running development and product phase.
- **Mindfulness in Technology:** The importance of building tools that are interesting and helpful is to help others by providing a viable solution that doesn't just make money

## What's next for CashCorn

Looking ahead, we envision a richer CashCorn experience:

- **Enhanced Analytics:** Advanced analytics on site data, to block or hide commonly wasted money on products so that people are not tempted to move towards purchases
- **Personalized Recommendations:** Leverage machine learning to tailor mindful buying habits through fostering the NEED for buying and not want at all moments
- **Broader Platform Support:** Expand support beyond the basic stores to ones that have buying ability either store wide or a nasty return policy
- **Community Features:** Foster a community of people who are growing more independence through their own self awareness and reflection

CashCorn represents our commitment to building technology that not only innovates, but also inspires better decision-making and healthier financial habits. We’re excited to continue refining and expanding its capabilities in the future.
