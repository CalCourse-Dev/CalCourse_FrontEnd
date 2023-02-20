import { useLocation, useNavigate } from "react-router-dom"
import type { INavBarItem } from "../../../utils/interfaces"

const NavBarItem = (item: INavBarItem) => {
    const navigate = useNavigate()
    console.log(useLocation().pathname + ' ' + item.path)
    const selected = useLocation().pathname === '/' + item.path
    return (
        <li
            className={`right-0 h-12 grid grid-cols-[1fr_2rem] gap-4 items-center duration-150 cursor-pointer text-graphite ${
                selected ? 'opacity-100' : 'opacity-30'
            }`}
            key={item.label}
            onClick={() => navigate(item.path)}
        >
            <h2 className="text-xl text-right leading-none m-0">
                {item.label}
            </h2>
            {<item.icon className="h-6 w-6" />}
        </li>
    )
}

export default NavBarItem