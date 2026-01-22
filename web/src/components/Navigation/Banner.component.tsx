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
            // className="mx-auto absolute"
            className="fixed top-6 left-1/2 -translate-x-1/2 z-[100]"
        >
            <div className="card-transluscent flex items-center max-w-xl py-3 pl-16 pr-4 gap-8">
                <p className="font-medium">
                    Spring 2026 课群暂时还未更新，遇到了一些技术问题(企业微信账号被封了QAQ)，我正在努力解决，预计1月底之前能解决。其他问题请联系
                    <a
                        href="mailto:huanzhimao@berkeley.edu"
                        className="underline hover:text-blue-500"
                    >
                        Hans冒峘志
                    </a>
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
