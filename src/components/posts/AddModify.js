import React, { Component } from 'react';
import {Jumbotron,Button, Form, FormGroup, Label, Input,Container} from 'reactstrap'
import {connect} from 'react-redux'
import {fetchAllCategories} from '../../middleware/category'
import {fetchPostByID,editPost,addPost} from '../../middleware/posts'
import {Link} from 'react-router-dom'
import Redirect from 'react-router-dom/Redirect';

class AddModify extends Component {
    
    state = {
        id:'',
        title:this.props.title || '',
        body:this.props.body  || '',
        author:this.props.author  || '',
        category:this.props.category,
        header:'Add New Post',
        editPage:false
    }
    async componentDidMount(){
       
        if(this.props.match.params.id){
            const id = this.props.match.params.id
            try{
                await this.props.loadPost(id);
                await this.props.loadAllCategories();
                const post=this.props.posts
                post.length!==0 && this.setState({
                    id:post[0].id,
                    title:post[0].title,
                    body:post[0].body,
                    author:post[0].author,
                    category:post[0].category,
                    header: 'Edit Post',
                    editPage:true
                })
            }catch(e){
                this.setState({nothingFound:true})
            }
            
        } 
    }
    changeInput = (e,el) => {
        this.setState({[el]:e.target.value})
    }
    submit = async e => {
        e.preventDefault()
        const {id,title,body,author,category,editPage} = this.state
        const post = {id,title,body,author,category}
        const {updatePost,addNewPost,history} = this.props

        editPage?await updatePost(post):await addNewPost(post)

        history.goBack()
        
    }
    render() {
        const {categories} = this.props
        const {title,body,author,category,header,editPage} = this.state
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
                    <Label for="title">Title</Label>
                    <Input type="text" name="Title" id="title" placeholder="Title..." required value={title} 
                    onChange={(e)=>{this.changeInput(e,'title')}}/>
                </FormGroup>
                <FormGroup>
                    <Label for="body">Body</Label>
                    <Input type="textarea" name="Body" id="body" placeholder="Body..." required value={body}
                    onChange={(e)=>{this.changeInput(e,'body')}}/>
                </FormGroup>
                <FormGroup>
                    <Label for="author">Author</Label>
                    <Input type="text" name="Author" id="author" placeholder="Author..." required value={author}
                    disabled={editPage}
                    onChange={(e)=>{this.changeInput(e,'author')}}/>
                </FormGroup>
                <FormGroup>
                    <Label for="categorySelect">Category</Label>
                    <Input type="select" name="categorySelect" id="categorySelect" required value={category} 
                    disabled={editPage}
                    onChange={(e)=>{this.changeInput(e,'category')}}
                    defaultValue="default">
                        <option disabled value="default"> -- Select Category -- </option>
                        {categories && categories.length!==0 &&
                        categories.map(category=>
                            <option key={category.name}>{category.name}</option>
                        )}
                    </Input>
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
function mapStateToProps({home,postList}){
    return{
      categories:home.categories,
      posts:postList.posts
    }
}
function mapDispatchToProps(dispatch){
    return{
      loadAllCategories: () => fetchAllCategories(dispatch),
      loadPost: (id) => fetchPostByID(dispatch,id),
      updatePost: (post) => editPost(dispatch,post),
      addNewPost: (post) => addPost(dispatch,post) 
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(AddModify)