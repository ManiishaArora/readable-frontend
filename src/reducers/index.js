import {
    GET_ALL_CATEGORIES,
    LOAD_ALL_POSTS,
    SORT_POSTS,
    VOTE_POSTS,
    GET_POST_BY_ID,
    GET_COMMENTS_BY_POST_ID,
    ADD_COMMENT_FOR_POST,
    VOTE_COMMENTS,
    EDIT_COMMENTS,
    DELETE_COMMENT,
    DELETE_POST,
    GET_COMMENT_DETAILS_BY_COMMENT_ID,
    ADD_POST,
    EDIT_POST
} from '../actions'
import { combineReducers } from 'redux';

const initialCategoryState = {
    categories:[]
}
const initialPostListState = {
    posts:[]
}
const initialCommentListState = {
    comments:[]
}
const home = (state=initialCategoryState,action) => {
    const {type,categories} = action;
    switch(type){
        case GET_ALL_CATEGORIES:
            return {
                ...state,
                categories
            }
        
        default:
            return state;
    }
}

const postList= (state=initialPostListState,action) => {
    const {type,posts,order,key} = action;
    let postsArray = []
    switch(type){
    case LOAD_ALL_POSTS:
    case GET_POST_BY_ID:
        return {
            ...state,
            posts
        }
    case SORT_POSTS:
        postsArray = {'posts': order==='DESC'?
                            posts.slice().sort((post1,post2)=>post2[key]-post1[key]):
                            posts.slice().sort((post1,post2)=>post1[key]-post2[key])}
        return Object.assign({}, state, postsArray)    
    case ADD_POST:
        return {
            ...state,
            posts:state.posts.slice().concat(posts[0])
        }
    case EDIT_POST:    
    case VOTE_POSTS:
        postsArray = {'posts':state.posts.slice().map(post=>
                                    post.id===posts[0].id?
                                    posts[0]:
                                    post
                            )
                        }
        return Object.assign({}, state, postsArray)
    case DELETE_POST:
        postsArray = {'posts':state.posts.slice().filter(post=>post.id!==posts[0].id)}
        return Object.assign({}, state, postsArray)
    default:
        return state;
    }
}

const comments = (state=initialCommentListState,action) => {
    const {type,comments} = action;
    let commentsArray = []
    switch(type){
    case GET_COMMENTS_BY_POST_ID:
    case GET_COMMENT_DETAILS_BY_COMMENT_ID:
        return {
            ...state,
            comments
        }
    case ADD_COMMENT_FOR_POST:
        return {
            ...state,
            comments:state.comments.slice().concat(comments[0])
        }
    case VOTE_COMMENTS:
    case EDIT_COMMENTS:
    commentsArray = {'comments':state.comments.slice().map(comment=>
                                comment.id===comments[0].id?
                                comments[0]:
                                comment
                        )
                    }
    return Object.assign({}, state, commentsArray)
    case DELETE_COMMENT:
    commentsArray = {'comments':state.comments.slice().filter(comment=>
                                comment.id!==comments[0].id
                        )
                    }
    return Object.assign({}, state, commentsArray)
   

    default:
        return state;
    }
}
export default combineReducers({
    home,
    postList,
    comments
});