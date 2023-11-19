import {client} from './client';

export async function getClassifications() {
    try {
        const response = await client.get('/classify');
        return response.data;
    } catch (error) {
        return error;
    }
}