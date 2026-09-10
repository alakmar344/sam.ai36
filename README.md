# sam.ai36

> **SAM AI (Strategic Adaptive Mind) — an early experiment from the sam.ai lineage.**

This repository is one of the early iterations of the **sam.ai** project line — the
prompt-engineering-first voice/productivity assistant concept that later evolved into
[eSAMz](https://esamz.me) and the current models behind eSAMz Code.

## What's here

`sam.ai/deepseek_javascript_20251007_57ebdb - Copy.js` — a single-file browser chat
client that talks to the Gemini API with the **SAM V3 prompt** (the *DART model*:
Diagnose & Acknowledge → Adapt & Recommend → Recommend Timeline & Track progress).
It renders a chat UI, persists history to `localStorage`, and was a quick prototype
of what a guided, non-generic coaching assistant could feel like.

## ⚠️ Security note (important)

An earlier revision of this file **contained a hardcoded Gemini API key committed to
the repository**. That key must be considered **public and compromised**:

- **The key was removed from the source in this commit.** It now reads the key at
  runtime from a `SAM_GEMINI_API_KEY` variable instead of a literal.
- **The previously committed key should be revoked/rotated** in
  [Google AI Studio](https://aistudio.google.com/apikey). Removing text from the
  latest commit does **not** un-leak a key that was public — rotation is the only
  real fix.
- It may still be visible in this repository's git **history**; see the
  "History" section below.

## Setup

The client expects a `SAM_GEMINI_API_KEY` variable to be defined before it loads.
The simplest way is a local `config.js` that is **not** committed:

```js
// config.js  (never commit this file)
window.SAM_GEMINI_API_KEY = 'your-key-here';
```

```html
<script src="config.js"></script>
<script src="sam.ai/deepseek_javascript_20251007_57ebdb - Copy.js"></script>
```

**Note on browser-side keys:** any key shipped to the browser is visible to users
of that page. This is acceptable for personal prototypes but never for production —
in production, proxy the request through a server (that is what eSAMz later did with
its chat proxy architecture).

## Lineage

`sam.ai` (concept) → `sam.ai365` (domain) → `sam.ai36` (this experiment) →
eSAMz (product) → [youAI](https://github.com/alakmar344/youAI-2B-From-Scratch-Transformer-Implementation)
(from-scratch models) → eSAMz Code. Kept public on purpose — the lineage is the story.

## License

None — personal experiment, kept for the record.
