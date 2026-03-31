import { test as base } from '@playwright/test';
import { TextBoxPage } from '../pages/textBox.page';
import { PracticeFormPage } from '../pages/practiceForm.page';
import { PostsApiService } from '../services/posts.api.service';

type AppFixtures = {
    textBoxPage: TextBoxPage;
    practiceFormPage: PracticeFormPage;
    postsApi: PostsApiService;
};

export const test = base.extend<AppFixtures>({
    textBoxPage: async ({ page }, use) => {
        await use(new TextBoxPage(page));
    },
    practiceFormPage: async ({ page }, use) => {
        await use(new PracticeFormPage(page));
    },
    postsApi: async ({ request }, use) => {
        await use(new PostsApiService(request));
    },
});

export { expect } from '@playwright/test';
