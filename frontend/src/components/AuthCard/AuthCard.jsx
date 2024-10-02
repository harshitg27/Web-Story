import React, { useState } from 'react'
import styles from './AuthCard.module.css'
import { GrHide, GrView } from 'react-icons/gr'
import closeIcon from '../../assets/image/closeIcon.jpg'
import { Login, Register } from '../../api/User'

function AuthCard({ authCardType, setAuthCardType , fetchUser}) {
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [passwordType, setPasswordType] = useState('password')
  const [err , setErr] = useState('')
  const handleSubmit = () => {
    setErr('')
    if (userName.trim().length === 0) {
      setErr('Enter User Name Correctly')
      return
    }
    if (password.length === 0) {
      setErr("Enter Correct Password")
      return
    }
    if(authCardType === 'Register'){
      handleRegister()
    }else if(authCardType === 'Login'){
      handleLogIn()
    }
    // action(quizName, quizType)
    // closePrompt()
  }

  const handleRegister = async () => {
    try {
        const response = await Register(userName  , password);
        if (response.status == 201) {
          handleLogIn()
        }else{
            alert(response.data.message)
        }
    } catch (error) {
        console.log(error)
    }
}
const handleLogIn = async () => {
  try {
      const response = await Login(userName  , password);
      if (response.status == 200) {
          localStorage.setItem('userToken', response.data?.userToken)
          setUserName('')
          setPassword('')
          fetchUser()
          setAuthCardType(null)
      }else{
          alert(response.data.message)
      }
  } catch (error) {
      console.log(error)
  }
}

  return (
    <>
      <div className={styles.wrapper}></div>

      <div className={styles.page} style={{ minHeight: '250px' }}
        onClick={(eve) => {
          eve.stopPropagation()
        }}>

        <div className={styles.closeButton} onClick={() => setAuthCardType(null)}>
          <img src={closeIcon} alt="" />
        </div>

        <h3 className={styles.title}>{authCardType}</h3>

        <div className={styles.userForm}>
          <div className={styles.inputBox}>
            <p>UserName</p>
            <input
              type="text"
              placeholder='Enter Username'
              value={userName}
              onChange={(e) => setUserName(e.target.value)} />

          </div>
          <div className={styles.inputBox}>
            <p>Password</p>
            <input
              type={passwordType}
              value={password}
              placeholder='Enter Password'
              onChange={(e) => setPassword(e.target.value)}
            />
            {passwordType == 'text' ?
              <GrHide className={styles.rightIcon} onClick={() => setPasswordType('password')} /> :
              <GrView className={styles.rightIcon} onClick={() => setPasswordType('text')} />}
          </div>

          {err && <span>{err}</span> }
        </div>

        <button className={styles.actionButton} onClick={handleSubmit} >{authCardType}</button>
        
      </div>
    </>
  )
}

export default AuthCard
