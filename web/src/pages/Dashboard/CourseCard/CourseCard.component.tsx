import { QRCodeSVG } from 'qrcode.react'
import { Component } from 'react'

import type { ICourseData } from '../../../utils/interfaces/interfaces'
import { Transition } from '@headlessui/react'

interface PCourseCard {
    course: ICourseData
}

interface SCourseCard {
    showing_details: boolean
    banner: string
}

class CourseCard extends Component<PCourseCard, SCourseCard> {
    // state declaration
    state: SCourseCard = {
        showing_details: false,
        banner: !this.props.course.school_name_and_term.includes('01')
            ? this.props.course.course_id
            : ''
    }

    // constants
    SHOW_ID = !this.props.course.school_name_and_term.includes('01')

    ANIMATION_SPEED = 30

    // animation functions
    banner_text_removal = (new_text: string) => {
        let current_text = this.state.banner
        let length = current_text.length
        if (length > 0) {
            this.setState({
                ...this.state,
                banner: current_text.slice(0, length - 1)
            })

            setTimeout(
                () => this.banner_text_removal(new_text),
                this.ANIMATION_SPEED
            )
        } else {
            this.banner_text_animation(0, new_text)
        }
    }

    banner_text_animation = (index: number, new_text: string) => {
        let current_text = this.state.banner

        if (index < new_text.length) {
            let charToAdd = new_text.charAt(index)

            this.setState({
                ...this.state,
                banner: current_text + charToAdd
            })

            setTimeout(() => {
                this.banner_text_animation(++index, new_text)
            }, this.ANIMATION_SPEED)
        }
    }

    banner_id_to_name = () => {
        this.banner_text_removal(
            this.props.course.course_name.replace('/', ' / ')
        )
    }

    banner_name_to_id = () => {
        this.banner_text_removal(
            this.SHOW_ID ? this.props.course.course_id : ''
        )
    }

    // onClick handler
    card_on_click_handler = () => {
        if (!this.state.showing_details) {
            this.setState({ ...this.state, showing_details: true })

            setTimeout(this.banner_id_to_name, 300)

            setTimeout(() => {
                window.addEventListener('click', this.window_on_click_handler, {
                    once: true
                })
            }, 300)
        }
    }

    window_on_click_handler = () => {
        if (this.state.showing_details) {
            this.setState({ ...this.state, showing_details: false })

            setTimeout(this.banner_name_to_id, 300)
        }
    }

    componentWillUnmount(): void {
        window.removeEventListener('click', this.window_on_click_handler)
    }

    render() {
        const { course_name, course_qr_code_url } = this.props.course

        return (
            <div
                className={`${
                    this.state.showing_details
                        ? 'card-transluscent-active'
                        : 'card-transluscent'
                } hover:card-transluscent-hover w-42 h-64 duration-300 overflow-hidden flex justify-center items-center flex-col cursor-pointer select-none relative`}
                onClick={this.card_on_click_handler}
            >
                <Transition
                    show={this.state.showing_details}
                    enter="transition-transform duration-250"
                    enterFrom="-translate-y-full"
                    enterTo="translate-0"
                    leave="transition-transform duration-250"
                    leaveFrom="translate-0"
                    leaveTo="-translate-y-full"
                    className="top-0 relative mx-auto pb-5"
                >
                    <QRCodeSVG
                        className="mx-auto text-logo dark:text-logo-dark mt-4 w-[84%]"
                        value={course_qr_code_url}
                        size={200}
                        bgColor="transparent"
                        fgColor={
                            (
                                window.matchMedia &&
                                window.matchMedia(
                                    '(prefers-color-scheme: light)'
                                )
                            ).matches
                                ? '#212121'
                                : '#efefef'
                        }
                    />
                </Transition>

                <Transition
                    as="h1"
                    show={!this.state.showing_details}
                    enter="transition-opacity duration-150"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="transition-opacity duration-150"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                    className="absolute text-lg h-min mx-auto font-bold text-center"
                >
                    {this.SHOW_ID
                        ? course_name
                        : course_name.replace('/', ' / ')}
                </Transition>

                <span
                    className={`bg-accent w-full h-6 absolute bottom-0 text-center ${
                        this.state.showing_details
                            ? 'opacity-1'
                            : 'opacity-stroke'
                    } transition-opacity duration-150 text-white font-bold`}
                >
                    {this.state.banner}
                </span>
            </div>
        )
    }
}

export default CourseCard
