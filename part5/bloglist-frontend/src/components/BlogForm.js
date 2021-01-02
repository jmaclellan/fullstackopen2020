import React, {useState} from 'react'

const BlogForm = ({createBlog}) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [likes, setLikes] = useState('')

  const handleAddBlog = e => {
    e.preventDefault()
    createBlog({
        author,
        title,
        url,
        likes,
    })
    // reset form state
    setTitle('')
    setAuthor('')
    setUrl('')
    setLikes('')
  }

  return (
    <>
      <h2>Create a new blog</h2>

      <form onSubmit={handleAddBlog}>
         <div>
             title:
           <input
            id="title"
            type="text"
            value={title}
            name="title"
            onChange={({ target }) => setTitle(target.value)}
           />
        </div>
         <div>
             author:
           <input
            id="author"
            type="text"
            value={author}
            name="author"
            onChange={({ target }) => setAuthor(target.value)}
           />
        </div>
         <div>
             url:
           <input
            id="url"
            type="text"
            value={url}
            name="url"
            onChange={({ target }) => setUrl(target.value)}
           />
        </div>
         <div>
             likes:
           <input
            id="likes"
            type="text"
            value={likes}
            name="likes"
            onChange={({ target }) => setLikes(target.value)}
           />
        </div>
      <button type="submit">save</button>
      </form>
    </>
  )
}

export default BlogForm