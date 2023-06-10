import './NavBar.css'
import { NAVBAR_ITEMS } from '../../../utils/data/navbar.data'
import NavBarItem from './NavBarItem.component'
import Footer from './Footer.component'
import { useNavigate } from 'react-router-dom'

const NavBar = () => {
    const navigate = useNavigate()
    return (
        <nav className="navbar-inner-shadow backdrop-blur fixed w-[min(20vw,300px)] min-h-screen min-w-[250px] z-50">
            <h1
                className="mx-auto w-full text-4xl mt-12 text-center font-logo font-black text-logo opacity-[.87] select-none cursor-pointer"
                onClick={() => navigate('/')}
            >
                CalCourse
            </h1>
            <ul className="right-0 mt-36 pr-4">
                {NAVBAR_ITEMS.map(item => NavBarItem(item))}
            </ul>
            <Footer />
        </nav>
    )
}

export default NavBar
