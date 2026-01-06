import type { Page, Locator } from '@playwright/test';

export class HomePage {
    readonly page: Page;
    readonly searchField: Locator;
    readonly searchButton: Locator;
    readonly loginLink: Locator;

    constructor(page: Page) {
        this.page = page;
        this.searchField = page.getByPlaceholder('Titel oder Stichwort');
        this.searchButton = page.getByRole('button', { name: /suchen/i });
        this.loginLink = page.getByRole('link', { name: /anmelden/i });
    }

    async goto() {
        await this.page.goto('/');
    }
}
