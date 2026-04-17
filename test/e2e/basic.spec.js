import {test, expect} from '@playwright/test';

test('No errors on loading', async ({page}) => {
  const errors = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error') errors.push(msg.text());
  });
  await page.goto('/');
  await page.waitForSelector('#canvas');
  expect(errors).toHaveLength(0);
});

test('Canvas is visible', async ({page}) => {
  await page.goto('/');
  await expect(page.locator('#canvas')).toBeVisible();
});

test('Title heading is visible', async ({page}) => {
  await page.goto('/');
  await expect(page.getByRole('heading', {name: 'Two Spaceships Passing In The'})).toBeVisible();
});

test('Health and score display initial values', async ({page}) => {
  await page.goto('/');
  await expect(page.locator('.h')).toHaveText('100');
  await expect(page.locator('.s')).toHaveText('0');
});

test('Game over overlay is hidden on start', async ({page}) => {
  await page.goto('/');
  await expect(page.locator('.e')).toBeHidden();
});

test('Game over screen shows restart button', async ({page}) => {
  await page.goto('/');
  await page.evaluate(() => {
    document.querySelector('.e').hidden = false;
  });
  await expect(page.locator('.e')).toBeVisible();
  await expect(page.getByText('Game over')).toBeVisible();
  await expect(page.getByRole('button', {name: 'Restart'})).toBeVisible();
});

test('Restart button reloads the page', async ({page}) => {
  await page.goto('/');
  await page.evaluate(() => {
    document.querySelector('.e').hidden = false;
  });
  await page.getByRole('button', {name: 'Restart'}).click();
  await expect(page.locator('.e')).toBeHidden();
});
