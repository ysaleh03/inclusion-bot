import { Classification } from '../App';
import { client } from './client';
import { AxiosError } from 'axios';

export enum ClassificationResultType {
    Success = 'success',
    Error = 'error'
}

export type ClassificationResult = {
    type: ClassificationResultType;
    data: AxiosError | Classification[];
}

export async function getClassifications(texts: string[]): Promise<ClassificationResult> {
    try {
        const response = await client.post('/classify', texts);
        return {type: ClassificationResultType.Success, data: response.data};
    } catch (error) {
        return {type: ClassificationResultType.Error, data: error as AxiosError};
    }
}