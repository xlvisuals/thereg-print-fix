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
├── package_for_signing  # shell script to package the src directory
├── README.md            # This file
└── src                  # 
    ├── background.js    # Click handler: injects styles and calls window.print()
    ├── icon.png         # Toolbar icon
    └── manifest.json    # Extension manifest (Manifest V2)
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

## Sign a new version at Mozilla.org

### Submit a new version at Mozilla.org for signing
- set "version" in manifest.json
- Run ./package_for_signing.sh
- Increment "version" in manifest.json
- Sign in to https://addons.mozilla.org
- Go to https://addons.mozilla.org/en-US/developers/addons
- Click "Submit a New Add-on", or 
- Click on your Add-on > "Upload New Version"
- Complete the steps

### Install the signed Add-on
- Go to https://addons.mozilla.org/en-US/developers/addons
- Click on your Add-on > "View All" 
- Click on latest version e.g. "Version 1.1"
- Click on the .xpi entry, e.g. "3ec8953fab184d25ad08-1.1.xpi" to install
- Right-click on the .xpi entry and choose "Save Links as .." to download


## License

MIT License

Copyright (c) 2026 [Axel Busch]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

## Disclaimer

This extension was developed with the assistance of [Claude Sonnet](https://www.anthropic.com).

