console.log("Chase-Rewards-Selector -> Started running: activateOffers.js")

// Function to execute when the elements have loaded
function interactWithElements() {
  let interactiveElements = document.querySelectorAll('[color="interactive"]');
  console.log("Chase-Rewards-Selector -> Found Offers: "+ interactiveElements.length)

  interactiveElements.forEach((element) => {
    console.log("Chase-Rewards-Selector -> Clicking: " + element.parentNode.parentNode.parentNode.getAttribute("aria-label"))
    element.shadowRoot.firstChild.click();
    history.back();
  });
  console.log("Chase-Rewards-Selector -> sendingFinishedActivation");
  chrome.runtime.sendMessage({message: "finishedActivation"});
}

// Set up a MutationObserver to watch for changes in the body of the document
let observer = new MutationObserver(function(mutations) {
  // If the elements are now present, interact with them and disconnect the observer
  if (document.querySelector('[color="interactive"]')) {
    interactWithElements();
    observer.disconnect();
  }
});

// Start observing the document with the configured parameters
observer.observe(document.body, { childList: true, subtree: true });