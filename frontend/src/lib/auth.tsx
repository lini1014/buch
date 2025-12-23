'use client';

import { useRouter } from 'next/navigation';
import {
    createContext,
    type ReactNode,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from 'react';
import { API_BASE } from './api';

type AuthContextValue = {
    readonly token?: string;
    readonly username?: string;
    readonly isAuthenticated: boolean;
    readonly isLoading: boolean;
    readonly error?: string;
    login: (username: string, password: string) => Promise<void>;
    logout: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const STORAGE_KEY = 'buch_auth';

type AuthStorage = {
    token: string;
    username?: string;
};

export const AuthProvider = ({ children }: { readonly children: ReactNode }) => {
    const [token, setToken] = useState<string | undefined>(undefined);
    const [username, setUsername] = useState<string | undefined>(undefined);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | undefined>(undefined);
    const router = useRouter();

    useEffect(() => {
        const stored = window.localStorage.getItem(STORAGE_KEY);
        if (stored) {
            try {
                const parsed = JSON.parse(stored) as AuthStorage;
                setToken(parsed.token);
                setUsername(parsed.username);
            } catch {
                window.localStorage.removeItem(STORAGE_KEY);
            }
        }
    }, []);

    const login = useCallback(
        async (usernameInput: string, password: string) => {
            setIsLoading(true);
            setError(undefined);
            try {
                const body = new URLSearchParams({
                    username: usernameInput,
                    password,
                });
                const res = await fetch(`${API_BASE}/auth/token`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        Accept: 'application/json',
                    },
                    body,
                });
                if (!res.ok) {
                    const message = await res.text();
                    throw new Error(
                        message || `Login fehlgeschlagen (Status ${res.status})`,
                    );
                }
                const data = (await res.json()) as { access_token?: string };
                if (!data.access_token) {
                    throw new Error('Antwort enthält kein access_token');
                }
                const payload: AuthStorage = {
                    token: data.access_token,
                    username: usernameInput,
                };
                window.localStorage.setItem(
                    STORAGE_KEY,
                    JSON.stringify(payload),
                );
                setToken(data.access_token);
                setUsername(usernameInput);
                router.push('/');
            } catch (err: unknown) {
                const message =
                    err instanceof Error
                        ? err.message
                        : 'Unbekannter Fehler beim Login';
                setError(message);
                setToken(undefined);
            } finally {
                setIsLoading(false);
            }
        },
        [router],
    );

    const logout = useCallback(() => {
        window.localStorage.removeItem(STORAGE_KEY);
        setToken(undefined);
        setUsername(undefined);
        router.push('/login');
    }, [router]);

    const isAuthenticated = token !== undefined;

    const value = useMemo<AuthContextValue>(
        () => ({
            token,
            username,
            isAuthenticated,
            isLoading,
            error,
            login,
            logout,
        }),
        [error, isAuthenticated, isLoading, login, logout, token, username],
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};