import { Fragment, useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { useUserContext } from '../../utils/hooks/useUserContext'
import { useUserLogInStatus } from '../../utils/hooks/useUserLogInStatus'
import { CONSTANTS } from '../../utils/constants/constants'
import type { IUser } from '../../utils/interfaces/interfaces'
import Login from '../../pages/LogIn/LogIn'
import Background from './Background/Background.component'
import Banner from './Banner.component'
import NavBar from './NavBar/NavBar.component'
import UtilButtons from './UtilButtons.component'

const Navigation = () => {
    const [user, set_user] = useUserContext()
    const user_logged_in = useUserLogInStatus()
    const navigate = useNavigate()

    useEffect(() => {
        if (!user_logged_in) {
            const storedUser: IUser = JSON.parse(
                localStorage.getItem('user') ?? '{}'
            )

            if ('email' in storedUser && 'access_token' in storedUser) {
                // check if token is expired
                // token expires in 6 hours
                if (new Date().getTime() - storedUser.record_time < CONSTANTS.TOKEN_EXPIRE_TIME) {
                    set_user(storedUser)
                } else {
                    localStorage.removeItem('user')
                    navigate('/login')
                }
            } else {
                navigate('/login')
            }
                
        }
    }, [navigate, user_logged_in, user, set_user])

    return (
        <Fragment>
            <NavBar />
            <main className="ml-[calc(15rem+2vh)] sm:ml-[calc(4rem+2vh)] mb:ml-0 z-10 overflow-x-hidden p-10 min-h-screen flex justify-center relative">
                <Banner />
                <UtilButtons />
                {user_logged_in ? <Outlet /> : <Login />}
            </main>
            <Background />
        </Fragment>
    )
}

export default Navigation
