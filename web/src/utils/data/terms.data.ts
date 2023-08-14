import type { ITerm } from '../interfaces/interfaces'

export const TERMS: ITerm[] = [
    { school_name_and_term: 'UCB Mj01', label: '专业群' },
    { school_name_and_term: 'UCB Fa23', label: 'Fall 2023 课群' },
    {
        school_name_and_term: 'UCB Sp24',
        label: 'Spring 2024 课群',
        hidden: true
    },
    { school_name_and_term: 'UCB Fa24', label: 'Fall 2024 课群', hidden: true },
    {
        school_name_and_term: 'UCB Sp25',
        label: 'Spring 2025 课群',
        hidden: true
    },
    { school_name_and_term: 'UCB Lf01', label: 'Cal Life' }
]
