import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App'
import reportWebVitals from './reportWebVitals'
import i18n from './utils/i18n'
import { I18nextProvider } from 'react-i18next'
import { UserContextProvider } from './contexts/User.context'
import { CourseDataContextProvider } from './contexts/CourseData.context'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
    <I18nextProvider i18n={i18n}>
        <UserContextProvider>
            <CourseDataContextProvider>
                <App />
            </CourseDataContextProvider>
        </UserContextProvider>
    </I18nextProvider>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
