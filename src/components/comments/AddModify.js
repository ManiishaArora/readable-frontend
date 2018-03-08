import React, { Component } from 'react';
import {Jumbotron,Button, Form, FormGroup, Label, Input,Container} from 'reactstrap'
import {connect} from 'react-redux'
import {fetchCommentDetailByCommentID,editComment,addCommentsToPost} from '../../middleware/comments'
import uuid from 'uuid/v1'
import {Link} from 'react-router-dom'
import Redirect from 'react-router-dom/Redirect';

class AddModify extends Component {
    state = {
        id:this.props.match.params?(this.props.match.params.commentid?this.props.match.params.commentid:''):'',
        body:this.props.body  || '',
        author:this.props.author  || '',
        parentId:this.props.match.params?(this.props.match.params.postid?this.props.match.params.postid:''):'',
        header:'Add New Comment',
        editPage:false,
        nothingFound:false
    }
    async componentDidMount(){
        const id=this.state.id
        if(id!==''){
            try{
                await this.props.loadComment(id);
                const comments=this.props.comments
                comments.length!==0 && this.setState({
                    id:comments[0].id,
                    body:comments[0].body,
                    author:comments[0].author,
                    parentId:comments[0].parentId,
                    header: 'Edit Post',
                    editPage:true
                })
            }catch(e){
                this.setState({nothingFound:true})
            }
            
        }else if(this.state.parentId!==''){
            this.setState({
                id:uuid()
            })
        } 
    }
    changeInput = (e,el) => {
        this.setState({[el]:e.target.value})
    }
    submit = async e => {
        e.preventDefault()
        const {id,body,author,parentId} = this.state
        const comment = {id,body,author,parentId}
        
        if(this.state.editPage){
            await this.props.updateComment(comment)
        }else{
            await this.props.addComment(comment)
        }
        this.props.history.goBack()
    }
    render() {
        const {body,author,header,editPage} = this.state
        return (
            
            <Container className="mt-5">
             {
                this.state.nothingFound && 
                <Redirect to="/site/page/404" />
            }
            <Jumbotron>
            <h4 className="text-center font-weight-normal">{header}</h4>    
            <Form onSubmit={this.submit}>
               
                <FormGroup>
                    <Label for="body">Comment</Label>
                    <Input type="textarea" name="Body" id="body" placeholder="Body..." required value={body}
                    onChange={(e)=>{this.changeInput(e,'body')}}/>
                </FormGroup>
                <FormGroup>
                    <Label for="author">Author</Label>
                    <Input type="text" name="Author" id="author" placeholder="Author..." required value={author}
                    disabled={editPage}
                    onChange={(e)=>{this.changeInput(e,'author')}}/>
                </FormGroup>
             
         
                <Button>Submit</Button>
                <Link to="/" >
                    <Button color="secondary" className="ml-3 clickable" >Cancel</Button>
                </Link>
            </Form>
           
            </Jumbotron>
            </Container>
        )
    }
}
function mapStateToProps({comments}){
    return{
      comments:comments.comments
    }
}
function mapDispatchToProps(dispatch){
    return{
      loadComment: (id) => fetchCommentDetailByCommentID(dispatch,id),
      updateComment: (comment) => editComment(dispatch,comment),
      addComment:(comment) => addCommentsToPost(dispatch,comment)

    }
}

export default connect(mapStateToProps,mapDispatchToProps)(AddModify)