import { APIRequestContext, APIResponse } from '@playwright/test';
import { Post } from '../types/post.types';

export class PostsApiService {
    private static readonly BASE_URL = 'https://jsonplaceholder.typicode.com';

    constructor(private readonly request: APIRequestContext) {}

    async getPosts(): Promise<APIResponse> {
        return this.request.get(`${PostsApiService.BASE_URL}/posts`);
    }

    async getPostById(id: number): Promise<APIResponse> {
        return this.request.get(`${PostsApiService.BASE_URL}/posts/${id}`);
    }

    async createPost(data: Omit<Post, 'id'>): Promise<APIResponse> {
        return this.request.post(`${PostsApiService.BASE_URL}/posts`, { data });
    }
}
