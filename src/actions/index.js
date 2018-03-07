export const GET_ALL_CATEGORIES = 'GET_ALL_CATEGORIES';
export const LOAD_ALL_POSTS = 'LOAD_ALL_POSTS';
export const SORT_POSTS = 'SORT_POSTS'
export const VOTE_POSTS = 'VOTE_POSTS'

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

