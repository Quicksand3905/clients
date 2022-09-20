import { TabMessage } from "src/types/tab-messages";

async function copyText(text: string) {
  await window.navigator.clipboard.writeText(text);
}

async function onMessageListener(
  msg: TabMessage,
  sender: chrome.runtime.MessageSender,
  responseCallback: (response: unknown) => void
) {
  switch (msg.command) {
    case "copyText":
      await copyText(msg.text);
      responseCallback(null);
      break;
    case "clearClipboard":
      await copyText("\u0000");
      break;
    default:
  }
}

chrome.runtime.onMessage.addListener(onMessageListener);
