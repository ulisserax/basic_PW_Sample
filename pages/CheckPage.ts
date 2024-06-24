import { Page, expect } from '@playwright/test';

export class CheckPages {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async loginPage() {
        await expect(this.page.locator('.nav-link', { hasText: 'Sign in' })).toBeVisible();
        await expect(this.page.locator('.nav-link', { hasText: 'Sign up' })).toBeVisible();
    }

    async signUpPage() {
        await expect(this.page.locator('h1.text-xs-center')).toContainText('Sign up');
        await expect(this.page.locator('input[placeholder="Username"]')).toBeVisible();
        await expect(this.page.locator('input[placeholder="Email"]')).toBeVisible();
        await expect(this.page.locator('input[placeholder="Password"]')).toBeVisible();
    }

    async homePage(nickname: string) {
        await expect(this.page.locator('.nav-link', { hasText: nickname })).toBeVisible();
        await expect(this.page.locator('.nav-link', { hasText: 'Home' })).toBeVisible();
        await expect(this.page.locator('h1.logo-font')).toBeVisible();
    }

    async profilePage(username: string) {
        await expect(this.page.locator('h4', { hasText: username })).toBeVisible();
    }
    
}
