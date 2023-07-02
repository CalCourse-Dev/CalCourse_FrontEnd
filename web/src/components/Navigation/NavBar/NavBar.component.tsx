import { AiOutlineLogin, AiOutlineLogout } from 'react-icons/ai'
import { NAVBAR_ITEMS } from '../../../utils/data/navbar.data'
import Footer from './Footer.component'
import NavBarItem from './NavBarItem.component'
import { useUserLogInStatus } from '../../../utils/hooks/useUserLogInStatus'

const NavBar = () => {
    const log_in_status = useUserLogInStatus()

    return (
        <nav className="card-transluscent ml-[2vh] my-[2vh] min-h-[96vh] fixed w-[min(20vw,300px)] min-w-[250px] z-50">
            <h1 className="mx-auto w-full text-4xl mt-12 text-center font-logo font-black text-logo opacity-[.87] select-none">
                CalCourse
            </h1>
            <ul className="right-0 mt-36 pr-4 h-full">
                {NAVBAR_ITEMS.map(item => NavBarItem(item))}

                <div id="log-in-container" className="mt-10">
                    <NavBarItem
                        {...(log_in_status
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
                </div>
            </ul>
            <Footer />
        </nav>
    )
}

export default NavBar
