import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './components/User/LogIn/LogIn'
import UserPortal from './components/User/UserPortal/UserPortal'

import Dashboard from './pages/Dashboard/Dashboard'
import Hub from './pages/Hub/Hub'

import Navigation from './components/Navigation/Navigation.structure'
import RequestPage from './pages/Dashboard/RequestPage/RequestPage'
import NotFoundPage from './pages/NotFound/NotFound.page'

import Redirects from './components/Redirects/LogInHub.redirect'
import LogOut from './components/Redirects/LogOut.redirect'
import AboutAndFAQ from './pages/FAQ/AboutAndFAQ'

const AppRoutes = () => {
    return (
        <BrowserRouter>
            {/* 更新了 navigation 的框架，所有的页面都是通过 Navigation 这个架构 render 的，具体的细节在文件里有细说 
            index route的用法可以参考https://reactrouter.com/en/main/start/concepts#index-routes */}
            <Routes>
                <Route path="/" element={<Navigation />}>
                    <Route index element={<Redirects />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/logout" element={<LogOut />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route
                        path="/dashboard/request"
                        element={<RequestPage />}
                    />
                    {/* Hub就是之前的Academic Panel */}
                    <Route path="/hub" element={<Hub />} />
                    <Route path="/faq" element={<AboutAndFAQ />} />
                    <Route path="/userportal" element={<UserPortal />} />
                    {/* Playground.page里有components library的使用案例 */}
                    {/* <Route path="/playground" element={<Playground />} /> */}
                    {/* 自定义 404 页面 */}
                    <Route path="*" element={<NotFoundPage />} />
                </Route>
                {/* <Route path="/coding-lounge" element={<CodingLounge />} />
                <Route path="/event-overview" element={<EventOverview />} /> */}
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes
