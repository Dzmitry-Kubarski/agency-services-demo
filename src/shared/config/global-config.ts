import { z, ZodError } from 'zod'

import { logger } from '../lib/logger'

const envVariables = z.object({
    VITE_API_ENDPOINT: z.string().url(),
    VITE_API_VERSION: z.string().length(1)
})

try {
    envVariables.parse(import.meta.env)
} catch (e) {
    if (e instanceof ZodError) {
        logger.error(e.name, e.errors)
    }
}

declare global {
    type ImportMetaEnvCustom = z.infer<ReturnType<typeof envVariables.partial>>
}

export const globalConfig = {
    API_ENDPOINT: import.meta.env.VITE_API_ENDPOINT,
    API_VERSION: import.meta.env.VITE_API_VERSION
} as const
