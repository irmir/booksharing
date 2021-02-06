import React, { useCallback, useEffect } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { NavLink } from 'react-router-dom'
import { useHttp } from '../../hooks/http.hook'

import { Button } from '../common/Button'
import { Message } from '../../components/common/Message'

import { changeInputValue, showMessage, login } from '../../redux/authAction'


const AuthCardComponent = ({ changeInputValue, showMessage,
    loginUser, passwordUser, isCardActive, nameButton, bgImg, login,
    isMessage }) => {

    debugger

    const { loading, request, error } = useHttp()

    useEffect(() => {
        if (error) {
            showMessage(error)
        }
    }, [error])

    const changeHandler = useCallback((event) => {
        changeInputValue(event)
    })

    const loginHandler = async (event) => {
        debugger
        try {
            event.preventDefault()
            const data = await request('http://localhost:5100/api/auth/login', 'POST', { login: loginUser, password: passwordUser })
            debugger
            login(data)
        } catch (e) { }
    }

    const registerHandler = async (event) => {
        try {
            event.preventDefault()
            const data = request('http://localhost:5100/api/auth/register', 'POST', { login: loginUser, password: passwordUser })
        } catch (e) { }
    }

    return (
        <>
            {isCardActive &&
                <div className="auth-card"
                    style={{
                        backgroundImage: `url(./img/${bgImg})`,
                    }}>
                    <div className="form">
                        <form>
                            <div>
                                <input type="email" name="login" placeholder="Email/Phone" onChange={changeHandler} />
                                <input type="password" name="password" placeholder="Password" onChange={changeHandler} />
                                {isMessage ?
                                    <Message />:
                                    <p><NavLink to="/" className="forgot-password"><span>Forgot password</span></NavLink></p>
                                }
                            </div>
                            <Button disabled={loading ? "disabled" : false}
                                onClick={nameButton === "Sign In" ? loginHandler : registerHandler}
                                text={nameButton}
                            />
                        </form>
                        <div className="social-block">

                        </div>
                    </div>
                </div>
            }
            null
        </>

    )
}

export const AuthCard = connect(
    (state) => ({
        loginUser: state.auth.login,
        passwordUser: state.auth.password,
        isCardActive: state.auth.isCardActive,
        nameButton: state.auth.nameButton,
        bgImg: state.site.bgImg,
        isMessage: state.auth.isMessage,
    }),
    (dispatch) => bindActionCreators({
        changeInputValue: changeInputValue,
        showMessage: showMessage,
        login: login
    }, dispatch)
)(AuthCardComponent)