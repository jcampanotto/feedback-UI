import { createContext, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import FeedbackData from "../data/FeedbackData";

const FeedbackContext = createContext()

export const FeedBackProvider = ({children}) => {
    const [feedback, setFeedback] = useState(FeedbackData)
    const [feedbackEdit, setFeedbackEdit] = useState({
        item: {},
        edit: false,
    })

    function editFeedback(item) {
        setFeedbackEdit({
            item,
            edit: true
        })
    }

    function deleteItem(id) {
        setFeedback(feedback.filter( (item) => item.id !== id))
    }

    function addItem(newFeedback) {
        newFeedback.id = uuidv4();
        setFeedback([newFeedback, ...feedback])
    }

    function updateItem(id, updatedItem) {
        setFeedback(
            feedback.map((item) => (item.id === id ? {...item, ...updatedItem} : item))
        )
        setFeedbackEdit({
            item: {},
            edit: false
        })
    }

    return <FeedbackContext.Provider value={{feedback, feedbackEdit, deleteItem, addItem, editFeedback, setFeedbackEdit, updateItem}}>
        {children}
    </FeedbackContext.Provider>
}

export default FeedbackContext