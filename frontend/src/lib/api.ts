import type { Buch, Page } from './types';

const API_BASE =
    process.env.NEXT_PUBLIC_API_BASE?.replace(/\/$/, '') ||
    'https://localhost:3000';

type ListParams = {
    readonly titel?: string;
    readonly lieferbar?: boolean;
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

async function request<T>(path: string, init?: RequestInit): Promise<T> {
    const res = await fetch(path, {
        ...init,
        headers: {
            Accept: 'application/json',
            ...init?.headers,
        },
        cache: 'no-store',
    });

    if (!res.ok) {
        const message = await res.text();
        throw new Error(
            message || `Request failed with status ${res.status.toString()}`,
        );
    }

    return res.json() as Promise<T>;
}

export const bookApi = {
    list: async (params?: ListParams) => {
        const url = buildUrl('/rest', {
            titel: params?.titel,
            lieferbar: params?.lieferbar,
            page: params?.page,
            size: params?.size,
        });
        return request<Page<Buch>>(url);
    },
    get: async (id: number) => {
        const url = buildUrl(`/rest/${id}`);
        return request<Buch>(url);
    },
};
