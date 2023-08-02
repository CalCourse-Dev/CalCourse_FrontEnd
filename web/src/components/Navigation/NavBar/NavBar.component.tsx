import { AiOutlineLogin, AiOutlineLogout } from 'react-icons/ai'

import Logo from '../../../assets/logo-full.png'

import { NAVBAR_ITEMS } from '../../../utils/data/navbar.data'
import { useUserLogInStatus } from '../../../utils/hooks/useUserLogInStatus'
import Footer from './Footer.component'
import NavBarItem from './NavBarItem.component'

const NavBar = () => {
    const user_logged_in = useUserLogInStatus()

    return (
        <nav>
            <nav
                id="navbar-desktop"
                className="card-transluscent ml-[2vh] my-[2vh] h-[96vh] fixed w-60 sm:w-16 z-50 flex justify-between flex-col mb:hidden transition-opacity"
            >
                <h1 className="mx-auto w-full text-4xl mt-12 text-center font-logo font-black text-logo dark:text-logo-dark opacity-[.87] select-none sm:hidden">
                    CalCourse
                </h1>

                <h1 className="w-auto mx-auto mt-12 hidden sm:block select-none pointer-events-none">
                    <img className="h-10 resize" src={Logo} alt="logo" />
                </h1>

                <ul className="mx-4 flex flex-col [&>*:last-child]:mt-10 justify-between">
                    {NAVBAR_ITEMS.map(item => NavBarItem(item))}

                    <NavBarItem
                        {...(user_logged_in
                            ? {
                                  label: '登出',
                                  icon: AiOutlineLogout,
                                  path: 'logout'
                              }
                            : {
                                  label: '登录',
                                  icon: AiOutlineLogin,
                                  path: 'login'
                              })}
                    />
                </ul>
                <Footer />
            </nav>
            <nav
                id="navbar-mobile"
                className="card-transluscent bottom-[2vw] h-16 y-0 fixed w-[96vw] mx-[2vw] z-50 justify-around align-middle flex-row transition-opacity hidden mb:flex mb:backdrop-blur-lg"
            >
                {NAVBAR_ITEMS.map(item => NavBarItem(item))}
            </nav>
        </nav>
    )
}

export default NavBar
