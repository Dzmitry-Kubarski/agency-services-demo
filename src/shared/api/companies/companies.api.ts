import { router } from 'react-query-kit'

import { ICompany, ICompanyDTO, IPhoto } from './types'

import { apiClient } from '@/shared/config/api-client'
import { queryClient } from '@/shared/config/query-client'

const resource = 'companies'

export const companiesApi = router(resource, {
    list: router.query<ICompany[], ''>({
        fetcher: (variables) =>
            apiClient.get(resource, {
                params: variables
            })
    }),

    byId: router.query<ICompany, { id: string }>({
        fetcher: (variables) =>
            apiClient.get(`${resource}/${variables.id}`, {
                params: variables
            })
    }),

    update: router.mutation<ICompany, { id: string; data: Partial<ICompanyDTO> | FormData }>({
        mutationFn: async (variables) => {
            return apiClient.patch(`${resource}/${variables.id}`, variables.data)
        },

        onSuccess: (data, variables) => {
            // в реальной жизни здесь был бы запрос для обновления
            // await queryClient.invalidateQueries({
            //     queryKey: companiesApi.byId.getKey(),
            //   })

            // в рамках демо (теста)
            queryClient.setQueryData(companiesApi.byId.getKey({ id: variables.id }), data)
        }
    }),

    delete: router.mutation<void, { id: string }>({
        mutationFn: async (variables: { id: string }) => {
            return apiClient.delete(`${resource}/${variables.id}`)
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: companiesApi.getKey()
            })
        }
    }),

    addImage: router.mutation<IPhoto, { id: string; file: FormData }>({
        mutationFn: async (variables) => {
            return apiClient.post(`${resource}/${variables.id}/image`, variables.file)
        },
        onSuccess: async (data, variables) => {
            // исключительно в рамках демо (теста)
            queryClient.setQueryData(companiesApi.byId.getKey({ id: variables.id }), (oldData) => {
                if (oldData) {
                    return { ...oldData, photos: [...oldData.photos, data] }
                }
                return oldData
            })
        }
    }),

    deleteImage: router.mutation<void, { id: string; imageName: string }>({
        mutationFn: async (variables: { id: string; imageName: string }) => {
            return apiClient.delete(`${resource}/${variables.id}/image/${variables.imageName}`)
        },
        onSuccess: async (_, variables) => {
            // исключительно в рамках демо (теста)
            queryClient.setQueryData(companiesApi.byId.getKey({ id: variables.id }), (oldData) => {
                if (oldData) {
                    return { ...oldData, photos: oldData.photos.filter((image) => image.name !== variables.imageName) }
                }

                return oldData
            })
        }
    })
})
