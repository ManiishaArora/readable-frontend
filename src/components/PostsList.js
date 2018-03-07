import React, { Component } from 'react';
import {Table} from 'reactstrap'
import moment from 'moment'
import {connect} from 'react-redux'
import {sortPosts} from '../actions'
import {updatePostVote,fetchAllPosts} from '../middleware/posts'
import {Link} from 'react-router-dom'
import axios from 'axios'

class Post extends Component {
    async componentDidMount(){ //This is to support fresh load of page - with or without category on path (which is available to this component as prop)
        await this.props.loadAllPosts(this.props.selectedCategory);
    }
    async componentWillReceiveProps(newProps) { //This is to support navigation from the link on Home Page
        if(newProps.selectedCategory !== this.props.selectedCategory)
            await this.props.loadAllPosts(newProps.selectedCategory);
      }
    deletePost = async id => {
        const options = {
            method: 'DELETE',
            headers: { 'Authorization': 'whatever-you-want','Content-type':'application/json','Accept':'application/json' },
            data: JSON.stringify({id})
        }
        const url = `http://localhost:3001/posts/${id}`
        const response = await axios( url,options) 
        if(response.status===200 || response.status ==='200') 
            this.props.loadAllPosts();
    }
    render() {
        return (
            <Table>
                <thead>
                    <tr>
                      
                    <th>Title </th>
                    <th>Author </th>
                    <th>Comments </th>
                    <th>
                        <table className="no-border p-0 m-0">
                            <tbody>
                                <tr>
                                    <td className="p-0 m-0">Score</td>
                                </tr>
                                <tr>
                                    <td className="p-0 m-0"> 
                                        <i className="fa fa-chevron-down ml-2 clickable" onClick={()=>{this.props.sortAllPosts(this.props.posts,'DESC','voteScore')}}/>
                                        <i className="fa fa-chevron-up ml-2 clickable" onClick={()=>{this.props.sortAllPosts(this.props.posts,'ASC','voteScore')}} />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    
                    </th>
                    <th>Vote</th>
                    <th>
                        <table className="no-border p-0 m-0">
                            <tbody>
                                <tr>
                                    <td className="p-0 m-0">Created</td>
                                </tr>
                                <tr>
                                    <td className="p-0 m-0"> 
                                        <i className="fa fa-chevron-down ml-2 clickable" onClick={()=>{this.props.sortAllPosts(this.props.posts,'DESC','timestamp')}}/>
                                        <i className="fa fa-chevron-up ml-2 clickable" onClick={()=>{this.props.sortAllPosts(this.props.posts,'ASC','timestamp')}} />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </th>
                    <th> Edit </th>
                    <th> Delete </th>
                    </tr>
                </thead>
                <tbody>

                {this.props.posts && this.props.posts.length!==0 && this.props.posts.map(post =>
                    <tr key={post.id}>
                        <td>
                            {post.title}
                        </td> 
                        <td>
                            {post.author}
                        </td> 
                        <td>
                            {post.commentCount}
                        </td>
                        <td>
                            {post.voteScore}
                        </td>
                        <td>
                            <i className="fa fa-thumbs-up clickable" onClick={()=>{this.props.votePost(post.id,'upVote')}}/>
                            <i className="fa fa-thumbs-down ml-2 clickable" onClick={()=>{this.props.votePost(post.id,'downVote')}}/>
                        </td>
                        <td>
                           {moment(post.timestamp).format('lll')} 
                           
                        </td>
                        <td>
                            <Link to={{ pathname: `/posts/edit/${post.id}` , state: {post}}}>
                                <i className="fa fa-edit clickable" />
                            </Link>
                        </td>
                        <td>
                            <i className="fa fa-remove clickable" onClick={()=>this.deletePost(post.id)}/>
                        </td>

                    </tr>
                    
                )}
                </tbody>
            </Table>
            
           
        )
    }
}
function mapStateToProps({home,postList}){
    return{
      posts:postList.posts
    }
    
  }
  function mapDispatchToProps(dispatch){
    return{
      loadAllPosts: (category) => fetchAllPosts(dispatch,category),
      sortAllPosts:(posts,order,key) => dispatch(sortPosts(posts,order,key)),
      votePost:(id,option) => updatePostVote(dispatch,id,option)
    }
    
  }
export default connect(mapStateToProps,mapDispatchToProps)(Post) ;