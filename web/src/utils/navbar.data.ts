import { IoSearchCircle } from 'react-icons/io5'
import { IoMdBookmark } from 'react-icons/io'
import { AiFillQuestionCircle, AiFillRead } from 'react-icons/ai'
import type { INavBarItem } from './interfaces'

export const navbar_items: INavBarItem[] = [
    {
        label: 'Hub',
        icon: IoMdBookmark,
        path: 'hub',
    },
    {
        label: '群聊查找',
        icon: IoSearchCircle,
        path: 'dashboard',
    },
    {
        label: '学术资源',
        icon: AiFillRead,
        path: 'resources',
    },
    {
        label: 'FAQ & 帮助',
        icon: AiFillQuestionCircle,
        path: 'faq',
    },
]
