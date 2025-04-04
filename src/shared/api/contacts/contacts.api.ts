import { router } from 'react-query-kit'

import { IContact } from './types'

import { apiClient } from '@/shared/config/api-client'
import { queryClient } from '@/shared/config/query-client'

const resource = 'contacts'

export const contactsApi = router(resource, {
    // list: router.query<ICompany[], ''>({
    //     fetcher: (variables) =>
    //         apiClient.get(resource, {
    //             params: variables
    //         })
    // }),

    byId: router.query<IContact, { id: string }>({
        fetcher: (variables) =>
            apiClient.get(`${resource}/${variables.id}`, {
                params: variables
            })
    }),

    update: router.mutation<IContact, { id: string; data: Partial<IContact> }>({
        mutationFn: async (variables) => {
            return apiClient.patch(`${resource}/${variables.id}`, variables.data)
        },

        onSuccess: (data, variables) => {
            // в реальной жизни здесь был бы запрос для обновления
            // await queryClient.invalidateQueries({
            //     queryKey: companiesApi.byId.getKey(),
            //   })

            // в рамках демо (теста)
            queryClient.setQueryData(contactsApi.byId.getKey({ id: variables.id }), data)
        }
    })

    // delete: router.mutation<void, { id: string }>({
    //     mutationFn: async (variables: { id: string }) => {
    //         return apiClient.delete(`${resource}/${variables.id}`)
    //     },
    //     onSuccess: async () => {
    //         await queryClient.invalidateQueries({
    //             queryKey: contacts.getKey()
    //         })
    //     }
    // })
})
