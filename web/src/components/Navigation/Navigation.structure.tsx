import { Fragment, useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { useUserContext } from '../../utils/hooks/useUserContext'
import { useUserLogInStatus } from '../../utils/hooks/useUserLogInStatus'
import type { IUser } from '../../utils/interfaces/interfaces'
import Login from '../../pages/LogIn/LogIn'
import Background from './Background/Background.component'
import Banner from './Banner.component'
import NavBar from './NavBar/NavBar.component'

const Navigation = () => {
    const [user, set_user] = useUserContext()
    const user_logged_in = useUserLogInStatus()
    const navigate = useNavigate()

    useEffect(() => {
        if (!user_logged_in) {
            const storedUser: IUser = JSON.parse(
                sessionStorage.getItem('user') ?? '{}'
            )

            if ('email' in storedUser) {
                set_user(storedUser)
            } else {
                navigate('/login')
            }
        }
    }, [navigate, user_logged_in, user, set_user])

    return (
        <Fragment>
            <NavBar />
            <main className="ml-[calc(15rem+2vh)] sm:ml-[calc(4rem+2vh)] mb:ml-0 z-10 overflow-x-hidden p-10 min-h-screen flex justify-center">
                <Banner />
                {user_logged_in ? <Outlet /> : <Login />}
            </main>
            <Background />
        </Fragment>
    )
}

export default Navigation
