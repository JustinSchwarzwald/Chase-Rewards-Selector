console.log("Chase-Rewards-Selector -> Started running: service-worker.js")

urls = new Set()


chrome.action.onClicked.addListener(tab => {
  chrome.scripting.executeScript(
  {
    target: { tabId: tab.id },
    files : [ "content.js" ],
  })
  .then(() => console.log("Chase-Rewards-Selector -> content.js injected"));
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.message === "saveUrls") {
    urls = request.offerUrls
    console.log(request.offerUrls);
    runActivation(urls[0])
  }
});

function runActivation(url) {
  urls.shift()
  console.log(url)
  chrome.tabs.create({ url: url }, function(tab) {
      chrome.tabs.onUpdated.addListener(function listener (tabId, info) {
        console.log("Chase-Rewards-Selector -> tabId: " + tabId + " Info: " + info)
        if (info.status === 'complete' && tabId === tab.id) {
          chrome.tabs.onUpdated.removeListener(listener);
          chrome.scripting.executeScript({
            target: { tabId: tab.id },
            files: ['activateOffers.js']
          }).then(() => {
            console.log("Chase-Rewards-Selector -> activatingOffers.js");
            if(urls.length > 0){
              runActivation(urls[0]);
            } else {
              console.log("Chase-Rewards-Selector -> All offersActivated");
            }
          }).catch((error) => {
            console.error('Failed to execute script:', error);
          });
        }
      });
    });
}

// Listen for the message from the content script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.command === "closeTab") {
    chrome.tabs.remove(sender.tab.id);
  }
});