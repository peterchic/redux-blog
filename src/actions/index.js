import axios from 'axios'

export const FETCH_POSTS = 'fetch_posts'
// export const FETCH_POST = 'fetch_post'
export const CREATE_POST = 'create_post'

const ROOT_URL = 'http://reduxblog.herokuapp.com/api/'
const API_KEY = '?key=pete123'

export function fetchPosts() {
  const request = axios.get(`${ROOT_URL}/posts${API_KEY}`)
  return {
    type: FETCH_POSTS,
    payload: request
  }
}

// export function fetchPost(post) {
//   const request = axios.get(`${ROOT_URL}/posts${API_KEY}`/${post})
//   return {
//     type: FETCH_POST,
//     payload: request
//   }
// }

export function createPost(values, callback) {
  const request = axios.post(`${ROOT_URL}/posts${API_KEY}`, values)
    .then(() => callback()
  )
  //1st arg is URL, 2nd is object/data being sent to that URL API

  return {
    type:CREATE_POST,
    paylad: request
  }
}
