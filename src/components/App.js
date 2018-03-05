import React, { Component } from 'react';
import {Container,Button} from 'reactstrap'
import PostsList from './PostsList'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {fetchAllCategories,fetchAllPosts} from '../actions'

class App extends Component {
  
  constructor(props){
    super(props)
    console.log(this.props)
  }
  
  componentDidMount(){
    this.props.loadAllCategories();
    this.props.loadAllPosts();
  }
  render() {
    return (
      <div>
      <nav className="navbar navbar-default navbar-fixed-top text-white">
        <div className="container">
          Readable
        </div>
      </nav>
      <div className="sidenav">
          <h6 className="text-white"> Categories </h6>
          <Link to="/" >Home</Link>
          {this.props.categories && this.props.categories.length!==0 && this.props.categories.map(category =>
             <Link to={category.name} key={category.name}>{category.name}</Link>
            )
          }
      </div>
      <Container className="mt-5">
          <Button color="info" className="float-right mb-3">Add Posts</Button>
          <PostsList />
      </Container>
      </div>
    );
  }
}

function mapStateToProps({home,postList}){
  console.log('categories',home)
  return{
    categories:home.categories
  }
  
}
function mapDispatchToProps(dispatch){
  return{
    loadAllCategories: () => fetchAllCategories(dispatch),
    loadAllPosts: () => fetchAllPosts(dispatch)
  }
  
}
export default connect(mapStateToProps,mapDispatchToProps)(App) ;
