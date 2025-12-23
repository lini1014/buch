import type { Buch, Page } from './types';

export const API_BASE =
    process.env.NEXT_PUBLIC_API_BASE?.replace(/\/$/, '') ||
    'https://localhost:3000';
const STATIC_BEARER_TOKEN = process.env.NEXT_PUBLIC_API_TOKEN;

type ListParams = {
    readonly titel?: string;
    readonly lieferbar?: boolean;
    readonly art?: string;
    readonly javascript?: boolean;
    readonly typescript?: boolean;
    readonly java?: boolean;
    readonly python?: boolean;
    readonly page?: number;
    readonly size?: number;
};

const buildUrl = (path: string, params?: Record<string, unknown>) => {
    const url = new URL(`${API_BASE}${path}`);
    if (params !== undefined) {
        Object.entries(params).forEach(([key, value]) => {
            if (value === undefined || value === null || value === '') {
                return;
            }
            url.searchParams.append(key, String(value));
        });
    }
    return url.toString();
};

type RequestConfig = RequestInit & { token?: string };

async function request<T>(path: string, init?: RequestConfig): Promise<T> {
    const { token, ...rest } = init ?? {};
    const res = await fetch(path, {
        ...rest,
        headers: {
            Accept: 'application/json',
            ...(token === undefined
                ? undefined
                : { Authorization: `Bearer ${token}` }),
            ...(token === undefined && STATIC_BEARER_TOKEN !== undefined
                ? { Authorization: `Bearer ${STATIC_BEARER_TOKEN}` }
                : undefined),
            ...rest.headers,
        },
        cache: 'no-store',
    });

    if (!res.ok) {
        const message = await res.text();
        throw new Error(
            message || `Request failed with status ${res.status.toString()}`,
        );
    }

   // Bei 204 oder leerem Body nicht parsen
    const text = await res.text();
    if (!text) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return undefined as T;
    }
    return JSON.parse(text) as T;
}