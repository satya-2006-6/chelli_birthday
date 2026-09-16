// ============================================================
//  🎂 BIRTHDAY WEBSITE — PERSONALIZATION CONFIG
//  Edit this file to customize everything for your sister!
// ============================================================

const CONFIG = {
  // ── Names ──────────────────────────────────────────────────
  SISTER_NAME: "Her Name",        // e.g. "panda"
  SISTER_NICKNAME: "Sis",             // e.g. "Panda" / "lavanya"

  // ── Custom Message (Page 3 overrides) ──────────────────────
  // Leave empty to use the default heartfelt letter.
  BIRTHDAY_MESSAGE: "",

  // ── Photos (Page 4 - Memories) ─────────────────────────────
  // Replace with paths to your actual photos.
  // e.g. "photos/photo1.jpg" or full URL
  PHOTOS: [
    { src: "WhatsApp Image 2026-09-16 at 11.04.47 AM (3)", caption: "Our crazy moments 😂❤️" },
    { src: "WhatsApp Image 2026-09-16 at 11.04.47 AM (2)", caption: "Memories that never get old ✨" },
    { src: "WhatsApp Image 2026-09-16 at 11.04.47 AM", caption: "Forever partners in crime 😌" },
    { src: "WhatsApp Image 2026-09-16 at 11.04.46 AM", caption: "One picture, a thousand memories ❤️" },
    { src: "WhatsApp Image 2026-09-16 at 11.04.45 AM", caption: "Growing together ❤️" },
    { src: "WhatsApp Image 2026-09-16 at 11.04.47 AM (1)", caption: "Always family. 🌸" },
    { src: "WhatsApp Image 2026-09-16 at 11.04.47 AM (1)", caption: "Side by side always 💗" },
    { src: "WhatsApp Image 2026-09-16 at 11.04.45 AM", caption: "The best kind of chaos 😄❤️" },
  ],

  // ── Music ───────────────────────────────────────────────────
  // Replace with path to your audio file, e.g. "music/song.mp3"
  MUSIC_FILE: "",

  // ── Optional: Birthday year (just for display) ──────────────
  BIRTHDAY_YEAR: new Date().getFullYear(),
};

// Make globally available
window.CONFIG = CONFIG;
