import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google'
import jwt_decode from 'jwt-decode'
import { useEffect, useState } from 'react'
import LoginAPI from '../../requests/LoginAPI'

import type {
    ICourseData,
    IJWT_Token,
    IUser
} from '../../utils/interfaces/interfaces'

import { useCooldown } from '../../utils/hooks/useCooldown'

import { useNavigate } from 'react-router-dom'
import CourseAPI from '../../requests/CourseAPI'
import { useUserContext } from '../../utils/hooks/useUserContext'
import { useCourseDataContext } from '../../utils/hooks/useCourseDataContext'
import { CONSTANTS } from '../../utils/constants/constants'

const Login = () => {
    const [email_address, set_email_address] = useState('')
    const [auth_code, set_auth_code] = useState('')
    const [user, set_user] = useUserContext()
    const [, set_courses] = useCourseDataContext()
    const [auth_cooldown, start_cooldown] = useCooldown(60)
    const navigate = useNavigate()

    const new_user: IUser = { name: '', email: '', access_token: '' }

    /** custom navigation fx, add animation before navigation
     */
    const navigate_to_main_page = (side_effect?: () => void) => {
        // side_effect && side_effect()

        setTimeout(() => {
            set_sign_in_btn_msg('\u2713')
        }, 100)

        // 在这里 fetch course 然后 set_courses 的时候 set timeout
        setTimeout(
            () => {
                side_effect && side_effect()
                navigate('/dashboard')
            },
            side_effect ? 1500 : 0
        )
    }

    /** try fetch user from localstorage/context on init
     */
    useEffect(() => {
        const storedUser: IUser = JSON.parse(
            sessionStorage.getItem('user') ?? '{}'
        )

        if ('email' in storedUser) {
            set_user(storedUser)
        }

        if (user) {
            navigate_to_main_page()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    /** handles successful login
     */
    const on_auth_success_handler = (
        name: string,
        email: string,
        access_token: string
    ) => {
        set_tagline_msg('Verified! Taking you to the dashboard…')

        new_user.name = name
        new_user.email = email
        new_user.access_token = access_token

        sessionStorage.setItem('user', JSON.stringify(new_user))

        let setCourses = () => {}

        CourseAPI.getAllCourses(
            new_user.email,
            new_user.access_token,
            (res: ICourseData[]) => {
                setCourses = () => set_courses(res)
            },
            (error: any) => {
                // ! fix this: add in a customized card to tell user to contact support
                console.log(error)
            }
        )

        navigate_to_main_page(() => {
            set_user(new_user)
            setCourses()
        })
    }

    /** post request to retrieve auth code after conditions are met
     */
    const request_auth_code = () => {
        set_auth_btn_loading(true)

        const error_handler = () => {
            set_auth_btn_loading(false)
            set_tagline_msg(
                auth_cooldown < 60
                    ? `cooling down, try again in ${auth_cooldown}`
                    : email_address.length > 0
                    ? 'Please use your institutional email to sign in'
                    : 'Fill in your email first!'
            )
            set_email_error(true)
            setTimeout(() => {
                set_email_error(false)
            }, 300)
        }

        // check if cooling down
        if (auth_cooldown < 60) {
            error_handler()
            return
        }

        // check if email is incomplete
        if (!email_address.toLowerCase().match(/^[^@]+@[a-z.]+\.edu/)) {
            error_handler()
            return
        }

        // post request
        LoginAPI.sendVerificationCode(
            email_address,
            () => {
                set_auth_btn_loading(false)
                set_auth_btn_msg('\u2713')
                start_cooldown()
            },
            () => {
                error_handler()
                set_tagline_msg(
                    'An unknown error occured. Please contact calcourse@gmail.com for assistance'
                )
            }
        )
    }

    /** handles email/auth_code sign in
     */
    const email_sign_in_handler = () => {
        LoginAPI.verifyAuthenticationCode(
            email_address,
            auth_code,
            res => {
                on_auth_success_handler('', email_address, res.access_token)
            },
            () => {
                set_auth_code_error(true)
                set_tagline_msg(
                    auth_code.length > 0
                        ? 'Authentication code incorrect…'
                        : 'Fill out the form to sign in'
                )
                setTimeout(() => {
                    set_auth_code_error(false)
                }, 300)
            }
        )
    }

    /** handles google onetap sign in
     */
    const google_sign_in_handler = (res: any) => {
        // decode JWT token and send verify request
        const token = res['credential']
        const { email, given_name, family_name, email_verified } =
            jwt_decode<IJWT_Token>(token)

        const user_email = email
        const user_name = given_name + ' ' + family_name
        const isVerified = email_verified.toString()

        LoginAPI.verifyEmailAddress(
            user_email,
            isVerified,
            user_name,
            res => {
                on_auth_success_handler(user_name, user_email, res.access_token)
            },
            () => {
                set_tagline_msg(
                    'Please use your institutional email to sign in'
                )
            }
        )
    }

    /** set auth btn msg based on cool down
     */
    useEffect(() => {
        set_auth_btn_msg(auth_cooldown === 60 ? '获取' : '' + auth_cooldown)
    }, [auth_cooldown])

    const [sign_in_btn_msg, set_sign_in_btn_msg] = useState('登录')
    const [auth_btn_msg, set_auth_btn_msg] = useState('获取')
    const [auth_btn_loading, set_auth_btn_loading] = useState(false)

    const [email_error, set_email_error] = useState(false)
    const [auth_code_error, set_auth_code_error] = useState(false)
    const [tagline_msg, set_tagline_msg] = useState(
        'Verify your school email to get started!'
    )

    return (
        <div className="card-transluscent w-full my-auto p-12 pb-6 flex flex-col justify-center max-w-md gap-2">
            <div
                id="description-container"
                className="mb-4 mx-auto text-center"
            >
                <h1 id="title" className="text-3xl font-bold">
                    Welcome back!
                </h1>
                <h2 id="tagline" className="mt-2 text-md">
                    {tagline_msg}
                </h2>
            </div>

            <div className="rounded-full border-2 border-graphite/10 dark:border-graphite-dark/10 mx-10">
                <input
                    className={`bg-transparent w-full px-4 py-1 outline-none autofill:rounded-full ${
                        email_error && 'animate-shaking'
                    }`}
                    placeholder="邮箱地址"
                    value={email_address}
                    name="email"
                    onChange={event => {
                        set_email_address(event.target.value)
                    }}
                    onKeyUp={event => {
                        if (event.key === 'Enter') {
                            request_auth_code()
                        }
                    }}
                />
            </div>
            <div className="max-w-full w-auto flex flex-row gap-2 mx-10">
                <input
                    placeholder="验证码"
                    onChange={event => {
                        set_auth_code(event.target.value)
                    }}
                    onKeyUp={event => {
                        if (event.key === 'Enter') {
                            email_sign_in_handler()
                        }
                    }}
                    className={`bg-transparent px-4 py-1 w-full outline-none flex-grow border-2 border-graphite/10 dark:border-graphite-dark/10 rounded-full ${
                        auth_code_error && 'animate-shaking'
                    }`}
                />
                <button
                    className={`${
                        auth_btn_loading && 'animate-loading duration-300'
                    } py-1 px-4 w-[4.5rem] min-w-max rounded-full hover:text-white font-medium border-solid border-2 border-highlight btn-rounded-gradient h-min flex-none flex-grow-0`}
                    onClick={() => {
                        request_auth_code()
                    }}
                >
                    {auth_btn_msg}
                </button>
            </div>

            <button
                type="submit"
                className="btn-rounded-full flex-none mx-10 transition-opacity duration-150 ease-in"
                onClick={event => {
                    event.preventDefault()
                    email_sign_in_handler()
                }}
            >
                {sign_in_btn_msg}
            </button>

            <div
                id="divider"
                className="flex-none flex flex-row justify-center items-center gap-6 w-full my-4"
            >
                <label className="text-[#58585845] dark:text-white/50 flex-none order-1 flex-grow-0 select-none">
                    或者使用谷歌登录
                </label>
                <div className="h-px bg-[#58585845] dark:bg-white/50 order-0 grow" />
                <div className="h-px bg-[#58585845] dark:bg-white/50 order-2 grow" />
            </div>

            <div id="google-login" className="w-full flex justify-center mb-3">
                <GoogleOAuthProvider clientId={CONSTANTS.GOOGLE_CLIENT_ID}>
                    <GoogleLogin
                        onSuccess={google_sign_in_handler}
                        onError={() => {
                            set_tagline_msg(
                                'Sign in failed, try again or try using email'
                            )
                        }}
                        useOneTap
                    />
                </GoogleOAuthProvider>
            </div>
        </div>
    )
}

export default Login
