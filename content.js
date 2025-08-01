(async () => {
  const delay = (ms) => new Promise((res) => setTimeout(res, ms));

  const getVideoItems = () =>
    Array.from(document.querySelectorAll('ytd-playlist-video-renderer'));

  const sendStatus = (message) => {
    chrome.runtime.sendMessage({ type: "statusLog", message });
  };

  const clickRemoveSequentially = async () => {
    const videos = getVideoItems();
    const videosLeng = await videos.length;
    chrome.runtime.sendMessage({ type: "totalStatus", message : videosLeng });

    for (let i = 0; i < videos.length -1; i++) {
      const video = getVideoItems()[i];
      if (!video) continue;

      const menuBtn = video.querySelector('ytd-menu-renderer yt-icon-button');
      if (!menuBtn) {
        sendStatus(`⚠️ ${i + 1}. menu button not found.`);
        continue;
      }

      menuBtn.click();
      await delay(500);

      const buttons = Array.from(document.querySelectorAll('ytd-menu-service-item-renderer'));
      const removeBtn = buttons.find(btn => {
        const text = btn.innerText.trim().toLowerCase();
        return text.includes("listesinden kaldır");
      });

      if (removeBtn) {
        removeBtn.click();
        sendStatus(`✅ ${i + 1}. video remove.`);
        const currentVid = i + 1;
        chrome.runtime.sendMessage({ type: "finishStatus", message : currentVid });
      } else {
        sendStatus(`❌ ${i + 1}. video: 'Listeden kaldır' bulunamadı.`);
      }

      await delay(300);
    }

    sendStatus('🎉 Finish.');
  };

  await clickRemoveSequentially();
})();
