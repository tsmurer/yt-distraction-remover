
const isOn = document.getElementById("onOffSwitch");
const isOnLabel = document.getElementById("onOffLabel");
const thumbnailSwitchGroup = document.getElementById("thumbnailsSwitchGroup");
const isTitleOnlyMode = document.getElementById("thumbnailSwitch");
const thumbnailSwitchLabel = document.getElementById("thumbnailSwitchLabel");

const extensionStates = {
  extensionEnabled: true,
  onlyTitlesMode: false,
};

isOn.addEventListener("click", toggleExtension);
isTitleOnlyMode.addEventListener("click", toggleThumbnailMode);

chrome.storage.local.get(["extensionStates"]).then((result) => {
    if (result.extensionStates !== undefined) {
      extensionStates.extensionEnabled = result.extensionStates.extensionEnabled;
      extensionStates.onlyTitlesMode = result.extensionStates.onlyTitlesMode;
      isOn.checked = extensionStates.extensionEnabled;
      isTitleOnlyMode.checked = extensionStates.onlyTitlesMode;
    }
    updateToState();
  });

function toggleExtension() {
  extensionStates.extensionEnabled = !extensionStates.extensionEnabled;
  updateToState();
  saveExtensionState();

  try {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      const message = { text: 'Hello from popup!' };
      chrome.tabs.sendMessage(tabs[0].id, message, function (response) {
          if (chrome.runtime.lastError) {
              console.error(chrome.runtime.lastError);
          } else {
              console.log('Content script responded:', response);
          }
      });
  });
  } catch(e) {
    console.log(e)
  }
}

function toggleThumbnailMode() {
  extensionStates.onlyTitlesMode = !extensionStates.onlyTitlesMode;
  updateToState();
  saveExtensionState();

  // Send a message to the content script
  try {
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
          const message = { onlyTitlesMode: extensionStates.onlyTitlesMode };
          chrome.tabs.sendMessage(tabs[0].id, message, function (response) {
              if (chrome.runtime.lastError) {
                  console.error(chrome.runtime.lastError);
              } else {
                  console.log('Content script responded:', response);
              }
          });
      });
  } catch (e) {
      console.error(e);
  }
}

  function saveExtensionState() {
    chrome.storage.local.set({ extensionStates: extensionStates }, () => {});
  }

  function updateToState() {
      isOnLabel.textContent = extensionStates.extensionEnabled ? "On" : "Off";
      isOnLabel.style.color = extensionStates.extensionEnabled ? "#4CBB17" : "#C70039";
      thumbnailSwitchGroup.style.display = extensionStates.extensionEnabled
          ? "block"
          : "none";
      thumbnailSwitchLabel.textContent = extensionStates.onlyTitlesMode
          ? "Remove whole suggestions column"
          : "Remove thumbnails only";
  }

