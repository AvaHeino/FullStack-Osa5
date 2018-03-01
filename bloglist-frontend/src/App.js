import React from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      title: '',
      author: '',
      url: '',
      likes: 0,
      username: '',
      password: '',
      user: null,
      error: null,
      blogformVisible: false
    }
  }

  componentDidMount() {
    blogService.getAll().then(blogs =>
      this.setState({ blogs })
    )

    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      this.setState({user})
      blogService.setToken(user.token)
    }
  } 

  login = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password
      })

      blogService.setToken(user.token)
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      
      this.setState({ username: '', password: '', user, error: 'User succesfully logged in'})
      setTimeout(()=> {
        this.setState({ error: null})
      }, 5000)
      
    } catch (exception){
      this.setState({
        error: 'Kayttajatunnus tai salasana virheellinen',
      })
      setTimeout(() => {
        this.setState({ error: null })
      }, 5000)
    }
    
  }

 addBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      title: this.state.title,
      author: this.state.author,
      url: this.state.url,
      likes: this.state.likes

    } 
    blogService
      .create(blogObject)
      .then(newBlog => {
        this.setState({
          blogs: this.state.blogs.concat(newBlog),
          title: '',
          author: '',
          url: '',
          likes: '',
          error: 'Blog succesfully added!'
        })
        setTimeout(() => {
        this.setState({ error: null })
      }, 5000)

      }) 
  }

  handleBlogChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleLoginFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  logout = (event) => {
    window.localStorage.removeItem('loggedBlogappUser')
    blogService.setToken(null)
    this.setState({ user: null })
  }

  render() {
    const loginForm = () => (
    <div>
      <h2>Kirjaudu</h2>
      <form onSubmit = {this.login}>
        <div>
          Kayttajatunnus
          <input 
            type="text"
            name="username"
            value={this.state.username}
            onChange={this.handleLoginFieldChange}
          />
        </div>
        <div>
          Salasana
          <input
            type="password"
            name="password"
            value={this.state.password}
            onChange={this.handleLoginFieldChange}
          />
        </div>
        <button type="submit">kirjaudu</button>
      </form>
    </div>
    )
    const blogList = () => (
      <div>
        <p>{this.state.user.name}</p>
        <button onClick = {this.logout}>
        kirjaudu ulos
        </button>
        <h2>blogs</h2>
        {this.state.blogs.map(blog => 
          <Blog key={blog._id} title={blog.title} author={blog.author} url={blog.url} likes={blog.likes} user={blog.user.name}/>
        )}
      </div>
    )

    const blogForm = () => (
      <Togglable buttonLabel='Lisaa blogi'>
        <BlogForm
          visible = {this.state.blogformVisible}
          title = {this.state.title}
          author = {this.state.author}
          url = {this.state.url}
          likes = {this.state.likes}
          handleChange = {this.handleBlogChange}
          handleSubmit = {this.addBlog}
        />
      </Togglable>
    )
    
    return (
      <div>
      <p>{this.state.error}</p>
        {this.state.user === null ?
          loginForm() :
          <div>
            {blogList()}
            {blogForm()}
          </div>
           }
      </div>
    );
  }
}


export default App;
