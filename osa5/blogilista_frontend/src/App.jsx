import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)
  const [newBlog, setNewBlog] = useState({title: '', author: '', url: ''})

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      ) 
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      window.alert('Invalid username or password')
    }}

  const handleLogout = async (event) => {
    event.preventDefault()
    try {
      window.localStorage.clear()
      blogService.setToken(null)
      setUser(null)
    } catch (exception) {
      console.log(exception)
      window.alert('Something went wrong')
    }
  }

  const addNewBlog = async (event) => {
    event.preventDefault()
    try {
      const blog = await blogService.create(newBlog)
      setBlogs(blogs.concat(blog))
      setNewBlog({title: '', author: '', url: ''})
    } catch (exception) {
      window.alert('Something went wrong')
    }
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <form onSubmit={handleLogin}>
        <div>
          <label>Username: </label>
            <input type="text" value={username} name="Username" onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          <label>Password: </label>
            <input type="password" value={password} name="Password" onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
      </div>
    )
  }

  return (
    <div>
      <h2>Blogs</h2>
      <p>{user.name} logged in <button onClick={handleLogout}>Logout</button> </p>
      <h3>Create new</h3>
      <form onSubmit={addNewBlog}>
        <div>
          <label>Title: </label>
          <input type="text" value={newBlog.title} name="Title" onChange={({target}) => setNewBlog(prevState => ({...prevState, title: target.value}))}/>
        </div>
        <div>
          <label>Author: </label>
          <input type="text" value={newBlog.author} name="Author" onChange={({target}) => setNewBlog(prevState => ({...prevState, author: target.value}))}/>
        </div>
        <div>
          <label>Url: </label>
          <input type="url" value={newBlog.url} name="Url" onChange={({target}) => setNewBlog(prevState => ({...prevState, url: target.value}))}/>
        </div>
        <button type="submit">Create</button>
      </form>
      <div>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
    </div>
  )
}

export default App