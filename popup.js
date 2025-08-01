document.getElementById("start").addEventListener("click", async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ["content.js"]
  });

  document.getElementById("statusColor").style = "background-color:green;";
});

document.getElementById("stop").addEventListener("click", () => {
  chrome.runtime.sendMessage({ action: "stop-cleaning" });
  document.getElementById("statusColor").style = "background-color:red;";
});

chrome.runtime.onMessage.addListener((msg) => {
  if (msg.type === "statusLog") {
    const statusLogDiv = document.getElementById("statusLog");
    statusLogDiv.innerText += `\n${msg.message}`;
  } else if (msg.type === "totalStatus") {
    const totalStatusDiv = document.getElementById("totalStatus");
    totalStatusDiv.innerText = `${msg.message}`;
  } else if (msg.type === "finishStatus") {
    const finishStatusDiv = document.getElementById("finishStatus");
    finishStatusDiv.innerText = `${msg.message}`;
  }
});