import assert from 'node:assert/strict';
import { mkdir, readdir, readFile } from 'node:fs/promises';
import { chromium } from 'playwright';
import AxeBuilder from '@axe-core/playwright';

const url = process.env.TEST_URL || 'http://127.0.0.1:4173';
const files = await readdir('dist', { recursive: true });
assert(!files.some(file => /HOMELAB|NosWeb|finance\.png|imagens\//i.test(file) || (/\.pdf$/i.test(file) && !['documentos/certificado-redes-cisco.pdf', 'documentos/curriculo-joao-goncalves.pdf'].includes(file))), 'Arquivos privados no build');
for (const file of ['documentos/certificado-redes-cisco.pdf', 'documentos/curriculo-joao-goncalves.pdf']) assert(files.includes(file), `Documento ausente: ${file}`);
const html = await readFile('dist/index.html', 'utf8');
assert(html.includes('rel="canonical"') && html.includes('og:image'), 'Metadados ausentes');
const browser = await chromium.launch({
  args: process.env.TEST_RESOLVE_IP ? [`--host-resolver-rules=MAP ${new URL(url).hostname} ${process.env.TEST_RESOLVE_IP}`] : [],
});
await mkdir('test-results', { recursive: true });
try {
  const context = await browser.newContext();
  const page = await context.newPage();
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  for (const theme of ['light', 'dark']) {
    await page.emulateMedia({ colorScheme: theme, reducedMotion: 'reduce' });
    for (const width of [320, 375, 768, 1024, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(url);
      await page.waitForSelector('h1');
      assert.equal(await page.locator('h1').count(), 1);
      assert.equal(await page.locator('html').getAttribute('data-theme'), theme);
      assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `Overflow: ${width}/${theme}`);
      await page.locator('img').evaluateAll(images => images.forEach(image => { image.loading = 'eager'; }));
      await page.waitForFunction(() => [...document.images].every(image => image.complete && image.naturalWidth > 0));
      const audit = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
      assert.deepEqual(audit.violations.map(v => ({ id: v.id, nodes: v.nodes.map(n => n.target) })), [], `Acessibilidade: ${width}/${theme}`);
      if ([375, 1440].includes(width)) await page.screenshot({ path: `test-results/${theme}-${width}.png`, fullPage: true });
      for (const href of await page.locator('a[href^="#"]').evaluateAll(links => links.map(a => a.getAttribute('href')))) {
        assert(await page.locator(href).count(), `Âncora inválida: ${href}`);
      }
    }
  }
  await page.setViewportSize({ width: 375, height: 900 });
  await page.goto(url);
  const menu = page.locator('button[aria-controls="navigation"]');
  await menu.click();
  assert.equal(await menu.getAttribute('aria-expanded'), 'true');
  await page.keyboard.press('Escape');
  assert.equal(await menu.getAttribute('aria-expanded'), 'false');
  assert(await menu.evaluate(button => button === document.activeElement));
  await menu.click();
  await page.getByRole('navigation').getByRole('link', { name: 'Projetos' }).click();
  assert.equal(await menu.getAttribute('aria-expanded'), 'false');
  await page.locator('details summary').first().focus();
  await page.keyboard.press('Enter');
  assert(await page.locator('details').first().evaluate(element => element.open));
  await page.getByRole('button', { name: 'Ativar tema claro' }).click();
  await page.reload();
  assert.equal(await page.locator('html').getAttribute('data-theme'), 'light');
  assert.deepEqual(errors, [], 'Erros de JavaScript');
  if (process.env.PRODUCTION === '1') {
    for (const path of ['/nao-existe', '/HOMELAB.md', '/imagens/finance.png', '/imagens/NosWeb.png', '/JoaoVitorAlvesGoncalves_Curriculum__PT_BR_-1.pdf']) {
      assert.equal((await page.goto(url + path)).status(), 404, `Arquivo/rota indevidamente servido: ${path}`);
    }
  }
  console.log('OK: dois temas, cinco larguras, axe, imagens, âncoras, menu, teclado, persistência e privacidade do build.');
} finally { await browser.close(); }
