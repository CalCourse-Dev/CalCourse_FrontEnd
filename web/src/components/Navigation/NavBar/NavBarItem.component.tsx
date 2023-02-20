import { useLocation, useNavigate } from "react-router-dom"
import type { INavBarItem } from "../../../utils/interfaces"

const NavBarItem = (item: INavBarItem) => {
    // used for navigation
    const navigate = useNavigate()

    // used to track whether it corresponds to the active page, for styling
    const selected = useLocation().pathname === '/' + item.path

    return (
        // the interpolated tenary operator changes opacity
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
            {/* the icon is a react-icon object */}
            {<item.icon className="h-6 w-6" />}
        </li>
    )
}

export default NavBarItem