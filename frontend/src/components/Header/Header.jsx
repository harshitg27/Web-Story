import React, { useEffect, useState } from 'react'
import hamburgerIcon from '../../assets/image/hamburger.png'
import profileIcon from '../../assets/image/profile.png'
import styles from '../../pages/HomePage/HomePage.module.css'
import AuthCard from '../AuthCard/AuthCard'
import { getUser } from '../../api/User'
import AddStoryPrompt from '../StoryPrompt/AddStoryPrompt'
import { useNavigate } from 'react-router-dom'

function Header() {
    const navigate = useNavigate()
    const [authCardType, setAuthCardType] = useState(null)
    const [userDetails, setUserName] = useState('')
    const [userCard , setUserCard] = useState(false)
    const [addStoryCard , setAddStoryCard] = useState(false)

    useEffect(() => {
        if(localStorage.userToken){
            fetchUser()
        }
    }, [])

    const fetchUser = async () => {
        try {
            const response = await getUser()
            if (response.status === 201) {
                setUserName(response.data.userName)
            }
        } catch (error) {
            console.log(error)
        }
    }
    const logout = () =>{
        setUserName(null)
        localStorage.clear()
        setUserCard(false)
    }
    const closeStoryPrompt = () =>{
        setAddStoryCard(false)
    }
    return (
        <>
            <header className={styles.header} style={{}}>
                    {!userDetails ? <div className={styles.user}>
                        <button onClick={() => setAuthCardType('Register')}>Register Now</button>
                        <button style={{ background: '#73ABFF' }} onClick={() => setAuthCardType('Login')}>Sign In</button>
                    </div> :
                    <div className={styles.user}>
                        <button onClick={() => {navigate('/bookmarks') }}>Bookmarks</button>
                        <button  onClick={() => setAddStoryCard(true)}>Add story</button>
                        <div className={styles.profileIcon}>
                            <img src={profileIcon} alt="hamburger" />
                        </div>
                        <div className={styles.userHamburger} onClick={() => setUserCard(!userCard)}>
                            <img src={hamburgerIcon} alt="hamburger" />
                        </div>
                    </div>
                    }

                    <div className={styles.mobileHamburger}>
                        <img src={hamburgerIcon} alt="hamburger" />
                    </div>
                </header>

                {userCard &&<div className={styles.userCard}>
                    <p>{userDetails}</p>
                    <button onClick={logout}>Logout</button>
                </div>}

                {authCardType && <AuthCard authCardType={authCardType} setAuthCardType={setAuthCardType} fetchUser={fetchUser} />}
                {addStoryCard && <AddStoryPrompt closePrompt={closeStoryPrompt} /> }
        </>
    )
}

export default Header
