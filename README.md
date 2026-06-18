# Remove Notification Counts from Title

A lightweight Tampermonkey userscript that automatically removes unread notification counts from browser tab titles.

Instead of seeing:

```
(1) Facebook
(25) Gmail
(99+) Discord
```

you'll simply see:

```
Facebook
Gmail
Discord
```

The script works continuously, so if a website updates the title after receiving new notifications, the notification count is removed again automatically.

---

## Features

- Removes notification prefixes like:
  - `(1)`
  - `(25)`
  - `(99+)`
- Works on **all websites** (`*://*/*`)
- Detects dynamic title updates using `MutationObserver`
- Automatically reconnects if a website recreates the `<title>` element
- Lightweight
- No dependencies
- No configuration required

---

## How It Works

The script watches the page's `<title>` element.

Whenever a website changes the tab title to include a notification count, such as:

```
(5) Discord
```

the script immediately changes it back to:

```
Discord
```

Some websites replace the entire `<title>` element instead of editing it. To support these sites, the script periodically checks and reattaches its observer every second.

---

## Notification Formats Removed

| Before | After |
|---------|-------|
| `(1) Gmail` | `Gmail` |
| `(9) Reddit` | `Reddit` |
| `(42) Discord` | `Discord` |
| `(99+) Facebook` | `Facebook` |

---

## Compatibility

Because the script runs on every website, it works anywhere a site displays notification counts by prefixing the page title.

Examples include:

- Facebook
- Messenger
- Gmail
- YouTube
- Discord
- Reddit
- Slack
- Outlook
- WhatsApp Web
- Microsoft Teams

...and many more.

---

## Installation

1. Install a userscript manager:
   - Tampermonkey
   - Violentmonkey
   - Greasemonkey

2. Install the userscript.

3. Refresh any open tabs.

That's it.

---

## Performance

The script is designed to be lightweight.

- Uses a `MutationObserver` instead of constantly modifying the page.
- Only edits the title when a notification prefix is detected.
- Performs a small maintenance check once per second to support websites that recreate their `<title>` element.

---

## License

MIT License