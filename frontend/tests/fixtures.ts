import { test as base } from '@playwright/test';
import { HomePage } from './page-objects/HomePage';
import { LoginPage } from './page-objects/LoginPage';

type Fixtures = {
    homePage: HomePage;
    loginPage: LoginPage;
};

export const test = base.extend<Fixtures>({
    homePage: async ({ page }, use) => {
        const home = new HomePage(page);
        await use(home);
    },
    loginPage: async ({ page }, use) => {
        const login = new LoginPage(page);
        await use(login);
    },
});

export const expect = test.expect;
