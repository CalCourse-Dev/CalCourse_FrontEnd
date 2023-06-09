import {
    AiOutlineDesktop,
    AiOutlineHome,
    AiOutlineQuestionCircle,
    AiOutlineSearch
} from 'react-icons/ai'

import type { INavBarItem } from './interfaces'

export const navbar_items: INavBarItem[] = [
    {
        label: 'Hub',
        icon: AiOutlineHome,
        path: 'hub'
    },
    {
        label: '群聊查找',
        icon: AiOutlineSearch,
        path: 'dashboard'
    },
    {
        label: '学术资源',
        icon: AiOutlineDesktop,
        path: 'resources'
    },
    {
        label: 'FAQ & 帮助',
        icon: AiOutlineQuestionCircle,
        path: 'faq'
    }
]
