import { Outlet, useNavigate } from 'react-router-dom'
import Background from './Background/Background.component'
import NavBar from './NavBar/NavBar.component'
import { useUserLogInStatus } from '../../utils/hooks/useUserLogInStatus'
import { useEffect } from 'react'
import Login from '../User/Login/Login'

/**  Outlet Component 的用法可以参考 https://reactrouter.com/en/main/components/outlet
 * 简单点总结下来就是在刚才那个
 *    <Route element=Navigation>
 *          <Route element=Dashboard />
 *          <Route element=Hub />
 *      </Route>
 * 的结构里，如果我要 render Dashboard，react 会用 <Dashboard /> 替换掉下面这个 Navigation component 里的 <Outlet />
 *
 * 也就是说，NavBar 和 Background 会自动 render 到每个 page 上，在具体 implement 各个 page 的时候只需要写右半部分的内容就好
 */
const Navigation = () => {
    const user_logged_in = useUserLogInStatus()
    const navigate = useNavigate()

    useEffect(() => {
        console.log(user_logged_in)
        if (!user_logged_in) {
            navigate('/login')
        }
    }, [navigate, user_logged_in])

    return (
        <div className="min-h-min">
            <NavBar />
            <main className="ml-[calc(min(max(250px,20vw),300px)+2vh)] z-10 overflow-x-hidden p-10">
                <div id="content" className="w-auto mx-auto">
                    {user_logged_in ? <Outlet /> : <Login />}
                </div>
            </main>
            <Background />
        </div>
    )
}

export default Navigation
