import React, { Component } from 'react';
import {Jumbotron,Button, Form, FormGroup, Label, Input,Container} from 'reactstrap'

export default class Post extends Component {
    render() {
        return (
            <Container className="mt-5">
            <Jumbotron>
            <h4 className="text-center font-weight-normal">Add New Post</h4>    
            <Form>
                <FormGroup>
                    <Label for="title">Title</Label>
                    <Input type="text" name="Title" id="title" placeholder="Title" required/>
                </FormGroup>
                <FormGroup>
                    <Label for="body">Body</Label>
                    <Input type="textarea" name="Body" id="body" placeholder="Body" required/>
                </FormGroup>
                <FormGroup>
                    <Label for="author">Author</Label>
                    <Input type="text" name="Author" id="author" placeholder="Author" required/>
                </FormGroup>
                <FormGroup>
                    <Label for="categorySelect">Category</Label>
                    <Input type="select" name="categorySelect" id="categorySelect" required>
                        <option disabled selected value> -- Select Category -- </option>
                        <option >1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                    </Input>
                </FormGroup>
         
                <Button>Submit</Button>
            </Form>
            </Jumbotron>
            </Container>
        )
    }
}