import os from 'os';

/**
 * Resolve host if is passed as `true`
 * 
 * Copied from https://github.com/vitejs/vite/blob/d4dcdd1ffaea79ecf8a9fc78cdbe311f0d801fb5/packages/vite/src/node/logger.ts#L197
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
                    // Node < v18
                    ((typeof detail.family === 'string' && detail.family === 'IPv4') ||
                    // Node >= v18
                    (typeof detail.family === 'number' && detail.family === 4))
            ).filter(detail => {
                return detail.address !== '127.0.0.1';
            })[0];

        if (!nInterface) return 'localhost';

        return nInterface.address;
    }

    return host;
}
