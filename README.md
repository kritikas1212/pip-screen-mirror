# Quick PiP Toggle (Chrome Extension)

A Manifest V3 Chrome extension that toggles native Picture-in-Picture for the main video on the active tab.

## 30-Second Install (Unpacked)

1. Open Chrome and go to chrome://extensions.
2. Turn on Developer mode (top-right toggle).
3. Click Load unpacked.
4. Select this folder: /Users/kritikasingh/screen mirror
5. Pin the extension from the Extensions menu (optional).
6. Open any page with a video and click the extension icon to toggle PiP.

## What To Expect

- First click: enters Picture-in-Picture on the best matching video.
- Next click: exits Picture-in-Picture.
- If PiP is blocked by the site or no video is found, a small non-intrusive message appears.

## Fullscreen Behavior

- In tab fullscreen or video fullscreen, Chrome hides the top toolbar, so the extension icon can look like it disappeared. The extension is still installed.
- Use the keyboard command Command+Shift+Y on macOS (or Ctrl+Shift+Y on Windows/Linux) to toggle PiP while fullscreen.
- You can change the shortcut at chrome://extensions/shortcuts.

## Notes

- Some restricted pages (for example, chrome:// pages) do not allow script injection.
- Some DRM-protected players may block PiP regardless of extension code.
- Icons are placeholders and can be replaced anytime.
# pip-screen-mirror
