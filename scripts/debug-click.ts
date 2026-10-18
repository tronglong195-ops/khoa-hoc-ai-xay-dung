import { chromium } from 'playwright';

async function testClick() {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  page.on('console', msg => console.log('LOG:', msg.type(), msg.text()));
  page.on('pageerror', err => console.log('PAGE ERROR:', err.message));

  await page.goto('http://localhost:5000/#/buoi/01');
  await page.waitForTimeout(1000);
  console.log('Initial URL:', page.url());

  // Click on 'Thư Viện Prompt'
  console.log('Clicking on tab Thư Viện Prompt...');
  await page.locator('button', { hasText: 'Thư Viện Prompt' }).click();
  await page.waitForTimeout(1500);
  console.log('After click URL:', page.url());

  const markdownBody = await page.$('.markdown-body');
  console.log('Markdown body found?', !!markdownBody);
  if (markdownBody) {
    const text = await markdownBody.innerText();
    console.log('Text length:', text.length);
  } else {
    // Check what elements are in page
    const buttons = await page.$$eval('button', els => els.map(e => e.innerText));
    console.log('Buttons on page:', buttons);
    const bodyText = await page.$eval('body', el => el.innerText.slice(0, 300));
    console.log('Body snippet:', bodyText);
  }

  await browser.close();
}

testClick().catch(console.error);
