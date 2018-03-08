import React, { Component } from 'react';
import {Table} from 'reactstrap'
import moment from 'moment'
import {connect} from 'react-redux'
import {sortPosts} from '../../actions'
import {updatePostVote,fetchAllPosts,deletePostById} from '../../middleware/posts'
import {Link} from 'react-router-dom'

class List extends Component {
    state={
        loadingComplete:false
    }
    async componentDidMount(){ //This is to support fresh load of page - with or without category on path (which is available to this component as prop)
        await this.props.loadAllPosts(this.props.selectedCategory);
        this.setState({loadingComplete:true})
    }
    async componentWillReceiveProps(newProps) { //This is to support navigation from the link on Home Page
        if(newProps.selectedCategory !== this.props.selectedCategory)
            await this.props.loadAllPosts(newProps.selectedCategory);
      }
    render() {
        const {sortAllPosts,posts,selectedCategory,votePost,deletePost} = this.props
        return (
            <div>
            { this.state.loadingComplete && posts && posts.length===0 &&
            <div>
                {typeof selectedCategory!=='undefined' &&
                <h6>No Posts yet for - <span className="text-capitalize">{selectedCategory}</span>
                </h6>
                }
            </div>
            }
            
            { this.state.loadingComplete && posts && posts.length!==0 &&
            
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
                                        <i className="fa fa-chevron-down ml-2 clickable" onClick={()=>{sortAllPosts(posts,'DESC','voteScore')}}/>
                                        <i className="fa fa-chevron-up ml-2 clickable" onClick={()=>{sortAllPosts(posts,'ASC','voteScore')}} />
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
                                        <i className="fa fa-chevron-down ml-2 clickable" onClick={()=>{sortAllPosts(posts,'DESC','timestamp')}}/>
                                        <i className="fa fa-chevron-up ml-2 clickable" onClick={()=>{sortAllPosts(posts,'ASC','timestamp')}} />
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

                {posts.map(post =>
                    <tr key={post.id}>
                        <td>
                            <Link to={`/${post.category}/${post.id}`} className='text-dark'>
                                {post.title}
                            </Link>
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
                            <i className="fa fa-thumbs-up clickable" onClick={()=>{votePost(post.id,'upVote')}}/>
                            <i className="fa fa-thumbs-down ml-2 clickable" onClick={()=>{votePost(post.id,'downVote')}}/>
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
                            <i className="fa fa-remove clickable" onClick={()=>deletePost(post.id)}/>
                        </td>

                    </tr>
                    
                )}
                </tbody>
            </Table>
           
            }
            </div>
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
      votePost:(id,option) => updatePostVote(dispatch,id,option),
      deletePost:(id)=>deletePostById(dispatch,id)
    }
    
  }
export default connect(mapStateToProps,mapDispatchToProps)(List) ;