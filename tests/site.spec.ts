import { test, expect } from '@playwright/test';

for (const width of [360, 390, 430, 1440]) {
  test(`Layout and images at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 850 });
    const errors: string[] = [];
    page.on('pageerror', e => errors.push(e.message));
    await page.goto('/');
    await expect(page.locator('h1')).toContainText('Parecem iguais na foto.');
    for (const img of await page.locator('img').all()) await img.scrollIntoViewIfNeeded();
    await page.waitForFunction(() => Array.from(document.images).every(i => i.complete && i.naturalWidth > 0));
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
    expect(errors).toEqual([]);
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.screenshot({ path: `test-results/forma-${width}.png`, fullPage: true });
  });
}
test('Comparison, cases, FAQ, qualification and copy on mobile', async ({ page, context }) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  for (const name of ['Material', 'Acabamento', 'Projeto', 'Montagem', 'Ferragens']) {
    const button = page.getByRole('button', { name: new RegExp(`^${name}`) });
    await button.click();
    await expect(button).toHaveAttribute('aria-pressed', 'true');
  }
  await page.locator('.project summary').first().click();
  await expect(page.locator('.story').first()).toBeVisible();
  await page.locator('.faq summary').last().click();
  await expect(page.getByText('Sim, ela pode ajudar a explicar sua ideia.', { exact: false })).toBeVisible();
  await page.locator('#seu-projeto').scrollIntoViewIfNeeded();
  await expect(page.locator('.mobile-bar')).toHaveClass(/hidden/);
  await page.getByLabel('Em qual cidade?').fill('São José dos Campos, SP');
  await page.getByRole('button', { name: 'Continuar', exact: true }).click();
  await expect(page.getByRole('alert')).toContainText('Escolha um ambiente');
  await page.getByRole('button', { name: 'Cozinha', exact: true }).click();
  await page.getByRole('button', { name: 'Continuar', exact: true }).click();
  await page.getByLabel('Você tem as medidas?').selectOption('Tenho algumas medidas');
  await page.getByLabel('Já tem projeto ou planta?').selectOption('Tenho referências ou imagem de IA');
  await page.getByRole('button', { name: 'Voltar' }).click();
  await expect(page.getByLabel('Em qual cidade?')).toHaveValue('São José dos Campos, SP');
  await expect(page.getByRole('button', { name: 'Cozinha', exact: true })).toHaveAttribute('aria-pressed', 'true');
  await page.getByRole('button', { name: 'Continuar', exact: true }).click();
  await expect(page.getByLabel('Você tem as medidas?')).toHaveValue('Tenho algumas medidas');
  await page.getByRole('button', { name: 'Continuar', exact: true }).click();
  await page.getByRole('button', { name: 'Ver minha mensagem' }).click();
  await expect(page.getByLabel('Mensagem para copiar')).toContainText('São José dos Campos, SP');
  await expect(page.getByLabel('Mensagem para copiar')).toContainText('Prefiro conversar sobre isso');
  await expect(page.getByRole('link', { name: 'Abrir no WhatsApp' })).toHaveCount(0);
  await page.getByRole('button', { name: 'Copiar mensagem' }).click();
  await expect(page.getByRole('status')).toHaveText('Mensagem copiada!');
  expect(await page.evaluate(() => navigator.clipboard.readText())).toContain('Ambiente: Cozinha');
});
test('Mobile menu, required city and reduced motion', async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 780 });
  await page.goto('/');
  await page.getByRole('button', { name: 'Abrir menu' }).click();
  await page.getByRole('link', { name: 'Ambientes', exact: true }).click();
  await expect(page.getByRole('button', { name: 'Abrir menu' })).toHaveAttribute('aria-expanded', 'false');
  await page.getByRole('button', { name: 'Cozinha', exact: true }).click();
  await page.getByRole('button', { name: 'Continuar', exact: true }).click();
  await expect(page.getByLabel('Em qual cidade?')).toBeFocused();
  expect(await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior)).toBe('auto');
});
