// Get non already selected offers
  let interactiveElements = document.querySelectorAll('[color="interactive"]');

  // Click on all rewards
  interactiveElements.forEach((element) => {
    element.shadowRoot.firstChild.click();
  });