import { Transition } from '@headlessui/react'
import { useEffect, useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'

const Banner = () => {
    const [hidden, set_hidden] = useState(window.innerWidth < 1120)

    const handleWindowResize = () => {
        if (window.innerWidth < 1120) {
            set_hidden(true)
        }
    }

    useEffect(() => {
        window.addEventListener('resize', handleWindowResize)

        return () => {
            window.removeEventListener('resize', handleWindowResize)
        }
    }, [])

    return (
        <Transition
            show={!hidden}
            unmount={true}
            appear={true}
            enter="transition-transform transition-opacity duration-150 ease-in-out"
            enterFrom="-translate-y-32 opacity-0"
            enterTo="translate-y-0 opacity-100"
            leave="transition-opacity duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            className="mx-auto absolute"
        >
            <div className="card-transluscent flex items-center max-w-xl py-3 pl-16 pr-4 gap-8">
                <p className="font-medium">
                    CalCourse is back with a brand new UI!
                </p>
                <AiOutlineClose
                    className="mt-[0.1rem] cursor-pointer"
                    onClick={() => {
                        set_hidden(true)
                    }}
                />
            </div>
        </Transition>
    )
}

export default Banner
