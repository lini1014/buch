import type { Page, Locator } from '@playwright/test';

export class LoginPage {
    readonly page: Page;
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly submitButton: Locator;
    readonly errorAlert: Locator;

    constructor(page: Page) {
        this.page = page;
        this.usernameInput = page.getByPlaceholder(/benutzername/i);
        this.passwordInput = page.getByPlaceholder(/passwort/i);
        this.submitButton = page.getByRole('button', { name: /anmelden/i });
        this.errorAlert = page.getByRole('alert').filter({ hasText: /unauthorized/i });
    }

    async goto() {
        await this.page.goto('/login');
    }

    async login(username: string, password: string) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.submitButton.click();
    }
}
