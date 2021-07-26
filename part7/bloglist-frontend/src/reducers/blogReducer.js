import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {
  switch(action.type) {
    case 'INIT':
      return action.data
    case 'ADD_BLOG':
      return [...state, action.data]
    case 'DELETE_BLOG':
      return state.filter(blog => blog.id !== action.id)
    case 'LIKE_BLOG':
      const liked = action.data
      return state.map(blog => blog.id === liked.id ? {...blog, likes: liked.likes}  : blog)
    case 'COMMENT':
      // to do
      return state
    default:
      return state
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const data = await blogService.getAll()
    dispatch({
      type: 'INIT',
      data
    })
  }
}

export const addBlog = (content) => {
  return async dispatch => {
    const data = await blogService.create(content)
    dispatch({
      type: 'ADD_BLOG',
      data
    })
  }
}

export const likeBlog = (anecdote) => {
  return async dispatch => {
    await blogService.update({id, likes})
    dispatch({
      type: 'LIKE_BLOG',
      data : {
        id,
        likes
      }
    })
  }
}

export const deleteBlog = id => {
  return async dispatch => {
    await blogService.remove({ id })
    dispatch({
      type: 'DELETE_BLOG',
      data: {
        id
      }
    })
  }
}

export default blogReducer

// import anecdoteService from '../services/anecdotes'

// const byVotes = (a1, a2) => a2.votes - a1.votes

// const reducer = (state = [], action) => {
//   switch (action.type) {
//     case 'INIT':
//       return action.data.sort(byVotes)
//     case 'VOTE':
//       const voted = action.data
//       return state.map(a => a.id===voted.id ? voted : a).sort(byVotes)
//     case 'CREATE':
//       return [...state, action.data]
//     default:
//       return state
//   }
// }

// export const createAnecdote = (content) => {
//   return async dispatch => {
//     const data = await anecdoteService.createNew(content)
//     dispatch({
//       type: 'CREATE',
//       data
//     })
//   }
// }

// export const initializeAnecdotes = () => {
//   return async dispatch => {
//     const data = await anecdoteService.getAll()
//     dispatch({
//       type: 'INIT',
//       data
//     })
//   }
// }

// export const voteAnecdote = (anecdote) => {
//   return async dispatch => {
//     const toVote = {...anecdote, votes: anecdote.votes + 1 }
//     const data = await anecdoteService.update(toVote)
//     dispatch({
//       type: 'VOTE',
//       data
//     })
//   }
// }

// export default reducer