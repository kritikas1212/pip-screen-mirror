(() => {
  const MESSAGE_ID = "pip-toggle-extension-message";
  const MESSAGE_DURATION_MS = 2200;

  function notify(message) {
    // Console warning keeps feedback non-intrusive if overlays are blocked by site styles.
    console.warn("[PiP Toggle] " + message);

    const existing = document.getElementById(MESSAGE_ID);
    if (existing) {
      existing.remove();
    }

    const toast = document.createElement("div");
    toast.id = MESSAGE_ID;
    toast.textContent = message;
    Object.assign(toast.style, {
      position: "fixed",
      right: "16px",
      bottom: "16px",
      zIndex: "2147483647",
      maxWidth: "min(360px, calc(100vw - 32px))",
      padding: "10px 12px",
      borderRadius: "10px",
      background: "rgba(0, 0, 0, 0.78)",
      color: "#fff",
      font: "13px/1.4 -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif",
      boxShadow: "0 6px 20px rgba(0,0,0,0.28)"
    });

    const host = document.fullscreenElement || document.documentElement;
    host.appendChild(toast);
    window.setTimeout(() => toast.remove(), MESSAGE_DURATION_MS);
  }

  function isValidVideo(video) {
    if (!(video instanceof HTMLVideoElement) || video.disablePictureInPicture) {
      return false;
    }

    const rect = video.getBoundingClientRect();
    const area = Math.max(0, rect.width) * Math.max(0, rect.height);
    const hasPixels = (video.videoWidth > 0 && video.videoHeight > 0) || area > 0;

    return hasPixels;
  }

  function scoreVideo(video) {
    const rect = video.getBoundingClientRect();
    const area = Math.max(0, rect.width) * Math.max(0, rect.height);
    const isPlaying = !video.paused && !video.ended && video.readyState > 2;

    // Prioritize currently playing videos before comparing visible size.
    return (isPlaying ? 10_000_000 : 0) + area;
  }

  function pickTargetVideo() {
    const videos = Array.from(document.querySelectorAll("video")).filter(isValidVideo);

    if (!videos.length) {
      return null;
    }

    videos.sort((a, b) => scoreVideo(b) - scoreVideo(a));
    return videos[0];
  }

  async function togglePiP() {
    try {
      if (!document.pictureInPictureEnabled) {
        notify("Picture-in-Picture is unavailable on this page.");
        return;
      }

      if (document.pictureInPictureElement) {
        await document.exitPictureInPicture();
        return;
      }

      const targetVideo = pickTargetVideo();
      if (!targetVideo) {
        notify("No suitable <video> element found on this page.");
        return;
      }

      // Keep native controls so users can play/pause from the PiP window.
      if (!targetVideo.controls) {
        targetVideo.controls = true;
      }

      await targetVideo.requestPictureInPicture();
    } catch (error) {
      const details = error && error.message ? " " + error.message : "";
      notify("Could not toggle Picture-in-Picture." + details);
    }
  }

  void togglePiP();
})();
