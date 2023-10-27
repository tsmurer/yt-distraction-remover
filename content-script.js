console.log("starting content-scripts.js")
changeRecommendationList(true)
changeThumbnails(true)

try {
    document.addEventListener('DOMContentLoaded', function () {
        // Now that the page is fully loaded, handle messages from the popup
        chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
            if (message.text === 'Hello from popup!') {
                // Handle the message received from the popup
                console.log('Message from popup:', message.text);
    
                // You can perform any action here in response to the message.
            }
        });
    });
} catch(e) {
    console.log(e)
}



function changeRecommendationList(shouldItGoAway) {
    console.log("changeRecommendationList(" + shouldItGoAway + ")");
    let rightColumn = document
    console.log(rightColumn)
    rightColumn.style.display = shouldItGoAway ? "none" : "block";
}

function changeThumbnails(shouldThemGoAway) {
    console.log("changeThumbnails(" + shouldThemGoAway + ")");
    const thumbnails = document.querySelectorAll('[id=thumbnail]');
    thumbnails.forEach((thmb) => {
        thmb.style.display = shouldThemGoAway ? "none" : "block"; // Fix the typo here
    });
}