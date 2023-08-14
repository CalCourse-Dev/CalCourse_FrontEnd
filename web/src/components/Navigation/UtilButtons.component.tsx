import { Transition } from '@headlessui/react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PUtilButton, util_buttons } from '../../utils/data/util_cards.data'

const UtilButton = ({ Icon, label, url, external }: PUtilButton) => {
    const navigate = useNavigate()

    const [hovering, set_hovering] = useState(false)

    return (
        <li
            className="group relative"
            onClick={() => {
                external ? window.open(url, '_blank') : navigate(url)
            }}
            onMouseEnter={() => {
                set_hovering(true)
            }}
            onMouseLeave={() => {
                set_hovering(false)
            }}
            key={label}
        >
            <div className="card-transluscent rounded-xl cursor-pointer w-12 h-12">
                {<Icon className="w-full h-full p-3" />}
            </div>
            <Transition
                show={hovering}
                enter="transition-transform duration-150"
                enterFrom="scale-x-0"
                enterTo="scale-x-100"
                leave="transition-opacity duration-300"
                leaveFrom="opacity-0"
                leaveTo="opacity-100"
                className="absolute min-w-max left-1/2 -translate-x-1/2 px-3 py-0.5 mt-2 bg-transluscent rounded-full bg-opacity-50"
            >
                {label}
            </Transition>
        </li>
    )
}

const UtilButtons = () => {
    return (
        <ul className="absolute right-10 flex flex-row gap-4">
            {util_buttons.map(UtilButton)}
        </ul>
    )
}

export default UtilButtons
