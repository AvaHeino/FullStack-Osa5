import React from 'react'

const BlogForm = ({handleSubmit, handleChange, title, author, url, likes }) => {

   return(
      <div>
        <h2>Lisaa uusi blogi</h2> 
        <form onSubmit = {handleSubmit}>
          <div>
          Blog Title
           <input 
           name = "title"
           value = {title}
           onChange = {handleChange}
           />
          </div>
          <div>
            Author 
            <input
              name = "author"
              value = {author}
              onChange = {handleChange}
            />
          </div>
          <div>
            URL 
            <input
              name = "url"
              value = {url}
              onChange = {handleChange}
            />
          </div>
          <div>
            Likes 
            <input
              name = "likes"
              value = {likes}
              onChange = {handleChange}
            />
          </div>
          <button type='submit'>Tallenna</button>
        </form>
      </div>
      )
}

export default BlogForm;