import { expect, test } from '../fixtures';

test.describe('Authentication', () => {
    test('shows an error for wrong credentials', async ({ loginPage }) => {
        await loginPage.page.route('**/auth/token', async (route) =>
            route.fulfill({ status: 401, body: 'Unauthorized' }),
        );
        await loginPage.goto();
        await loginPage.login('wrong', 'creds');
        await expect(loginPage.errorAlert).toBeVisible();
    });

    test('home page shows search UI for authenticated users placeholder flow', async ({
        homePage,
    }) => {
        await homePage.goto();
        await expect(homePage.loginLink).toBeVisible();
    });
});
