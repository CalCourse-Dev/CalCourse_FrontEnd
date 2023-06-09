import './NavBar.css'
import { navbar_items } from '../../../utils/navbar.data'
import NavBarItem from './NavBarItem.component'
import Footer from './Footer.component'

const NavBar = () => {
    return (
        <nav className="navbar-inner-shadow backdrop-blur fixed w-[min(20vw,300px)] min-h-screen min-w-[250px] z-50">
            <h1 className="mx-auto w-full text-4xl mt-12 text-center font-logo font-black text-logo opacity-[.87]">
                CalCourse
            </h1>
            <ul className="right-0 mt-36 pr-4">
                {navbar_items.map(item => NavBarItem(item))}
            </ul>
            <Footer />
        </nav>
    )
}

export default NavBar