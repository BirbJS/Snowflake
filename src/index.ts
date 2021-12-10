/*
 * Copyright (c) 2021, knokbak and contributors.
 *
 * The Birb.JS Project: https://birb.js.org
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

export class Snowflake {

    static DISCORD_EPOCH = 1420070400000;

    timestamp: number = null!;
    workerId: number = null!;
    processId: number = null!;
    incremental: number = null!;

    constructor (timestamp: number, workerId: number, processId: number, incremental: number) {
        this.timestamp = timestamp;
        this.workerId = workerId;
        this.processId = processId;
        this.incremental = incremental;
    }

    getDate (): Date {
        return new Date(this.timestamp);
    }

    getWorkerId (): number {
        return this.workerId;
    }

    getProcessId (): number {
        return this.processId;
    }

    getIncremental (): number {
        return this.incremental;
    }

    toString (): string {
        let snowflake = `${this.timestamp}${this.workerId}${this.processId}${this.incremental}`;
        return parseInt(snowflake).toString(2);
    }

    static generate (worker?: number, process?: number, increment?: number): Snowflake {
        let timestamp = Date.now();
        let workerId = worker !== undefined ? worker : 1;
        let processId = process !== undefined ? process : 1;
        let incremental = process !== undefined ? process : Math.floor(Math.random() * 10);
        return new Snowflake(timestamp, workerId, processId, incremental);
    }

    static fromString (string: string | number): Snowflake {
        let snowflake = BigInt(string);
        let timestamp = Number(snowflake >> 22n) + Snowflake.DISCORD_EPOCH;
        let workerId = Number((snowflake >> 17n) & 0b11111n);
        let processId = Number((snowflake >> 12n) & 0b11111n);
        let incremental = Number(snowflake & 0b111111111111n);
        return new Snowflake(timestamp, workerId, processId, incremental);
    }

}
