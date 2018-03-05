import {
    GET_ALL_CATEGORIES,
    GET_ALL_POSTS,
    SORT_POSTS,
    VOTE_POSTS
} from '../actions'
import { combineReducers } from 'redux';

const initialCategoryState = {
    categories:[]
}
const initialPostListState = {
    posts:[]
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
    switch(type){
    case GET_ALL_POSTS:
        return {
            ...state,
            posts
        }
    case SORT_POSTS:
        const sortArray = {'posts': order==='DESC'?
                            posts.slice().sort((post1,post2)=>post2[key]-post1[key]):
                            posts.slice().sort((post1,post2)=>post1[key]-post2[key])}
        return Object.assign({}, state, sortArray)    
    case VOTE_POSTS:
        const postsArray = {'posts':state.posts.slice().map(post=>
                                    post.id===posts[0].id?
                                    posts[0]:
                                    post
                            )
                        }
        return Object.assign({}, state, postsArray)
    default:
        return state;
    }
}

export default combineReducers({
    home,
    postList
});