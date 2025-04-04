import { Logger } from 'tslog'

import type { ILogObj, ISettingsParam } from 'tslog'

export interface ILogger extends Pick<Console, 'log' | 'error' | 'warn'> {
    logger: unknown
    log: (...args: unknown[]) => void
    error: (...args: unknown[]) => void
    warn: (...args: unknown[]) => void
}

class LoggerService implements ILogger {
    logger: Logger<ILogObj>

    constructor(settings?: ISettingsParam<ILogObj>) {
        this.logger = new Logger(settings)
    }

    log(...args: unknown[]): void {
        this.logger.info(...args)
    }

    error(...args: unknown[]): void {
        this.logger.error(...args)
    }

    warn(...args: unknown[]): void {
        this.logger.warn(...args)
    }
}

export const logger = new LoggerService({
    type: 'pretty',
    name: 'funeral-home-agency-services',
    hideLogPositionForProduction: true
})
