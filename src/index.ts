import { LinkedList } from './LinkedList';

export interface Logger {
    log: (...args: any[]) => Promise<void>;
}

export interface Options {
    logError?: (err: any) => void;
    /**
     * default to 0 (No retry)
     */
    retryCount?: number;
    /**
     * default to 1 (One at a time)
     */
    concurrency?: number;
}

const defaultOptions: Options = {
    retryCount: 0,
    concurrency: 1,
};

const SmartLogger = (log: (...args: any[]) => Promise<void>, options?: Options): Logger => {
    const concurrency = options?.concurrency || defaultOptions.concurrency!;
    const retryCount = options?.retryCount || defaultOptions.retryCount!;
    const linkedList = new LinkedList();
    const sendLog = async (args: any[], retryLeft: number = retryCount) => {
        if (retryLeft < 0) {
            return;
        }
        retryLeft--;
        try {
            await log(...args);
        } catch (err) {
            if (options?.logError) {
                options.logError(err);
            }
            await sendLog(args, retryLeft);
        }
    };
    const runLogger = (() => {
        let isRunning: boolean = false;
        return async () => {
            if (isRunning) {
                return;
            }
            isRunning = true;
            while (linkedList.size) {
                const argsArr = [];
                for (let i = 0; i < concurrency; i++) {
                    const args = linkedList.getHead();
                    argsArr.push(args);
                    if (!linkedList.size) {
                        break;
                    }
                }
                await Promise.all(
                    argsArr.map(
                        args =>
                            new Promise<void>(async (resolve, reject) => {
                                await sendLog(args);
                                resolve();
                            }),
                    ),
                );
            }
            isRunning = false;
        };
    })();
    return {
        log: async (...args: any[]) => {
            linkedList.addToTail(args);
            runLogger();
        },
    };
};

export default SmartLogger;
