import { useLocation, useNavigate } from 'react-router-dom'
import { useUserLogInStatus } from '../../../utils/hooks/useUserLogInStatus'
import type { INavBarItem } from '../../../utils/interfaces/interfaces'

const NavBarItem = (item: INavBarItem) => {
    // used for navigation
    const navigate = useNavigate()

    const user_logged_in = useUserLogInStatus()

    // used to track whether it corresponds to the active page, for styling
    const selected = useLocation().pathname === '/' + item.path

    const Icon = item.icon

    return (
        // the interpolated tenary operator changes opacity
        <li
            className={`my-auto h-12 flex gap-4 flex-row-reverse sm:flex-row mb:justify-center mb:items-center duration-150 ${
                user_logged_in ? 'cursor-pointer group' : 'cursor-default'
            }  ${selected ? 'opacity-100' : 'opacity-30'} ${
                !selected && user_logged_in && 'hover:opacity-70'
            }`}
            key={item.label}
            onClick={() => {
                if (user_logged_in) {
                    navigate(item.path)
                }
            }}
        >
            <h2 className="text-xl text-right leading-none m-0 font-bold mb:hidden sm:hidden mb:group-hover:block sm:group-hover:block mb:fixed sm:fixed mb:mb-[7.5rem] sm:ml-14 mb:card-transluscent sm:card-transluscent mb:py-2 sm:py-2 mb:px-3 sm:px-3 mb:font-medium sm:font-medium rounded-2xl w-max order-2">
                {item.label}
            </h2>
            {/* the icon is a react-icon object */}
            {<Icon className="h-6 w-6 sm:h-10 sm:w-10 order-1 mb:h-7 mb:w-7" />}
        </li>
    )
}

export default NavBarItem
