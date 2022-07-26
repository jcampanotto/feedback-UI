import Card from './shared/Card'
import {useState, useContext, useEffect} from 'react'
import Button from './shared/Button'
import RatingSelect from './RatingSelect'
import FeedbackContext from '../context/FeedbackContext'


function FeedbackForm() {
  const [text, setText] = useState('')
  const [rating, setRating] = useState(10)
  const [btnDisabled, setBtnDisabled] = useState(true)
  const [message, setMessage] = useState(true)
  const {addItem, feedbackEdit, setFeedbackEdit, updateItem} = useContext(FeedbackContext)

  useEffect(() => {
    if (feedbackEdit.edit) {
      setText(feedbackEdit.item.text)
      setRating(feedbackEdit.item.rating)
      setBtnDisabled(false)
    }
  }, [feedbackEdit])

  const handleTextChange = (e) => {
    if (e.target.value.length >= 10) {
        setBtnDisabled(false)
        setMessage(false);
    } else {
        setBtnDisabled(true)
        setMessage(true);
    }
    setText(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if(text.trim().length > 10) {
        const newFeedBack = {
            text,
            rating
        }
        if(feedbackEdit.edit) {
          updateItem(feedbackEdit.item.id, newFeedBack)
        } else {
          addItem(newFeedBack);
        }
    }
    setText('')
  }

  return (
    <Card>
        <form onSubmit={handleSubmit}>
            <h2>How would you rate our service?</h2>
            <RatingSelect select={setRating} selected={rating}/>
            <div className="input-group">
                <input onChange={handleTextChange} type="text" placeholder="Write a review" value={text} />
                <Button type="submit" isDisabled={btnDisabled}>
                    Send
                </Button>
            </div>
            {message && <div className='message'>Enter at least 10 characters.</div>}
        </form>
    </Card>
  )
}

export default FeedbackForm