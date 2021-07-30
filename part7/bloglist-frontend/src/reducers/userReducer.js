const reducer = (state = null, action) => {
  if (action.type === 'LOGIN') {
    return action.payload
  }
  if (action.type === 'LOGOUT') return null
  return state
}

export const login = user => (
  {
    type: 'LOGIN',
    payload: user
  }
)

export const logout = () => { type: 'LOGOUT' }

export default userReducer