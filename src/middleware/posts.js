import {apiToken} from '../util/helper.js'
import axios from 'axios'
import {setAllPosts,votePosts} from '../actions/index'

export const updatePostVote = async (dispatch,id,option) => {
    const options = {
        method: 'post',
        headers: { 'Authorization': 'whatever-you-want','Content-type':'application/json','Accept':'application/json' },
        data: JSON.stringify({option})
    }
    const response = await axios( `http://localhost:3001/posts/${id}`,options) 
    const data = response.data;
    const posts=[data]
    return dispatch(votePosts(posts))
}


export const fetchAllPosts = async dispatch => {
    const response = await axios("http://localhost:3001/posts",apiToken)
    const data = response.data;
    return dispatch(setAllPosts(data))
}