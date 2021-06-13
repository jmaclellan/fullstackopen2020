import { createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import reducer from './reducers/anecdoteReducer'

// const store = createStore(reducer, composeWithDevTools)
const store = createStore(reducer)

export default store