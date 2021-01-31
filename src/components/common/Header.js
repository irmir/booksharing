import React, { useCallback, useEffect } from 'react'
import { connect } from 'react-redux'

import { Menu } from './Menu.js'

import { login, showAuthCard } from '../../redux/authAction.js'
import { bindActionCreators } from 'redux'
import { ProfileAvatar } from './ProfileAvatar.js'

export const HeaderComponent = ({ login, showAuthCard, isAuth }) => {

  useEffect(() => {
    debugger
    login()
  })

  const clickHandler = useCallback((event) => {
    showAuthCard(event.target.value)
  })

  return (
    <header>
      <div className="header container">
        <Menu />
        {isAuth ?
          <ProfileAvatar /> :
          <div className="auth-buttons">
            <button onClick={clickHandler} value="Sign In" disabled={false} type="button">Sign in</button>
            <button onClick={clickHandler} value="Sign Up" disabled={false}>Sign up</button>
          </div>
        }
      </div>
    </header>
  )
}

export const Header = connect(
<<<<<<< HEAD
    null,
    (dispatch) => bindActionCreators({
      // login: login,
      showAuthCard: showAuthCard
    }, dispatch)
  )(HeaderComponent);
=======
  (state) => ({
    isAuth: state.auth.isAuth
  }),
  (dispatch) => bindActionCreators({
    showAuthCard: showAuthCard,
    login: login
  }, dispatch)
)(HeaderComponent);
>>>>>>> 1a29cfa7844150355dea8d6ee05b8921f02b7855
