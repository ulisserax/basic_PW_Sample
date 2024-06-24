import { test, expect } from '@playwright/test';
import { CheckPages } from '../pages/CheckPage';
import { UserActions } from '../pages/UserActions';

test.describe('Exploring Authors', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        const userActions = new UserActions(page);
        await userActions.toLogin(process.env.EMAIL as string, process.env.PASSWORD as string);
    });

    test('should explore authors and perform actions', async ({ page }) => {
        const checkPages = new CheckPages(page);

        await checkPages.homePage('testerUser');

        const authorElement = page.locator('a.author').nth(2);
        const author = await authorElement.innerText();
        await authorElement.click();

        await expect(page.locator('h4')).toHaveText(author.trim());

        const articles = page.locator('.article-preview');
        await expect(articles).toBeVisible();
        
        for (const article of await articles.all()) {
            expect(article).toBeVisible();
        }
        
        const followButton = page.locator('button', { hasText: 'Follow' });
        await expect(followButton).toBeVisible();
        await followButton.click();
    });
});
