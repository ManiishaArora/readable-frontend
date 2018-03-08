export const GET_ALL_CATEGORIES = 'GET_ALL_CATEGORIES';
export const LOAD_ALL_POSTS = 'LOAD_ALL_POSTS';
export const SORT_POSTS = 'SORT_POSTS'
export const VOTE_POSTS = 'VOTE_POSTS'
export const GET_POST_BY_ID = 'GET_POST_BY_ID'
export const GET_COMMENTS_BY_POST_ID='GET_COMMENTS_BY_POST_ID'
export const GET_COMMENT_DETAILS_BY_COMMENT_ID='GET_COMMENT_DETAILS_BY_COMMENT_ID'
export const ADD_COMMENT_FOR_POST='ADD_COMMENT_FOR_POST'
export const VOTE_COMMENTS = 'VOTE_COMMENTS'
export const EDIT_COMMENTS = 'EDIT_COMMENTS'
export const DELETE_POST = 'DELETE_POST'
export const DELETE_COMMENT = 'DELETE_COMMENT'
export const ADD_POST='ADD_POST'
export const EDIT_POST='EDIT_POST'

export const addPosts =(posts) => ({
    type:ADD_POST,
    posts
})

export const editPosts =(posts) => ({
    type:EDIT_POST,
    posts
})

export const getCommentDetailsByCommentId = (comments) => ({
    type:GET_COMMENT_DETAILS_BY_COMMENT_ID,
    comments
})

export const voteComments = (comments) => ({
    type:VOTE_COMMENTS,
    comments
})

export const editComments = (comments) => ({
    type:EDIT_COMMENTS,
    comments
})

export const addCommentForPost = (comments) => ({
    type:ADD_COMMENT_FOR_POST,
    comments
})
export const deleteComment = (comments) => ({
    type:DELETE_COMMENT,
    comments
})
export const deletePost = (posts) => ({
    type:DELETE_POST,
    posts
})
export const setPostByID = (posts) => ({
    type:GET_POST_BY_ID,
    posts
})

export const setAllCategories = (categories) => ({
    type:GET_ALL_CATEGORIES,
    categories
});

export const setAllPosts = (posts) => ({
    type:LOAD_ALL_POSTS,
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

export const getAllCommentsByID = (comments) => ({
    type:GET_COMMENTS_BY_POST_ID,
    comments
})
