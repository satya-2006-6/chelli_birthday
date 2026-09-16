// ============================================================
//  🎂 BIRTHDAY WEBSITE — PERSONALIZATION CONFIG
//  Edit this file to customize everything for your sister!
// ============================================================

const CONFIG = {
  // ── Names ──────────────────────────────────────────────────
  SISTER_NAME:     "Lavanya",
  SISTER_NICKNAME: "Lavu",

  // ── Custom Message (Page 3 overrides) ──────────────────────
  // Leave empty to use the default heartfelt letter.
  BIRTHDAY_MESSAGE: "",

  // ── Photos (Page 4 - Memories) ─────────────────────────────
  // Put your WhatsApp photos directly in d:\chelli\
  // The filenames below match exactly what WhatsApp saves them as.
  PHOTOS: [
    { src: "WhatsApp Image 2026-09-16 at 11.04.47 AM (3).jpeg", caption: "Our crazy moments 😂❤️" },
    { src: "WhatsApp Image 2026-09-16 at 11.04.47 AM (2).jpeg", caption: "Memories that never get old ✨" },
    { src: "WhatsApp Image 2026-09-16 at 11.04.47 AM.jpeg",     caption: "Forever partners in crime 😌" },
    { src: "WhatsApp Image 2026-09-16 at 11.04.46 AM.jpeg",     caption: "One picture, a thousand memories ❤️" },
    { src: "WhatsApp Image 2026-09-16 at 11.04.45 AM.jpeg",     caption: "Growing together ❤️" },
    { src: "WhatsApp Image 2026-09-16 at 11.04.47 AM (1).jpeg", caption: "Always family. 🌸" },
    { src: "WhatsApp Image 2026-09-16 at 11.04.47 AM (1).jpeg", caption: "Side by side always 💗" },
    { src: "WhatsApp Image 2026-09-16 at 11.04.45 AM.jpeg",     caption: "The best kind of chaos 😄❤️" },
  ],

  // ── Music ───────────────────────────────────────────────────
  // Replace with path to your audio file, e.g. "music/song.mp3"
  MUSIC_FILE: "",

  // ── Optional: Birthday year (just for display) ──────────────
  BIRTHDAY_YEAR: new Date().getFullYear(),
};

// Make globally available
window.CONFIG = CONFIG;
