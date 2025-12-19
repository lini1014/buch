/**
 * DTOs für Buch-Updates.
 * @packageDocumentation
 */

/* eslint-disable max-classes-per-file */

import { Buchart } from '../../generated/prisma/enums.js';

export class TitelUpdateDTO {
    readonly titel?: string;
    readonly untertitel?: string | null;
}

export class BuchUpdateDTO {
    readonly isbn?: string;
    readonly rating?: number;
    readonly art?: Buchart | null;
    // Decimal per BigNumber, deshalb typisiert als unknown
    readonly preis?: unknown;
    readonly rabatt?: unknown;
    readonly lieferbar?: boolean;
    readonly datum?: Date | string | null;
    readonly homepage?: string | null;
    readonly schlagwoerter?: string[];
    readonly titel?: TitelUpdateDTO;
}
