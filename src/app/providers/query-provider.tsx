import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactNode } from 'react'

type Props = {
    children: ReactNode
    client: QueryClient
}

export const QueryProvider = ({ client, children }: Props) => {
    return <QueryClientProvider client={client}>{children}</QueryClientProvider>
}
