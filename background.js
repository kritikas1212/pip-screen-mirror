async function injectToggleScript(tabId) {
  if (!tabId) {
    console.warn("[PiP Toggle] No active tab ID available.");
    return;
  }

  try {
    await chrome.scripting.executeScript({
      target: { tabId: tabId },
      files: ["content.js"]
    });
  } catch (error) {
    console.warn(
      "[PiP Toggle] Failed to run on this page. Chrome internal pages and some sites block script injection.",
      error
    );
  }
}

chrome.action.onClicked.addListener(async (tab) => {
  await injectToggleScript(tab && tab.id);
});

chrome.commands.onCommand.addListener(async (command) => {
  if (command !== "toggle-pip") {
    return;
  }

  try {
    const tabs = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
    const activeTab = tabs && tabs.length ? tabs[0] : null;
    await injectToggleScript(activeTab && activeTab.id);
  } catch (error) {
    console.warn("[PiP Toggle] Could not resolve the active tab for keyboard shortcut.", error);
  }
});
