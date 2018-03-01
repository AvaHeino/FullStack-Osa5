import React from 'react'

/*const Blog = ({blog}) => (
  <div>
    {blog.title} {blog.author}
  </div>  
)*/

class Blog extends React.Component {
	constructor (props) {
		super(props)
		this.state = {
			showAll: false
		}
	}

	toggleVisibility = () => {
		console.log('click')
		this.setState({showAll : !this.state.showAll })
	}

	render() {
		const hideWhenVisible = { display: this.state.showAll ? 'none': '',
									paddingTop: 10,
      								paddingLeft: 2,
      								border: 'solid',
      								borderWidth: 1,
     								 marginBottom: 5
								}
		const showWhenVisible = { display: this.state.showAll ? '' : 'none',
									paddingTop: 10,
      								paddingLeft: 2,
      								border: 'solid',
      								borderWidth: 1,
     								 marginBottom: 5
									}


		return (
			<div>
				<div style = {hideWhenVisible}>
					<h3 onClick ={this.toggleVisibility}>{this.props.title} {this.props.author}</h3>
				</div>
				<div style = {showWhenVisible}>
					<h3 onClick ={this.toggleVisibility}>{this.props.title} {this.props.author}</h3>
					<a href="{this.props.url}">{this.props.url}</a>
					<p>{this.props.likes} likes </p> 
					<button>like</button>
					<p>Added by {this.props.user} </p>
				</div>
			</div>
			)
	}

}

export default Blog