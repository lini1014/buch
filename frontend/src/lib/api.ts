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
export const bookApi = {
    list: async (params?: ListParams, token?: string) => {
        const url = buildUrl('/rest', {
            titel: params?.titel,
            lieferbar: params?.lieferbar,
            art: params?.art,
            javascript: params?.javascript,
            typescript: params?.typescript,
            java: params?.java,
            python: params?.python,
            page: params?.page,
            size: params?.size,
        });
        return request<Page<Buch>>(url, { token });
    },
    get: async (id: number, token?: string) => {
        const url = buildUrl(`/rest/${id}`);
        return request<Buch>(url, { token });
    },
    create: async (payload: unknown, token?: string) => {
        const url = buildUrl('/rest');
        return request<Buch>(url, {
            method: 'POST',
            token,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        });
    },
    update: async (
        id: number,
        payload: unknown,
        token?: string,
        version?: string | number,
    ) => {
        const url = buildUrl(`/rest/${id}`);
        let ifMatch: string | undefined;
        if (version !== undefined) {
            const vStr = String(version);
            ifMatch = vStr.startsWith('"') ? vStr : `"${vStr}"`;
        }
        return request<Buch>(url, {
            method: 'PUT',
            token,
            headers: {
                'Content-Type': 'application/json',
                ...(ifMatch !== undefined ? { 'If-Match': ifMatch } : {}),
            },
            body: JSON.stringify(payload),
        });
    },
    remove: async (id: number, token?: string) => {
        const url = buildUrl(`/rest/${id}`);
        return request<void>(url, {
            method: 'DELETE',
            token,
        });
    },
};
