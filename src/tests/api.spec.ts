import { expect, test } from './fixture';
import { Post } from '../types/post.types';

test.describe('Task 6 — GET /posts', () => {
    test('Returns 200 with a valid array of Post objects', async ({ postsApi }) => {
        // Hard assertion — if status isn't 200, there's no point continuing
        const response = await test.step('Send GET request to /posts', async () => {
            return postsApi.getPosts();
        });

        await test.step('Validate HTTP status is 200', async () => {
            expect(response.status(), 'Response status code should be 200').toBe(200);
        });

        const posts: Post[] = await test.step('Parse and validate response is an array', async () => {
            const body = await response.json();
            // Hard assertion — if body isn't an array the schema checks below would throw
            expect(Array.isArray(body), 'Response body should be a JSON array').toBe(true);
            return body;
        });

        await test.step('Validate array length — JSONPlaceholder always returns 100 posts', async () => {
            expect.soft(posts, 'Should return exactly 100 posts').toHaveLength(100);
        });

        await test.step('Validate each post conforms to the Post schema', async () => {
            // Spot-check first item with full property assertions
            expect.soft(posts[0], 'First post should match Post schema').toMatchObject({
                userId: expect.any(Number),
                id: expect.any(Number),
                title: expect.any(String),
                body: expect.any(String),
            });

            expect.soft(posts[0], 'First post id should be 1').toHaveProperty('id', 1);

            // Verify field types across every post
            for (const post of posts) {
                expect
                    .soft(typeof post.userId, `Post ${post.id}: userId should be a number`)
                    .toBe('number');
                expect
                    .soft(typeof post.id, `Post ${post.id}: id should be a number`)
                    .toBe('number');
                expect
                    .soft(typeof post.title, `Post ${post.id}: title should be a string`)
                    .toBe('string');
                expect
                    .soft(typeof post.body, `Post ${post.id}: body should be a string`)
                    .toBe('string');
            }
        });
    });
});
