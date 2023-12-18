import os from 'os';

/**
 * Resolve host if is passed as `true`
 * 
 * Copied from https://github.com/vitejs/vite/blob/5684fcd8d27110d098b3e1c19d851f44251588f1/packages/vite/src/node/utils.ts#L1004C4-L1004C4
 */
export function resolveHost(host?: string | boolean): string {
    if (!host) return 'localhost';

    if (host === true) {
        const nInterface = Object.values(os.networkInterfaces())
            .flatMap(nInterface => nInterface ?? [])
            .filter(
                detail =>
                    detail &&
                    detail.address &&
                    (detail.family === 'IPv4' ||
                    // @ts-expect-error Node 18.0 - 18.3 returns number
                    detail.family === 4),
            ).filter(detail => detail.address !== '127.0.0.1')[0];

        if (!nInterface) return 'localhost';

        return nInterface.address;
    }

    return host;
}
