import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { BASE_API_URL } from '@/shared/config/api-client'
import { logger } from '@/shared/lib/logger'
import { ROUTES } from '@/shared/routes'
import { Button } from '@/shared/ui/button'

export const Login = () => {
    const navigate = useNavigate()

    const handleLogin = async () => {
        try {
            const response = await fetch(`${BASE_API_URL}/auth?user=USERNAME`)
            const token = response.headers.get('authorization')

            if (token) {
                localStorage.setItem('authToken', token)
                navigate(ROUTES.ROOT)
            }
        } catch (err) {
            toast.error('Login failed')
            logger.error('Login failed', err)
        }
    }

    return <Button onClick={handleLogin}>Log in to the app</Button>
}
