import React from 'react'

import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Slide, ToastContainer } from 'react-toastify'

import App from './app'
import { QueryProvider } from './providers/query-provider'

import { queryClient } from '@/shared/config/query-client'

import 'react-toastify/dist/ReactToastify.css'

import './styles/index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <BrowserRouter>
            <QueryProvider client={queryClient}>
                <App />

                <ToastContainer theme='light' position='bottom-right' autoClose={3000} transition={Slide} icon={false} />
            </QueryProvider>
        </BrowserRouter>
    </React.StrictMode>
)
