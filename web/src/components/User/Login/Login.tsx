import './Login.css'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { GoogleLogin } from '@react-oauth/google'
import { useState, useEffect, SetStateAction } from 'react'
import Tutorial from './Tutorial'
import LoginAPI from '../../../requests/LoginAPI'
import About from './About'
import Cookie from './Cookie'
import { useNavigate } from 'react-router-dom'
import jwt_decode from 'jwt-decode'
import { verifyEmailAddress } from '../../../requests/Login-API/verify-email-address'
import {
    checkValidToken,
    saveDataToLocalStorage,
    DeleteLocalStorage
} from './LoginHelper'
import { JWT_Token } from '../../../utils/interfaces/interfaces'
import { useToggle } from '../../../utils/hooks/useToggle'

//install google login package by running: npm install @react-oauth/google@latest
//install jwt-decode by running: npm install jwt-decode

// This is the client ID of the Google OAuth app
const clientId =
    '250149314571-cfinl9pkdvrv7epjvmid5uqve75ohk48.apps.googleusercontent.com'

const Login = () => {
    const countDownInit = 60
    const [countDownCurr, setCountDownCurr] = useState(countDownInit)
    const [isOneTapHidden, toogleOneTapHidden] = useToggle(true)
    const [showSpan, setShowSpan] = useState(false)
    const [isButtonHidden, setButtonHidden] = useState(false)
    const [emailOriginalInput, setEmailOriginalInput] = useState('?')
    const [emailInput, setEmailInput] = useState('?')
    const [codeInput, setCodeInput] = useState('??')

    const [logInDescription, setLogInDescription] = useState('请登录你的账号')

    const navigate = useNavigate()

    // detect if token is already stored
    // if yes, then navigate to dashboard page
    // if (checkValidToken()) {
    //     navigate("/dashboard");
    // }

    const errorAlert = (msg: SetStateAction<string>) => {
        setLogInDescription('\u26A0\n' + msg)
    }

    function storeEmailInput(event: any) {
        setEmailOriginalInput(event.target.value)
        setEmailInput(event.target.value)
    }

    function storeCodeInput(event: any) {
        setCodeInput(event.target.value)
    }

    function sendEmailCode() {
        let emailReg = new RegExp('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.(edu)$')
        if (emailOriginalInput == '?') {
            errorAlert('请填写邮箱地址')
        } else if (!emailReg.test(emailOriginalInput)) {
            errorAlert('请使用@berkeley.edu邮箱登录')
        } else {
            setShowSpan(!showSpan)
            setButtonHidden(!isButtonHidden)
            LoginAPI.sendVerificationCode(
                emailInput,
                () => console.log('Successfully sent'),
                (error: any) => {
                    console.log(error)
                    errorAlert('服务器错误，请重试')
                }
            )
            countDown(countDownCurr)
        }
    }

    function countDown(time: number) {
        let intervalId = setInterval(() => {
            setCountDownCurr(prevCount => prevCount - 1)
            time = time - 1
            if (time === 0) {
                clearInterval(intervalId)
                stopCount()
            }
        }, 1000)
    }

    const stopCount = () => {
        setShowSpan(false)
        setButtonHidden(false)
        setCountDownCurr(countDownInit)
    }

    const onAuthenticateSuccess = (response: any) => {
        console.log(response)
        saveDataToLocalStorage(emailInput, response['access_token'])
        navigate('/dashboard')
    }

    const onEmailSignIn = () => {
        let codeReg = new RegExp('^[0-9]{6}$')
        if (emailInput == '?') {
            errorAlert('请先获取验证码')
        } else if (codeInput == '??') {
            errorAlert('请先填写验证码')
        } else if (!codeReg.test(codeInput)) {
            errorAlert('验证码格式不正确')
        } else {
            LoginAPI.verifyAuthenticationCode(
                emailInput,
                codeInput,
                onAuthenticateSuccess,
                (error: any) => {
                    console.log(error)
                    errorAlert('验证失败，请重试')
                }
            )
        }
    }

    const handleGoogleSignin = (res: any) => {
        // decode JWT token and send verify request
        let token = res['credential']
        var decoded = jwt_decode<JWT_Token>(token)
        let user_email = decoded.email
        let user_givenName = decoded.given_name.concat(' ')
        let user_name = user_givenName.concat(decoded.family_name)
        let isVerified = decoded.email_verified.toString()
        verifyEmailAddress(
            user_email,
            isVerified,
            user_name,
            onAuthenticateSuccess,
            (error: any) => {
                console.log(error)
                errorAlert('请使用@berkeley.edu邮箱登录')
            }
        )
    }

    return (
        <div id="login-wrapper" className="">
            <div id="login-description">{logInDescription}</div>
            <button id="bConnected" onClick={() => toogleOneTapHidden()}>
                bConnected一键登录
            </button>
            <div id="divider-wrapper">
                <label id="divider-text" className='flex-none order-1 flex-grow-0 text-[#58585845]'>或者使用邮箱登录</label>
                <div className="w-[105px] h-0 border-2 border-solid border-[#58585845] flex-none order-0 flex-grow-0" />
                <div className="w-[105px] h-0 border-2 border-solid border-[#58585845] flex-none order-2 flex-grow-0" />
            </div>

            <div className="">
                <input
                    id="email-input"
                    placeholder="你的邮箱"
                    onChange={event =>  (event)}
                />

                <div id="email-code-field">
                    <input
                        id="email-code-input"
                        placeholder="请输入验证码"
                        onChange={event => storeCodeInput(event)}
                    />
                    <button id="email-code-button" onClick={sendEmailCode}>
                        获取
                    </button>
                    {showSpan && <span id="countdown">{countDownCurr}</span>}
                </div>
            </div>
            <button id="email-login-button" onClick={onEmailSignIn}>
                登录
            </button>

            <div id="google-login" className="" hidden={isOneTapHidden}>
                <GoogleOAuthProvider clientId={clientId}>
                    <GoogleLogin
                        onSuccess={handleGoogleSignin}
                        onError={() => {
                            errorAlert('验证失败，请重试')
                        }}
                        useOneTap
                    />
                </GoogleOAuthProvider>
            </div>
        </div>
    )
}
export default Login
