import React, { useState } from 'react'
import styles from './AddStoryPrompt.module.css'
import closeIcon from '../../assets/image/closeIcon.jpg'
import { categories } from '../../assets/data/category'
import { createStory } from '../../api/Story'

function AddStoryPrompt({closePrompt}) {
  const [slidesDetails , setSlidesDetals] = useState([{heading:'' , desc:'' , url:''} , {heading:'' , desc:'' , url:''} , {heading:'' , desc:'' , url:''}])
  const [selectedSlides , setSelectedSlide] = useState(0)
  const [storyCategory , setStoryCategory] = useState()
  const handleSubmit = async() =>{
    console.log('submit')
    try {
      const response = await createStory(slidesDetails , storyCategory)
      if(response.status === 201){
        console.log(response.data)
        closePrompt()
      }
    } catch (error) {
      console.log(error)
    }
  }
  const addSlides = () =>{
    setSlidesDetals([...slidesDetails , {heading:'' , desc:'' , url:''}])
  }
  return (
    <>
      <div className={styles.wrapper}></div>

      <div className={styles.page} style={{ minHeight: '250px' }}
        onClick={(eve) => {
          eve.stopPropagation()
        }}>
        <div className={styles.closeButton} onClick={closePrompt}>
          <img src={closeIcon} alt="" />
        </div>
        <p className={styles.toastmsg}>Add upto 6 slides</p>

        <div className={styles.slides}>
          {slidesDetails.map((slide , idx) =>{
            return <div key={idx} style={{border: selectedSlides === idx ? '2px solid #73ABFF' : 'none'}} 
            onClick={()=> setSelectedSlide(idx)}>
              <p>{`Slide ${idx+1}`}</p>
              {idx > 2 && <img className={styles.closeSlides} src={closeIcon} alt="X" /> }
            </div>
          })}
          {slidesDetails.length < 6 && <div onClick={addSlides}>
            <p>Add +</p>
          </div> }
        </div>

        <div className={styles.slidesDetailsForm}>
          <div className={styles.inputBox}>
            <p>Heading :</p>
            <input
              type="text"
              placeholder='Your Heading'
              value={slidesDetails[selectedSlides].heading}
              onChange={(e) => setSlidesDetals([...slidesDetails.slice(0, selectedSlides), { ...slidesDetails[selectedSlides], heading: e.target.value }, ...slidesDetails.slice(selectedSlides + 1)])} />

          </div>
          <div className={styles.inputBox}>
            <p>Description :</p>
            <textarea
              value={slidesDetails[selectedSlides].desc}
              placeholder='Story Description'
              onChange={(e) => setSlidesDetals([...slidesDetails.slice(0, selectedSlides), { ...slidesDetails[selectedSlides], desc: e.target.value }, ...slidesDetails.slice(selectedSlides + 1)]) }
            />
          </div>
          <div className={styles.inputBox}>
            <p>Url :</p>
            <input
              type="text"
              placeholder='Your Heading'
              value={slidesDetails[selectedSlides].url}
              onChange={(e) => setSlidesDetals([...slidesDetails.slice(0, selectedSlides), { ...slidesDetails[selectedSlides], url: e.target.value }, ...slidesDetails.slice(selectedSlides + 1)])} />

          </div>
          <div className={styles.inputBox}>
            <p>Category</p>
            <select name="category" value={storyCategory} onChange={(e)=>setStoryCategory(e.target.value)} >
              {/* <option value="">None</option> */}
              {categories.map((category, index) =>{
                if(index>0){
                  return <option value={category.title}>{category.title}</option>
                }
              })}
            </select>
          </div>



        </div>

        <div className={styles.actionButtons}>
          <div>
          <button  onClick={()=> setSelectedSlide((prev)=>prev>0 ? prev-1 : prev)} style={{background:'#7EFF73'}} >Previous</button>
          <button  onClick={()=> setSelectedSlide((prev)=>prev<slidesDetails.length - 1 ? prev+1 : prev)} style={{background:'#73ABFF'}} >Next</button>
          </div>
          <button  onClick={handleSubmit} style={{background:'#FF7373'}} >Post</button>
        </div>

      </div>
    </>
  )
}

export default AddStoryPrompt
