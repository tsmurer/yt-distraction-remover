console.log("Starting content-scripts.js");

// Function to change the recommendation list
function changeRecommendationList(shouldItGoAway) {
    const rightColumn = document.querySelector("#related");
    if (rightColumn) {
        rightColumn.style.display = shouldItGoAway ? "none" : "block";
    }
}

// Function to change the thumbnails
function changeThumbnails(shouldThemGoAway) {
    const thumbnails = document.querySelectorAll('[id=thumbnail]');
    thumbnails.forEach((thmb) => {
        thmb.style.display = shouldThemGoAway ? "none" : "block";
    });
}

// Create a MutationObserver to observe changes in the DOM
const observer = new MutationObserver((mutationsList, observer) => {
    mutationsList.forEach((mutation) => {
        if (mutation.addedNodes && mutation.addedNodes.length > 0) {
            changeRecommendationList(true);
            changeThumbnails(true);
        }
    });
});

// Define the observer configuration
const observerConfig = {
    childList: true,
    subtree: true,   
};

// Start observing the document
observer.observe(document, observerConfig);

// The following code listens for messages from a Chrome extension's popup
try {
    document.addEventListener('DOMContentLoaded', function () {
        chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
        });
    });
} catch (e) {
    console.log(e);
}