import {apiToken} from '../util/helper.js'
import axios from 'axios'
import {setAllPosts,votePosts,setPostByID,deletePost,editPosts,addPosts} from '../actions/index'
import uuid from 'uuid/v1'

axios.defaults.headers.common['Authorization'] = 'whatever-you-want' ;
axios.defaults.baseURL = 'http://localhost:3001'

export const addPost = async (dispatch,post) => {
    const{title,body,author,category} = post
    const options = {
        method: 'post',
        headers: { 'Content-type':'application/json','Accept':'application/json' },
        data: JSON.stringify({id:uuid(),timestamp:new Date().getTime(), title,body,author,category})
    }
    
    const response = await axios('/posts',options)
    const data = response.data;
    const posts = [data]
    return dispatch(addPosts(posts))
}

export const editPost = async (dispatch,post) => {
    const options = {
        method: 'put',
        headers: { 'Content-type':'application/json','Accept':'application/json' },
        data: JSON.stringify({title:post.title,body:post.body})
    }
    const response = await axios(`/posts/${post.id}`,options)
    const data = response.data;
    const posts=[data]
    return dispatch(editPosts(posts))
 }

export const updatePostVote = async (dispatch,id,option) => {
    const options = {
        method: 'post',
        headers: { 'Content-type':'application/json','Accept':'application/json' },
        data: JSON.stringify({option})
    }
    const response = await axios( `/posts/${id}`,options) 
    const data = response.data;
    const posts=[data]
    return dispatch(votePosts(posts))
}


export const fetchPostByID = async (dispatch,id) => {
    let posts = []
    try{
        const response = await axios(`/posts/${id}`,apiToken)
        const data = response.data;
        posts=[data]
    }catch(e){
        console.error(`Error while calling Post API for id :${id}`,e)
        throw e
    }
    
    return dispatch(setPostByID(posts))
}

export const fetchAllPosts = async (dispatch,category=null) => {
    let url = ''
    if(category===null||category==='undefined'){
        url=url.concat('/posts')
    }else{
        url=url.concat(`/${category}/posts`)
    }
    const response = await axios(url)
    const data = response.data;
    return dispatch(setAllPosts(data))
}

export const deletePostById = async (dispatch,id) => {
    const options = {
        method: 'DELETE',
        headers: { 'Content-type':'application/json','Accept':'application/json' }
    }
    const response = await axios( `${id}`,options)
    const posts=[response.data]
    return dispatch(deletePost(posts))
}