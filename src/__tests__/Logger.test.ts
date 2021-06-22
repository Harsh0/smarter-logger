import SmartLogger, { Logger } from '../index';

describe('My Logger', () => {
    afterEach(() => {
        jest.resetModules();
    });

    it('should call second method after first is executed (concurrency = 1)', async () => {
        jest.spyOn(console, 'log');
        const myAsyncLoggerMethod = async (arg1: any, arg2: any) => {
            // add 500 milisecond delay
            await new Promise<void>((resolve, reject) => setTimeout(resolve, 500));
            console.log('My Log with args', arg1, arg2);
        };
        const logger: Logger = SmartLogger(myAsyncLoggerMethod);
        logger.log('1', 2);
        logger.log('3', 4);
        // wait for 500 miliseconds
        await new Promise<void>((resolve, reject) => setTimeout(resolve, 500));
        expect(console.log).toHaveBeenLastCalledWith('My Log with args', '1', 2);
        // only 1 times till now
        expect(console.log).toHaveBeenCalledTimes(1);
        await new Promise<void>((resolve, reject) => setTimeout(resolve, 500));
        expect(console.log).toHaveBeenLastCalledWith('My Log with args', '3', 4);
        expect(console.log).toHaveBeenCalledTimes(2);
    });
});
