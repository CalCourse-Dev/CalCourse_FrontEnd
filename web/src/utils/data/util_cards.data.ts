import { IconType } from "react-icons"
import { BiAddToQueue, BiBug } from "react-icons/bi"
import { EXTERNAL_LINKS } from "../constants/external_links"
import type { SchoolId } from "../hooks/useSchool"

export interface PUtilButton {
    Icon: IconType
    label: string
    url: string | URL
    external?: boolean
}

export const getUtilButtons = (schoolId: SchoolId): PUtilButton[] => [
    {
        Icon: BiAddToQueue,
        label: '申请建群',
        url: '/dashboard/request'
    },
    {
        Icon: BiBug,
        label: '故障报告',
        url: schoolId === 'stanford'
            ? EXTERNAL_LINKS.BUG_REPORT_FORM_STANFORD
            : EXTERNAL_LINKS.BUG_REPORT_FORM,
        external: true
    }
]