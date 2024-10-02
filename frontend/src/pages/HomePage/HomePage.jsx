import React, { useEffect, useState } from 'react'
// import hamburgerIcon from '../../assets/image/hamburger.png'
// import profileIcon from '../../assets/image/profile.png'
import styles from './HomePage.module.css'
import AuthCard from '../../components/AuthCard/AuthCard'
import { categories } from '../../assets/data/category'
import { getUser } from '../../api/User'
import { getStoriesByUser } from '../../api/Story'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import editIcon from '../../assets/image/editIcon.png'

function HomePage() {
    const navigate = useNavigate()
    const [authCardType, setAuthCardType] = useState(null)
    const [userDetails, setUserName] = useState('')
    const [userCard, setUserCard] = useState(false)
    const [selectedFilter, setSelectedFilter] = useState('All')
    const [storiesByUser, setStoriesByUser] = useState([])
    const [storiesByCategory, setStoriesByCategory] = useState({})

    useEffect(() => {
        if (localStorage.userToken) {
            fetchUser()
            getStories()
        }
        categories.map((category, idx) => {
            if (idx > 0) {
                getStoriesByCategory(category.title)
            }
        })
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
    const getStories = async () => {
        try {
            const response = await getStoriesByUser()
            if (response.status === 200) {
                setStoriesByUser(response.data.stories)
            }
        } catch (error) {
            console.log(error)
        }
    }
    const getStoriesByCategory = async (category) => {
        try {
            const response = await axios.get(`http://localhost:4005/story/category?category=${category}`)
            if (response.status === 200) {
                storiesByCategory[category] = response.data.stories
                setStoriesByCategory(storiesByCategory)
            }
        } catch (error) {
            console.log(error)
        }
    }
    const logout = () => {
        setUserName(null)
        localStorage.clear()
        setUserCard(false)
    }

    useEffect(() => {
        console.log(storiesByCategory)
    }, [storiesByCategory])
    return (
        <>
            <div className={styles.page}>
                {/* <header className={styles.header}>
                    {!userDetails ? <div className={styles.user}>
                        <button onClick={() => setAuthCardType('Register')}>Register Now</button>
                        <button style={{ background: '#73ABFF' }} onClick={() => setAuthCardType('Login')}>Sign In</button>
                    </div> :
                    <div className={styles.user}>
                        <button onClick={() => { }}>Bookmarks</button>
                        <button  onClick={() => { }}>Add story</button>
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
                </header> */}

                <div className={styles.categoriesContainer}>
                    {categories.map((category, index) => {
                        return <div className={styles.categoryDiv} key={index}
                            style={{ backgroundImage: `url(${category.bgImage})`, border: selectedFilter === category.title ? '5px solid #00ACD2' : 'none' }}
                            onClick={() => setSelectedFilter(category.title)}>
                            <p>{category.title}</p>
                        </div>
                    })}
                </div>

                <div className={styles.storyContainer}>
                    {selectedFilter === 'All' && <div className={styles.categoryStoryDiv}>
                        <h4>Your Stories</h4>
                        {storiesByUser.length > 0 && <div className={styles.storiesGrid}>
                            {storiesByUser.slice(0, 4).map((story, idx) => {
                                return <StoryCard key={idx} story={story} isEditable={true} />
                            })}
                        </div>}
                        {storiesByUser.length > 0 && <button onClick={()=>{navigate('/userstories')}}>See more</button>}
                        {storiesByUser.length == 0 && <span>No stories Available</span>}
                    </div>}
                    {selectedFilter === 'All' && categories.map((category, index) => {
                        if (index > 0) {
                            // getStoriesByCategory(category.title)
                            return <div key={index} className={styles.categoryStoryDiv}>
                                <h4>{`Top Stories About ${category.title}`}</h4>
                                {storiesByCategory[category.title]?.length > 0 && <div className={styles.storiesGrid}>
                                    {storiesByCategory[category.title].slice(0, 4).map((story, idx) => {
                                        return <StoryCard key={idx} story={story} />
                                    })}
                                </div>}
                                {storiesByCategory[category.title]?.length > 0 && <button onClick={()=> setSelectedFilter(category.title)} >See more</button>}
                                {storiesByCategory[category.title]?.length == 0 && <span>No stories Available</span>}
                            </div>
                        }
                    })}
                    {selectedFilter !== 'All' && <div className={styles.categoryStoryDiv}>
                        <h4>{`Top Stories About ${selectedFilter}`}</h4>
                        {storiesByCategory[selectedFilter]?.length > 0 && <div className={styles.storiesGrid}>
                            {storiesByCategory[selectedFilter].map((story, idx) => {
                                return <StoryCard key={idx} story={story} />
                            })}
                        </div>}
                        {storiesByCategory[selectedFilter]?.length == 0 && <span>No stories Available</span>}
                    </div>}
                </div>

                {userCard && <div className={styles.userCard}>
                    <p>{userDetails}</p>
                    <button onClick={logout}>Logout</button>
                </div>}

            </div>
            {authCardType && <AuthCard authCardType={authCardType} setAuthCardType={setAuthCardType} fetchUser={fetchUser} />}
        </>
    )
}

function StoryCard({ story, isEditable = false }) {
    return (
        <div className={styles.storyCard}>
            <img src={story.slides[0].url} alt="Story" />
            <h2>{story.slides[0].heading}</h2>
            <p>{story.slides[0].desc}</p>
            {isEditable && <div className={styles.updationIcon}>
            <img src={editIcon} alt="Edit" />
            <p>Edit</p>
          </div> }
        </div>
    )
}

export default HomePage
