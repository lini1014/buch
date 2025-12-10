export type Buchart = 'EPUB' | 'HARDCOVER' | 'PAPERBACK';

export type Titel = {
    readonly titel: string;
    readonly untertitel?: string | null;
};

export type Abbildung = {
    readonly beschriftung?: string | null;
    readonly contentType?: string | null;
};

export type Buch = {
    readonly id: number;
    readonly isbn: string;
    readonly rating: number;
    readonly art?: Buchart | null;
    readonly preis?: number | null;
    readonly rabatt?: number | null;
    readonly lieferbar?: boolean | null;
    readonly datum?: string | null;
    readonly homepage?: string | null;
    readonly schlagwoerter?: string[] | null;
    readonly titel: Titel;
    readonly abbildungen?: Abbildung[] | null;
};

export type Page<T> = {
    readonly content: T[];
    readonly page: {
        readonly size: number;
        readonly number: number;
        readonly totalElements: number;
        readonly totalPages: number;
    };
};
