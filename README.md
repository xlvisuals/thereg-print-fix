# Print El Reg

A Firefox extension that fixes print styles on [The Register](https://www.theregister.com) and opens the print dialog — all with one click.

## What it fixes

The Register's new design (May 2026) has a few issues in print view:

- Body text and links are oversized
- The page renders as a narrow column instead of filling the paper width
- "The Reg" inline brand name renders at a larger size than surrounding text
- The "More Context" related-articles block appears mid-article
- Navigation, ads, headers, and footers clutter the printed page

## What it does

Click the toolbar button on any Register article and the extension will:

1. Inject corrected `@media print` styles into the page
2. Open the print dialog immediately

Nothing runs in the background or on page load. The extension only activates when you click it, using the `activeTab` permission.

## Installation

This extension is not listed on addons.mozilla.org, so it requires a Firefox variant that supports unsigned extensions.

**Firefox Developer Edition or Nightly** (permanent install):

1. Go to `about:config` and set `xpinstall.signatures.required` to `false`
2. Go to `about:addons` → gear icon → *Install Add-on From File*
3. Select `thereg-print-fix.zip`

**Any Firefox** (temporary, lost on browser restart):

1. Go to `about:debugging` → *This Firefox* → *Load Temporary Add-on*
2. Select `thereg-print-fix.zip` or the `manifest.json` inside the unzipped folder

## Files

```
thereg-print-fix/
├── manifest.json   # Extension manifest (Manifest V2)
├── background.js   # Click handler: injects styles and calls window.print()
├── icon.png        # Toolbar icon
└── README.md       # This file
```

## Updating the styles

If The Register updates their CSS class names and something breaks again, edit the selectors in `background.js`. To identify an element, open the browser console on a Register page and run:

```javascript
document.querySelectorAll('*').forEach(el => {
  if (el.childNodes.length === 1 &&
      el.childNodes[0].nodeType === 3 &&
      el.textContent.trim().includes('YOUR TEXT HERE')) {
    console.log(el.tagName, el.className, el.textContent.trim());
  }
});
```

After editing, reload the extension in `about:debugging` → *This Firefox* → *Reload*.
