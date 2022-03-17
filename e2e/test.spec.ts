import { test, expect } from '@playwright/test';

test('Some test', async ({ page, baseURL}) => {
    await page.goto(baseURL + '/index.html');

    await expect(page).toHaveTitle("Title");
});