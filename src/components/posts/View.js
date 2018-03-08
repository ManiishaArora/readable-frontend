import React, { Component } from 'react';
import {Jumbotron,Container,Button} from 'reactstrap'
import {fetchPostByID,updatePostVote,deletePostById} from '../../middleware/posts'
import {fetchCommentsByPostID,updateCommentVote,deleteCommentById} from '../../middleware/comments'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import moment from 'moment'
import Redirect from 'react-router-dom/Redirect';

class View extends Component {
    state = {
        id:this.props.match.params?this.props.match.params.id:'',
        loadingComplete:false,
        nothingFound:false
    }
    async componentDidMount(){
        try{
            await this.props.loadPost(this.state.id);
            await this.props.loadComments(this.state.id);
            this.setState({loadingComplete:true})
        }catch(e){
            this.setState({nothingFound:true})
        }
    }
    changeInput = (e,el) => {
        this.setState({[el]:e.target.value})
    }
    deleteCommentAndReload = id => {
        this.props.deleteComment(id); 
    }
    render(){
        const {posts} = this.props.posts?this.props.posts:[];
        const {comments,deletePost,votePost,history,voteComment}=this.props
        return(
            <Container className="mt-5">
            {
                this.state.nothingFound && 
                <Redirect to="/site/page/404" />
            }
            {this.state.loadingComplete && posts && posts.length!==0 &&
                <Jumbotron>
                <div className="text-capitalize">
                    <div className="lead font-weight-normal">
                        {posts[0].title}
                    </div>
                    <div>
                        {posts[0].body}
                    </div>
                    <div className="text-muted mt-3">
                        By: {posts[0].author}
                    </div>
                    <div className="small">
                        {moment(posts[0].timestamp).format('lll')}
                    </div>
                    <div className="mt-2"> 
                        <i className="fa fa-thumbs-up clickable" onClick={()=>{votePost(posts[0].id,'upVote')}}/>
                        <i className="fa fa-thumbs-down mx-2 clickable" onClick={()=>{votePost(posts[0].id,'downVote')}}/>

                        {posts[0].voteScore} Votes
                        <span className="pl-2">{comments.length} Comments</span>
                        <Link to={{ pathname: `/posts/edit/${posts[0].id}`}} >
                            <Button className="clickable float-right clickable"> Edit </Button>
                        </Link>
                        <Button className="mx-2 clickable float-right" 
                        onClick={()=>{deletePost(posts[0].id);history.goBack()}}> Delete </Button>
                        <Link to={{ pathname: `/actions/add/comment/${posts[0].id}`}} >
                            <Button className="clickable float-right clickable"> Add Comment </Button>
                        </Link>
                       
                    </div>

                    <div className="mt-4">
                        {comments.length!==0 &&
                            <div className=" pb-1 mb-1 font-weight-normal"> Comments </div>
                        } 
                        {comments.length!==0 && comments.map(comment=>
                            <div key={comment.id} className="my-2 small" >
                            
                             <Link  to={`/edit/comment/${comment.id}`} className='text-dark pt-1'>
                                {comment.body}
                            </Link>
                             
                             <span className="float-right">{comment.voteScore} Votes</span>
                             <i className="fa fa-thumbs-down mx-2 mt-1 clickable float-right" onClick={()=>{voteComment(comment.id,'downVote')}}/>
                             
                             <i className="fa fa-thumbs-up clickable mt-1 float-right" onClick={()=>{voteComment(comment.id,'upVote')}}/>
                             <i className="fa fa-remove clickable mt-1 mr-2 float-right"
                              onClick={()=>this.deleteCommentAndReload(comment.id)}/>
                             <div className="text-muted small mt-1">By {comment.author}</div>
                             <div className="text-muted small">  {moment(comment.timestamp).format('lll')}</div>
                             <div className="divider pb-2 mb-2" />
                            </div>
                        )
                        }
                    </div>
                   
                </div>
                </Jumbotron>
                }
           
            </Container>
        )
    }
}

function mapStateToProps({home,postList,comments}){
    return{
      posts:postList,
      comments:comments.comments
    }
    
  }
  function mapDispatchToProps(dispatch){
    return{
      loadPost: (id) => fetchPostByID(dispatch,id),
      votePost:(id,option) => updatePostVote(dispatch,id,option),
      loadComments: (id) => fetchCommentsByPostID(dispatch,id),
      voteComment:(id,option) => updateCommentVote(dispatch,id,option),
      deleteComment:(id)=>deleteCommentById(dispatch,id),
      deletePost:(id)=>deletePostById(dispatch,id)
    }
    
  }
export default connect(mapStateToProps,mapDispatchToProps)(View) ;