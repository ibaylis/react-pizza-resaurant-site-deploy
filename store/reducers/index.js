import { combineReducers } from 'redux'
import user from './user_reducer'
import msg from './msg_reducer'

const rootReducer = combineReducers({
    user,
    msg
})

export default rootReducer