chrome.runtime.onMessage.addListener((msg, sender) => {
  if (["statusLog", "totalStatus", "finishStatus"].includes(msg.type)) {
    chrome.runtime.sendMessage(msg);
  }
});