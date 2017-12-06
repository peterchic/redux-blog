import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchPost} from '../actions'

function mapStateToProps({posts}, ownProps) { //destructuring grabbing just the big list of posts
  //ownProps = props object going to current componenet(PostsShow) this.props === ownProps
  return { post: posts[ownProps.match.params.id]}
}

class PostsShow extends Component {
  componentDidMount() {
    const { id } = this.props.match.params.id
    this.props.fetchPost(id)
  }

  render() {
    return (
      <div>
        Posts Show!
      </div>
    )
  }
}

export default connect(mapStateToProps, { fetchPost }(PostsShow)
