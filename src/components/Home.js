import React, { Component } from 'react';
import {Container,Button} from 'reactstrap'
import PostsList from './PostsList'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {fetchAllCategories} from '../middleware/category'
import {fetchAllPosts} from '../middleware/posts'

class Home extends Component {
  
  componentDidMount(){
    this.props.loadAllCategories();
    this.props.loadAllPosts();
  }
  render() {
    return (
      <div>
      <div className="sidenav">
          <h6 className="text-white"> Categories </h6>
          <Link to="/" >Home</Link>
          {this.props.categories && this.props.categories.length!==0 && this.props.categories.map(category =>
             <Link to={category.name} key={category.name}>{category.name}</Link>
            )
          }
      </div>
      <Container className="mt-5 root">
          <Link to="/create" >
            <Button color="info" className="float-right mb-3 clickable" >Add Posts</Button>
          </Link>
          <PostsList />
      </Container>
      </div>
    );
  }
}

function mapStateToProps({home,postList}){
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
export default connect(mapStateToProps,mapDispatchToProps)(Home) ;
