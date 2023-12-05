export declare function generateCreateOrderHash(request: string, secret: string): string;
export declare function generateFetchOrderHash(request: unknown, secret: string): string;
export declare function verifyHash(hash: string, request: unknown): boolean;
