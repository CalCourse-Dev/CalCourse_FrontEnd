import type { IconType } from 'react-icons'
import { AiFillGithub, AiFillLinkedin } from 'react-icons/ai'
import { BiMailSend } from 'react-icons/bi'
import { HiGlobe } from 'react-icons/hi'
import type { IMember } from '../interfaces/interfaces'

import HansPic from '../../assets/teamPic/HansMao.jpg'
import AZPic from '../../assets/teamPic/AdamZhang.jpeg'
import TiaPic from '../../assets/teamPic/TiaLu.jpg'

const contact_types: { [typeName: string]: IconType } = {
    linkedin: AiFillLinkedin,
    website: HiGlobe,
    email: BiMailSend,
    github: AiFillGithub
}

export const TEAM: { [status: string]: IMember[] } = {
    current: [
        {
            name: 'Hans Mao',
            title: 'PM / Backend',
            profilePic: HansPic,
            contact: {
                Icon: contact_types.github,
                // PersonalSite: 'https://huanzhimao.com/',
                Github: 'https://github.com/HuanzhiMao',
                LinkedIn: 'https://www.linkedin.com/in/hans-mao-82975a22a/'
            }
        },
        {
            name: 'AZ Zhang',
            title: 'Frontend',
            profilePic: AZPic,
            contact: {
                Icon: contact_types.linkedin,
                LinkedIn: 'https://www.linkedin.com/in/az-zhang/'
            }
        },
        {
            name: 'Tia Lu',
            title: 'Design Lead',
            profilePic: TiaPic,
            contact: {
                Icon: contact_types.linkedin,
                LinkedIn: 'https://www.linkedin.com/in/nianqin-tia-lu-3b3395213/'
            }
        }
    ],
    past: [
        {
            name: 'Terry Liu',
            title: 'Frontend'
        },
        {
            name: 'Ron Wang',
            title: 'Frontend'
        },
        {
            name: 'Sharon Yu',
            title: 'Frontend'
        },
        {
            name: 'Sylvia Yang',
            title: 'Frontend'
        },
        {
            name: 'Richard Zhuang',
            title: 'Frontend'
        },
        {
            name: 'Ruohan Yan',
            title: 'Frontend'
        },
        {
            name: 'Yuanhan Li',
            title: 'Frontend'
        },
        {
            name: 'Ruomu Xu',
            title: 'Frontend'
        },
        {
            name: 'Charlie Ji',
            title: 'Frontend'
        },
    ]
}