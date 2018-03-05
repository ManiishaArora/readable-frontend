import React, { Component } from 'react';
import {Table} from 'reactstrap'
import moment from 'moment'
import {connect} from 'react-redux'
import {sortPosts,updatePostVote} from '../actions'

class Post extends Component {
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
                                        <i className="fa fa-chevron-down ml-2" onClick={()=>{this.props.sortAllPosts(this.props.posts,'DESC','voteScore')}}/>
                                        <i className="fa fa-chevron-up ml-2" onClick={()=>{this.props.sortAllPosts(this.props.posts,'ASC','voteScore')}} />
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
                                        <i className="fa fa-chevron-down ml-2" onClick={()=>{this.props.sortAllPosts(this.props.posts,'DESC','timestamp')}}/>
                                        <i className="fa fa-chevron-up ml-2" onClick={()=>{this.props.sortAllPosts(this.props.posts,'ASC','timestamp')}} />
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
                            <i className="fa fa-thumbs-up" onClick={()=>{this.props.votePost(post.id,'upVote')}}/>
                            <i className="fa fa-thumbs-down ml-2" onClick={()=>{this.props.votePost(post.id,'downVote')}}/>
                        </td>
                        <td>
                           {moment(post.timestamp).format('lll')} 
                           
                        </td>
                        <td>
                            <i className="fa fa-edit" />
                            
                        </td>
                        <td>
                            <i className="fa fa-remove" />
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
      sortAllPosts:(posts,order,key) => dispatch(sortPosts(posts,order,key)),
      votePost:(id,option) => updatePostVote(dispatch,id,option)
    }
    
  }
export default connect(mapStateToProps,mapDispatchToProps)(Post) ;