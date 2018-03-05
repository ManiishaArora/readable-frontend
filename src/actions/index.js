import {apiToken} from '../util/helper.js'

export const GET_ALL_CATEGORIES = 'GET_ALL_CATEGORIES';
export const GET_ALL_POSTS = 'GET_ALL_POSTS';
export const SORT_POSTS = 'SORT_POSTS'
export const VOTE_POSTS = 'VOTE_POSTS'

export const setAllCategories = (categories) => ({
    type:GET_ALL_CATEGORIES,
    categories
});

export const setAllPosts = (posts) => ({
    type:GET_ALL_POSTS,
    posts
});

export const sortPosts = (posts,order,key) => ({
    type:SORT_POSTS,
    posts,
    order,
    key
})

export const votePosts = (posts) => ({
    type:VOTE_POSTS,
    posts
})

export const updatePostVote = (dispatch,id,option) => {
    const options = {
        method: 'post',
        headers: { 'Authorization': '12345','Content-type':'application/json','Accept':'application/json' },
        body: JSON.stringify({
          option
        }),
        
      }
    return fetch(
        `http://localhost:3001/posts/${id}`,options
        
      ).then(function(response) {
        return response.json();
      })
      .then(function(data) {
          const posts=[data]
          dispatch(votePosts(posts))
      })
    }
export const fetchAllCategories = dispatch => (
    fetch(
        "http://localhost:3001/categories",apiToken
      ).then(function(response) {
        return response.json();
      })
      .then(function(data) {
          const categories = data.categories ? data.categories:[]
          dispatch(setAllCategories(categories))
      })
)

export const fetchAllPosts = dispatch => (
    fetch(
        "http://localhost:3001/posts",apiToken
      ).then(function(response) {
        return response.json();
      })
      .then(function(data) {
            dispatch(setAllPosts(data))
      })
)