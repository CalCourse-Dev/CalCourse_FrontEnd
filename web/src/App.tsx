import React from 'react'
import { Routes, Route, BrowserRouter } from 'react-router-dom'

import Login from './components/User/Login/Login'
import UserPortal from './components/User/UserPortal/UserPortal'
import CodingLounge from './components/CodingLounge/CodingLounge'
import Dashboard from './components/Dashboard/Dashboard'
import Hub from './components/Hub/Hub'
import EventOverview from './components/Event/EventOverview'
import RequestPage from './components/Dashboard/RequestPage/RequestPage'
import Test from './test'
import 'antd/dist/antd.css'
import Navigation from './components/Navigation/Navigation.structure'
import NotFoundPage from './components/NotFound/NotFound.page'

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigation />}>
                    <Route path="/" element={<Login />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route
                        path="/dashboard/request"
                        element={<RequestPage />}
                    />
                    <Route path="/hub" element={<Hub />} />
                    <Route path="/userportal" element={<UserPortal />} />
                    <Route path="*" element={<NotFoundPage />} />
                </Route>
                <Route path="/coding-lounge" element={<CodingLounge />} />
                <Route path="/event-overview" element={<EventOverview />} />
                <Route path="/testing" element={<Test />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
