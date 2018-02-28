import React from 'react'
import Blog from './components/Blog'
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
      error: null
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

  handleBlogTitleChange = (event) => {
    this.setState({ title: event.target.value })
  }

  handleBlogAuthorChange = (event) => {
    this.setState({ author: event.target.value })
  }

  handleBlogUrlChange = (event) => {
    this.setState({ url: event.target.value })
  }

  handleBlogLikesChange = (event) => {
    this.setState({ likes: event.target.value })
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
          <Blog key={blog._id} blog={blog}/>
        )}
      </div>
    )
    const blogForm = () => (
      <div>
        <h2>Lisaa uusi blogi</h2> 
        <form onSubmit = {this.addBlog}>
          <div>
          Blog Title
           <input 
           name = "title"
           value = {this.state.title}
           onChange = {this.handleBlogTitleChange}
           />
          </div>
          <div>
            Author 
            <input
              name = "author"
              value = {this.state.author}
              onChange = {this.handleBlogAuthorChange}
            />
          </div>
          <div>
            URL 
            <input
              name = "url"
              value = {this.state.url}
              onChange = {this.handleBlogUrlChange}
            />
          </div>
          <div>
            Likes 
            <input
              name = "likes"
              value = {this.state.likes}
              onChange = {this.handleBlogLikesChange}
            />
          </div>
          <button type='submit'>Tallenna</button>
        </form>
      </div>
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
