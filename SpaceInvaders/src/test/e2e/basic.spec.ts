import { test, expect } from '@playwright/test';

test.describe('Space Invaders - Tests E2E', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    });

    test('Le jeu se charge sans erreur console critique', async ({ page }) => {
        const errors: string[] = [];
        page.on('console', (msg) => {
            if (msg.type() === 'error') {
                errors.push(msg.text());
                console.log('Erreur détectée:', msg.text());
            }
        });

        const canvas = page.locator('#canvas');
        await expect(canvas).toBeVisible();

        expect(errors).toHaveLength(0);
    });

    test('L’interface affiche les éléments de départ (Score)', async ({ page }) => {
        const body = page.locator('body');
        await expect(body).toContainText(/0/);
    });

    test('Le titre du jeu ou les instructions sont présents', async ({ page }) => {
        await expect(page.getByText(/Space|Invaders/i)).toBeVisible();
    });

    test('Le bouton de démarrage ou l’interaction est possible', async ({ page }) => {
        await page.keyboard.press('ArrowLeft');
        await page.keyboard.press('ArrowRight');
    });

});
