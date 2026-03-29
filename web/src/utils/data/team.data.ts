import type { IconType } from 'react-icons'
import { AiFillGithub, AiFillLinkedin } from 'react-icons/ai'
import { BiMailSend } from 'react-icons/bi'
import { HiGlobe } from 'react-icons/hi'
import type { IMember } from '../interfaces/interfaces'

import HansPic from '../../assets/teamPic/HansMao.jpg'
import AZPic from '../../assets/teamPic/AdamZhang.jpeg'
import TiaPic from '../../assets/teamPic/TiaLu.jpg'
import RichardPic from '../../assets/teamPic/richard.png'

const contact_types: { [typeName: string]: IconType } = {
    linkedin: AiFillLinkedin,
    website: HiGlobe,
    email: BiMailSend,
    github: AiFillGithub
}

export const TEAM: { [status: string]: IMember[] } = {
    current: [
        {
            name: 'Huanzhi Mao',
            title: 'Project Lead / Backend',
            profilePic: HansPic,
            contact: {
                Icon: contact_types.github,
                // PersonalSite: 'https://huanzhimao.com/',
                Github: 'https://github.com/HuanzhiMao',
                LinkedIn: 'https://www.linkedin.com/in/huanzhi-mao-82975a22a/'
            }
        },
        {
            name: 'Richard Zhuang',
            title: 'TreeCourse Lead',
            profilePic: RichardPic,
            contact: {
                Icon: contact_types.linkedin,
                PersonalSite: 'https://richardzhuang0412.github.io',
                LinkedIn: 'https://www.linkedin.com/in/richard-zhuang-a4617226b/'
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
            title: 'UI/UX Design',
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