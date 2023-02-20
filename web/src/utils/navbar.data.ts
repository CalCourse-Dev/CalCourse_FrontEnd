import { IoBookmark, IoSearchCircle, IoBook } from 'react-icons/io5'
import type { INavBarItem } from './interfaces'

export const navbar_items: INavBarItem[] = [
    {
        label: 'Hub',
        icon: IoBookmark,
        path: 'hub',
    },
    {
        label: '群聊查找',
        icon: IoSearchCircle,
        path: 'dashboard',
    },
    {
        label: '学术资源',
        icon: IoBook,
        path: 'resources',
    },
    {
        label: 'FAQ & 帮助',
        icon: IoBook,
        path: 'faq',
    },
]