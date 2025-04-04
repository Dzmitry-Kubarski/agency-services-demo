import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { Button } from '@/components/ui/button'
import { logger } from '@/shared/lib/logger'
import { ROUTES } from '@/shared/routes'

export const Login = () => {
    const navigate = useNavigate()

    const handleLogin = async () => {
        try {
            const response = await fetch('https://test-task-api.allfuneral.com/auth?user=USERNAME')
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
