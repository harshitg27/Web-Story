import React, { useEffect, useState } from 'react'
import styles from './UserStories.module.css'
import { useNavigate } from 'react-router-dom'
import { getStoriesByUser } from '../../api/Story'
import editIcon from '../../assets/image/editIcon.png'

function UserStoriesPage() {
  const navigate = useNavigate()
  const [stories, setStories] = useState([])
  useEffect(() => {
    if (localStorage.userToken) {
      getStories()
    } else {
      navigate('/')
    }
  }, [])
  const getStories = async () => {
    try {
      const response = await getStoriesByUser()
      if (response.status === 200) {
        setStories(response.data.stories)
      }else if(response.status === 401){
        navigate('/')
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className={styles.categoryStoryDiv}>
      <h4>Your Stories</h4>
      {stories.length > 0 && <div className={styles.storiesGrid}>
        {stories.slice(0, 4).map((story, idx) => {
          return <StoryCard key={idx} story={story} isEditable={true} />
        })}
      </div>}
      {stories.length == 0 && <span>No stories Available</span>}
    </div>
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

export default UserStoriesPage
