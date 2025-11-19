const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1400, height: 900 } });

  const base = 'http://localhost:3000';
  const paths = ['dashboard', 'market', 'positions', 'strategies', 'history'];

  const logs = [];
  page.on('console', (msg) => {
    logs.push({ type: msg.type(), text: msg.text() });
  });
  page.on('pageerror', (err) => {
    logs.push({ type: 'pageerror', text: err.message });
  });

  const results = [];
  for (const path of paths) {
    const url = `${base}/${path}`;
    await page.goto(url, { waitUntil: 'networkidle' });
    await page.waitForTimeout(500);
    const metrics = await page.evaluate(() => {
      const containers = Array.from(document.querySelectorAll('.container'));
      return containers.slice(0, 3).map((el, idx) => {
        const rect = el.getBoundingClientRect();
        return {
          idx,
          left: rect.left,
          right: rect.right,
          width: rect.width,
        };
      });
    });
    results.push({ path, metrics });
  }

  await browser.close();

  console.log(JSON.stringify({ results, logs }, null, 2));
})();
