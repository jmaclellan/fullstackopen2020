import React, {useState} from 'react'

const BlogForm = ({createBlog}) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleAddBlog = e => {
    e.preventDefault()
    createBlog({
        author,
        title,
        url,
    })
    // reset form state
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <>
      <h2>Create new</h2>

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
      <button id="create">create</button>
      </form>
    </>
  )
}

export default BlogForm