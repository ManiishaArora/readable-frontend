import React, { Component } from 'react';
import {Jumbotron,Button, Form, FormGroup, Label, Input,Container} from 'reactstrap'
import {connect} from 'react-redux'
import {fetchAllCategories} from '../middleware/category'
import {fetchAllPosts} from '../middleware/posts'
import uuid from 'uuid/v1'
import axios from 'axios'
import { Redirect } from 'react-router'

class Post extends Component {
    state = {
        id:'',
        title:this.props.title || '',
        body:this.props.body  || '',
        author:this.props.author  || '',
        category:this.props.category,
        saveCompleted:false,
        header:'Add New Post',
        editPage:false
    }
    async componentDidMount(){
        await this.props.loadAllPosts();
        await this.props.loadAllCategories();
       
        if(this.props.match.params.id){
            const id = this.props.match.params.id
            const post=this.props.posts.filter(post=>post.id===id.toString())
            post.length!==0 && this.setState({
                id:post[0].id,
                title:post[0].title,
                body:post[0].body,
                author:post[0].author,
                category:post[0].category,
                header: 'Edit Post',
                editPage:true
            })
        }
       
       
            
    }
    changeInput = (e,el) => {
        this.setState({[el]:e.target.value})
    }
    submit = async e => {
        e.preventDefault()
        const {id,title,body,author,category,editPage} = this.state

        let options = {},url=''
        if(editPage){
            options = {
                method: 'put',
                headers: { 'Authorization': 'whatever-you-want','Content-type':'application/json','Accept':'application/json' },
                data: JSON.stringify({title,body})
            }
            url = `http://localhost:3001/posts/${id}`
        }
        else{
            options = {
                method: 'post',
                headers: { 'Authorization': 'whatever-you-want','Content-type':'application/json','Accept':'application/json' },
                data: JSON.stringify({id:uuid(),timestamp:new Date().getTime(), title,body,author,category})
            }
            url = `http://localhost:3001/posts`
        }
        const response = await axios( url,options) 
        if(response.status===200 || response.status ==='200')
            this.setState({saveCompleted:true})
        
    }
    render() {
        const {categories} = this.props
        const {title,body,author,category,saveCompleted,header,editPage} = this.state
        return (
            
            <Container className="mt-5">
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
            </Form>
            {saveCompleted && (
                <Redirect to ="/" />
            )}
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
      loadAllPosts: () => fetchAllPosts(dispatch)
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Post)