import './NavBar.css'
import { IoBookmark, IoSearchCircle, IoBook } from 'react-icons/io5'
import type { IconType } from 'react-icons'

const navbar_items: INavBarItem[] = [
    {
        label: 'Hub',
        icon: IoBookmark,
    },
    {
        label: '群聊查找',
        icon: IoSearchCircle,
        link: 'dashboard',
    },
    {
        label: '学术资源',
        icon: IoBook,
    },
    {
        label: 'FAQ & 帮助',
        icon: IoBook,
    },
]

interface INavBarItem {
    label: string
    icon: IconType
    link?: string
}

const NavBar = () => {
    return (
        <nav className="navbar-inner-shadow backdrop-blur fixed w-[20vw] min-h-screen min-w-[250px] p-4 border-2 border-[#A0A0A0] border-opacity-40 z-50">
            <h1 className="mx-auto w-full text-4xl mt-10 text-center font-logo font-black text-[#030944] opacity-[.87]">
                CalCourse
            </h1>
            <ul className="right-0">
                {navbar_items.map(item => NavBarItem(item))}
            </ul>
        </nav>
    )
}

export default NavBar

const NavBarItem = (item: INavBarItem) => {
    return (
        <li className="right-0 h-12 grid grid-cols-[1fr_2rem] gap-4 items-center" key={item.label}>
            <h2 className="text-xl text-right leading-none m-0">{item.label}</h2>
            {<item.icon className='h-6 w-6' />}
        </li>
    )
}
