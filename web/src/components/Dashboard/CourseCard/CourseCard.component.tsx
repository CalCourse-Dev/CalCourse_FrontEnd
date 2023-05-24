import { QRCodeSVG } from 'qrcode.react'
import { Component } from 'react'

import type { CourseData } from '../../../utils/interfaces'

interface PCourseCard {
    course: CourseData
}

interface SCourseCard {
    showing_details: boolean
}

class CourseCard extends Component<PCourseCard, SCourseCard> {
    state: SCourseCard = {
        showing_details: false,
    }

    render() {
        return (
            <div
                className={`card-transluscent h-64 w-full duration-300 overflow-hidden`}
                onClick={() => {
                    this.setState(state => ({
                        showing_details: !state.showing_details,
                    }))
                }}
            >
                <h1 className="text-subtitle text-center align-middle text-lg h-min mt-24">
                    {this.props.course.course_name}
                </h1>
                <div
                    className={`relative ${
                        this.state.showing_details ? 'top-[100]' : ''
                    } duration-200`}
                >
                    {/* <QRCodeSVG
                        className="img"
                        value={this.props.course.course_qr_code_url}
                        size={280}
                        bgColor="transparent"
                        fgColor="#333"
                    /> */}
                </div>
                <div className="bg-accent w-full h-6 absolute bottom-0 text-center opacity-stroke text-white font-bold align-middle">
                    {this.props.course.course_id}
                </div>
            </div>
        )
    }
}

export default CourseCard
