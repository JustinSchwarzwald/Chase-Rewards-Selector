console.log("Chase-Rewards-Selector -> Started running: content.js")
offerHref = 'https://secure.chase.com/web/auth/dashboard#/dashboard/merchantOffers/offer-hub?accountId='

offerUrls = new Set();

document.querySelectorAll('[data-testid="accounts-name-link"]').forEach( (accountNameButton) => {
  offerUrls.add(offerHref + accountNameButton.firstChild.getAttribute("id").replace(/^\D+/g, ""))
});

console.log("Chase-Rewards-Selector -> offerUrls found: " + offerUrls.size + " = " + [...offerUrls].join(' ')); 

chrome.runtime.sendMessage({message: "saveUrls", offerUrls: Array.from(offerUrls) });

// // Open each URL open a new tab and run activateOffer script
// offerUrls.forEach((url) => {
//   console.log(url);
//   chrome.runtime.sendMessage({message: "saveUrls", urls: url });
// });
