const reducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.content
    case 'CLEAR_NOTIFICATION':
      return null
    default:
      return state
  }
}

let timeoutId

export const setNotification = (content, type = 'success') => {
  return async dispatch => {
    dispatch({
      type: 'SET_NOTIFICATION',
      payload: {
        message,
        type
      }
    })

    if (timeoutId) {
      clearTimeout(timeoutId)
    }

    timeoutId = setTimeout(() => {
      dispatch({
        type: 'CLEAR_NOTIFICATION'
      })
    }, 5000)
  }
}

export const clearNotification = (id) => (
  { type: 'CLEAR_NOTIFICATION' }
)

export default reducer