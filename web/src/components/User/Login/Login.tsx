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
import { checkValidToken } from './checkValid'

const Login = () => {
    console.log('Login')
    const navigate = useNavigate()
    // detect if token is already stored
    // if yes, then navigate to dashboard page

    //if (checkValidToken()) {
    //  navigate("/dashboard");
    //  console.log("checked");
    //}

    const [isEmailAuthHidden, setEmailAuthHidden] = useState(true)
    const [isOneTapHidden, setOnetapHidden] = useState(true)

    const handleEmailAuth = () => {
        console.log('EmailAuth Clicked')
        setEmailAuthHidden(false)
        setOnetapHidden(true)
    }

    const handleGoogleAuth = () => {
        console.log('GoogleAuth Clicked')
        setOnetapHidden(false)
        setEmailAuthHidden(true)
    }

    const [cookieHidden, setCookie] = useState(true)

    const handleCookie = () => {
        setCookie(!cookieHidden)
    }

    const [aboutHidden, setAbout] = useState(true)

    const handleAbout = () => {
        setAbout(!aboutHidden)
    }

    const [tutorialHidden, setTutorial] = useState(true)

    const handleTutorial = () => {
        setTutorial(!tutorialHidden)
    }

    function errorAlert(msg: SetStateAction<string>) {
        let des = document.getElementById('login-description')
        if (des != undefined) {
            des.className = 'text-yellow-300 text-bold text-[18px]'
            des.textContent = '\u26A0' + '\n' + msg
        }
    }

    const [showSpan, setShowSpan] = useState(false)
    const [isButtonHidden, setButtonHidden] = useState(false)
    const [emailOriginalInput, setEmailOriginalInput] = useState('?')
    const [emailInput, setEmailInput] = useState('?')

    function storeEmailInput(event: any) {
        setEmailOriginalInput(event.target.value)
        setEmailInput(event.target.value)
    }

    const [codeInput, setCodeInput] = useState('??')

    function storeCodeInput(event: any) {
        setCodeInput(event.target.value)
    }

    function sendEmailCode() {
        let emailReg = new RegExp('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(edu)$')
        console.log(emailOriginalInput)
        if (emailOriginalInput == '?') {
            errorAlert('请填写Berkeley邮箱地址')
        } else if (!emailReg.test(emailOriginalInput)) {
            console.log(emailOriginalInput)
            errorAlert('邮箱地址不正确')
        } else {
            console.log('Send Email Code')
            setShowSpan(!showSpan)
            setButtonHidden(!isButtonHidden)
            console.log(emailInput)
            LoginAPI.sendVerificationCode(
                emailInput,
                () => console.log('Successfully sent'),
                () => console.log('Fail')
            )
            countDown(countDownCurr)
        }
    }

    const countDownInit = 2
    const [countDownCurr, setCountDownCurr] = useState(countDownInit)

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

    const onEmailSignIn = () => {
        let codeReg = new RegExp('^[0-9]{6}$')
        console.log(emailInput, codeInput)
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
                emailSignInSuccess,
                (response: any) => console.log('验证失败，请重试')
            )
        }
    }

    const emailSignInSuccess = (response: any) => {
        console.log(response)
        saveDataToLocalStorage(emailInput, response['access_token'])
        console.log('sign in ')
        navigate('/dashboard')
    }

    const saveUserTokenTime = () => {
        let currentTime = new Date()
        let currentTimeList = [
            currentTime.getUTCFullYear(),
            currentTime.getUTCMonth(),
            currentTime.getUTCDate(),
            currentTime.getUTCHours(),
        ]
        localStorage.setItem('user_token_time', JSON.stringify(currentTimeList))
    }

    const saveDataToLocalStorage = (email: string, access_token: string) => {
        localStorage.setItem('user_email', email)
        localStorage.setItem('user_token', access_token)
        saveUserTokenTime()
    }

    const clientId =
        '250149314571-cfinl9pkdvrv7epjvmid5uqve75ohk48.apps.googleusercontent.com'

    interface MyToken {
        email: string
        family_name: string
        given_name: string
        email_verified: boolean
    }
    const onSuccess = (res: any) => {
        console.log(res['credential'])
        // decode JWT token and send verify request
        let token = res['credential']
        var decoded = jwt_decode<MyToken>(token)
        console.log(decoded)
        let user_email = decoded.email
        let user_givenName = decoded.given_name.concat(' ')
        let user_name = user_givenName.concat(decoded.family_name)
        let isVerified = decoded.email_verified.toString()
        console.log(user_email, user_name, isVerified)
        verifyEmailAddress(
            user_email,
            isVerified,
            user_name,
            () => navigate('/dashboard'),
            () => errorAlert('请使用其他邮箱登录')
        )
    }

    return (
        <div id="main-container">
            <div id="login-wrapper">
                
                    <div id="login-description">请登录你的账号</div>
                    <button id="bConnected" onClick={handleGoogleAuth}>
                        bConnected
                    </button>
                    <div id="divider-wrapper">
                        <label id="divider-text">或者使用邮箱登录</label>
                        <div id="divider-line17"></div>
                        <div id="divider-line18"></div>
                    </div>
                

                    <div id="Frame5">
                        <input
                            id="email-input"
                            placeholder="你的邮箱"
                            onChange={event => storeEmailInput(event)}
                        />

                        <div id="email-code-field">
                            <input
                                id="email-code-input"
                                placeholder="请输入验证码"
                                onChange={event => storeCodeInput(event)}
                            />
                            <button
                                id="email-code-button"
                                onClick={sendEmailCode}
                            >
                                获取
                            </button>
                            {showSpan ? (
                                <span id="countdown">{countDownCurr}</span>
                            ) : null}
                        </div>
                    </div>
                    <button id="email-login-button" onClick={onEmailSignIn}>
                        登录
                    </button>
                

                <div id="google-login" className="" hidden={isOneTapHidden}>
                    <GoogleOAuthProvider clientId={clientId}>
                        <GoogleLogin
                            onSuccess={onSuccess}
                            onError={() => {
                                console.log('Fail')
                            }}
                            useOneTap
                        />
                    </GoogleOAuthProvider>
                </div>
            </div>
        </div>
    )
}
export default Login
