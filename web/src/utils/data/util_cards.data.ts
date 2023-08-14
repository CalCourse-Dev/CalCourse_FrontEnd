import { IconType } from "react-icons"
import { BiAddToQueue, BiBug } from "react-icons/bi"
import { EXTERNAL_LINKS } from "../constants/external_links"

export interface PUtilButton {
    Icon: IconType
    label: string
    url: string | URL
    external?: boolean
}

export const util_buttons: PUtilButton[] = [
    {
        Icon: BiAddToQueue,
        label: '申请建群',
        url: '/dashboard/request'
    },
    {
        Icon: BiBug,
        label: '故障报告',
        url: EXTERNAL_LINKS.BUG_REPORT_FORM,
        external: true
    }
]