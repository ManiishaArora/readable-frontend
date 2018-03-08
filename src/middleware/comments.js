import axios from 'axios'
import {getAllCommentsByID,addCommentForPost,voteComments,editComments,getCommentDetailsByCommentId,deleteComment} from '../actions/index'
import uuid from 'uuid/v1'

axios.defaults.headers.common['Authorization'] = 'whatever-you-want' ;
axios.defaults.baseURL = 'http://localhost:3001'

export const fetchCommentsByPostID = async (dispatch,id) => {
    const response = await axios(`/posts/${id}/comments`)
    const data = response.data;
    return dispatch(getAllCommentsByID(data))
}

export const addCommentsToPost = async (dispatch,comment) => {
    const options = {
        method: 'post',
        headers: {'Content-type':'application/json','Accept':'application/json' },
        data: JSON.stringify({id:uuid(),timestamp:new Date().getTime(),body:comment.body,author:comment.author,parentId:comment.parentId})
    }
    
    const response = await axios('/comments',options)
    const data = response.data;
    const comments = [data]
    return dispatch(addCommentForPost(comments))
}

export const fetchCommentDetailByCommentID = async(dispatch,id) => {
    let comments = []
    try{
        const response = await axios(`/comments/${id}`)
        const data = response.data;
        if(Object.keys(data).length === 0)
            throw new Error("No Comments Exist")
        comments = [data]
    }catch(e){
        throw(e)
    }
    
    return dispatch(getCommentDetailsByCommentId(comments))
}
export const editComment = async (dispatch,comment) => {
   const options = {
        method: 'put',
        headers: { 'Content-type':'application/json','Accept':'application/json' },
        data: JSON.stringify({timestamp:new Date().getTime(),body:comment.body })
    }
    const response = await axios( `/comments/${comment.id}`,options) 
    const data = response.data;
    const comments=[data]
    return dispatch(editComments(comments))
}
export const updateCommentVote = async (dispatch,id,option) => {
    const options = {
        method: 'post',
        headers: { 'Content-type':'application/json','Accept':'application/json' },
        data: JSON.stringify({option})
    }
    const response = await axios( `/comments/${id}`,options) 
    const data = response.data;
    const comments=[data]
    return dispatch(voteComments(comments))
}
export const deleteCommentById = async (dispatch,id) => {
    const options = {
        method: 'DELETE',
        headers: { 'Content-type':'application/json','Accept':'application/json' },
    }
    const response = await axios( `/comments/${id}`,options) 
    const data = response.data;
    const comments=[data]
    return dispatch(deleteComment(comments))
}



