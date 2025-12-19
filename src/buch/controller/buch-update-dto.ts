// Copyright (C) 2021 - present Juergen Zimmermann, Hochschule Karlsruhe
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program. If not, see <https://www.gnu.org/licenses/>.

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
