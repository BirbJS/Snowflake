/*
 * Copyright (c) 2021, knokbak and contributors.
 *
 * The Birb.JS Project: https://birb.js.org
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

let inc = 0;

export class Snowflake {

    static DISCORD_EPOCH = 1420070400000;

    timestamp: number = null!;
    workerId: number = null!;
    processId: number = null!;
    incremental: number = null!;

    /**
     * @param {number} timestamp The amount of milliseconds since EPOCH
     * @param {number} workerId The worker ID (used for generating unique snowflakes)
     * @param {number} processId The process ID (used for generating unique snowflakes)
     * @param {number} incremental The incremental number (used for generating unique snowflakes)
     * @constructor
     * @public
     */
    constructor (timestamp: number, workerId: number, processId: number, incremental: number) {
        this.timestamp = timestamp;
        this.workerId = workerId;
        this.processId = processId;
        this.incremental = incremental;
    }

    /**
     * Get the date of this snowflake.
     * 
     * @returns {Date} The date of this snowflake
     * @public
     */
    getDate (): Date {
        return new Date(this.timestamp);
    }

    /**
     * Get the worker ID of this snowflake.
     * 
     * @returns {number} The worker ID of this snowflake
     * @public
     */
    getWorkerId (): number {
        return this.workerId;
    }

    /**
     * Get the process ID of this snowflake.
     * 
     * @returns {number} The process ID of this snowflake
     * @public
     */
    getProcessId (): number {
        return this.processId;
    }

    /**
     * Get the incremental number of this snowflake.
     * 
     * @returns {number} The incremental number of this snowflake
     * @public
     */
    getIncremental (): number {
        return this.incremental;
    }

    /**
     * Do weird stuff no one understands.
     * 
     * @returns {BigInt} The snowflake as a big integer
     * @public
     */
    toBigInt (): BigInt {
        let snowflake = BigInt(this.timestamp - Snowflake.DISCORD_EPOCH);
        snowflake = snowflake << 22n;
        snowflake = snowflake | (BigInt(this.workerId) << 17n);
        snowflake = snowflake | (BigInt(this.processId) << 12n);
        snowflake = snowflake | BigInt(this.incremental);
        return snowflake;
    }

    /**
     * Get the snowflake as a string (binary).
     * 
     * @returns {number} The snowflake in binary
     * @public
     */
    toBinary (): string {
        return this.toBigInt().toString(2);
    }

    /**
     * Get the snowflake as a string.
     * 
     * @returns {number} The snowflake as a string
     * @public
     */
    toString (): string {
        return this.toBigInt().toString(10);
    }

    /**
     * Get the snowflake as a compact string.
     * 
     * @returns {number} The snowflake as a compact string
     * @public
     */
    toCompactString (): string {
        return this.toBigInt().toString(36);
    }

    /**
     * Generate a new snowflake.
     * 
     * @param {number} [worker=1] The worker ID (used for generating unique snowflakes)
     * @param {number} [process=1] The process ID (used for generating unique snowflakes)
     * @returns {Snowflake} The new snowflake
     * @static
     */
    static generate (worker?: number, process?: number): Snowflake {
        let timestamp = Date.now();
        let workerId = worker !== undefined ? worker : 1;
        let processId = process !== undefined ? process : 1;
        let incremental = inc++;
        return new Snowflake(timestamp, workerId, processId, incremental);
    }

    /**
     * Convert a string or number to a snowflake.
     * 
     * @param {string | number} string The string or number to convert
     * @returns {Snowflake} The new snowflake
     * @static
     */
    static fromString (string: string | number): Snowflake {
        let snowflake = BigInt(string.toString());
        let timestamp = Number(snowflake >> 22n) + Snowflake.DISCORD_EPOCH;
        let workerId = Number((snowflake >> 17n) & 0b11111n);
        let processId = Number((snowflake >> 12n) & 0b11111n);
        let incremental = Number(snowflake & 0b111111111111n);
        return new Snowflake(timestamp, workerId, processId, incremental);
    }

}
