#!/usr/bin/env node
declare type ArgsObject = {
    name?: string;
    apiKey?: string;
    clientId?: string;
    host?: string;
};
export declare function initRepo(args: ArgsObject): Promise<void>;
export {};
