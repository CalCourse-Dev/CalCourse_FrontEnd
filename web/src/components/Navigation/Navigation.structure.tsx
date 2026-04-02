import { Fragment, useEffect } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useUserContext } from '../../utils/hooks/useUserContext'
import { useUserLogInStatus } from '../../utils/hooks/useUserLogInStatus'
import { useSchool } from '../../utils/hooks/useSchool'
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
    const { pathname } = useLocation()
    const school = useSchool()

    // Paths that should keep their URL when not logged in (branded login pages)
    const brandedPaths = ['/stanford']

    // Dynamic favicon, title, and meta description based on school
    useEffect(() => {
        const link = document.querySelector<HTMLLinkElement>("link[rel='icon']")
        if (link) link.href = school.favicon

        const titles: Record<string, string> = {
            'TreeCourse': 'TreeCourse - Stanford Course WeChat Group Chats | Stanford课程微信群',
            'CalCourse': 'CalCourse - UC Berkeley Course WeChat Group Chats | Berkeley课程微信群',
        }
        document.title = titles[school.name] || school.name

        const descriptions: Record<string, string> = {
            'TreeCourse': 'TreeCourse - Join WeChat course group chats at Stanford. Find study partners and connect with classmates. 加入Stanford课程微信群，找到你的学习伙伴。',
            'CalCourse': 'CalCourse - Join WeChat course group chats at UC Berkeley. Find study partners and connect with classmates. 加入Berkeley课程微信群，找到你的学习伙伴。',
        }
        const meta = document.querySelector<HTMLMetaElement>("meta[name='description']")
        if (meta) meta.content = descriptions[school.name] || meta.content
    }, [school.favicon, school.name])

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
                    if (!brandedPaths.includes(pathname)) {
                        navigate('/login')
                    }
                }
            } else {
                if (!brandedPaths.includes(pathname)) {
                    navigate('/login')
                }
            }

        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [navigate, user_logged_in, user, set_user, pathname])

    return (
        <Fragment>
            <NavBar />
            <main className="ml-[calc(15rem+2vh)] sm:ml-[calc(4rem+2vh)] mb:ml-0 z-10 overflow-x-hidden p-10 min-h-screen flex justify-center relative">
                <Banner />
                <UtilButtons />
                {user_logged_in ? <Outlet /> : <Login />}
            </main>
            <Background gradientClass={school.gradientClass} />
        </Fragment>
    )
}

export default Navigation
