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
        if (info.status === 'complete' && tabId === tab.id) {
          chrome.tabs.onUpdated.removeListener(listener);
          chrome.scripting.executeScript({
            target: { tabId: tab.id },
            files: ['activateOffers.js']
          }).then(() => {
            console.log("Chase-Rewards-Selector -> activatingOffers.js");
            // chrome.tabs.remove(tab.id);
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