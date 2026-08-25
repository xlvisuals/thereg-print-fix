browser.browserAction.onClicked.addListener((tab) => {
  browser.tabs.executeScript(tab.id, {
    code: `
      (function () {
        // Avoid injecting twice if clicked again
        if (document.getElementById('el-reg-print-fix')) {
          window.print();
          return;
        }

        const style = document.createElement('style');
        style.id = 'el-reg-print-fix';
        style.textContent = \`
          @media print {
            /* Full-width column */
            body, #main, article, .article-body, .body-text,
            [class*="article"], [class*="content"], [class*="container"] {
              max-width: 100% !important;
              width: 100% !important;
              margin: 0 !important;
              padding: 0 10px !important;
              float: none !important;
              display: block !important;
            }

            /* Normalise link font size */
            a, a * {
              font-size: inherit !important;
              font-weight: inherit !important;
              line-height: inherit !important;
            }

            /* Base font sizes */
            body        { font-size: 11pt !important; }
            p, li, td,
            blockquote  { font-size: 11pt !important; line-height: 1.5 !important; }
            h1          { font-size: 18pt !important; }
            h2          { font-size: 14pt !important; }
            h3          { font-size: 12pt !important; }

            /* Fix "The Reg" inline brand span */
            span.m-italic, [class*="m-italic"] {
              font-size: inherit !important;
              font-style: italic !important;
            }

            /* Hide navigation, ads, and clutter */
            nav, header, footer, aside,
            .ad, [class*="ad-"],
            [class*="sidebar"],
            [class*="social"], [class*="share"],
            [class*="newsletter"],
            [id*="cookie"], [class*="cookie"],
            [class*="nav"], [class*="menu"],
            [class*="articleList"], [class*="article-list"],
            [class*="moreContext"], [class*="more-context"],
            [class*="moreStories"], [class*="moreCont"],
            [class*="toplist"], [class*="kicker"], 
            [class*="context"], [class*="recommended"] {
              display: none !important;
            }
          }
        \`;
        document.head.appendChild(style);

        // Removing the "bodytext" class entirely restores full width —
        // simpler and more reliable than fighting its CSS.
        document.querySelectorAll('.bodytext').forEach(el => {
          el.classList.remove('bodytext');
        });

        window.print();
      })();
    `
  });
});
