import React, { useState, useRef, useEffect, useCallback } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { useHttp } from '../../../hooks/http.hook'

import { Input } from '../../common/Input'
import { Button } from '../../common/Button'

import bg from '../../../image/bg-acount-header.jpg'
import ava from '../../../image/ava3.jpg'

import { changeDisabled } from '../../../redux/siteAction'
import { updateProfileData } from '../../../redux/userAction'


const AccountCardComponent = ({ quoteAccount, authorQuoteAccount,
    inputs, changeDisabled, authData, profileData, updateProfileData}) => {
    debugger
    const { request } = useHttp()

    const formRef = useRef(null)

    const [form, setForm] = useState({
        nickName: "",
        email: "",
        phoneNumber: "",
        // password: ""
    })

    useEffect(() => {
        if (profileData) {
            setForm({
                nickName: profileData.nickName,
                email: profileData.email,
                phoneNumber: profileData.phoneNumber,
                // password: profileData.password
            })
        }
    }, [profileData])

    const [isDisable, setDisable] = useState(true)
    const [editInputName, setEditInputName] = useState(null)

    useEffect(() => {
        if (!isDisable) {
            formRef.current.elements[editInputName][0].focus()
            formRef.current.elements[editInputName][0].placeholder = " "
        }
    }, [isDisable])

    const editUserData = (event) => {
        debugger
        event.preventDefault()
        setDisable(!isDisable)
        setEditInputName(event.target.name)
        changeDisabled(event.target.name)
    }

    const putUserData = async (event) => {
        debugger
        event.preventDefault()
        setDisable(!isDisable)

        const inputName = event.target.name
        let inputValue = ''

        if (inputName === "avatar" && event.target.files.length) {
            inputValue = event.target.files[0]
        } else {
            inputValue = formRef.current.elements[inputName][0].value
        }

        const formData = new FormData()
        formData.append(inputName, inputValue)
        formData.append("userTypeId", profileData.userTypeId)

        // for (let [name, value] of formData) {
        //     console.log(`${name} = ${value}, type: ${typeof value}`)
        // }

        const result = await request(`http://localhost:5100/api/users/${authData.id}`, 'PUT', formData,
            { Authorization: `Bearer ${authData.token}` })

        if (result) {
            debugger
            updateProfileData({inputName,inputValue})
            changeDisabled(inputName)
        } else {
            console.log('error')
        }
    }

    const onChange = useCallback((event) => {
        setForm({ ...form, [event.target.name]: event.target.value })
    })

    if (!profileData) {
        return null
    }

    return (
        <div className="account-card">
            <div className="header-account" style={{ background: `url(${bg})` }}>
                <p>
                    <span>{quoteAccount[0]}</span>
                    <span>{quoteAccount[1]}</span>
                </p>
                <p>{authorQuoteAccount}</p>
                <div className="photo">
                    <img src={profileData.avatar ? `data:image/gif;base64,${profileData.avatar}`: ava}></img>
                    <div className="avatar">
                        <label htmlFor="photo" title="Change photo">
                            <svg width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M3.38121 2.50347C3.38121 1.29963 4.35711 0.32373 5.56094 0.32373H7.48074C8.68463 0.32373 9.66052 1.29963 9.66052 2.50347C9.66052 2.51376 9.66842 2.52233 9.67869 2.52316L11.2252 2.64877C11.918 2.70503 12.4877 3.21731 12.617 3.90022C12.947 5.64286 12.9716 7.42962 12.6897 9.18065L12.6223 9.59975C12.4951 10.3897 11.8449 10.9908 11.0474 11.0556L9.70012 11.165C7.58409 11.3368 5.45766 11.3368 3.34162 11.165L1.99434 11.0556C1.1968 10.9908 0.546602 10.3897 0.41945 9.59975L0.351993 9.18065C0.0701449 7.42962 0.0947484 5.64286 0.424701 3.90022C0.554003 3.21731 1.12374 2.70503 1.8165 2.64877L3.36304 2.52316C3.37331 2.52233 3.38121 2.51376 3.38121 2.50347ZM6.52088 3.61854C5.08429 3.61854 3.91971 4.78309 3.91971 6.2197C3.91971 7.6563 5.08429 8.82086 6.52088 8.82086C7.95748 8.82086 9.12204 7.6563 9.12204 6.2197C9.12204 4.78309 7.95748 3.61854 6.52088 3.61854Z" fill="white" fill-opacity="0.5" />
                            </svg>
                        </label>
                        <input onChange={putUserData}
                            type="file"
                            name="avatar"
                            id="photo"
                            title="Change photo"
                        ></input>
                    </div>
                </div>
            </div>
            <form ref={formRef}>
                <ul className="data-account">
                    {
                        inputs.map((item) => (
                            <li>
                                <label>{item.label}</label>
                                <Input onChange={onChange} name={item.inputName}
                                    value={item.inputName === "nickName" ? form.nickName :
                                        item.inputName === "id" ? authData.id :
                                            item.inputName === "phoneNumber" ? form.phoneNumber :
                                                item.inputName === "email" ? form.email :
                                                    item.inputName === form.password}
                                    type={item.type} disabled={item.disabled} placeholder={item.placeholder} />
                                <Button onClick={item.disabled ? editUserData : putUserData}
                                    text={item.inputName === "id" ? "" : item.disabled ? "Edit" : "Save"}
                                    name={item.inputName} />
                            </li>
                        ))
                    }
                </ul>
            </form>
            <div className="my-books">

            </div>
        </div>
    )
}

export const AccountCard = connect(
    (state) => ({
        quoteAccount: state.site.quoteAccount,
        authorQuoteAccount: state.site.authorQuoteAccount,
        inputs: state.site.inputs,
        authData: state.auth.authData,
        profileData: state.user.profileData,
    }),
    (dispatch) => bindActionCreators({
        changeDisabled,
        updateProfileData,
    }, dispatch)
)(AccountCardComponent)