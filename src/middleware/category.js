import {apiToken} from '../util/helper.js'
import axios from 'axios'
import {setAllCategories} from '../actions/index'

export const fetchAllCategories = async dispatch => {
    const response = await axios("http://localhost:3001/categories",apiToken) 
    const data = response.data;
    const categories = data.categories ? data.categories:[]
    return dispatch(setAllCategories(categories))
}