import { Routes, Route, BrowserRouter } from 'react-router-dom'
import Login from './components/User/Login/Login'
import UserPortal from './components/User/UserPortal/UserPortal'
import CodingLounge from './components/CodingLounge/CodingLounge'
import Dashboard from './components/Dashboard/Dashboard'
import Hub from './components/Hub/Hub'
import EventOverview from './components/Event/EventOverview'
import RequestPage from './components/Dashboard/RequestPage/RequestPage'
import Navigation from './components/Navigation/Navigation.structure'
import NotFoundPage from './components/NotFound/NotFound.page'
import Playground from './components/Playground/Playground.page'

const AppRoutes = () => {
    return (
        <BrowserRouter>
            {/* 更新了 navigation 的框架，所有的页面都是通过 Navigation 这个架构 render 的，具体的细节在文件里有细说 
            index route的用法可以参考https://reactrouter.com/en/main/start/concepts#index-routes */}
            <Routes>
                <Route path="/" element={<Navigation />}>
                    <Route index element={<Login />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route
                        path="/dashboard/request"
                        element={<RequestPage />}
                    />
                    {/* Hub就是之前的Academic Panel */}
                    <Route path="/hub" element={<Hub />} />
                    <Route path="/userportal" element={<UserPortal />} />
                    {/* Playground.page里有components library的使用案例 */}
                    <Route path="/playground" element={<Playground />} />
                    {/* 自定义 404 页面 */}
                    <Route path="*" element={<NotFoundPage />} />
                </Route>
                <Route path="/coding-lounge" element={<CodingLounge />} />
                <Route path="/event-overview" element={<EventOverview />} />
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes
