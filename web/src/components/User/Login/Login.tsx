import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google'
import jwt_decode from 'jwt-decode'
import { useContext, useEffect, useRef, useState } from 'react'
import LoginAPI from '../../../requests/LoginAPI'

import type { IJWT_Token, IUser } from '../../../utils/interfaces/interfaces'

import { UserContext } from '../../../contexts/User.context'
import { useCooldown } from '../../../utils/hooks/useCooldown'

import { useNavigate } from 'react-router-dom'

// This is the client ID of the Google OAuth app
const CLIENT_ID =
    '250149314571-cfinl9pkdvrv7epjvmid5uqve75ohk48.apps.googleusercontent.com'

const Login = () => {
    const [email_address, set_email_address] = useState('')
    const [auth_code, set_auth_code] = useState('')
    const { user, set_user } = useContext(UserContext)
    const [auth_cooldown, start_cooldown] = useCooldown(60)
    const navigate = useNavigate()

    /** custom navigation fx, add animation before navigation
     */
    const navigate_to_main_page = (side_effect?: () => void) => {
        // side_effect && side_effect()

        setTimeout(() => {
            set_sign_in_btn_msg('\u2713')
        }, 300)

        setTimeout(() => {
            side_effect && side_effect()
        }, 1400)

        setTimeout(() => {
            navigate('/dashboard')
        }, 1500)
    }

    const email_address_ref = useRef(email_address)

    console.log(email_address_ref.current)

    useEffect(() => {
        set_email_address(email_address_ref.current)
    }, [user])

    useEffect(() => {
        set_email_address(email_address_ref.current)
    }, [])

    useEffect(() => {
        email_address_ref.current = email_address
    }, [email_address])

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
    const onAuthSuccessHandler = (
        name: string,
        email: string,
        access_token: string
    ) => {
        const user: IUser = {
            name: name,
            email: email,
            access_token: access_token
        }

        sessionStorage.setItem('user', JSON.stringify(user))

        navigate_to_main_page(() => {
            set_user(user)
        })
    }

    /** post request to retrieve auth code after conditions are met
     */
    const request_auth_code = () => {
        set_auth_btn_loading(true)

        const error_handler = () => {
            set_email_error(true)
            setTimeout(() => {
                set_email_error(false)
            }, 300)
        }

        // check if cooling down
        if (auth_cooldown < 60) {
            console.log(`cooling down, try again in ${auth_cooldown}`)
            error_handler()
            return
        }

        // check if email is incomplete
        if (!email_address.toLowerCase().match(/^[^@]+@[a-z.]+\.edu/)) {
            console.log('wrong email format')
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
                console.log(
                    'post request failed, please contact calcourse@gmail.com for assistance'
                )
            }
        )
    }

    /** handles email/auth_code sign in
     */
    const emailSignInHandler = () => {
        LoginAPI.verifyAuthenticationCode(
            email_address,
            auth_code,
            res => {
                onAuthSuccessHandler('', email_address, res.access_token)
            },
            () => {
                set_auth_code_error(true)
                setTimeout(() => {
                    set_auth_code_error(false)
                }, 300)
                console.log('验证码不匹配')
            }
        )
    }

    /** handles google onetap sign in
     */
    const googleSignInHandler = (res: any) => {
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
                onAuthSuccessHandler(user_name, user_email, res.access_token)
            },
            () => {
                set_google_auth_msg(
                    'please use your institutional email to sign in'
                )
            }
        )
    }

    useEffect(() => {
        set_auth_btn_msg(auth_cooldown === 60 ? '获取' : '' + auth_cooldown)
    }, [auth_cooldown])

    const [sign_in_btn_msg, set_sign_in_btn_msg] = useState('登录')
    const [google_auth_msg, set_google_auth_msg] = useState('')
    const [auth_btn_msg, set_auth_btn_msg] = useState('获取')
    const [auth_btn_loading, set_auth_btn_loading] = useState(false)

    const [email_error, set_email_error] = useState(false)
    const [auth_code_error, set_auth_code_error] = useState(false)

    return (
        <div className="card-transluscent w-full my-auto p-12 pb-6 flex flex-col justify-center max-w-md gap-2">
            <div id="description-container" className="mb-4 w-full mx-2">
                <h1 id="title" className="text-left text-3xl font-bold">
                    Welcome back!
                </h1>
                <h2 id="tagline" className="ml-1 mt-2 text-left text-md">
                    Verify your{' '}
                    <span
                        className={`${
                            email_error && 'text-accent'
                        } transition-colors duration-300 ease-out`}
                    >
                        school email
                    </span>{' '}
                    to get started!
                </h2>
            </div>

            <div className="rounded-full border-2 border-graphite/10 mx-10">
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
                            emailSignInHandler()
                        }
                    }}
                    className={`bg-transparent px-4 py-1 w-full outline-none flex-grow border-2 border-graphite/10 rounded-full ${
                        auth_code_error && 'animate-shaking'
                    }`}
                />
                <button
                    className={`${
                        auth_btn_loading && 'animate-loading duration-300'
                    } py-1 px-4 w-[4.5rem] min-w-max rounded-full text-graphite hover:text-white font-bold border-solid border-2 border-highlight btn-rounded-gradient h-min flex-none flex-grow-0`}
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
                    emailSignInHandler()
                }}
            >
                {sign_in_btn_msg}
            </button>

            <div
                id="divider"
                className="flex-none flex flex-row justify-center items-center gap-6 w-full my-4"
            >
                <label className="flex-none order-1 flex-grow-0 text-[#58585845]">
                    或者使用谷歌登录
                </label>
                <div className="h-px bg-[#58585845] order-0 grow" />
                <div className="h-px bg-[#58585845] order-2 grow" />
            </div>

            <div id="google-login" className="w-full flex justify-center">
                <GoogleOAuthProvider clientId={CLIENT_ID}>
                    <GoogleLogin
                        onSuccess={googleSignInHandler}
                        onError={() => {
                            set_google_auth_msg(
                                'authentication failed, please try again'
                            )
                        }}
                        useOneTap
                    />
                </GoogleOAuthProvider>
            </div>
            <span className="text-sm text-center italic text-gray min-h-[1.25rem]">
                {google_auth_msg}
            </span>
        </div>
    )
}

export default Login
