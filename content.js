function wait(){
  var attempts = 0;
  while(attempts < 50000){
      attempts = attempts + 1;
  }
}

// Open account pannel
document.querySelectorAll('[data-testid="accounts-name-link"]')[0].children[0].shadowRoot.querySelector('button[class="button button--tertiary"]').click();

// Open chase offers page
document.querySelectorAll('[data-testid="offerCarouselHeaderTitle"]')[0].click();

// Get all accounts
let accounts = document.getElementsByTagName("mds-select-option");
wait()
console.log(">LOGGED")

// For each Account
for (var i = 0; i < accounts.length; i++) {
  accounts[i].shadowRoot.firstChild.click();
  wait();

  // Get non already selected offers
  let interactiveElements = document.querySelectorAll('[color="interactive"]');

  // Click on all rewards
  interactiveElements.forEach((element) => {
    element.shadowRoot.firstChild.click();
    wait();
    history.back();
    wait();
  });
}
// Go back to homepage
window.location.href = "https://secure.chase.com/web/auth/dashboard#/dashboard/overview";