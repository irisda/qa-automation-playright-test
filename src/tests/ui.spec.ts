import { expect, test } from './fixture';

// ─── Task 4 — Text Box ────────────────────────────────────────────────────────

test.describe('Task 4 — Text Box Form', () => {
    const formData = {
        fullName: 'Jane Doe',
        email: 'jane.doe@example.com',
        currentAddress: '123 Playwright Street, Automation City',
        permanentAddress: '456 Selenium Avenue, Testing Town',
    };

    test('Fill all fields, submit, and validate output values', async ({ textBoxPage }) => {
        await test.step('Navigate to the Text Box page', async () => {
            await textBoxPage.goto();
        });

        await test.step('Fill all form fields', async () => {
            await textBoxPage.fillForm(formData);
        });

        await test.step('Submit the form', async () => {
            await textBoxPage.submit();
        });

        await test.step('Validate submitted values are shown in the output section', async () => {
            await expect
                .soft(textBoxPage.outputName, 'Output should display the submitted full name')
                .toContainText(formData.fullName);

            await expect
                .soft(textBoxPage.outputEmail, 'Output should display the submitted email')
                .toContainText(formData.email);

            await expect
                .soft(
                    textBoxPage.outputCurrentAddress,
                    'Output should display the submitted current address',
                )
                .toContainText(formData.currentAddress);

            await expect
                .soft(
                    textBoxPage.outputPermanentAddress,
                    'Output should display the submitted permanent address',
                )
                .toContainText(formData.permanentAddress);
        });
    });
});

// ─── Task 5 — Practice Form ───────────────────────────────────────────────────

test.describe('Task 5 — Practice Form', () => {
    test('Positive: submit valid data and verify success modal', async ({ practiceFormPage }) => {
        const formData = {
            firstName: 'John',
            lastName: 'Playwright',
            email: 'john.playwright@example.com',
            gender: 'Male' as const,
            mobile: '0987654321',
            hobbies: ['Sports' as const, 'Reading' as const],
            currentAddress: '100 Test Lane, QA City, 12345',
            state: 'NCR',
            city: 'Delhi',
        };

        await test.step('Navigate to the Practice Form', async () => {
            await practiceFormPage.goto();
        });

        await test.step('Fill form with valid data', async () => {
            await practiceFormPage.fillForm(formData);
        });

        await test.step('Submit the form', async () => {
            await practiceFormPage.submit();
        });

        await test.step('Verify success modal appears with the correct title', async () => {
            await expect
                .soft(
                    practiceFormPage.successModalTitle,
                    'Success modal should appear after a valid submission',
                )
                .toHaveText('Thanks for submitting the form');
        });
    });

    test('Negative: submit empty form and verify required fields show errors', async ({
        practiceFormPage,
    }) => {
        await test.step('Navigate to the Practice Form', async () => {
            await practiceFormPage.goto();
        });

        await test.step('Click Submit without filling any required field', async () => {
            await practiceFormPage.submit();
        });

        await test.step('Verify success modal does NOT appear', async () => {
            await expect
                .soft(
                    practiceFormPage.successModal,
                    'Success modal must not appear when required fields are empty',
                )
                .not.toBeVisible();
        });

        await test.step('Verify required inputs are highlighted with an error border', async () => {
            // demoqa applies Bootstrap's danger color (220, 53, 69) to invalid fields
            await expect
                .soft(practiceFormPage.firstNameInput, 'First name should show error border')
                .toHaveCSS('border-color', 'rgb(220, 53, 69)');

            await expect
                .soft(practiceFormPage.lastNameInput, 'Last name should show error border')
                .toHaveCSS('border-color', 'rgb(220, 53, 69)');

            await expect
                .soft(practiceFormPage.mobileInput, 'Mobile number should show error border')
                .toHaveCSS('border-color', 'rgb(220, 53, 69)');
        });
    });
});
