# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: basic.spec.ts >> Space Invaders - Tests E2E >> Le jeu se charge sans erreur console critique
- Location: src/test/e2e/basic.spec.ts:9:5

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('canvas')
Expected: visible
Error: strict mode violation: locator('canvas') resolved to 2 elements:
    1) <canvas width="1280" height="720" id="background"></canvas> aka locator('#background')
    2) <canvas id="canvas" width="1000" height="1000"></canvas> aka locator('#canvas')

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for locator('canvas')

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - paragraph [ref=e4]: "Score: 0"
  - generic [ref=e6]:
    - heading "Space Invaders" [level=1] [ref=e7]
    - button "Start" [ref=e8] [cursor=pointer]
    - group "Input source" [ref=e9]:
      - generic [ref=e10]: Input source
      - generic [ref=e11]:
        - radio "Mouse" [checked] [ref=e12] [cursor=pointer]
        - generic [ref=e13] [cursor=pointer]: Mouse
      - generic [ref=e14]:
        - radio "Gamepad" [ref=e15] [cursor=pointer]
        - generic [ref=e16] [cursor=pointer]: Gamepad
      - generic [ref=e17]:
        - radio "Mobile" [ref=e18] [cursor=pointer]
        - generic [ref=e19] [cursor=pointer]: Mobile
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | test.describe('Space Invaders - Tests E2E', () => {
  4  | 
  5  |     test.beforeEach(async ({ page }) => {
  6  |         await page.goto('/');
  7  |     });
  8  | 
  9  |     test('Le jeu se charge sans erreur console critique', async ({ page }) => {
  10 |         const errors: string[] = [];
  11 |         page.on('console', (msg) => {
  12 |             if (msg.type() === 'error') {
  13 |                 errors.push(msg.text());
  14 |                 console.log('Erreur détectée:', msg.text());
  15 |             }
  16 |         });
  17 | 
  18 |         const canvas = page.locator('canvas');
> 19 |         await expect(canvas).toBeVisible();
     |                              ^ Error: expect(locator).toBeVisible() failed
  20 | 
  21 |         expect(errors).toHaveLength(0);
  22 |     });
  23 | 
  24 |     test('L’interface affiche les éléments de départ (Score)', async ({ page }) => {
  25 |         const body = page.locator('body');
  26 |         await expect(body).toContainText(/0/);
  27 |     });
  28 | 
  29 |     test('Le titre du jeu ou les instructions sont présents', async ({ page }) => {
  30 |         await expect(page.getByText(/Space|Invaders/i)).toBeVisible();
  31 |     });
  32 | 
  33 |     test('Le bouton de démarrage ou l’interaction est possible', async ({ page }) => {
  34 |         await page.keyboard.press('ArrowLeft');
  35 |         await page.keyboard.press('ArrowRight');
  36 |     });
  37 | 
  38 | });
  39 | 
```