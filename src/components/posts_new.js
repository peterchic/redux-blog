import React, { Component} from 'react'
import { Field, reduxForm } from 'redux-form'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { createPost } from  '../actions'
//reduxForm form is similar to connect. Allowing this componenet to talk directly to redux store


class PostsNew extends Component {
  renderField(field){ //field containes all event handlers
    const { meta: { touched, error } } = field
    const className = `form-group ${touched  && error ? 'has-danger' : ''}`

    return (
      <div className={className}>
        <label>{field.label}</label>
        <input
          className="form-control"
          type="text"
          {...field.input}
          //▼ ▼ ▼ ▼ Spread operator does all of this ▼ ▼ ▼ ▼
          // onChange={field.input.onChange}
          // onFocus={field.input.onFocus}
          // onBlue={field.input.onBlur}
        />
        <div className="text-help">
          {touched ? error : ''}
        </div>
      </div>
    )
  }

  onSubmit(values) {
    this.props.createPost(values, () => {
      this.props.history.push('/')
    })
  }

  render() {
    const { handleSubmit } = this.props

    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <Field
          label="Title"
          name="title"
          component={this.renderField}
        />
        <Field
          label="Categories"
          name="categories"
          component={this.renderField}
        />
        <Field
          label="Post Content"
          name="content"
          component={this.renderField}
        />
        <button type="submit" className="btn btn-primary"> Submit</button>
        <Link className="btn btn-danger" to="/">Cancel</Link>
      </form>
    )
  }
}

function validate(values){
  //console.log(values) => { title: 'test', categories: 'test', content: 'test'}
  const errors = {}
  //Validate the inputes form 'values'
  if(!values.title) {
    errors.title = "Enter a title!"
  }

  if(!values.categories) {
    errors.categories = 'Enter some categories!'
  }

  if(!values.content) {
    errors.content = "Enter some content please!"
  }

  //if errors is empty, the form is fine to submit
  //if errors has *any* properties, redux form assumes form is invalid
  return errors
}

export default reduxForm({
  validate, // validate: 'validate'
  form: 'PostsNewForm'
  //form: => Name of the form. Can handle multiple forms. needs to be unique
})(
  connect(null, { createPost })(PostsNew)
)
