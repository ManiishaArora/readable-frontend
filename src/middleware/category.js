import axios from 'axios'
import {setAllCategories} from '../actions/index'

axios.defaults.headers.common['Authorization'] = 'whatever-you-want' ;
axios.defaults.baseURL = 'http://localhost:3001'

export const fetchAllCategories = async dispatch => {
    
    const response = await axios("/categories") 
    const data = response.data;
    const categories = data.categories ? data.categories:[]
    return dispatch(setAllCategories(categories))
}