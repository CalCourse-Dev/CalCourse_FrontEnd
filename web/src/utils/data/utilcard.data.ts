// TODO : create data for util cards

import { IUtilCard } from '../interfaces/interfaces'

export const UTIL_CARD_MAP: { [label: string]: IUtilCard } = {
    add_request: {
        label: '申请建群',
        onClickHandler: () => {}
    },
    report_bug: {
        label: '故障反馈',
        onClickHandler: () => {}
    },
    log_out: {
        label: '退出登陆',
        onClickHandler: () => {}
    }
}
