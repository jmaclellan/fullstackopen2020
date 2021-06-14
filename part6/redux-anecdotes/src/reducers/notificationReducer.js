const notificationReducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.content
    case 'DELETE_NOTIFICATION':
      return ''
    default:
      return state
  }
}

export const createNotification = (content, time) => {
  return async dispatch => {
    dispatch({
      type: 'SET_NOTIFICATION',
      data: content
    })
    setTimeout(() => {
      dispatch({
        type: 'DELETE_NOTIFICATION',
      })
    }, time * 1000)
  }
}

export default notificationReducer