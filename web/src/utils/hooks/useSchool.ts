import { useLocation } from 'react-router-dom'
import { useUserContext } from './useUserContext'

export type SchoolId = 'ucb' | 'stanford' | 'ucla' | 'usc'

export interface SchoolConfig {
    id: SchoolId
    name: string
    courseTerm: string
    favicon: string
    gradientClass: string
    logoTextClass: string
    classes: {
        border: string
        bg: string
        text: string
        hoverBorderB: string
        focusBorderB: string
        hoverBg: string
    }
}

const SCHOOL_CONFIGS: Record<SchoolId, SchoolConfig> = {
    ucb: {
        id: 'ucb',
        name: 'CalCourse',
        courseTerm: 'UCB',
        favicon: '/favicon.png',
        gradientClass: 'bg-gradient',
        logoTextClass: 'text-logo dark:text-logo-dark',
        classes: {
            border: 'border-accent',
            bg: 'bg-accent',
            text: 'text-accent',
            hoverBorderB: 'hover:border-b-accent',
            focusBorderB: 'focus:border-b-accent',
            hoverBg: 'hover:bg-accent',
        },
    },
    stanford: {
        id: 'stanford',
        name: 'TreeCourse',
        courseTerm: 'Stanford',
        favicon: '/favicon-stanford.png',
        gradientClass: 'bg-gradient-stanford',
        logoTextClass: 'text-accent-stanford',
        classes: {
            border: 'border-accent-stanford',
            bg: 'bg-accent-stanford',
            text: 'text-accent-stanford',
            hoverBorderB: 'hover:border-b-accent-stanford',
            focusBorderB: 'focus:border-b-accent-stanford',
            hoverBg: 'hover:bg-accent-stanford',
        },
    },
    ucla: {
        id: 'ucla',
        name: 'CalCourse',
        courseTerm: 'UCLA',
        favicon: '/favicon.png',
        gradientClass: 'bg-gradient',
        logoTextClass: 'text-logo dark:text-logo-dark',
        classes: {
            border: 'border-accent',
            bg: 'bg-accent',
            text: 'text-accent',
            hoverBorderB: 'hover:border-b-accent',
            focusBorderB: 'focus:border-b-accent',
            hoverBg: 'hover:bg-accent',
        },
    },
    usc: {
        id: 'usc',
        name: 'CalCourse',
        courseTerm: 'USC',
        favicon: '/favicon.png',
        gradientClass: 'bg-gradient',
        logoTextClass: 'text-logo dark:text-logo-dark',
        classes: {
            border: 'border-accent',
            bg: 'bg-accent',
            text: 'text-accent',
            hoverBorderB: 'hover:border-b-accent',
            focusBorderB: 'focus:border-b-accent',
            hoverBg: 'hover:bg-accent',
        },
    },
}

export function getSchoolIdFromEmail(email: string): SchoolId {
    const lower = email.toLowerCase()
    if (lower.endsWith('@stanford.edu')) return 'stanford'
    if (lower.endsWith('@ucla.edu') || lower.endsWith('@g.ucla.edu')) return 'ucla'
    if (lower.endsWith('@usc.edu')) return 'usc'
    return 'ucb'
}

export function getSchoolConfig(schoolId: SchoolId): SchoolConfig {
    return SCHOOL_CONFIGS[schoolId]
}

export const useSchool = (): SchoolConfig => {
    const [user] = useUserContext()
    const { pathname } = useLocation()

    // Post-login: derive from email (source of truth)
    if (user?.email) {
        return SCHOOL_CONFIGS[getSchoolIdFromEmail(user.email)]
    }

    // Pre-login: fall back to URL path
    if (pathname === '/stanford') {
        return SCHOOL_CONFIGS.stanford
    }

    return SCHOOL_CONFIGS.ucb
}
