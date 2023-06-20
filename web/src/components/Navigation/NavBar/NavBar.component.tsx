import { NAVBAR_ITEMS } from '../../../utils/data/navbar.data'
import Footer from './Footer.component'
import NavBarItem from './NavBarItem.component'

const NavBar = () => {
    return (
        <nav className="card-transluscent ml-[2vh] my-[2vh] min-h-[96vh] fixed w-[min(20vw,300px)] min-w-[250px] z-50">
            <h1 className="mx-auto w-full text-4xl mt-12 text-center font-logo font-black text-logo opacity-[.87] select-none">
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
