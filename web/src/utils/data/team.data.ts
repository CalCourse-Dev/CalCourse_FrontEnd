import type { IconType } from 'react-icons'
import { AiFillGithub, AiFillLinkedin } from 'react-icons/ai'
import { BiMailSend } from 'react-icons/bi'
import { HiGlobe } from 'react-icons/hi'
import type { IMember } from '../interfaces/interfaces'

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
            contact: {
                Icon: contact_types.linkedin,
                url: 'https://www.linkedin.com/in/hans-mao-82975a22a/'
            }
        },
        {
            name: 'AZ Zhang',
            title: 'Frontend',
            contact: {
                Icon: contact_types.linkedin,
                url: 'https://www.linkedin.com/in/az-zhang/'
            }
        },
        {
            name: 'Tia Lu',
            title: 'Design Lead',
            contact: {
                Icon: contact_types.linkedin,
                url: 'https://www.linkedin.com/in/nianqin-tia-lu-3b3395213/'
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